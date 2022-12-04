import toastr from 'toastr';

import './toastr-config';
import 'toastr/build/toastr.min.css';

export const fetchCountries = name => {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  FIELDS = `name,capital,population,flags,languages`;

  return fetch(`${BASE_URL}${name}?fields=${FIELDS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => {
      toastr.error('Oops, there is no country with that name');
    });
};
