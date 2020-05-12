


/**
 * Server configuration
 */
class ServerConfiguration {
  constructor(app, portNumber) {
    this.server = app.listen(portNumber, () => console.log(`Server listening on port ${portNumber}...`));
  }

  closeServer() {
    this.server.close();
  }
}

module.exports = ServerConfiguration;
