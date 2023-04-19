const path = require('path');
const multer = require('multer');
const mkdirp = require('mkdirp');
// const { checkIfUploadAllowed } = require('../../utils');

// define disk storage strategy for multer
const storage = multer.diskStorage({
  destination(req, file, callback) {
    // callback(null, './uploads')

    const dest = path.join(__dirname, '../../../uploads');
    mkdirp(dest)
      .then((made) => callback(null, './uploads'))
      .catch((err) => callback(err, './uploads'));
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}_${Date.now()}_${file.originalname.replace(/\s/g, '')}`
    );
  }
});

// const fileFilter = (req, file, callback) => {
//   const { isValid, error } = checkIfUploadAllowed(file, req.user);
//   callback(error || null, isValid);
// };

const upload = multer({ storage
  // , fileFilter 
});

module.exports = { upload };