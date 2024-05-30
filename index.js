import http from 'http';
import WeatherService from './services/weather.js';
import S3Service from './services/aws.js';

export const handler = async (event) => {
  try {
    const cityData = await WeatherService.getCityInformation((event['queryStringParameters'] || {})['city'] || 'Ankara');

    await S3Service.send(cityData);

    return {
      statusCode: 200,
      body: JSON.stringify(cityData),
    };
  } catch(err) {
    return {
      statusCode: 404,
      body: false,
    };
  }
};

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Allow': 'GET' }).end('Method Not Allowed');

    return;
  }

  try {
    const event = {
      queryStringParameters: {
        city: new URL(req.url, `http://${req.headers.host}`).searchParams.get('city') 
      } 
    };
    const response = await handler(event);

    res.writeHead(response.statusCode).end(JSON.stringify(response.body));
  } catch (err) {
    res.writeHead(500).end('ERROR');
  }
});

server.listen(8000, '0.0.0.0', () => {
  console.log('Server is running');
});
