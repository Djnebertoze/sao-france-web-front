import {createSlice, Draft} from "@reduxjs/toolkit";
import {StripePrice, StripeProduct} from "../../common/types/types";

export interface StripeState {
    getStripeProductsLoading: boolean;
    stripeProducts?: StripeProduct[];
    getStripeProductsError?: string;

    getActiveStripePricesLoading: boolean;
    activeStripePrices?: StripePrice[];
    getActiveStripePricesError?: string

    getStripePaymentLinkLoading: boolean;
    getStripePaymentLinkSuccess?: string;
    getStripePaymentLinkError?: string;

    getStripePaymentSuccessLoading: boolean;
    getStripePaymentSuccessSuccess?: string;
    getStripePaymentSuccessError?: string;
}

const initialState: StripeState = {
    getStripeProductsLoading: false,
    stripeProducts: undefined,
    getStripeProductsError: undefined,

    getActiveStripePricesLoading: false,
    activeStripePrices: undefined,
    getActiveStripePricesError: undefined,

    getStripePaymentLinkLoading: false,
    getStripePaymentLinkSuccess: undefined,
    getStripePaymentLinkError: undefined,

    getStripePaymentSuccessLoading: false,
    getStripePaymentSuccessSuccess: undefined,
    getStripePaymentSuccessError: undefined
}

export const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {
        getStripeProductsRequest: (state: Draft<typeof initialState>) => {
            state.getStripeProductsLoading = true;
            state.stripeProducts = undefined;
            state.getStripeProductsError = undefined;
        },
        getStripeProductsSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getStripeProductsLoading = false;
            state.stripeProducts = payload.data;
            state.getStripeProductsError = undefined;
        },
        getStripeProductsError: (state: Draft<typeof initialState>, { payload }) => {
            state.getStripeProductsLoading = false;
            state.stripeProducts = undefined;
            state.getStripeProductsError = payload;
        },


        getActiveStripePricesRequest: (state: Draft<typeof initialState>) => {
            state.getActiveStripePricesLoading = true;
            state.activeStripePrices = undefined;
            state.getActiveStripePricesError = undefined;
        },
        getActiveStripePricesSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getActiveStripePricesLoading = false;
            state.activeStripePrices = payload.data;
            state.getActiveStripePricesError = undefined;
        },
        getActiveStripePricesError: (state: Draft<typeof initialState>, { payload }) => {
            state.getActiveStripePricesLoading = false;
            state.activeStripePrices = undefined;
            state.getActiveStripePricesError = payload;
        },


        getStripePaymentLinkRequest: (state: Draft<typeof initialState>) => {
            state.getStripePaymentLinkLoading = true;
            state.getStripePaymentLinkSuccess = undefined;
            state.getStripePaymentLinkError = undefined;
        },
        resetStripePaymentLink: (state: Draft<typeof initialState>) => {
            state.getStripePaymentLinkLoading = false;
            state.getStripePaymentLinkSuccess = undefined;
            state.getStripePaymentLinkError = undefined;
        },
        getStripePaymentLinkSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getStripePaymentLinkLoading = false;
            state.getStripePaymentLinkSuccess = payload;
            state.getStripePaymentLinkError = undefined;
        },
        getStripePaymentLinkError: (state: Draft<typeof initialState>, { payload }) => {
            state.getStripePaymentLinkLoading = false;
            state.getStripePaymentLinkSuccess = undefined;
            state.getStripePaymentLinkError = payload;
        },


        getStripePaymentSuccessRequest: (state: Draft<typeof initialState>) => {
            state.getStripePaymentSuccessLoading = true;
            state.getStripePaymentSuccessSuccess = undefined;
            state.getStripePaymentSuccessError = undefined;
        },
        resetStripePaymentSuccess: (state: Draft<typeof initialState>) => {
            state.getStripePaymentSuccessLoading = false;
            state.getStripePaymentSuccessSuccess = undefined;
            state.getStripePaymentSuccessError = undefined;
        },
        getStripePaymentSuccessSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getStripePaymentSuccessLoading = false;
            state.getStripePaymentSuccessSuccess = payload;
            state.getStripePaymentSuccessError = undefined;
        },
        getStripePaymentSuccessError: (state: Draft<typeof initialState>, { payload }) => {
            state.getStripePaymentSuccessLoading = false;
            state.getStripePaymentSuccessSuccess = undefined;
            state.getStripePaymentSuccessError = payload;
        },
    }
})

export const getStripeState = (state: { stripe: StripeState }) => state.stripe;

export const {
    getStripeProductsRequest,
    getStripeProductsSuccess,
    getStripeProductsError,

    getActiveStripePricesRequest,
    getActiveStripePricesSuccess,
    getActiveStripePricesError,

    getStripePaymentLinkRequest,
    getStripePaymentLinkSuccess,
    getStripePaymentLinkError,
    resetStripePaymentLink,

    getStripePaymentSuccessRequest,
    getStripePaymentSuccessSuccess,
    getStripePaymentSuccessError,
    resetStripePaymentSuccess

} = stripeSlice.actions;

export default stripeSlice.reducer;
