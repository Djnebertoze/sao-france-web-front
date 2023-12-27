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
    Wrap,
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {
    getUserState,
} from "../../store/user/userSlice";
import {getUserProfile, login, register, requestXboxServices, updateUserProfile} from "../../store/user/userActions";
import {useDispatch, useSelector} from "../../store/store";
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
        userLoginLoading,
        userLoginError, minecraftProfile, getMinecraftProfileError
    } = useSelector(getUserState)
    const {
        shopProducts,
        getShopProductsLoading
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
        /*console.log('usss')*/

        if (auth?.accessToken) {
            if (!userInfos){
                dispatch(getUserProfile(auth.accessToken))
            }
            if (userInfos) {

            }
        }

        if(auth?.accessToken && shopProducts && !getShopProductsLoading){
            /*console.log('usss1')
            console.log(shopProducts)*/
            console.log('Got products')
            temporaryCategories.sort((a, b) => a.place - b.place);



            setCurrentShopCategories(temporaryCategories)

            setSelectedProducts([])
            setSelectedCategorie(temporaryCategories[0]._id)

            if (shopProducts) {
                const categorieProducts = shopProducts.filter(product => product.categorieId === temporaryCategories[0]._id);
                categorieProducts.sort((a, b) => a.place - b.place)
                setSelectedProducts(categorieProducts)
            }
        }

        if(auth?.accessToken && !shopProducts && !getShopProductsLoading){
            console.log('Getting products')
            dispatch(getShopProducts(auth.accessToken))
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

    }, [dispatch, auth, toast, router, userInfos, userLoginLoading, userLoginError, minecraftProfile, shopProducts, temporaryCategories, getShopProductsLoading]);

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
                                        selectedProducts?.length != 0 ? ( selectedProducts?.map((product) => {
                                                return <li key={product._id}><ShopProductCard product={product} isEditing={false}/></li>
                                            })
                                        ) : (
                                            <Text color={'white'} fontSize={19}>Section &apos;{currentShopCategories?.filter((shopCategorie) => shopCategorie._id === selectedCategorie)[0].name}&apos; encore indisponible ! Revenez plus tard ! :D</Text>
                                        )
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