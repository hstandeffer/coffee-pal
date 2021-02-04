describe('Sign up', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.visit('/signup')
    cy.get('button[type="submit"]').contains('Sign Up').as('submitBtn')
  })

  it('will validate the form and sign the user up, redirecting to browse', () => {
    cy.get('@submitBtn').click()
    cy.get('.MuiAlert-message').should('exist')

    cy.get('input[name="username"]').type('jimbo')
    cy.get('input[name="email"]').type('jimbo@gmail.com')
    cy.get('input[name="password"]').type('password')
    cy.get('input[name="confirmPassword"]').type('password')
    cy.get('@submitBtn').click()

    cy.window()
      .its('localStorage.loggedUser')
      .should('be.a', 'string')
      .and('not.be.empty')
    cy.url().should('eq', `${Cypress.config().baseUrl}/browse`)
  })
})