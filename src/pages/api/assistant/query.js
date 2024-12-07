export default async function handler(req, res) {
    if (req.method === 'POST') {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      console.log(data)
      res.status(200).json(data);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }