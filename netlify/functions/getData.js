export const handler = async () => {
    const apikey = process.env.API_KEY;

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `API Key is ${apikey}` }),
    };
}