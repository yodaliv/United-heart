import api from './api';

const getRequests = (donation_id) => {
  return new Promise((resolve, reject) => {
    api.get(`/requests/all/${donation_id}`).then(response => {
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

const getMyRequest = (donation_id) => {
  return new Promise((resolve, reject) => {
    api.get(`/requests/${donation_id}/me`).then(response => {
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

const createRequest = (donation_id, data) => {
  return new Promise((resolve, reject) => {
    api.post(`/requests/${donation_id}`, data).then(response => {
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

const updateRequest = (donation_id, data) => {
  return new Promise((resolve, reject) => {
    api.patch(`/requests/${donation_id}`, data).then(response => {
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

const deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    api.delete(`/requests/${id}`).then(response => {
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

const getAllRequests = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/request/all').then(response => {
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

const approveRequest = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/request/approve', data).then(response => {
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

const declineRequest = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/request/decline', data).then(response => {
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

export { getRequests, getMyRequest, createRequest, updateRequest, deleteRequest, getAllRequests, approveRequest, declineRequest };