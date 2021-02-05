import { testid } from '../support/utils'

describe('add roaster', () => {
  beforeEach(() => {  
    cy.resetDatabase()
    cy.createTestUserAndStoreToken()
    cy.visit('/roasters/add')
  })

  it('validates the form and allows successful upload', () => {
    cy.get('button[type="submit"]').contains('Submit').click()
    cy.get('.MuiAlert-message').should('exist')

    cy.get('input[name="name"]').type('Verve Coffee Roasters')
    cy.get('textarea[name="summary"]').type('Good coffee')
    cy.get('input[name="website"]').type('vervecoffee.com')
    cy.get('input[type="file"]').attachFile('verve.jpg')
    cy.get('button[type="submit"]').contains('Submit').click()

    cy.get(testid`toast:success`).contains('Roaster has been successfully added')
  })
})