import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Background } from '@/components/QuoteGenerator/QuoteGeneratorElements';

export default function Home() {
  return (
    <>
      <Head>
        <title>Quote Generator</title>
        <meta name="description" content="Generate fun quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* background */}
      <Background>
        
      </Background>
    </>
  )
}
