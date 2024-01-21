import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useDispatch} from "../../../../store/store";
import {useSelector} from "react-redux";
import {
    getUserState,
    removeRoleError,
    removeRoleSuccess,
    resetAddRole,
    resetRemoveRole
} from "../../../../store/user/userSlice";
import React, {FC, useEffect, useState} from "react";
import {
    Button,
    Flex, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select,
    Text, useDisclosure,
    useToast,
} from "@chakra-ui/react";
import AdminNavbar from "../../../../components/molecules/AdminNavbar/AdminNavbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {addRole, getUserPrivateProfile, removeRole, sendPasswordReset} from "../../../../store/user/userActions";
import {getRoleById, roles} from "../../../../common/roles/roles";
import {getMaxPowerFromUserRoles} from "../../../../store/helper";
import {Tags} from "../../../../components/atoms/Tags/Tags";
import {Role, ShopProduct} from "../../../../common/types/types";
import {getShopState} from "../../../../store/shop/shopSlice";
import {removeShopProduct} from "../../../../store/shop/shopActions";
import {FiTrash2} from "react-icons/fi";
import {MainButton} from "../../../../components/atoms/Buttons/Buttons";

const AdminUserManagerPage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();
    const [userPower, setUserPower] = useState<number>(1)
    const userId = router.query.id
    const [userPrivateRoles, setUserPrivateRoles] = useState<Role[]>()

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAddRole, setIsAddRole] = useState<boolean>(false)
    const [roleIdToChange, setRoleIdToChange] = useState<string>()

    const {
        auth,
        userInfos,
        userLoginError,
        getUserInfosError,
        getUserPrivateProfileLoading,
        getUserPrivateProfileSuccess,
        getUserPrivateProfileError,
        removeRoleLoading,
        removeRoleSuccess,
        removeRoleError,
        addRoleLoading,
        addRoleSuccess,
        addRoleError,
        sendPasswordResetLoading,
        sendPasswordResetError,
        sendPasswordResetSuccess
    } = useSelector(getUserState)

    const handleDelete = (roleId: string | undefined, email: string) => {
        dispatch(removeRole(auth?.accessToken, roleId, email))
    }

    const handleAdd = (roleId: string | undefined, email: string) => {
        dispatch(addRole(auth?.accessToken, roleId, email))
    }

    const handleResetPassword = () => {
        dispatch(sendPasswordReset(getUserPrivateProfileSuccess?.user?.email))
    }

    const toast = useToast();
    const toastDuration = 3000;

    useEffect(() => {
        if(auth?.accessToken && userInfos && getMaxPowerFromUserRoles(userInfos.roles) < 3){
            router.push('/').then(() => {});
        }

        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login').then(() => {});
        }

        if(auth?.accessToken && userInfos?.roles){
            setUserPower(getMaxPowerFromUserRoles(userInfos.roles))

            if((!getUserPrivateProfileSuccess && !getUserPrivateProfileLoading && !getUserPrivateProfileError)
                || (getUserPrivateProfileSuccess && getUserPrivateProfileSuccess.user._id != userId && !getUserPrivateProfileLoading)){

                dispatch(getUserPrivateProfile(auth.accessToken, userId))
            }

            if (getUserPrivateProfileError && !getUserPrivateProfileLoading){
                toast({
                    title: "Erreur",
                    description: getUserPrivateProfileError,
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                console.log(getUserPrivateProfileError)
            }

            if(getUserPrivateProfileSuccess){
                console.log('mmh')
                const roles_filtered: Role[] = [];
                getUserPrivateProfileSuccess.user.roles.map((role_id) => {
                    if (getRoleById(role_id)) {
                        roles_filtered.push(getRoleById(role_id) as Role)
                    }
                })
                setUserPrivateRoles(roles_filtered.sort((a, b) => a.power - b.power))
            }
        }
    }, [dispatch, toast, auth?.accessToken, userId, router, userInfos, userLoginError, getUserInfosError, getUserPrivateProfileSuccess, getUserPrivateProfileLoading, getUserPrivateProfileError ]);


    useEffect(() => {
        if(!sendPasswordResetLoading){
            if(sendPasswordResetSuccess){
                toast({
                    title: 'Email envoyée',
                    description: 'L\'email de réinitialisation a bien été envoyé',
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
            }
            if(sendPasswordResetError){
                toast({
                    title: 'Email non envoyée',
                    description: 'L\'email de réinitialisation n\' a pas été envoyé',
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
            }
        }
    }, [dispatch, sendPasswordResetLoading, sendPasswordResetError, sendPasswordResetSuccess, toast])

    useEffect(() => {
        if (!removeRoleLoading){
            if (removeRoleSuccess){
                toast({
                    title: 'Rôle retiré',
                    description: 'Le rôle a bien été retiré.',
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                dispatch(getUserPrivateProfile(auth?.accessToken, userId))
                dispatch(resetRemoveRole())
                onClose();
            }
            if (removeRoleError){
                toast({
                    title: 'Rôle non retiré',
                    description: removeRoleError,
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                dispatch(resetRemoveRole())
            }
        }
    }, [dispatch, toast, removeRoleLoading, removeRoleSuccess, removeRoleError, auth?.accessToken, onClose, userId])

    useEffect(() => {
        if (!addRoleLoading){
            if (addRoleSuccess){
                toast({
                    title: 'Rôle ajouté',
                    description: 'Le rôle a bien été ajouté.',
                    status: 'success',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                dispatch(getUserPrivateProfile(auth?.accessToken, userId))
                dispatch(resetAddRole())
                onClose();
            }
            if (addRoleError){
                toast({
                    title: 'Rôle non ajouté',
                    description: addRoleError,
                    status: 'error',
                    duration: toastDuration,
                    isClosable: true,
                    position: 'bottom-right',
                });
                dispatch(resetAddRole())
            }
        }
    }, [dispatch, toast, addRoleLoading, addRoleSuccess, addRoleError, auth?.accessToken, onClose, userId])

    return (
        <AdminNavbar selected={'/users'}>
            {
                getUserPrivateProfileSuccess && (
                    <Flex>
                        <Flex flexDirection={'column'} pr={8} h={'full'}>
                            {
                                getUserPrivateProfileSuccess.mcProfile ? (
                                    <>
                                        <Image src={"https://skins.danielraybone.com/v1/head/"+getUserPrivateProfileSuccess?.mcProfile?.name+"?overlay=true"} borderRadius={'50%'} maxW={200} maxH={200}
                                               mx={1} mb={5} border={'5px solid white'} boxShadow={'0px 0px 20px 2px rgb(0,0,0,.15)'} alt={'User image profile'}/>
                                        <Image src={"https://skins.danielraybone.com/v1/render/body/"+getUserPrivateProfileSuccess?.mcProfile?.name+"?overlay=true"} maxW={200}
                                               mx={1} mb={5} alt={'User image profile'}/>
                                    </>
                                ) : (
                                    <Image src={getUserPrivateProfileSuccess.user.profilePicture} borderRadius={'50%'} maxW={200} maxH={200}
                                           mx={1} mb={5} border={'5px solid white'} boxShadow={'0px 0px 20px 2px rgb(0,0,0,.15)'} alt={'User image profile'}/>
                                )
                            }
                        </Flex>
                        <Flex flexDirection={'column'} w={'full'} pr={3} borderLeft={'1px solid rgb(255,255,255,.2)'} pl={8}>
                            <Text fontSize={20}>
                                <Text fontSize={26} mb={0} as={'a'} color={'rgb(255,255,255,1)'} >
                                    {getUserPrivateProfileSuccess.user.username}
                                </Text> ({getUserPrivateProfileSuccess.mcProfile ? getUserPrivateProfileSuccess.mcProfile.name : 'Pas de compte Minecraft'})
                            </Text>
                            <Flex borderBottom={'1px solid rgb(255,255,255,.2)'} pb={4} mb={3}>
                                {
                                    userPrivateRoles?.map((role) => {
                                            return <Tags key={role._id} mt={4} mr={2}
                                                         bgColor={role?.color}
                                                         textColor={role?.textColor}
                                                         adminMode={role._id != 'user'}
                                                         onClick={() => {
                                                             if (role._id != 'user') {
                                                                 setIsAddRole(false)
                                                                 setRoleIdToChange(role._id)
                                                                 onOpen();
                                                             }
                                                         }}
                                            >
                                                {role?.name}
                                            </Tags>
                                    })
                                }
                                <Tags mt={4} mr={2}
                                      bgColor={'white'}
                                      textColor={'black'}
                                      adminMode
                                      onClick={() => {
                                          setIsAddRole(true)
                                          setRoleIdToChange(undefined)
                                          onOpen();
                                      }}
                                >
                                    +
                                </Tags>
                            </Flex>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent bg={'white'}>
                                    <ModalHeader>Voulez-vous {isAddRole ? 'ajouter' : 'retirer'} ce rôle ?</ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody w={'full'}>
                                        <Text>Êtes-vous sûr de vouloir {isAddRole ? 'ajouter' : 'retirer'} ce rôle ?</Text>
                                        {
                                            isAddRole && (
                                                <Select placeholder='- Grade à ajouter -' cursor={'pointer'} bgColor={'rgb(255,255,255)'} value={roleIdToChange} onChange={(e) => setRoleIdToChange(e.target.value)}>
                                                    {
                                                        roles?.map((role) => {
                                                            return <option value={role._id} key={role._id}>{role.name}</option>
                                                        })
                                                    }
                                                </Select>
                                            )
                                        }
                                        <ModalFooter>
                                            <MainButton onClick={onClose} colorScheme={'gray'} mr={2}>
                                                Annuler
                                            </MainButton>
                                            {
                                                isAddRole ? (
                                                    <MainButton onClick={() => handleAdd(roleIdToChange, getUserPrivateProfileSuccess?.user.email)} isLoading={addRoleLoading} colorScheme={'green'} isDisabled={!roleIdToChange}>
                                                        Ajouter
                                                    </MainButton>
                                                    ) : (
                                                    <MainButton onClick={() => handleDelete(roleIdToChange, getUserPrivateProfileSuccess?.user.email)} isLoading={removeRoleLoading} colorScheme={'red'}>
                                                        Retirer
                                                    </MainButton>
                                                )
                                            }

                                        </ModalFooter>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                            <Text fontSize={20} mb={0} lineHeight={10}>
                                Email: {getUserPrivateProfileSuccess.user.email}
                                {
                                    userPower >= 5 ? (
                                        <>
                                            <br/>
                                            Prénom: {getUserPrivateProfileSuccess.user.firstName ?? '/'}
                                            <br/>
                                            Nom: {getUserPrivateProfileSuccess.user.lastName ?? '/'}
                                            <br/>
                                            Numéro de téléphone: {getUserPrivateProfileSuccess.user.phoneNumber ?? '/'}
                                        </>
                                    ) : (
                                        <>
                                            <br/>
                                            Prénom: <Text as={'i'} fontSize={15}>#############</Text>
                                            <br/>
                                            Nom: <Text as={'i'} fontSize={15}>#############</Text>
                                            <br/>
                                            Numéro de téléphone: <Text as={'i'} fontSize={15}>#############</Text>
                                        </>
                                    )
                                }
                                <br/>
                                Date de naissance: {getUserPrivateProfileSuccess.user.birthday ?? '/'}
                                <br/>
                                Emails commerciaux: {getUserPrivateProfileSuccess.user.acceptEmails ? <Text color={'green.300'} as={'span'}>Oui</Text> : <Text color={'red.300'} as={'span'}>Non</Text>}
                                <br/>
                                Date de création: {new Date(getUserPrivateProfileSuccess.user.createdAt).toLocaleString()} (
                                {((new Date().setHours(0,0,0,0) - new Date(getUserPrivateProfileSuccess.user.createdAt).setHours(0,0,0,0)) / (24*60*60*1000)).toString().split('.')[0]
                                    + ' jours' })
                                <br/>
                                Points boutique: {getUserPrivateProfileSuccess.user.shopPoints}
                            </Text>
                            <Button colorScheme={'blue'} maxW={500} isLoading={sendPasswordResetLoading} onClick={handleResetPassword}>
                                Envoyer le mail de réinitialisation du mot de passe
                            </Button>
                        </Flex>
                    </Flex>
                )
            }

        </AdminNavbar>
    );
}


interface RemoveRoleProps{
    accessToken: string;
    email: string;
    roleId: string;
}


export async function getServerSideProps({locale}: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], null, ['fr-FR', 'en-US'])),
        },
    };
}

export default AdminUserManagerPage;