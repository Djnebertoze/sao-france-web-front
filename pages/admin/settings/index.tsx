import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {useEffect} from "react";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Box, Flex, Spacer, Text} from "@chakra-ui/react";


const SettingsPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError
    } = useSelector(getUserState)

    useEffect(() => {
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin'))){
            router.push('/').then(() => {})
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError]);


    return (
        <AdminNavbar selected={'/settings'}>
            <Text fontSize={25} mb={0}>Bienvenue sur votre onglet &apos;<Text color={'cyan.400'} as={'span'}>Paramètres</Text>&apos; !</Text>
            <Flex mb={5}>
                <Flex direction={"column"}>
                    <Text fontSize={16} color={'rgb(255,255,255,.5)'}>Vous retrouverez ici différents paramètres pour gérer le site.</Text>
                </Flex>
                <Spacer/>
            </Flex>
            <Box h={'1px'} w={'full'} backgroundColor={'rgb(255,255,255,.2)'} mb={5}/>
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

export default SettingsPage;