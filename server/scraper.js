import { resolveCity } from './services/cityService.js';
import { searchStays } from './services/hotelScraperService.js';
import { searchPackages } from './services/packageService.js';
import { scrapeBlogAttractions } from './services/blogScraperService.js';
import { scrapeOpenDataAttractions, isExhibitionExpired } from './services/openDataService.js';
import { searchTheaters } from './services/theaterService.js';

export { resolveCity };

export async function runScraperJob(query, onLog) {
  return await searchStays(query, onLog);
}

export async function runPackageScraperJob(query, onLog) {
  return await searchPackages(query, onLog);
}

export async function runFamilyAttractionScraperJob(query, onLog) {
  const cityInput = (query.cityId && query.cityId.trim()) ? query.cityId : '台中';
  const { cityId: normCityId, cityName: normCityName } = resolveCity(cityInput);

  let results = [];
  try {
    const blogItems = await scrapeBlogAttractions(normCityName, onLog);
    if (blogItems) results.push(...blogItems);
  } catch (e) {}

  try {
    const openDataItems = await scrapeOpenDataAttractions(normCityName, onLog);
    if (openDataItems) results.push(...openDataItems);
  } catch (e) {}

  return results.slice(0, 20);
}

export async function runTheaterScraperJob(query, onLog) {
  return await searchTheaters(query, onLog);
}
