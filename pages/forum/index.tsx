import {Box, Container, Flex, Image, Spacer, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getCDNUrl} from "../../store/helper";


const ForumPage: NextPage = () => {

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} minH={800} mx={0} className={'main-background'}>
                <Flex  w={'full'} >
                    <Box maxW={100}>
                    </Box>
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
                            Forum en cours de développement...
                        </Text>
                    </Box>
                    <Spacer />

                    <Box maxW={100}/>
                </Flex>
                <Flex  w={'full'} my={200}>
                    <Spacer />
                    <Box>
                        <Image src={getCDNUrl()+'/images/undraw/reading.svg'} alt={'Undraw reading image'} w={400}/>
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

export default ForumPage;