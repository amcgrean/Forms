import Head from 'next/head';
import ContactForm from '../components/forms/ContactForm';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Beisser Lumber Company</title>
        <meta name="description" content="Contact Beisser Lumber Company and learn how we can help you with your building projects!" />
      </Head>
      <main>
        <ContactForm />
      </main>
    </>
  );
}
