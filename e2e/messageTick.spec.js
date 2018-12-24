describe('timer tick message test', () => {
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

  it('should test tick about whole messages', () => {
    const timeList = [30, 10, 5, 3];

    for(let i = 0; i < 30; i++) {
      cy.tick(1000);
      timeList.forEach((time, index) => {
        timeList[index] -= 1;
        if (timeList[index] <= 0) {
          timeList.pop();
          return;
        }
        cy.checkTimeOfMessage(index, timeList[index])
      });
    }
  });
});
