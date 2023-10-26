import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Image,
    Spacer,
    Text,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    Checkbox,
    Link as ChakraLink,
    Link,
    useToast,
    Skeleton,
    InputLeftAddon,
    InputRightElement,
    Wrap,
    SkeletonText
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Form} from "@chakra-ui/theme/dist/components";
import {AtSignIcon, CalendarIcon, EmailIcon, ExternalLinkIcon, PhoneIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import {
    getMinecraftProfileRequest,
    getMinecraftProfileSuccess,
    getUserState,
    updateUserProfileRequest
} from "../../store/user/userSlice";
import {getUserProfile, login, register, requestXboxServices, updateUserProfile} from "../../store/user/userActions";
import {useDispatch, useSelector} from "../../store/store";
import {use} from "i18next";
import {Tags} from "../../components/atoms/Tags/Tags";

import {getRoleById} from '../../common/roles/roles'

import {faEdit, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../../store/authConfig";
import {callMsGraph} from "../../common/oauth/microsoft/graph";
import axios from "axios";
import parseJson from "parse-json";
import {getAPIUrl} from "../../store/helper";
import ShopProductCard from "../../components/molecules/ShopProductCard/ShopProductCard";
import {ShopCategorie, ShopProduct} from "../../common/types/types";
import {shopCategories} from "../../common/shop/shopCategories";
import {getShopState} from "../../store/shop/shopSlice";
import {getShopProducts} from "../../store/shop/shopActions";


const ShopPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const temporaryCategories: ShopCategorie[] = shopCategories;

    const {
        auth,
        userInfos,
        getUserInfosLoading,
        userLoginLoading,
        userLoginError, updateUserProfileSuccess, updateUserProfileError,
        getMinecraftProfileLoading, minecraftProfile, getMinecraftProfileError
    } = useSelector(getUserState)
    const {
        shopProducts,
        getShopProductsLoading,
        getShopProductsError,
    } = useSelector(getShopState)


    const {t} = useTranslation();

    const toast = useToast();
    const toastDuration = 1000;

    const [currentShopCategories, setCurrentShopCategories] = useState<Array<ShopCategorie>>()

    const [selectedCategorie, setSelectedCategorie] = useState<string>()

    const [selectedProducts, setSelectedProducts] = useState<Array<ShopProduct>>()

    const handleSelectCategorie = (event: any) => {
        setSelectedProducts([])
        setSelectedCategorie(event.target.id)


        console.log(shopProducts)

        //const categorieProducts = shopProducts.filter(product => product.categorieId === event.target.id)
        if (shopProducts) {
            const categorieProducts = shopProducts.filter(product => product.categorieId === event.target.id);
            categorieProducts.sort((a, b) => a.place - b.place)
            setSelectedProducts(categorieProducts)
        }
    }

    useEffect(() => {
        console.log('usss')

        if (auth?.accessToken) {
            dispatch(getUserProfile(auth.accessToken))
            if (userInfos) {

            }
        }

        if(auth?.accessToken && shopProducts){
            console.log('usss1')
            console.log(shopProducts)
            temporaryCategories.sort((a, b) => a.place - b.place);



            setCurrentShopCategories(temporaryCategories)

            console.log("cat", temporaryCategories)

            const exEvent = {
                target: {
                    id: temporaryCategories[0]._id
                }
            }

            handleSelectCategorie(exEvent)
        }

        if(auth?.accessToken && !shopProducts){
            dispatch(getShopProducts(auth.accessToken))
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

    }, [dispatch, auth, toast, router, userInfos?._id, userLoginLoading, userLoginError, minecraftProfile, shopProducts]);

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
    }, [getMinecraftProfileError])

    let tagsMargin = 4;

    return (
        <Container maxW={'full'} margin={0} padding={0} mt={80.1}>
            <Container maxW={'full'} p={0} mx={0} className={'main-background'} minH={'100%'} w={'full'}>

                <Flex w={'full'} h={'100%'} className={'main-background'}>
                        <Flex h={'auto'} className={'secondary-background'} borderTop={'1px solid rgb(0,0,0,.2)'} flex={1} align={'center'} borderRightRadius={10}
                              flexDirection={'column'}>
                            <Text color={'white'} fontWeight={'bold'} fontSize={17} textTransform={'uppercase'} marginTop={3}>Boutique</Text>
                            <Box marginBottom={3}/>
                            {shopProducts ? (
                                currentShopCategories?.map((categorie) => {
                                    return (
                                        <>
                                            <Flex w={200}
                                                  marginTop={2}
                                                  key={categorie._id}
                                                  fontSize={16}
                                                  cursor={'pointer'}
                                                  border={selectedCategorie === categorie._id ? '1px solid white' : ''}
                                                  borderLeft={selectedCategorie === categorie._id ? 'none' : '1px solid white'}
                                                  color={'white'}
                                                  mx={4} py={3}
                                                  paddingLeft={4}
                                                  borderRadius={4}
                                                  id={categorie._id}
                                                  onClick={handleSelectCategorie}
                                                  _hover={{bgColor: 'rgb(255,255,255,1)', color: 'black'}}>
                                                {categorie.name}
                                            </Flex>
                                        </>
                                    );
                                })
                            ) : (
                                <Skeleton w={200} h={50} marginTop={2} mx={4} py={3} fontSize={16} paddingLeft={4} borderRadius={4} isLoaded={shopProducts != undefined}/>
                            )}
                        </Flex>
                        <Flex w={'full'} minH={900}  borderTop={'1px solid rgb(0,0,0,.2)'} flexDirection={'row'} px={7} pt={5} overflow={"auto"} display={"flex"} >
                            {shopProducts ? (
                                <Wrap justify={'center'}>
                                    {
                                        selectedProducts?.map((product) => {
                                            return <ShopProductCard product={product} key={product._id} isEditing={false}/>
                                        })
                                    }
                                </Wrap>
                            ) : (
                                <Wrap justify={'center'}>
                                    <Skeleton w={280} h={430} borderRadius={7} marginBottom={10} marginRight={15} isLoaded={shopProducts != undefined}/>
                                    <Skeleton w={280} h={430} borderRadius={7} marginBottom={10} marginRight={15} isLoaded={shopProducts != undefined}/>
                                    <Skeleton w={280} h={430} borderRadius={7} marginBottom={10} marginRight={15} isLoaded={shopProducts != undefined}/>
                                </Wrap>
                            )}

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

export default ShopPage;