/** @format */

const express = require("express");
const router = express.Router();

const URLShortnerController = require("../controllers/URLShortnerController");
const URLShortnerService = require("../services/URLShortnerService");
const Storage = require("../database/Storage");
const UniqueIDGenerator = require("../utils/UniqueIDGenerator");
const { base_url } = require("../config");

const urlShortnerService = new URLShortnerService(
  new Storage(),
  new UniqueIDGenerator(6),
  base_url
);

const urlShortnerController = new URLShortnerController(urlShortnerService);

// Encode route
router.post("/encode", async (req, res) => {
  await urlShortnerController.encode(req, res);
});

// Decode route
router.post("/decode", async (req, res) => {
  await urlShortnerController.decode(req, res);
});

// Decode route and redirect to original URL
router.get("/:slug", async (req, res) => {
  await urlShortnerController.redirect(req, res);
});

// Stats route
router.get("/statistic/:slug", async (req, res) => {
  await urlShortnerController.statistic(req, res);
});


module.exports = router;
