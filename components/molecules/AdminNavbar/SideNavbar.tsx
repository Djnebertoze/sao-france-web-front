// Template used: https://chakra-templates.dev/navigation/sidebar

'use client'

import {
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'
import {
    FiBell,
    FiBriefcase,
    FiChevronDown,
    FiHome,
    FiMenu,
    FiSettings,
    FiShoppingCart,
    FiTrendingUp,
    FiUsers,
} from 'react-icons/fi'
import {IconType} from 'react-icons'
import React from "react";
import {NextRouter, useRouter} from "next/router";

interface LinkItemProps {
    name: string
    icon: IconType
    href: string
    powerRequired: number
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}

interface MobileProps extends FlexProps {
    onOpen: () => void
    name: string
    role: string
    imageUrl: string
}

interface SidebarProps extends BoxProps {
    onClose: () => void
    userPower: number
    selected: string
}

interface SidebarWithHeaderProps extends FlexProps{
    children: React.ReactNode
    role: string
    name: string
    imageUrl: string,
    power: number
    selected: string
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Panel', icon: FiHome, href: '', powerRequired: 2 },
    { name: 'Statistiques', icon: FiTrendingUp, href: '/stats', powerRequired: 3 },
    { name: 'Utilisateurs', icon: FiUsers, href: '/users', powerRequired: 3},
    { name: 'Recrutements', icon: FiBriefcase, href: '/apply-manager', powerRequired: 5},
    { name: 'Boutique', icon: FiShoppingCart, href: '/shop-manager', powerRequired: 6},
    { name: 'Paramètres', icon: FiSettings, href: '/settings', powerRequired: 6},
]

const SidebarContent = ({ onClose, userPower, selected, ...rest }: SidebarProps) => {
    const router: NextRouter = useRouter();
    return (
        <Box
            transition="3s ease"
    bg={'rgb(38,39,41,1)'}
    borderRight="1px"
    borderRightColor={'whiteAlpha.300'}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}>
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        SaoFranceMc
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {


        LinkItems.map((link) => {
            if (userPower >= link.powerRequired) {
                return (
                    <NavItem key={link.name} icon={link.icon} onClick={() => router.push('/admin' + link.href)} bgColor={selected === link.href ? 'rgb(0,0,0,.3)' : ''}>
                        {selected === link.href ? '- ' : ''}{link.name}
                    </NavItem>
                );
            } else {
                return null;
            }
        })
    }
    </Box>
)
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Box
            as="a"
    style={{ textDecoration: 'none' }}
    _focus={{ boxShadow: 'none' }}>
    <Flex
        align="center"
    p="4"
    mx="4"
    borderRadius="lg"
    role="group"
    cursor="pointer"
    _hover={{
        bg: 'cyan.400',
            color: 'white',
    }}
    {...rest}>
    {icon && (
        <Icon
            mr="4"
        fontSize="16"
        _groupHover={{
        color: 'white',
    }}
        as={icon}
        />
    )}
    {children}
    </Flex>
    </Box>
)
}

const MobileNav = ({ onOpen, name, role,imageUrl, ...rest }: MobileProps) => {

    const router: NextRouter = useRouter();

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg={'rgb(38,39,41,1)'}
    borderBottomWidth="1px"
    borderBottomColor={'whiteAlpha.300'}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}>
    <IconButton
        display={{ base: 'flex', md: 'none' }}
    onClick={onOpen}
    variant="outline"
    aria-label="open menu"
    icon={<FiMenu />}
    />

    <Text
    display={{ base: 'flex', md: 'none' }}
    fontSize="2xl"
    fontFamily="monospace"
    fontWeight="bold">
        SaoFranceMc
        </Text>

        <HStack spacing={{ base: '0', md: '6' }}>
    <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell/>}  color={'white'}  _hover={{color: 'black', bgColor: 'white'}}/>
    <Flex alignItems={'center'}>
    <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
    <HStack>
        <Avatar
            size={'sm'}
    src={
        //'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        imageUrl
    }
    />
    <VStack
    display={{ base: 'none', md: 'flex' }}
    alignItems="flex-start"
    spacing="1px"
    ml="2">
    <Text fontSize="sm">{name}</Text>
    <Text fontSize="xs" color="gray.400">
        {role}
        </Text>
        </VStack>
        <Box display={{ base: 'none', md: 'flex' }}>
    <FiChevronDown />
    </Box>
    </HStack>
    </MenuButton>
    <MenuList
    bg={'rgb(38,39,41,1)'}
    borderColor={'whiteAlpha.300'}>
    <MenuItem bg={'rgb(38,39,41,1)'} _hover={{bg: 'rgb(48,49,51,1)'}} borderRadius={10} >Profile</MenuItem>
    <MenuDivider />
    <MenuItem bg={'rgb(38,39,41,1)'} _hover={{bg: 'rgb(48,49,51,1)'}} borderRadius={10} color={'red'} onClick={() => router.push('/profile')}>Revenir au site</MenuItem>
    </MenuList>
    </Menu>
    </Flex>
    </HStack>
    </Flex>
)
}

const SidebarWithHeader = ({children, name, role, imageUrl, power, selected}: SidebarWithHeaderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box minH="100vh" bg={'rgb(41,42,44,1)'} color={'white'}>
    <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} userPower={power} selected={selected}/>
    <Drawer
    isOpen={isOpen}
    placement="left"
    onClose={onClose}
    returnFocusOnClose={false}
    onOverlayClick={onClose}
    size="full">
    <DrawerContent>
        <SidebarContent onClose={onClose} userPower={power} selected={selected}/>
    </DrawerContent>
    </Drawer>
    {/* mobilenav */}
    <MobileNav onOpen={onOpen} name={name} role={role} imageUrl={imageUrl}/>
    <Box ml={{ base: 0, md: 60 }} p="4">
        {children}

        </Box>
        </Box>
)
}

export default SidebarWithHeader