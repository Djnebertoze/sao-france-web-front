import {getAPIUrl} from "../helper";
import axios from "axios";
import {
    getActiveStripePricesError,
    getActiveStripePricesRequest,
    getActiveStripePricesSuccess,
    getStripePaymentLinkError,
    getStripePaymentLinkRequest,
    getStripePaymentLinkSuccess,
    getStripePaymentSuccessError,
    getStripePaymentSuccessRequest,
    getStripePaymentSuccessSuccess,
    getStripeProductsError,
    getStripeProductsRequest,
    getStripeProductsSuccess
} from "./stripeSlice";
import {getShopProductsError, getShopProductsSuccess} from "../shop/shopSlice";

export const getStripeProducts = (accessToken: string | undefined) => async (dispatch: any) => {
    dispatch(getStripeProductsRequest())

    try {
        const response = await axios.get(
            `${getAPIUrl()}/stripe/products`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data){
            dispatch(getStripeProductsSuccess(response.data))
        } else (
            dispatch(getStripeProductsError(response.data))
        )
    } catch (error: any) {
        dispatch(getStripeProductsError({error: error}))
    }
}

export const getActiveStripePrices = (accessToken: string | undefined) => async (dispatch: any) => {
    dispatch(getActiveStripePricesRequest())

    try {
        const response = await axios.get(
            `${getAPIUrl()}/stripe/prices/active`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data){
            dispatch(getActiveStripePricesSuccess(response.data))
        } else (
            dispatch(getActiveStripePricesError(response.data))
        )
    } catch (error: any) {
        dispatch(getActiveStripePricesError({error: error}))
    }
}

export const getStripePaymentLink = (accessToken: string | undefined, productId: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(getStripePaymentLinkRequest());

    try {
        const response = await axios.get(`${getAPIUrl()}/stripe/paymentLink/${productId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        dispatch(getStripePaymentLinkSuccess(response.data));
    } catch (error: any) {
        dispatch(getStripePaymentLinkError(error.message));
    }
};

export const getStripePaymentSuccess = (accessToken: string | undefined, productId: string | string[] | undefined, status: string | string[] | undefined, session_id: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(getStripePaymentSuccessRequest());

    try {
        const response = await axios.post(`${getAPIUrl()}/stripe/paymentSuccess/${productId}`,
            { status: status, session_id: session_id },
            {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        switch (response.data.statusCode){
            case 400:
                dispatch(getStripePaymentSuccessError(response.data.message))
                break;
            case 201:
                dispatch(getStripePaymentSuccessSuccess(response.data));
                break;
            default:
                dispatch(getStripePaymentSuccessError(response.data.message))
                break;
        }
    } catch (error: any) {
        dispatch(getStripePaymentSuccessError(error.errors))
    }
};