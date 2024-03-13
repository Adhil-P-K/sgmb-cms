import fs from "fs";
import mime from "mime-types";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function fileUpload(destination: string) {
  return multer({
    storage: multer.diskStorage({
      destination: destination,
      filename: function (req, file, fn) {
        fn(null, uuidv4() + path.extname(file.originalname));
      },
    }),
  });
}

function getFormFiles(
  formFiles: { [key: string]: Express.Multer.File[] } = {}
): Express.Multer.File[] {
  const files: Express.Multer.File[] = [];
  const fileKeys = Object.keys(formFiles);
  fileKeys.forEach((key) => {
    formFiles[key].forEach((file) => {
      files.push(file);
    });
  });
  return files;
}

function isValidFile(
  file: Express.Multer.File,
  allowedMimeTypes: string[] = [],
  fileSizeLimit?: number
): boolean {
  let isValid = true;
  const mimeType: any = mime.lookup(file.originalname);
  if (
    !allowedMimeTypes.includes(mimeType!) ||
    (fileSizeLimit && file.size > fileSizeLimit)
  ) {
    fs.unlinkSync(file.path);
    isValid = false;
  }
  return isValid;
}
export { fileUpload, isValidFile };
