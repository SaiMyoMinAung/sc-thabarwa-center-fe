const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

function getStoredToken() {
    return localStorage.getItem('access_token') || null;
}

function buildHeaders(custom = {}) {
    const token = getStoredToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...custom,
    };
}

async function parseResponse(res) {
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
        const err = new Error(data?.message || res.statusText || 'Request failed');
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}

function request(path, { method = 'GET', body, headers = {}, signal, params } = {}) {
    const url = new URL(`${BASE_URL}${path}`, window.location.origin);
    if (params && typeof params === 'object') {
        Object.keys(params).forEach((k) => {
            if (params[k] !== undefined && params[k] !== null) url.searchParams.append(k, params[k]);
        });
    }

    const opts = {
        method,
        headers: buildHeaders(headers),
        signal,
    };

    if (body !== undefined && body !== null && method !== 'GET' && method !== 'HEAD') {
        opts.body = JSON.stringify(body);
    }

    return fetch(url.toString(), opts).then(parseResponse);
}

export default {
    get(path, opts = {}) {
        return request(path, { ...opts, method: 'GET' });
    },
    post(path, body, opts = {}) {
        return request(path, { ...opts, method: 'POST', body });
    },
    put(path, body, opts = {}) {
        return request(path, { ...opts, method: 'PUT', body });
    },
    del(path, opts = {}) {
        return request(path, { ...opts, method: 'DELETE' });
    },

    // helper to set token in localStorage (optional)
    setToken(token) {
        if (token) localStorage.setItem('access_token', token);
        else localStorage.removeItem('access_token');
    },
};