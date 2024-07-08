import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {Box, Center, Container, Flex, Grid, GridItem, Image, Skeleton, Text, useToast, Wrap, WrapItem,} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "../../store/store";
import AdminShopProductCard from "../../components/molecules/ShopProductCard/AdminShopProductCard";
import {ShopCategorie, ShopProduct} from "../../common/types/types";
import {shopCategories} from "../../common/shop/shopCategories";
import {getShopState} from "../../store/shop/shopSlice";
import {getShopActiveProducts, getShopProducts} from "../../store/shop/shopActions";
import { motion } from 'framer-motion';
import CosmeticShopProductCard from "../../components/molecules/ShopProductCard/ComsticShopProductCard";
import PointsShopProductCard from "../../components/molecules/ShopProductCard/PointsShopProductCard";
import UpgradesShopProductCard from "../../components/molecules/ShopProductCard/UpgradesShopProductCard";
import {getRoleById} from "../../common/roles/roles";

import {
    paladin_advantages,
    paladin_price,
    beater_advantages_short,
    beater_price,
    beater_product_id,
    conqueror_advantages,
    conqueror_price,
    conqueror_product_id,
    legende_advantages,
    legende_price,
    legende_product_id,
    paladin_product_id} from '../../common/shop/ranksAdvantages'



const ShopPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const temporaryCategories: ShopCategorie[] = shopCategories;
/*
    const {
        auth,
        userInfos,
        userLoginLoading,
        userLoginError, minecraftProfile, getMinecraftProfileError
    } = useSelector(getUserState)*/
    const {
        shopProducts,
        getShopProductsLoading
    } = useSelector(getShopState)

    const toast = useToast();

    const [cosmeticsProducts, setCosmeticsProducts] = useState<Array<ShopProduct>>()
    const [pointsProducts, setPointsProducts] = useState<Array<ShopProduct>>()
    const [upgradesProducts, setUpgradesProducts] = useState<Array<ShopProduct>>()
    const [displayAllRanks, setDisplayAllRanks] = useState<boolean>(false)

    useEffect(() => {
        /*console.log('usss')*/

        /*if (auth?.accessToken) {
            if (!userInfos){
                dispatch(getUserProfile(auth.accessToken))
            }
            if (userInfos) {

            }
        }*/

        if(/*auth?.accessToken && */shopProducts && !getShopProductsLoading){
            /*console.log('usss1')
            console.log(shopProducts)*/
            console.log('Got products');
            temporaryCategories.sort((a, b) => a.place - b.place);



            if (shopProducts) {
                /*const categorieProducts = shopProducts.filter(product => product.categorieId === temporaryCategories[0]._id);
                categorieProducts.sort((a, b) => a.place - b.place)*/

                const tempCosmeticsProducts = shopProducts.filter(product => product.categorieId === 'cosmetiques');
                tempCosmeticsProducts.sort((a, b) => a.place - b.place);
                setCosmeticsProducts(tempCosmeticsProducts);

                const tempPointsProducts = shopProducts.filter(product => product.categorieId === 'points');
                tempPointsProducts.sort((a, b) => a.place - b.place);
                setPointsProducts(tempPointsProducts);

                const tempUpgradesProducts = shopProducts.filter(product => product.categorieId === 'upgrades');
                // @ts-ignore
                tempUpgradesProducts.sort((a, b) => getRoleById(a.roleFinal)?.power - getRoleById(b.roleFinal)?.power);
                setUpgradesProducts(tempUpgradesProducts);
            }
        }

        if(!shopProducts && !getShopProductsLoading){
            dispatch(getShopActiveProducts())
        }

    }, [dispatch,toast, router,  shopProducts, temporaryCategories, getShopProductsLoading]);



    return (
        <Container maxW={'full'} margin={0} padding={0} color={'white'}>
            <Container maxW={'full'} p={0} mx={0} className={'main-background'} minH={'100%'} w={'full'}>
                <Flex w={'full'} flexDirection={'column'} minH={1000} className={'main-background'} mt={{lg:'80px', base:'50px'}}>
                    <section id={'grades'}>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden: {
                                opacity: 0
                            },
                            visible: {
                                opacity: 1,
                                transition: {
                                    duration: 1
                                }
                            },}}>
                            <Center mt={21}>
                                <Text textTransform={"uppercase"}
                                      fontSize={25}
                                      textAlign={'center'}
                                      letterSpacing={2}
                                      borderLeft={'1px solid rgb(255,255,255,.3)'}
                                      borderRight={'1px solid rgb(255,255,255,.3)'}
                                      w={900}>
                                    Nos grades les plus prisés
                                </Text>
                            </Center>
                        </motion.div>
                        <Grid templateColumns='repeat(3, 1fr)' mt={75} gap={70} mx={'auto'} maxW={1100}>

                            { /* GRADE PALADIN */ }
                            <motion.div initial="hidden" animate="visible" variants={{
                                hidden: {
                                    translateY: 50,
                                    opacity: 0
                                },
                                visible: {
                                    translateY: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: .2,
                                        duration: 1
                                    }
                                }
                            }}>
                            <GridItem w='100%' mt={0} h={560} bg={'linear-gradient(#ffffff, #BC7A27 90%)'} border={'2px solid rgb(255,255,255,.1)'}  borderRadius={10}>
                                <Image src={"https://cdn.saofrance.net/images/Market/VIP_Madera.png"} w={131} mt={5} mx={'auto'} alt={'Product image'}/>
                                <Text w={'100%'}
                                      textAlign={'center'}
                                      textTransform={'uppercase'}
                                      fontWeight={'bold'}
                                      mt={3}
                                      letterSpacing={1}
                                      mb={5}
                                      fontSize={19}>
                                    Grade <Text as={'span'} color={'#BC7A27'}>Paladin</Text>
                                </Text>
                                {paladin_advantages.map((advantage) => {
                                    return (
                                        <Flex mb={4} ml={7} pr={9} key={advantage}>
                                            <Box w={21} h={21} bg={'#BC7A27'} mr={2} borderRadius={4}>
                                                <Image mt={'6px'} ml={'5px'} src={'https://cdn.saofrance.net/images/components/white_check.png'} alt={'White check'}/>
                                            </Box>
                                            <Text mt={-1} fontSize={16}>{advantage}</Text>
                                        </Flex>
                                    )
                                })}
                                <Text fontSize={20} mt={3} color={'rgb(255,255,255,1)'} textAlign={'center'}>{paladin_price}</Text>
                                <Box h={'1px'} bg={'white'} mt={5}/>
                                <Box>
                                    <Text textAlign={'center'}
                                          fontSize={20}
                                          _hover={{bgColor:'rgb(255,255,255,.1)'}}
                                          h={73}
                                          pt={4}
                                          borderBottomRadius={13}
                                          transition={'ease-in-out .05s'}
                                          cursor={'pointer'}
                                          onClick={() => router.push('/shop/product/' + paladin_product_id)}
                                          mt={0}>Voir le produit</Text>
                                </Box>
                            </GridItem>
                            </motion.div>

                            { /* GRADE BEATER */ }


                            <motion.div initial="hidden" animate="visible" variants={{
                                hidden: {
                                    translateY: 10,
                                    opacity: 0
                                },
                                visible: {
                                    translateY: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: .2,
                                        duration: 1
                                    }
                                }
                            }}>
                            <GridItem w='100%' h={670} bg={'linear-gradient(#ffffff, #422A39 90%)'} border={'2px solid rgb(255,255,255,.1)'} borderRadius={10}>
                                <Text w={'100%'}
                                      textAlign={'center'}
                                      bg={'linear-gradient(to right, #CC0000, #660000)'}
                                      textTransform={'uppercase'}
                                      fontSize={17}
                                      mt={4}>
                                    Le plus vendu
                                </Text>
                                <Image src={"https://cdn.saofrance.net/images/Market/VIP_Obsidiana.png"} w={131} mt={2} mx={'auto'} alt={'Product image'}/>
                                <Text w={'100%'}
                                      textAlign={'center'}
                                      textTransform={'uppercase'}
                                      fontWeight={'bold'}
                                      mt={3}
                                      letterSpacing={1}
                                      mb={5}
                                      fontSize={19}>
                                    Grade <Text as={'span'} color={'#422A39'}>Beater</Text>
                                </Text>
                                {beater_advantages_short.map((advantage) => {
                                    return (
                                        <Flex mb={4} ml={7} key={advantage}>
                                            <Box w={21} h={21} bg={'#422A39'} mr={2} borderRadius={4}>
                                                <Image mt={'6px'} ml={'5px'} src={'https://cdn.saofrance.net/images/components/white_check.png'} alt={'White check'}/>
                                            </Box>
                                            <Text mt={-1} fontSize={16}>{advantage}</Text>
                                        </Flex>
                                    )
                                })}
                                <Text mt={-1} fontSize={16} color={'rgb(255,255,255,.3)'} textAlign={'center'}>Et d&apos;autres...</Text>
                                <Text fontSize={20} mt={2} color={'rgb(255,255,255,1)'} textAlign={'center'}>{beater_price}</Text>
                                <Box h={'1px'} bg={'white'} mt={5}/>
                                <Box>
                                    <Text textAlign={'center'}
                                          fontSize={20}
                                          _hover={{bgColor:'rgb(255,255,255,.1)'}}
                                          h={73}
                                          pt={4}
                                          borderBottomRadius={13}
                                          transition={'ease-in-out .05s'}
                                          cursor={'pointer'}
                                          onClick={() => router.push('/shop/product/' + beater_product_id)}
                                          mt={0}>
                                        Voir le produit</Text>
                                </Box>
                            </GridItem>
                            </motion.div>
                            { /* GRADE CONQUÉRANT */ }

                            <motion.div initial="hidden" animate="visible" variants={{
                                hidden: {
                                    translateY: 50,
                                    opacity: 0
                                },
                                visible: {
                                    translateY: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: .2,
                                        duration: 1
                                    }
                                }
                            }}>
                            <GridItem w='100%' h={622} bg={'linear-gradient(#ffffff, #143688 90%)'} border={'2px solid rgb(255,255,255,.1)'}  borderRadius={10}>
                                <Image src={"https://cdn.saofrance.net/images/Market/VIP_Oro.png"} w={131} mt={5} mx={'auto'} alt={'Product image'}/>
                                <Text w={'100%'}
                                      textAlign={'center'}
                                      textTransform={'uppercase'}
                                      fontWeight={'bold'}
                                      mt={3}
                                      letterSpacing={1}
                                      mb={5}
                                      fontSize={19}>
                                    Grade <Text as={'span'} color={'#143688'}>Conquérant</Text>
                                </Text>
                                {conqueror_advantages.map((advantage) => {
                                    return (
                                        <Flex mb={4} ml={7} pr={9} key={advantage}>
                                            <Box w={21} h={21} bg={'#143688'} mr={2} borderRadius={4}>
                                                <Image mt={'6px'} ml={'5px'} src={'https://cdn.saofrance.net/images/components/white_check.png'} alt={'White check'}/>
                                            </Box>
                                            <Text mt={-1} fontSize={16}>{advantage}</Text>
                                        </Flex>
                                    )
                                })}
                                <Text fontSize={20} mt={36.1} color={'rgb(255,255,255,1)'} textAlign={'center'}>{conqueror_price}</Text>
                                <Box h={'1px'} bg={'white'} mt={5}/>
                                <Box>
                                    <Text textAlign={'center'}
                                          fontSize={20}
                                          _hover={{bgColor:'rgb(255,255,255,.1)'}}
                                          h={73}
                                          pt={4}
                                          borderBottomRadius={13}
                                          transition={'ease-in-out .05s'}
                                          cursor={'pointer'}
                                          onClick={() => router.push('/shop/product/' + conqueror_product_id)}
                                          mt={0}>Voir le produit</Text>
                                </Box>
                            </GridItem>
                            </motion.div>

                            {displayAllRanks && (
                                <>
                                    { /* GRADE LÉGENDE */ }
                                    <motion.div initial="hidden" animate="visible" variants={{
                                        hidden: {
                                            translateY: 50,
                                            opacity: 0
                                        },
                                        visible: {
                                            translateY: 0,
                                            opacity: 1,
                                            transition: {
                                                delay: .2,
                                                duration: 1
                                            }
                                        }
                                    }}>
                                        <GridItem w='100%' mt={0} h={647} bg={'linear-gradient(#ffffff, #136F81 90%)'} border={'2px solid rgb(255,255,255,.1)'}  borderRadius={13}>
                                            <Image src={"https://cdn.saofrance.net/images/Market/VIP_Diamante.png"} w={131} mt={5} mx={'auto'} alt={'Product image'}/>
                                            <Text w={'100%'}
                                                  textAlign={'center'}
                                                  textTransform={'uppercase'}
                                                  fontWeight={'bold'}
                                                  mt={3}
                                                  letterSpacing={1}
                                                  mb={5}
                                                  fontSize={19}>
                                                Grade <Text as={'span'} color={'#136F81'}>LÉGENDE</Text>
                                            </Text>
                                            {legende_advantages.map((advantage) => {
                                                return (
                                                    <Flex mb={4} ml={7} pr={9} key={advantage}>
                                                        <Box w={21} h={21} bg={'#136F81'} mr={2} borderRadius={4}>
                                                            <Image mt={'6px'} ml={'5px'} src={'https://cdn.saofrance.net/images/components/white_check.png'} alt={'White check'}/>
                                                        </Box>
                                                        <Text mt={-1} fontSize={16}>{advantage}</Text>
                                                    </Flex>
                                                )
                                            })}
                                            <Text mt={-1} fontSize={16} color={'rgb(255,255,255,.3)'} textAlign={'center'}>Et d&apos;autres...</Text>
                                            <Text fontSize={20} mt={3} color={'rgb(255,255,255,1)'} textAlign={'center'}>{legende_price}</Text>
                                            <Box h={'1px'} bg={'white'} mt={5}/>
                                            <Box>
                                                <Text textAlign={'center'}
                                                      fontSize={20}
                                                      _hover={{bgColor:'rgb(255,255,255,.1)'}}
                                                      h={73}
                                                      pt={4}
                                                      borderBottomRadius={13}
                                                      transition={'ease-in-out .05s'}
                                                      cursor={'pointer'}
                                                      onClick={() => router.push('/shop/product/' + legende_product_id)}
                                                      mt={0}>Voir le produit</Text>
                                            </Box>
                                        </GridItem>
                                    </motion.div>
                                </>
                            )}
                        </Grid>
                        <Text textAlign={'center'}
                              mt={8}
                              textDecoration={'underline'}
                              cursor={'pointer'}
                              _hover={{color:'rgb(255,255,255,.6)'}}
                              onClick={() => setDisplayAllRanks(!displayAllRanks)}
                              color={'rgb(255,255,255,.3)'}>{displayAllRanks ? 'Voir moins' : 'Voir nos autres grades'}</Text>
                    </section>
                    <section id={'cosmetiques'}>
                        <Box w={'full'} mt={10} bgColor={'white'}>
                            <motion.div initial="hidden" animate="visible" variants={{
                                hidden: {
                                    opacity: 0
                                },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        duration: 1
                                    }
                                },}}>
                                <Center >
                                    <Text textTransform={"uppercase"}
                                          fontSize={25}
                                          mt={5}
                                          color={'black'}
                                          textAlign={'center'}
                                          letterSpacing={2}
                                          fontWeight={'bold'}
                                          borderLeft={'1px solid rgb(0,0,0,.7)'}
                                          borderRight={'1px solid rgb(0,0,0,.7)'}
                                          w={900}>
                                        Nos cosmétiques <Text as={'u'}>tendance</Text>
                                    </Text>
                                </Center>
                            </motion.div>
                            <Wrap justify={'center'} spacing={70} mt={35} gap={70} mx={'auto'} maxW={1200}>
                                { cosmeticsProducts?.map((product) => {
                                    return (
                                        <WrapItem key={product._id}>
                                            <CosmeticShopProductCard product={product}/>
                                        </WrapItem>
                                    );
                                })}
                            </Wrap>
                        </Box>
                    </section>
                    <section id={'shop-points'}>
                        <Center mt={21}>
                            <Text textTransform={"uppercase"}
                                  fontSize={25}
                                  textAlign={'center'}
                                  letterSpacing={2}
                                  borderLeft={'1px solid rgb(255,255,255,.3)'}
                                  borderRight={'1px solid rgb(255,255,255,.3)'}
                                  w={900}>
                                Les incontournables
                            </Text>
                        </Center>
                        <Wrap justify={'center'} spacing={50} mt={35} gap={50} mx={'auto'} maxW={1200}>
                            { pointsProducts?.map((product) => {
                                return (
                                    <WrapItem key={product._id}>
                                        <PointsShopProductCard product={product}/>
                                    </WrapItem>
                                );
                            })}
                        </Wrap>
                    </section>
                    <section id={'upgrades'}>
                        <Box w={'full'} mt={10} bgColor={'white'}>
                            <motion.div initial="hidden" animate="visible" variants={{
                                hidden: {
                                    opacity: 0
                                },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        duration: 1
                                    }
                                },}}>
                                <Center >
                                    <Text textTransform={"uppercase"}
                                          fontSize={25}
                                          mt={5}
                                          color={'black'}
                                          textAlign={'center'}
                                          letterSpacing={2}
                                          fontWeight={'bold'}
                                          borderLeft={'1px solid rgb(0,0,0,.7)'}
                                          borderRight={'1px solid rgb(0,0,0,.7)'}
                                          w={900}>
                                        Passer à la vitesse <Text as={'u'}>supérieure</Text>
                                    </Text>
                                </Center>
                            </motion.div>
                            <Flex justify={'center'} flexDirection={'column'} pb={10} mt={35} gap={5} mx={'auto'} maxW={1200}>
                                <Text textAlign={'center'} color={'#BB7927'} fontWeight={'bold'} fontSize={'23'} textDecoration={'underline'}>Paladin</Text>
                                { upgradesProducts?.filter((product) => product.roleInitial === 'paladin').map((product) =>{
                                    return (
                                        <Box key={product._id}>
                                            <UpgradesShopProductCard product={product}/>
                                        </Box>
                                    );
                                })}
                                <Text textAlign={'center'} color={'#143688'} fontWeight={'bold'} fontSize={'23'} textDecoration={'underline'}>Conquérant</Text>
                                { upgradesProducts?.filter((product) => product.roleInitial === 'conqueror').map((product) =>{
                                    return (
                                        <Box key={product._id}>
                                            <UpgradesShopProductCard product={product}/>
                                        </Box>
                                    );
                                })}
                                <Text textAlign={'center'} color={'#136F81'} fontWeight={'bold'} fontSize={'23'} textDecoration={'underline'}>Légende</Text>
                                { upgradesProducts?.filter((product) => product.roleInitial === 'legend').map((product) =>{
                                    return (
                                        <Box key={product._id}>
                                            <UpgradesShopProductCard product={product}/>
                                        </Box>
                                    );
                                })}
                            </Flex>
                        </Box>
                    </section>
                </Flex>

            </Container>
        </Container>
    );
}

export async function getServerSideProps({locale}: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], null, ['fr-FR', 'en-US'])),
        },
    };
}

export default ShopPage;