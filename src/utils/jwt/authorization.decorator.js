import { verifyToken } from "./verifyToken";

export function Authorization() {
    return (target, propertyKey, descriptor) => {
        const originalInitializer = descriptor.initializer;
        descriptor.initializer = () => {

            /**
             * @param {Request} req
             * @param {Response} res
             */
            return async (req, res) => {
                const decoded = verifyToken(req, process.env.JWT_SECRET);
                req.session = decoded;

                console.log('[=============== Authorization Middleware ===============]');
                console.log('[Endpoint]: ', req.originalUrl);
                console.log('[User]: ', req.session.user);
                console.log('[Authorized?]: ', Boolean(decoded));
                console.log('[Headers]: ', req.headers);
                console.log('[Body]: ', req.body);
                console.log('[Params]: ', req.params);
                console.log('[Query]: ', req.query);
                console.log('[================ End of Authorization  =================]');
                if (!decoded) return res.status(401).json({ "message": 'No tienes permisos' });

                const originalMethod = await originalInitializer().bind(this, req, res);
                return originalMethod(req, res);
            };
        }

        return descriptor;
    }
}
