const Entry = require("../models/entry.models");

async function handleCreateEntry(req, res) {
  const { content } = req.body;
  const date = new Date();
  const dateString = date.toLocaleString();

  const entry = await Entry.create({
    content: content,
    date: dateString,
    createdBy: req.user._id,
  });

  res.redirect("/diary");
}
async function handleGetEntry(req, res) {
  const entry = await Entry.find({
    createdBy: req.user._id,
  });

  console.log(entry);

  res.render("mydiary", { entry });
  // res.json({ msg: "Entries fetched", entry });
}

async function handleEditEntry(req, res) {
  const { content, id } = req.body;
  const entry = await Entry.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: { content: content } },
    { new: true }
  );

  res.json(entry);
}

async function handleDeleteEntry(req, res) {
  const { id } = req.body;
  const entry = await Entry.findOneAndDelete({
    _id: id,
  });

  res.json({ message: "Entry deleted successfully", entry });
}

module.exports = {
  handleCreateEntry,
  handleGetEntry,
  handleEditEntry,
  handleDeleteEntry,
};
