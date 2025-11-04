import baseClient from './baseClient';

export async function getTodayAnnouncementData() {
    return baseClient.get(`/get-today-announcement`);
}

/**
 * Fetch list of events.
 * params: optional object -> { page, limit, from, to, ... } will be turned into query string
 * signal: optional AbortController.signal
 */
export async function fetchAnnouncements({ params = {}, signal } = {}) {
    return baseClient.get(`/get-announcement`, { params, signal });
}

export async function fetchEachAnnouncement(id) {
    return baseClient.get(`/get-announcement-detail/${id}`);
}

export async function saveAnnouncements(payload) {
    return baseClient.post(`/save-announcement`, payload);
}

export async function setAnnouncementAlwaysTrue(id) {
    return baseClient.get(`/set-announcement-always-show-true/${id}`);
}

export async function updateAnnouncement(id, payload) {
    return baseClient.put(`/update-announcement/${encodeURIComponent(id)}`, payload);
}

export async function deleteAnnouncement(id) {
    return baseClient.del(`/delete-announcement/${encodeURIComponent(id)}`);
}