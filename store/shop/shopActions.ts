import {getAPIUrl} from "../helper";
import axios from "axios";
import {CreateShopProductDto} from "./dtos/createShopProductDto";
import {
    createShopProductError,
    createShopProductRequest,
    createShopProductSuccess, editShopProductError,
    editShopProductRequest,
    editShopProductSuccess,
    getShopProductError,
    getShopProductRequest,
    getShopProductsError,
    getShopProductsRequest,
    getShopProductsSuccess,
    getShopProductSuccess, removeShopProductError, removeShopProductRequest, removeShopProductSuccess
} from "./shopSlice";

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

export const editShopProduct = (accessToken: string | undefined, createShopProductDto : CreateShopProductDto, productId: string) => async (dispatch: any) => {
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

export const getShopProducts = (accessToken: string | undefined) => async (dispatch: any) => {
    dispatch(getShopProductsRequest())

    try {
        const response = await axios.get(
            `${getAPIUrl()}/shop/products`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
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

export const getShopProduct = (accessToken: string | undefined, productId: string) => async (dispatch: any) => {
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