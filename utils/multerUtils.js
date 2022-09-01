const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../uploads");
//   },
//   filename: (req, file, callback) => {
//     callback(
//       null,
//       // req.params.id + "_" +
//       file.originalname
//     );
//   },
// });

// let fileFilter = function (req, file, cb) {
//   var allowedMimes = ["text/pdf", "text/txt"];
//   if (allowedMimes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       {
//         success: false,
//         message: "Invalid file type. Only pdf, txt image files are allowed.",
//       },
//       false
//     );
//   }
// };

// let obj = {
//   storage: storage,
//   limits: {
//     fileSize: 500 * 1024 * 1024,
//   },
//   fileFilter: fileFilter,
// };

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
  var allowedMimes = ["text/pdf", "text/plain"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        message: "Invalid file type. Only pdf, txt files are allowed.",
      },
      false
    );
  }
};

let obj = {
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
  fileFilter: fileFilter,
};

const upload = multer(obj).array("notes", 10);

module.exports = { multerUpload: upload };
