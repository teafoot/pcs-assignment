/// <reference types="cypress" />

describe("Validate themobileshop.ca website phone filters functionality", () => {
    it("Verify that the Brand/OS filters work", () => {
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
    })

    it("Verify that the phone carrier filter works", () => {
        cy.visit("https://www.themobileshop.ca/en/phones/")
        cy.url().should("include", "themobileshop.ca")
        cy.get("button").contains("Clear All").click() // reset previous filters

        let total_phones_count = 23
        cy.xpath("//div[contains(@class, 'PhoneCount')]").should("contain", `${total_phones_count} Phones Found`)

        cy.get("p").contains("Freedom Mobile").click() // activate checkbox
        total_phones_count = 19
        cy.xpath("//div[contains(@class, 'PhoneCount')]").should("contain", `${total_phones_count} Phones Found`)
    })

    it("Verify that the PC Optimum Points filter works", () => {
        cy.visit("https://www.themobileshop.ca/en/phones/")
        cy.url().should("include", "themobileshop.ca")
        cy.get("button").contains("Clear All").click() // reset previous filters

        // first product by default doesn't have PC Optimum Points
        cy.xpath("//div[contains(@class, 'ProductWrapper')][contains(@class, 'phonePage')]")
            .first()
            .find("span")
            .should("not.contain", "Earn up to")

        cy.get("p").contains("PC Optimum Points").click() // activate checkbox
        cy.xpath("//div[contains(@class, 'ProductWrapper')][contains(@class, 'phonePage')]")
            .first()
            .find("span")
            .should("contain", "Earn up to")
    })

    // combine some advanced filters together e.g. reach the phone: motorola mogo g power (large battery, small storage, large screen)
    it("Verify that the Advanced filters work", () => {
        cy.visit("https://www.themobileshop.ca/en/phones/")
        cy.url().should("include", "themobileshop.ca")
        cy.get("button").contains("Clear All").click() // reset previous filters

        cy.get("p").contains("Battery").click() // open drawer
        cy.get("p").contains("Large (3500+ mAh)").click() // select Large battery
        cy.get("p").contains("Storage").click() // open drawer
        cy.get("p").contains("Regular (32+ GB)").click() // select Regular storage size
        cy.get("p").contains("Screen Size").click() // open drawer
        cy.get("p").contains("Large (6.5\"+)").click() // select Large screen size

        cy.xpath("//div[contains(@class, 'ProductWrapper')][contains(@class, 'phonePage')]")
            .first()
            .find("h4")
            .should("contain", "motorola")
        cy.xpath("//div[contains(@class, 'ProductWrapper')][contains(@class, 'phonePage')]")
            .first()
            .find("p")
            .should("contain", "moto g power")            
    })
})