/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const getAvailableFromCountry = async () => {
  const response = await axios.get('https://open.er-api.com/v6/latest/USD');
  const { data } = response;
  return Object.keys(data.rates);
};

export { getAvailableFromCountry };
