import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {getShopState} from "../../../store/shop/shopSlice";
import {ShopCategorie, ShopProduct} from "../../../common/types/types";
import {shopCategories} from "../../../common/shop/shopCategories";
import {useEffect, useState} from "react";
import {Box, Button, Flex, Text, useToast, Wrap} from "@chakra-ui/react";
import {getShopProducts} from "../../../store/shop/shopActions";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import AdminShopProductCard from "../../../components/molecules/ShopProductCard/AdminShopProductCard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getMaxPowerFromUserRoles} from "../../../store/helper";


const ShopManager: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError
    } = useSelector(getUserState)

    const {
        shopProducts,
        getShopProductsLoading,
        getShopProductsError,
        removeShopProductLoading,
        removeShopProductError,
        removeShopProductSuccess
    } = useSelector(getShopState)

    const temporaryCategories: ShopCategorie[] = shopCategories;

    const [currentShopCategories, setCurrentShopCategories] = useState<Array<ShopCategorie>>()

    const [selectedCategorie, setSelectedCategorie] = useState<string>()

    const [selectedProducts, setSelectedProducts] = useState<Array<ShopProduct>>()

    const handleSelectCategorie = (event: any) => {
        setSelectedProducts([])
        setSelectedCategorie(event.target.id)

        if (shopProducts) {
            const categorieProducts = shopProducts.filter(product => product.categorieId === event.target.id);
            categorieProducts.sort((a, b) => a.place - b.place)
            setSelectedProducts(categorieProducts)
        }
    }

    const toast = useToast();
    const toastDuration = 10000;

    useEffect(() => {
        if(auth?.accessToken && userInfos && getMaxPowerFromUserRoles(userInfos.roles) < 6){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }


        if(auth?.accessToken && shopProducts){
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

        if(auth?.accessToken && !shopProducts){
            dispatch(getShopProducts())
        }

        if(getShopProductsError){
            toast({
                title: "Erreur",
                description: "Impossible de récupérer les produits. Contactez un développeur web.",
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            console.log(getShopProductsError)
        }
    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError, shopProducts, getShopProductsError, getShopProductsLoading,
        temporaryCategories, toast]);

    useEffect(() => {
        if(auth?.accessToken && currentShopCategories){
            if (removeShopProductSuccess) {
                toast({
                    title: "Produit supprimé",
                    description: "Le produit a été supprimé avec succès",
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
            }

            if (removeShopProductError) {
                toast({
                    title: "Erreur",
                    description: "Le produit n'a pas été supprimé. Contactez un développeur web. ",
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
            }
        }
    }, [removeShopProductLoading, auth?.accessToken, currentShopCategories, removeShopProductError, removeShopProductSuccess, toast]);


    return (
        <AdminNavbar selected={'/shop-manager'}>
            <Flex w={'full'} h={800}>
                <Flex h={'auto'} /*bgColor={'rgb(76,78,82,1)'} borderTop={'1px solid rgb(0,0,0,.2)'}*/ borderRadius={5} flex={1} align={'center'}
                      flexDirection={'column'}>
                    <Text color={'white'} fontWeight={'bold'} fontSize={17} textTransform={'uppercase'} marginTop={3}>Éditeur de boutique</Text>
                    <Text color={'red'} fontSize={12}>(admin)</Text>
                    <Box marginBottom={3}/>
                    {
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
                    }
                </Flex>
                <Flex w={'full'} h={900} /*bgColor={'rgb(76,78,82,.85)'} borderTop={'1px solid rgb(0,0,0,.2)'}*/ borderRadius={5} flexDirection={'column'} px={7} pt={5} overflow={"auto"}>
                    <Button colorScheme={'blue'} variant={'solid'} marginBottom={3} py={4} onClick={() => router.push('/admin/shop-manager/create')}>
                        + Créer
                    </Button>

                    <Wrap>
                    {
                        selectedProducts?.map((product) => {
                            return (<li key={product._id}><AdminShopProductCard product={product} isEditing={true}/></li>)
                        })
                    }
                    </Wrap>
                </Flex>
            </Flex>
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

export default ShopManager;