import React, {FC, MouseEventHandler, useState} from "react";
import {BoxProps, Flex, FlexProps, Icon, Text, TextProps} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FiTrash} from "react-icons/fi";


interface TagsProps{
    adminMode?: boolean;
}

export const Tags: FC<BoxProps & TextProps & TagsProps> = (props) => {
    const [isOver, setIsOver] = useState<boolean>(false)

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
              className={''} {...props}
              onMouseLeave={() => setIsOver(false)}
              onMouseEnter={() => setIsOver(true)}
              opacity={props.adminMode ? isOver ? .7 : 1 : 1}
              cursor={props.adminMode ? 'pointer' : "auto"}
        >
            {
                props.children != '+' ? (
                    <>
                        <Text fontSize={props.fontSize ? props.fontSize : 16} p={0}>#{props.children}</Text>
                        {
                            props.adminMode && (
                                <Icon as={FiTrash} ml={3}/>
                            )
                        }
                    </>
                ) : (
                    'Ajouter +'
                )
            }

        </Flex>
    );
};
