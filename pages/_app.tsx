import "../styles/globals.css";
import "@fontsource/inter/400.css";
import type {AppProps} from "next/app";
import {appWithTranslation} from "next-i18next";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import {store} from "../store/store";
import ErrorBoundary from "../components/ErrorBoundary";
import Favicon from "../public/images/favicon.ico";
import {theme} from "../styles/theme";
import Navbar from "../components/molecules/Navbar/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "../store/authConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "../components/molecules/Footer/Footer";
import NextTopLoader from "nextjs-toploader";


config.autoAddCss = false;

const msalInstance = new PublicClientApplication(msalConfig);

// STRIPE TEST !!!!
const stripeTest = loadStripe(
    "pk_test_51NT4ruCwZ6NoH3zKks2f5qlDPHZ4spkvjtVe6D8PdWOErFCgl2Ag1WAZZvBnCqo4iG2MaqCZSaFesMuGgcbe99Ao00szvkZnwK"
);

// STRIPE LIVE !!!!
const stripeLive = loadStripe(
    "pk_live_51NT4ruCwZ6NoH3zKboEEKbKpGaWgDWB78O1WQkHozVOJ6n94GOquIbAnFrO9ZE7MQnlAtPKa8xXZ15CzZRzUiCY200HEGykgnL"
);

function MyApp({Component, pageProps}: AppProps) {



    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <MsalProvider instance={msalInstance}>
                    <Elements stripe={stripeTest}>
                        <ErrorBoundary>
                            <NextTopLoader height={10}/>
                            <Navbar/>
                            <Component {...pageProps}/>
                            <Footer/>
                        </ErrorBoundary>
                    </Elements>
                </MsalProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default appWithTranslation(MyApp);
