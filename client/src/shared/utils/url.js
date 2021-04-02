import queryString from 'query-string';

export const queryStringToObject = (str, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  })

export const objectToQueryString = (obj, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  })

export const assetUrl = process.env.NODE_ENV === 'production' ? 'https://d5aggsfpikv29.cloudfront.net' : 'http://localhost:3000/uploads'
export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://squigcoffee.com' : 'http://localhost:3000'