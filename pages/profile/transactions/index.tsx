import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightElement,
    Spacer,
    Text,
    useToast
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {getUserState} from "../../../store/user/userSlice";
import {
    emptyAct,
    getUserProfile,
    getUserTransactions,
    requestXboxServices,
    updateUserProfile
} from "../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../store/store";


import {faCheck, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../../../store/authConfig";
import {Role} from "../../../common/types/types";


const TransactionsPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        getUserInfosLoading, minecraftProfile, getMinecraftProfileError,
        getUserInfosError, getUserTransactionsLoading, getUserTransactionsError, userTransactions
    } = useSelector(getUserState)

    const {t} = useTranslation();

    const toast = useToast();
    const toastDuration = 5000;


    useEffect(() => {
        if (auth?.accessToken) {
            if (!userInfos && !getUserInfosLoading){
                dispatch(getUserProfile(auth.accessToken))
            }
        }

        if((!getUserInfosLoading && getUserInfosError) || localStorage.getItem('act') == undefined){
            dispatch(emptyAct())
            router.push('/login').then(() => {});
        }

       if(!userTransactions && !getUserTransactionsLoading){
           dispatch(getUserTransactions(auth?.accessToken))
       }

    }, [dispatch, auth, toast, router, userInfos, minecraftProfile, getUserInfosError, getUserInfosLoading, userTransactions, getUserTransactionsLoading]);


    useEffect(() => {
        if(getMinecraftProfileError !== undefined){
            toast({
                title: "Impossible de récupérer votre compte Minecraft",
                description: getMinecraftProfileError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [getMinecraftProfileError, toast])

    let tagsMargin = 4;

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container bg={'rgb(55,56,58,1)'} minH={1000} maxW={'full'} color={'white'} pt={5} px={0} mt={'77px'}>
                <Flex>
                    <Flex flexDirection={'column'} minW={200} mx={5}>
                        <Button mt={2} colorScheme={'red'} onClick={() => router.push('/profile').then()}>Retour</Button>
                    </Flex>
                    <Flex flexDirection={'column'} w={'full'} borderLeft={'1px solid rgb(255,255,255,.3)'} px={5}>
                        <Text fontSize={28} w={'full'} borderBottom={'1px solid rgb(255,255,255,.3)'} pb={4}>Mes Transactions</Text>
                        <Flex flexDirection={"column-reverse"} pt={5}>
                            {userTransactions && userTransactions.map((transaction) => {
                                return (
                                    <Flex key={transaction._id} flexDirection={"column"} w={'full'} backgroundColor={'rgb(255,255,255,.04)'} borderRadius={5} mb={5} py={3} px={10}>
                                        <Flex>
                                            <Text fontSize={20}>{transaction.productName}</Text>
                                            <Spacer/>
                                            <Text>{new Date(transaction.createdAt).toLocaleString()}</Text>
                                        </Flex>
                                        {!transaction.createdBy && (
                                            <Text mt={5}>Prix: {transaction.cost}{transaction.isRealMoney ? '€' : ' PB'}</Text>
                                        )}
                                        {transaction.createdBy && (
                                            <Text fontSize={15} mt={1}>Admin: {transaction.createdBy.username}</Text>
                                        )}
                                    </Flex>
                                )
                            })}
                            {(!userTransactions || userTransactions.length == 0) && (
                                <Text>Pas encore d&apos;achat effectué !</Text>
                            )}
                        </Flex>

                    </Flex>
                </Flex>
            </Container>
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

export default TransactionsPage;