const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('json/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom middleware


// reading rewrites.json file and parsing it to JSON
// then using jsonServer.rewriter() to handle rewrites
const rewrites = JSON.parse(fs.readFileSync('json/routes.json'));
server.use(jsonServer.rewriter(rewrites));

// Uses router to handle routes
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running at http://localhost:3000');
});
