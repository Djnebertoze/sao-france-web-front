import {getAPIUrl} from "../helper";
import axios, {HttpStatusCode} from "axios";
import {CreateShopProductDto} from "./dtos/createShopProductDto";
import {
    createShopProductError,
    createShopProductRequest,
    createShopProductSuccess,
    editShopProductError,
    editShopProductRequest,
    editShopProductSuccess,
    getPayProductWithShopPointsError,
    getPayProductWithShopPointsRequest,
    getPayProductWithShopPointsSuccess,
    getShopProductError,
    getShopProductRequest,
    getShopProductsError,
    getShopProductsRequest,
    getShopProductsSuccess,
    getShopProductSuccess, getTransactionsListError, getTransactionsListRequest, getTransactionsListSuccess,
    removeShopProductError,
    removeShopProductRequest,
    removeShopProductSuccess
} from "./shopSlice";
import {getUsersListError, getUsersListRequest, getUsersListSuccess} from "../user/userSlice";

export const createShopProduct = (accessToken: string | undefined, createShopProductDto : CreateShopProductDto) => async (dispatch: any) => {
    dispatch(createShopProductRequest())

    try {
        const response = await axios.post(
            `${getAPIUrl()}/shop/createProduct`,
            {...createShopProductDto},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data.success){
            dispatch(createShopProductSuccess(response.data))
        } else (
            dispatch(createShopProductError(response.data))
        )
    } catch (error: any) {
        dispatch(createShopProductError({error: error}))
    }
}

export const editShopProduct = (accessToken: string | undefined, createShopProductDto : CreateShopProductDto, productId: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(editShopProductRequest())

    try {
        const response = await axios.put(
            `${getAPIUrl()}/shop/editProduct/`+productId,
            {...createShopProductDto},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data.success){
            dispatch(editShopProductSuccess(response.data))
        } else (
            dispatch(editShopProductError(response.data))
        )
    } catch (error: any) {
        dispatch(editShopProductError({error: error}))
    }
}

export const removeShopProduct = (accessToken: string | undefined, productId: string) => async (dispatch: any) => {
    dispatch(removeShopProductRequest())

    try {
        const response = await axios.post(
            `${getAPIUrl()}/shop/removeProduct/`+productId,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data.success){
            dispatch(removeShopProductSuccess(response.data))
        } else (
            dispatch(removeShopProductError(response.data))
        )
    } catch (error: any) {
        dispatch(removeShopProductError({error: error}))
    }
}

export const getShopProducts = () => async (dispatch: any) => {
    dispatch(getShopProductsRequest())

    try {
        const response = await axios.get(
            `${getAPIUrl()}/shop/products`,{}
        );
        if (response.data.success){
            console.log("data",response.data)
            dispatch(getShopProductsSuccess(response.data.products))
        } else (
            dispatch(getShopProductsError(response.data))
        )
    } catch (error: any) {
        dispatch(getShopProductsError({error: error}))
    }
}

export const getShopActiveProducts = () => async (dispatch: any) => {
    dispatch(getShopProductsRequest())

    try {
        const response = await axios.get(
            `${getAPIUrl()}/shop/products/active`,{}
        );
        if (response.data.success){
            console.log("data",response.data)
            dispatch(getShopProductsSuccess(response.data.products))
        } else (
            dispatch(getShopProductsError(response.data))
        )
    } catch (error: any) {
        dispatch(getShopProductsError({error: error}))
    }
}

export const getShopProduct = (accessToken: string | undefined, productId: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(getShopProductRequest())

    try {
        const response = await axios.get(
            `${getAPIUrl()}/shop/product/` + productId,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data.success){
            console.log("data",response.data)
            dispatch(getShopProductSuccess(response.data.product))
        } else (
            dispatch(getShopProductError(response.data))
        )
    } catch (error: any) {
        dispatch(getShopProductError({error: error}))
    }
}

export const payProductWithShopPoints = (accessToken: string | undefined, productId: string | string[] | undefined) => async (dispatch: any) => {
    dispatch(getPayProductWithShopPointsRequest())

    try {
        const response = await axios.post(
            `${getAPIUrl()}/shop/pay/`+productId,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data.status == HttpStatusCode.Created){
            dispatch(getPayProductWithShopPointsSuccess(response.data))
        } else (
            dispatch(getPayProductWithShopPointsError(response.data.message))
        )
    } catch (error: any) {
        console.log('error')
        console.log(error)
        dispatch(getPayProductWithShopPointsError(error.code))
    }
}

export const getTransactionsList = (accessToken: string | null | undefined) => async (dispatch: any) => {
    dispatch(getTransactionsListRequest());
    try {
        const response = await axios.get(`${getAPIUrl()}/transactions/all`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getTransactionsListSuccess(response.data));
        console.log(response.data)
    } catch (error: any) {
        dispatch(getTransactionsListError(error.message));
        console.log(error)
    }
};

export const getTransactionsSizedList = (accessToken: string | null | undefined, pageNumber: number, pageSize: number, filters:any) => async (dispatch: any) => {
    dispatch(getTransactionsListRequest());
    console.log(JSON.stringify(filters))
    try {
        const response = await axios.get(`${getAPIUrl()}/transactions/some/${pageNumber}/${pageSize}/${JSON.stringify(filters)}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getTransactionsListSuccess(response.data));
        console.log(response.data)
    } catch (error: any) {
        dispatch(getTransactionsListError(error.message));
        console.log(error)
    }
};