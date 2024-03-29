import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightElement,
    Spacer,
    Text,
    useToast
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {getUserState} from "../../store/user/userSlice";
import {emptyAct, getUserProfile, requestXboxServices, updateUserProfile} from "../../store/user/userActions";
import {useDispatch, useSelector} from "../../store/store";
import {Tags} from "../../components/atoms/Tags/Tags";

import {getRoleById} from '../../common/roles/roles'

import {faCheck, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../../store/authConfig";
import {Role} from "../../common/types/types";


const ProfilePage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        getUserInfosLoading, updateUserProfileSuccess, updateUserProfileError,
        getMinecraftProfileLoading, minecraftProfile, getMinecraftProfileError,
        getUserInfosError
    } = useSelector(getUserState)

    const {t} = useTranslation();

    const [isEditing, setEditing] = useState<boolean>(false)

    const handleEditing = () => {
        if(emailIsInvalid){
            toast({
                title: 'Impossible de modifier votre profil',
                description: 'Email non valide',
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
            return;
        }
        console.log('editing', isEditing)
        if (isEditing) {
            dispatch(updateUserProfile(auth?.accessToken, {
                username: usernameValue,
                email: emailValue,
                firstName: firstNameValue,
                lastName: lastNameValue,
                phoneNumber: phoneNumberValue,
                birthday: birthdayValue,
                bio: bioValue
            }))
            router.reload();
        }
        setEditing(!isEditing);
    }

    const [usernameValue, setUsernameValue] = useState<string>("")
    const handleUsernameChange = (event: any) => {
        setUsernameValue(event.target.value);
    }

    const [bioValue, setBioValue] = useState<string>("")
    const handleBioChange = (event: any) => {
        setBioValue(event.target.value);
    }

    const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
    const handlePhoneNumberChange = (event: any) => setPhoneNumberValue(event.target.value);

    const [shopPointsValue, setShopPointsValue] = useState<number>();

    const [birthdayValue, setBirthdayValue] = useState<string>('');
    const handleBirthdayChange = (event: any) => setBirthdayValue(event.target.value);

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

    }, [dispatch, auth, toast, router, userInfos, isEditing, isAuthenticated, minecraftProfile,
        accounts, instance, getUserInfosError, getUserInfosLoading]);

    useEffect(() => {
        if (updateUserProfileSuccess && !isEditing) {
            toast({
                title: t('profile.UPDATE_USER_SUCCESS_TOAST_TITLE'),
                description: t('profile.UPDATE_USER_SUCCESS_TOAST_DESCRIPTION'),
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (updateUserProfileError && !isEditing) {
            toast({
                title: 'Impossible de modifier votre profil',
                description: updateUserProfileError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [updateUserProfileSuccess, updateUserProfileError, isEditing, t, toast]);

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
        <Container maxW={'full'} margin={0} padding={0}>
            <Container bg={'rgb(55,56,58,1)'} minH={1000} maxW={'full'} color={'white'} p={0}>
                <Flex w={'full'} pt={100}>
                    <Box marginRight={10} borderRight={'1px solid white'} py={5} px={10}>
                        <Image src={"https://skins.danielraybone.com/v1/head/"+userInfos?.mcProfile?.name+"?overlay=true"} borderRadius={'50%'} maxW={200} maxH={200}
                               mx={1} mb={5} border={'5px solid white'} boxShadow={'0px 0px 20px 2px rgb(0,0,0,.15)'} alt={'User image profile'}/>
                        {userInfos?.mcProfile && (
                            <>
                                <Text textAlign={'center'} mt={2} fontStyle={'italic'}>{userInfos.mcProfile.name}</Text>
                            </>
                        )}
                        <Text textAlign={'center'} mt={2}>{shopPointsValue?.toLocaleString(undefined)} Points Boutique</Text>

                    </Box>
                    <Box w={'full'}>
                        <Flex w={'full'}>
                            <Box mt={50}>
                                <Flex w={'full'}>
                                    {isEditing ? (
                                        <InputGroup w={'full'}>
                                            <Input maxW={290} maxLength={15} fontSize={35} ml={10} mt={2}
                                                   pb={2} w={'full'} borderBottom={'black 1px solid'}
                                                   placeholder={t('register.FILL_THE_FIELD_LABEL')}
                                                   variant='flushed' value={usernameValue}
                                                   onChange={handleUsernameChange}></Input>
                                        </InputGroup>
                                    ) : (
                                        <Text fontSize={35} ml={10}>{userInfos?.username}</Text>
                                    )}

                                    {
                                        userRoles?.map((role) => {
                                            return <Tags key={role._id} mt={tagsMargin} ml={5}
                                                         bgColor={role?.color}
                                                         textColor={role?.textColor}>
                                                {role?.name}
                                            </Tags>
                                        })
                                    }

                                </Flex>
                                {isEditing ? (
                                    <InputGroup w={'full'} ml={10} mr={20} mt={2} pb={5}>
                                        <InputLeftElement>-</InputLeftElement>
                                        <Input maxLength={50} fontSize={16} w={'full'}
                                               borderBottom={'black 1px solid'}
                                               placeholder={t('register.FILL_THE_FIELD_LABEL')}
                                               variant='flushed' value={bioValue}
                                               onChange={handleBioChange}></Input>
                                    </InputGroup>
                                ) : (
                                    <Text w={'full'} fontWeight={''} fontSize={16} ml={10} mr={20} mt={2}
                                          pb={5} borderBottom={'white 1px solid'}>- {userInfos?.bio}</Text>
                                )}

                            </Box>
                            <Spacer/>
                            {isEditing && (
                                <Text mt={58} mr={5} fontSize={19}>Veuillez valider...</Text>
                            )}
                            {(userInfos?.roles?.includes('admin') || userInfos?.roles?.includes('moderator') || userInfos?.roles?.includes('responsable') || userInfos?.roles?.includes('developer')) && (
                                <Box>
                                    <Button h={38} mt={57} colorScheme={'red'} mr={5}
                                            onClick={() => router.push('/admin')}>
                                        Accès Admin
                                    </Button>
                                </Box>
                            )}

                            <Box>
                                <Button w={50} h={50} colorScheme={isEditing ? 'green' : 'teal'} mr={50}
                                        mt={50} onClick={handleEditing}>
                                    {isEditing ? (
                                        <FontAwesomeIcon icon={faCheck}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faEdit}/>
                                    )}

                                </Button>
                            </Box>
                        </Flex>
                        <Box ml={41} mr={150} mt={30}>
                            <Text fontSize={30} as={'i'}>Informations personnelles:</Text>
                            <Box w={'full'} h={'1px'} bgColor={'rgb(255,255,255,.2)'} mt={2}/>
                            <InputGroup border={'transparent'} mt={5}>
                                <InputLeftAddon fontSize={21} w={100}
                                                bgColor={'transparent'}>Email:</InputLeftAddon>
                                <Input fontSize={21} pr={150} value={emailValue} isDisabled={!isEditing}
                                       placeholder={'-'} type={'email'}
                                       onChange={handleEmailChange}></Input>
                            </InputGroup>
                            <InputGroup border={'transparent'} mt={5}>
                                <InputLeftAddon fontSize={21} w={100}
                                                bgColor={'transparent'}>Prénom:</InputLeftAddon>
                                <Input fontSize={21} pr={150} value={firstNameValue} isDisabled={!isEditing}
                                       placeholder={'-'} onChange={handleFirstNameChange}></Input>
                            </InputGroup>
                            <InputGroup border={'transparent'} mt={5}>
                                <InputLeftAddon fontSize={21} w={100}
                                                bgColor={'transparent'}>Nom:</InputLeftAddon>
                                <Input fontSize={21} pr={150} value={lastNameValue} isDisabled={!isEditing}
                                       placeholder={'-'} onChange={handleLastNameChange}></Input>
                            </InputGroup>
                            <InputGroup border={'transparent'} mt={5}>
                                <InputLeftAddon fontSize={21} w={100}
                                                bgColor={'transparent'}>Tél.</InputLeftAddon>
                                <Input fontSize={21} pr={150} value={phoneNumberValue}
                                       isDisabled={!isEditing} placeholder={'-'}
                                       type={showPhoneNumber ? 'text' : 'password'}
                                       onChange={handlePhoneNumberChange}></Input>
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleShowPhoneNumberChange}>
                                        {showPhoneNumber ? 'Cacher' : 'Montrer'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup border={'transparent'} mt={5}>
                                <InputLeftAddon fontSize={21} w={100}
                                                bgColor={'transparent'}>Anniv.</InputLeftAddon>
                                <Input fontSize={21} pr={150} value={birthdayValue}
                                       isDisabled={!isEditing} placeholder={'-'} type={'date'}
                                       onChange={handleBirthdayChange}></Input>
                            </InputGroup>
                            <Button colorScheme={'blue'} mt={5} onClick={() => router.push('/profile/transactions')}>Voir mes transaction</Button>
                        </Box>
                        <Box ml={41} mr={150} mt={30}>
                            <Text fontSize={30} as={'i'}>Applications externes:</Text>
                            <Box w={'full'} h={'1px'} bgColor={'rgb(255,255,255,.2)'} mt={2}/>
                            <Button colorScheme={'blue'}
                                    mt={10}
                                    borderRadius={2}
                                    onClick={isAuthenticated ? () => {
                                        instance.logoutPopup({}).then(() => {});
                                    } : () => {
                                        instance.loginPopup(loginRequest).catch(e => {
                                            console.log(e);
                                        })
                                    }/*dispatch(linkMicrosoftAccount)*//*() => router.push(urlMicrosoft)*//*openPopupWindow*/} isLoading={getMinecraftProfileLoading}>
                                {isAuthenticated ? "Microsoft: Connecté" : "Me connecter à Microsoft"}
                            </Button>
                        </Box>
                        <Box ml={41} mr={150} mt={30}>
                            <Text fontSize={30} as={'i'}>Utilitaires:</Text>
                            <Box w={'full'} h={'1px'} bgColor={'rgb(255,255,255,.2)'} mt={2}/>
                            <Button colorScheme={'red'} mt={5} mb={5} onClick={logout}>
                                Me déconnecter
                            </Button>
                        </Box>
                    </Box>
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