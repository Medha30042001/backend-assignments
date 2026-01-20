const express = require("express");

let requestCount = 0;
let startTime = Date.now();

const ratelimitMiddleWare = (req, res, next) => {
  const currentTime = Date.now();

  if (currentTime - startTime > 60 * 1000) {
    requestCount = 0;
    startTime = currentTime;
  }
  requestCount++;

  if (requestCount > 15) {
    return res.status(429).json({
      error: "Too many requests, please try again later",
    });
  }

  next();
};

module.exports = ratelimitMiddleWare;
