const URL = require("../models/url.models");

async function handleRenderHTML(req, res) {
  if(!req.user) return res.redirect("/user/login");
  const urls = await URL.find({ createdBy: req.user._id });
  return res.render("index", { urls });
}

async function handleRenderSignup(req, res) {
  return res.render("signup");
}
async function handleRenderLogin(req, res) {
  return res.render("login");
}

module.exports = { handleRenderHTML, handleRenderLogin, handleRenderSignup };
