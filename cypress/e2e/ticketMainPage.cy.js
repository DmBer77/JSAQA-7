describe('Movie tickets tests', () => {
    const randomDay = [Math.floor(Math.random() * 7)];
    const seats = require('../fixtures/seats.json');
    const randomSeat = seats[Math.floor(Math.random() * seats.length)];

    it('First test - positive', async () => {
        cy.log(randomDay);
        cy.log(randomSeat);
        cy.visit('qamid.tmweb.ru');
        cy.get(`a.page-nav__day:nth-of-type(${randomDay})`).click();
        cy.get('.movie').first().contains('19:00').click();
        cy.get(`.buying-scheme__wrapper > :nth-child(${randomSeat.row}) > :nth-child(${randomSeat.seat})`).click();
        cy.get('.acceptin-button').click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });


});


