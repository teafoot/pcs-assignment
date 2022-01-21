/// <reference types="cypress" />

describe("Validate themobileshop.ca website navigation functionality", () => {
    it("Verify that navigating to a specific device page works", () => {
        cy.visit("https://www.themobileshop.ca/en/phones/apple/")
        cy.url().should("include", "themobileshop.ca")

        const DEVICE_MODEL = "Galaxy S21+ 5G"

        // filter for specific device
        cy.get("p").contains("Apple").click() // deactivate checkbox
        cy.get("p").contains("Samsung").click()
        cy.get("p").contains(DEVICE_MODEL).should("exist").click() // navigate to phone details page

        cy.url().should("include", "samsung-galaxy-s21-plus-5g")
        cy.get("span[class='model']").should("contain", DEVICE_MODEL)
    });
})