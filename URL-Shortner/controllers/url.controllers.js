const { nanoid } = require("nanoid");
const URL = require("../models/url.models");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  const shortID = nanoid(8);
  const entry = await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("index", { id: entry.shortID, result: entry });
}

async function handleRedirectURL(req, res) {
  const shortURL = req.params.shortID;
  const result = await URL.findOneAndUpdate(
    { shortID: shortURL },
    { $push: { visitHistory: { timestamps: Date.now() } } },
    { returnNewDocument: true }
  );

  return res.redirect(result.redirectURL);
}

async function handleURLanalytics(req, res) {
  const shortURL = req.params.shortID;
  const result = await URL.findOne({ shortID: shortURL });

  return res.json({ clicks: result.visitHistory.length });
}

module.exports = {
  handleGenerateShortURL,
  handleRedirectURL,
  handleURLanalytics,
};
