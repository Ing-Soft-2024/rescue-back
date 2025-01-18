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
  const order = await Order.findByPk(orderId, {
    include: [{
      model: OrderItem,
      include: [{
        model: Product
      }]
    }],
  });

  if (!order) throw new Error("Order not found");
  
  // Get commerceId from the order
  const commerceId = order.businessId;

  // Get seller's MercadoPago credentials
  const sellerCredentials = await MercadoPago.findOne({
    where: { commerceId }
  });

  if (!sellerCredentials) {
    throw new Error("Este comercio aún no tiene configurada su cuenta de MercadoPago");
  }

  // Map items to Mercado Pago format
  const items = order.order_items.map((item) => ({
    title: item.Product.name,
    quantity: Number(item.quantity),
    currency_id: "ARS",
    unit_price: Number(item.price)
  }));

  const client = new MercadoPagoConfig({ 
    accessToken: sellerCredentials.access_token
  });

  const preference = new Preference(client);
  
  try {
    const result = await preference.create({
      body: {
        items,
        back_urls: {
          success: "myapp://screens/checkout/?success=true",
          failure: "myapp://screens/checkout/?failure=true",
          pending: "myapp://screens/checkout/?pending=true",
        },
        notification_url: `${process.env.API_URL}/webhook/mercadopago`,
        auto_return: "approved",
        external_reference: orderId.toString(),
        marketplace: "NONE" // This indicates it's a direct seller payment
      },
    });

    return {
      checkoutURL: result.init_point
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    throw new Error("Error al crear la preferencia de pago: " + error.message);
  }
}

const createPreferenceAsync = async (commerceId, items) => {
  // Get seller's credentials
  const obtainedMercadoPago = await MercadoPago.findOne({
    where: { commerceId }
  });
  
  if (!obtainedMercadoPago) {
    throw new Error("El comercio no tiene cuenta de Mercado Pago asociada");
  }

  // Check if token needs refresh
  if (isTokenExpired(obtainedMercadoPago.expires_in)) {
    await refreshToken(obtainedMercadoPago);
  }

  const client = new MercadoPagoConfig({ 
    //accessToken: process.env.MERCADO_PAGO_APPLICATION_TOKEN,
    accessToken: "APP_USR-2381168209109958-100110-445b988a8b4b1523c406e474b2e7f9ea-1160718084",
  });

  const preference = new Preference(client);
  return await preference.create({
    body: {
      items,
      back_urls: {
        success: "myapp://screens/checkout/?success=true",
        failure: "myapp://screens/checkout/?failure=true",
        pending: "myapp://screens/checkout/?pending=true",
      },
      notification_url: `${process.env.API_URL}/webhook/mercadopago`,
      auto_return: "approved",
      purpose: "MARKETPLACE_PURCHASE",
      //marketplace_fee: Number(process.env.MARKETPLACE_FEE_PERCENTAGE),
      marketplace_fee: 5,
      collector_id: obtainedMercadoPago.user_id,
    },
  });
}





