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

// third party packages
const uuid = require('uuid');
// image generation packages
const sharp = require('sharp');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

//update DynamoDB Table
const updateTable = async (quote) => {
    const tableName = process.env.API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME;
    const id = '8ZfRL2xEer63Lm2lWrbfhjfJRG'
    try {
        const quoteParams = {
            TableName: tableName,
            Key: {
                'id': id
            },
            updateExpression: 'SET #quotesGenerated = #quotesGenerated + :inc',
            ExpressionAttributeValues: {
                ':inc': 1,
            },
            ExpressionAttributeNames: {
                
            }
        }
    } catch (err) {
        console.log('DynamoDB update error',err);

    }
}
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};

