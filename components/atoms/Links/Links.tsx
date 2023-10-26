import NextLink, { LinkProps } from "next/link";
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { FC } from "react";

export const Link: FC<LinkProps & ChakraLinkProps> = (props) => {
    return (
        <NextLink href={props.href} passHref>
            <ChakraLink {...props}>{props.children}</ChakraLink>
        </NextLink>
    );
};
