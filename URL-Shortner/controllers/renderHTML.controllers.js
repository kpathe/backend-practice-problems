const URL = require("../models/url.models");

async function handleRenderHTML(req, res) {
  const urls = await URL.find({});
  console.log(urls)
  return res.render("index", {urls});
}

module.exports = handleRenderHTML;
