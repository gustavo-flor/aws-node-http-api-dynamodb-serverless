"use strict";

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getRequest = require('./utils/getRequest');
const getResponse = require('./utils/getResponse');

module.exports.getItems = async (event) => {
    const { pathParameters } = getRequest(event);
    const { tableName } = pathParameters;
    try {
        const result = await dynamodb.scan({ TableName: tableName }).promise();
        return getResponse(200, result?.Items ?? []);
    } catch (error) {
        console.error(error);
        return getResponse(500, { message: 'Ops... something went wrong' });
    }
}

module.exports.putItem = async (event) => {
    const { pathParameters, body } = getRequest(event);
    const { tableName } = pathParameters;
    const item = {
        ...body,
        createdAt: new Date().toISOString()
    }
    try {
        await dynamodb.put({ TableName: tableName, Item: item }).promise();
    } catch (error) {
        console.error(error);
        return getResponse(500, { message: 'Ops... something went wrong' });
    }
    return getResponse(201, item);
}
