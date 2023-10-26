import { getAPIUrl } from '../helper';
import {
    getMemberListError,
    getMemberListRequest,
    getMemberListSuccess, getMemberProfileError,
    getMemberProfileRequest,
    getMemberProfileSuccess
} from "./membersSlice";
import axios from "axios";
import {SearchMembersDto} from "./dtos/searchMemebersDto";


export const getAllMembers = (accessToken: string | undefined, searchMembersDto?: SearchMembersDto) => async (dispatch: any) => {
    dispatch(getMemberListRequest());

    const url = `${getAPIUrl()}/users/by-search`;

    try {
        const response = await axios.get(url, {
            params: { ...searchMembersDto },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getMemberListSuccess(response.data));
    } catch (error: any) {
        dispatch(getMemberListError(error.message));
    }
};

export const getOneMemberProfile = (accessToken: string | undefined, memberId: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(getMemberProfileRequest());

    try {
        const response = await axios.get(`${getAPIUrl()}/users/profile/${memberId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        dispatch(getMemberProfileSuccess(response.data));
    } catch (error: any) {
        dispatch(getMemberProfileError(error.message));
    }
};