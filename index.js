'use strict';

const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

/**
 * Gets the weather forecast from the Dark Sky API for the given location.
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 */
function getDefault(req, resp) {
    console.log('FUNCIONA');
    resp.sendFile(__dirname + '/index.html');
    //resp.json({});
    // https://medium.com/dev-channel/learn-how-to-build-a-pwa-in-under-5-minutes-c860ad406ed
    // https://www.twilio.com/blog/2018/06/installable-web-apps-practical-introduction-progressive-web-apps.html
  }

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
    const app = express();
  
    // Redirect HTTP to HTTPS,
    app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
  
    // Logging for each request
    app.use((req, resp, next) => {
      const now = new Date();
      const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
      const path = `"${req.method} ${req.path}"`;
      const m = `${req.ip} - ${time} - ${path}`;
      // eslint-disable-next-line no-console
      console.log(m);
      next();
    });
  
    // Handle requests for the data
    app.get('/', getDefault);
  
    // Handle requests for static files
    app.use(express.static(__dirname + '/public'));
  
    // Start the server
    return app.listen('8000', () => {
      // eslint-disable-next-line no-console
      console.log('Local DevServer Started on port 8000...');
    });
  }
  
  startServer();