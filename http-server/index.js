const http = require("http");
const fs = require("fs");

let ContentOfHome = "";
let ContentOfProject = "";
let ContentOfRegistration = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  ContentOfHome = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  ContentOfProject = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  ContentOfRegistration = registration;
});

const args = process.argv.slice(2);
const portIndex = args.findIndex((arg) => arg === "--port");

const port = portIndex !== -1 ? args[portIndex + 1] : 3000;

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(ContentOfProject);
        response.end();
        break;
      case "/registration":
        response.write(ContentOfRegistration);
        response.end();
        break;
      default:
        response.write(ContentOfHome);
        response.end();
        break;
    }
  })
  .listen(port, () => {});
