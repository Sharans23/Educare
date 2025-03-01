// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "../uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
//     }
// });

// const filter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const uploadMiddleware = multer({ 
//     storage,
//     fileFilter: filter,
// });

// export default uploadMiddleware;
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
    // destination: "uploads/", // Ensure this folder exists
    // filename: (req, file, cb) => {
    //     cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    // },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    cb(null, allowedTypes.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

export default upload;