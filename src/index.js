import { fetchCountries } from './fetchCountries';
import { debounce, join, trim } from 'lodash';
import toastr from 'toastr';

import './toastr-config';
import 'toastr/build/toastr.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
};

const createBaseMarkup = countriesArray => {
  return countriesArray
    .map(
      ({ flags, name }) => `
  <li class="country-list-item">
    <img src=${flags.svg} alt="flag" width="40">
    <p>${name.official}</p>
  </li>`
    )
    .join('');
};

const createSecondaryMarkup = ({ capital, population, languages }) => {
  return `<li>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages).join(', ')}</p>
  </li>`;
};

const render = markup => {
  refs.countriesList.insertAdjacentHTML('afterbegin', markup);
};

const reset = () => {
  refs.countriesList.innerHTML = '';
};

const onInputText = async e => {
  const { value } = e.target;
  if (!value) return reset();

  try {
    const countries = await fetchCountries(trim(value));
    if (countries.length > 9)
      return toastr.warning(
        'Too many matches found. Please enter a more specific name.'
      );

    reset();

    if (countries.length === 1) {
      render(createSecondaryMarkup(countries[0]));
    }

    render(createBaseMarkup(countries));
  } catch {
    toastr.error('Oops, there is no country with that name');
  }
};

refs.input.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));
