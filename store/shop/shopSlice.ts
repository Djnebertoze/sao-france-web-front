import { createSlice, Draft } from "@reduxjs/toolkit";
import {ShopProduct, Transaction, UsersList} from "../../common/types/types";

export interface ShopState {
    createShopProductLoading: boolean;
    createShopProductSuccess?: string;
    createShopProductError?: string;

    editShopProductLoading: boolean;
    editShopProductSuccess?: string;
    editShopProductError?: string;

    removeShopProductLoading: boolean;
    removeShopProductSuccess?: string;
    removeShopProductError?: string;

    getShopProductsLoading: boolean;
    shopProducts?: ShopProduct[];
    getShopProductsError?: string;

    getShopProductLoading: boolean;
    shopProduct?: ShopProduct;
    getShopProductError?: string;

    payProductWithShopPointsLoading: boolean;
    payProductWithShopPointsSuccess?: string;
    payProductWithShopPointsError?: string;

    getTransactionsListLoading: boolean;
    transactionsList?: { list: Transaction[], total: number };
    getTransactionsListError?: string;
}

const initialState: ShopState = {
    createShopProductLoading: false,
    createShopProductSuccess: undefined,
    createShopProductError: undefined,

    editShopProductLoading: false,
    editShopProductSuccess: undefined,
    editShopProductError: undefined,

    removeShopProductLoading: false,
    removeShopProductSuccess: undefined,
    removeShopProductError: undefined,

    getShopProductsLoading: false,
    shopProducts: undefined,
    getShopProductsError: undefined,

    getShopProductLoading: false,
    shopProduct: undefined,
    getShopProductError: undefined,

    payProductWithShopPointsLoading: false,
    payProductWithShopPointsSuccess: undefined,
    payProductWithShopPointsError: undefined,

    getTransactionsListLoading: false,
    transactionsList: undefined,
    getTransactionsListError: undefined,
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        createShopProductRequest: (state: Draft<typeof initialState>) => {
            state.createShopProductLoading = true;
            state.createShopProductSuccess = undefined;
            state.createShopProductError = undefined;
        },
        createShopProductSuccess: (state: Draft<typeof initialState>, { }) => {
            state.createShopProductLoading = false;
            state.createShopProductSuccess = 'Shop product successfully created';
            state.createShopProductError = undefined;
        },
        createShopProductError: (state: Draft<typeof initialState>, { payload }) => {
            state.createShopProductLoading = false;
            state.createShopProductSuccess = undefined;
            state.createShopProductError = payload.error;
        },


        editShopProductRequest: (state: Draft<typeof initialState>) => {
            state.editShopProductLoading = true;
            state.editShopProductSuccess = undefined;
            state.editShopProductError = undefined;
        },
        editShopProductSuccess: (state: Draft<typeof initialState>, { }) => {
            state.editShopProductLoading = false;
            state.editShopProductSuccess = 'Shop product successfully edited';
            state.editShopProductError = undefined;
        },
        editShopProductError: (state: Draft<typeof initialState>, { payload }) => {
            state.editShopProductLoading = false;
            state.editShopProductSuccess = undefined;
            state.editShopProductError = payload;
        },


        removeShopProductRequest: (state: Draft<typeof initialState>) => {
            state.removeShopProductLoading = true;
            state.removeShopProductSuccess = undefined;
            state.removeShopProductError = undefined;
        },
        removeShopProductSuccess: (state: Draft<typeof initialState>, { }) => {
            state.removeShopProductLoading = false;
            state.removeShopProductSuccess = 'Shop product successfully deleted';
            state.removeShopProductError = undefined;
        },
        removeShopProductError: (state: Draft<typeof initialState>, { payload }) => {
            state.removeShopProductLoading = false;
            state.removeShopProductSuccess = undefined;
            state.removeShopProductError = payload;
        },


        getShopProductsRequest: (state: Draft<typeof initialState>) => {
            state.getShopProductsLoading = true;
            state.shopProducts = undefined;
            state.getShopProductsError = undefined;
        },
        getShopProductsSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getShopProductsLoading = false;
            state.shopProducts = payload;
            state.getShopProductsError = undefined;
        },
        getShopProductsError: (state: Draft<typeof initialState>, { payload }) => {
            state.getShopProductsLoading = false;
            state.shopProducts = undefined;
            state.getShopProductsError = payload;
        },


        getShopProductRequest: (state: Draft<typeof initialState>) => {
            state.getShopProductLoading = true;
            state.shopProduct = undefined;
            state.getShopProductError = undefined;
        },
        getShopProductSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getShopProductLoading = false;
            state.shopProduct = payload;
            state.getShopProductError = undefined;
        },
        getShopProductError: (state: Draft<typeof initialState>, { payload }) => {
            state.getShopProductLoading = false;
            state.shopProduct = undefined;
            state.getShopProductError = payload;
        },
        resetShopProduct: (state: Draft<typeof initialState>) => {
            state.getShopProductLoading = false;
            state.shopProduct = undefined;
            state.getShopProductError = undefined;
        },

        getPayProductWithShopPointsRequest: (state: Draft<typeof initialState>) => {
            state.payProductWithShopPointsLoading = true;
            state.payProductWithShopPointsSuccess = undefined;
            state.payProductWithShopPointsError = undefined;
        },
        getPayProductWithShopPointsSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.payProductWithShopPointsLoading = false;
            state.payProductWithShopPointsSuccess = payload;
            state.payProductWithShopPointsError = undefined;
        },
        getPayProductWithShopPointsError: (state: Draft<typeof initialState>, { payload }) => {
            state.payProductWithShopPointsLoading = false;
            state.payProductWithShopPointsSuccess = undefined;
            state.payProductWithShopPointsError = payload;
        },
        getPayProductWithShopPointsReset: (state: Draft<typeof initialState>) => {
            state.payProductWithShopPointsLoading = false;
            state.payProductWithShopPointsSuccess = undefined;
            state.payProductWithShopPointsError = undefined;
        },

        getTransactionsListRequest: (state: Draft<typeof initialState>) => {
            state.getTransactionsListLoading = true;
            state.transactionsList = undefined;
            state.getTransactionsListError = undefined;
        },
        getTransactionsListSuccess: (state: Draft<typeof initialState>, { payload }) => {
            state.getTransactionsListLoading = false;
            state.transactionsList = payload;
            state.getTransactionsListError = undefined;
        },
        getTransactionsListError: (state: Draft<typeof initialState>, { payload }) => {
            state.getTransactionsListLoading = false;
            state.transactionsList = undefined;
            state.getTransactionsListError = payload;
        },
        resetTransactionsList: (state: Draft<typeof initialState>, { payload }) => {
            state.getTransactionsListLoading = false;
            state.transactionsList = undefined;
            state.getTransactionsListError = undefined;
        },
    }
})

export const getShopState = (state: { shop: ShopState }) => state.shop;

export const {
    createShopProductRequest,
    createShopProductSuccess,
    createShopProductError,

    editShopProductRequest,
    editShopProductSuccess,
    editShopProductError,

    removeShopProductRequest,
    removeShopProductSuccess,
    removeShopProductError,

    getShopProductsRequest,
    getShopProductsSuccess,
    getShopProductsError,

    getShopProductRequest,
    getShopProductSuccess,
    getShopProductError,
    resetShopProduct,

    getPayProductWithShopPointsRequest,
    getPayProductWithShopPointsSuccess,
    getPayProductWithShopPointsError,
    getPayProductWithShopPointsReset,

    getTransactionsListRequest,
    getTransactionsListSuccess,
    getTransactionsListError,
    resetTransactionsList


} = shopSlice.actions;

export default shopSlice.reducer;
