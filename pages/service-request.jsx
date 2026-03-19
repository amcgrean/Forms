import Head from 'next/head';
import ServiceRequestForm from '../components/forms/ServiceRequestForm';

export default function ServiceRequest() {
  return (
    <>
      <Head>
        <title>Service Request - Beisser Lumber Company</title>
        <meta name="description" content="Service Request" />
      </Head>
      <main>
        <ServiceRequestForm />
      </main>
    </>
  );
}
