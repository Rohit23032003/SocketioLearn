import multer from 'multer';
import path from 'path'; // Import the 'path' module

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage});
export default upload ;

