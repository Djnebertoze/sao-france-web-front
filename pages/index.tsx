import {Box, Button, Center, Container, Flex, Image, Spacer, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {useTranslation} from "next-i18next";

import {getCDNUrl} from "../store/helper";
import {NextRouter, useRouter} from "next/router";


const HomePage: NextPage = () => {

    const { t } = useTranslation();
    const router: NextRouter = useRouter();

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Flex maxW={'full'} py={5} mx={0} className={'main-background'} flexDirection={"column"}>
                <Flex h={{sm:260, vsm: 180, base: 123}} mt={{sm:101, base:55}}>
                    <Spacer/>
                    <Box>
                        <Text textAlign={"center"}
                              fontSize={{sm:100, vsm:60, base:39}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={8}
                              className={'colored-title-text'}>
                            {t('name')}
                        </Text>
                        <Text textAlign={"center"}
                              fontSize={{sm:50, vsm:25, base:15}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={{sm:8, vsm: 5, base:2}}
                              color={"white"}
                              mt={{sm:-30, vsm:-21, base:-3}}
                              fontStyle={'italic'}>
                            {t('home.HOME_ON_MINECRAFT')}
                        </Text>
                    </Box>
                    <Spacer />
                </Flex>
                <Flex  w={'full'}>
                    <Spacer />
                    <Box>
                        <Text maxW={1000}
                              textAlign={"center"}
                              fontSize={{sm:22, vsm: 20, base:17}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={{sm:8, vsm:5, base:1}}
                              color={"whiteAlpha.600"}
                              mt={-30}
                              mx={10}
                              fontStyle={'italic'}>
                            {t('home.HOME_DESCRIPTION')}
                        </Text>
                    </Box>
                    <Spacer />
                </Flex>
                <Flex h={130} w={'full'} mt={{vsm:41, base: 21}}>
                    <Box/>
                    <Spacer />
                    <Box>
                        <Button colorScheme={'blue'}
                                fontFamily={'Bebas Neue'}
                                letterSpacing={{sm:7, vsm: 5, base: 3}}
                                fontSize={{md:30, sm:20, vsm: 18, base:13}}
                                onClick={event => router.push("https://www.technicpack.net/modpack/saofrance-ex-v2.1985170")}
                                py={{md:8, sm:7, vsm:6, base:0}}
                                px={{md:70, sm:61, vsm: 50, base: 35}}>

                            {t('home.HOME_PLAY_NOW')}
                        </Button>

                    </Box>
                    <Spacer />
                    <Box />

                </Flex>
                <Center mt={{sm: 100,base:0}}><Image maxW={"64"} maxH={"64"} src={getCDNUrl()+"/images/icons8-minecraft.svg"} alt={"minecraft-grass-cube"}/></Center>
                <Center>
                    <Text textAlign={"center"}
                          fontSize={{sm:40, vsm:30, base:19}}
                          fontFamily={'Bebas Neue'}
                          letterSpacing={8}
                          color={"white"}
                          px={{md:100, vsm:30, base:3}}
                          mx={{vsm:0, base:5}}
                          borderLeft={{md:'1px solid rgb(255,255,255,.3)', vsm:'none', base:'1px solid rgb(255,255,255,.3)'}}
                          borderRight={{md:'1px solid rgb(255,255,255,.3)', vsm:'none', base:'1px solid rgb(255,255,255,.3)'}}
                          mt={{sm:100, base:65}}>
                        Une aventure <u>magnifique</u>
                    </Text>
                </Center>
                <Flex color={'white'} m={10} mt={{vsm:61, base:35}} flexDirection={{lg: 'row', base: 'column', }}>
                    <Flex>
                        <Spacer/>
                        <Image src={getCDNUrl()+'/images/wallpaper/plan4_.png'}
                               h={{sm:400, vsm: 200}}
                               minW={{base:200}}
                               maxW={700}
                                alt={'Wal paper image'}
                               boxShadow={'10px 10px 30px 0px rgb(255,255,255,.1)'}
                               objectFit={'cover'}
                               borderRadius={7}/>
                        <Spacer/>
                    </Flex>
                    <Flex textAlign={"left"}
                          mx={{lg: 70, base: 0}}
                          pl={{lg: 20, base: 0}}
                          borderLeft={{lg: '2px solid rgb(255,255,255,.6)', base: 'none'}}
                          maxW={{lg:700, base:'full'}} w={{lg:'', base:'full'}}>
                        <Spacer/>
                        <Flex flexDirection={'column'}
                              maxW={700}
                              mt={{lg:0, base:5}}
                              borderBottom={{lg: 'none', base: '2px solid rgb(255,255,255,.6)'}}
                              pb={{lg:0, base: 50}}>
                            <Text fontSize={{vsm:25, base:21}} fontWeight={'bold'} mb={8}>Commencez votre Aventure !</Text>
                            <Text fontSize={{vsm:20, base:15}}>
                                {t('home.FIRST_PARAGRAPH')}</Text>
                            <Button colorScheme={'blue'} w={{vsm:200, base:150}} mt={50} h={{vsm:45, base:35}} fontSize={{vsm:15, base:12}} onClick={() => router.push("https://www.technicpack.net/modpack/saofrance-ex-v2.1985170")}>Commencer à jouer</Button>
                        </Flex>
                        <Spacer/>
                    </Flex>
                </Flex>
                <Flex color={'white'} m={10} mt={{lg:20, base:0}} flexDirection={{lg: 'row', base: 'column-reverse', }}>
                    <Flex textAlign={"left"}
                          mx={{lg: 70, base: 0}}
                          pr={{lg: 20, base: 0}}
                          borderRight={{lg: '2px solid rgb(255,255,255,.6)', base: 'none'}}
                          maxW={{lg:700, base:'full'}} w={{lg:'', base:'full'}}>
                        <Spacer/>
                        <Flex flexDirection={'column'}
                              maxW={700}
                              mt={{lg:0, base:5}}
                              borderBottom={{lg: 'none', base: '2px solid rgb(255,255,255,.6)'}}
                              pb={{lg:0, base: 50}}>
                            <Text fontSize={{vsm:25, base:21}} fontWeight={'bold'} mb={8}>Venez nous aider !</Text>
                            <Text fontSize={{vsm:20, base:15}}>
                                {t('home.SECOND_PARAGRAPH')}</Text>
                            <Button colorScheme={'blue'} w={200} mt={50} h={45} onClick={() => router.push('/shop')}>Voir la boutique</Button>
                        </Flex>
                        <Spacer/>
                    </Flex>
                    <Flex>
                        <Spacer/>
                        <Image src={getCDNUrl()+'/images/wallpaper/plan3.png'}
                               h={{sm:400, vsm: 200}}
                               minW={{base:200}}
                               alt={'Wallpaper image'}
                               boxShadow={'10px 10px 30px 0px rgb(255,255,255,.1)'}
                               objectFit={'cover'}
                               borderRadius={7}/>
                        <Spacer/>
                    </Flex>
                </Flex>
                <Center mt={{sm: 100,base:0}}><Image maxW={"64"} maxH={"64"} src={getCDNUrl()+"/images/icons8-minecraft.svg"} alt={"minecraft-grass-cube"}/></Center>
                <Center>
                    <Text textAlign={"center"}
                          fontSize={{sm:20, base:20}}
                          color={"rgb(255,255,255,.7)"}
                          px={{md:100, sm:30}}
                          mt={{sm:100, base:51}} mb={4}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Vous avez besoin d'aide ?
                    </Text>
                </Center>
                <Center>
                    <Text textAlign={"center"}
                          fontSize={{sm:40, vsm:30, base:19}}
                          fontFamily={'Bebas Neue'}
                          letterSpacing={8}
                          color={"white"}
                          px={{md:100, vsm:30, base:3}}
                          mx={{vsm:0, base:5}}
                          borderLeft={{md:'1px solid rgb(255,255,255,.3)', vsm:'none', base:'1px solid rgb(255,255,255,.3)'}}
                          borderRight={{md:'1px solid rgb(255,255,255,.3)', vsm:'none', base:'1px solid rgb(255,255,255,.3)'}}
                          mb={{base:10}}
                          >
                        Une communauté <u>incroyable</u>
                    </Text>
                </Center>
                <Flex color={'white'} m={10} mt={{lg:20, base:0}} flexDirection={{lg: 'row', base: 'column', }}>
                    <Spacer/>
                    <Flex>
                        <Spacer display={{lg:'flex', base:'none'}}/>
                        <Box display={{sm:'block', base: 'none'}}>
                        <iframe src="https://discord.com/widget?id=583776836325081090&theme=dark" width="350" height="500"
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                        </Box>
                    </Flex>
                    <Flex textAlign={"left"}
                          mx={{lg: 70, base: 0}}
                          maxW={{lg:700, base:'full'}} w={{lg:'', base:'full'}}>
                        <Spacer/>
                        <Flex flexDirection={'column'}
                              maxW={700}
                              mt={{lg:0, base:5}}
                              borderBottom={{lg: 'none', base: '2px solid rgb(255,255,255,.6)'}}
                              pb={{lg:0, base: 50}}>
                            <Text fontSize={{vsm:25, base:18}} fontWeight={'bold'} mb={8}>Rejoins notre discord !</Text>
                            <Text fontSize={{vsm:20, base:13}}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Rejoins notre discord pour être à l'affût de  toutes les nouveautées et ne louper aucune annonce !</Text>
                            <Button colorScheme={'blue'} w={{vsm:200, base:140}} mt={50} h={{vsm:45, base:30}} fontSize={{vsm:16, base:12}} onClick={() => window.open('https://discord.gg/saofrance', "_blank")}>
                                Rejoindre
                            </Button>
                        </Flex>
                        <Spacer/>
                    </Flex>
                    <Spacer/>
                </Flex>
            </Flex>

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

export default HomePage;