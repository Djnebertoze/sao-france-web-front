import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {getShopState} from "../../../store/shop/shopSlice";
import {useEffect} from "react";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {
    Box,
    Button,
    Flex,
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
import {getTransactionsList} from "../../../store/shop/shopActions";
import {getUsersList} from "../../../store/user/userActions";
import {FiRefreshCcw} from "react-icons/fi";


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
        getTransactionsListError
    } = useSelector(getShopState)

    const toast = useToast();
    const toastDuration = 10000;

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
            dispatch(getTransactionsList(auth.accessToken))
        }

        if (getTransactionsListError){
            toastError('Impossible de récupérer la liste des transactions')
        }

    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError, transactionsList, getTransactionsListLoading, getTransactionsListError, toastError]);


    return (
        <AdminNavbar selected={'/transactions'}>
            <Text fontSize={25} mb={0}>Bienvenue sur votre onglet &apos;<Text color={'cyan.400'} as={'span'}>Historique des transactions</Text>&apos; !</Text>
            <Flex mb={5}>
                <Flex direction={"column"}>
                    <Text fontSize={16} color={'rgb(255,255,255,.5)'}>Vous retrouverez ici l'&apos;historique des transactions effectuées sur le site.</Text>
                </Flex>
                <Spacer/>
                {auth?.accessToken && (
                    <Button p={0} colorScheme={'blue'} onClick={() => dispatch(getTransactionsList(auth.accessToken))}><FiRefreshCcw/></Button>
                )}
            </Flex>
            <Box h={'1px'} w={'full'} backgroundColor={'rgb(255,255,255,.2)'} mb={5}/>
            <Skeleton isLoaded={!getTransactionsListLoading}>

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
                                transactionsList?.map((transaction) => {
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