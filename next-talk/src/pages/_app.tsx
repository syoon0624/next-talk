import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Header from '../components/header/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}
