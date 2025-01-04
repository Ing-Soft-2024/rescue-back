import NodeGeocoder from "node-geocoder";

const options = {
  provider: 'locationiq',

  // Optional depending on the providers
 
  apiKey: process.env.LOCATIONIQ_API_KEY, // for Mapquest, OpenCage, APlace, Google Premier
};

const geocoder = NodeGeocoder(options);
const getCoordinates = async (country, city, address) => {



    const res = await geocoder.geocode(`${address}, ${city}, ${country}`);
    return res;
}


export { getCoordinates };