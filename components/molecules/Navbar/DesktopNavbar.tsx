import {
    Box,
    Button,
    Flex, Image, Link,
    Link as ChakraLink,
} from "@chakra-ui/react";
import {FC, useEffect} from "react";
import { GenericNavbarProps } from "./types";
import { NextRouter, useRouter } from "next/router";
import MainLogo from '../../../public/images/MainLogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "../../../store/store";
import {getUserState} from "../../../store/user/userSlice";
import {emptyAct, getUserProfile} from "../../../store/user/userActions";

const DesktopNavbar: FC<GenericNavbarProps> = (props) => {
    const router: NextRouter = useRouter();

    const dispatch = useDispatch();

    const { auth ,
        userInfos,
        getUserInfosLoading,
        getUserInfosError} = useSelector(getUserState);

    useEffect(() => {
        if(auth?.accessToken && !userInfos && !getUserInfosLoading){
            dispatch(getUserProfile(auth.accessToken));
        }
        if((!getUserInfosLoading && getUserInfosError) || localStorage.getItem('act') == undefined){
            dispatch(emptyAct())
        }
    }, [auth?.accessToken, dispatch, userInfos, getUserInfosError, getUserInfosLoading])

    return (
        <>
            <Flex direction={'row'} align={'center'} justify={'center'} flex={1} w={'full'} className={'flex'}>
                {props.navItems.map((navItem) => {
                    return (
                            <Box key={navItem.numberKey} mx={{xl:41, lg:21}}>
                                {navItem.label !== "LOGO" ? (
                                    <Link onClick={navItem.href === "/shop" ? () => router.push(navItem.href).then(() => router.reload()) : () => router.push(navItem.href)} className={navItem.href === "/shop" ? "navItem shop-label" : "navItem"} fontSize={20} id={'navItem'}>
                                        {navItem.label}
                                    </Link>
                                ) : (
                                    <ChakraLink onClick={() => router.push(navItem.href)} className={"navItem"}>
                                        <Image src={MainLogo.src} maxW={90} alt={'Logo image'}/>
                                    </ChakraLink>
                                )}
                            </Box>
                    );

                })}
            </Flex>
            <Button maxW={{'2xl':50}} ml={{'2xl':-140, base: -109}} mr={{'2xl':50, base: 19}} onClick={() => auth?.accessToken ? router.push('/profile') : router.push('/login')}>
                {auth?.accessToken ? (
                    <Image src={"https://skins.danielraybone.com/v1/head/"+userInfos?.mcProfile?.name+"?overlay=true"} borderRadius={'50%'} maxW={30} maxH={30}
                           border={'2px solid white'} alt={'User image profile'}/>
                ) : (
                    <FontAwesomeIcon icon={faUser}/>)
                }
            </Button>
        </>
    );
};

export default DesktopNavbar;
