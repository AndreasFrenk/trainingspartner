
import expressJwt from 'express-jwt'
import {getById} from '../services/users.js'




export function jwt() {
    const secret: expressJwt.secretType = process.env.SECRET!;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}
async function isRevoked(req: any, payload: any, done: any){
    const user = await getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};