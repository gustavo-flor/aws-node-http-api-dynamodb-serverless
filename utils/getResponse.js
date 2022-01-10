module.exports = (statusCode, body = {}, headers = {}) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
});
