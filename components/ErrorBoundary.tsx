import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "./atoms/Links/Links";

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props)
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI

        return { hasError: true }
    }
    componentDidCatch(error: any, errorInfo: any) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
    }
    render() {
        // Check if the error is thrown
        // @ts-ignore
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <Box textAlign="center" py={10} px={6}>
                        <Heading
                            display="inline-block"
                            as="h2"
                            size="2xl"
                            bgGradient="linear(to-r, teal.400, teal.600)"
                            backgroundClip="text">
                            Oops, there is an error!
                        </Heading>
                        <Text fontSize="18px" mt={3} mb={2}>
                            Page Not Found
                        </Text>
                        <Text color={'gray.500'} mb={6}>
                            {"The page you're looking for does not seem to exist"}
                        </Text>
                        <Link
                            p={4}
                            borderRadius={'lg'}
                            colorScheme="teal"
                            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                            color="white"
                            variant="solid"
                            onClick={() => {
                                this.setState({ hasError: false });
                            }}
                            href={'/'}
                        >
                            Go to Home
                        </Link>
                    </Box>
                </>
            )
        }

        // Return children components in case of no error

        // @ts-ignore
        return this.props.children
    }
}

export default ErrorBoundary