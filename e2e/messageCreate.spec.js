describe('create message test', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/')

  });

  describe('success create message', () => {
    it('should create default time of message', () => {
      cy.createMessage(3)
        .tickMessage(3)
    });

    it('should create 5second time of message', () => {
      cy.createMessage(5)
        .tickMessage(5)
    });

    it('should create 10 second time of message', () => {
      cy.createMessage(10)
        .tickMessage(10)
    });

    it('should create 30 second time of message', () => {
      cy.createMessage(30)
        .tickMessage(30)
    });

    it('should create 60 second time of message', () => {
      cy.createMessage(60)
        .tickMessage(60)
    });
  });

  describe('fail create message', () => {
    it('doesn\'t message.length >= 3', () => {
      cy.get('[data-cy=message-input]')
        .type('12')
        .get('[data-cy=message-list]')
        .children().should('have.length', 0)
    });
  });

});
