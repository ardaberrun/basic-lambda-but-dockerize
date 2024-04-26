import axios from 'axios';

export default class WeatherService {
    constructor() {
      this.apiKey = process.env.API_KEY;
    }
  
    async getCityInformation(cityName) {
      try {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const response = await axios.get(url, { params: { q: cityName, appid: this.apiKey, units: 'metric'}});

        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
}
