import { createSlice, Draft } from "@reduxjs/toolkit";
import {Auth, MinecraftProfile, Transaction, User, UserPrivateProfile, UsersList} from "../../common/types/types";

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

    getUserPrivateProfileLoading: boolean;
    getUserPrivateProfileSuccess?: UserPrivateProfile;
    getUserPrivateProfileError?: string;

    addRoleLoading: boolean;
    addRoleSuccess?: string;
    addRoleError?: string;

    removeRoleLoading: boolean;
    removeRoleSuccess?: string;
    removeRoleError?: string;

    addShopPointsLoading: boolean;
    addShopPointsSuccess?: string;
    addShopPointsError?: string;

    removeShopPointsLoading: boolean;
    removeShopPointsSuccess?: string;
    removeShopPointsError?: string;

    getUserTransactionsLoading: boolean;
    userTransactions?: Transaction[];
    getUserTransactionsError?: string;
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

    getUserPrivateProfileLoading: false,
    getUserPrivateProfileSuccess: undefined,
    getUserPrivateProfileError: undefined,

    addRoleLoading: false,
    addRoleSuccess: undefined,
    addRoleError: undefined,

    removeRoleLoading: false,
    removeRoleSuccess: undefined,
    removeRoleError: undefined,

    addShopPointsLoading: false,
    addShopPointsSuccess: undefined,
    addShopPointsError: undefined,

    removeShopPointsLoading: false,
    removeShopPointsSuccess: undefined,
    removeShopPointsError: undefined,

    getUserTransactionsLoading: false,
    userTransactions: undefined,
    getUserTransactionsError: undefined,
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


        getUserPrivateProfileRequest: (state: Draft<typeof initialState>) => {
            state.getUserPrivateProfileLoading = true;
            state.getUserPrivateProfileSuccess = undefined;
            state.getUserPrivateProfileError = undefined;
        },
        getUserPrivateProfileSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getUserPrivateProfileLoading = false;
            state.getUserPrivateProfileSuccess = payload;
            state.getUserPrivateProfileError = undefined;
        },
        getUserPrivateProfileError: (state: Draft<typeof initialState>, { payload }) => {
            state.getUserPrivateProfileLoading = false;
            state.getUserPrivateProfileSuccess = undefined;
            state.getUserPrivateProfileError = payload;
        },
        resetUserPrivateProfileRequest: (state: Draft<typeof initialState>) => {
            state.getUserPrivateProfileLoading = false;
            state.getUserPrivateProfileSuccess = undefined;
            state.getUserPrivateProfileError = undefined;
        },


        addRoleRequest: (state: Draft<typeof initialState>) => {
            state.addRoleLoading = true;
            state.addRoleSuccess = undefined;
            state.addRoleError = undefined;
        },
        addRoleSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.addRoleLoading = false;
            state.addRoleSuccess = payload;
            state.addRoleError = undefined;
        },
        addRoleError: (state: Draft<typeof initialState>, { payload }) => {
            state.addRoleLoading = false;
            state.addRoleSuccess = undefined;
            state.addRoleError = payload;
        },
        resetAddRole: (state: Draft<typeof initialState>) => {
            state.addRoleLoading = false;
            state.addRoleSuccess = undefined;
            state.addRoleError = undefined;
        },


        removeRoleRequest: (state: Draft<typeof initialState>) => {
            state.removeRoleLoading = true;
            state.removeRoleSuccess = undefined;
            state.removeRoleError = undefined;
        },
        removeRoleSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.removeRoleLoading = false;
            state.removeRoleSuccess = payload;
            state.removeRoleError = undefined;
        },
        removeRoleError: (state: Draft<typeof initialState>, { payload }) => {
            state.removeRoleLoading = false;
            state.removeRoleSuccess = undefined;
            state.removeRoleError = payload;
        },
        resetRemoveRole: (state: Draft<typeof initialState>) => {
            state.removeRoleLoading = false;
            state.removeRoleSuccess = undefined;
            state.removeRoleError = undefined;
        },


        addShopPointsRequest: (state: Draft<typeof initialState>) => {
            state.addShopPointsLoading = true;
            state.addShopPointsSuccess = undefined;
            state.addShopPointsError = undefined;
        },
        addShopPointsSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.addShopPointsLoading = false;
            state.addShopPointsSuccess = payload;
            state.addShopPointsError = undefined;
        },
        addShopPointsError: (state: Draft<typeof initialState>, { payload }) => {
            state.addShopPointsLoading = false;
            state.addShopPointsSuccess = undefined;
            state.addShopPointsError = payload;
        },
        resetAddShopPoints: (state: Draft<typeof initialState>) => {
            state.addShopPointsLoading = false;
            state.addShopPointsSuccess = undefined;
            state.addShopPointsError = undefined;
        },


        removeShopPointsRequest: (state: Draft<typeof initialState>) => {
            state.removeShopPointsLoading = true;
            state.removeShopPointsSuccess = undefined;
            state.removeShopPointsError = undefined;
        },
        removeShopPointsSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.removeShopPointsLoading = false;
            state.removeShopPointsSuccess = payload;
            state.removeShopPointsError = undefined;
        },
        removeShopPointsError: (state: Draft<typeof initialState>, { payload }) => {
            state.removeShopPointsLoading = false;
            state.removeShopPointsSuccess = undefined;
            state.removeShopPointsError = payload;
        },
        resetRemoveShopPoints: (state: Draft<typeof initialState>) => {
            state.removeShopPointsLoading = false;
            state.removeShopPointsSuccess = undefined;
            state.removeShopPointsError = undefined;
        },


        getUserTransactionsRequest: (state: Draft<typeof initialState>) => {
            state.getUserTransactionsLoading = true;
            state.getUserTransactionsError = undefined;
        },
        getUserTransactionsSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getUserTransactionsLoading = false;
            state.userTransactions = payload;
            state.getUserTransactionsError = undefined;
        },
        getUserTransactionsError: (state: Draft<typeof initialState>, { payload }) => {
            state.getUserTransactionsLoading = false;
            state.userTransactions = undefined;
            state.getUserTransactionsError = payload;
        },
        resetUserTransactionsRequest: (state: Draft<typeof initialState>) => {
            state.getUserTransactionsLoading = false;
            state.userTransactions = undefined;
            state.getUserTransactionsError = undefined;
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

    getUserPrivateProfileRequest,
    getUserPrivateProfileSuccess,
    getUserPrivateProfileError,
    resetUserPrivateProfileRequest,

    addRoleRequest,
    addRoleSuccess,
    addRoleError,
    resetAddRole,

    removeRoleRequest,
    removeRoleSuccess,
    removeRoleError,
    resetRemoveRole,
    
    addShopPointsRequest,
    addShopPointsSuccess,
    addShopPointsError,
    resetAddShopPoints,

    removeShopPointsRequest,
    removeShopPointsSuccess,
    removeShopPointsError,
    resetRemoveShopPoints,

    getUserTransactionsRequest,
    getUserTransactionsSuccess,
    getUserTransactionsError
} = userSlice.actions;

export default userSlice.reducer;
