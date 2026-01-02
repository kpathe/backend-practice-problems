const fs = require("fs");
const fsmove = require("fs-extra");
const path = require("node:path");

const filepath = process.argv[2];

// reading folder
const folder = fs.readdirSync(filepath);

// categorising files according to extension names

const img = [];
const vid = [];
const doc = [];

for (const file of folder) {
  switch (true) {
    case path.extname(`${filepath}\\${file}`) === ".jpg":
      img.push(file);
      break;
    case path.extname(`${filepath}\\${file}`) === ".mp4":
      vid.push(file);
      break;
    case path.extname(`${filepath}\\${file}`) === ".pdf":
      doc.push(file);
      break;

    default:
      break;
  }
}

// making folders
fs.mkdirSync(`${filepath}\\Images`);
fs.mkdirSync(`${filepath}\\Videos`);
fs.mkdirSync(`${filepath}\\Docs`);


// moving files
for (const image of img) {
  fsmove.moveSync(`${filepath}\\${image}`, `${filepath}\\Images\\${image}`);
}
for (const video of vid) {
  fsmove.moveSync(`${filepath}\\${video}`, `${filepath}\\Videos\\${video}`);
}
for (const document of doc) {
  fsmove.moveSync(`${filepath}\\${document}`, `${filepath}\\Docs\\${document}`);
}
