describe('Show List of Shopping Cart Items', () => {
  it('Displays the added products in a list', () => {
    cy.visit('http://localhost:8080/cart');

    // check the listing of items
    cy.get('[data-testid="tblCart"]').contains('td', 'Bread');
    cy.get('[data-testid="tblCart"]').contains('td', 'Milk');
    cy.get('[data-testid="tblCart"]').contains('td', 'Cheese');
    cy.get('[data-testid="tblCart"]').contains('td', 'Soup');
    cy.get('[data-testid="tblCart"]').contains('td', 'Butter');
  });
});

describe('Click the Remove from Cart Button', () => {
  it('Iterates the cart list removing items from the cart', () => {
    cy.wait(2000);
    cy.log('Waiting to Remove items from the cart');
    cy.get('[data-testid="tblCart"] > tbody > tr > td > button').each(
      ($button) => {
        cy.wrap($button).click();
        cy.wait(500);
      }
    );
  });
});
