const { app } = require("./app");
const applicationConfigurationFile = require("./config/app.config.json");

app.listen(applicationConfigurationFile.portNumber, () =>
  console.log(
    `Web API created and listen on localhost:${applicationConfigurationFile.portNumber}`,
  ),
);
