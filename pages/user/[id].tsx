import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    Spacer,
    Text,useToast, Skeleton
} from "@chakra-ui/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import {
    getUserState,
} from "../../store/user/userSlice";
import {getUserProfile} from "../../store/user/userActions";
import {useDispatch, useSelector} from "../../store/store";
import {Tags} from "../../components/atoms/Tags/Tags";

import {getRoleById} from '../../common/roles/roles'
import {getOneMemberProfile} from "../../store/members/membersActions";
import {getMembersState} from "../../store/members/membersSlice";


const ProfilePage: NextPage = () => {

    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    const {
        auth,
        userInfos,
        userLoginLoading,
        userLoginError, updateUserProfileSuccess, updateUserProfileError,
        getUserInfosError
    } = useSelector(getUserState)

    const {
        getMemberProfileLoading,
        getMemberInfos,
    } = useSelector(getMembersState);

    const {t} = useTranslation();


    const toast = useToast();
    const toastDuration = 1000;


    useEffect(() => {
        if (!auth?.accessToken && userLoginError !== undefined) {
            console.log('userLoginError', userLoginError)
            router.push('/login');
        }

        if(auth?.accessToken && !getMemberInfos){
            dispatch(getOneMemberProfile(auth.accessToken, router.query.id));
        }

        if(getMemberInfos){
            console.log("members infos", getMemberInfos)
        }

    }, [dispatch, auth?.accessToken, router, userInfos?._id, userLoginError, getUserInfosError, getMemberInfos]);


    let tagsMargin = 4;

    return (
        <Container maxW={'full'} margin={0} padding={0}>
            <Container maxW={'full'} py={5} mx={0} className={'secondary-background'} minH={1000} w={'full'}>
                <Skeleton maxW={'full'} isLoaded={!getMemberProfileLoading}>
                    <Flex flex={1} justify={'center'} w={'full'} align={'center'}>
                        <Box w={'full'} h={1000} bgColor={'rgb(255,255,255,.5)'} my={150} mx={100}
                             borderTop={'white 3px solid'}>
                            <Flex w={'full'}>
                                <Box borderRight={'black 1px solid'} mt={50} pb={30}>
                                    <Image src={getMemberInfos?.mcProfile ? "https://skins.danielraybone.com/v1/head/"+getMemberInfos.mcProfile.name+"?overlay=true" : getMemberInfos?.profilePicture} borderRadius={'50%'} maxW={200} maxH={200}
                                           mx={50} mb={5} border={'5px solid white'} boxShadow={'0px 0px 20px 2px rgb(0,0,0,.15)'}/>
                                    <Text textAlign={'center'}>{t('profile.MEMBER_SINCE')} {
                                        // @ts-ignore
                                        new Date(getMemberInfos?.createdAt).toLocaleDateString()
                                    }</Text>
                                    {getMemberInfos?.mcProfile && (
                                        <>

                                            <Flex flex={1} justify={'center'} w={'full'} align={'center'} mt={2}>
                                                <Image width={150} src={"https://skins.danielraybone.com/v1/render/body/" + getMemberInfos.mcProfile.name}/>
                                            </Flex>
                                            <Text textAlign={'center'} mt={2} fontStyle={'italic'}>{getMemberInfos.mcProfile.name}</Text>
                                        </>
                                    )}

                                    {!getMemberInfos?.mcProfile && (
                                        <>
                                            <Text textAlign={'center'} mt={2}>Aucun compte Minecraft</Text>
                                        </>
                                    )}
                                </Box>
                                <Box w={'full'}>
                                    <Flex w={'full'}>
                                        <Box mt={50}>
                                            <Flex w={'full'}>
                                                <Text fontSize={35} ml={10}>{getMemberInfos?.username}</Text>
                                                {getMemberInfos?.roles?.includes('admin') ? (
                                                    <Tags mt={tagsMargin} ml={5}
                                                          bgColor={'red'}>{getRoleById('admin')?.name}</Tags>

                                                ) : getMemberInfos?.roles?.includes('responsable') ? (
                                                    <Tags mt={tagsMargin} ml={5}
                                                          bgColor={'blue'}>{getRoleById('responsable')?.name}</Tags>

                                                ) : getMemberInfos?.roles?.includes('moderator') ? (
                                                    <Tags mt={tagsMargin} ml={5} bgColor={'cyan.300'}
                                                          color={'black'}>{getRoleById('moderator')?.name}</Tags>

                                                ) : getMemberInfos?.roles?.includes('staff') ? (
                                                    <Tags mt={tagsMargin} ml={5} bgColor={'yellow.300'}
                                                          color={'black'}>{getRoleById('staff')?.name}</Tags>

                                                ) : (<Tags mt={tagsMargin} ml={5}
                                                           bgColor={'gray'}>{getRoleById('user')?.name}</Tags>
                                                )}
                                                {getMemberInfos?.roles?.includes('developer') && (
                                                    <Tags mt={tagsMargin} ml={5}
                                                          bgColor={'green'}>{getRoleById('developer')?.name}</Tags>
                                                )}


                                            </Flex>
                                            <Text w={'full'} fontWeight={''} fontSize={16} ml={10} mr={20} mt={2}
                                                  pb={5} borderBottom={'white 1px solid'}>- {getMemberInfos?.bio}</Text>
                                        </Box>
                                        <Spacer/>
                                        {/*(userInfos?.roles?.includes('admin') || userInfos?.roles?.includes('moderator') || userInfos?.roles?.includes('responsable')) && (
                                            <Box>
                                                <Button h={38} mt={57} colorScheme={'red'} mr={5}
                                                        onClick={() => router.push('/admin')}>
                                                    Accès Admin
                                                </Button>
                                            </Box>
                                        )*/}
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Skeleton>
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

export default ProfilePage;