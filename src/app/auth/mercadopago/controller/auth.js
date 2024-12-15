import MercadoPago from 'database/models/mercadopago.model';
import { MercadoPagoConfig, OAuth } from 'mercadopago';


export const authenticateOnMercadoPago = async (
    session,
    {
        client_secret,
        client_id,
        code,
        redirect_uri
    }
) => {
    const client = new MercadoPagoConfig({ 
        "accessToken": process.env['MERCADO_PAGO_ACCESS_TOKEN'], 
        options: { timeout: 5000 }
    });

    const oauth = new OAuth(client);
    const result = await oauth.create({
        'client_secret': client_secret,
        'client_id': client_id,
        'code': code,
        'redirect_uri': redirect_uri,
    })
    .catch(() => { throw new Error("No se pudo autenticar con Mercado Pago") });
    if(!result.access_token) throw new Error("No se pudo autenticar con Mercado Pago");

    // Debo guardar el access_token en la base de datos
    await MercadoPago.create({
        "access_token": result.access_token,
        "refresh_token": result.refresh_token,
        "expires_in": result.expires_in,
        "userId": session.user.id
    })

    return result;
}