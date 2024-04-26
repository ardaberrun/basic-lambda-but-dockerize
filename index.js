import WeatherService from './weather.js';

export const handler = async (event) => {
  try {
    const weatherService = new WeatherService();
    const cityData = await weatherService.getCityInformation((event['queryStringParameters'] || {})['city'] || 'Ankara');

    return {
      statusCode: 200,
      body: cityData,
    };
  } catch(err) {
    return {
      statusCode: 404,
      body: false,
    };
  }
};
