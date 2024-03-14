const { app } = require("../app");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

let secretKey = null;

describe("POST /api/secrets/", () => {
  it("Should return a new secret key", async () => {
    const response = await requestWithSupertest
      .post("/api/secrets")
      .send({ message: "This is my message." });

    expect(response.type).toEqual(expect.stringContaining("json"));
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("secretKey");

    secretKey = response.body.secretKey;
  });
});

describe("GET /api/secret/:secretKey", () => {
  it("At the first time, should return the message:", async () => {
    const response = await requestWithSupertest.get(`/api/secret/${secretKey}`);

    expect(response.type).toEqual(expect.stringContaining("json"));
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("secretMessage");
  });

  it("At the second try, should return 404:", async () => {
    const response = await requestWithSupertest.get(`/api/secret/${secretKey}`);

    expect(response.type).toEqual(expect.stringContaining("json"));
    expect(response.statusCode).toBe(404);
  });
});
