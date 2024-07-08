import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {
    Box,
    Button, Center,
    Container,
    Flex, Icon,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightElement,
    Spacer,
    Text,
    Switch,
    useToast
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {getUserState, resetSendPasswordResetRequest, resetUpdateUserProfileRequest} from "../../store/user/userSlice";
import {
    emptyAct,
    getUserProfile, getUserTransactions,
    requestXboxServices,
    sendPasswordReset,
    updateUserProfile
} from "../../store/user/userActions";
import {useDispatch, useSelector} from "../../store/store";
import {Tags} from "../../components/atoms/Tags/Tags";

import {getRoleById} from '../../common/roles/roles'

import {faCheck, faEdit, faUser, faSliders, faGlobe, faBook, faSackDollar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../../store/authConfig";
import {Role} from "../../common/types/types";
import {IconType} from "react-icons";
import {FiBriefcase, FiDollarSign, FiHome, FiSettings, FiShoppingCart, FiTrendingUp, FiUsers} from "react-icons/fi";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";


const ProfilePage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        getUserInfosLoading,
        updateUserProfileSuccess,
        updateUserProfileError,
        getMinecraftProfileLoading,
        minecraftProfile,
        getMinecraftProfileError,
        getUserInfosError,
        updateUserProfileLoading,
        sendPasswordResetLoading,
        sendPasswordResetSuccess,
        sendPasswordResetError,
        getUserTransactionsLoading,
        getUserTransactionsError,
        getUserPrivateProfileSuccess,
        userTransactions
    } = useSelector(getUserState)

    const {t} = useTranslation();

    const [usernameValue, setUsernameValue] = useState<string>("")

    const [bioValue, setBioValue] = useState<string>("")

    const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");

    const [shopPointsValue, setShopPointsValue] = useState<number>();

    const [birthdayValue, setBirthdayValue] = useState<string>('');

    const [showBirthdayValue, setShowBirthdayValue] = useState<boolean>(false)
    const handleShowBirthdayChange = () => {
        setShowBirthdayValue(!showBirthdayValue);
    }

    const [acceptEmailValue, setAcceptEmailValue] = useState<boolean>()
    const handleAcceptEmailChange = () => {
        setAcceptEmailValue(!acceptEmailValue);
    }

    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const regexpEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const [userRoles, setUserRoles] = useState<Role[]>()

    const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
    const handleShowPhoneNumberChange = () => {
        setShowPhoneNumber(!showPhoneNumber);
    }

    const [emailValue, setEmailValue] = useState<string>("");
    const handleEmailChange = (event: any) => {
        setEmailValue(event.target.value)
        if (event.target.value.toLowerCase().match(regexpEmail)) {
            setEmailIsInvalid(false);
        } else {
            setEmailIsInvalid(true);
        }
    };

    const logout = () => {
        dispatch(emptyAct());
        router.push('/').then(() => {
            router.reload()
            toast({
                title: 'Déconnexion réussie',
                description: 'Vous avez été correctement déconnecté',
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        })
    }


    const [lastNameValue, setLastNameValue] = useState<string|undefined>();
    const handleLastNameChange = (event: any) => setLastNameValue(event.target.value);

    const [firstNameValue, setFirstNameValue] = useState<string|undefined>();

    const [selectedSetting, setSelectedSetting] = useState<string>('profile');
    const handleFirstNameChange = (event: any) => setFirstNameValue(event.target.value);

    const {instance, accounts} = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const toast = useToast();
    const toastDuration = 5000;


    useEffect(() => {
        if (auth?.accessToken) {
            if (!userInfos && !getUserInfosLoading){
                dispatch(getUserProfile(auth.accessToken))
            }
            if (userInfos) {
                setUsernameValue(userInfos.username)
                setBioValue(userInfos.bio ? userInfos.bio : "")
                setFirstNameValue(userInfos.firstName);
                setLastNameValue(userInfos.lastName);
                setEmailValue(userInfos.email);
                setBirthdayValue(userInfos.birthday ? userInfos.birthday : "");
                setPhoneNumberValue(userInfos.phoneNumber ? userInfos.phoneNumber : "");
                setShopPointsValue(userInfos.shopPoints ? userInfos.shopPoints : 0)
                setAcceptEmailValue(userInfos.acceptEmails ? userInfos.acceptEmails : false)
                setShowBirthdayValue(userInfos.showBirthday ? userInfos.showBirthday : false)

                if(userInfos.roles) {
                    const roles_filtered: Role[] = [];
                    userInfos.roles.map((role_id) => {
                        // @ts-ignore
                        if (getRoleById(role_id) && role_id != 'user') {
                            roles_filtered.push(getRoleById(role_id) as Role)
                        // @ts-ignore
                        } else if (role_id == 'user' && userInfos.roles?.length <= 1){
                            roles_filtered.push(getRoleById(role_id) as Role)
                        }
                    })
                    setUserRoles(roles_filtered.sort((a, b) => a.power - b.power))
                }
            }
        }

        if((!getUserInfosLoading && getUserInfosError) || localStorage.getItem('act') == undefined){
            dispatch(emptyAct())
            router.push('/login').then(() => {});
        }

        if(isAuthenticated && (!userInfos?.mcProfile || !userInfos?.mcProfile?.name)){
            /*instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            }).then((response) => {
                callMsGraph(response.accessToken).then(response => {
                    setGraphData(response);
                    console.log('response', response);

                });
            });*/
            instance.acquireTokenSilent({...loginRequest, account: accounts[0]}).then((response) => {
                console.log('llllll');
                dispatch(requestXboxServices(response.accessToken, auth?.accessToken));
            });
        }

    }, [dispatch, auth, toast, router, userInfos, /*isEditing, */isAuthenticated, minecraftProfile,
        accounts, instance, getUserInfosError, getUserInfosLoading]);

    useEffect(() => {
        if (updateUserProfileSuccess) {
            toast({
                title: t('profile.UPDATE_USER_SUCCESS_TOAST_TITLE'),
                description: t('profile.UPDATE_USER_SUCCESS_TOAST_DESCRIPTION'),
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            dispatch(resetUpdateUserProfileRequest())
            dispatch(getUserProfile(auth?.accessToken))
        }
        if (updateUserProfileError) {
            toast({
                title: 'Erreur lors de la modification de votre profil',
                description: updateUserProfileError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            dispatch(resetUpdateUserProfileRequest())
            dispatch(getUserProfile(auth?.accessToken))
        }
    }, [updateUserProfileSuccess, updateUserProfileError, t, toast, auth?.accessToken, dispatch]);

    useEffect(() => {
        if(!sendPasswordResetLoading){
            if(sendPasswordResetSuccess){
                toast({
                    title: 'Email envoyé',
                    description: 'L\'email de réinitialisation a bien été envoyé',
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                dispatch(resetSendPasswordResetRequest())
            }
            if(sendPasswordResetError){
                toast({
                    title: 'Email non envoyé',
                    description: 'L\'email de réinitialisation n\' a pas été envoyé',
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                dispatch(resetSendPasswordResetRequest())
            }
        }
    }, [dispatch, sendPasswordResetLoading, sendPasswordResetError, sendPasswordResetSuccess, toast])

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

    interface SettingsItemProps {
        name: string
        icon: IconDefinition
        param: string
    }

    const SettingsItems: Array<SettingsItemProps> = [
        { name: 'Profil public', icon: faUser, param: 'profile' },
        { name: 'Mes préférences', icon: faSliders, param: 'preferences' },
        { name: 'Données personnelles', icon: faGlobe, param: 'personals-data' },
        { name: 'Applications connectées', icon: faBook, param: 'connected-apps' },
        { name: 'Mes transactions', icon: faSackDollar, param: 'transactions' },
    ]

    let tagsMargin = 4;

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container className={'main-background'} minH={1000} maxW={'full'} color={'white'} p={0} pt={100}>
                <Center>
                    <Text textTransform={"uppercase"}
                          fontSize={25}
                          textAlign={'center'}
                          letterSpacing={2}
                          borderLeft={'1px solid rgb(255,255,255,.3)'}
                          borderRight={'1px solid rgb(255,255,255,.3)'}
                          w={500}>
                        Mon profil
                    </Text>
                </Center>
                <Flex w={1200} mx={'auto'} mt={61} flexDirection={"column"}>
                    <Flex borderBottom={'1px solid white'} py={3}>
                        <Box>
                            <Image src={"https://skins.danielraybone.com/v1/head/"+userInfos?.mcProfile?.name+"?overlay=true"}
                                   borderRadius={'50%'}
                                   maxW={50}
                                   maxH={50}
                                   border={'2px solid white'}
                                   boxShadow={'0px 0px 20px 2px rgb(0,0,0,.15)'} alt={'User image profile'}/>
                        </Box>
                        <Flex flexDirection={'column'} ml={4}>
                            <Text color={'white'} fontSize={20}>{userInfos?.username} <Text as={'span'} color={'rgb(255,255,255,.7)'}>({userInfos?.mcProfile ? userInfos.mcProfile.name : 'Aucun compte Minecraft'})</Text></Text>
                            <Text color={'rgb(255,255,255,.5)'} fontSize={14}>{shopPointsValue?.toLocaleString(undefined)} Points Boutique</Text>
                        </Flex>
                        <Spacer/>
                        {(userInfos?.roles?.includes('admin') || userInfos?.roles?.includes('moderator') || userInfos?.roles?.includes('responsable') || userInfos?.roles?.includes('developer')) && (
                            <Box>
                                <Button colorScheme={'red'} mr={5}
                                        onClick={() => router.push('/admin')}>
                                    Panel Admin
                                </Button>
                            </Box>
                        )}
                        <Box>
                            <Button fontSize={16} isDisabled={true}>
                                Voir mon profil public
                            </Button>
                        </Box>
                    </Flex>
                    <Flex>
                        <Flex flexDirection={'column'} w={290} mt={3} pr={2} borderRight={'1px solid rgb(255,255,255,.1)'}>
                            {
                                SettingsItems.map((setting) => {
                                    return (
                                        <Flex px={3}
                                              key={setting.param}
                                              py={2}
                                              mb={1}
                                              bg={selectedSetting == setting.param ? 'rgb(255,255,255,.09)' : ''}
                                              borderRadius={5}
                                              fontSize={16}
                                              _hover={{bg: selectedSetting != setting.param ? 'rgb(255,255,255,.05)' : ''}}
                                              onClick={() => {
                                                  setSelectedSetting(setting.param)
                                                  if (setting.param == 'transactions') {
                                                      dispatch(getUserTransactions(auth?.accessToken))
                                                  }
                                              }}
                                              cursor={'pointer'}>
                                                <Box mr={2}>
                                                    <FontAwesomeIcon icon={setting.icon} color={'#767676'}/>
                                                </Box>
                                                <Text color={selectedSetting == setting.param ? 'white' : '#767676'}>{setting.name}</Text>
                                        </Flex>
                                    )
                                })
                            }
                        </Flex>
                        <Flex px={6} py={4} w={'full'}>
                            {selectedSetting == 'profile' && (
                                <Flex flexDirection={"column"} w={'full'}>
                                    <Text fontSize={22}>Profil public</Text>
                                    <Box w={'full'} h={'1px'} mt={3} bg={'rgb(255,255,255,.1)'}/>
                                    <Flex flexDirection={"column"}>
                                        <Box maxW={250} mt={1}>
                                            <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Pseudo</Text>
                                            <Input type={'text'}
                                                   bg={'rgb(255,255,255,.05)'}
                                                   mt={2}
                                                   value={usernameValue}
                                                   disabled={false}
                                                   border={'none'}
                                                   onChange={(e) => setUsernameValue(e.target.value)}
                                                   borderBottom={'1px solid white'}/>
                                        </Box>
                                        <Box mt={5}>
                                            <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Biographie</Text>
                                            <Input type={'text'}
                                                   bg={'rgb(255,255,255,.05)'}
                                                   mt={2}
                                                   value={bioValue}
                                                   disabled={false}
                                                   border={'none'}
                                                   onChange={(e) => setBioValue(e.target.value)}
                                                   borderBottom={'1px solid white'}/>
                                        </Box>
                                        <Box mt={5} maxW={280}>
                                            <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Anniversaire</Text>
                                            <Input type={'date'}
                                                   bg={'rgb(255,255,255,.05)'}
                                                   mt={2}
                                                   value={birthdayValue}
                                                   disabled={false}
                                                   border={'none'}
                                                   onChange={(e) => setBirthdayValue(e.target.value)}
                                                   borderBottom={'1px solid white'}/>
                                            <Flex>
                                                <Text fontSize={15} mt={2} color={'rgb(255,255,255,.9)'}>Afficher ma date d&apos;anniversaire</Text>
                                                <Switch mt={3} ml={5} colorScheme={'blue'} isChecked={showBirthdayValue} onChange={handleShowBirthdayChange}/>
                                            </Flex>
                                        </Box>

                                        <Button mt={5} maxW={250} colorScheme={'blue'} isLoading={updateUserProfileLoading || getUserInfosLoading} onClick={() => {
                                            dispatch(updateUserProfile(auth?.accessToken, {
                                                username: usernameValue,
                                                birthday: birthdayValue,
                                                showBirthday: showBirthdayValue,
                                                bio: bioValue
                                            }))
                                        }}>Mettre à jour mon profil</Button>
                                    </Flex>

                                </Flex>
                            )}

                            {selectedSetting == 'preferences' && (
                                <Flex flexDirection={"column"} w={'full'}>
                                    <Text fontSize={22}>Mes préférences</Text>
                                    <Box w={'full'} h={'1px'} mt={3} bg={'rgb(255,255,255,.1)'}/>

                                    <Box mt={1}>
                                        <Flex>
                                            <Text fontSize={18} mt={2} color={'rgb(255,255,255,.9)'}>Recevoir des e-mails relatifs aux nouveautés et offres commerciales</Text>
                                            <Switch mt={4} ml={5} colorScheme={'blue'} isChecked={acceptEmailValue} onChange={handleAcceptEmailChange}/>
                                        </Flex>
                                    </Box>
                                    <Button mt={5} maxW={300} colorScheme={'blue'} isLoading={updateUserProfileLoading || getUserInfosLoading} onClick={() => {
                                        dispatch(updateUserProfile(auth?.accessToken, {
                                            acceptEmails: acceptEmailValue
                                        }))
                                    }}>Mettre à jour mes préférences</Button>
                                </Flex>
                            )}

                            {selectedSetting == 'personals-data' && (
                                <Flex flexDirection={"column"} w={'full'}>
                                    <Text fontSize={22}>Données personnelles</Text>
                                    <Box w={'full'} h={'1px'} mt={3} bg={'rgb(255,255,255,.1)'}/>
                                    <Box mt={1}>
                                        <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Mot de passe</Text>
                                        <Button mt={2} maxW={250} colorScheme={'red'} isLoading={sendPasswordResetLoading} onClick={() => {
                                            dispatch(sendPasswordReset(userInfos?.email))
                                        }}>Réinitialiser mon mot de passe</Button>
                                    </Box>
                                    <Box mt={5}>
                                        <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Email</Text>
                                        <Input type={'text'}
                                               bg={'rgb(255,255,255,.05)'}
                                               mt={2}
                                               value={emailValue}
                                               disabled={false}
                                               border={'none'}
                                               onChange={(e) => setEmailValue(e.target.value)}
                                               borderBottom={'1px solid white'}/>
                                    </Box>
                                    <Box mt={5}>
                                        <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Nméro de téléphone</Text>
                                        <Input type={'phone'}
                                               bg={'rgb(255,255,255,.05)'}
                                               mt={2}
                                               value={phoneNumberValue}
                                               disabled={false}
                                               border={'none'}
                                               onChange={(e) => setPhoneNumberValue(e.target.value)}
                                               borderBottom={'1px solid white'}/>
                                    </Box>
                                    <Button mt={5} maxW={250} colorScheme={'blue'} isLoading={updateUserProfileLoading || getUserInfosLoading} onClick={() => {
                                        dispatch(updateUserProfile(auth?.accessToken, {
                                            email: emailValue,
                                            phoneNumber: phoneNumberValue,
                                        }))
                                    }}>Mettre à jour mes données</Button>
                                </Flex>
                            )}

                            {selectedSetting == 'connected-apps' && (
                                <Flex flexDirection={"column"} w={'full'}>
                                    <Text fontSize={22}>Applications connectées</Text>
                                    <Box w={'full'} h={'1px'} mt={3} bg={'rgb(255,255,255,.1)'}/>
                                    <Box mt={1}>
                                        <Text fontSize={20} color={'rgb(255,255,255,.9)'}>Microsoft</Text>
                                        <Button colorScheme={'blue'}
                                                mt={2}
                                                borderRadius={2}
                                                onClick={isAuthenticated ? () => {
                                                    instance.logoutPopup({}).then(() => {});
                                                } : () => {
                                                    instance.loginPopup(loginRequest).catch(e => {
                                                        console.log(e);
                                                    })
                                                }} isLoading={getMinecraftProfileLoading}>
                                            {isAuthenticated ? "Microsoft: Connecté" : "Me connecter à Microsoft"}
                                        </Button>
                                    </Box>


                                </Flex>
                            )}

                            {selectedSetting == 'transactions' && (
                                <Flex flexDirection={"column"} w={'full'}>
                                    <Text fontSize={22}>Transactions</Text>
                                    <Box w={'full'} h={'1px'} mt={3} bg={'rgb(255,255,255,.1)'}/>

                                    <Flex flexDirection={"column-reverse"} pt={5}>
                                        {userTransactions && userTransactions.map((transaction) => {
                                            return (
                                                <Flex key={transaction._id} flexDirection={"column"} w={'full'} backgroundColor={'rgb(255,255,255,.04)'} borderRadius={5} mb={5} py={3} px={10}>
                                                    <Flex>
                                                        <Text fontSize={20}>{transaction.productName}</Text>
                                                        <Spacer/>
                                                        <Text>{new Date(transaction.createdAt).toLocaleString()}</Text>
                                                    </Flex>
                                                    {!transaction.createdBy && (
                                                        <Text mt={2}>Prix: {transaction.cost}{transaction.isRealMoney ? 'EUR' : ' PB'}</Text>
                                                    )}
                                                    {transaction.createdBy && (
                                                        <Text fontSize={15} mt={1}>Admin: {transaction.createdBy.username}</Text>
                                                    )}
                                                </Flex>
                                            )
                                        })}
                                        {(!userTransactions || userTransactions.length == 0) && (
                                            <Text>Pas encore d&apos;achat effectué !</Text>
                                        )}
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
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

export default ProfilePage;