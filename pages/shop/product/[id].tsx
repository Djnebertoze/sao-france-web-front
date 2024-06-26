import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {Box, Button, Center, Container, Flex, Image, Spacer, Text, useToast,} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {getUserState,} from "../../../store/user/userSlice";
import {getUserProfile} from "../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../store/store";
import {ShopCategorie} from "../../../common/types/types";
import {shopCategories} from "../../../common/shop/shopCategories";
import {getPayProductWithShopPointsReset, getShopState, resetShopProduct} from "../../../store/shop/shopSlice";
import {getShopProduct, payProductWithShopPoints} from "../../../store/shop/shopActions";
import {getMaxPowerUserGradesFromUserRoles, transformDescription} from "../../../store/helper";
import ImageSecured from "../../../public/images/shop/securised.png"
import {getStripeState} from "../../../store/stripe/stripeSlice";
import {getStripePaymentLink} from "../../../store/stripe/stripeActions";
import {getRoleById} from "../../../common/roles/roles";


const ProductPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const categories: ShopCategorie[] = shopCategories;

    const {
        auth,
        userInfos,
        userLoginLoading,
        userLoginError,minecraftProfile, getMinecraftProfileError
    } = useSelector(getUserState)
    const {
        shopProduct,
        getShopProductError,
        payProductWithShopPointsLoading,
        payProductWithShopPointsError,
        payProductWithShopPointsSuccess
    } = useSelector(getShopState)

    const {
        getStripePaymentLinkLoading,
        getStripePaymentLinkSuccess,
        getStripePaymentLinkError,
    } = useSelector(getStripeState)

    const toast = useToast();
    const toastDuration = 5000;

    const [canBuyRole, setCanBuyRole] = useState<boolean>()




    useEffect(() => {
        let rolePower: number | undefined = 0;
        if (auth?.accessToken && !userInfos) {
            dispatch(getUserProfile(auth.accessToken))
            if (userInfos) {

            }
        }

        if(shopProduct && shopProduct.roleToGive && shopProduct.categorieId == 'grades'){
            rolePower = getRoleById(shopProduct.roleToGive)?.power;
        } else {
            rolePower = 0;
        }

        if(shopProduct && userInfos && rolePower != undefined) {
            //console.log("rp", rolePower)
            // @ts-ignore
            /*console.log('mp ', getMaxPowerUserGradesFromUserRoles(userInfos.roles))
            console.log('mm ', userInfos.roles.includes(shopProduct.roleToGive))
            console.log('jj ', rolePower < getMaxPowerUserGradesFromUserRoles(userInfos.roles))*/

            setCanBuyRole(!(userInfos && shopProduct?.categorieId == 'grades' && shopProduct?.roleToGive != undefined && (userInfos.roles.includes(shopProduct.roleToGive) || rolePower < getMaxPowerUserGradesFromUserRoles(userInfos.roles))))

        }
        if(auth?.accessToken && (!shopProduct || (shopProduct && shopProduct._id !== router.query.id))){
            dispatch(resetShopProduct())
            dispatch(getShopProduct(auth.accessToken, router.query.id))
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

    }, [dispatch, auth, toast, router, userInfos, userLoginLoading, userLoginError, minecraftProfile, shopProduct]);

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
    }, [getMinecraftProfileError, getShopProductError, toast])

    useEffect(() => {
        if (getStripePaymentLinkSuccess){
            router.push(getStripePaymentLinkSuccess).then(() => {});
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
    }, [getStripePaymentLinkLoading, getStripePaymentLinkError, getStripePaymentLinkSuccess, router, toast])

    const handleBuy = () => {
        if(shopProduct?.isRealMoney) {
            dispatch(getStripePaymentLink(auth?.accessToken, router.query.id))
        } else {
            dispatch(payProductWithShopPoints(auth?.accessToken, router.query.id))
        }
    }

    useEffect(() => {
        if (payProductWithShopPointsSuccess){
            dispatch(getUserProfile(auth?.accessToken))
            router.push('/profile').then(() => {
                toast({
                    title: `${shopProduct?.name} acquis !`,
                    description: 'Merci pour votre achat !',
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
            })
            dispatch(getPayProductWithShopPointsReset())
        }
        if (payProductWithShopPointsError){
            toast({
                title: `Impossible d'effectuer l'achat.`,
                description: payProductWithShopPointsError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            dispatch(getPayProductWithShopPointsReset())
        }
    }, [payProductWithShopPointsSuccess, payProductWithShopPointsError, auth?.accessToken, dispatch, shopProduct?.name, toast, router])


    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Flex maxW={'full'} py={10} px={50} mx={0} className={'main-background'} minH={1000} w={'full'} flexDirection={"column"} pt={120}>
                <Flex >
                    <Flex flexDirection={'column'} w={'full'} pr={10}>
                        <Text color={'white'} fontSize={30} fontWeight={'bold'}>
                            {shopProduct && shopProduct?.name} - {shopProduct && categories.filter((category) => category._id === shopProduct.categorieId)[0].name}
                        </Text>
                        <Box h={'1px'} w={'full'} my={5} background={'rgb(255,255,255,.3)'}/>
                        {
                            shopProduct && <Text color={'white'} dangerouslySetInnerHTML={{ __html: shopProduct?.descriptionDetails }}/>
                        }
                        <Box h={'1px'} w={'full'} my={5} background={'rgb(255,255,255,.3)'}/>

                        <Center>
                            <Text color={'white'} fontSize={25}>{shopProduct?.price}{shopProduct?.isRealMoney ? '€' : ' Points Boutique'}</Text>
                        </Center>
                        <Center>
                            <Image src={ImageSecured.src} w={250} py={11} alt={'Secured payment image'}/>
                        </Center>
                        <Center>
                            <Text color={'rgb(255,255,255,.7)'}>Compte Minecraft connecté: {userInfos?.mcProfile?.name ? userInfos?.mcProfile?.name : 'NON CONNECTÉ'}</Text>
                        </Center>


                        <Button variant={'solid'} colorScheme={'blue'} isDisabled={!canBuyRole} onClick={() => userInfos?.mcProfile?.name ? handleBuy() : router.push('/profile')} mt={11} isLoading={getStripePaymentLinkLoading || payProductWithShopPointsLoading}>
                            {userInfos?.mcProfile?.name ? canBuyRole ? 'Acheter' : 'Grade déjà possédé' : 'Connecter mon compte Minecraft'}
                        </Button>
                    </Flex>
                    <Spacer/>
                    <Image src={shopProduct?.imageUrl} maxW={500} objectFit={'cover'} alt={'Shop product image'}/>
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