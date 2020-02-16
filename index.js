'use strict';

const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

/**
 * Gets the weather forecast from the Dark Sky API for the given location.
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 */
function getDefault(req, resp) {
    resp.sendFile(__dirname + '/public/index.html');
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
  admin.initializeApp();
  startServer();