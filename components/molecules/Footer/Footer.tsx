import {FC, useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {Box, Flex, Image, Link, Spacer, Text, Wrap} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {getCDNUrl} from "../../../store/helper";

const Footer: FC = () => {
    const router: NextRouter = useRouter();
    const { t } = useTranslation();

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
            <Flex w={'full'} h={'auto'} minH={250} className={'main-background'} color={'white'} py={10} px={{lg:0, base:10}} m={0} borderTop={'1px solid rgb(255,255,255,.2)'} id={'footer'} flexDirection={{lg: "row", base: 'column'}}>
                <Spacer/>
                <Box>
                    <Flex flexDirection={'column'}>
                        <Box>
                            <Text textAlign={"center"}
                                  fontSize={{vsm:40, base:21}}
                                  fontFamily={'Bebas Neue'}
                                  mb={{vsm:5, base:2}}
                                  letterSpacing={8}>

                                {t('name')}
                            </Text>
                        </Box>
                        <Box>
                            <Text textAlign={"center"} fontSize={{vsm:'10pt', base:'7pt'}}>
                                © Sao France MC<br/>
                                2023 Tous Droits Réservés
                            </Text>
                        </Box>
                    </Flex>

                </Box>
                <Spacer display={{xl:'block', sm: 'none'}}/>
                <Box w={'1px'} h={'full'} bgColor={'rgb(255,255,255,.2)'} display={{xl:'block', sm: 'none'}}/>
                <Spacer display={{xl:'block', sm: 'none'}}/>
                <Box display={{xl:'block', lg: 'none'}} pt={{lg:0,base:2}}  borderTop={{lg:'none', base:'1px solid rgb(255,255,255,.5)'}} margin={'auto'} mt={{lg: 0, base:5}} >
                    <Flex flexDirection={'column'} textAlign={{lg: 'left', base: 'center'}}>
                        <Text fontSize={{vsm:30, base:18}} mb={5} fontWeight={'bold'}>Á propos</Text>
                        <Text maxW={{lg:300, base: '500'}} margin={{lg:0, base:'auto'}} fontSize={{vsm:16, base:10}}>
                            {t('home.HOME_DESCRIPTION')}
                        </Text>
                    </Flex>
                </Box>
                <Spacer/>
                <Box w={'1px'} h={'full'} bgColor={'rgb(255,255,255,.2)'}/>
                <Spacer/>
                <Box pt={{lg:0,base:2}}  borderTop={{lg:'none', base:'1px solid rgb(255,255,255,.5)'}} margin={'auto'} mt={{lg: 0, base:5}}>
                    <Flex flexDirection={'column'} textAlign={{lg: 'left', base: 'center'}}>
                        <Text fontSize={{vsm:30, base:18}} mb={5} fontWeight={'bold'}>Liens utiles</Text>
                        <Text _hover={{textDecoration: 'underline'}} fontSize={{vsm:16, base:10}} cursor={"pointer"} onClick={() => router.push('/')}>Accueil</Text>
                        <Text _hover={{textDecoration: 'underline'}} fontSize={{vsm:16, base:10}} cursor={"pointer"} onClick={() => router.push('/cgu')}>C.G.U.</Text>
                        <Text _hover={{textDecoration: 'underline'}} fontSize={{vsm:16, base:10}} cursor={"pointer"} onClick={() => router.push('/cgv')}>C.G.V.</Text>
                    </Flex>
                </Box>
                <Spacer/>
                <Box w={'1px'} h={'full'} bgColor={'rgb(255,255,255,.2)'}/>
                <Spacer/>
                <Box pt={{lg:0,base:2}}  borderTop={{lg:'none', base:'1px solid rgb(255,255,255,.5)'}} margin={'auto'} mt={{lg: 0, base:5}}>
                    <Flex flexDirection={'column'} textAlign={{lg: 'left', base: 'center'}}>
                        <Text fontSize={{vsm:30, base:18}} mb={5} fontWeight={'bold'}>Nous retrouver</Text>
                        <Wrap>
                            <Link href={'https://discord.gg/saofrance'} target={'_blank'}>
                                <Image src={getCDNUrl()+'/images/discord_logo.png'} w={{vsm:30, base:22}} _hover={{opacity:.7}} cursor={"pointer"} alt={'Discord Logo Image'}/>
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