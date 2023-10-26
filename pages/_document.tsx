// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";
import { theme } from "../styles/theme";

export default function Document() {
	return (
		<Html>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>SaoFrance MC - Rejoins l'aventure !</title>
			</Head>
			<body id={'main'}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}