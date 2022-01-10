module.exports = (event) => ({
    pathParameters: event?.pathParameters ?? {},
    query: event?.queryStringParameters ?? {},
    body: event?.body ? JSON.parse(event.body) : {},
    headers: event?.headers ?? {}
});
