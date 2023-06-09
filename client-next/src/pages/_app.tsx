import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import UIProvider from '@/lib/context/UIContext';
import AuthProvider from '@/lib/context/UserDetailsContext';
import Logger from '@/lib/logger';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  Logger.info('App started');
  return (
    <AuthProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </AuthProvider>
  );
}

export default MyApp;
