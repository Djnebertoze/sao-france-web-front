import React, {FC, useEffect} from "react";
import {
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
    isEditing: boolean
    isPreview?: boolean
}


const AdminShopProductCard: FC<ShopProductCardProps> = (props) => {
    const product = props.product;
    const router: NextRouter = useRouter();


    const toast = useToast();
    const toastDuration = 10000;

    const handleUp = () => {
        toast({
            title: "En cours de dev",
            description: "Fonctionnalité en cours de développement. Contactez un développeur web.",
            status: 'info',
            duration: toastDuration,
            isClosable: true,
            position: 'bottom-right',
        });
    }

    const handleDown = () => {
        toast({
            title: "En cours de dev",
            description: "Fonctionnalité en cours de développement. Contactez un développeur web.",
            status: 'info',
            duration: toastDuration,
            isClosable: true,
            position: 'bottom-right',
        });
    }



    const handleBuy = () => {
        router.push('/shop/product/'+product._id).then(() => {});
    }

    const handleModify = () => {
        router.push('/admin/shop-manager/edit/'+product._id).then(() => {});
    }

    return(
        <>
            <Card direction={'column'} variant={'outline'} marginBottom={10} marginRight={15} maxW={300}>
                <Image objectFit={'cover'} minW={'280px'} maxH={180} src={product.imageUrl != "" ? product.imageUrl : MainLogo.src} alt={'Shop product image'}/>
                <CardBody>
                    <Stack mt={1} spacing={3}>
                        <Heading size={'md'}>{product.name}
                            {props.isEditing && !props.isPreview && (
                                <Text as={"span"}
                                      fontWeight={'normal'}
                                      fontSize={15}
                                      bg={product.active ? 'green' : 'red'}
                                      color={'white'}
                                      px={1}
                                      borderRadius={2}>
                                    {product.active ? 'Actif' : 'Non actif'}
                                </Text>
                            )}
                        </Heading>
                        <Text py={2} mt={-4}>
                            {transformDescription(product.description.replaceAll('\n', '\\n'))}

                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter flexDirection={'column'}>
                    <Text mb={3}  fontWeight={'bold'} textAlign={'center'} px={6}>{product.isRealMoney ? product.price.toLocaleString(undefined) + "€" : product.price.toLocaleString(undefined) + " PB"}</Text>
                    <Button variant={'solid'} colorScheme={'blue'} onClick={props.isEditing ? handleModify : handleBuy} isDisabled={props.isPreview}>
                        {props.isEditing ? 'Modifier' : 'Acheter'}
                    </Button>

                </CardFooter>
                {props.isEditing && (
                    <CardFooter flexDirection={'row'} flex={3} w={'full'}>
                        <Icon as={FiArrowLeft}  _hover={{bgColor: 'rgb(0,0,0,.1)'}} padding={'5px'} fontSize={25} borderRadius={5} cursor={'pointer'} onClick={handleUp}/>
                        <Spacer/>
                        <RemoveProductModal product={product}/>
                        <Spacer/>
                        <Icon as={FiArrowRight} _hover={{bgColor: 'rgb(0,0,0,.1)'}} padding={'5px'} fontSize={25} borderRadius={5} cursor={'pointer'} onClick={handleDown}/>
                    </CardFooter>
                )}

            </Card>
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


export default AdminShopProductCard;
