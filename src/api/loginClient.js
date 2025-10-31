import baseClient from './baseClient';

export async function login(payload) {
    return baseClient.post('/manager-login', payload);
}