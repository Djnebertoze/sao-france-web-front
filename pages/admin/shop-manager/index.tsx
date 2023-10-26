import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {getShopState} from "../../../store/shop/shopSlice";
import {ShopCategorie, ShopProduct} from "../../../common/types/types";
import {shopCategories} from "../../../common/shop/shopCategories";
import {useEffect, useState} from "react";
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
    InputLeftElement, Checkbox, Link as ChakraLink, Link, useToast, Skeleton, InputLeftAddon, InputRightElement, Wrap
} from "@chakra-ui/react";
import {getShopProducts} from "../../../store/shop/shopActions";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import ShopProductCard from "../../../components/molecules/ShopProductCard/ShopProductCard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const ShopManager: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError, updateUserProfileSuccess, updateUserProfileError,
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

    /*const shopProducts: Array<ShopProduct> = [
        {
            _id: "product_500_points",
            name: "500 Points Boutique",
            description: "Les points boutiques vous permettent d'acheter des cosmétiques, grades et pleins d'autres choses dans la boutique!",
            price:4.99,
            isRealMoney: true,
            categorieId:"points",
            imageUrl: "",
            place:2
        },
        {
            _id: "product_1000_points",
            name: "1000 + 100 Points Boutique",
            description: "Les points boutiques vous permettent d'acheter des cosmétiques, grades et pleins d'autres choses dans la boutique!",
            price:9.99,
            isRealMoney: true,
            categorieId:"points",
            imageUrl: "",
            place:0
        },
        {
            _id: "product_25k_points",
            name: "25k + 1500 Points Boutique",
            description: "Les points boutiques vous permettent d'acheter des cosmétiques, grades et pleins d'autres choses dans la boutique!",
            price:24.99,
            isRealMoney: true,
            categorieId:"points",
            imageUrl: "",
            place:1
        },
        {
            _id: "product_50k_points",
            name: "50k + 5k Points Boutique",
            description: "Les points boutiques vous permettent d'acheter des cosmétiques, grades et pleins d'autres choses dans la boutique!",
            price:49.99,
            isRealMoney: true,
            categorieId:"points",
            imageUrl: "",
            place:3
        },
        {
            _id: "product_100k_points",
            name: "100k + 10k Points Boutique",
            description: "Les points boutiques vous permettent d'acheter des cosmétiques, grades et pleins d'autres choses dans la boutique!",
            price:99.99,
            isRealMoney: true,
            categorieId:"points",
            imageUrl: "",
            place:4
        },
        {
            _id: "product_first_grade",
            name: "Grade jsp",
            description: "Grade ultra coooool",
            price:1000,
            isRealMoney: false,
            categorieId:"grades",
            imageUrl: "",
            place:0
        },
    ]*/

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

    const toast = useToast();
    const toastDuration = 10000;

    useEffect(() => {
        console.log('1')
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin'))){
            router.push('/')
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }


        if(auth?.accessToken && shopProducts){

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
    }, [dispatch, auth?.accessToken, router, userInfos?._id, userLoginError, getUserInfosError, shopProducts, getShopProductsError, getShopProductsLoading]);

    useEffect(() => {
        if(auth?.accessToken){
            console.log("GETTING PRODUCTS")
            dispatch(getShopProducts(auth.accessToken))
        }
    }, [dispatch, router, removeShopProductSuccess])

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
    }, [removeShopProductLoading]);


    return (
        <AdminNavbar selected={'/shop-manager'}>
            <Flex w={'full'} h={800}>
                <Flex h={'auto'} bgColor={'rgb(76,78,82,1)'} borderTop={'1px solid rgb(0,0,0,.2)'} borderRadius={5} flex={1} align={'center'}
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
                <Flex w={'full'} h={800} bgColor={'rgb(76,78,82,.85)'} borderTop={'1px solid rgb(0,0,0,.2)'} borderRadius={5} flexDirection={'column'} px={7} pt={5} overflow={"auto"}>
                    <Button colorScheme={'blue'} variant={'solid'} marginBottom={3} py={4} onClick={(e) => router.push('/admin/shop-manager/create')}>
                        + Créer
                    </Button>

                    <Wrap>
                    {
                        selectedProducts?.map((product) => {
                            return <ShopProductCard product={product} key={product._id} isEditing={true}/>
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