// Install xml2js library
// npm install xml2js

const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false });

// Define xmlPayloads here or import it from another file if necessary
const xmlPayloads = "<Pet> <id>0</id> <Category> <id>0</id> <name>Dog</name> </Category> <name>Jimmy</name> <photoUrls> <photoUrl>string</photoUrl> </photoUrls> <tags> <Tag> <id>0</id> <name>string</name> </Tag> </tags> <status>available</status> </Pet>";

describe("XML Parsing", () => {
    let petid = null;

    before(() => {
        cy.intercept('POST', 'https://petstore.swagger.io/v2/pet').as('createPet');

        cy.request({
            method: "POST",
            url: "https://petstore.swagger.io/v2/pet",
            body: xmlPayloads,
            headers: {
                'Content-Type': "application/xml",
                'accept': 'application/xml'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            return parser.parseStringPromise(response.body); // Use parseStringPromise
        }).then((result) => {
            petid = result.Pet.id;
        });
    });

    it("Fetching Pet data-parsing xml response", () => {
        cy.request({
            method: 'GET',
            url: "https://petstore.swagger.io/v2/pet/" + petid,
            headers: { 'accept': 'application/xml' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                expect(result.Pet.id).equal(petid);
                expect(result.Pet.name).equal("Jimmy");
            });
        });
    });
});
