import fs from 'fs';

const extractDataFromTextFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return reject('Error reading file');
      resolve(data);
    });
  });
};

const extractDataFromCSV = (filePath) => {
  const csv = require('csv-parser');
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { filePath, fileType } = req.body;

    console.log('File Path:', filePath, 'File Type:', fileType);

    if (!filePath || !fileType) {
      return res.status(400).json({ message: 'Missing file path or file type' });
    }

    try {
      let extractedData;
      if (fileType === 'txt') {
        extractedData = await extractDataFromTextFile(filePath);
      } else if (fileType === 'csv') {
        extractedData = await extractDataFromCSV(filePath);
      } else {
        return res.status(400).json({ message: 'Unsupported file type' });
      }

      return res.status(200).json({ message: 'Data extraction successful', data: extractedData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error extracting data from file' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
