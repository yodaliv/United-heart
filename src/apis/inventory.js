import api from './api';

const getInventories = (donation_id) => {
  return new Promise((resolve, reject) => {
    api.get(`/bulk/all/${donation_id}`).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

const createInventory = (donation_id, data) => {
  return new Promise((resolve, reject) => {
    api.post(`/bulk/${donation_id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.status === 201) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

const updateInventory = (id, data) => {
  return new Promise((resolve, reject) => {
    api.patch(`/bulk/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

const deleteInventory = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/bulk/${id}`).then(response => {
      if (response.status === 204) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

export { getInventories, createInventory, updateInventory, deleteInventory };