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
    Wrap, Image, Center, Spacer, Button,
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {
    getUserState,
} from "../../../store/user/userSlice";
import {getUserProfile} from "../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../store/store";

import ShopProductCard from "../../../components/molecules/ShopProductCard/ShopProductCard";
import {ShopCategorie, ShopProduct} from "../../../common/types/types";
import {shopCategories} from "../../../common/shop/shopCategories";
import {getShopState} from "../../../store/shop/shopSlice";
import {getShopProduct, getShopProducts} from "../../../store/shop/shopActions";
import {transformDescription} from "../../../store/helper";
import {PaymentElement} from '@stripe/react-stripe-js';
import ImageSecurised from "../../../public/images/shop/securised.png"
import {getStripeState} from "../../../store/stripe/stripeSlice";
import {getStripePaymentLink} from "../../../store/stripe/stripeActions";



const ProductPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const categories: ShopCategorie[] = shopCategories;

    const {
        auth,
        userInfos,
        getUserInfosLoading,
        userLoginLoading,
        userLoginError,minecraftProfile, getMinecraftProfileError
    } = useSelector(getUserState)
    const {
        shopProduct,
        getShopProductLoading,
        getShopProductError
    } = useSelector(getShopState)

    const {
        getStripePaymentLinkLoading,
        getStripePaymentLinkSuccess,
        getStripePaymentLinkError,
    } = useSelector(getStripeState)


    const {t} = useTranslation();

    const toast = useToast();
    const toastDuration = 1000;


    useEffect(() => {
        console.log('mmhh')
        /*console.log('usss')*/

        if (auth?.accessToken && !userInfos) {
            dispatch(getUserProfile(auth.accessToken))
            if (userInfos) {

            }
        }

        if(auth?.accessToken && shopProduct){
            /*console.log('usss1')*/
            console.log('Got product')
            console.log(shopProduct)
        }

        if(auth?.accessToken && (!shopProduct || (shopProduct && shopProduct._id !== router.query.id))){
            console.log('Getting product')
            dispatch(getShopProduct(auth.accessToken, router.query.id))

        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

    }, [dispatch, auth, toast, router, userInfos?._id, userLoginLoading, userLoginError, minecraftProfile, shopProduct]);

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
        if (getShopProductError !== undefined){
            toast({
                title: "Impossible de récupérer le produit voulu",
                description: getShopProductError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [getMinecraftProfileError, getShopProductError])

    useEffect(() => {
        if (getStripePaymentLinkSuccess){
            router.push(getStripePaymentLinkSuccess)
        } else if (getStripePaymentLinkError) {
            toast({
                title: "Impossible de récupérer lien de paiement.",
                description: getStripePaymentLinkError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [getStripePaymentLinkLoading])

    const handleBuy = () => {
        if(shopProduct?.isRealMoney) {
            dispatch(getStripePaymentLink(auth?.accessToken, router.query.id))
        }
    }

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Flex maxW={'full'} py={10} px={50} mx={0} className={'main-background'} minH={1000} w={'full'} flexDirection={"column"} pt={120}>
                <Flex >
                    <Flex flexDirection={'column'} w={'full'} pr={10}>
                        <Text color={'white'} fontSize={30} fontWeight={'bold'}>
                            {shopProduct && shopProduct?.name} - {shopProduct && categories.filter((category) => category._id === shopProduct.categorieId)[0].name}
                        </Text>
                        <Box h={'1px'} w={'full'} my={5} background={'rgb(255,255,255,.3)'}/>
                        <Text color={'white'} fontSize={16}>
                            {shopProduct && transformDescription(shopProduct?.descriptionDetails)}
                        </Text>
                        <Box h={'1px'} w={'full'} my={5} background={'rgb(255,255,255,.3)'}/>

                        <Center>
                            <Text color={'white'} fontSize={25}>{shopProduct?.price}{shopProduct?.isRealMoney ? '€' : ' Points Boutique'}</Text>
                        </Center>
                        <Center>
                            <Image src={ImageSecurised.src} w={250} py={11}/>
                        </Center>
                        <Center>
                            <Text color={'rgb(255,255,255,.7)'}>Comtpe Minecraft connecté: {userInfos?.mcProfile?.name}</Text>
                        </Center>

                        <Button variant={'solid'} colorScheme={'blue'} onClick={handleBuy} mt={11} isLoading={getStripePaymentLinkLoading}>
                            Acheter
                        </Button>
                    </Flex>
                    <Spacer/>
                    <Image src={shopProduct?.imageUrl} maxW={500} objectFit={'cover'}/>
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

export default ProductPage;