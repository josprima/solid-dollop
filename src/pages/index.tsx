import Head from 'next/head';

export default function Home() {
  return (
    <Head>
      <title>Home | usedeall-ecommerce</title>
    </Head>
  );
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/products',
      permanent: false,
    },
  };
}
