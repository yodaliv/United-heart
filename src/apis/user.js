import api from './api';

const getUsers = (org_id, org_type) => {
  return new Promise((resolve, reject) => {
    const url = org_type ? `/auth/users/org/${org_id}?limit=100?org_type=${org_type}` : `/auth/users/org/${org_id}?limit=100`;
    api.get(url).then(response => {
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

const getUsersWithOrgIds = (org_ids) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/users/with_org_ids', org_ids).then(response => {
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

const activateUser = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/users/activate', data).then(response => {
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

const deactivateUser = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/users/deactivate', data).then(response => {
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

const finishSurvey = () => {
  return new Promise((resolve, reject) => {
    api.get('/users/finish_survey').then(response => {
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

const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/users').then(response => {
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

const updateUserInfo = (data) => {
  return new Promise((resolve, reject) => {
    api.patch('/auth/users', data).then(response => {
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

export { getUsers, getUsersWithOrgIds, activateUser, deactivateUser, finishSurvey, getUserInfo, updateUserInfo };