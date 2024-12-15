import jwt from 'jsonwebtoken';

export function Authorization() {
    return function (target, propertyKey, descriptor) {
        const JWT_SECRET = process.env.JWT_SECRET || 'secret';
        const originalMethod = descriptor.value;

        descriptor.value = async function (req, res) {
            console.log('[=============== Authorization Middleware: AUTHORIZATION ===============]');
            console.log('[Endpoint]: ', req.url);
            
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    console.log('[Authorization]: No auth header');
                    return res.status(401).json({
                        message: 'No authorization header provided'
                    });
                }

                // Split 'Bearer <token>'
                const [bearer, token] = authHeader.split(' ');
                
                if (bearer !== 'Bearer' || !token) {
                    console.log('[Authorization]: Invalid auth format');
                    return res.status(401).json({
                        message: 'Invalid authorization format'
                    });
                }

                try {
                    // Verify token
                    const decoded = jwt.verify(token, JWT_SECRET);
                    if (!decoded) {
                        console.log('[Authorization]: Token verification failed');
                        return res.status(401).json({
                            message: 'Invalid token'
                        });
                    }
                    
                    req.user = decoded;
                    console.log('[User]: ', decoded);
                    console.log('[Authorized?]: true');
                } catch (jwtError) {
                    console.log('[JWT Error]: ', jwtError.message);
                    return res.status(401).json({
                        message: 'Invalid or expired token'
                    });
                }

                return await originalMethod.apply(this, [req, res]);
            } catch (error) {
                console.error('[Authorization error]:', error);
                return res.status(401).json({
                    message: 'Authorization failed',
                    error: error.message
                });
            } finally {
                console.log('[================ End of Authorization  =================]');
            }
        };

        return descriptor;
    };
}
