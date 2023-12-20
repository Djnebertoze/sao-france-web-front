import {Box, Button, Container, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import { NextPage } from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {MainButton} from "../../components/atoms/Buttons/Buttons";

import perso1 from '../public/images/home/perso1.png';

import { useTranslation } from "next-i18next";
import {NextRouter, useRouter} from "next/router";


const CGVPage: NextPage = () => {

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
                            Conditions Générales de Vente
                        </Text>
                    </Box>
                    <Spacer />
                </Flex>
                <Box backgroundColor={'rgb(255,255,255,.4)'} w={'full'} h={'1px'} mt={5} mb={30}/>
                <Flex flexDirection={'column'} color={'white'}>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 1 : Objet du contrat
                        </Text>
                        <Text>
                            Les présentes Conditions Générales de Vente ont pour but de
                            fixer les dispositions contractuelles entre https://saofrance-mc.net et le Joueur,
                            et les conditions applicables à tout achat effectué sur le site.
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            L’acquisition d'un bien ou d'un service à travers le présent site
                            implique une acceptation sans réserve par le Joueur des présentes
                            conditions de vente.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 2 : Caractéristiques des produits, biens et services proposés
                        </Text>
                        <Text>
                            Toutes les caractéristiques des produits et services proposés par https://saofrance-mc.net
                            sont présentés sur notre boutique virtuelle sur le site https://saofrance-mc.net.<br/>
                            En échange, de chaque paiement effectué sur le site https://saofrance-mc.net, le
                            Joueur recevra des points virtuels sur le compte du joueur concerné. Les Joueurs
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            peuvent ensuite utiliser leur droit de rétractation à partir du moment où ils n'utilisent
                            pas ces points. De plus, ces points peuvent être échangés entre chaque joueur.<br/>
                            Chaque produit est accompagné d’un descriptif, ainsi que de son prix.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 3 : Tarifs
                        </Text>
                        <Text>
                            SaoFrance se réserve le droit de modifier ses prix à tout moment, étant toutefois
                            entendu que le prix figurant au catalogue le jour de la commande sera le seul
                            applicable à l’acheteur. Les services proposés par SaoFrance ne sont, en aucun cas,
                            affiliés avec Mojang.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 4 : Commande
                        </Text>
                        <Text>
                            Le Joueur passe commande sur le site Internet de SaoFrance. Pour acheter un
                            ou plusieurs articles, il doit obligatoirement suivre le processus de commande suivant : <br/><br/>

                            Inscription sur le site<br/><br/>

                            Créditer son compte avec des points<br/><br/>

                            Choisir le(s) article(s)<br/><br/>

                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Valider l'achat, et recevoir l’achat<br/><br/>

                            SaoFrance se réserve le droit d’annuler ou de refuser toute commande qui
                            émanerait d’un Joueur avec lequel il existerait un litige relatif au paiement
                            d’une commande précédente. Toute commande vaut acceptation des prix et descriptions des articles disponibles à la vente.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 5 : Modalités de paiement
                        </Text>
                        <Text>
                            Le prix est exigible à la commande.<br/>
                            Plusieurs modes de paiements sont possibles.<br/><br/>

                            SaoFrance n’est pas responsable dès lors que la non validation de la
                            commande résulte de cas de force majeur ou d’un problème chez les
                            prestataires.<br/>
                            La sécurité de la transaction financière est la responsabilité de notre
                            prestataires Paypal, Paysafecard<br/>
                            SaoFrance décline toute responsabilité en cas de dysfonctionnement entraînant
                            la non validation de la commande résultant de cas de force majeur
                            ou d’un problème chez les prestataires.<br/>
                            L’ensemble des données fournies et la confirmation
                            enregistrée vaudront preuve de la transaction.<br/>
                            La confirmation vaudra signature et acceptation des
                            opérations effectuées.<br/><br/>

                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Tout achat entraîne l'acceptation des conditions générales de vente de ces sociétés :<br/><br/>


                            Paypal<br/><br/>

                            PayPal (Europe) S.à r.l. & Cie, S.C.A. (« PayPal Europe »)<br/><br/>

                            5e étage<br/><br/>

                            22-24 Boulevard Royal<br/><br/>

                            L-2449, Luxembourg<br/><br/>

                            (+352) 27 302 143<br/><br/>

                            https://www.paypal.com<br/><br/>


                            PaysafeCard<br/><br/>

                            Paysafe Prepaid Services Limited<br/><br/>

                            Grand Canal House<br/><br/>

                            Grand Canal Street Upper<br/><br/>

                            Dublin 4, D04 Y7R5<br/><br/>

                            Irlande<br/><br/>

                            https://www.paysafecard.com<br/><br/>

                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 6 : Capacité juridique
                        </Text>
                        <Text>
                            Pour commander sur le site https://saofrance-mc.net, vous attestez de
                            manière ferme et sous votre propre et unique responsabilité que :<br/><br/>

                            Vous avez pleine capacité de jouissance et d’exercice pour contracter avec nous.<br/><br/>

                            Vous déclarez être âgé d’au moins 18 ans et avoir la capacité juridique de
                            conclure le présent contrat. Il ne peut pas nous être exigé de vérifier
                            l’âge des acheteurs du site.<br/><br/>

                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Si l’acheteur est une personne physique mineure, il se doit d'obtenir
                            le consentement de ses parents/tuteurs avant de passer commande.
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            L'autorité parentale reconnaît quant à elle avoir accepté les conditions
                            générales et se porte garant du Joueur mineur. Toute utilisation du site
                            https://saofrance-mc.net et de ses services par le Joueur mineur est réalisée
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            sous l'entière responsabilité des titulaires de l'autorité parentale.<br/>
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 7 : Expéditions et délais de livraison
                        </Text>
                        <Text>
                            Lorqu’une commande est validée (soit après son paiement effectif) SaoFrance
                            créditera sous un délai de 72 heures maximum en points, selon le
                            montant commandé, le compte du Joueur concerné.<br/><br/>

                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Les délais d'accréditation des points dépendent du service de paiement choisi.<br/><br/>

                            Toute commande passée sur le site https://saofrance-mc.net est livrée sous un
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            délai maximum d'1 heure à compter du moment où les points ont été débités
                            du compte du Joueur concerné.<br/><br/>

                            SaoFrance s’engage à livrer les commandes passées par le joueur
                            dans les délais prévus. Si les dits articles n’ont pas été livrés
                            dans un délai de sept (7) jours à compter de la date de livraison
                            prévue lors de la commande, et si ce dépassement n’est pas lié à
                            un cas de force majeure, le Joueur pourra procéder à la résolution
                            de la vente, en contactant SaoFrance. (Email: saofrancev2candid@gmail.com
                            ou via le serveur discord). <br/><br/>

                            Les sommes réglées par le Joueur lui seront alors intégralement
                            remboursées en points.<br/>
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 8 : Responsabilité
                        </Text>
                        <Text>
                            SaoFrance, dans le processus de vente en ligne,
                            n’est tenu que par une obligation de moyens ;
                            sa responsabilité ne pourra être engagée pour un dommage
                            résultant de perturbations du réseau Internet tel que perte de données,
                            intrusion, virus, rupture du service, autres problèmes involontaires
                            ou d’un problème chez les prestataires (voir 5). <br/>
                            SaoFrance se réserve le droit de fermer temporairement ses serveurs
                            pour les besoins éventuels de maintenance (les mises à jour).
                            Ces fermetures seront annoncées préalablement sur le Discord. <br/>
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 9 : Rétractation et remboursement
                        </Text>
                        <Text>
                            Par dérogation à l’article L. 121-20-2 du
                            Code français de la consommation et compte
                            tenu de la nature du service (service immatériel et livré
                            sans délai) le Joueur n’a plus droit de rétractation
                            à compter de la date et heure de fourniture du service (article). <br/>

                            Toutefois, le Joueur a un droit de rétractation de 14 jours si le
                            service commandé ne lui a pas encore été livré alors que son paiement
                            est effectif.<br/>

                            Dans ce cas, il contactera SaoFrance (email: saofrancev2candid@gmail.com)
                            en fournissant l’ensemble des indications nécessaires
                            (compte utilisateur, date et heure du paiement, etc.).
                            SaoFrance procédera au remboursement en point virtuel
                            dans un délai maximum de 30 jours. <br/>

                            Aucun remboursement ne sera effectué en
                            argent réel. (Euro, Dollar US, Dollar CA …) <br/>
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 10 : Données à caractère personnel
                        </Text>
                        <Text>
                            Conformément aux dispositions des articles 38 et
                            suivants de la loi 78-17 du 6 janvier 1978 relative à
                            l’informatique, aux fichiers et aux libertés, tout Joueur
                            dispose d’un droit d’accès, de rectification et d’opposition
                            aux données personnelles le concernant, en effectuant sa
                            demande écrite et signée, accompagnée d’une copie du titre
                            d’identité avec signature du titulaire de la pièce, en
                            précisant l’adresse à laquelle la réponse doit être envoyée.<br/>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Le site SaoFrance n'est pas enregistré à la CNIL.<br/>
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 11 : Droits
                        </Text>
                        <Text>
                            Le présent contrat est soumis aux lois françaises.
                        </Text>
                    </Box>
                    <Box mb={boxMarginBottom} borderBottom={'1px solid rgb(255,255,255,.1)'} pb={boxPaddingBottom}>
                        <Text fontSize={25} fontWeight={'bold'} mb={5}>
                            Article 12 : Lexique
                        </Text>
                        <Text>
                            Site : Le Site désigne le site Internet SaoFrance.<br/>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Joueur : Le joueur est toute personne physique ou morale qui utilise le Site ou l'un des services proposés par SaoFrance.
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

export default CGVPage;