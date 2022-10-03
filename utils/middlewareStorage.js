import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const almacen = multer.diskStorage({
  destination: function (req, file, cb) {
    const upload = `${__dirname}/../uploads`;
    cb(null, upload);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const filename = `file-${Date.now()}.${ext}`
    cb(null, filename)
  },
});

const uploadMiddlewares = multer({storage: almacen});

export default uploadMiddlewares;
