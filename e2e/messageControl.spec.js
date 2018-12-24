describe('control message test', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/')
      .createMessage(3)
      .createMessage(5)
      .createMessage(10)
      .createMessage(30)
      .checkTimeOfMessage(0, 30)
      .checkTimeOfMessage(1, 10)
      .checkTimeOfMessage(2, 5)
      .checkTimeOfMessage(3, 3)
  });

  describe('increase timer', () => {
    it('should add default time at 3th message', () => {
      cy.get('.time-plus-btn').eq(2)
        .click()
        .checkTimeOfMessage(2, 8);
    });

    it('should add 5 second time at 3th message', () => {
      cy.get('.time-plus-select').eq(2)
        .select('5')
        .get('.time-plus-btn').eq(2)
        .click()
        .checkTimeOfMessage(2, 10);
    });

    it('should add 2 times time at 3th message', () => {
      cy.get('.time-plus-select').eq(2)
        .select('2-times')
        .get('.time-plus-btn').eq(2)
        .click()
        .checkTimeOfMessage(2, 10);
    });

    it('should add 3 times time at 3th message', () => {
      cy.get('.time-plus-select').eq(2)
        .select('3-times')
        .get('.time-plus-btn').eq(2)
        .click()
        .checkTimeOfMessage(1, 15)
        .checkTimeOfMessage(2, 10);
    });
  });

  describe('decrease timer', () => {
    it('should minus default time at 3th message', () => {
      cy.get('.time-minus-btn').eq(2)
        .click()
        .checkTimeOfMessage(2, 3)
        .checkTimeOfMessage(3, 2);
    });

    it('should minus 5second time at 3th message', () => {
      cy.get('.time-minus-select').eq(2)
        .select('-5')
        .get('.time-minus-btn').eq(2)
        .click()
        .get('[data-cy=message-list]')
        .children()
        .should('have.length', 3);
    });
  });

  describe('delete message', () => {
    it('should test delete message', () => {
      cy.get('.message-delete-btn')
        .eq(2)
        .click()
        .get('[data-cy=message-list]')
        .children()
        .should('have.length', 3)
        .checkTimeOfMessage(0, 30)
        .checkTimeOfMessage(1, 10)
        .checkTimeOfMessage(2, 3)
        .get('.message-delete-btn').eq(2)
        .click()
        .get('[data-cy=message-list]')
        .children()
        .should('have.length', 2)
        .checkTimeOfMessage(0, 30)
        .checkTimeOfMessage(1, 10)
        .get('.message-delete-btn').eq(0)
        .click()
        .get('[data-cy=message-list]')
        .children().should('have.length', 1)
        .checkTimeOfMessage(0, 10)
        .get('.message-delete-btn').eq(0)
        .click()
        .get('[data-cy=message-list]')
        .children().should('have.length', 0)
    });
  });
});
