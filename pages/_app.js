import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { FlipkartProvider } from "../context/FlipkartContext";
import { ModalProvider } from "react-simple-hook-modal";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <FlipkartProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </FlipkartProvider>
    </MoralisProvider>
  );
}

export default MyApp;
