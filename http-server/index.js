const http = require("http");
const fs = require("fs");
const args = process.argv.slice(2);
const portIndex = args.findIndex((arg) => arg === "--port");

let contentOfHome = "";
let contentOfProject = "";
let contentOfRegistration = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  contentOfHome = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  contentOfProject = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  contentOfRegistration = registration;
});

const port = portIndex !== -1 ? args[portIndex + 1] : 3000;

const server = http.createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "./project.html":
        response.write(contentOfProject);
        response.end();
        break;
      case "./registration.html":
        response.write(contentOfRegistration);
        response.end();
        break;
      default:
        response.write(contentOfHome);
        response.end();
        break;
    }
  })
server.listen(port);
