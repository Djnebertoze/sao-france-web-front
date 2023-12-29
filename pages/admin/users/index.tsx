import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {useEffect} from "react";
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
    useToast,
} from "@chakra-ui/react";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getUsersList} from "../../../store/user/userActions";
import {FiRefreshCcw} from "react-icons/fi";


const AdminUsersManagerPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError,
        getUsersListLoading, getUsersListError, usersList
    } = useSelector(getUserState)


    const toast = useToast();
    const toastDuration = 3000;



    useEffect(() => {
        console.log('1')
        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin'))){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError]);

    useEffect(() => {
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

        if (auth?.accessToken && !usersList && !getUsersListLoading && !getUsersListError){
            dispatch(getUsersList(auth.accessToken))
        }
        if (getUsersListError){
            console.log(getUsersListError)
            toastError('Impossible de récupérer la liste des joueurs.')
        }
    },[usersList, getUsersListLoading, getUsersListError, auth?.accessToken, dispatch, toast])

    return (
        <AdminNavbar selected={'/users'}>
            <Text fontSize={25} mb={0}>Bienvenue sur votre onglet &apos;<Text color={'cyan.400'} as={'span'}>Utilisateurs</Text>&apos;  !</Text>
            <Flex>
                <Flex direction={"column"}>
                    <Text fontSize={16} color={'rgb(255,255,255,.5)'}>Vous retrouverez ici la liste de tous les utilisateurs. Selon votre degré d&apos;accréditation, vous aurez accès à certaines informations sensibles.</Text>
                    <Text fontSize={16} pb={17} color={'rgb(255,255,255,.5)'} fontWeight={'bold'}>IMPORTANT: Veillez à partager aucune information !</Text>
                </Flex>
                <Spacer/>
                {auth?.accessToken && (
                    <Button p={0} colorScheme={'blue'} onClick={() => dispatch(getUsersList(auth.accessToken))}><FiRefreshCcw/></Button>
                )}

            </Flex>
            <Box h={'1px'} w={'full'} backgroundColor={'rgb(255,255,255,.2)'} mb={5}/>


            <Skeleton isLoaded={!getUsersListLoading}>
                <TableContainer>
                    <Table variant={'striped'} colorScheme={'whiteAlpha'} size='sm'>
                        <Thead>
                            <Tr backgroundColor={'rgb(255,255,255,.05)'} h={9}>
                                <Th color={'white'}>Nom d&apos;utilisateur</Th>
                                <Th color={'white'}>Email</Th>
                                <Th color={'white'}>Grades</Th>
                                <Th color={'white'}>Date de création</Th>
                                <Th color={'white'}>Pseudo Mc</Th>
                                <Th color={'white'}>Emails Commerciaux</Th>
                                <Th isNumeric color={'white'}>Points Boutique</Th>
                                <Th isNumeric color={'white'}>Voir +</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {
                                usersList?.users?.map((user) => {
                                    return (
                                        <Tr key={user._id} className={'custom-tr'}>
                                            <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                {user.username}
                                            </Th>
                                            <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                {user.email}
                                            </Th>
                                            <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                {user.roles?.join(', ')}
                                            </Th>
                                            <Th color={'rgb(255,255,255,.6)'}>
                                                {new Date(user.createdAt).toLocaleString()}
                                            </Th>
                                            <Th color={'rgb(255,255,255,.6)'} textTransform={'none'}>
                                                {usersList?.mcProfiles.filter((mcProfile) => mcProfile.user._id == user._id).length != 0 ?
                                                    usersList?.mcProfiles.filter((mcProfile) => mcProfile.user._id == user._id)[0].name
                                                    : '-'
                                                }
                                            </Th>
                                            <Th color={'rgb(255,255,255,.6)'}>
                                                {user.acceptEmails ? <Text color={'green.300'} as={'span'}>oui</Text> : <Text color={'red.300'} as={'span'}>non</Text>}
                                            </Th>
                                            <Th isNumeric color={'rgb(255,255,255,.6)'}>
                                                {user.shopPoints}
                                            </Th>
                                            <Th isNumeric color={'rgb(255,255,255,.6)'}>
                                                <Button colorScheme={'blue'} p={1} height={6}
                                                        onClick={() => toast({
                                                            title: "En cours de dev",
                                                            description: "Fonctionnalité en cours de développement. Contactez un développeur web.",
                                                            status: 'info',
                                                            duration: toastDuration,
                                                            isClosable: true,
                                                            position: 'bottom-right',
                                                        })
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

export default AdminUsersManagerPage;