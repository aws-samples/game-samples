import { Amplify } from 'aws-amplify';
import config from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

// configure the Amplify client library with the configuration generated by `amplify sandbox`
Amplify.configure(config);


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
