import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {
    Box,
    Container,
    Flex,
    Text,
    useToast,
    Skeleton,
    Wrap, Image, Center, Spacer, Button, Spinner,
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {
    getUserState,
} from "../../../../store/user/userSlice";
import {getUserProfile} from "../../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../../store/store";


import {getStripePaymentSuccessRequest, getStripeState} from "../../../../store/stripe/stripeSlice";
import {getStripePaymentSuccess} from "../../../../store/stripe/stripeActions";
import {CgSearchLoading} from "react-icons/cg";
import {AiOutlineLoading} from "react-icons/ai";



const CancelPaymentPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        getUserInfosLoading,
        userLoginLoading,
        userLoginError,minecraftProfile, getMinecraftProfileError
    } = useSelector(getUserState)



    const {t} = useTranslation();

    const toast = useToast();
    const toastDuration = 1000;


    useEffect(() => {

        if (auth?.accessToken && !userInfos) {
            dispatch(getUserProfile(auth.accessToken))
            if (userInfos) {

            }
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

    }, [dispatch, auth, toast, router, userInfos?._id, userLoginLoading, userLoginError, minecraftProfile]);


    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Flex maxW={'full'} py={10} px={50} mx={0} className={'main-background'} minH={1000} w={'full'} flexDirection={"column"} pt={120}>
                <Flex color={'white'}>
                    {/*(!getStripePaymentSuccessLoading && !(getStripePaymentSuccessSuccess || getStripePaymentSuccessError)) && (
                        <>Veuillez patienter, nous vérifions votre achat...</>
                    )}

                    {getStripePaymentSuccessSuccess && (<>Merci pour votre achat</>)}

                    {getStripePaymentSuccessError && (<>Impossible de vérifier votre achat</>)*/}
                    <Spacer/>
                    <Flex flexDirection={"column"} mt={50}>

                        <Center><Text fontSize={25}>Vous avez changé d'avis {userInfos?.username} ?..</Text></Center>
                        <Box h={'1px'} w={'full'} my={3} background={'rgb(255,255,255,.3)'}/>
                        <Center><Text fontSize={19} mb={5}>Ça sera pour une prochaine fois alors !</Text></Center>
                        <Center><Button colorScheme={'blue'} w={300} onClick={() => router.push('/profile')}>Voir mon profil</Button></Center>
                    </Flex>
                    <Spacer/>
                </Flex>
            </Flex>
        </Container>
    );
}

export async function getServerSideProps({locale}: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], null, ['fr-FR', 'en-US'])),
        },
    };
}

export default CancelPaymentPage;