import { AuthResponse } from "./user.types";

function auth(bearerToken: string): Promise<AuthResponse> {
    return new Promise(function(resolve, reject) {
        const token = bearerToken.replace('Bearer ',  '');
        if (token == 'fakeToken') {
            resolve({ userId: 'fakeUserId' })
            return
        }
        resolve({ error: {type: 'unauthorized', message: 'Authentication failed'}})
    })
}

export default { auth: auth }