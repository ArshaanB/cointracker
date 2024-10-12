import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });
  console.log(`Current Date: ${currentDate}`);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'success' })
  };
};
