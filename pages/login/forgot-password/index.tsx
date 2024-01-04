import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {Box, Button, Container, Flex, Input, InputGroup, Link, Text, useToast} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {getUserState} from "../../../store/user/userSlice";
import {sendPasswordReset} from "../../../store/user/userActions";
import {useDispatch, useSelector} from "../../../store/store";


const LoginPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        sendPasswordResetLoading, sendPasswordResetError, sendPasswordResetSuccess
    } = useSelector(getUserState)

    const { t } = useTranslation();

    const [emailIsInvalid, setEmailIsInvalid] = useState(false);

    const [emailValue, setEmailValue] = useState<string>("");
    const regexpEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const handleEmailChange = (event: any) => {
        setEmailValue(event.target.value)
        if (event.target.value.toLowerCase().match(regexpEmail)) {
            setEmailIsInvalid(false);
        } else {
            setEmailIsInvalid(true);
        }
    };


    const toast = useToast();
    const toastDuration = 5000;

    useEffect(() => {
        console.log('mmmh')
        if (sendPasswordResetSuccess && !sendPasswordResetLoading){
            toast({
                title: 'Réinitialisation envoyée',
                description: 'Si un compte existe, l\'email a été envoyée.',
                status: 'success',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (sendPasswordResetError && !sendPasswordResetLoading){
            toast({
                title: 'Erreur',
                description: sendPasswordResetError,
                status: 'error',
                duration: toastDuration,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [sendPasswordResetSuccess, sendPasswordResetError, sendPasswordResetLoading, dispatch, toast])

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} py={5} mx={0} className={'secondary-background'}>
                <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                    <Box
                         mt={140}
                         mx={18}
                         mb={150}>
                        <Text maxW={'full'} textAlign={'center'} fontFamily={'Bebas Neue'} fontSize={30} letterSpacing={3} color={'white'}>
                            Mot de passe oublié
                        </Text>
                        <Box h={'1px'} w={'full'} bgColor={'rgb(255,255,255,.2)'} mx={0} my={3}/>
                        <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                            <Link className={'clickable-link'} color={'rgb(255,255,255,.8)!important'} onClick={() => router.push('/login')}>J&apos;ai déjà un compte</Link>
                        </Flex>

                        <Box w={'full'} px={10}>
                            <Box borderLeft={!emailIsInvalid ? 'rgb(255,255,255,.5) 1px solid' : 'red 2px solid'} pl={5}>
                                <Text fontSize={19} mb={2} mt={5} color={'white'}>Email <Text color={'red'} fontSize={15} as={'a'}>{emailIsInvalid ? "Email non valide !":""}</Text></Text>
                                <InputGroup w={'full'}>
                                    <Input w={'full'} placeholder={t('register.FILL_THE_FIELD_LABEL')} variant='flushed' type={'email'} color={'white'} value={emailValue} onChange={handleEmailChange}></Input>
                                </InputGroup>
                            </Box>

                            <Flex flex={1} justify={'center'} w={'full'} align={'center'} mt={10}>
                                <Button
                                    px={100}
                                    py={5}
                                    isLoading={sendPasswordResetLoading}
                                    onClick={() => {
                                        dispatch(sendPasswordReset(emailValue))
                                    }}
                                    isDisabled={!emailValue || emailIsInvalid}>
                                    Envoyer
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