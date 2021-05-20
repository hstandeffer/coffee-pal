/* eslint-disable no-undef */
import { objectToQueryString } from '../../src/shared/utils/url'
import { getStoredAuthToken, storeAuthToken } from '../../src/shared/utils/authToken'

Cypress.Commands.add('apiRequest', (method, url, variables = {}, options = {}) => {
  cy.request({
    method,
    url: `${Cypress.env('apiBaseUrl')}${url}`,
    qs: method === 'GET' ? objectToQueryString(variables) : undefined,
    body: method !== 'GET' ? variables : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
    },
    ...options,
  })
})

Cypress.Commands.add('resetDatabase', () => {
  cy.apiRequest('DELETE', '/api/testing/reset')
})

Cypress.Commands.add('createTestAccount', () => {
  cy.apiRequest('POST', '/api/testing/create-test-account')
})

Cypress.Commands.add('createTestUserAndStoreToken', () => {
  cy.apiRequest('POST', '/api/testing/create-test-account').then(response => {
    storeAuthToken(response.body.token)
    // visiting baseUrl here updates the withAuthentication provider to update context to logged in user
    cy.visit(`${Cypress.env('baseUrl')}`)
  })
})

Cypress.Commands.add('createTestUser', () => {
  const user = {
    username: 'jimbo',
    email: 'jimbo@gmail.com',
    password: 'password',
    confirmPassword: 'password'
  }
  cy.apiRequest('POST', '/api/users/', user)
})

Cypress.Commands.add('createTestRoaster', () => {
  cy.fixture('verve.jpg', "base64").then(Cypress.Blob.binaryStringToBlob).then(blob => {
    const file = new File([blob], 'verve.jpg')
    const roasterObject = {
      name: 'Verve Coffee Roasters',
      summary: 'Good coffee',
      address: 'Who Cares Ln',
      website: 'vervecoffee.com',
    }

    const data = new FormData()

    data.append('roasterImage', file)
    data.append('name', roasterObject.name)
    data.append('summary', roasterObject.summary)
    data.append('address', roasterObject.address)
    data.append('website', roasterObject.website)

    cy.form_request('/api/roasters', data)
  })
})

// hacky way to send different request passing form data
Cypress.Commands.add("form_request", (url, formData) => {
  return cy
    .intercept("POST", url)
    .as("formRequest")
    .window()
    .then(win => {
      var xhr = new win.XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader('Authorization', getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,)
      xhr.send(formData);
    })
    .wait("@formRequest")
})