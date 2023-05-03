let token = null;

export function setToken(newToken) {
    localStorage.setItem('token', newToken);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function clearToken() {
    localStorage.removeItem('token');
}

