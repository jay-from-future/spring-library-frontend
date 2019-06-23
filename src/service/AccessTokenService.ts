export class AccessTokenService {

    public static getAccessToken() {

        return localStorage.getItem('access_token');
    }
}