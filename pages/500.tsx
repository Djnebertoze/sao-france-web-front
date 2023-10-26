import { Box, Heading, Text } from "@chakra-ui/react";
import React, {useEffect} from "react";

export default function Custom500() {

    useEffect(() => {
        // @ts-ignore
        document.getElementById('navbar').style.display = "none";
    },[]);

    return(
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text">
                500
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Internal Server Error
            </Text>
            <Text color={'gray.500'} mb={6}>
                {"There was an error. Please try again later."}
            </Text>
        </Box>
    )}