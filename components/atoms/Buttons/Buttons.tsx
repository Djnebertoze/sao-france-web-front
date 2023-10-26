import { Button, ButtonProps, IconButtonProps } from "@chakra-ui/react";
import { FC } from "react";

export const MainButton: FC<ButtonProps> = (props) => {
    return (
        <Button
            display={props.display}
            w={props.w}
            p={props.p}
            m={props.m}
            my={props.my}
            mt={props.mt}
            mr={props.mr}
            ml={props.ml}
            size={props.size}
            isDisabled={props.isDisabled}
            isLoading={props.isLoading}
            colorScheme={props.colorScheme}
            variant={props.variant}
            borderRadius={"xl"}
            shadow={props.variant === 'link' ? 'none' : props.shadow}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export const IconButton: FC<IconButtonProps> = (props) => {
    return (
        <IconButton
            icon={props.icon}
            size={props.size}
            colorScheme={props.colorScheme}
            variant={props.variant}
            onClick={props.onClick}
            aria-label={''}
        />
    );
};
