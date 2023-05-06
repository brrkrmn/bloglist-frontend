describe("Bloglist", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user1 = {
      username: "root",
      password: "sekret",
    };
    const user2 = {
      username: "berra",
      password: "berra",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("login page is opened", function () {
    cy.contains("Login");
  });

  it("user can login with right credentials", function () {
    cy.get("#username").type("root");
    cy.get("#password").type("sekret");
    cy.get("#loginButton").click();
    cy.contains("root is logged in");
  });

  it("user cannot login with wrong credentials", function () {
    cy.get("#username").type("root");
    cy.get("#password").type("secrett");
    cy.get("#loginButton").click();
    cy.contains("Invalid Username or Password");
    // cy.get('.fail').should('contain', 'Invalid Username or Password')
  });

  describe("when user is logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "sekret" });
    });

    it("a new blog can be added", function () {
      cy.contains("Add Blog").click();
      cy.get("#title").type("cy title");
      cy.get("#author").type("cy author");
      cy.get("#url").type("cy url");
      cy.get("#blogButton").click();
      cy.contains("cy title");
      cy.contains("View").click();
      cy.contains("cy author");
      cy.contains("cy url");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.addBlog({ title: "cy title", author: "cy title", url: "cy url" });
      });

      it("blog can be liked", function () {
        cy.contains("View").click();
        cy.get("#like").click();
        cy.contains("likes: 1");
      });

      it("blog can be deleted by its user", function () {
        cy.contains("View").click();
        cy.contains("Delete Blog").click();
        cy.get("html").should("not.contain", "cy title");
      });

      it("blog cannot be deleted by other users", function () {
        cy.contains("Log Out").click();
        cy.login({ username: "berra", password: "berra" });
        cy.contains("cy title").parent().contains("View").click();
        cy.contains("cy title").parent().should("not.contain", "Delete Blog");
      });
    });

    describe("and multiple blogs exist", function () {
      beforeEach(function () {
        cy.addBlog({ title: "least likes", author: "cy", url: "cy" });
        cy.addBlog({ title: "medium likes", author: "cy", url: "cy" });
        cy.addBlog({ title: "most likes", author: "cy", url: "cy" });
        cy.contains("least likes").parent().contains("View").click();
        cy.contains("medium likes").parent().contains("View").click();
        cy.contains("most likes").parent().contains("View").click();
      });

      it("blogs are ordered from most likes to least", function () {
        cy.contains("most likes").parent().contains("Like").click();
        cy.contains("most likes").parent().contains("1");

        cy.contains("medium likes").parent().contains("Like").click();
        cy.contains("medium likes").parent().contains("1");

        cy.contains("most likes").parent().contains("Like").click();
        cy.contains("most likes").parent().contains("2");

        cy.get(".blog").eq(0).should("contain", "most likes");
        cy.get(".blog").eq(1).should("contain", "medium likes");
        cy.get(".blog").eq(2).should("contain", "least likes");
      });
    });
  });
});
