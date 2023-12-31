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
	QuoteGeneratorButton,
	QuoteGeneratorButtonText,
	QuoteGeneratorContainer,
	QuoteGeneratorInner,
	QuoteGeneratorSubTitle,
	QuoteGeneratorTitle,
} from '@/components/QuoteGenerator/QuoteGeneratorElements';

import QuoteGeneratorModal from '@/components/QuoteGenerator';

import image1 from '../assets/Moon01.png';
import image2 from '../assets/Sun.png';
import { API } from 'aws-amplify';
import { generateAQuote, quotesQueryName } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';

// interface for DynamoDB object
interface UpdateQuoteInfoData {
	id: string;
	queryName: string;
	quotesGenerated: number;
	createdAt: string;
	updatedAt: string;
}

// interface for lambda function
interface GenerateAQuoteData {
	generateAQuote: {
		statusCode: number;
		headers: { [key: string]: string };
		body: string;
	};
}

//type guard
function graphQLResult(response: any): response is GraphQLResult<{
	quotesQueryName: {
		items: [UpdateQuoteInfoData];
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
	const UpdateQuoteInfo = async () => {
		try {
			const response = await API.graphql<UpdateQuoteInfoData>({
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
			const receivedNumberOfQuotes =
				response.data.quotesQueryName.items[0].quotesGenerated;
			setNumberOfQuotes(receivedNumberOfQuotes);
			console.log('numberOfQuotes: ', receivedNumberOfQuotes);
		} catch (error) {
			console.log('Error from data: ', error);
		}
	};

	useEffect(() => {
		UpdateQuoteInfo();
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
			const runFunction = 'runFunction';
			const runFunctionStringified = JSON.stringify(runFunction);
			const response = await API.graphql<GenerateAQuoteData>({
				query: generateAQuote,
				authMode: 'AWS_IAM',
				variables: {
					input: runFunctionStringified,
				},
			});
			const responseStringified = JSON.stringify(response);
			const responseReStringified = JSON.stringify(responseStringified);
			const bodyIndex = responseReStringified.indexOf('body=') + 5;
			const bodyAndBase64 = responseReStringified.substring(bodyIndex);
			const bodyArray = bodyAndBase64.split(',');
			const body = bodyArray[0];
			// console.log('body: ', body);
			setQuoteReceived(body);

			// end
			setProcessingQuote(false);

			// fetch new quotes
			UpdateQuoteInfo();
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
				<QuoteGeneratorContainer>
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
						<QuoteGeneratorButton onClick={handleOpenGenerator}>
							<QuoteGeneratorButtonText>Inspire me!</QuoteGeneratorButtonText>
						</QuoteGeneratorButton>
					</QuoteGeneratorInner>
				</QuoteGeneratorContainer>

				{/* background images */}
				<BackgroundImage1 src={image1} height='280' alt='image1' />
				<BackgroundImage2 src={image2} height='300' alt='image2' />

				{/* footer */}
				<Footer>
					<>
						{/* Quotes Generated: {numberOfQuotes} */}
						<br />
						Developed with 💖 by{' '}
						<FooterLink
							href='https://github.com/sarah-zhan'
							target='_blank'
							rel='noopener noreferrer'
						>
							@yishan
						</FooterLink>
					</>
				</Footer>
			</Background>
		</>
	);
}
