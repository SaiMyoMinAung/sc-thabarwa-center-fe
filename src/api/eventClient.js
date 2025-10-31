import baseClient from './baseClient';

export async function fetchCalenderDetailData({ params = {}, signal } = {}) {
    return baseClient.get('/get-calendar-data-detail/' + params.date, { signal });
}

export async function fetchCalenderData({ params = {}, signal } = {}) {
    return baseClient.get('/calendar-data/' + params.date, { signal });
}

/**
 * Fetch list of events.
 * params: optional object -> { page, limit, from, to, ... } will be turned into query string
 * signal: optional AbortController.signal
 */
export async function fetchEvents({ params = {}, signal } = {}) {
    return baseClient.get('/get-donation-event', { params, signal });
}

/**
 * Fetch single event by id
 */
export async function fetchEventById(id, { signal } = {}) {
    if (!id) throw new Error('id is required');
    return baseClient.get(`/events/${encodeURIComponent(id)}`, { signal });
}

/**
 * Confirm event by id
 */
export async function confirmEventById(id, payload) {
    if (!id) throw new Error('id is required');
    return baseClient.put(`/confirm-donation-event/${encodeURIComponent(id)}`, payload);
}

/**
 * Example: create an event
 */
export async function createEvent(payload) {
    return baseClient.post('/save-donation-event', payload);
}

/**
 * Example: update an event
 */
export async function updateEvent(id, payload) {
    return baseClient.put(`/events/${encodeURIComponent(id)}`, payload);
}

/**
 * Example: delete an event
 */
export async function deleteEvent(id) {
    return baseClient.del(`/events/${encodeURIComponent(id)}`);
}