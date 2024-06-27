import jwt from 'jsonwebtoken';

const KEY_ACCESS_TOKEN: string = process.env.KEY_ACCESS_TOKEN || '';
const KEY_REFRESH_TOKEN: string = process.env.KEY_REFRESH_TOKEN || '';

class TokenService {


    public generateToken = (payload: any): { access_token: string, refresh_token: string } => {
        const access_token = jwt.sign(payload, KEY_ACCESS_TOKEN, {
            expiresIn: '1y',
        });
        const refresh_token = jwt.sign(payload, KEY_REFRESH_TOKEN, {
            expiresIn: '1y',
        });
        return { access_token, refresh_token };
    }

    public verifyAccessToken = (token: string) => jwt.verify(token, KEY_ACCESS_TOKEN);

    public verifyRefreshToken = (token: string) => jwt.verify(token, KEY_REFRESH_TOKEN);

}

export default new TokenService();