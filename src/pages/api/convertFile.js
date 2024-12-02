import Tesseract from 'tesseract.js';
import path from 'path';
import os from 'os';

const convertToText = async (filePath) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      filePath,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      resolve(text);
    }).catch((error) => {
      reject(error);
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received request body:', req.body); 

    const { fileName } = req.body; 

    if (!fileName) {
      return res.status(400).json({ 
        message: 'No file name provided',
        receivedBody: req.body 
      });
    }

    // Construct path to Downloads folder
    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const absoluteFilePath = path.join(downloadsPath, fileName);

    console.log('Attempting to open file at path:', absoluteFilePath);

    try {
      const text = await convertToText(absoluteFilePath);
      return res.status(200).json({ message: 'Conversion successful', text });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        message: 'Error converting file to machine-readable format', 
        error: error.message,
        attemptedPath: absoluteFilePath
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}