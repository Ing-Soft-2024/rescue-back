export const createToken = async (user) => {
    if (!user) return null;

    const token = await jsonwebtoken.sign({
        session: {

        },
        user: user,
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
}