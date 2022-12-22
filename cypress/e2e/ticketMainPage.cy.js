const movie = require('../fixtures/bookingData.json');
const seats = require('../fixtures/seats.json');
const days = require('../fixtures/days.json');

describe('Movie tickets tests', () => {

    let randomDay;
    let randomSeat;

    beforeEach(() => {
        randomDay = [Math.floor(Math.random() * days.length)];
        cy.visit(movie.address);
        cy.get(days[randomDay].day).click();
        cy.get(movie.film).first().contains('19:00').click();
    });

    it('First test - positive', () => {
        randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.get(seats[randomSeat].seat).click();
        cy.get(movie.accept).click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it('Second test (book two tickets) - positive', () => {
        randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.get(seats[randomSeat].seat).click();
        randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.get(seats[randomSeat].seat).click();
        cy.get(movie.accept).click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it('Third test (try to book two tickets, but click twice to one) - negative', () => {
        randomSeat = [Math.floor(Math.random() * seats.length)];
        cy.log(randomSeat);
        cy.get(seats[randomSeat].seat).click();
        cy.log(randomSeat);
        cy.get(seats[randomSeat].seat).click();
        cy.get(movie.accept).should('be.disabled');
    });

});

// it('Fourth test (try to select non active time) - negative', () => {
//     cy.visit(movie.address);
//     cy.get(days[0].day).click();
//     cy.get(movie.film).last().contains('10:00').should('be.disabled');
// });


