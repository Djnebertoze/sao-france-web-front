import React, {FC, useEffect} from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {ShopProduct} from "../../../common/types/types";
import {FiArrowLeft, FiArrowRight, FiTrash2} from "react-icons/fi";
import MainLogo from "../../../public/images/MainLogo.png"
import {NextRouter, useRouter} from "next/router";
import {useDispatch, useSelector} from "../../../store/store";
import {getUserState} from "../../../store/user/userSlice";
import {MainButton} from "../../atoms/Buttons/Buttons";
import {getShopState} from "../../../store/shop/shopSlice";
import {removeShopProduct} from "../../../store/shop/shopActions";
import {transformDescription} from "../../../store/helper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

import {paladin_color, conqueror_color, legend_color, beater_color} from "../../../common/shop/ranksAdvantages";


interface ShopProductCardProps{
    product: ShopProduct
}


const UpgradesShopProductCard: FC<ShopProductCardProps> = (props) => {
    const product = props.product;
    const router: NextRouter = useRouter();


    const toast = useToast();
    const toastDuration = 10000;

    const handleBuy = () => {
        router.push('/shop/product/'+product._id).then(() => {});
    }

    const handleModify = () => {
        router.push('/admin/shop-manager/edit/'+product._id).then(() => {});
    }

    const initialColor = product.roleInitial === 'paladin' ? paladin_color :
            product.roleInitial === 'conqueror' ? conqueror_color :
            product.roleInitial === 'legend' ? legend_color : beater_color

    const finalColor = product.roleFinal === 'paladin' ? paladin_color :
        product.roleFinal === 'conqueror' ? conqueror_color :
            product.roleFinal === 'legend' ? legend_color : beater_color

    return (
        <>
            <Box
                background={'linear-gradient(90deg, '+initialColor+', '+finalColor+')'}
                marginBottom={1}
                marginRight={15}
                py={1}
                px={1}
                mx={5}
                borderRadius={10}
                boxShadow={'1px 1px 20px rgb(0, 0, 0, .3)'}>
                <Card direction={'row'} color={'white'} background={'rgb(255,255,255,.3)'} borderRadius={10}>
                    <Image borderTopLeftRadius={0} maxH={41} mx={'auto'} my={2} ml={15}
                           src={product.imageUrl != "" ? product.imageUrl : MainLogo.src} alt={'Shop product image'}/>

                    <CardBody py={0} my={3} ml={125}>
                        <Text mx={'auto'} textAlign={'center'} fontWeight={'bold'} textTransform={'uppercase'} fontSize={'18px'}>{product.name}</Text>
                    </CardBody>
                    <CardFooter flexDirection={'column'} p={0} my={3}>
                        <Text mb={0}  fontWeight={'bold'} textAlign={'center'} px={6} >
                            {product.isRealMoney ? product.price.toLocaleString(undefined) + " EUR" : product.price.toLocaleString(undefined) + " PB"}
                        </Text>
                    </CardFooter>
                    <Button onClick={handleBuy} mt={2} mr={4} background={'transparent'} color={'white'} _hover={{background: 'rgb(255,255, 255,.2)'}}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </Button>
                </Card>
            </Box>
        </>
    );
}

interface RemoveProductModalProps{
    product: ShopProduct
}

const RemoveProductModal: FC<RemoveProductModalProps> = (props) => {

    const dispatch = useDispatch();
    const {
        removeShopProductLoading
    } = useSelector(getShopState);
    const {
        auth
    } = useSelector(getUserState);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = () => {
        dispatch(removeShopProduct(auth?.accessToken, props.product._id))
    }

    useEffect(() => {
        if (auth?.accessToken && !removeShopProductLoading){
            onClose();
        }
    }, [removeShopProductLoading, auth?.accessToken, onClose])


    return (
        <>
            <Icon as={FiTrash2} color={'red'} _hover={{bgColor: 'rgb(255,0,0,.2)'}} padding={'5px'} w={100} fontSize={25} borderRadius={5} cursor={'pointer'} onClick={onOpen}/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'}>
                    <ModalHeader>Voulez-vous supprimer cette offre ?</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody w={'full'}>
                        <Text>Êtes-vous sûr de vouloir supprimer cette offre ?</Text>
                        <ModalFooter>
                            <MainButton onClick={onClose} colorScheme={'gray'} mr={2}>
                                Annuler
                            </MainButton>
                            <MainButton onClick={handleDelete} isLoading={removeShopProductLoading} colorScheme={'red'}>
                                Supprimer
                            </MainButton>
                        </ModalFooter>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


export default UpgradesShopProductCard;
