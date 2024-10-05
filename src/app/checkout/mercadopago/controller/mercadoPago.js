

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// if(!process.env['MERCADO_PAGO_ACCESS_TOKEN']){
//   throw new Error("No se ha definido el token de acceso a Mercado Pago");
// }
// // Agrega credenciales
// const client = new MercadoPagoConfig({ accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'] });

const client = new MercadoPagoConfig({ accessToken: 'TEST-3938643254651357-100419-4237aee644bc3fa980cd2c4195460800-1160718084' });
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
    body:{items}
  }).catch((err) => {
      console.error(err);
      throw new Error("Error al crear la preferencia");});

  return {
    id: result.id
  };
}





