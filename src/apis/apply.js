import api from './api';

const getStatusSIN = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/apply/student_in_need').then(response => {
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

const applySIN = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/apply/student_in_need', data).then(response => {
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

const getDetailsSIN = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/apply/student_in_need/${id}`).then(response => {
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

const getStatusAmbassador = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/apply/ambassador').then(response => {
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

const applyAmbassador = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/apply/ambassador', data).then(response => {
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

const getDetailsAmbassador = (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/apply/ambassador/${id}`).then(response => {
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

export { getStatusSIN, applySIN, getDetailsSIN, getStatusAmbassador, applyAmbassador, getDetailsAmbassador };