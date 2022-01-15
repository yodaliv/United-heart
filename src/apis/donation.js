import api from './api';

const getDonations = () => {
  return new Promise((resolve, reject) => {
    api.get('/donation/all').then(response => {
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

const getDonation = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/donation/${id}`).then(response => {
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

const createDonation = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/donation', data, {
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

const updateDonation = (id, data) => {
  return new Promise((resolve, reject) => {
    api.patch(`/donation/${id}`, data, {
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

const deleteDonation = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/donation/${id}`).then(response => {
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

export { getDonations, getDonation, createDonation, updateDonation, deleteDonation };