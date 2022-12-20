describe('Movie tickets tests', () => {

    const movie = require('../fixtures/bookingData.json');
    const seats = require('../fixtures/seats.json');
    const days = require('../fixtures/days.json');

    let randomDay;
    let randomSeat;

    beforeEach(() => {
        randomDay = [Math.floor(Math.random() * days.length)];
        cy.visit(movie.address);
        cy.get(days[randomDay].day).click();
        cy.get(movie.film).first().contains('19:00').click();
    });

    it.skip('First test - positive', async () => {
        // cy.visit(movie.address);
        // cy.get(days[randomDay].day).click();
        // cy.get(movie.film).first().contains('19:00').click();
        // randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.get(seats[0].seat).click();
        cy.get(movie.accept).click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it('Second test (book two tickets) - positive', async () => {
        // randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.get(seats[2].seat).click();
        // randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.get(seats[3].seat).click();
        cy.get(movie.accept).click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it.skip('Third test (try to book two tickets, but click twice to one) - negative', async () => {
        randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.log(randomSeat);
        cy.get(seats[4].seat).click();
        cy.log(randomSeat);
        cy.get(seats[4].seat).click();
        cy.get(movie.accept).should('be.disabled');
    });

    it.skip('Fourth test (try to select non active time) - negative', async () => {
        cy.visit(movie.address);
        cy.get(days[0].day).click();
        cy.get(movie.filmNonActive).should('be.disabled');
    });
});


