import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {getShopState} from "../../../store/shop/shopSlice";
import {useEffect, useState} from "react";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {
    Box,
    Button, Center,
    Flex, Input, InputGroup, Select,
    Skeleton,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import {getMaxPowerFromUserRoles} from "../../../store/helper";
import {getShopProducts, getTransactionsList, getTransactionsSizedList} from "../../../store/shop/shopActions";
import {getUsersList} from "../../../store/user/userActions";
import {FiArrowLeft, FiArrowLeftCircle, FiArrowRight, FiRefreshCcw, FiSearch} from "react-icons/fi";
import {roles} from "../../../common/roles/roles";


const TransactionsPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError
    } = useSelector(getUserState)

    const {
        getTransactionsListLoading,
        transactionsList,
        getTransactionsListError,
        getShopProductsLoading,
        getShopProductsError,
        shopProducts
    } = useSelector(getShopState)

    const toast = useToast();
    const toastDuration = 10000;

    const [usernameFilter, setUsernameFilter] = useState<string>("")
    const handleUsernameFilterChange = (event: any) => setUsernameFilter(event.target.value)

    const [emailFilter, setEmailFilter] = useState<string>("")
    const handleEmailFilterChange = (event: any) => setEmailFilter(event.target.value)

    const [productTypeFilter, setProductTypeFilter] = useState<string>("")
    const handleProductTypeFilterChange = (event: any) => setProductTypeFilter(event.target.value)

    const [productNameFilter, setProductNameFilter] = useState<string>("")
    const handleProductNameFilterChange = (event: any) => setProductNameFilter(event.target.value)

    const [realMoneyFilter, setRealMoneyFilter] = useState<number>(0) // 1 = false, 2 = true, 0 = nothing
    const handleRealMoneyFilterChange = (event: any) => setRealMoneyFilter(event.target.value)

    const [pageNumberFilter, setPageNumberFilter] = useState<number>(0)

    const handlePageChange = (newPage: number) =>{
        if (transactionsList?.list){
            const totalPage = Math.floor(transactionsList.total / pageSizeFilter)

            if(newPage <= totalPage && newPage >= 0) {
                setPageNumberFilter(newPage);
            }
        }
    }

    const nextPage = () => {
        if (transactionsList?.list){
            const totalPage = Math.floor(transactionsList.total / pageSizeFilter)
            handlePageChange(pageNumberFilter + 1);
            if (pageNumberFilter + 1 <= totalPage)
                search(pageNumberFilter + 1);
        }
    }

    const previousPage = () => {
        if (transactionsList?.list) {
            const totalPage = Math.floor(transactionsList.total / pageSizeFilter)
            handlePageChange(pageNumberFilter - 1);
            if (pageNumberFilter - 1 >= 0)
                search(pageNumberFilter - 1);
        }
    }
    const [pageSizeFilter, setPageSizeFilter] = useState<number>(15)
    const handlePageSizeFilterChange = (event: any) => setPageSizeFilter(event.target.value)

    const search = (page:number) => {
        if (!auth?.accessToken){
            return;
        }
        const filters: {
            author : {
                username?: string,
                email?: string
            },
            isRealMoney?: boolean,
            shopProduct : {
                categorieId?: string
            },
            shopProductId?: string
        } = {
            shopProduct: {},
            author: {}
        };

        if (usernameFilter){
            filters.author.username = usernameFilter;
        }

        if (emailFilter) {
            filters.author.email = emailFilter;
        }

        if (realMoneyFilter != 0){
            if(realMoneyFilter == 1) {
                filters.isRealMoney = false;
            } else {
                filters.isRealMoney = true;
            }
        }

        if (productTypeFilter){
            filters.shopProduct.categorieId = productTypeFilter;
        }

        if(productNameFilter){
            filters.shopProductId = productNameFilter;
        }

        dispatch(
            getTransactionsSizedList(
                auth.accessToken,
                page,
                pageSizeFilter,
                filters
            )
        );
    }

    const toastError = (error : string) => {
        toast({
            title: "Erreur",
            description: error,
            status: 'error',
            duration: toastDuration,
            isClosable: true,
            position: 'bottom-right',
        });
    }

    useEffect(() => {
        if(auth?.accessToken && userInfos && getMaxPowerFromUserRoles(userInfos.roles) < 5){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

        if(auth?.accessToken && !transactionsList && !getTransactionsListLoading){
            dispatch(getTransactionsSizedList(auth.accessToken, pageNumberFilter, pageSizeFilter, {}))
        }

        if(auth?.accessToken && !shopProducts && !getShopProductsLoading){
            dispatch(getShopProducts())
        }

        if (getTransactionsListError){
            console.log(getTransactionsListError)
            toast({
                title: "Erreur",
                description: 'Impossible de récupérer la liste des transactions',
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }

        if(getShopProductsError){
            console.log(getShopProductsError)
            toast({
                title: "Erreur",
                description: 'Impossible de récupérer la liste des produits',
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [dispatch, auth?.accessToken, router, userInfos,
        userLoginError, getUserInfosError, transactionsList,
        getTransactionsListLoading, getTransactionsListError, toast, shopProducts,
        getShopProductsError, getShopProductsLoading, pageNumberFilter, pageSizeFilter]);


    return (
        <AdminNavbar selected={'/transactions'}>
            <Text fontSize={25} mb={0}>Bienvenue sur votre onglet &apos;<Text color={'cyan.400'} as={'span'}>Historique des transactions</Text>&apos; !</Text>
            <Flex mb={5}>
                <Flex direction={"column"}>
                    <Text fontSize={16} color={'rgb(255,255,255,.5)'}>Vous retrouverez ici l&apos;historique des transactions effectuées sur le site.</Text>
                </Flex>
                <Spacer/>

            </Flex>
            <Box h={'1px'} w={'full'} backgroundColor={'rgb(255,255,255,.2)'} mb={5}/>

            <Flex mb={5}>
                <Flex>
                    <InputGroup flexDirection={'column'} maxW={200}>
                        <Text mb={2}>Filtrer par pseudonyme</Text>
                        <Input placeholder={"Pseudo"} isDisabled={true} value={usernameFilter} onChange={handleUsernameFilterChange}></Input>
                    </InputGroup>
                    <InputGroup flexDirection={'column'} maxW={200} ml={2}>
                        <Text mb={2}>Filtrer par email</Text>
                        <Input placeholder={"Email"} isDisabled={true} value={emailFilter} onChange={handleEmailFilterChange}></Input>
                    </InputGroup>
                    <InputGroup flexDirection={'column'} maxW={180} ml={2}>
                        <Text mb={2}>Filtrer par type</Text>
                        <Select placeholder={'- Type à filtrer -'} cursor={'pointer'} bgColor={'rgb(38,39,41,1)'} value={productTypeFilter} onChange={handleProductTypeFilterChange}>
                            <option value={'cosmetiques'}>Comsétiques</option>
                            <option value={'points'}>Points</option>
                            <option value={'grades'}>Grades</option>
                        </Select>
                    </InputGroup>
                    <InputGroup flexDirection={'column'} maxW={180} ml={2}>
                        <Text mb={2}>Filtrer par monnaie</Text>
                        <Select placeholder={'- Type de monnaie -'} cursor={'pointer'} bgColor={'rgb(38,39,41,1)'} value={realMoneyFilter} onChange={handleRealMoneyFilterChange}>
                            <option value={1}>Points boutique</option>
                            <option value={2}>Euro</option>
                        </Select>
                    </InputGroup>
                    {shopProducts && (
                        <InputGroup flexDirection={'column'} maxW={180} ml={2}>
                            <Text mb={2}>Filtrer par produit</Text>
                            <Select placeholder={'- Produit à filtrer -'} cursor={'pointer'} bgColor={'rgb(38,39,41,1)'} value={productNameFilter} onChange={handleProductNameFilterChange}>
                                {shopProducts.map((product) => {
                                    return <option value={product._id} key={product._id}>{product.name}</option>
                                })}
                            </Select>
                        </InputGroup>
                    )}
                </Flex>
                <Spacer/>
                <Flex>
                    {auth?.accessToken && (
                        <Button p={5} mt={8} colorScheme={'blue'} onClick={() =>{setPageNumberFilter(0);search(0)}}>Rechercher<Flex pl={2} pt={.5}><FiSearch/></Flex></Button>
                    )}
                </Flex>


            </Flex>

            <Skeleton isLoaded={!getTransactionsListLoading}>
                {transactionsList?.total && (
                    <Text mb={2} color={'rgb(141,141,141)'} ml={1}>{transactionsList?.total} résultat(s) - Page n°{pageNumberFilter + 1}/{
                        Math.floor(transactionsList?.total / pageSizeFilter)+1}</Text>
                )}

                <TableContainer>
                    <Table variant={'striped'} colorScheme={'whiteAlpha'} size='sm'>
                        <Thead>
                            <Tr backgroundColor={'rgb(255,255,255,.05)'} h={9}>
                                <Th color={'white'}>Acheteur</Th>
                                <Th color={'white'}>Email</Th>
                                <Th color={'white'}>Produit</Th>
                                <Th color={'white'}>Type</Th>
                                <Th color={'white'}>Date d&apos;achat</Th>
                                <Th color={'white'}>Pseudo Mc</Th>
                                <Th color={'white'}>Statut</Th>
                                <Th isNumeric color={'white'}>Prix</Th>
                                <Th isNumeric color={'white'}>Voir +</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {
                                transactionsList?.list?.map((transaction) => {
                                        return (
                                            <Tr key={transaction._id} className={'custom-tr'}>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {transaction.author.username}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {transaction.author.email}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {transaction.productName}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {transaction.shopProduct ? transaction.shopProduct.categorieId : '-'}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {new Date(transaction.createdAt).toLocaleString()}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {transaction.mcProfile ? transaction.mcProfile.name : '-'}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                    {transaction.status}
                                                </Th>
                                                <Th color={'rgb(255,255,255,.6)'} isNumeric textTransform={'none'}>
                                                    {transaction.cost}{transaction.isRealMoney ? '€' : 'PB'}
                                                </Th>
                                                <Th isNumeric color={'rgb(255,255,255,.6)'}>
                                                    <Button colorScheme={'blue'} p={1} height={6}
                                                            onClick={() => /*router.push('/admin/transactions/transaction/' + transaction._id).then(() => {})*/toastError('En dev')
                                                            }>Voir</Button>
                                                </Th>
                                            </Tr>
                                        )
                                    })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <Center mt={2}>
                    {transactionsList?.total && (
                        <>
                            <Button colorScheme={"teal"}onClick={previousPage}
                                    isDisabled={pageNumberFilter <= 0}
                            ><FiArrowLeft size={17}/></Button>
                            {transactionsList?.total && (
                                <Text mb={2} color={'rgb(141,141,141)'} mx={5}>{pageNumberFilter + 1}/{
                                    Math.floor(transactionsList?.total / pageSizeFilter)+1}</Text>
                            )}
                            <Button colorScheme={"teal"} onClick={nextPage}
                                    isDisabled={pageNumberFilter >= Math.floor(transactionsList?.total / pageSizeFilter)}
                            ><FiArrowRight size={17}/></Button>
                        </>
                    )}

                </Center>

            </Skeleton>
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

export default TransactionsPage;