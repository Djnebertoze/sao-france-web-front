import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {getUserState} from "../../../store/user/userSlice";
import {useEffect} from "react";
import AdminNavbar from "../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Box, Flex, Spacer, Text, useToast} from "@chakra-ui/react";
import {getMaxPowerFromUserRoles} from "../../../store/helper";
import Chart from 'chart.js/auto';
import {getActiveStripePrices} from "../../../store/stripe/stripeActions";
import {getAdminStats} from "../../../store/user/userActions";


const AdminStatsPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError,
        getAdminStatsLoading,
        adminStats,
        getAdminStatsError
    } = useSelector(getUserState)

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
        if (adminStats){
            if (adminStats.registers){
                const registerChart = Chart.getChart('registers')
                if (registerChart){
                    registerChart.destroy()
                }

                let delayed: boolean;

                new Chart('registers', {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'Inscriptions',
                            data: adminStats.registers.data
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Nombre d\'inscriptions',
                                position: "bottom"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        },
                        scales:{
                            y: {
                                min: 0,
                                ticks: {
                                    stepSize: 1
                                },
                                suggestedMax: 10
                            }
                        },
                        animation: {
                            onComplete: () => {
                                delayed = true;
                            },
                            delay: (context) => {
                                let delay = 0;
                                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                    delay = context.dataIndex * 5 + context.datasetIndex * 5;
                                }
                                return delay;
                            },
                        },
                    }
                })
            }
        } else {
            if(!getAdminStatsLoading && auth?.accessToken) {
                dispatch(getAdminStats(auth?.accessToken))
            }
        }

        if (getAdminStatsError){
            toastError('Impossible de récupérer les données des inscriptions')
            console.log(getAdminStatsError)
        }


    }, [dispatch, auth?.accessToken, getAdminStatsLoading, adminStats, getAdminStatsError])

    useEffect(() => {
        console.log('1')
        if(auth?.accessToken && userInfos && getMaxPowerFromUserRoles(userInfos.roles) < 3){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

    }, [dispatch, auth?.accessToken, router, userInfos, userLoginError, getUserInfosError]);


    return (
        <AdminNavbar selected={'/stats'}>
            <Text fontSize={25} mb={0}>Bienvenue sur votre onglet &apos;<Text color={'cyan.400'} as={'span'}>Statistiques</Text>&apos;  !</Text>
            <Flex mb={5}>
                <Flex direction={"column"}>
                    <Text fontSize={16} color={'rgb(255,255,255,.5)'}>Vous retrouverez ici différentes statistiques auxquelles vous avez accès selon votre degré d&apos;accréditation.</Text>
                </Flex>
                <Spacer/>
            </Flex>
            <Box h={'1px'} w={'full'} backgroundColor={'rgb(255,255,255,.2)'} mb={5}/>
            <Box w={'full'}>
                <Flex w={'full'} flexDirection={"column"}>
                    <Text fontSize={18} marginBottom={2}>Inscriptions (60 jours)</Text>
                    <Box w={'full'} h={'1px'} backgroundColor={'rgb(255,255,255,.2)'} marginBottom={3}/>
                    <Flex w={'full'}>
                        <Flex w={3000}>
                            <canvas id={"registers"} />
                        </Flex>
                        <Flex w={'full'} borderLeft={'1px solid rgb(255,255,255,.2)'} px={3} textAlign={'center'} flexDirection={"column"}>
                            <Text fontSize={40} w={'full'}>{adminStats?.numbers.users}</Text>
                            <Text fontSize={15} w={'full'}>Utilisateurs</Text>
                        </Flex>
                    </Flex>
                    <Box w={'full'} h={'1px'} backgroundColor={'rgb(255,255,255,.2)'} marginTop={3}/>
                </Flex>
            </Box>
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

export default AdminStatsPage;