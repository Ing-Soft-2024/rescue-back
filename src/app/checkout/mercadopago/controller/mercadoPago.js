

// SDK de Mercado Pago
import Order from 'database/models/order.model';
import OrderItem from 'database/models/order_item.model';
import Product from 'database/models/product.model';
import { MercadoPagoConfig, Preference } from 'mercadopago';

if (!process.env['MERCADO_PAGO_ACCESS_TOKEN']) {
  throw new Error("No se ha definido el token de acceso a Mercado Pago");
}
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'] });

//const client = new MercadoPagoConfig({ accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'] });
export const createPreference = async (data) => {

  const orderId = data.orderId;
  const orderItems = await Order.findByPk(orderId, {
    include: [{
      model: OrderItem,
      include: [{
        model: Product
      }]
    }],
  });


  const itemsAsync = orderItems.getDataValue('order_items').map(async (item) => {
    const product = await Product.findByPk(item.productId);
    if (!product) throw new Error("Product not found");

    return {
      title: product.getDataValue('name'),
      quantity: Number(item.quantity),
      currency_id: "ARS",
      unit_price: Number(item.price)
    };
  });

  const items = await Promise.all(itemsAsync);
  // return {
  //   id: 3
  // };

  // if(!Boolean(data.items?.length)){
  //   console.log("data: ", data.items);
  //   console.log("data lenght: ", data.items?.length);
  //   throw new Error("No hay productos en el carrito");
  // }
  // console.log("data: ", data);
  // var items = [];
  // console.log("Creando petición");

  // for (let index = 0; index < 1; index++) {
  //   const element = {
  //     title: "Producto " + data.orderId,
  //     quantity: Number(data.quantity),
  //     currency_id: "ARS",
  //     unit_price: Number(total)
  //   };
  //   items.push(element);
  // };

  console.log("items", items);

  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items,
      "back_urls":
      {
        // Cambio de url empieza con rescue://
        // Si empieza con rescue:// me fjo si trae algún parámetro
        // Si es success = true, se redirige al success
        // Si es success = false, se redirige al failure
        // Si es pending = true, se pone un spinner
        // "success": "rescueapp://checkout/mercadopago/?success=true",
        //"success": "myapp://login-screen",
        //"success": "myapp://screens/checkout/success",
        "success": "myapp://screens/checkout/?success=true",
        "failure": "myapp://screens/checkout/?failure=true",
        "pending": "myapp://screens/checkout/?pending=true",
      },

      "auto_return": "approved",
    }
  }).catch((err) => {
    console.error(err);
    throw new Error("Error al crear la preferencia");
  });

  console.log("return: ", result);

  return {
    checkoutURL: result.init_point
  };
}





