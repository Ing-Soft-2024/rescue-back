import MercadoPago from 'database/models/mercadopago.model';
import { MercadoPagoConfig, OAuth } from 'mercadopago';

export const authenticateOnMercadoPago = async ({
    client_secret,
    client_id,
    code,
    redirect_uri,
    commerceId
}) => {
    console.log('MP Auth Params:', {
        client_secret,
        client_id,
        code,
        redirect_uri,
        commerceId,
        grant_type: 'authorization_code'
    });

    const client = new MercadoPagoConfig({ 
        accessToken: "APP_USR-2381168209109958-100110-445b988a8b4b1523c406e474b2e7f9ea-1160718084",
        options: { timeout: 5000 }
    });

    const oauth = new OAuth(client);
    try {
        const result = await oauth.create({
            client_secret,
            client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri
        });

        if(!result.access_token) throw new Error("No access token received from Mercado Pago");

        // Save the credentials in database
        await MercadoPago.create({
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expires_in: result.expires_in,
            commerceId: commerceId,
            user_id: result.user_id
        }).catch((error) => {
            console.error('Database Error:', error);
            throw new Error("Error al guardar las credenciales de Mercado Pago");
        });

        return result;
    } catch (error) {
        console.error('MP Auth Attempt Failed:', {
            error: error.message,
            response: error.response?.data,
            params: {
                client_secret,
                client_id,
                code,
                redirect_uri,
                commerceId
            }
        });
        
        throw new Error(`MercadoPago Authentication Error: ${error.response?.data?.message || error.message}`);
    }
}

export const getAuthorizationURL = (commerceId) => {
    const baseURL = "https://auth.mercadopago.com.ar/authorization";
    const params = new URLSearchParams({
        //client_id: process.env.MERCADO_PAGO_CLIENT_ID,
        client_id: "2381168209109958",
        response_type: 'code',
        platform_id: 'mp',
        //redirect_uri: process.env.MERCADO_PAGO_REDIRECT_URI,
        redirect_uri: "https://varied-laurella-rescue-bafbd5dd.koyeb.app/api/auth/mercadopago",
        state: commerceId // Used to identify the commerce after redirect
    });
    
    return `${baseURL}?${params.toString()}`;
}