describe("Authentication", () => {

  it("Basic Authentication", () => {
    cy.request({
      method: 'GET',
      url: 'https://postman-echo.com/basic-auth',
      auth: {
        user: 'postman',
        pass: 'password'
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
    });
  });

  it("Digest Authentication", ()=>{
    cy.request({

      method: 'GET',
      url: 'https://postman-echo.com/basic-auth',
      auth:{
        user: 'postman',
        pass:'password',
        method: 'degest'
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
    });
  });

  const token = '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';
  it("Bearer Token Auth", () => {
    cy.request({
      method: 'GET',
      url: 'https://api.github.com/user/repos',
      headers: {
        Authorization: 'Bearer ' + token 
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
    })
  })

})
