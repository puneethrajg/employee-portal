const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.text();
      if (body) message = body;
    } catch {
      // ignore body parse errors, fall back to the generic message
    }
    throw new Error(message);
  }
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function getAllEmployees() {
  const res = await fetch(`${BASE_URL}/getEmployee`);
  return handleResponse(res);
}

export async function getEmployee(eid) {
  const res = await fetch(`${BASE_URL}/getEmployee/${eid}`);
  return handleResponse(res);
}

export async function createEmployee(employee) {
  const res = await fetch(`${BASE_URL}/createEmployee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  });
  return handleResponse(res);
}

export async function updateEmployee(eid, employee) {
  const res = await fetch(`${BASE_URL}/updateEmployee/${eid}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  });
  return handleResponse(res);
}

export async function deleteEmployee(eid) {
  const res = await fetch(`${BASE_URL}/delEmployee/${eid}`, {
    method: 'DELETE'
  });
  return handleResponse(res);
}