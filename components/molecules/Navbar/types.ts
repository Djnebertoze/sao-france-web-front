export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href: string;
    numberKey: string;
}

export interface GenericNavbarProps {
    navItems: Array<NavItem>;
}