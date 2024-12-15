import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure /public/temp directory exists
const tempDir = path.join(__dirname, "../../tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

export const upload = multer({ storage })