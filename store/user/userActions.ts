import axios from "axios";
import {
    getMinecraftProfileError,
    getMinecraftProfileRequest, getMinecraftProfileSuccess, getUserProfileError,
    getUserProfileRequest,
    getUserProfileSuccess,
    updateUserProfileError,
    updateUserProfileRequest,
    updateUserProfileSuccess,
    userLoginError,
    userLoginRequest,
    userLoginSuccess,
    userRegisterError,
    userRegisterRequest,
    userRegisterSuccess
} from "./userSlice";
import {getAPIUrl} from "../helper";
import {UpdateUserDto} from "./dtos/updateUserDto";
import {NextRouter, useRouter} from "next/router";

const STANDARD_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

export const register =
    (username: string,
     lastName: string,
     firstName: string,
     email: string,
     password: string,
     acceptEmails: boolean,
     phoneNumber?: string,
     birthday?: string) => async (dispatch: any) => {

        dispatch(userRegisterRequest());

        try {

            interface UserData {
                username: string;
                lastName: string;
                firstName: string;
                email: string;
                password: string;
                acceptEmails: boolean;
                phoneNumber?: string | null;
                birthday?: string | null;
            }

            let data: UserData = {
                username: username,
                lastName: lastName,
                firstName: firstName,
                email: email,
                password: password,
                acceptEmails: acceptEmails,
            };

            if (phoneNumber) {
                data.phoneNumber = phoneNumber;
            }

            if (birthday) {
                data.birthday = birthday;
            }

            console.log('data', data)

            await axios.post(`${getAPIUrl()}/users`, data);

            dispatch(userRegisterSuccess({registerSuccess: true}));
        } catch (error: any) {
            let message;
            console.log('Error', error)
            if (error.response.data?.message?.email !== undefined) {
                message = 'Adresse mail déjà utilisée';
            } else {
                message = 'Error ' + error.response.status + ': ' + error.response.error
            }
            dispatch(userRegisterError(message));
        }
    }

export const emptyAct = () => async (dispatch: any) => {
    localStorage.removeItem('act');
    localStorage.removeItem('scp');

    dispatch(
        userLoginSuccess({
            accessToken: undefined,
            scope: undefined,
        })
    );
};

export const login = (username: string, password: string) => async (dispatch: any) => {
    dispatch(userLoginRequest());
    try {
        const response = await axios.post(`${getAPIUrl()}/auth/login`, {username: username, password: password});
        localStorage.setItem('act', response.data.accessToken);
        dispatch(
            userLoginSuccess({
                _id: response.data.userId,
                accessToken: response.data.accessToken,
            })
        );
    } catch (error: any) {
        if (error.response.status === 401) {
            dispatch(userLoginError('Vérifiez vos identifiants'));
        } else if (error.response.status === 404) {
            dispatch(userLoginError('Aucun utilisateur avec ce pseudo trouvé'));
        } else {
            dispatch(userLoginError(error.message));
        }
    }

};

export const checkLogin = () => async (dispatch: any) => {
    dispatch(userLoginRequest())
    if (localStorage.getItem('act')) {
        dispatch(
            userLoginSuccess({
                accessToken: localStorage.getItem('act')
            })
        );
    } else {
        dispatch(userLoginError(''));
    }
};

export const getUserProfile = (accessToken: string | null) => async (dispatch: any) => {
    dispatch(getUserProfileRequest());
    try {
        const response = await axios.get(`${getAPIUrl()}/users/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUserProfileSuccess(response.data));
    } catch (error: any) {
        dispatch(getUserProfileError(error.message));
        console.log(error)
        if (error.response.status === 401) {
            dispatch(emptyAct());
        }
    }
};

export const updateUserProfile = (accessToken: string | undefined, updateUserProfileDto: UpdateUserDto) => async (dispatch: any) => {
    dispatch(updateUserProfileRequest());
    try {
        const response = await axios.put(
            `${getAPIUrl()}/users`,
            {...updateUserProfileDto},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateUserProfileSuccess(response.data));
    } catch (error: any) {
        dispatch(updateUserProfileError(error.message));
    }
};

export const requestXboxServices = (mcAccessToken: string, accessToken: string | undefined) => async (dispatch: any) => {

    dispatch(getMinecraftProfileRequest())

    try {
        const response = await axios.post(`${getAPIUrl()}/users/requestXboxServices`, {access_token: mcAccessToken},
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

        dispatch(getMinecraftProfileSuccess(response.data));
        console.log(response)
    } catch (error: any) {
        console.log(error)
        dispatch(getMinecraftProfileError(error.message))
    }
}