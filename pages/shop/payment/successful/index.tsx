import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {Box, Button, Center, Container, Flex, Spacer, Spinner, Text, useToast,} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect} from "react";
import {getUserState,} from "../../../../store/user/userSlice";
import {getUserProfile} from "../../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../../store/store";


import {getStripeState} from "../../../../store/stripe/stripeSlice";
import {getStripePaymentSuccess} from "../../../../store/stripe/stripeActions";

const SuccessPaymentPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginLoading,
        userLoginError,minecraftProfile
    } = useSelector(getUserState)


    const {
        getStripePaymentSuccessLoading,
        getStripePaymentSuccessSuccess,
        getStripePaymentSuccessError
    } = useSelector(getStripeState)

    const toast = useToast();


    useEffect(() => {

        if (auth?.accessToken && !userInfos) {
            dispatch(getUserProfile(auth.accessToken))
            if (userInfos) {

            }
        }
        console.log(router.query.pi, router.query.st)


        if (auth?.accessToken && !getStripePaymentSuccessLoading && !(getStripePaymentSuccessSuccess || getStripePaymentSuccessError)) {
            dispatch(getStripePaymentSuccess(auth?.accessToken, router.query.pi, router.query.st, router.query.session_id))
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

    }, [dispatch, auth, toast, router, userInfos, userLoginLoading, userLoginError, minecraftProfile, getStripePaymentSuccessError,
        getStripePaymentSuccessLoading, getStripePaymentSuccessSuccess]);


    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Flex maxW={'full'} py={10} px={50} mx={0} className={'main-background'} minH={1000} w={'full'} flexDirection={"column"} pt={120}>
                <Flex color={'white'}>
                    <Spacer/>
                    <Flex flexDirection={"column"} mt={50}>
                        {(!getStripePaymentSuccessLoading && !(getStripePaymentSuccessSuccess || getStripePaymentSuccessError)) && (
                            <>
                                <Center><Text fontSize={25} mb={5}>Veuillez patienter le temps que nous vérifions votre achat...</Text></Center>
                                <Center><Spinner h={50} w={50} /></Center>
                            </>
                        )}
                        {getStripePaymentSuccessSuccess && (
                            <>
                                <Center><Text fontSize={25} mb={5}>Merci beaucoup pour votre achat {userInfos?.username} !</Text></Center>
                                <Box h={'1px'} w={'full'} my={3} background={'rgb(255,255,255,.3)'}/>
                                <Center><Text fontSize={19} mb={5}>Vous pouvez dès maintenant vous rendre sur votre profil et récupérer votre achat !</Text></Center>
                                <Center><Button colorScheme={'blue'} w={300} onClick={() => router.push('/profile')}>Voir mon profil</Button></Center>
                            </>
                        )}
                        {getStripePaymentSuccessError && (
                            <>
                                <Center><Text fontSize={25}>Oh non {userInfos?.username} !</Text></Center>
                                <Box h={'1px'} w={'full'} my={3} background={'rgb(255,255,255,.3)'}/>
                                <Center><Text fontSize={19} mb={5}>On dirait que votre achat a déjà été récupéré...</Text></Center>
                                <Center><Button colorScheme={'blue'} w={300} onClick={() => router.push('/profile')}>Voir mon profil</Button></Center>
                            </>
                        )}
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

export default SuccessPaymentPage;