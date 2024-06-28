import "../styles/globals.css";
import "@fontsource/inter/400.css";
import type {AppProps} from "next/app";
import {appWithTranslation} from "next-i18next";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import {store} from "../store/store";
import ErrorBoundary from "../components/ErrorBoundary";
import {theme} from "../styles/theme";
import Navbar from "../components/molecules/Navbar/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "../store/authConfig";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Footer from "../components/molecules/Footer/Footer";
import NextTopLoader from "nextjs-toploader";
import { motion } from 'framer-motion';


config.autoAddCss = false;

const msalInstance = new PublicClientApplication(msalConfig);

const stripePromise = loadStripe(
    process.env.STRIPE_PUBLIC_KEY ? process.env.STRIPE_PUBLIC_KEY : "error"
);

function MyApp({Component, pageProps, router}: AppProps) {


    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <MsalProvider instance={msalInstance}>
                    <Elements stripe={stripePromise}>
                        <ErrorBoundary>
                            <NextTopLoader height={10}/>
                            <Navbar/>
                            <motion.div initial="pageInitial" key={router.route} animate="pageAnimate" variants={{
                                pageInitial: {

                                },
                                pageAnimate: {

                                },
                            }}>

                                <Component {...pageProps}/>

                            </motion.div>
                            <Footer/>
                        </ErrorBoundary>
                    </Elements>
                </MsalProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default appWithTranslation(MyApp);
