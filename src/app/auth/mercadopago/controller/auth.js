import MercadoPago from 'database/models/mercadopago.model';
import { MercadoPagoConfig, OAuth } from 'mercadopago';

export const authenticateOnMercadoPago = async ({
    client_secret,
    client_id,
    code,
    redirect_uri,
    commerceId
}) => {
    const client = new MercadoPagoConfig({ 
        accessToken: process.env['MERCADO_PAGO_ACCESS_TOKEN'],
        options: { timeout: 5000 }
    });

    const oauth = new OAuth(client);
    const result = await oauth.create({
        client_secret: client_secret,
        client_id: client_id,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
    })
    .catch((error) => { 
        console.error('MercadoPago OAuth Error:', error);
        throw new Error("No se pudo autenticar con Mercado Pago") 
    });

    if(!result.access_token) throw new Error("No se pudo autenticar con Mercado Pago");

    // Save the credentials in database
    await MercadoPago.create({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires_in: result.expires_in,
        commerceId: commerceId
    }).catch((error) => {
        console.error('Database Error:', error);
        throw new Error("Error al guardar las credenciales de Mercado Pago");
    });

    return result;
}