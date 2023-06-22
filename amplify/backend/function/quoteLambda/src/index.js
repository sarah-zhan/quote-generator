/* Amplify Params - DO NOT EDIT
	API_QUOTEGENERATOR_GRAPHQLAPIIDOUTPUT
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_ARN
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// aws packages
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// image generation packages
const sharp = require('sharp');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

//update DynamoDB Table
const updateTable = async quote => {
	const tableName = process.env.API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME;
	const id = '8ZfRL2xEer63Lm2lWrbfhjfJRG';
	try {
		const quoteParams = {
			TableName: tableName,
			Key: { id },
			ExpressionAttributeValues: {
				':inc': 1,
			},
			UpdateExpression: 'SET #quotesGenerated = #quotesGenerated + :inc',
			ExpressionAttributeNames: {
				'#quotesGenerated': 'quotesGenerated',
			},
			ReturnValues: 'UPDATED_NEW',
		};

		const updateObject = await docClient.update(quoteParams).promise();
		console.log('updateObject: ', updateObject);
		return updateObject;
	} catch (err) {
		console.log('DynamoDB update error', err);
	}
};

exports.handler = async event => {
	console.log(`EVENT: ${JSON.stringify(event)}`);

	const apiURL = 'https://zenquotes.io/api/random';

	// get random quote to make images
	const getRandomQuote = async api => {
		let quote;
		let author;

		//validate
		const response = await fetch(api);
		let quoteData = await response.json();

		// quote info
		quote = quoteData[0].q;
		author = quoteData[0].a;

		// image
		const width = 750;
		const height = 483;
		const words = quote.split(' ');
		console.log(words);
		const lineBreak = 4;
		let newText = '';
		let span = '';
		for (let i = 0; i < words.length; i++) {
			newText += words[i] + ' ';
			if ((i + 1) % lineBreak === 0) {
				span += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
				newText = '';
			}
		}
		if (newText !== '') {
			span += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
		}

		// make svg
		const svgImage = `
        <svg width="${width}" height="${height}">
            <style>
            .title {
                fill: #ffffff;
                font-size: 20px;
                font-weight: bold;
            }
            .authorStyles {
                font-size: 35px;
                font-weight: bold;
                padding: 50px;
            }
            .footerStyles {
                font-size: 20px;
                font-weight: bold;
                fill: lightgrey;
                text-anchor: middle;
                font-family: Verdana;
            }
            </style>
            <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 255, 0.1555"/>
            <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
            <g>
                <rect x="0" y="0" width="${width}" height="auto"></rect>
                <text id="lastLineOfQuote" x="375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
                    ${span}
                <tspan class="authorStyles" x="375" dy="1.8em">- ${author}</tspan>
                </text>
            </g>
            <text x="${width / 2}" y="${
			height - 10
		}" class="footerStyles">Developed by @yishan | Quotes from ZenQuotes.io</text>
        </svg>
        `;

		//background for svg
		const backgroundImages = [
			'backgrounds/Moonlit_Asteroid.jpg',
			'backgrounds/Orange_Fun.jpg',
			'backgrounds/Love_and_Liberty.jpg',
			'backgrounds/Visions_of_Grandeur.jpg',
		];

		const randomIndex = Math.floor(Math.random() * backgroundImages.length);
		const selectedImage = backgroundImages[randomIndex];

		// put images together
		const timestamp = new Date().toLocaleString().replace(/[^\d]/g, '');
		const imagePath = path.join('/tmp', `quote.png`);
		const svgBuffer = Buffer.from(svgImage);
		const image = await sharp(selectedImage)
			.composite([
				{
					input: svgBuffer,
					top: 0,
					left: 0,
				},
			])
			.toFile(imagePath);

		// update dynamoDB table
		try {
			updateTable();
		} catch (err) {
			console.log('DynamoDB update error', err);
		}

		return {
			statusCode: 200,
			//  enable CORS requests
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'image/png',
			},
			body: fs.readFileSync(imagePath).toString('base64'),
			isBase64Encoded: true,
		};
	};
	return await getRandomQuote(apiURL);
};
