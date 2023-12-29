import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {useEffect} from "react";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const AdminStatsPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError
    } = useSelector(getUserState)

    useEffect(() => {
        console.log('1')
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin'))){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
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