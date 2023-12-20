import {Box, Button, Container, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import { NextPage } from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {MainButton} from "../../components/atoms/Buttons/Buttons";

import perso1 from '../public/images/home/perso1.png';

import { useTranslation } from "next-i18next";
import {NextRouter, useRouter} from "next/router";


const WikiPage: NextPage = () => {

    const router: NextRouter = useRouter();

    const { t } = useTranslation();

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} minH={800} mx={0} className={'main-background'}>
                <Flex  w={'full'}>
                    <Spacer />
                    <Box>
                        <Text maxW={1000}
                              textAlign={"center"}
                              fontSize={{sm:22, base: 20}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={8}
                              color={"whiteAlpha.600"}
                              mt={100}
                              mx={10}
                              fontStyle={'italic'}>
                            Wiki en cours de développement...
                        </Text>
                    </Box>
                    <Spacer />
                </Flex>
                <Flex  w={'full'} my={200}>
                    <Spacer />
                    <Box>
                        <Image src={'https://saofrance.net/images/undraw/reading.svg'} w={400}/>
                    </Box>
                    <Spacer />
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

export default WikiPage;