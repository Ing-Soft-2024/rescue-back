

// SDK de Mercado Pago
import MercadoPago from 'database/models/mercadopago.model';
import Order from 'database/models/order.model';
import OrderItem from 'database/models/order_item.model';
import Product from 'database/models/product.model';
import { MercadoPagoConfig, Preference } from 'mercadopago';

if (!process.env['MERCADO_PAGO_ACCESS_TOKEN']) {
  throw new Error("No se ha definido el token de acceso a Mercado Pago");
}

//const client = new MercadoPagoConfig({ accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'] });
export const createPreference = async (data) => {  
  const orderId = data.orderId;
  const commerceId = data.commerceId;
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
      "title": product.getDataValue('name'),
      "quantity": Number(item.quantity),
      "currency_id": "ARS",
      "unit_price": Number(item.price)
    };
  });
  const items = await Promise.all(itemsAsync);
  const result = await createPreferenceAsync(items, commerceId);

  return {
    checkoutURL: result.init_point
  };
}

const createPreferenceAsync = async (commerceId, items) => {
  const obtainedMercadoPago = await MercadoPago.findOne({
    "where": {
      "userId": commerceId
    }
  }).catch(() => { throw new Error("No se pudo obtener la información del comercio") });
  if(!obtainedMercadoPago) throw new Error("No se pudo obtener la información del comercio");
  
  // Agrega credenciales
  const client = new MercadoPagoConfig({ 
    accessToken: obtainedMercadoPago.access_token,
  });
  const preference = new Preference(client);
  return await preference.create({
    body: {
      items,
      "back_urls":
      {
        "success": "myapp://screens/checkout/?success=true",
        "failure": "myapp://screens/checkout/?failure=true",
        "pending": "myapp://screens/checkout/?pending=true",
      },
      "auto_return": "approved",
      "purpose": "PURCHASE",
      "marketplace_fee": 5,
    },
  }).catch((err) => {
    console.error(err);
    throw new Error("Error al crear la preferencia");
  });
}





