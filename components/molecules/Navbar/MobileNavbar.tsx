import {ChevronDownIcon} from "@chakra-ui/icons";
import {Collapse, Icon, Link as ChakraLink, Stack, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {FC} from "react";
import {GenericNavbarProps, NavItem} from "./types";

const MobileNavbar: FC<GenericNavbarProps> = (props) => {
	return (
		<Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ lg: 'none' }}>
			{props.navItems.filter((child) => child.label != 'LOGO').map((navItem) => (
				<MobileNavItem key={navItem.numberKey} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();



	return (
		<Stack spacing={4} onClick={children && onToggle}>
			{children ? (
				<Stack direction={'row'} justify={'space-between'}>
					<ChakraLink>{label}</ChakraLink>
					<Icon as={ChevronDownIcon} transition={'all .25s ease-in-out'} transform={isOpen ? 'rotate(180deg)' : ''} w={6} h={6} />
				</Stack>
			) : (
				<ChakraLink href={href}>{label}</ChakraLink>
			)}

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack mt={2} pl={4} borderLeft={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.700')} align={'start'}>
					{children &&
						children.map((child) => (
							<ChakraLink key={child.label} href={child.href}>
								{child.label}
							</ChakraLink>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

export default MobileNavbar;
