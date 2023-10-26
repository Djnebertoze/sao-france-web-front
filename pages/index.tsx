import {Box, Button, Center, Container, Flex, HStack, Image, Link, Spacer, Text} from "@chakra-ui/react";
import { NextPage } from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {MainButton} from "../components/atoms/Buttons/Buttons";

import perso1 from '../public/images/home/perso1.png';

import { useTranslation } from "next-i18next";
import {NextRouter, useRouter} from "next/router";


const HomePage: NextPage = () => {

    const router: NextRouter = useRouter();

    const { t } = useTranslation();

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Flex maxW={'full'} py={5} mx={0} className={'main-background'} flexDirection={"column"} mt={'80px'}>
                <Flex h={{sm:260, base: 180}} mt={{sm:73, base:81}}>
                    <Spacer/>
                    <Box>
                        <Text textAlign={"center"}
                              fontSize={{sm:100, base:70}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={8}
                              className={'colored-title-text'}>
                            {t('name')}
                        </Text>
                        <Text textAlign={"center"}
                              fontSize={{sm:50, base:30}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={8}
                              color={"white"}
                              mt={-30}
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
                              fontSize={{sm:22, base: 20}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={8}
                              color={"whiteAlpha.600"}
                              mt={-30}
                              mx={10}
                              fontStyle={'italic'}>
                            {t('home.HOME_DESCRIPTION')}
                        </Text>
                    </Box>
                    <Spacer />
                </Flex>
                <Flex h={130} w={'full'} mt={20}>
                    <Box/>
                    <Spacer />
                    <Box>
                        <Button colorScheme={'blue'}
                                fontFamily={'Bebas Neue'}
                                letterSpacing={7}
                                fontSize={{md:30, sm:20, base: 18}}
                                py={{md:8, sm:7, base:6}}
                                px={{md:70, sm:61, base: 50}}>
                            {t('home.HOME_PLAY_NOW')}
                        </Button>

                    </Box>
                    <Spacer />
                    <Box />

                </Flex>
                <Center mt={100}><img width="64" height="64" src="https://saofrance.net/images/icons8-minecraft.svg" alt="minecraft-grass-cube"/></Center>
                <Center>
                    <Text textAlign={"center"}
                          fontSize={{sm:40, base:30}}
                          fontFamily={'Bebas Neue'}
                          letterSpacing={8}
                          color={"white"}
                          px={{md:100, sm:30}}
                          borderLeft={{md:'1px solid rgb(255,255,255,.3)', sm:'none'}}
                          borderRight={{md:'1px solid rgb(255,255,255,.3)', sm:'none'}}
                          mt={100}>
                        Une aventure <u>magnifique</u>
                    </Text>
                </Center>
                <Flex color={'white'} m={10} mt={20} flexDirection={{lg: 'row', base: 'column', }}>
                    <Flex>
                        <Spacer/>
                        <Image src={'https://saofrance.net/images/wallpaper/plan4.png'}
                               h={400}
                               minW={400}
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
                            <Text fontSize={25} fontWeight={'bold'} mb={8}>Commencez votre Aventure !</Text>
                            <Text fontSize={20}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Nisl purus in mollis nunc sed id semper risus. </Text>
                            <Button colorScheme={'blue'} w={200} mt={50} h={45}>Commencer à jouer</Button>
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
                            <Text fontSize={25} fontWeight={'bold'} mb={8}>Lorem ipsum dolor sit amet !</Text>
                            <Text fontSize={20}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Nisl purus in mollis nunc sed id semper risus. </Text>
                            <Button colorScheme={'blue'} w={200} mt={50} h={45}>Lorem ipsum</Button>
                        </Flex>
                        <Spacer/>
                    </Flex>
                    <Flex>
                        <Spacer/>
                        <Image src={'https://saofrance.net/images/wallpaper/plan3.png'}
                               h={400}
                               minW={400}
                               boxShadow={'10px 10px 30px 0px rgb(255,255,255,.1)'}
                               objectFit={'cover'}
                               borderRadius={7}/>
                        <Spacer/>
                    </Flex>
                </Flex>
                <Center mt={100}><img width="64" height="64" src="https://saofrance.net/images/icons8-minecraft.svg" alt="minecraft-grass-cube"/></Center>
                <Center>
                    <Text textAlign={"center"}
                          fontSize={{sm:20, base:20}}
                          color={"rgb(255,255,255,.7)"}
                          px={{md:100, sm:30}}
                          mt={100} mb={4}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Vous avez besoin d'aide ?
                    </Text>
                </Center>
                <Center>
                    <Text textAlign={"center"}
                          fontSize={{sm:40, base:30}}
                          fontFamily={'Bebas Neue'}
                          letterSpacing={8}
                          color={"white"}
                          px={{md:100, sm:30}}
                          borderLeft={{md:'1px solid rgb(255,255,255,.3)', sm:'none'}}
                          borderRight={{md:'1px solid rgb(255,255,255,.3)', sm:'none'}}
                          >
                        Une communauté <u>incroyable</u>
                    </Text>
                </Center>
                <Flex color={'white'} m={10} mt={{lg:20, base:0}} flexDirection={{lg: 'row', base: 'column', }}>
                    <Spacer/>
                    <Flex>
                        <Spacer/>
                        <iframe src="https://discord.com/widget?id=583776836325081090&theme=dark" width="350" height="500"
                                frameBorder="0"
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
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
                            <Text fontSize={25} fontWeight={'bold'} mb={8}>Rejoins notre discord !</Text>
                            <Text fontSize={20}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Rejoins notre discord pour être à l'affût de  toutes les nouveautées et ne louper aucune annonce !</Text>
                            <Button colorScheme={'blue'} w={200} mt={50} h={45} onClick={() => window.open('https://discord.gg/saofrance', "_blank")}>
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