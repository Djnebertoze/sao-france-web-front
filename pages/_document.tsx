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
				<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"/>
			</Head>
			<body id={'main'}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}