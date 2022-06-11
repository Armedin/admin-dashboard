import 'src/styles/globals.scss';
import 'src/styles/font.scss';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import Layout from '@/components/common/Layout';
import { useDarkMode } from '@/hooks';
import { GlobalStyles, SnackbarProvider } from '@kukui/ui';

function App({ Component, pageProps }: AppProps) {
  useDarkMode();

  return (
    <SnackbarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <GlobalStyles />
      <style jsx global>{`
        #__next {
          display: flex;
          flex: 1 1 100%;
        }
      `}</style>
    </SnackbarProvider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
