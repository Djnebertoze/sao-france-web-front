import {
    Avatar,
    Badge, Box,
    Button,
    Collapse, Container,
    Divider,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Skeleton, Spacer,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {NavItem} from "./types";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import {Simulate} from "react-dom/test-utils";
import {getUserState} from "../../../store/user/userSlice";
import { useDispatch, useSelector } from "../../../store/store";
import { checkLogin } from "../../../store/user/userActions";
import {NextRouter, useRouter} from "next/router";
import NextTopLoader from "nextjs-toploader";




const Navbar: FC = () => {
    const { isOpen, onToggle } = useDisclosure();


    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const [scrollY, setScrollY] = useState(0)

    const { auth} = useSelector(getUserState)

    const router: NextRouter = useRouter();

    const NAV_ITEMS: Array<NavItem> = [
        {
            label: t('navbar.NAVBAR_HOME_LABEL'),
            href: '/',
            numberKey:'1'
        },
        {
            label: t('navbar.NAVBAR_FORUM_LABEL'),
            href: '/forum',
            numberKey:'2'
        },
        {
            label: t('navbar.NAVBAR_VOTES_LABEL'),
            href: '/votes',
            numberKey:'3'
        },
        {
            label: "LOGO",
            href: '/',
            numberKey:'4'
        },
        {
            label: t('navbar.NAVBAR_WIKI_LABEL'),
            href: '/wiki',
            numberKey:'5'
        },
        {
            label: t('navbar.NAVBAR_JOIN_US_LABEL'),
            href: '/join-us',
            numberKey:'6'
        },
        {
            label: t('navbar.NAVBAR_SHOP_LABEL'),
            href: '/shop',
            numberKey:'8'
        }
    ];

    useEffect(() => {
        if (!auth?.accessToken) {
            dispatch(checkLogin());
        }


        if(document.URL.includes('admin')){
            // @ts-ignore
            document.getElementById('navbar').style.display = 'none'
        } else {
            // @ts-ignore
            document.getElementById('navbar').style.display = 'block'
        }

        /*const handleScroll = () => {
            setScrollY(window.scrollY);

            // @ts-ignore
            if(document.getElementById("collapse").style.display === "block"){
                onToggle();
            }
        }
        handleScroll();*/

        /*window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };*/


    }, [router, auth?.accessToken, dispatch, onToggle]);

    return(
        <>
            <Flex
                bg={/*useColorModeValue('white', 'gray.800')*/'rgb(255,255,255,1)'}
                boxShadow={'0 0px 50px rgb(255,255,255,.3)'}
                color={useColorModeValue('gray.600', 'white')}
                minH={{lg:'80px',base: '45px'}}
                py={{ base: 2 }}
                px={{ base: 4 }}
                w={'full'}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                position={'fixed'}
                justify={'space-between'}
                zIndex={7}
                id={'navbar'}
            >

                <Flex direction={'column'} w={'full'}>
                    <>
                        <Flex display={{ base: 'flex', lg: 'none' }} w={'full'} mt={isOpen ? 3 : 0}>
                            <Box>

                            </Box>
                            <Spacer/>
                            <Box/>
                            <Spacer/>
                            <Box>
                                <IconButton
                                    onClick={onToggle}
                                    icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                                    variant={'ghost'}
                                    aria-label={'Toggle Navigation'}
                                />
                            </Box>

                        </Flex>
                        <Flex flex={{ base: 1 }} justify={{ base: 'center', lg: 'flex-start' }} w={'full'} align={'center'}>
                            <Flex display={{ base: 'none', lg: 'flex' }} align={'center'} justify={'center'} ml={4} w={'full'}>
                                <DesktopNavbar navItems={NAV_ITEMS}/>
                            </Flex>
                        </Flex>
                    </>
                    <Collapse in={isOpen} animateOpacity id={"collapse"}>
                        <MobileNavbar navItems={NAV_ITEMS} />
                    </Collapse>
                </Flex>
            </Flex>


        </>
    );
}


export default Navbar;
