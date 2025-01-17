import MercadoPago from 'database/models/mercadopago.model';
import { MercadoPagoConfig, OAuth } from 'mercadopago';

export const authenticateOnMercadoPago = async ({
    client_secret,
    client_id,
    code,
    redirect_uri,
    commerceId
}) => {
    console.log('MP Auth Starting - Input Params:', {
        client_secret,
        client_id,
        code,
        redirect_uri,
        commerceId
    });

    const client = new MercadoPagoConfig({ 
        accessToken: client_secret,
        options: { timeout: 5000 }
    });

    const oauth = new OAuth(client);
    try {
        // Create the exact body structure that MercadoPago expects
        const oauthBody = {
            client_secret: client_secret,
            client_id: client_id,
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        };

        console.log('MP OAuth Request Body:', oauthBody);

        // Make the OAuth request
        const result = await oauth.create(oauthBody);

        console.log('MP OAuth Success Response:', {
            hasAccessToken: !!result.access_token,
            hasRefreshToken: !!result.refresh_token,
            expiresIn: result.expires_in,
            userId: result.user_id
        });

        if (!result.access_token) {
            throw new Error("No access token received from Mercado Pago");
        }

        // Save the credentials in database
        const savedCredentials = await MercadoPago.create({
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expires_in: result.expires_in,
            commerceId: commerceId,
            user_id: result.user_id
        });

        console.log('MP Credentials Saved:', {
            commerceId: savedCredentials.commerceId,
            userId: savedCredentials.user_id
        });

        return result;
    } catch (error) {
        console.error('MP Auth Error Details:', {
            message: error.message,
            responseData: error.response?.data,
            requestParams: {
                client_id,
                redirect_uri,
                code_length: code?.length,
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