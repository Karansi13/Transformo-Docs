import Tesseract from 'tesseract.js';
import path from 'path';
import os from 'os';
import fs from 'fs';

const convertToText = async (filePath) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(filePath, 'eng', { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => resolve(text))
      .catch((error) => reject(error));
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ message: 'No file name provided' });
    }

    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const absoluteFilePath = path.join(downloadsPath, fileName);

    try {
      const text = await convertToText(absoluteFilePath);

      // Save as CSV
      const csvFilePath = absoluteFilePath.replace(path.extname(fileName), '.csv');
      fs.writeFileSync(csvFilePath, `Content\n"${text}"`);

      return res.status(200).json({
        message: 'File converted successfully to CSV',
        convertedFilePath: csvFilePath,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error converting file to machine-readable format',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
