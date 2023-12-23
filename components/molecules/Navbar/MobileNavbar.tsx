import { BellIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Collapse,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import {FC, useEffect} from "react";
import { Link } from "../../atoms/Links/Links";
import { GenericNavbarProps, NavItem } from "./types";
import {Simulate} from "react-dom/test-utils";

const MobileNavbar: FC<GenericNavbarProps> = (props) => {
	return (
		<Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ lg: 'none' }}>
			{props.navItems.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
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
