import {getAPIUrl} from '../helper';
import {getMemberProfileError, getMemberProfileRequest, getMemberProfileSuccess} from "./membersSlice";
import axios from "axios";


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