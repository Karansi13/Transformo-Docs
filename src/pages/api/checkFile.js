import pdfParse from 'pdf-parse';
import multer from 'multer';
import * as textract from 'textract';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error processing file', error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      try {
        const fileBuffer = req.file.buffer;
        const fileType = req.file.mimetype;
        
        // Check if the file is a PDF
        if (fileType === 'application/pdf') {
          const data = await pdfParse(fileBuffer);
          if (data.text && data.text.trim().length > 0) {
            return res.status(200).json({
              message: 'File is machine-readable.',
              isMachineReadable: true,
            });
          }
          return res.status(200).json({
            message: 'File is not machine-readable.',
            isMachineReadable: false,
          });
        }

        // Check if the file is a text file (plain text)
        if (fileType === 'text/plain') {
          const fileContent = fileBuffer.toString();
          if (fileContent && fileContent.trim().length > 0) {
            return res.status(200).json({
              message: 'File is machine-readable.',
              isMachineReadable: true,
            });
          }
          return res.status(200).json({
            message: 'File is not machine-readable.',
            isMachineReadable: false,
          });
        }

        // Check if the file is an image
        if (fileType.startsWith('image/')) {
          return res.status(200).json({
            message: 'File is an image. Cannot check machine-readability directly.',
            isMachineReadable: false,
          });
        }

        // Check if the file is a Word document (docx)
        if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          textract.fromBufferWithMime(fileType, fileBuffer, function (err, text) {
            if (err || !text || text.trim().length === 0) {
              return res.status(200).json({
                message: 'File is not machine-readable.',
                isMachineReadable: false,
              });
            }
            return res.status(200).json({
              message: 'File is machine-readable.',
              isMachineReadable: true,
            });
          });
          return; 
        }

        // Dealing with 4 file types for now

        return res.status(400).json({ message: 'Unsupported file type.' });
      } catch (error) {
        return res.status(500).json({ message: 'Error processing file', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
