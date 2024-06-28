import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useRef, useState} from "react";
import {getUserState,} from "../../../../store/user/userSlice";
import {useDispatch, useSelector} from "../../../../store/store";
import AdminNavbar from "../../../../components/molecules/AdminNavbar/AdminNavbar";
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    Select,
    Switch,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import {ShopCategorie} from "../../../../common/types/types";
import {shopCategories} from "../../../../common/shop/shopCategories";
import AdminShopProductCard from "../../../../components/molecules/ShopProductCard/AdminShopProductCard";
import MainLogo from '../../../../public/images/MainLogo.png';
import {editShopProduct, getShopProduct} from "../../../../store/shop/shopActions";
import {getShopState} from "../../../../store/shop/shopSlice";
import {getStripeState} from "../../../../store/stripe/stripeSlice";
import {CreateShopProductDto} from "../../../../store/shop/dtos/createShopProductDto";
import {getActiveStripePrices, getStripeProducts} from "../../../../store/stripe/stripeActions";
import {roles} from "../../../../common/roles/roles";
import {getMaxPowerFromUserRoles} from "../../../../store/helper";

import { Editor } from '@tinymce/tinymce-react';





const ShopManagerEditPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError, getUserInfosError
    } = useSelector(getUserState)

    const {
        getShopProductLoading,
        shopProduct,
        getShopProductError,

        editShopProductLoading,
        editShopProductSuccess,
        editShopProductError
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
    

    const [productName, setProductName] = useState<string>();
    const [productDescription, setProductDescription] = useState<string>();
    const [productDescriptionDetails, setProductDescriptionDetails] = useState<string>();
    const [productPrice, setProductPrice] = useState<number>();
    const [productIsRealMoney, setProductIsRealPrice] = useState<boolean>();
    const [productImageUrl, setProductImageUrl] = useState<string>()
    const [productCategory, setProductCategory] = useState<string>()
    const [productStripeLink, setProductStripeLink] = useState<string>()
    const [productPointsToGive, setProductPointsToGive] = useState<number>()
    const [productRoleToGive, setProductRoleToGive] = useState<string>()
    const [productCosmeticToGive, setProductCosmeticToGive] = useState<string>()
    const [productBonusShopPoints, setProductBonusShopPoints] = useState<number>(0)
    const [productActive, setProductActive] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>()

    const handleChangeProductName = (event: any) => setProductName(event.target.value);
    const handleChangeProductDescription = (event: any) => setProductDescription(event.target.value);
    const handleChangeProductDescriptionDetails = (event: any) => setProductDescriptionDetails(event.target.value);
    const handleChangeProductPrice = (event: any) => setProductPrice(event.target.value);
    const handleChangeProductImageUrl = (event: any) => setProductImageUrl(event.target.value);
    const handleChangeProductMoneyType = (event: any) => event.target.value === "true" ? setProductIsRealPrice(true) : setProductIsRealPrice(false);
    const handleChangeProductCategorie = (event: any) => setProductCategory(event.target.value);
    const handleChangeProductBonusShopPoints = (event: any) => setProductBonusShopPoints(event.target.value);

    const handleChangeProductStripeLink = (event: any) => {
        setProductStripeLink(event.target.value);
        if (activeStripePrices) {
            setProductPrice(activeStripePrices?.filter((stripePrice) => stripePrice.id === stripeProducts?.filter((stripeProduct) => stripeProduct.id === event.target.value)[0].default_price)[0].unit_amount / 100)
        }
    };

    const handleChangeProductPointsToGive = (event: any) => setProductPointsToGive(event.target.value);
    const handleChangeProductRoleToGive = (event: any) => setProductRoleToGive(event.target.value);
    const handleChangeProductCosmeticToGive = (event: any) => setProductCosmeticToGive(event.target.value);


    const productUrlId = router.query.id;

    const editorRef = useRef<Editor>(null);

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

    const handleEdit = () => {
        setErrorMessage('')
        if(!productName){
            toastError('Le nom du produit est obligatoire !')
            return;
        }
        if(!productPrice || productPrice <= 0){
            toastError('Le prix ne peut pas être égal ou inférieur à 0 !')
            return;
        }
        if(!productCategory){
            toastError('Le produit doit faire forcément parti d\'une catégorie !')
            return;
        }
        if(!productDescription){
            toastError('La description du produit est obligatoire !')
            return;
        }
        if(!editorRef.current || !editorRef.current.editor?.getContent({ format: "html" })){
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

        if (productCategory == 'points' && !productPointsToGive){
            toastError('Veuillez préciser le montant de points boutiques à donner !')
            return;
        }

        if (productCategory == 'grades' && !productRoleToGive){
            toastError('Veuillez préciser le grade à donner !')
            return;
        }

        if (productCategory == 'cosmetiques' && !productCosmeticToGive){
            toastError('Veuillez renseigner l\'id du cosmétique à donner ingame !')
            return;
        }

        if(!editorRef.current){
            toastError('Erreur tiny. Contactez un développeur web.')
            return;
        }

        const shopProductDto: CreateShopProductDto = {
            name: productName,
            description: productDescription,
            categorieId: productCategory,
            // @ts-ignore
            price: productIsRealMoney ? activeStripePrices?.filter((stripePrice) => stripePrice.id ===
                stripeProducts?.filter((stripeProduct) => stripeProduct.id === productStripeLink)[0].default_price)[0].unit_amount / 100
                : productPrice,
            isRealMoney:productIsRealMoney,
            imageUrl:productImageUrl,
            stripeLink: productStripeLink,
            descriptionDetails: editorRef.current.editor?.getContent({ format: "html" }),
            pointsToGive: productPointsToGive,
            roleToGive: productRoleToGive,
            cosmeticToGive: productCosmeticToGive,
            bonusShopPoints: productBonusShopPoints,
            active: productActive
        }

        console.log("a", shopProductDto)
        dispatch(editShopProduct(auth?.accessToken, shopProductDto, productUrlId));
    }

    const toast = useToast();
    const toastDuration = 3000;


    useEffect(() => {
        if(auth?.accessToken && userInfos && getMaxPowerFromUserRoles(userInfos.roles) < 6){
            router.push('/').then(() => {})
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

        console.log(currentShopCategories)

        if(auth?.accessToken && currentShopCategories === undefined && productUrlId){


            temporaryCategories.sort((a, b) => a.place - b.place);

            setCurrentShopCategories(temporaryCategories)


            // @ts-ignore
            dispatch(getShopProduct(auth.accessToken, productUrlId))
        }

    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError, currentShopCategories,
        productUrlId,temporaryCategories]);

    useEffect(() => {
        if (auth?.accessToken){
            if(!stripeProducts) {
                console.log('Getting stripe products')
                dispatch(getStripeProducts(auth.accessToken))
            }
            if (stripeProducts) {
                console.log('Got stripe products:', stripeProducts)
            }
            if (getStripeProductsError){
                toast({
                    title: "Erreur",
                    description: "Les produits stripe n'ont pas été récupérés. Contactez un développeur web.",
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

    useEffect(() => {
        if(currentShopCategories) {
            console.log(editShopProductLoading)
            if (editShopProductSuccess) {
                toast({
                    title: "Produit modifié",
                    description: "Le produit a été modifié avec succès",
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                router.push('/admin/shop-manager').then(() => { router.reload() })
            }

            if (editShopProductError) {
                toast({
                    title: "Erreur",
                    description: "Le produit n'a pas été modifié. Contactez un développeur web. ",
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                console.log(editShopProductError)
            }
        }
    }, [editShopProductLoading, toast, currentShopCategories, editShopProductError, editShopProductSuccess, router])



    useEffect(() => {
        if(shopProduct){
            setProductName(shopProduct.name);
            setProductDescription(shopProduct.description);
            setProductCategory(shopProduct.categorieId);
            setProductPrice(shopProduct.price);
            setProductIsRealPrice(shopProduct.isRealMoney);
            setProductImageUrl(shopProduct.imageUrl)
            setProductDescriptionDetails(shopProduct.descriptionDetails)
            setProductStripeLink(shopProduct.stripeLink)
            setProductActive(shopProduct.active)
            if(shopProduct.categorieId == 'points'){
                setProductPointsToGive(shopProduct.pointsToGive)
            }
            if(shopProduct.categorieId == 'grades'){
                setProductRoleToGive(shopProduct.roleToGive)
            }
            if(shopProduct.categorieId == 'cosmetiques'){
                setProductCosmeticToGive(shopProduct.cosmeticToGive)
            }
            if (shopProduct.bonusShopPoints) {
                setProductBonusShopPoints(shopProduct.bonusShopPoints)
            } else {
                setProductBonusShopPoints(0)
            }
        }
        if(getShopProductError) {
            toast({
                title: "Erreur",
                description: "Le produit n'a pas été récupéré correctement. Contactez un développeur web. ",
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            console.log(getShopProductError)
        }
    }, [shopProduct, getShopProductLoading, getShopProductError, toast])


    return (
        <AdminNavbar selected={'/shop-manager'}>

            <Flex w={'full'} minH={1000} bgColor={'rgb(76,78,82,1)'} borderRadius={5} color={'white'} p={10} direction={'column'}>
                <Heading fontSize={21} mb={3} textTransform={'uppercase'}>Éditer un Produit</Heading>
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
                                            activeStripePrices?.filter((stripePrice) => stripePrice.id === stripeProducts?.filter((stripeProduct) => stripeProduct.id === productStripeLink)[0]?.default_price)[0]?.unit_amount / 100
                                        : productPrice}
                                       onChange={handleChangeProductPrice}></Input>
                            </InputGroup>
                        </Box>
                        <Box marginLeft={5}>
                            <Text fontSize={19} mb={2} mt={5}>Type de monnaie</Text>
                            <Select placeholder='- Type -' cursor={'pointer'} bgColor={'rgb(76,78,82,1)'} value={productIsRealMoney ? 'true' : 'false'} onChange={handleChangeProductMoneyType}>
                                <option value={'true'}>Euro €</option>
                                <option value={'false'}>Points boutique</option>
                            </Select>
                        </Box>
                        <Box marginLeft={5}>
                            <Text fontSize={19} mb={2} mt={5}>Catégorie</Text>
                            <Select placeholder='- Catégorie -' cursor={'pointer'} bgColor={'rgb(76,78,82,1)'} value={productCategory} onChange={handleChangeProductCategorie}>
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
                        <Box marginLeft={5}>
                            <Text fontSize={19} mb={2} mt={5}>Actif</Text>
                            <Switch isChecked={productActive} colorScheme={'green'} onChange={() => setProductActive(!productActive)}></Switch>
                        </Box>
                    </Flex>
                    <Box>
                        <Box >
                            <Text fontSize={19} mb={2} mt={5}>Description</Text>
                            <Textarea minH={150} w={295} placeholder={'Description du produit'} variant={'outline'} value={productDescription} onChange={handleChangeProductDescription}></Textarea>
                        </Box>
                    </Box>
                    <Box>
                        <Box >
                            <Text fontSize={19} mb={2} mt={5}>Description détaillée</Text>
                            <Editor
                                ref={editorRef}
                                apiKey='ditt62sm5hx43cifojam7fe5s5uyvos6s0kp07iwh95t6xrs'
                                init={{
                                    plugins: 'advlist link image lists table',
                                    toolbar: 'undo redo | fontsize | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
                                    menubar: 'edit insert format table'
                                }}
                                initialValue={productDescriptionDetails}
                            />
                        </Box>
                    </Box>
                    {productCategory == 'points' && (
                        <Box>
                            <Box >
                                <Text fontSize={19} mb={2} mt={5}>Points à donner</Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} maxW={300} placeholder={'Points à donner après paiement'} variant={'flushed'} type={"number"} value={productPointsToGive} onChange={handleChangeProductPointsToGive}></Input>
                                </InputGroup>
                            </Box>
                        </Box>
                    )}
                    {productCategory == 'cosmetiques' && (
                        <Box>
                            <Box >
                                <Text fontSize={19} mb={2} mt={5}>Id du cosmétique</Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} maxW={300} placeholder={'Id du cosmétique à donner après paiement'} variant={'flushed'} type={"text"} value={productCosmeticToGive} onChange={handleChangeProductCosmeticToGive}></Input>
                                </InputGroup>
                            </Box>
                        </Box>
                    )}
                    {productCategory == 'grades' && (
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
                    <Box>
                        <Box>
                            <Text fontSize={19} mb={2} mt={5}>Points boutique bonus (facultatif)</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} placeholder={'Points boutique bonus'} variant={'flushed'} type={'number'} value={productBonusShopPoints} onChange={handleChangeProductBonusShopPoints}></Input>
                            </InputGroup>
                        </Box>
                    </Box>
                    <Box >
                        <Box >
                            <Text fontSize={19} mb={2} mt={5}>URL image (temporaire) - privilégier les images basse résolution</Text>
                            <InputGroup w={'full'}>
                                <Input w={'full'} placeholder={'Url de l\'image à afficher'} variant={'flushed'} type={'text'} value={productImageUrl} onChange={handleChangeProductImageUrl}></Input>
                            </InputGroup>
                        </Box>
                    </Box>
                    <Text color={'red'} marginTop={4} marginBottom={-10} display={errorMessage ? 'block' : 'none'}>{errorMessage}</Text>
                    <Button colorScheme={'blue'}
                            variant={'solid'}
                            marginBottom={50}
                            marginTop={41}
                            px={100}
                            onClick={handleEdit}
                            isLoading={editShopProductLoading || getShopProductLoading}>
                        Valider
                    </Button>
                    <Text marginBottom={2} >Preview:</Text>
                    <AdminShopProductCard
                        product={{
                            _id: "tempId",
                            name: productName ? productName : "Nom du produit",
                            description: productDescription ? productDescription : "Description du produit",
                            price:productPrice ? productPrice : 0,
                            isRealMoney:productIsRealMoney ? productIsRealMoney : false,
                            categorieId:"points",
                            imageUrl: productImageUrl ? productImageUrl : MainLogo.src,
                            place:0,
                            descriptionDetails: productDescriptionDetails ? productDescriptionDetails : "",
                            active: productActive
                        }}
                        isEditing={false} isPreview={true}/>
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

export default ShopManagerEditPage;