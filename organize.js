const fs = require("fs");
const path = require("path");

const baseDir = process.argv[2];

if (!baseDir) {
  console.log("Please provide a folder path!");
  process.exit();
}

const extensions = {
  Images: [".jpg", "jpeg", ".png", ".gif"],
  Videos: [".mp4", ".mkv", ".avi"],
  Docs: [".pdf", ".txt", ".doc", ".docx"],
};

const getCategory = (ext) => {
  for (const category in extensions) {
    if (extensions[category].includes(ext)) {
      return category;
    }
  }

  return "Others";
};

try {
  const files = fs.readdirSync(baseDir); // an array of file names

  files.forEach((file) => {
    const srcPath = path.join(baseDir, file);

    if (fs.lstatSync(srcPath).isFile()) {
      const ext = path.extname(file);
      const category = getCategory(ext);

      if (category !== "Others") {
        const targetFolder = path.join(baseDir, category);
        const targetPath = path.join(targetFolder, file);

        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder);
          console.log(`Created folder: ${category}`);
        }

        fs.renameSync(srcPath, targetPath);
        console.log(`Moved : ${file} -> ${category}`);
      }
    }
  });
} catch (err) {
  console.error("Error: ", err.message);
}
