// utils/auth/appleKeys.js
// import axios from 'axios';
// import jwksClient from 'jwks-rsa';

// Create a JWKS client to fetch and cache Apple's public keys
// const client = jwksClient({
//     jwksUri: 'https://appleid.apple.com/auth/keys',
//     cache: true,
//     cacheMaxAge: 86400000, // 24 hours
//     rateLimit: true,
//     jwksRequestsPerMinute: 10
// });

export const getApplePublicKey = async (kid) => {
    return 'test';
    // try {
    //     // 1. Get the signing key that matches the key ID (kid)
    //     const key = await client.getSigningKey(kid);
        
    //     // 2. Get the public key in PEM format
    //     const publicKey = key.getPublicKey();
        
    //     return publicKey;

    // } catch (error) {
    //     console.error('Error fetching Apple public key:', error);
    //     throw new Error('Failed to get Apple public key');
    // }
};

// Alternative implementation without jwks-rsa library
export const getApplePublicKeyManual = async (kid) => {
    return 'test';
    // try {
    //     // 1. Fetch Apple's public keys
    //     const response = await axios.get('https://appleid.apple.com/auth/keys');
    //     const keys = response.data.keys;

    //     // 2. Find the key matching the kid
    //     const key = keys.find(k => k.kid === kid);
    //     if (!key) {
    //         throw new Error('No matching key found');
    //     }

    //     // 3. Convert JWK to PEM format
    //     const publicKey = convertJWKtoPEM(key);
        
    //     return publicKey;

    // } catch (error) {
    //     console.error('Error fetching Apple public key:', error);
    //     throw new Error('Failed to get Apple public key');
    // }
};