const BASE_URL = '/api/items';

export function update(item) {
    return fetch(`${BASE_URL}/${item._id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(item)
    }).then(res => res.json());
  }