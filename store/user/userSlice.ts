import { createSlice, Draft } from "@reduxjs/toolkit";
import {Auth, MinecraftProfile, User, UsersList} from "../../common/types/types";

export interface UserState {
    userLoginLoading: boolean;
    auth?: Auth;
    userLoginError?: string;

    userRegisterLoading: boolean;
    userRegisterSuccess?: string;
    userRegisterError?: string;

    userLogoutLoading: boolean;
    userLogoutSuccess?: string;
    userLogoutError?: string;

    getUserInfosLoading: boolean;
    userInfos?: User;
    getUserInfosError?: string;

    getUsersListLoading: boolean;
    usersList?: UsersList;
    getUsersListError?: string;

    updateUserProfileLoading: boolean;
    updateUserProfileSuccess?: User;
    updateUserProfileError?: string;

    getMinecraftProfileLoading: boolean;
    minecraftProfile?: MinecraftProfile;
    getMinecraftProfileError?: string;

    sendPasswordResetLoading: boolean;
    sendPasswordResetSuccess?: string;
    sendPasswordResetError?: string;

    resetPasswordLoading: boolean;
    resetPasswordSuccess?: string;
    resetPasswordError?: string;
}

const initialState: UserState = {
    userLoginLoading: false,
    auth: undefined,
    userLoginError: undefined,

    userLogoutLoading: false,
    userLogoutSuccess: undefined,
    userLogoutError: undefined,

    userRegisterLoading: false,
    userRegisterSuccess: undefined,
    userRegisterError: undefined,

    getUserInfosLoading: false,
    userInfos: undefined,
    getUserInfosError: undefined,

    getUsersListLoading: false,
    usersList: undefined,
    getUsersListError: undefined,

    updateUserProfileLoading: false,
    updateUserProfileSuccess: undefined,
    updateUserProfileError: undefined,

    getMinecraftProfileLoading: false,
    minecraftProfile: undefined,
    getMinecraftProfileError: undefined,

    sendPasswordResetLoading: false,
    sendPasswordResetSuccess: undefined,
    sendPasswordResetError: undefined,

    resetPasswordLoading: false,
    resetPasswordSuccess: undefined,
    resetPasswordError: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoginRequest: (state: Draft<typeof initialState>) => {
            state.userLoginLoading = true;
            state.userLoginError = undefined;
        },
        userLoginSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.userLoginLoading = false;
            state.auth = payload;
            state.userLoginError = undefined;
        },

        userLoginError: (state: Draft<typeof initialState>, { payload }) => {
            state.userLoginLoading = false;
            state.userLoginError = payload;
        },


        userRegisterRequest: (state: Draft<typeof initialState>) => {
            state.userRegisterLoading = true;
            state.userRegisterSuccess = undefined;
            state.userRegisterError = undefined;
        },
        userRegisterSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.userRegisterLoading = false;
            state.userRegisterSuccess = 'User successfully registered';
            state.auth = payload;
            state.userRegisterError = undefined;
        },
        userRegisterError: (state: Draft<typeof initialState>, { payload }) => {
            state.userRegisterLoading = false;
            state.userRegisterSuccess = undefined;
            state.userRegisterError = payload;
        },


        userLogoutRequest: (state: Draft<typeof initialState>) => {
            state.userLogoutLoading = true;
            state.auth = undefined;
            state.userInfos = undefined;
            state.userLogoutError = undefined;

            state.userRegisterSuccess = undefined;
        },
        userLogoutSuccess: (state: Draft<typeof initialState>) => {
            state.userLogoutLoading = false;
            state.userLogoutSuccess = 'User successfully logged out';
            state.auth = undefined;
            state.userInfos = undefined;
            state.userLogoutError = undefined;

            state.userRegisterSuccess = undefined;
        },
        userLogoutError: (state: Draft<typeof initialState>, { payload }) => {
            state.userLogoutLoading = false;
            state.auth = undefined;
            state.userInfos = undefined;
            state.userLogoutError = payload;

            state.userRegisterSuccess = undefined;
        },


        getUserProfileRequest: (state: Draft<typeof initialState>) => {
            state.getUserInfosLoading = true;
            state.getUserInfosError = undefined;
        },
        getUserProfileSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getUserInfosLoading = false;
            state.userInfos = { ...state.userInfos, ...payload.user, mcProfile : {...payload.mcProfile }};
            state.getUserInfosError = undefined;
        },
        getUserProfileError: (state: Draft<typeof initialState>, { payload }) => {
            state.getUserInfosLoading = false;
            state.userInfos = undefined;
            state.getUserInfosError = payload;
        },

        getUsersListRequest: (state: Draft<typeof initialState>) => {
            state.getUsersListLoading = true;
            state.usersList = undefined;
            state.getUsersListError = undefined;
        },
        getUsersListSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getUsersListLoading = false;
            state.usersList = payload;
            state.getUsersListError = undefined;
        },
        getUsersListError: (state: Draft<typeof initialState>, { payload }) => {
            state.getUsersListLoading = false;
            state.usersList = undefined;
            state.getUsersListError = payload;
        },


        updateUserProfileRequest: (state: Draft<typeof initialState>) => {
            state.updateUserProfileLoading = true;
            state.updateUserProfileSuccess = undefined;
            state.updateUserProfileError = undefined;
        },
        updateUserProfileSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.updateUserProfileLoading = false;
            state.updateUserProfileSuccess = payload;
            state.userInfos = payload;
            state.updateUserProfileError = undefined;
        },
        updateUserProfileError: (state: Draft<typeof initialState>, { payload }) => {
            state.updateUserProfileLoading = false;
            state.updateUserProfileSuccess = undefined;
            state.updateUserProfileError = payload;
        },


        getMinecraftProfileRequest: (state: Draft<typeof initialState>) => {
            state.getMinecraftProfileLoading = true;
            state.getMinecraftProfileError = undefined;
        },
        getMinecraftProfileSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getMinecraftProfileLoading = false;
            state.minecraftProfile = { ...state.minecraftProfile, ...payload };
            state.getMinecraftProfileError = undefined;
        },
        getMinecraftProfileError: (state: Draft<typeof initialState>, { payload }) => {
            state.getMinecraftProfileLoading = false;
            state.minecraftProfile = undefined;
            state.getMinecraftProfileError = payload;
        },


        sendPasswordResetRequest: (state: Draft<typeof initialState>) => {
            state.sendPasswordResetLoading = true;
            state.sendPasswordResetSuccess = undefined;
            state.sendPasswordResetError = undefined;
        },
        sendPasswordResetSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.sendPasswordResetLoading = false;
            state.sendPasswordResetSuccess = payload;
            state.sendPasswordResetError = undefined;
        },
        sendPasswordResetError: (state: Draft<typeof initialState>, { payload }) => {
            state.sendPasswordResetLoading = false;
            state.sendPasswordResetSuccess = undefined;
            state.sendPasswordResetError = payload;
        },


        resetPasswordRequest: (state: Draft<typeof initialState>) => {
            state.resetPasswordLoading = true;
            state.resetPasswordSuccess = undefined;
            state.resetPasswordError = undefined;
        },
        resetPasswordSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.resetPasswordLoading = false;
            state.resetPasswordSuccess = payload;
            state.resetPasswordError = undefined;
        },
        resetPasswordError: (state: Draft<typeof initialState>, { payload }) => {
            state.resetPasswordLoading = false;
            state.resetPasswordSuccess = undefined;
            state.resetPasswordError = payload;
        },
    }
});

export const getUserState = (state: { user: UserState }) => state.user;

export const {
    userLoginRequest,
    userLoginSuccess,
    userLoginError,

    userRegisterRequest,
    userRegisterSuccess,
    userRegisterError,

    getUsersListRequest,
    getUsersListSuccess,
    getUsersListError,

    getUserProfileRequest,
    getUserProfileSuccess,
    getUserProfileError,

    updateUserProfileRequest,
    updateUserProfileSuccess,
    updateUserProfileError,

    getMinecraftProfileRequest,
    getMinecraftProfileSuccess,
    getMinecraftProfileError,

    sendPasswordResetRequest,
    sendPasswordResetSuccess,
    sendPasswordResetError,

    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordError,
} = userSlice.actions;

export default userSlice.reducer;
