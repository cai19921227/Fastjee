import cookieUtil from 'js-cookie';

const accessTokenKey = 'FASTJEE_ACCESS_TOKEN';
const refreshTokenKey = 'FASTJEE_REFRESH_TOKEN';

export function getToken () {
    return cookieUtil.get(accessTokenKey);
}

export function getRefreshToken () {
    return cookieUtil.get(refreshTokenKey);
}

export function setToken (token, refToken) {
    cookieUtil.set(accessTokenKey, token);
    cookieUtil.set(refreshTokenKey, refToken);
}

export function removeToken () {
    cookieUtil.remove(accessTokenKey);
    cookieUtil.remove(refreshTokenKey);
}
