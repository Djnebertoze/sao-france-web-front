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


interface ShopProductCardProps{
    product: ShopProduct
}


const PointsShopProductCard: FC<ShopProductCardProps> = (props) => {
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

    return(
        <>
            <Box
                background={'linear-gradient(180deg, #ECBD39, #FFFFFF)'}
                marginBottom={10}
                marginRight={15}
                py={.5}
                px={.5}
                boxShadow={'1px 1px 20px rgb(0, 0, 0, .3)'}
                borderTopLeftRadius={0}>
                <Card direction={'column'} color={'white'} backgroundColor={'#282828'} variant={'outline'}  maxW={300} borderRadius={0} borderTopLeftRadius={0}>
                    <Text mt={5} mx={'auto'} fontWeight={'bold'} textTransform={'uppercase'} fontSize={'18px'}>{product.name.split('+')[0]}</Text>
                    <Text color={'rgb(255,255,255,.6)'} mx={'auto'} fontWeight={''} fontSize={'18px'}>{product.name.split('+')[1] ? '+' + product.name.split('+')[1] : ''}</Text>
                    <Image borderTopLeftRadius={0} maxW={160} mx={'auto'} mt={product.name.split('+')[1] ? 5 : 35}
                           src={product.imageUrl != "" ? product.imageUrl : MainLogo.src} alt={'Shop product image'}/>
                    <CardBody>
                        <Stack spacing={3} px={5} mt={product.name.split('+')[1] ? 0 : 6}>

                            <Text py={2} mt={-4} fontSize={'16px'} lineHeight={1.2}>
                                {transformDescription(product.description.replaceAll('\n', '\\n'))}
                            </Text>
                        </Stack>
                    </CardBody>
                    <CardFooter flexDirection={'column'} mt={-5}>
                        <Text mb={3}  fontWeight={'bold'} textAlign={'center'} px={6} mt={product.name.split('+')[1] ? 0 : 2}>
                            {product.isRealMoney ? product.price.toLocaleString(undefined) + " EUR" : product.price.toLocaleString(undefined) + " Points Boutiques"}
                        </Text>
                        <Box mx={5}
                             onClick={handleBuy}
                             color={'rgb(255, 255, 255, .5)'}
                             fontWeight={'bold'}
                             textAlign={'center'}
                             borderTop={'1px solid rgb(255,255,255,.3)'}
                             pt={2}
                             cursor={'pointer'}
                             transition={'.1s ease-out'}
                             _hover={{
                                 color: 'rgb(255, 255, 255, 1)',
                                 borderTop: '1px solid rgb(255,255,255,1)'
                             }}>
                            JE LE VEUX
                        </Box>

                    </CardFooter>
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


export default PointsShopProductCard;
