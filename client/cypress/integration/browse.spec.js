import { testid } from '../support/utils'

describe('browse', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.createTestAccount()
    cy.visit('/browse')
  })

  it('selects roast types and updates the shown coffees', () => {
    cy.get(testid`browse:filters`).contains('Light Roast').click()
    cy.get(testid`search:coffeeItem`)
      .should('contain', 'Tasty blend')
      .should('contain', 'the best blend')
      .should('not.contain', 'Tastiness blend')
  })

  it('selects price filter and updates the shown coffees', () => {
    cy.viewport(1900, 1000);
    cy.get('[aria-valuenow="1"]')
      .trigger('mousedown', { which: 1 }, { force: true })
      .trigger('mousemove', {clientX: 115}, { force: true })
      .trigger('mouseup', { force: true })

    cy.wait(1000)
    cy.get('[aria-valuenow="50"]')
    .trigger('mousedown', { which: 1 }, { force: true })
    .trigger('mousemove', {clientX: 150}, { force: true })
    .trigger('mouseup', { force: true })

    cy.get(testid`search:coffeeItem`).should('not.contain', 'Tasty blend')
  })
})