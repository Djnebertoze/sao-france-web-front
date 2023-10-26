import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useDisclosure
} from "@chakra-ui/react";
import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {LinkItemProps} from "./types";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;
import {getUserState} from "../../../store/user/userSlice";
import { useDispatch, useSelector } from "../../../store/store";
import {checkLogin, getUserProfile} from "../../../store/user/userActions";
import {NextRouter, useRouter} from "next/router";

import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import SidebarWithHeader from "./SideNavbar";
import {use} from "i18next";
import {getRoleById} from "../../../common/roles/roles";

interface SidebarWithHeaderProps extends FlexProps{
    children: React.ReactNode
    selected: string
}

function abbreviateRoles(roles: string[]) {
    const abbreviationMap = {
        developer: "Dev",
        moderator: "Mod",
        responsable: "Resp",
        admin: "Admin"
    };

    const filteredRoles = roles.filter(role => !["user", "staff"].includes(role));


    // @ts-ignore
    return filteredRoles.map(role =>  abbreviationMap[role]).join(" / ").toString();
}

function getMaxPowerFromUserRoles(userRoles: string[]): number {
    let maxPower = 0;

    userRoles.forEach(roleId => {
        const role = getRoleById(roleId);
        if (role && role.power > maxPower) {
            maxPower = role.power;
        }
    });

    return maxPower;
}

const AdminNavbar: FC<SidebarWithHeaderProps> = (props) => {



    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const {
        auth,
        userInfos,
    } = useSelector(getUserState)

    const [userRolesStr, setUserRolesStr] = useState<string>('Loading')
    const [userPower, setUserPower] = useState<number>(1)

    const router: NextRouter = useRouter();

    useEffect(() => {
        if (!auth?.accessToken) {
            dispatch(checkLogin());

        }

        if(auth?.accessToken && userInfos && !(userInfos?.roles?.includes('admin') || userInfos?.roles?.includes('moderator') || userInfos?.roles?.includes('responsable') || userInfos?.roles?.includes('developer'))){
            router.push('/')
        }

        if(auth?.accessToken){
            dispatch(getUserProfile(auth?.accessToken))
        }

        if(auth?.accessToken && userInfos?.roles){

            // @ts-ignore # Ça fonctionne car c'est bien un string[] !!
            setUserRolesStr(abbreviateRoles(userInfos.roles))

            // @ts-ignore # Ça fonctionne car c'est bien un string[] !!
            setUserPower(getMaxPowerFromUserRoles(userInfos.roles))

        }
    }, [router, auth, userInfos]);

    return(
        // eslint-disable-next-line react/no-children-prop
        <SidebarWithHeader children={props.children}
                           role={userRolesStr}
                           name={userInfos?.username && userInfos?.firstName ? userInfos.firstName + ' ('+userInfos.username+')' : 'Loading...'}
                           imageUrl={userInfos?.mcProfile ? 'https://skins.danielraybone.com/v1/head/' + userInfos.mcProfile.name : userInfos?.profilePicture ? userInfos.profilePicture : ''}
                           power={userPower}
                           selected={props.selected}/>
    );
}


export default AdminNavbar;