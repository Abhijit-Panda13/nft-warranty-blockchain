import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { FlipkartProvider } from '../context/FlipkartContext'


function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <FlipkartProvider>
        <Component {...pageProps} />
      </FlipkartProvider>
    </MoralisProvider>
  );
}

export default MyApp;
