Cypress.Commands.add('tickMessage', times => {
  cy.get('[data-cy=message-list]')
    .get('.message-content')
    .should('have.text', 'Message')
    .get('.message-time')
    .should('have.text', times.toString());

  for (let i = times - 1; i > 0; i--) {
    cy.tick(1000)
      .get('.message-content')
      .should('have.text', 'Message')
      .get('.message-time')
      .should('have.text', i.toString());
  }

  cy.tick(1000)
    .get('[data-cy=message-list]')
    .children().should('have.length', 0)
});

Cypress.Commands.add('createMessage', times => {
  cy.get('[data-cy=message-input]')
    .type('Message')
    .get('[data-cy=message-time-select]')
    .select(times.toString())
    .get('[data-cy=message-add-btn]')
    .click()
});

Cypress.Commands.add('checkTimeOfMessage', (index, time) => {
  cy.get('.message-time')
    .eq(index)
    .should('have.text', time.toString())
});
