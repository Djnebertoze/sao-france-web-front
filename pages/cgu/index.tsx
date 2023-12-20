import {Box, Button, Container, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import { NextPage } from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {MainButton} from "../../components/atoms/Buttons/Buttons";

import perso1 from '../public/images/home/perso1.png';

import { useTranslation } from "next-i18next";
import {NextRouter, useRouter} from "next/router";


const CGUPage: NextPage = () => {

    const router: NextRouter = useRouter();

    const { t } = useTranslation();

    const boxMarginBottom = 30;
    const boxPaddingBottom = 10;

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} minH={800} mx={0} className={'main-background'} px={200}>
                <Flex  w={'full'}>
                    <Spacer />
                    <Box>
                        <Text maxW={1000}
                              textAlign={"center"}
                              fontSize={{sm:35, base: 20}}
                              fontFamily={'Bebas Neue'}
                              letterSpacing={8}
                              color={"rgb(255,255,255)"}
                              mt={100}
                              mx={10}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Conditions Générales d'Utilisation
                        </Text>
                    </Box>
                    <Spacer />
                </Flex>
                <Box backgroundColor={'rgb(255,255,255,.4)'} w={'full'} h={'1px'} mt={5} mb={30}/>
                <Flex flexDirection={'column'} color={'white'}>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 1 : Conditions Générales d’Utilisation du Site et des autres services proposés par SAOFrance
                        </Text>
                        <Text>
                            En accédant et en utilisant le site, serveur et discord SAOFrance,
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            vous acceptez de respecter l'ensemble des conditions
                            énoncées dans les présentes CGU. Nous nous réservons le droit de
                            modifier ces CGU à tout moment. Les modifications entreront en vigueur dès
                            leur publication sur le serveur. Il est de votre responsabilité de vérifier
                            régulièrement les CGU pour vous tenir informé des éventuelles mises à jour.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 2 : Propriété intellectuelle et contrefaçon
                        </Text>
                        <Text>
                            SAOFrance détient les droits de propriété et d’usage de
                            l’ensemble des éléments présents et accessible sur le site
                            tel que les textes, images, logo, bannière. Toutes utilisation,
                            reproduction, quel que soit le moyen utilisé, est interdit.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 3 : Responsabilité
                        </Text>
                        <Text>
                            SAOFrance ne sera pas tenu pour responsable en cas de perte ou de
                            vols de données. SAOFrance se réserve le droit de suspendre
                            l’activité d’un de ses services dû à un problème technique
                            provenant de nos prestataires.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 4 : Données personnelles
                        </Text>
                        <Text>
                            SAOFrance s’engage à ne collecter aucunes informations personne
                            à l’aide des différents services qui sont mis à disposition
                            des utilisateurs. Les informations demandées lors de l’inscriptions
                            ou des payements ne sera aucunement publié à l’insu de
                            l’utilisateurs, échangées, transférées, cédées ou vendues à des tiers
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 5 : liens hypertextes
                        </Text>
                        <Text>
                            Les différents services proposés par SAOFrance contiennent des liens
                            hypertextes vers d’autres site. Ces derniers ont été mis en place
                            dans un but précis et validé par SAOFrance. Cependant, SAOFrance
                            n’a aucunement la possibilité de vérifier l’entièreté des contenus
                            des sites, SAOFrance n’assumera aucune responsabilité en cas d’un
                            problème quelconques.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 6 : Lexique
                        </Text>
                        <Text>
                            Utilisateur : internaute utilisant un des services proposés par SAOFrance. <br/>
                            SAOFrance : L’ensemble de l’équipe de bénévole qui compose le projet.
                        </Text>
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

export default CGUPage;