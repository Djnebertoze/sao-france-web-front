import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {Box, Button, Center, Container, Flex, Image, Link, Spacer, Text, useToast,} from "@chakra-ui/react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


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

           // setCanBuyRole(!(userInfos && shopProduct?.categorieId === 'grades' && shopProduct?.roleToGive != undefined && (userInfos.roles.includes(shopProduct.roleToGive) || rolePower < getMaxPowerUserGradesFromUserRoles(userInfos.roles)))
            //    || !(userInfos && shopProduct?.categorieId === 'upgrades' && shopProduct?.roleFinal != undefined && (userInfos.roles.includes(shopProduct.roleFinal) || rolePower < getMaxPowerUserGradesFromUserRoles(userInfos.roles))))
            setCanBuyRole(!(
                (shopProduct?.categorieId === 'grades' && userInfos && shopProduct?.roleToGive != undefined && (userInfos.roles.includes(shopProduct.roleToGive) || rolePower < getMaxPowerUserGradesFromUserRoles(userInfos.roles)))
                || (shopProduct?.categorieId === 'upgrades' && userInfos && shopProduct?.roleFinal != undefined && (userInfos.roles.includes(shopProduct.roleFinal) || rolePower < getMaxPowerUserGradesFromUserRoles(userInfos.roles))))
            );
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
            <Flex color={'white'} maxW={'full'} py={10} px={50} mx={0} className={'main-background'} w={'full'} minH={800} flexDirection={"row"} pt={120}>
                <Box>
                    <Button color={'white'} background={'none'} _hover={{background: 'rgb(255,255,255,.2)'}} onClick={() => router.push('/shop')}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        <Text ml={5} textTransform={'uppercase'}>Retour</Text>
                    </Button>
                </Box>
                <Spacer/>
                <Box maxW={1000} minW={800} borderLeft={'1px solid white'} px={7}>
                    <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={23} mt={4}>
                        {shopProduct?.name}
                    </Text>
                    <Box h={'1px'} w={'full'} backgroundColor={'white'} my={4}/>
                    {
                        shopProduct && <Text color={'white'} mb={5} dangerouslySetInnerHTML={{ __html: shopProduct?.descriptionDetails }}/>
                    }
                    <Center>
                        <Text color={'rgb(255,255,255,.7)'}>(Compte Minecraft connecté: {userInfos?.mcProfile?.name ? userInfos?.mcProfile?.name : 'NON CONNECTÉ'})</Text>
                    </Center>
                    <Center>
                        <Text color={'white'}fontWeight={'bold'} mt={5} fontSize={23}>{shopProduct?.price}{shopProduct?.isRealMoney ? '€' : ' Points Boutique'}</Text>
                    </Center>
                    <Center>
                        <Button px={100}
                                borderRadius={5}
                                py={4}
                                pb={5}
                                mt={2}
                                isDisabled={!canBuyRole}
                                onClick={() => userInfos?.mcProfile?.name ? handleBuy() : router.push('/profile')}
                                isLoading={getStripePaymentLinkLoading || payProductWithShopPointsLoading}>
                            {userInfos?.mcProfile?.name ? canBuyRole ? 'Acheter' : 'Grade déjà possédé' : 'Connecter mon compte Minecraft'}
                        </Button>
                    </Center>
                    <Center>
                        <Text color={'rgb(255,255,255,.7)'}>
                            Paiement géré
                            <Link ml={1} as={'a'} href={'https://stripe.com/'} target={'_blank'} textDecoration={'underline'} cursor={'pointer'} _hover={{color: 'white'}}>
                                Stripe
                            </Link>
                        </Text>
                    </Center>

                </Box>
                <Box borderLeft={'1px solid white'} h={150} pl={5}>
                    <Image maxH={150} borderRadius={10} src={shopProduct?.imageUrl} alt={'Product image'}/>
                </Box>
                <Spacer/>
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