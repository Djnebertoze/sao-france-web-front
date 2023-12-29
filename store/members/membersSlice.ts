import { createSlice, Draft } from '@reduxjs/toolkit';
import {User} from "../../common/types/types";

export interface MembersState {
    getMemberListLoading: boolean;
    getMemberList: User[];
    getMemberListError?: string;

    getMemberProfileLoading: boolean;
    getMemberInfos?: User;
    getMemberProfileError?: string;


}

const initialState: MembersState = {
    getMemberListLoading: false,
    getMemberList: [],
    getMemberListError: undefined,

    getMemberProfileLoading: false,
    getMemberInfos: undefined,
    getMemberProfileError: undefined,
};

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        getMemberListRequest: (state: Draft<typeof initialState>) => {
            state.getMemberListLoading = true;
            state.getMemberList = [];
            state.getMemberListError = undefined;
        },
        getMemberListSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getMemberListLoading = false;
            state.getMemberList = payload.reverse();
            state.getMemberListError = undefined;
        },
        getMemberListError: (state: Draft<typeof initialState>, { payload }) => {
            state.getMemberListLoading = false;
            state.getMemberList = [];
            state.getMemberListError = payload;
        },

        getMemberProfileRequest: (state: Draft<typeof initialState>) => {
            state.getMemberProfileLoading = true;
            state.getMemberInfos = undefined;
            state.getMemberProfileError = undefined;
        },
        getMemberProfileSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getMemberProfileLoading = false;
            state.getMemberInfos = { ...state.getMemberInfos, ...payload.user, mcProfile : {...payload.mcProfile }};
            state.getMemberProfileError = undefined;
        },
        getMemberProfileError: (state: Draft<typeof initialState>, { payload }) => {
            state.getMemberProfileLoading = false;
            state.getMemberInfos = undefined;
            state.getMemberProfileError = payload;
        },
    }
});

export const getMembersState = (state: { members: MembersState }) => state.members;

export const {
    getMemberProfileRequest,
    getMemberProfileSuccess,
    getMemberProfileError,
} = membersSlice.actions;

export default membersSlice.reducer;
