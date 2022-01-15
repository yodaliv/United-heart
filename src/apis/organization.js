import api from './api';

const getUICOrganization = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/organizations/uic').then(response => {
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

const getOrganizations = (org_id, org_type) => {
  return new Promise((resolve, reject) => {
    const url = org_type ? `/auth/organizations/${org_id}?org_type=${org_type}` : `/auth/organizations/${org_id}`;
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

const getSubOrganizations = (org_id) => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/organizations/sub_organization_names/${org_id}`).then(response => {
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

const createOrganizationWithInvite = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/organizations/invite', data).then(response => {
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

const createOrganization = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/organizations', data).then(response => {
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

const getOrganizationTypes = (org_id) => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/org_types/all/${org_id}`).then(response => {
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

const createOrganizationType = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/org_types', data).then(response => {
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

const getAllowOrganizationCustomInfo = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/organization_custom_infos/allow').then(response => {
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

const getOrganizationInfo = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/organizations').then(response => {
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

const updateOrganizationInfo = (data) => {
  return new Promise((resolve, reject) => {
    api.patch('/auth/organizations', data).then(response => {
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

const getOrganizationCustomInfo = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/organization_custom_infos').then(response => {
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

const updateOrganizationCustomInfo = (data) => {
  return new Promise((resolve, reject) => {
    api.patch('/auth/organization_custom_infos', data).then(response => {
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

const getAllowOrganizationServices = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/organization_services/allow').then(response => {
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

const getOrganizationServices = () => {
  return new Promise((resolve, reject) => {
    api.get('/auth/organization_services').then(response => {
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

const updateOrganizationServices = (data) => {
  return new Promise((resolve, reject) => {
    api.patch('/auth/organization_services', data).then(response => {
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

export {
  getUICOrganization,
  getOrganizations,
  getSubOrganizations,
  createOrganizationWithInvite,
  createOrganization,
  getOrganizationTypes,
  createOrganizationType,
  getAllowOrganizationCustomInfo,
  getOrganizationInfo,
  updateOrganizationInfo,
  getOrganizationCustomInfo,
  updateOrganizationCustomInfo,
  getAllowOrganizationServices,
  getOrganizationServices,
  updateOrganizationServices,
};