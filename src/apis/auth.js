import api from './api';

const login = (authInfo) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/login', authInfo).then(response => {
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

const signup = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/signup/personal', data).then(response => {
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

const adminSignup = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/signup/uic', data).then(response => {
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

const studentSignup = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/signup/student', data).then(response => {
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

const verifyEmail = (token) => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/verify-email/${token}`).then(response => {
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

const sendSMS = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/signup/phone-number', data).then(response => {
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

const verifyPhone = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/verify-phone', data).then(response => {
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

const setupPassword = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/signup/setup-password', data).then(response => {
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

const invite = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/invite', data).then(response => {
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

const inviteStatus = (invite_code, user_type) => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/invite-status?invite_code=${invite_code}&user_type=${user_type}`).then(response => {
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

export { login, signup, adminSignup, studentSignup, verifyEmail, sendSMS, verifyPhone, setupPassword, invite, inviteStatus };