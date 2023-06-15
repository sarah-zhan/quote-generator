import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { Background, BackgroundImage1, BackgroundImage2 } from '@/components/QuoteGenerator/QuoteGeneratorElements';

import image1 from "../assets/Moon01.png"
import image2 from "../assets/Sun.png"

export default function Home() {
  return (
		<>
			<Head>
				<title>Quote Generator</title>
				<meta name='description' content='Generate fun quotes' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* background */}
			<Background>
				<BackgroundImage1 src={image1} height='300' alt='image1' />
				<BackgroundImage2 src={image2} height='300' alt='image2' />
			</Background>
		</>
	);
}
