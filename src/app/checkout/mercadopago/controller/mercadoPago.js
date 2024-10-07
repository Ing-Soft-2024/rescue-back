

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

if(!process.env['MERCADO_PAGO_ACCESS_TOKEN']){
  throw new Error("No se ha definido el token de acceso a Mercado Pago");
}
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'] });

//const client = new MercadoPagoConfig({ accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'] });
export const createPreference = async (data) => {

  // return {
  //   id: 3
  // };

  // if(!Boolean(data.items?.length)){
  //   console.log("data: ", data.items);
  //   console.log("data lenght: ", data.items?.length);
  //   throw new Error("No hay productos en el carrito");
  // }
  // console.log("data: ", data);
  var items = [];
  
  for (let index = 0; index < 1; index++) {
    const element = {
      title: "Producto " + data.orderId,
      quantity: Number(data.quantity),
      currency_id: "ARS",
      unit_price: Number(data.price)
    };
    items.push(element);
    };
    
  
  console.log("items: ", items);
  const preference = new Preference(client);
  const result = await preference.create({
    body:{
      items,
      // "back_urls": 
      // {
      //   "success": "https://google.com",
      //   "failure": "http://www.tu-sitio/failure",
      //   "pending": "http://www.tu-sitio/pending"
      // },
      // "auto_return": "approved",
    }
  }).catch((err) => {
      console.error(err);
      throw new Error("Error al crear la preferencia");});

      console.log("return: ", result);

  return {
    checkoutURL: result.init_point
  };
}





