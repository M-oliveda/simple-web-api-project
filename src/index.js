const express = require("express");
const app = express();

const applicationConfigurationFile = require("./config/app.config.json");

const secrets = new Map();

function generateNewKey() {
  return [...Array(applicationConfigurationFile.secretKeyLength)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

app.use(express.json());

app.post("/api/secrets", (req, resp) => {
  const key = generateNewKey(),
    message = req.body.message;

  secrets.set(key, message);

  resp.status(201);
  resp.send(JSON.stringify({ secretKey: key }));
});

app.get("/api/secret/:secretkey", (req, resp) => {
  const secretKey = req.params.secretkey;

  if (secrets.has(secretKey)) {
    resp.status(200);
    resp.send(JSON.stringify({ secretMessage: secrets.get(secretKey) }));
    secrets.delete(secretKey);
  } else {
    resp.status(404);
    resp.send(
      JSON.stringify({
        errorMessage: "The key was already used and it is deleted.",
      }),
    );
  }
});

app.listen(applicationConfigurationFile.portNumber, () =>
  console.log(
    `Web API created and listen on localhost:${applicationConfigurationFile.portNumber}`,
  ),
);
