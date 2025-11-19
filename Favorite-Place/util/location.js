const API_KEY = 'd91407ba7f5f4f42b7a302c29b037248';

export function getMapPreview(lat, lng) {
  // `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  const imagePreviewUrl =`https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=400&height=200&center=lonlat:${lng},${lat}&zoom=14&marker=lonlat:${lng},${lat};color:%23ff0000&apiKey=${API_KEY}`
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  console.log("from getAdress : " , [lat, lng]);

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  console.log("data : " , data);
  
  const address = data.features[0].properties.formatted;;
  console.log("address : " ,address);
  
  return address;
}
