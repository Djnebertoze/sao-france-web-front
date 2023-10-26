import {FC} from "react";
import {Box, BoxProps, Button, Flex, Text, TextProps} from "@chakra-ui/react";


export const Tags: FC<BoxProps & TextProps> = (props) => {
    return (
        <Flex verticalAlign={"middle"}
              alignItems={'center'}
              lineHeight={'1.2'}
              px={props.px ? props.px : 21}
              py={props.py ? props.py : 0}
              bgColor={props.bgColor ? props.bgColor : 'blue'}
              color={props.color ? props.color : 'white'}
              borderRadius={props.borderRadius ? props.borderRadius : 10}
              h={props.h ? props.h : 8}
              className={''} {...props}>
            <Text fontSize={props.fontSize ? props.fontSize : 16} p={0}>#{props.children}</Text>
        </Flex>
    );
};
