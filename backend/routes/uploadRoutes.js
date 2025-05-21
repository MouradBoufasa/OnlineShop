const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

require('dotenv').config();

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Multer setupusing memory storage

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'NO FILE UPLOADED' });
    }

    //Function to handle the stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        //   Use streamifier to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    //Call the streamUpload function
    const result = await streamUpload(req.file.buffer);
    console.log(
      'storage object:',
      storage,
      '////////////////////',
      'upload object:',
      upload,
      '/////////////////',
      'result object:',
      result
    );
    //Respond with the upload image URL
    res.json({ imageURL: result.secure_url });
  } catch (error) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
});

module.exports = router;
