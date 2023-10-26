import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {
    getUserState,
} from "../../store/user/userSlice";
import {useDispatch, useSelector} from "../../store/store";
import AdminNavbar from "../../components/molecules/AdminNavbar/AdminNavbar";
import {getShopState} from "../../store/shop/shopSlice";
import {getShopProducts} from "../../store/shop/shopActions";


const AdminPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError, updateUserProfileSuccess, updateUserProfileError,
        getUserInfosError
    } = useSelector(getUserState)





    useEffect(() => {
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin') || userInfos?.roles?.includes('moderator') || userInfos?.roles?.includes('responsable') || userInfos?.roles?.includes('developer'))){
            router.push('/')
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }



    }, [dispatch, auth?.accessToken, router, userInfos?._id, userLoginError, getUserInfosError]);


    return (
        <AdminNavbar selected={''}>
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

export default AdminPage;