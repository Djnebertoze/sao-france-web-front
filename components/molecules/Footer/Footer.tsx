import {FC, useEffect} from "react";
import { NextRouter, useRouter } from "next/router";
import {Box, Flex, Image, Link, Spacer, Text, Wrap} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {BiX} from "react-icons/bi";

const Footer: FC = () => {
    const router: NextRouter = useRouter();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if(document.URL.includes('admin')){
            // @ts-ignore
            document.getElementById('footer').style.display = 'none'
        } else {
            // @ts-ignore
            document.getElementById('footer').style.display = 'flex'
        }
    }, [router])

    return(
        <>
            <Flex w={'full'} h={300} className={'main-background'} color={'white'} py={10} m={0} borderTop={'1px solid rgb(255,255,255,.2)'} id={'footer'}>
                <Spacer/>
                <Box>
                    <Flex flexDirection={'column'} >
                        <Box>
                            <Text textAlign={"center"}
                                  fontSize={40}
                                  fontFamily={'Bebas Neue'}
                                  mb={5}
                                  letterSpacing={8}>

                                {t('name')}
                            </Text>
                        </Box>
                        <Box>
                            <Text textAlign={"center"} fontSize={'10pt'}>
                                © Sao France MC<br/>
                                2023 Tous Droits Réservés
                            </Text>
                        </Box>
                    </Flex>

                </Box>
                <Spacer display={{xl:'block', sm: 'none'}}/>
                <Box w={'1px'} h={'full'} bgColor={'rgb(255,255,255,.2)'} display={{xl:'block', sm: 'none'}}/>
                <Spacer display={{xl:'block', sm: 'none'}}/>
                <Box display={{xl:'block', sm: 'none'}}>
                    <Flex flexDirection={'column'}>
                        <Text fontSize={30} mb={5} fontWeight={'bold'}>Á propos</Text>
                        <Text maxW={300}>
                            {t('home.HOME_DESCRIPTION')}
                        </Text>
                    </Flex>
                </Box>
                <Spacer/>
                <Box w={'1px'} h={'full'} bgColor={'rgb(255,255,255,.2)'}/>
                <Spacer/>
                <Box>
                    <Flex flexDirection={'column'}>
                        <Text fontSize={30} mb={5} fontWeight={'bold'}>Liens utiles</Text>
                        <Text _hover={{textDecoration: 'underline'}} cursor={"pointer"} onClick={() => router.push('/')}>Accueil</Text>
                        <Text _hover={{textDecoration: 'underline'}} cursor={"pointer"} onClick={() => router.push('/cgu')}>C.G.U.</Text>
                        <Text _hover={{textDecoration: 'underline'}} cursor={"pointer"} onClick={() => router.push('/cgv')}>C.G.V.</Text>
                    </Flex>
                </Box>
                <Spacer/>
                <Box w={'1px'} h={'full'} bgColor={'rgb(255,255,255,.2)'}/>
                <Spacer/>
                <Box>
                    <Flex flexDirection={'column'}>
                        <Text fontSize={30} mb={5} fontWeight={'bold'}>Nous retrouver</Text>
                        <Wrap>
                            <Link href={'https://discord.gg/saofrance'} target={'_blank'}>
                                <Image src={'https://saofrance.net/images/discord_logo.png'} w={30} _hover={{opacity:.7}} cursor={"pointer"}/>
                            </Link>
                        </Wrap>
                    </Flex>
                </Box>
                <Spacer/>
            </Flex>
        </>
    )
}

export default Footer;