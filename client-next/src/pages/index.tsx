import * as React from 'react';

// import './App.sass';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      {/* <Seo /> */}

      <main>
        <section className='bg-white'></section>
      </main>
    </Layout>
  );
}
