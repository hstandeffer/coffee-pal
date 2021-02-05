describe('Login', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.createTestUser()
    cy.visit('/signin')
    cy.get('button[type="submit"]').contains('Sign In').as('submitBtn')
  })

  it('will alert the user doesnt exist with invalid email', () => {
    cy.get('input:first').type('jimbo12@gmail.com')
    cy.get('input:last').type('password')
    cy.get('@submitBtn').click()
    
    cy.get('.MuiAlert-message').contains('User does not exist')
  })

  it('will alert the user of invalid credentials', () => {
    cy.get('input:first').type('jimbo@gmail.com')
    cy.get('input:last').type('wrongpassword')
    cy.get('@submitBtn').click()
    
    cy.get('.MuiAlert-message').contains('Invalid credentials')
  })

  it('will log a user in, save the token, and redirect to browse', () => {
    cy.get('input:first').type('jimbo@gmail.com')
    cy.get('input:last').type('password')
    cy.get('@submitBtn').click()

    cy.window()
      .its('localStorage.loggedUser')
      .should('be.a', 'string')
      .and('not.be.empty')
    cy.url().should('eq', `${Cypress.config().baseUrl}/browse`)
  })
})