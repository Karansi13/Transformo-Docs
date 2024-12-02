import Tesseract from 'tesseract.js';

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
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ message: 'No file path provided' });
    }

    try {
      const text = await convertToText(filePath);

      return res.status(200).json({ message: 'Conversion successful', text });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error converting file to machine-readable format' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
