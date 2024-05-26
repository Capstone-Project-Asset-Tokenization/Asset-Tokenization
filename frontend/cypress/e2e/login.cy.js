describe('Login Page', function() {
  it('Login field with unverified email', function() {
    // Visit the login page
    cy.visit('/signin')

    // Fill in the username
    cy.get('input[name=usernameOrEmail]')
      .type('jeba@gmail.com')

    // Fill in the password
    cy.get('input[name=password]')
      .type('12345678')

    // Submit the form
    cy.get('button[type=submit]').click()

    // Check if the login failed due to unverified email
    cy.contains('Signin Failed! Email is not verified. Please check your email')
      .should('be.visible')
  })

  it('Wrong password login', function() {
    // Visit the login page
    cy.visit('/signin')

    cy.get('input[name=usernameOrEmail]')
      .type('jebessadejene2021@gmail.com')

    cy.get('input[name=password]')
      .type('wrongPassword')

    cy.get('button[type=submit]').click()

    cy.contains('Signin Failed! Wrong password')
    .should('be.visible')
  })

  it('User not exist login', function() {
    // Visit the login page
    cy.visit('/signin')

    cy.get('input[name=usernameOrEmail]')
      .type('notexist@gmail.com')

    cy.get('input[name=password]')
      .type('passwrod')

    cy.get('button[type=submit]').click()

    cy.contains('Signin Failed! There is no user with this email')
    .should('be.visible')
  })

  it('Successful login', function() {
    // Visit the login page
    cy.visit('/signin')

    cy.get('input[name=usernameOrEmail]')
      .type('jebessadejene2021@gmail.com')

    cy.get('input[name=password]')
      .type('12345678')

    cy.get('button[type=submit]').click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
  })
})

