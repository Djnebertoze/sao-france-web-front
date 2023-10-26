import {Box, Button, Heading, Text} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";

export default function Custom404() {
    const router: NextRouter = useRouter();


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
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Introuvable
            </Text>
            <Text color={'gray.500'} mb={6}>
                {"Il se trouve que la page que vous recherchez est introuvable"}

            </Text>
            <Button colorScheme={"blue"} onClick={() => router.push('/')}>Revenir à l&apos;accueil</Button>
        </Box>
    )
}

