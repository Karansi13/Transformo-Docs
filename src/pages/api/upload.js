import multer from 'multer';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, 
  });
  
  export const config = {
    api: {
      bodyParser: false, 
    },
  };
  
  export default function handler(req, res) {
    if (req.method === 'POST') {
      upload.single('file')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error in file upload', error: err.message });
        }
  
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
  
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'auto',
            public_id: `uploads/${req.file.originalname}`,
          },
          (cloudinaryError, result) => {
            if (cloudinaryError) {
              return res.status(500).json({ message: 'Error uploading file to Cloudinary', error: cloudinaryError });
            }
  
            return res.status(200).json({ message: 'File uploaded successfully', url: result.secure_url });
          }
        );
  
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }