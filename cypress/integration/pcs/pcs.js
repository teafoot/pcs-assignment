/// <reference types="cypress" />

describe("Validate themobileshop.ca website functionality", () => {
    it("Verify that the phone filters work", () => {
        cy.visit("https://www.themobileshop.ca/en/phones/apple/")
        cy.url().should("include", "themobileshop.ca")

        // before filtering results
        cy.xpath("//p[contains(text(),'iPhone')]").should("have.length.greaterThan", 0) // Apple iphones

        // after filter empty results
        cy.get("p").contains("Apple").click() // deactivate checkbox
        cy.get("p").contains("Samsung").click()
        cy.get("p").contains("iOS").click()
        //
        cy.xpath("//div[contains(@class, 'PhoneCount')][contains(normalize-space(),'0 Phones Found')]").should("exist")        
        cy.get("#errorMsg > *").contains("Oh no! We couldn't find any phones. Try removing some filters").should("exist")
    });

    it("Verify that the phone filters and navigation to specific device work", () => {
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