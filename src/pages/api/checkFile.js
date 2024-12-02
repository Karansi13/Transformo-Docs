import path from 'path';

const isMachineReadable = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  return ['.txt', '.csv', '.json'].includes(ext);
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    try {
      const filePath = path.resolve('./uploads', file);

      const isReadable = isMachineReadable(filePath);

      if (isReadable) {
        return res.status(200).json({
          message: 'File is machine-readable',
          isMachineReadable: true, 
        });
      } else {
        return res.status(200).json({
          message: 'File is not machine-readable. Conversion required.',
          isMachineReadable: false, 
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error processing file' });
    }
  } else {
    // If the method isn't POST, return 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
