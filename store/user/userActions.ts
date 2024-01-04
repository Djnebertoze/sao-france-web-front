import axios, {HttpStatusCode} from "axios";
import {
    getMinecraftProfileError,
    getMinecraftProfileRequest,
    getMinecraftProfileSuccess,
    getUserProfileError,
    getUserProfileRequest,
    getUserProfileSuccess,
    getUsersListError,
    getUsersListRequest,
    getUsersListSuccess, resetPasswordError, resetPasswordRequest, resetPasswordSuccess, sendPasswordResetError,
    sendPasswordResetRequest,
    sendPasswordResetSuccess,
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

export const register =
    (username: string,
     email: string,
     password: string,
     acceptEmails: boolean,
     phoneNumber?: string,
     birthday?: string,
     lastName?: string,
     firstName?: string) => async (dispatch: any) => {

        dispatch(userRegisterRequest());

        try {

            interface UserData {
                username: string;
                lastName?: string;
                firstName?: string;
                email: string;
                password: string;
                acceptEmails: boolean;
                phoneNumber?: string | null;
                birthday?: string | null;
            }

            let data: UserData = {
                username: username,
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
            if(firstName){
                data.firstName = firstName;
            }
            if (data.lastName){
                data.lastName = lastName;
            }

            const response = await axios.post(`${getAPIUrl()}/users`, data);
            if (response.data.accessToken){
                localStorage.setItem('act', response.data.accessToken);
                dispatch(
                    userRegisterSuccess({
                        _id: response.data.userId,
                        accessToken: response.data.accessToken,
                    })
                );
            } else {
                dispatch(userRegisterError(response.data.message));
            }
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

export const emptyAct = () => async () => {

    localStorage.removeItem('act');
    localStorage.removeItem('scp');

    /*dispatch(
        userLoginSuccess({
            accessToken: undefined,
            scope: undefined,
        })
    );*/

};

export const login = (username: string, password: string) => async (dispatch: any) => {
    dispatch(userLoginRequest());
    try {
        const response = await axios.post(`${getAPIUrl()}/auth/login`, {username: username, password: password});
        console.log(response)
        if (response.data.status) {
            switch (response.data.status) {
                case 404:
                    console.log('haha')
                    dispatch(userLoginError('Aucun utilisateur avec ce pseudo trouvé.'));
                    break;
                case 401:
                    dispatch(userLoginError('Mot de passe incorrect.'));
                    break;

            }
        } else {
            localStorage.setItem('act', response.data.accessToken);
            dispatch(
                userLoginSuccess({
                    _id: response.data.userId,
                    accessToken: response.data.accessToken,
                })
            );
        }

    } catch (error: any) {
        console.log(error)
        if (error.response.status === 401) {
            dispatch(userLoginError('Vérifiez vos identifiants'));
        } else if (error.response.status === 404) {
            dispatch(userLoginError('Aucun utilisateur avec ce pseudo trouvé'));
        } else {
            console.log(error)
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

export const getUserProfile = (accessToken: string | null | undefined) => async (dispatch: any) => {
    console.log('getting user profile')
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
    }
};

export const getUsersList = (accessToken: string | null | undefined) => async (dispatch: any) => {
    dispatch(getUsersListRequest());
    try {
        const response = await axios.get(`${getAPIUrl()}/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUsersListSuccess(response.data));
        console.log(response.data)
    } catch (error: any) {
        dispatch(getUsersListError(error.message));
        console.log(error)
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

        if(response.data.status != undefined){
            dispatch(updateUserProfileError(response.data.message));
        } else {
            dispatch(updateUserProfileSuccess(response.data));
        }


    } catch (error: any) {
        dispatch(updateUserProfileError(error));
    }
};

export const sendPasswordReset = (email: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(sendPasswordResetRequest());
    try {

        const response = await axios.get(`${getAPIUrl()}/users/send-password-reset/` + email, {});

        if (response.status === HttpStatusCode.Ok){
            console.log('ok')
            dispatch(sendPasswordResetSuccess('Success'))
        }
    } catch (error: any) {
        dispatch(sendPasswordResetError(error.message));
    }
};

export const resetPassword = (token: string | string[] | undefined, password: string) => async (dispatch: any) => {
    dispatch(resetPasswordRequest());
    try {

        const response = await axios.post(`${getAPIUrl()}/users/reset-password/${token}`, { password: password });

        if (response.status === HttpStatusCode.Created){
            if (response.data.status === HttpStatusCode.Ok){
                dispatch(resetPasswordSuccess('Success'));
            } else {
                dispatch(resetPasswordError(response.data.message));
            }
        } else {
            dispatch(resetPasswordError('Status: ' + response.status));
        }
    } catch (error: any) {
        dispatch(resetPasswordError(error.message));
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