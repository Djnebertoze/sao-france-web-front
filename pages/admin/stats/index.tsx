import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {getShopState} from "../../../store/shop/shopSlice";
import {ShopCategorie, ShopProduct} from "../../../common/types/types";
import {shopCategories} from "../../../common/shop/shopCategories";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Image,
    Spacer,
    Text,
    VStack,
    Input,
    InputGroup,
    InputLeftElement, Checkbox, Link as ChakraLink, Link, useToast, Skeleton, InputLeftAddon, InputRightElement, Wrap
} from "@chakra-ui/react";
import {getShopProducts} from "../../../store/shop/shopActions";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import ShopProductCard from "../../../components/molecules/ShopProductCard/ShopProductCard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const AdminStatsPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError, updateUserProfileSuccess, updateUserProfileError,
        getUserInfosError
    } = useSelector(getUserState)


    const toast = useToast();
    const toastDuration = 10000;

    useEffect(() => {
        console.log('1')
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin'))){
            router.push('/')
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError]);


    return (
        <AdminNavbar selected={'/stats'}>
            En cours de dev...
        </AdminNavbar>
    );
}

export async function getServerSideProps({locale}: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], null, ['fr-FR', 'en-US'])),
        },
    };
}

export default AdminStatsPage;