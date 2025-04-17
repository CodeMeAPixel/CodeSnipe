import { Box, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { theme } from "../config/theme";
import { SEO_TITLE } from "../constants/seo";
import { PanelContextProvider } from "../context/PanelContext";
import useWindowSize from "../hooks/useWindowSize";
import CodeMirrorTheme from "../styles/CodeMirrorTheme";
import FontFaces from "../styles/FontFaces";
import MarkDownTheme from "../styles/MarkDownTheme";
import Misc from "../styles/Misc";
import Layout from "../components/Layout";

function App({ Component, pageProps }: AppProps) {
  const { height } = useWindowSize();

  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <Script src="https://cdn.splitbee.io/sb.js" strategy="afterInteractive" />

      <ChakraProvider theme={theme}>
        <PanelContextProvider>
          <FontFaces />
          <MarkDownTheme />
          <CodeMirrorTheme />
          <Misc />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PanelContextProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
