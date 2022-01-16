import axios from 'axios';

const scrapeData = async () => {
  const response = await axios.get('https://open.er-api.com/v6/latest/USD');
  const { data } = response;
  delete data.rates.USD;
  return data;
};

export default scrapeData;
