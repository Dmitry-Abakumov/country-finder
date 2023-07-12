import toastr from 'toastr';

import './toastr-config';
import 'toastr/build/toastr.min.css';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = `name,capital,population,flags,languages`;

export const fetchCountries = async name => {
  const response = await fetch(`${BASE_URL}${name}?fields=${FIELDS}`);
  return !response.ok ? new Error(response.status) : await response.json();
};
