import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {Box, Button, Container, Flex, Input, InputGroup, Link, Text, useToast} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {
    getUserState
} from "../../../store/user/userSlice";
import {resetPassword} from "../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../store/store";


const LoginPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();
    const token = router.query.token

    const {
        resetPasswordLoading, resetPasswordError, resetPasswordSuccess
    } = useSelector(getUserState)

    const { t } = useTranslation();

    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [passwordConfirmationIsInvalid, setPasswordConfirmationIsInvalid] = useState(false);
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


    const toast = useToast();
    const toastDuration = 5000;

    useEffect(() => {
        console.log('mmmh')
        if (resetPasswordSuccess && !resetPasswordLoading){
            router.push('/login').then(() => {
                toast({
                    title: 'Mot de passe changé',
                    description: 'Votre mot de passe a été changé.',
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
            });
        }
        if (resetPasswordError && !resetPasswordLoading){
            toast({
                title: 'Erreur lors de la réinitialisation de votre mot de passe',
                description: resetPasswordError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [resetPasswordSuccess, resetPasswordError, resetPasswordLoading, dispatch, toast, router])

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} py={5} mx={0} className={'main-background'}>
                <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                    <Box
                         mt={140}
                         mx={18}
                         w={900}
                         mb={150}>
                        <Text maxW={'full'} textAlign={'center'} fontFamily={'Bebas Neue'} fontSize={30} letterSpacing={3} color={'white'}>
                            Réinitialisation mot de passe
                        </Text>
                        <Box h={'1px'} w={'full'} bgColor={'rgb(255,255,255,.2)'} mx={0} my={3}/>
                        <Box w={'full'} px={10}>
                            <Box borderLeft={!passwordIsInvalid ? 'rgb(255,255,255,.5) 1px solid' : 'red 2px solid'} pl={5}>
                                <Text fontSize={19} mb={2} mt={5} color={'white'}>Nouveau mot de passe<Text color={'red'} fontSize={15} as={'a'}>{passwordIsInvalid ? "Le mot de passe doit contenir au moins 8 caractères !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'password'} color={'white'} value={passwordValue} onChange={handlePasswordChange}></Input>
                                </InputGroup>
                            </Box>
                            <Box borderLeft={!passwordConfirmationIsInvalid ? 'rgb(255,255,255,.4) 1px solid' : 'red 3px solid'} pl={5}>
                                <Text fontSize={19} color={'white'} mb={2} mt={5}>{t('register.VERIFICATION_PASSWORD_LABEL')} <Text color={'red'} as={'a'} fontSize={16}>* {passwordConfirmationIsInvalid ? "Les deux mots de passes de correspondent pas !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} color={'white'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'password'} value={verificationPasswordValue} onChange={handleVerificationPasswordChange}></Input>
                                </InputGroup>
                            </Box>

                            <Flex flex={1} justify={'center'} w={'full'} align={'center'} mt={10}>
                                <Button
                                    px={100}
                                    py={5}
                                    isLoading={resetPasswordLoading}
                                    onClick={() => {
                                        dispatch(resetPassword(token,passwordValue))
                                    }}
                                    isDisabled={!passwordValue || passwordIsInvalid || passwordConfirmationIsInvalid}>
                                    Modifier
                                </Button>
                            </Flex>
                        </Box>
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