describe('API tests spec (user)', () => {

    it('create new user', () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithArray',
            body:
                [
                    {
                        'id': 101,
                        'username': 'Ivan',
                        'firstName': 'Ivan',
                        'lastName': 'Petrov',
                        'email': 'IvanPetrov@mail.ru',
                        'password': '12345',
                        'phone': '9101234567',
                        'userStatus': 0,
                    },
                ],
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('check user by username - positive', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('check user by username - negative', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Genadiy',
            failOnStatusCode: false,

        }).then(({ status }) => {
            cy.log(status);
            expect(status).to.eq(404);
        });
    });

    it('update user', () => {
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
            body:
                {
                    'id': 101,
                    'username': 'Ivan',
                    'firstName': 'Ivan Ivanovich',
                    'lastName': 'Petrov',
                    'email': 'IvanPetrov@mail.ru',
                    'password': '12345',
                    'phone': '9100000000',
                    'userStatus': 0,
                },

        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('check user by username after updating', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        });
    });

    it('delete user by username', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
        }).then(({ status }) => {
            cy.log(status);
            expect(status).to.eq(200);
        });
    });

    it('check user by username after deleting', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/Ivan',
            failOnStatusCode: false,
        }).then(({ status }) => {
            cy.log(status);
            expect(status).to.eq(404);
        });
    });
});
