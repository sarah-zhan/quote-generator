import React, {useState} from 'react';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { Background, BackgroundImage1, BackgroundImage2, Footer, FooterLink, QuoteGenerator, QuoteGeneratorInner, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from '@/components/QuoteGenerator/QuoteGeneratorElements';

import image1 from "../assets/Moon01.png"
import image2 from "../assets/Sun.png"

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState(0)

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
				{/* modal quote generator */}
				<QuoteGenerator>
					<QuoteGeneratorInner>
						<QuoteGeneratorTitle>Your Daily Boost</QuoteGeneratorTitle>
						<QuoteGeneratorSubTitle>
							Provide by
							<FooterLink
								href='https://zenquotes.io/'
								target='_blank'
								rel='noopener noreferrer'
							>
								ZenQuotes.io
							</FooterLink>
						</QuoteGeneratorSubTitle>

						{/* button quote generator */}
						<QuoteGeneratorButton>
							<QuoteGeneratorButtonText onClick={null}>
								Inspire me!
							</QuoteGeneratorButtonText>
						</QuoteGeneratorButton>

					</QuoteGeneratorInner>
				</QuoteGenerator>

				{/* background images */}
				<BackgroundImage1 src={image1} height='280' alt='image1' />
				<BackgroundImage2 src={image2} height='300' alt='image2' />

				{/* footer */}
				<Footer>
					<>
						Quotes Generated: {numberOfQuotes}
						<br />
						Developed with 💖 by{' '}
						<FooterLink
							href='https://github.com/sarah-zhan'
							target='_blank'
							rel='noopener noreferrer'
						>
							@yishanzhan
						</FooterLink>
					</>
				</Footer>
			</Background>
		</>
	);
}
