export default async function handler(req, res) {
	try {
	  const apiResponse = await fetch('https://mockapi.io/projects/659e8d2b47ae28b0bd36245f');
	  const data = await apiResponse.json();
	  res.status(200).json(data);
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  }