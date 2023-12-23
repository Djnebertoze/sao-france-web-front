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
import {register} from "../../store/user/userActions";
import { useDispatch, useSelector } from "../../store/store";





const RegisterPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const { userRegisterLoading, auth, userInfos, userRegisterError } = useSelector(getUserState)

    const { t } = useTranslation();

    const regexpEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [passwordConfirmationIsInvalid, setPasswordConfirmationIsInvalid] = useState(false);

    const [usernameValue, setUsernameValue] = useState<string>("");
    const handleUsernameChange = (event: any) => setUsernameValue(event.target.value)

    const [lastNameValue, setLastNameValue] = useState<string>("");
    const handleLastNameChange = (event: any) => setLastNameValue(event.target.value);

    const [firstNameValue, setFirstNameValue] = useState<string>("");
    const handleFirstNameChange = (event: any) => setFirstNameValue(event.target.value);

    const [emailValue, setEmailValue] = useState<string>("");
    const handleEmailChange = (event: any) => {
        setEmailValue(event.target.value)
        if (event.target.value.toLowerCase().match(regexpEmail)) {
            setEmailIsInvalid(false);
        } else {
            setEmailIsInvalid(true);
        }
    };

    const [passwordValue, setPasswordValue] = useState<string>("");
    const handlePasswordChange = (event: any) => {
        setPasswordValue(event.target.value)
        if (event.target.value.length < 8) {
            setPasswordIsInvalid(true);
        } else {
            setPasswordIsInvalid(false);
        }
        if (event.target.value !== verificationPasswordValue) {
            setPasswordConfirmationIsInvalid(true);
        } else {
            setPasswordConfirmationIsInvalid(false);
        }
    };

    const [verificationPasswordValue, setVerificationPasswordValue] = useState<string>("");
    const handleVerificationPasswordChange = (event: any) => {
        setVerificationPasswordValue(event.target.value)
        if (event.target.value !== passwordValue) {
            setPasswordConfirmationIsInvalid(true);
        } else {
            setPasswordConfirmationIsInvalid(false);
        }
    };

    const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
    const handlePhoneNumberChange = (event: any) => setPhoneNumberValue(event.target.value);

    const [birthdayValue, setBirthdayValue] = useState<string>('');
    const handleBithdayChange = (event: any) => setBirthdayValue(event.target.value);

    const [acceptMailsValue, setAcceptMailsValue] = useState<boolean>(true);
    const handleAcceptMailsChange = (event: any) => setAcceptMailsValue(!acceptMailsValue);

    const [acceptCGUValue, setAcceptCGUValue] = useState<boolean>(false);
    const handleAcceptCGUChange = (event: any) => setAcceptCGUValue(!acceptCGUValue);

    const toast = useToast();
    const toastDuration = 5000;

    useEffect(() => {
        if(auth?.registerSuccess){
            router.push('/');
            toast({
                title: t('register.REGISTER_USER_CREATION_SUCCESS_TOAST_TITLE'),
                description: t('register.REGISTER_USER_CREATION_SUCCESS_TOAST_DESCRIPTION'),
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [dispatch, auth, toast, router, userRegisterError, t]);


    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} py={5} mx={0} className={'secondary-background'}>
                <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                    <Box minH={1000}
                         mt={140}
                         mx={18}
                         mb={150}>
                        <Text maxW={'full'} textAlign={'center'} color={'white'} fontFamily={'Bebas Neue'} fontSize={30} letterSpacing={3}>
                            {t('globals.REGISTER_LABEL')}
                        </Text>
                        <Box h={'1px'} w={'full'} bgColor={'rgb(255,255,255,.2)'} mx={0} my={3}/>
                        <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                            <Link className={'clickable-link'} color={'rgb(255,255,255,.5)!important'} onClick={() => router.push('/login')}>J&apos;ai déjà un compte</Link>
                        </Flex>

                        <Box w={'full'} px={10}>
                            <Text fontSize={15} mb={2} mt={5} color={'white'}><Text color={'red'} as={'a'}>*</Text> = {t('register.REQUIRED_LABEL')}</Text>
                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5}>
                                <Text fontSize={19} mb={2} mt={5} color={'white'}>{t('register.USERNAME_LABEL')} <Text color={'red'} as={'a'}>*</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' value={usernameValue} onChange={handleUsernameChange}></Input>
                                </InputGroup>
                            </Box>

                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.LAST_NAME_LABEL')} <Text color={'red'} as={'a'}>*</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' value={lastNameValue} onChange={handleLastNameChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.FIRST_NAME_LABEL')} <Text color={'red'} as={'a'}>*</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' value={firstNameValue} onChange={handleFirstNameChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={!emailIsInvalid ? 'rgb(255,255,255,.4) 1px solid' : 'red 3px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.EMAIL_LABEL')} <Text color={'red'} as={'a'}>* {emailIsInvalid ? "Veuillez rentrer une adresse email valide !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'email'} value={emailValue} onChange={handleEmailChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={!passwordIsInvalid ? 'rgb(255,255,255,.4) 1px solid' : 'red 3px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.PASSWORD_LABEL')} <Text color={'red'} as={'a'}>* {passwordIsInvalid ? "Le mot de passe doit contenir au moins 8 caractères !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'password'} value={passwordValue} onChange={handlePasswordChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={!passwordConfirmationIsInvalid ? 'rgb(255,255,255,.4) 1px solid' : 'red 3px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.VERIFICATION_PASSWORD_LABEL')} <Text color={'red'} as={'a'}>* {passwordConfirmationIsInvalid ? "Les deux mots de passes de correspondent pas !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'password'} value={verificationPasswordValue} onChange={handleVerificationPasswordChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.PHONE_NUMBER_LABEL')} <Text as={'i'} fontSize={10}>{t('register.IS_OPTIONAL_LABEL')}</Text></Text>
                                <InputGroup w={'full'}>
                                    <InputLeftElement pointerEvents='none'>
                                        <PhoneIcon color='white' />
                                    </InputLeftElement>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'tel'} value={phoneNumberValue} onChange={handlePhoneNumberChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.BIRTHDAY_LABEL')} <Text as={'i'} fontSize={10}>{t('register.REQUIRED_FOR_STAFF_LABEL')}</Text></Text>
                                <InputGroup w={'full'}>
                                    <InputLeftElement pointerEvents='none'>
                                        <CalendarIcon color='white' />
                                    </InputLeftElement>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'date'} value={birthdayValue} onChange={handleBithdayChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5} mt={5}>
                                <Checkbox defaultChecked checked={acceptMailsValue} onChange={handleAcceptMailsChange} color={'white'}>
                                    {t('register.ACCEPT_EMAILS_LABEL')}
                                </Checkbox>
                            </Box>
                            <Box borderLeft={'rgb(255,255,255,.4) 1px solid'} pl={5} mt={5}>
                                <Checkbox checked={acceptCGUValue} onChange={handleAcceptCGUChange} color={'white'}>
                                    {t('register.ACCEPT_CGU_LABEL')}<Link href={"/cgu"} className={'clickable-link'} isExternal color={'whiteAlpha.500!important'}>{t('register.CGU_LABEL')}<ExternalLinkIcon mx='2px' /></Link>
                                </Checkbox>
                            </Box>
                            <Flex flex={1} justify={'center'} w={'full'} align={'center'} mt={10}>
                                <Button
                                    px={100}
                                    py={5}
                                    isLoading={userRegisterLoading}
                                    onClick={() => {
                                        dispatch(register(usernameValue, lastNameValue, firstNameValue, emailValue, passwordValue, acceptMailsValue, phoneNumberValue, birthdayValue))
                                    }}
                                    isDisabled={!usernameValue ||
                                        !lastNameValue ||
                                        !firstNameValue ||
                                        !emailValue ||
                                        !passwordValue ||
                                        !verificationPasswordValue ||
                                        !acceptCGUValue || emailIsInvalid || passwordIsInvalid || passwordConfirmationIsInvalid}>
                                    {t('register.REGISTER_BUTTON_LABEL')}
                                </Button>
                            </Flex>
                        </Box>
                        <Box h={'1px'} w={'full'} bgColor={'rgb(255,255,255,.2)'} mx={0} my={10} />
                        <Text fontSize={12} textAlign={'justify'} color={'rgb(255,255,255,.5)'} maxW={900}>{t('register.REGISTER_LAW_TEXT')}</Text>
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

export default RegisterPage;