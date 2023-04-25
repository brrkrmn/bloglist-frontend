// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
      cy.visit('')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`}
    })
    cy.visit('')
})