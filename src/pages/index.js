import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [isMachineReadable, setIsMachineReadable] = useState(null); 
  const [convertedText, setConvertedText] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState(''); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file); 

    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData, 
    });

    const result = await response.json();
    console.log(result.message); 

    if (result.uploadedUrl) {
      setUploadedUrl(result.uploadedUrl); 
    }
  };

  const handleCheckMachineReadable = async () => {
    if (file) {
      const filePath = file.name; 
      const response = await fetch('/api/checkFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: filePath }), 
      });

      const result = await response.json();
      console.log(result)
      setIsMachineReadable(result.isMachineReadable); 
      console.log(result.message); 
    }
  };

  const handleConvertToMachineReadable = async () => {
    if (file) {
      const filePath = file.name; 
      const response = await fetch('/api/convertFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }), 
      });

      const result = await response.json();
      setConvertedText(result.convertedText); 
      console.log(result.message); 
    }
  };

  const handleExtractData = async () => {
    if (file) {
      const filePath = file.name; 
      const fileType = file.type; 
      const response = await fetch('/api/extractData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, fileType }), 
      });

      const result = await response.json();
      console.log(result.message, result.data); 
    }
  };

  return (
    <div className='h-screen w-full flex flex-col'>
      <div className='flex justify-center items-center w-full '>
      <h1 className='text-4xl my-5'>Upload and Convert Document to Machine-Readable Format</h1>
      </div>
      <div className='w-full p-6 my-2'>
      <div className='flex justify-evenly items-center w-full text-xl'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleCheckMachineReadable} className='bg-white text-black p-2 cursor-pointer'>Check if Machine-Readable</button>
      </div>

      <div className='flex items-center my-6 justify-center'>

      {isMachineReadable === false && (
        <div className='text-2xl my-2 flex flex-col gap-3'>
          <p>This is a non-machine-readable file.</p>
          <button onClick={handleConvertToMachineReadable} className='bg-white text-black p-2 cursor-pointer'>Convert to Machine-Readable</button>
        </div>
      )}
      </div>

      {isMachineReadable && <p>This file is machine-readable!</p>}

      <div className='flex items-center justify-center text-2xl'>

      <button onClick={() => handleUpload(file)} className='bg-white text-black p-2 cursor-pointer mt-10'>Upload File</button>
      </div>

      {uploadedUrl && (
        <div>
          <p>Uploaded to Cloudinary: {uploadedUrl}</p>
          <button onClick={handleExtractData} className='bg-white text-black p-2 cursor-pointer'>Extract Data</button>
        </div>
      )}

      {convertedText && <div><p>Converted Text: {convertedText}</p></div>}
      </div>
    </div>
  );
}
