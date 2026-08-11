import { cities } from '../data/dataset.js';

/**
 * Standardize city input into structured city object with aliases
 */
export function resolveCity(inputCityId = '') {
  const inputStr = (inputCityId || '').trim().toLowerCase();

  if (!inputStr || inputStr === 'all') {
    return {
      cityId: 'all',
      cityName: '全區',
      searchTerms: []
    };
  }

  const found = cities.find(c =>
    c.id.toLowerCase() === inputStr ||
    c.name.toLowerCase().includes(inputStr) ||
    (c.aliases && c.aliases.some(a => a.toLowerCase() === inputStr || inputStr.includes(a.toLowerCase()) || a.toLowerCase().includes(inputStr)))
  );

  if (found) {
    return {
      cityId: found.id,
      cityName: found.name.split(' ')[0],
      searchTerms: [found.id, found.name.split(' ')[0], ...(found.aliases || [])]
    };
  }

  return {
    cityId: inputStr,
    cityName: inputCityId,
    searchTerms: [inputStr]
  };
}

export function getAllCities() {
  return cities;
}
