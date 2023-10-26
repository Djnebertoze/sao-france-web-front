import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
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
    InputLeftElement, Checkbox, Link as ChakraLink, Link, useToast
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Form} from "@chakra-ui/theme/dist/components";
import {AtSignIcon, CalendarIcon, EmailIcon, ExternalLinkIcon, PhoneIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import { getUserState } from "../../store/user/userSlice";
import {login, register} from "../../store/user/userActions";
import { useDispatch, useSelector } from "../../store/store";





const LoginPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const { userLoginLoading, auth, userInfos, userLoginError } = useSelector(getUserState)

    const { t } = useTranslation();

    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

    const [usernameValue, setUsernameValue] = useState<string>("");
    const handleUsernameChange = (event: any) => setUsernameValue(event.target.value)

    const [passwordValue, setPasswordValue] = useState<string>("");
    const handlePasswordChange = (event: any) => {
        setPasswordValue(event.target.value)
        if (event.target.value.length < 8) {
            setPasswordIsInvalid(true);
        } else {
            setPasswordIsInvalid(false);
        }
    };

    const [stayConnectedValue, setStayConnectedValue] = useState<boolean>(false);
    const handleStayConnectedChange = (event: any) => setStayConnectedValue(!stayConnectedValue);

    const toast = useToast();
    const toastDuration = 5000;

    useEffect(() => {
        /*if(auth?.accessToken){
            router.push('/')
            toast({
                title: t('register.LOGIN_USER_SUCCESS_TOAST_TITLE'),
                description: t('register.LOGIN_USER_SUCCESS_TOAST_DESCRIPTION'),
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }*/
    }, [dispatch, auth, toast, router, userLoginError, userInfos?._id]);


    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} py={5} mx={0} className={'secondary-background'}>
                <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                    <Box
                         mt={140}
                         mx={18}
                         mb={150}>
                        <Text maxW={'full'} textAlign={'center'} fontFamily={'Bebas Neue'} fontSize={30} letterSpacing={3} color={'white'}>
                            {t('globals.LOGIN_LABEL')}
                        </Text>
                        <Box h={'1px'} w={'full'} bgColor={'rgb(255,255,255,.2)'} mx={0} my={3}/>
                        <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                            <Link className={'clickable-link'} color={'rgb(255,255,255,.8)!important'} onClick={() => router.push('/register')}>Je n&apos;ai pas encore de compte</Link>
                        </Flex>

                        <Box w={'full'} px={10}>
                            <Box borderLeft={'rgb(255,255,255,.5) 1px solid'} pl={5}>
                                <Text fontSize={19} mb={2} mt={5} color={'white'}>{t('register.USERNAME_LABEL')}</Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' value={usernameValue} color={'white'} onChange={handleUsernameChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={!passwordIsInvalid ? 'rgb(255,255,255,.5) 1px solid' : 'red 2px solid'} pl={5}>
                                <Text fontSize={19} mb={2} mt={5} color={'white'}>{t('register.PASSWORD_LABEL')} <Text color={'red'} fontSize={15} as={'a'}>{passwordIsInvalid ? "Le mot de passe doit contenir au moins 8 caractères !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'password'} color={'white'} value={passwordValue} onChange={handlePasswordChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={'rgb(255,255,255,.5) 1px solid'} pl={5} mt={5} display={'none'}>
                                <Checkbox checked={stayConnectedValue} onChange={handleStayConnectedChange}>
                                    {t('register.LOGIN_STAY_CONNECTED_LABEL')}
                                </Checkbox>
                            </Box>
                            <Flex flex={1} justify={'center'} w={'full'} align={'center'} mt={10}>
                                <Button
                                    px={100}
                                    py={5}
                                    isLoading={userLoginLoading}
                                    onClick={() => {
                                        dispatch(login(usernameValue, passwordValue))
                                    }}
                                    isDisabled={!usernameValue ||
                                        !passwordValue ||
                                        passwordIsInvalid}>
                                    {t('register.LOGIN_BUTTON_LABEL')}
                                </Button>
                            </Flex>
                        </Box>
                        <Box h={'1px'} w={'full'} bgColor={'rgb(255,255,255,.2)'} mx={0} my={10} />
                        <Text fontSize={12} textAlign={'justify'} maxW={900} color={'rgb(255,255,255,.5)'}>{t('register.REGISTER_LAW_TEXT')}</Text>
                    </Box>
                </Flex>
            </Container>
        </Container>
    );
}

export async function getServerSideProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], null, ['fr-FR', 'en-US'])),
        },
    };
}

export default LoginPage;