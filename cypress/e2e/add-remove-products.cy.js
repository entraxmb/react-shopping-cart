describe('Show List of Products', () => {
  it('Displays the products in a list', () => {
    cy.visit('http://localhost:8080');

    // check the listing of items
    cy.get('[data-testid="tblProducts"]').contains('td', 'Bread');
    cy.get('[data-testid="tblProducts"]').contains('td', 'Milk');
    cy.get('[data-testid="tblProducts"]').contains('td', 'Cheese');
    cy.get('[data-testid="tblProducts"]').contains('td', 'Soup');
    cy.get('[data-testid="tblProducts"]').contains('td', 'Butter');
  });
});

describe('Click the Add to Cart Button', () => {
  it('Iterates the product list adding items to the cart', () => {
    cy.wait(2000);
    cy.log('Waiting to Click the Add to Cart buttons');
    cy.get(
      '[data-testid="tblProducts"] > tbody > tr > td > button'
    ).each(($button) => {
      cy.wrap($button).click();
      cy.wait(500);
    });
  });
});

describe('Show List of Shopping Cart Items', () => {
  it('Click the Cart button and sow the added products in a list', () => {
    cy.wait(2000);
    cy.get('[data-testid="btnCart"]').click();

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
    cy.wait(4000);
    cy.log('Waiting to Remove items from the cart');
    cy.get('[data-testid="tblCart"] > tbody > tr > td > button').each(
      ($button) => {
        cy.wrap($button).click();
        cy.wait(500);
      }
    );
  });
});
