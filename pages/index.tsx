import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import {
	Background,
	BackgroundImage1,
	BackgroundImage2,
	Footer,
	FooterLink,
	QuoteGenerator,
	QuoteGeneratorButton,
	QuoteGeneratorButtonText,
	QuoteGeneratorInner,
	QuoteGeneratorSubTitle,
	QuoteGeneratorTitle,
} from '@/components/QuoteGenerator/QuoteGeneratorElements';

import QuoteGeneratorModal from '@/components/QuoteGenerator';

import image1 from '../assets/Moon01.png';
import image2 from '../assets/Sun.png';
import { API } from 'aws-amplify';
import { quotesQueryName } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';

// interface for DynomoDB object
interface UpdateData {
	id: string;
	queryName: string;
	quotesGenerated: number;
	createdAt: string;
	updatedAt: string;
}

//type guard
function graphQLResult(response: any): response is GraphQLResult<{
	quotesQueryName: {
		items: [UpdateData];
	};
}> {
	return (
		response.data &&
		response.data.quotesQueryName &&
		response.data.quotesQueryName.items
	);
}

export default function Home() {
	const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
	const [openGenerator, setOpenGenerator] = useState(false);
	const [processingQuote, setProcessingQuote] = useState(false);
	const [quoteReceived, setQuoteReceived] = useState<String | null>(null);
	// to fetch the quotes
	const updateData = async () => {
		try {
			const response = await API.graphql<UpdateData>({
				query: quotesQueryName,
				authMode: 'AWS_IAM',
				variables: {
					queryName: 'LIVE',
				},
			});
			// console.log("response:", response)

			// type	guard
			if (!graphQLResult(response)) {
				throw new Error('Error from API.graphql');
			}

			if (!response.data) {
				throw new Error('Data is undefined');
			}

			// update the number of quotes
			const number = response.data.quotesQueryName.items[0].quotesGenerated;
			setNumberOfQuotes(number);
		} catch (error) {
			console.log('Error from data: ', error);
		}
	};

	useEffect(() => {
		updateData();
	}, []);

	// handle close of quote generator modal
	const handleCloseGenerator = () => {
		setOpenGenerator(false);
		setProcessingQuote(false);
		setQuoteReceived(null);
	};

	// handle open of quote generator modal
	const handleOpenGenerator = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setOpenGenerator(true);
		setProcessingQuote(true);
		try {
			//run lambda function

			setProcessingQuote(false);
		} catch (error) {
			console.log('Error from lambda: ', error);
			setProcessingQuote(false);
		}
	};

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
				<QuoteGeneratorModal
					open={openGenerator}
					close={handleCloseGenerator}
					processingQuote={processingQuote}
					setProcessingQuote={setProcessingQuote}
					quoteReceived={quoteReceived}
					setQuoteReceived={setQuoteReceived}
				/>
				{/* Quote Generator */}
				<QuoteGenerator>
					<QuoteGeneratorInner>
						<QuoteGeneratorTitle>Your Daily Mind Boost</QuoteGeneratorTitle>
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
							<QuoteGeneratorButtonText onClick={handleOpenGenerator}>
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
