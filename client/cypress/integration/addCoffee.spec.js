/* eslint-disable no-undef */
import { testid } from '../support/utils'

describe('add coffee', () => {
  beforeEach(() => {  
    cy.resetDatabase()
    cy.createTestUserAndStoreToken()
    cy.createTestRoaster()
    cy.visit('/coffees/add')
  })

  it('validates the form and allows successful upload', () => {
    cy.get('button[type="submit"]').contains('Submit').click()
    cy.get('.MuiAlert-message').should('exist')

    cy.get('input[name="coffeeName"]').type('Tasty blend')

    cy.get(testid`brand:autocomplete`).click()
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()

    cy.get('input[name="price"]').type('12')

    cy.get(testid`roastType:select`).click()
    cy.get('.MuiMenu-list li[data-value="medium"]').click()

    cy.get('input[name="url"]').type('vervecoffee.com')
    cy.get('input[type="file"]').attachFile('verve.jpg')
    cy.get('button[type="submit"]').contains('Submit').click()

    cy.get(testid`toast:success`).contains('Coffee has been successfully added')
  })
})