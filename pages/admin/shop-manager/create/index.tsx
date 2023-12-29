import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {
    getUserState,
} from "../../../../store/user/userSlice";
import {useDispatch, useSelector} from "../../../../store/store";
import AdminNavbar from "../../../../components/molecules/AdminNavbar/AdminNavbar";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    InputGroup,
    Select,
    Spacer,
    Text,
    useToast
} from "@chakra-ui/react";
import {ShopCategorie, ShopProduct} from "../../../../common/types/types";
import {shopCategories} from "../../../../common/shop/shopCategories";
import ShopProductCard from "../../../../components/molecules/ShopProductCard/ShopProductCard";
import MainLogo from '../../../../public/images/MainLogo.png';
import {createShopProduct} from "../../../../store/shop/shopActions";
import {getShopState} from "../../../../store/shop/shopSlice";
import {CreateShopProductDto} from "../../../../store/shop/dtos/createShopProductDto";
import {getStripeState} from "../../../../store/stripe/stripeSlice";
import {getActiveStripePrices, getStripeProducts} from "../../../../store/stripe/stripeActions";
import {roles} from "../../../../common/roles/roles";


const ShopManagerCreatePage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError, updateUserProfileSuccess, updateUserProfileError,
        getUserInfosError
    } = useSelector(getUserState)

    const {
        createShopProductLoading,
        createShopProductSuccess,
        createShopProductError
    } = useSelector(getShopState)

    const {
        getStripeProductsLoading,
        stripeProducts,
        getStripeProductsError,

        getActiveStripePricesLoading,
        activeStripePrices,
        getActiveStripePricesError
    } = useSelector(getStripeState)

    const temporaryCategories: Array<ShopCategorie> = shopCategories;

    const [currentShopCategories, setCurrentShopCategories] = useState<Array<ShopCategorie>>()

    const [selectedCategorie, setSelectedCategorie] = useState<string>()

    const [selectedProducts, setSelectedProducts] = useState<Array<ShopProduct>>()


    const [productName, setProductName] = useState<string>();
    const [productDescription, setProductDescription] = useState<string>();
    const [productDescriptionDetails, setProductDescriptionDetails] = useState<string>();
    const [productPrice, setProductPrice] = useState<number>();
    const [productIsRealMoney, setProductIsRealPrice] = useState<boolean>();
    const [productImageUrl, setProductImageUrl] = useState<string>()
    const [productStripeLink, setProductStripeLink] = useState<string>()
    const [productCategorie, setProductCategorie] = useState<string>()
    const [productPointsToGive, setProductPointsToGive] = useState<number>()
    const [productRoleToGive, setProductRoleToGive] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()


    const handleChangeProductName = (event: any) => setProductName(event.target.value);
    const handleChangeProductDescription = (event: any) => setProductDescription(event.target.value);
    const handleChangeProductDescriptionDetails = (event: any) => setProductDescriptionDetails(event.target.value);
    const handleChangeProductPrice = (event: any) => setProductPrice(event.target.value);
    const handleChangeProductImageUrl = (event: any) => setProductImageUrl(event.target.value);
    const handleChangeStripeLink = (event: any) => setProductStripeLink(event.target.value.toLowerCase());
    const handleChangeProductMonneyType = (event: any) => event.target.value === "true" ? setProductIsRealPrice(true) : setProductIsRealPrice(false);
    const handleChangeProductCategorie = (event: any) => setProductCategorie(event.target.value);
    const handleChangeProductStripeLink = (event: any) => {
        setProductStripeLink(event.target.value);
        if (activeStripePrices) {
            setProductPrice(activeStripePrices?.filter((stripePrice) => stripePrice.id === stripeProducts?.filter((stripeProduct) => stripeProduct.id === event.target.value)[0].default_price)[0].unit_amount / 100)
        }
    };
    const handleChangeProductPointsToGive = (event: any) => setProductPointsToGive(event.target.value);
    const handleChangeProductRoleToGive = (event: any) => setProductRoleToGive(event.target.value);

    const toastError = (error : string) => {
        setErrorMessage(error)
        toast({
            title: "Erreur",
            description: error,
            status: 'error',
            duration: toastDuration,
            isClosable: true,
            position: 'bottom-right',
        });
    }

    const handleCreate = (event: any) => {
        setErrorMessage('')
        if(!productName){
            toastError('Le nom du produit est obligatoire !')
            return;
        }
        if(!productPrice || productPrice <= 0){
            toastError('Le prix ne peut pas être égal ou inférieur à 0 !')
            return;
        }
        if(!productCategorie){
            toastError('Le produit doit faire forcémment parti d\'une catégorie !')
            return;
        }
        if(!productDescription){
            toastError('La description du produit est obligatoire !')
            return;
        }
        if(!productDescriptionDetails){
            toastError('La description détaillée du produit est obligatoire !')
            return;
        }
        if(!productImageUrl){
            toastError('L\'image est obligatoire !')
            return;
        }
        if(productIsRealMoney && !productStripeLink){
            toastError('Veuillez lier le produit à un produit stripe pour pouvoir utiliser de la vraie monnaie !')
            return;
        }

        if (productCategorie == 'points' && !productPointsToGive){
            toastError('Veuillez préciser le montant de points boutiques à donner !')
            return;
        }
        if (productCategorie == 'grades' && !productRoleToGive){
            toastError('Veuillez préciser le grade à donner !')
            return;
        }

        const shopProductDto: CreateShopProductDto = {
            name: productName,
            description: productDescription,
            categorieId: productCategorie,
            price: productPrice,
            isRealMoney:productIsRealMoney,
            imageUrl:productImageUrl,
            stripeLink:productStripeLink,
            descriptionDetails: productDescriptionDetails,
            pointsToGive: productPointsToGive,
            roleToGive: productRoleToGive
        }
        dispatch(createShopProduct(auth?.accessToken, shopProductDto));
    }

    const toast = useToast();
    const toastDuration = 10000;


    useEffect(() => {
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin'))){
            router.push('/')
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

        if(auth?.accessToken && currentShopCategories === undefined){


            temporaryCategories.sort((a, b) => a.place - b.place);

            setCurrentShopCategories(temporaryCategories)

            const exEvent = {
                target: {
                    id: temporaryCategories[0]._id
                }
            }

        }

        if(createShopProductSuccess && currentShopCategories){
            toast({
                title: "Produit créé",
                description: "Le produit a été créé avec succès",
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            router.push('/admin/shop-manager')
        }

        if(createShopProductError && currentShopCategories) {
            toast({
                title: "Erreur",
                description: "Le produit n'a pas été créé. Contactez un développeur web. ",
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            console.log('Error: ',createShopProductError)
        }
    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError, createShopProductLoading, createShopProductSuccess, createShopProductError,
        temporaryCategories, currentShopCategories, toast]);

    useEffect(() => {
        if (auth?.accessToken){
            if(!stripeProducts) {
                if(process.env.NODE_ENV == 'development')
                    console.log('Getting stripe products')
                dispatch(getStripeProducts(auth.accessToken))
            }
            if (stripeProducts) {
                console.log('Got stripe products:', stripeProducts)
            }
            if (getStripeProductsError){
                toast({
                    title: "Erreur",
                    description: "Les produits stripe n'ont pas été récupérés. Contactez un développeur web. ",
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                console.log(getStripeProductsError)
            }
        }

    }, [dispatch, auth?.accessToken, router, stripeProducts, getStripeProductsLoading, getStripeProductsError, toast])

    useEffect(() => {
        if (auth?.accessToken){
            if(!activeStripePrices) {
                console.log('Getting stripe prices')
                dispatch(getActiveStripePrices(auth.accessToken))
            }
            if (activeStripePrices) {
                console.log('Got stripe prices:', activeStripePrices)
            }
            if (getActiveStripePricesError){
                toast({
                    title: "Erreur",
                    description: "Les prix stripe n'ont pas été récupérés. Contactez un développeur web. ",
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                console.log(getActiveStripePricesError)
            }
        }

    }, [dispatch, auth?.accessToken, router, activeStripePrices, getActiveStripePricesLoading, getActiveStripePricesError, toast])


    return (
        <AdminNavbar selected={'/shop-manager'}>
            <Flex w={'full'} minH={1000} bgColor={'rgb(76,78,82,1)'} borderRadius={5} color={'white'} p={10} direction={'column'}>
                <Heading fontSize={21} mb={3} textTransform={'uppercase'}>Créer un nouveau Produit</Heading>
                <Box>
                    <Flex direction={'row'}>
                        <Box w={250}>
                            <Text fontSize={19} mb={2} mt={5}>Nom</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} placeholder={'Nom du produit'} variant={'flushed'} type={'text'} value={productName} onChange={handleChangeProductName}></Input>
                            </InputGroup>
                        </Box>
                        <Box marginLeft={5}>
                            <Text fontSize={19} mb={2} mt={5}>Prix</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} disabled={productIsRealMoney} placeholder={'Prix du produit'} variant={'flushed'} type={'number'}
                                       value={
                                           productIsRealMoney ?
                                               !productStripeLink ? 0 :
                                                   // @ts-ignore
                                                   activeStripePrices?.filter((stripePrice) => stripePrice.id === stripeProducts?.filter((stripeProduct) => stripeProduct.id === productStripeLink)[0].default_price)[0].unit_amount / 100
                                               : productPrice}
                                       onChange={handleChangeProductPrice}></Input>
                            </InputGroup>
                        </Box>
                        <Box marginLeft={5}>
                            <Text fontSize={19} mb={2} mt={5}>Type de monnaie</Text>
                            <Select placeholder='- Type -' cursor={'pointer'} bgColor={'rgb(76,78,82,1)'} value={productIsRealMoney ? 'true' : 'false'} onChange={handleChangeProductMonneyType}>
                                <option value={'true'}>Euro €</option>
                                <option value={'false'}>Points boutique</option>
                            </Select>
                        </Box>
                        <Box marginLeft={5}>
                            <Text fontSize={19} mb={2} mt={5}>Catégorie</Text>
                            <Select placeholder='- Catégorie -' cursor={'pointer'} bgColor={'rgb(76,78,82,1)'} value={productCategorie} onChange={handleChangeProductCategorie}>
                                {
                                    currentShopCategories?.map((categorie) => {
                                        return <option value={categorie._id} key={categorie._id}>{categorie.name}</option>
                                    })
                                }
                            </Select>
                        </Box>
                        <Box marginLeft={5} display={productIsRealMoney ? 'block' : 'none'}>
                            <Text fontSize={19} mb={2} mt={5}>Liaison Stripe</Text>
                            <Select placeholder='- Liaison stripe -' cursor={'pointer'} bgColor={'rgb(76,78,82,1)'} value={productStripeLink} onChange={handleChangeProductStripeLink}>
                                {
                                    stripeProducts?.map((stripeProduct) => {
                                        return <option value={stripeProduct.id} key={stripeProduct.id}>Produit - {stripeProduct.name}</option>
                                    })
                                }
                            </Select>
                        </Box>
                    </Flex>
                    <Box>
                        <Box >
                            <Text fontSize={19} mb={2} mt={5}>Description</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} placeholder={'Description du produit'} variant={'flushed'} type={'text'} value={productDescription} onChange={handleChangeProductDescription}></Input>
                            </InputGroup>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Text fontSize={19} mb={2} mt={5}>Description détaillée</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} placeholder={'Description détaillée du produit'} variant={'flushed'} type={'text'} value={productDescriptionDetails} onChange={handleChangeProductDescriptionDetails}></Input>
                            </InputGroup>
                        </Box>
                    </Box>
                    {productCategorie == 'points' && (
                        <Box>
                            <Box >
                                <Text fontSize={19} mb={2} mt={5}>Points à donner</Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} maxW={300} placeholder={'Points à donner après paiement'} variant={'flushed'} type={"number"} value={productPointsToGive} onChange={handleChangeProductPointsToGive}></Input>
                                </InputGroup>
                            </Box>
                        </Box>
                    )}
                    {productCategorie == 'grades' && (
                        <Box>
                            <Box >
                                <Text fontSize={19} mb={2} mt={5}>Grade à donner</Text>
                                <Select placeholder='- Grade à donner -' cursor={'pointer'} bgColor={'rgb(76,78,82,1)'} value={productRoleToGive} onChange={handleChangeProductRoleToGive}>
                                    {
                                        roles?.map((role) => {
                                            return <option value={role._id} key={role._id}>{role.name}</option>
                                        })
                                    }
                                </Select>
                            </Box>
                        </Box>
                    )}
                    <Box >
                        <Box >
                            <Text fontSize={19} mb={2} mt={5}>URL image (temporaire) - priviligier les images basse résolution</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} placeholder={'Url de l\'image à afficher'} variant={'flushed'} type={'text'} value={productImageUrl} onChange={handleChangeProductImageUrl}></Input>
                            </InputGroup>
                        </Box>
                    </Box>
                    <Text color={'red'} marginTop={4} marginBottom={-10} display={errorMessage ? 'block' : 'none'}>{errorMessage}</Text>
                    <Button colorScheme={'blue'} variant={'solid'} marginBottom={50} marginTop={41} px={100} onClick={handleCreate} isLoading={createShopProductLoading}>Créer</Button>
                    <Text marginBottom={2} >Preview:</Text>
                    <ShopProductCard
                        product={{
                            _id: "tempId",
                            name: productName ? productName : "Nom du produit",
                            description: productDescription ? productDescription : "Description du produit",
                            price:productPrice ? productPrice : 0,
                            isRealMoney:productIsRealMoney ? productIsRealMoney : false,
                            categorieId:"points",
                            imageUrl: productImageUrl ? productImageUrl : MainLogo.src,
                            place:0,
                            descriptionDetails: productDescriptionDetails ? productDescriptionDetails : ""
                        }}
                        isEditing={false}/>
                </Box>
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

export default ShopManagerCreatePage;