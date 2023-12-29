import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect} from "react";
import {getUserState,} from "../../store/user/userSlice";
import {Box, Text,} from "@chakra-ui/react";
import {useDispatch, useSelector} from "../../store/store";
import AdminNavbar from "../../components/molecules/AdminNavbar/AdminNavbar";
import {emptyAct} from "../../store/user/userActions";


const AdminPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError
    } = useSelector(getUserState)





    useEffect(() => {
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin') || userInfos?.roles?.includes('moderator') || userInfos?.roles?.includes('responsable') || userInfos?.roles?.includes('developer'))){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

        if(getUserInfosError){
            dispatch(emptyAct())
            router.push('/login').then(() => {});
        }


    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError]);


    return (
        <AdminNavbar selected={''}>
            <Text fontSize={25} mb={0}>Bienvenue {userInfos?.username} sur votre nouveau <Text color={'cyan.400'} as={'span'}>tableau de bord</Text> !</Text>
            <Text fontSize={16} pb={17} color={'rgb(255,255,255,.5)'}>Vous retrouverez ici tous les outils nécéssaires afin de vous aider dans votre travail quotidien.</Text>
            <Box h={'1px'} w={'full'} backgroundColor={'rgb(255,255,255,.2)'}/>
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