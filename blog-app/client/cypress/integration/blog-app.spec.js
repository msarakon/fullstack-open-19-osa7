describe('blog-app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Test',
      username: 'cypress',
      password: 'foobar'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('foobar')
      cy.contains('log in').click()
    })

    it('name of the logged in user is shown', function() {
      cy.contains('Cypress Test logged in')
    })

    it('user information can be viewed', function() {
      cy.contains('users').click()
      cy.get('table a:first').click()
      cy.contains('nothing yet!')
    })

    describe('with a blog created', function() {
      beforeEach(function() {
        cy.contains('create a new blog').click()
        cy.get('#new-blog-title').type('Lorem ipsum')
        cy.get('#new-blog-author').type('Dolor sit Amet')
        cy.get('#new-blog-url').type('www.google.fi')
        cy.contains('save').click()
      })

      it('a blog can be liked', function() {
        cy.contains('Lorem ipsum (Dolor sit Amet)').click()
        cy.get('#like-button').click()
        cy.contains('blog has 1 like(s)')
      })

      it('a blog can be commented', function() {
        cy.contains('Lorem ipsum (Dolor sit Amet)').click()
        cy.get('#new-comment').type('hello world')
        cy.get('#save-comment').click()
        cy.contains('hello world')
      })

      it('the blog name is displayed on the user page', function() {
        cy.contains('users').click()
        cy.get('table a:first').click()
        cy.contains('Lorem ipsum')
      })
    })
  })
})