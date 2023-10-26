import {IconType} from "react-icons";
import {BoxProps, FlexProps} from "@chakra-ui/react";

export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href: string;
}

export interface GenericNavbarProps {
    navItems: Array<NavItem>;
}

// Admin NavBar

export interface LinkItemProps {
    name: string
    icon: IconType
}

export interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}

export interface MobileProps extends FlexProps {
    onOpen: () => void
}

export interface SidebarProps extends BoxProps {
    onClose: () => void
}