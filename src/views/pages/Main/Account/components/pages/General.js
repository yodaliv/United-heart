import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withCookies } from 'react-cookie';
import { CardActions, CardContent, Divider, Select } from '@material-ui/core';

import { WhiteCard } from '../../../../../../components/Cards';
import { TextInput, SelectInput } from '../../../../../../components/Inputs';
import { BlueButton, GrayButton, RedButton, BlueOutlineButton, GrayOutlineButton } from '../../../../../../components/Buttons';
import { CountrySelect, RegionSelect } from '../../../../../../components/CountryRegionSelect';
import { SectionTabs } from '../../../../../../components/Tabs';
import { AvatarIcon, FacebookIcon, InstagramIcon, TwitterIcon, LockIcon } from '../../components/Icons';

import { updateUserInfo } from '../../../../../../apis/user';
import {
  getOrganizationInfo,
  updateOrganizationInfo,
  getAllowOrganizationCustomInfo,
  updateOrganizationCustomInfo,
  getAllowOrganizationServices,
  getOrganizationServices,
  updateOrganizationServices,
} from '../../../../../../apis/organization';
import { userTypes } from '../../../../../../constants';
import { getDateString } from '../../../../../../utils';
import { useAppContext } from '../../../../../../context/AppContext';
import { useUserContext } from '../../../../../../context/UserContext';

function General({ text, cookies }) {
  const { setLoading, setMessage } = useAppContext();
  const { userInfo, setUserInfo } = useUserContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [allowedCustomize, setAllowedCustomize] = useState(false);
  const [allowedServices, setAllowServices] = useState(false);
  const [campusList] = useState([
    {
      id: 1,
      name: 'St. George',
    },
    {
      id: 2,
      name: 'Scarborough',
    },
    {
      id: 3,
      name: 'Mississauga',
    }
  ]);
  const [buildingList] = useState([
    {
      id: 1,
      name: 'Chestnut residence',
    },
    {
      id: 2,
      name: 'Innis college',
    },
    {
      id: 3,
      name: 'Loretto college',
    }
  ]);
  const [generalInfo, setGeneralInfo] = useState({
    personal: {
      avatar: userInfo.avatar,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      occupation: userInfo.occupation,
      is_active: userInfo.is_active,
      created_at: userInfo.created_at,
      role: userInfo.role,
    },
    organization: {
      org_name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
    },
    customOrg: {
      welcome_title: userInfo.welcome_title || '',
      welcome_message: userInfo.welcome_message || '',
      email_suffix: userInfo.email_suffix || '',
      org_logo_url: userInfo.org_logo_url,
      org_background_url: userInfo.org_background_url,
    },
    services: {
      scp: false,
      bd: false,
    },
    needs: {
      social: 0,
      family: 0,
      dependents: '',
    },
    location: {
      residence: 0,
      campus: 1,
      building: 1,
      room: '203',
    },
    social: {
      facebook: false,
      instagram: false,
      twitter: false,
    },
  });
  const [editGeneralInfo, setEditGeneralInfo] = useState({
    personal: {
      avatar: userInfo.avatar,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      occupation: userInfo.occupation,
      is_active: userInfo.is_active,
      created_at: userInfo.created_at,
      role: userInfo.role,
    },
    organization: {
      org_name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
    },
    customOrg: {
      welcome_title: userInfo.welcome_title || '',
      welcome_message: userInfo.welcome_message || '',
      email_suffix: userInfo.email_suffix || '',
      org_logo_url: userInfo.org_logo_url,
      org_background_url: userInfo.org_background_url,
    },
    services: {
      scp: false,
      bd: false,
    },
    needs: {
      social: 0,
      family: 0,
      dependents: '',
    },
    location: {
      residence: 0,
      campus: 1,
      building: 1,
      room: '203',
    },
    social: {
      facebook: false,
      instagram: false,
      twitter: false,
    },
  });
  const [generalEditable, setGeneralEditable] = useState({
    personal: false,
    organization: false,
    customOrg: false,
    services: false,
    needs: false,
    location: false,
    social: false
  });
  const [generalTabs, setGeneralTabs] = useState([
    { title: 'Personal information', href: 'personal-information' },
    { title: 'Organization details', href: 'organization-details' },
    // { title: 'Current needs details', href: 'needs-details' },
    // { title: 'Location details', href: 'location-details' },
    // { title: 'Social media', href: 'social-media' },
    // { title: 'Delete account', href: 'delete-account' },
  ]);
  const avatarRef = useRef();
  const logoRef = useRef();
  const backgroundRef = useRef();

  const loadData = useCallback(() => {
    if (userInfo.role === userTypes.admin) {
      setLoading(true);
      getOrganizationInfo().then(res => {
        const orgInfo = {
          org_name: res.org_name,
          address: res.address,
          city: res.city,
          state: res.state,
          country: res.country,
          postal_code: res.postal_code,
        };
        setGeneralInfo(prevState => ({ ...prevState, organization: orgInfo }));
        setEditGeneralInfo(prevState => ({ ...prevState, organization: orgInfo }));
        getAllowOrganizationCustomInfo().then(res => {
          if (res) {
            setAllowedCustomize(true);
            setGeneralTabs(prevState => ([...prevState, { title: 'Custom Organization', href: 'custom-organization' }]));
          }

          getAllowOrganizationServices().then(res => {
            if (res) {
              setAllowServices(true);
              setGeneralTabs(prevState => ([...prevState, { title: 'Organization Services', href: 'organization-services' }]));
            }

            getOrganizationServices().then(res => {
              const servicesInfo = {
                scp: res.find(item => item.service_name === 'STUDENT CARE PACKAGE')?.enabled || false,
                bd: res.find(item => item.service_name === 'BULK DONATION')?.enabled || false,
              };
              setGeneralInfo(prevState => ({ ...prevState, services: servicesInfo }));
              setEditGeneralInfo(prevState => ({ ...prevState, services: servicesInfo }));
              setIsLoaded(true);
              setLoading(false);
            }).catch(err => {
              setMessage({ open: true, title: text.error, description: text.failedLoadAccountInfo });
              setIsLoaded(true);
              setLoading(false);
            });
          }).catch(err => {
            setMessage({ open: true, title: text.error, description: text.failedLoadAccountInfo });
            setIsLoaded(true);
            setLoading(false);
          });
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedLoadAccountInfo });
          setIsLoaded(true);
          setLoading(false);
        });
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedLoadOrganizationDetails });
        setIsLoaded(true);
        setLoading(false);
      });
    } else {
      setIsLoaded(true);
    }
  }, [text, userInfo, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  });

  const handleEdit = (type) => {
    setGeneralEditable({ ...generalEditable, [type]: true });
  };

  const handleSave = (type) => {
    setLoading(true);
    switch (type) {
      case 'personal':
        let personalFormData = new FormData();
        personalFormData.append('firstname', editGeneralInfo.personal.firstname);
        personalFormData.append('lastname', editGeneralInfo.personal.lastname);
        personalFormData.append('occupation', editGeneralInfo.personal.occupation);
        personalFormData.append('is_active', editGeneralInfo.personal.is_active);
        const avatar = avatarRef.current.files[0];
        Boolean(avatar) && personalFormData.append('avatar', avatar);
        updateUserInfo(personalFormData).then(res => {
          const userData = { ...userInfo, ...res };
          setUserInfo(userData);
          cookies.set('userInfo', JSON.stringify(userData), { path: '/' });
          setGeneralInfo({ ...generalInfo, [type]: editGeneralInfo[type] });
          setGeneralEditable({ ...generalEditable, [type]: false });
          setLoading(false);
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedUpdatePersonalInfo });
          setLoading(false);
        });
        break;
      case 'organization':
        updateOrganizationInfo(editGeneralInfo.organization).then(res => {
          setGeneralInfo({ ...generalInfo, [type]: editGeneralInfo[type] });
          setGeneralEditable({ ...generalEditable, [type]: false });
          setLoading(false);
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedUpdateOrganizationDetails });
          setLoading(false);
        });
        break;
      case 'customOrg':
        const orgFormData = new FormData();
        orgFormData.append('welcome_title', editGeneralInfo.customOrg.welcome_title);
        orgFormData.append('welcome_message', editGeneralInfo.customOrg.welcome_message);
        orgFormData.append('email_suffix', editGeneralInfo.customOrg.email_suffix);
        const org_logo = logoRef.current.files[0];
        const org_background = backgroundRef.current.files[0];
        Boolean(org_logo) && orgFormData.append('org_logo', org_logo);
        Boolean(org_background) && orgFormData.append('org_background', org_background);

        updateOrganizationCustomInfo(orgFormData).then(res => {
          const userData = { ...userInfo, ...res };
          setUserInfo(userData);
          cookies.set('userInfo', JSON.stringify(userData), { path: '/' });
          setGeneralInfo({ ...generalInfo, [type]: editGeneralInfo[type] });
          setGeneralEditable({ ...generalEditable, [type]: false });
          setLoading(false);
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedUpdateOrganizationCustomInfo });
          setLoading(false);
        });
        break;
      case 'services':
        const servicesParams = [
          { service_name: "STUDENT CARE PACKAGE", enabled: editGeneralInfo.services.scp },
          { service_name: "BULK DONATION", enabled: editGeneralInfo.services.bd },
        ];
        updateOrganizationServices(servicesParams).then(res => {
          setGeneralInfo({ ...generalInfo, [type]: editGeneralInfo[type] });
          setGeneralEditable({ ...generalEditable, [type]: false });
          setLoading(false);
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedUpdateOrganizationServicesInfo });
          setLoading(false);
        });
        break;

      default:
        setGeneralInfo({ ...generalInfo, [type]: editGeneralInfo[type] });
        setGeneralEditable({ ...generalEditable, [type]: false });
        setLoading(false);
        break;
    }
  };

  const handleCancel = (type) => {
    setGeneralEditable({ ...generalEditable, [type]: false });
    setEditGeneralInfo(generalInfo);
  };

  const handleChange = (type, field, value) => {
    setEditGeneralInfo({ ...editGeneralInfo, [type]: { ...editGeneralInfo[type], [field]: value } });
  };

  const handleDelete = () => {

  };

  const getRoleName = (role) => {
    switch (role) {
      case userTypes.uicAdmin:
        return text.uicAdmin;
      case userTypes.masterAdmin:
        return text.masterAdmin;
      case userTypes.admin:
        return text.admin;
      case userTypes.ambassador:
        return text.ambassador;
      case userTypes.student:
        return text.student;

      default:
        return '';
    }
  };

  return isLoaded && (
    <div className="lg:flex my-12">
      <div className="flex-4">
        <div id="personal-information" className="mt-0.5">
          <WhiteCard>
            <CardContent>
              <p className="mb-4 text-2xl font-semibold">{text.personalInformation}</p>
              <Divider />
              <div className="xl:flex mt-7.5">
                <div className="flex-7">
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.avatar}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.personal ? (
                        <div className="flex items-center">
                          {Boolean(editGeneralInfo.personal.avatar) ? (
                            <img className="w-9 h-9 rounded-half" src={editGeneralInfo.personal.avatar} alt="avatar" />
                          ) : (
                            <AvatarIcon />
                          )}
                          <input
                            ref={avatarRef}
                            accept="image/*"
                            className="hidden"
                            id="contained-button-file"
                            type="file"
                            onChange={e => {
                              if (e.target.files[0]) {
                                fileToDataUri(e.target.files[0])
                                  .then(dataUri => handleChange('personal', 'avatar', dataUri));
                              }
                            }}
                          />
                          <div className={Boolean(editGeneralInfo.personal.avatar) ? 'ml-4' : ''}>
                            <GrayButton onClick={() => avatarRef.current.click()}>{text.uploadImage}</GrayButton>
                          </div>
                        </div>
                      ) : Boolean(generalInfo.personal.avatar) ? (
                        <img className="w-9 h-9 rounded-half" src={generalInfo.personal.avatar} alt="avatar" />
                      ) : (
                        <AvatarIcon />
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.firstname}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.personal ? (
                        <TextInput value={editGeneralInfo.personal.firstname} onChange={e => handleChange('personal', 'firstname', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.personal.firstname}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.lastname}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.personal ? (
                        <TextInput value={editGeneralInfo.personal.lastname} onChange={e => handleChange('personal', 'lastname', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.personal.lastname}</p>
                      )}
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="xs:flex items-center">
                      <div className="flex-2">
                        <p className="font-light">{text.email}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.personal ? (
                          <TextInput value={editGeneralInfo.personal.email} disabled endAdornment={<LockIcon />} />
                        ) : (
                          <p className="font-medium">{generalInfo.personal.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-center">
                      <div className="flex-2" />
                      <div className="flex-5">
                        {generalEditable.personal && <p className="pt-1 text-xs leading-loose opacity-50">{text.requireReverifyEmail}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.phone}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.personal ? (
                        <TextInput value={editGeneralInfo.personal.phone_number} disabled endAdornment={<LockIcon />} />
                      ) : (
                        <p className="font-medium">{generalInfo.personal.phone_number}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.occupation}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.personal ? (
                        <TextInput value={editGeneralInfo.personal.occupation} onChange={e => handleChange('personal', 'occupation', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.personal.occupation}</p>
                      )}
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="flex items-center">
                      <div className="flex-2">
                        <p className="font-light">{text.status}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.personal ? (
                          <Select
                            native
                            value={editGeneralInfo.personal.is_active}
                            onChange={e => handleChange('personal', 'is_active', e.target.value === 'true' ? true : false)}
                            input={<SelectInput />}
                          >
                            <option value={true}>{text.active}</option>
                            <option value={false}>{text.hold}</option>
                          </Select>
                        ) : generalInfo.personal.is_active ? (
                          <div className="w-fit-content bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">
                            <span className="text-sm font-medium -tracking-0.58">{text.active}</span>
                          </div>
                        ) : (
                          <div className="w-fit-content bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">
                            <span className="text-sm font-medium -tracking-0.58">{text.hold}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-center">
                      <div className="flex-2" />
                      <div className="flex-5">
                        {generalEditable.personal && <p className="pt-1 text-xs leading-loose opacity-50">{text.putAccount}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.memberSince}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.personal ? (
                        <TextInput value={getDateString(editGeneralInfo.personal.created_at)} disabled endAdornment={<LockIcon />} />
                      ) : (
                        <p className="font-medium">{getDateString(generalInfo.personal.created_at)}</p>
                      )}
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="xs:flex items-center">
                      <div className="flex-2">
                        <p className="font-light">{text.memberType}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.personal ? (
                          <TextInput value={getRoleName(editGeneralInfo.personal.role)} disabled endAdornment={<LockIcon />} />
                        ) : (
                          <p className="font-medium">{getRoleName(generalInfo.personal.role)}</p>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-center">
                      <div className="flex-2" />
                      <div className="flex-5">
                        {generalEditable.personal && <p className="pt-1 text-xs leading-loose opacity-50">{text.visit} <span className="text-blue-cornflower cursor-pointer underline">{text.apply}</span> {text.applyOtherRole}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-3" />
              </div>
            </CardContent>
            <CardActions>
              {generalEditable.personal ? (
                <>
                  <BlueButton onClick={() => handleSave('personal')}>{text.save}</BlueButton>
                  <GrayButton onClick={() => handleCancel('personal')}>{text.cancel}</GrayButton>
                </>
              ) : (
                <GrayButton onClick={() => handleEdit('personal')}>{text.edit}</GrayButton>
              )}
            </CardActions>
          </WhiteCard>
        </div>
        <div id="organization-details" className="mt-5">
          <WhiteCard>
            <CardContent>
              <p className="mb-4 text-2xl font-semibold">{text.orgDetails}</p>
              <Divider />
              <div className="xl:flex mt-7.5">
                <div className="flex-7">
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.orgName}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.organization ? (
                        <TextInput value={editGeneralInfo.organization.org_name} onChange={e => handleChange('organization', 'org_name', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.organization.org_name}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.address}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.organization ? (
                        <TextInput value={editGeneralInfo.organization.address} onChange={e => handleChange('organization', 'address', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.organization.address}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.city}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.organization ? (
                        <TextInput value={editGeneralInfo.organization.city} onChange={e => handleChange('organization', 'city', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.organization.city}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.state}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.organization ? (
                        <RegionSelect
                          country={editGeneralInfo.organization.country}
                          value={editGeneralInfo.organization.state}
                          onChange={val => handleChange('organization', 'state', val)}
                        />
                      ) : (
                        <p className="font-medium">{generalInfo.organization.state}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.country}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.organization ? (
                        <CountrySelect
                          disabled
                          value={editGeneralInfo.organization.country}
                          onChange={val => handleChange('organization', 'country', val)}
                        />
                      ) : (
                        <p className="font-medium">{generalInfo.organization.country}</p>
                      )}
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.postalCode}:</p>
                    </div>
                    <div className="flex-5">
                      {generalEditable.organization ? (
                        <TextInput value={editGeneralInfo.organization.postal_code} onChange={e => handleChange('organization', 'postal_code', e.target.value)} />
                      ) : (
                        <p className="font-medium">{generalInfo.organization.postal_code}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-3" />
              </div>
            </CardContent>
            <CardActions>
              {generalEditable.organization ? (
                <>
                  <BlueButton onClick={() => handleSave('organization')}>{text.save}</BlueButton>
                  <GrayButton onClick={() => handleCancel('organization')}>{text.cancel}</GrayButton>
                </>
              ) : (
                <GrayButton onClick={() => handleEdit('organization')}>{text.edit}</GrayButton>
              )}
            </CardActions>
          </WhiteCard>
        </div>
        {allowedCustomize && (
          <div id="custom-organization" className="mt-5">
            <WhiteCard>
              <CardContent>
                <p className="mb-4 text-2xl font-semibold">{text.customOrg}</p>
                <Divider />
                <div className="xl:flex mt-7.5">
                  <div className="flex-7">
                    <div className="xs:flex items-center mt-12.5 my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.welcomeTitle}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.customOrg ? (
                          <TextInput value={editGeneralInfo.customOrg.welcome_title} onChange={e => handleChange('customOrg', 'welcome_title', e.target.value)} />
                        ) : (
                          <p className="font-medium">{generalInfo.customOrg.welcome_title || text.notSet}</p>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-center my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.welcomeMessage}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.customOrg ? (
                          <TextInput value={editGeneralInfo.customOrg.welcome_message} onChange={e => handleChange('customOrg', 'welcome_message', e.target.value)} />
                        ) : (
                          <p className="font-medium">{generalInfo.customOrg.welcome_message || text.notSet}</p>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-center my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.emailSuffix}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.customOrg ? (
                          <TextInput value={editGeneralInfo.customOrg.email_suffix} onChange={e => handleChange('customOrg', 'email_suffix', e.target.value)} />
                        ) : (
                          <p className="font-medium">{generalInfo.customOrg.email_suffix || text.notSet}</p>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-start my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.logo}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.customOrg ? (
                          <>
                            {Boolean(editGeneralInfo.customOrg.org_logo_url) && (
                              <img className="w-full rounded-6 border-2 border-solid border-gray-100" src={editGeneralInfo.customOrg.org_logo_url} alt="logo" />
                            )}
                            <input
                              ref={logoRef}
                              accept="image/*"
                              className="hidden"
                              id="contained-button-file"
                              type="file"
                              onChange={e => {
                                if (e.target.files[0]) {
                                  fileToDataUri(e.target.files[0])
                                    .then(dataUri => {
                                      handleChange('customOrg', 'org_logo_url', dataUri);
                                    });
                                }
                              }}
                            />
                            <div className={Boolean(editGeneralInfo.customOrg.org_logo_url) ? 'mt-2' : ''}>
                              <GrayButton onClick={() => logoRef.current.click()}>{text.uploadImage}</GrayButton>
                            </div>
                          </>
                        ) : Boolean(generalInfo.customOrg.org_logo_url) ? (
                          <img className="w-full rounded-6 border-2 border-solid border-gray-100" src={generalInfo.customOrg.org_logo_url} alt="logo" />
                        ) : (
                          <p className="font-medium">{text.notSet}</p>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-start my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.background}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.customOrg ? (
                          <>
                            {Boolean(editGeneralInfo.customOrg.org_background_url) && (
                              <img className="w-full rounded-6 border-2 border-solid border-gray-100" src={editGeneralInfo.customOrg.org_background_url} alt="background" />
                            )}
                            <input
                              ref={backgroundRef}
                              accept="image/*"
                              className="hidden"
                              id="contained-button-file"
                              type="file"
                              onChange={e => {
                                if (e.target.files[0]) {
                                  fileToDataUri(e.target.files[0])
                                    .then(dataUri => {
                                      handleChange('customOrg', 'org_background_url', dataUri);
                                    });
                                }
                              }}
                            />
                            <div className={Boolean(editGeneralInfo.customOrg.org_background_url) ? 'mt-2' : ''}>
                              <GrayButton onClick={() => backgroundRef.current.click()}>{text.uploadImage}</GrayButton>
                            </div>
                          </>
                        ) : Boolean(generalInfo.customOrg.org_background_url) ? (
                          <img className="w-full rounded-6 border-2 border-solid border-gray-100" src={generalInfo.customOrg.org_background_url} alt="background" />
                        ) : (
                          <p className="font-medium">{text.notSet}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-3" />
                </div>
              </CardContent>
              <CardActions>
                {generalEditable.customOrg ? (
                  <>
                    <BlueButton onClick={() => handleSave('customOrg')}>{text.save}</BlueButton>
                    <GrayButton onClick={() => handleCancel('customOrg')}>{text.cancel}</GrayButton>
                  </>
                ) : (
                  <GrayButton onClick={() => handleEdit('customOrg')}>{text.edit}</GrayButton>
                )}
              </CardActions>
            </WhiteCard>
          </div>
        )}
        {allowedServices && (
          <div id="organization-services" className="mt-5">
            <WhiteCard>
              <CardContent>
                <p className="mb-4 text-2xl font-semibold">{text.orgServices}</p>
                <Divider />
                <div className="xl:flex mt-7.5">
                  <div className="flex-7">
                    <div className="xs:flex items-center my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.scp}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.services ? (
                          <Select
                            native
                            value={editGeneralInfo.services.scp}
                            onChange={e => handleChange('services', 'scp', e.target.value === 'true' ? true : false)}
                            input={<SelectInput />}
                          >
                            <option value={true}>{text.enable}</option>
                            <option value={false}>{text.disable}</option>
                          </Select>
                        ) : generalInfo.services.scp ? (
                          <div className="w-fit-content bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">
                            <span className="text-sm font-medium -tracking-0.58">{text.enable}</span>
                          </div>
                        ) : (
                          <div className="w-fit-content bg-red-light-grayish text-red-bright rounded-6 text-center py-px px-2.5">
                            <span className="text-sm font-medium -tracking-0.58">{text.disable}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="xs:flex items-center my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.bd}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.services ? (
                          <Select
                            native
                            value={editGeneralInfo.services.bd}
                            onChange={e => handleChange('services', 'bd', e.target.value === 'true' ? true : false)}
                            input={<SelectInput />}
                          >
                            <option value={true}>{text.enable}</option>
                            <option value={false}>{text.disable}</option>
                          </Select>
                        ) : generalInfo.services.bd ? (
                          <div className="w-fit-content bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">
                            <span className="text-sm font-medium -tracking-0.58">{text.enable}</span>
                          </div>
                        ) : (
                          <div className="w-fit-content bg-red-light-grayish text-red-bright rounded-6 text-center py-px px-2.5">
                            <span className="text-sm font-medium -tracking-0.58">{text.disable}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-3" />
                </div>
              </CardContent>
              <CardActions>
                {generalEditable.services ? (
                  <>
                    <BlueButton onClick={() => handleSave('services')}>{text.save}</BlueButton>
                    <GrayButton onClick={() => handleCancel('services')}>{text.cancel}</GrayButton>
                  </>
                ) : (
                  <GrayButton onClick={() => handleEdit('services')}>{text.edit}</GrayButton>
                )}
              </CardActions>
            </WhiteCard>
          </div>
        )}
        <div className="hidden">
          <div id="needs-details" className="mt-5">
            <WhiteCard>
              <CardContent>
                <p className="mb-4 text-2xl font-semibold">{text.needsDetails}</p>
                <Divider />
                <p className="mt-7.5 leading-1.75 opacity-50">{text.needsDetailsDescription}</p>
                <div className="xl:flex mt-12.5">
                  <div className="flex-7">
                    <div className="my-4">
                      <div className="xs:flex items-center">
                        <div className="flex-2">
                          <p className="font-light">{text.socialAssistance}:</p>
                        </div>
                        <div className="flex-5">
                          {generalEditable.needs ? (editGeneralInfo.needs.social === 1 ? (
                            <div className="flex">
                              <div>
                                <BlueOutlineButton onClick={() => handleChange('needs', 'social', 1)}>{text.yes}</BlueOutlineButton>
                              </div>
                              <div className="ml-4">
                                <GrayOutlineButton onClick={() => handleChange('needs', 'social', 0)}>{text.no}</GrayOutlineButton>
                              </div>
                            </div>
                          ) : (
                            <div className="flex">
                              <div>
                                <GrayOutlineButton onClick={() => handleChange('needs', 'social', 1)}>{text.yes}</GrayOutlineButton>
                              </div>
                              <div className="ml-4">
                                <BlueOutlineButton onClick={() => handleChange('needs', 'social', 0)}>{text.no}</BlueOutlineButton>
                              </div>
                            </div>
                          )) : (
                            <p className="font-medium">{generalInfo.needs.social === 1 ? text.yes : text.no}</p>
                          )}
                        </div>
                      </div>
                      <div className="xs:flex items-center">
                        <div className="flex-2" />
                        <div className="flex-5">
                          {generalEditable.needs && <p className="pt-1 text-xs leading-loose opacity-50">{text.indicateSocialAssistance}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="xs:flex items-center my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.familyComposition}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.needs ? (
                          <Select
                            native
                            value={editGeneralInfo.needs.family}
                            onChange={e => handleChange('needs', 'family', parseInt(e.target.value))}
                            input={<SelectInput />}
                          >
                            <option value={0}>{text.singlePerson}</option>
                            <option value={1}>{text.family}</option>
                          </Select>
                        ) : (
                          <p className="font-medium">{generalInfo.needs.family === 0 ? text.singlePerson : text.family}</p>
                        )}
                      </div>
                    </div>
                    {editGeneralInfo.needs.family === 1 ? (
                      <div className="my-4">
                        <div className="xs:flex items-center">
                          <div className="flex-2">
                            <p className="font-light">{text.dependents}:</p>
                          </div>
                          <div className="flex-5">
                            {generalEditable.needs ? (
                              <Select
                                native
                                value={editGeneralInfo.needs.dependents}
                                onChange={e => handleChange('needs', 'dependents', parseInt(e.target.value))}
                                input={<SelectInput />}
                              >
                                <option aria-label="None" value="" hidden />
                                <option value={1}>{text.one}</option>
                                <option value={2}>{text.two}</option>
                              </Select>
                            ) : (
                              <p className="font-medium">{generalInfo.needs.dependents}</p>
                            )}
                          </div>
                        </div>
                        <div className="xs:flex items-center">
                          <div className="flex-2" />
                          <div className="flex-5">
                            {generalEditable.needs && <p className="pt-1 text-xs leading-loose opacity-50">{text.indicateHowMany}</p>}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-3" />
                </div>
              </CardContent>
              <CardActions>
                {generalEditable.needs ? (
                  <>
                    <BlueButton onClick={() => handleSave('needs')}>{text.save}</BlueButton>
                    <GrayButton onClick={() => handleCancel('needs')}>{text.cancel}</GrayButton>
                  </>
                ) : (
                  <GrayButton onClick={() => handleEdit('needs')}>{text.edit}</GrayButton>
                )}
              </CardActions>
            </WhiteCard>
          </div>
          <div id="location-details" className="mt-5">
            <WhiteCard>
              <CardContent>
                <p className="mb-4 text-2xl font-semibold">{text.locationDetails}</p>
                <Divider />
                <p className="mt-7.5 leading-1.75 opacity-50">{text.locationDetailsDescription}</p>
                <div className="xl:flex mt-12.5">
                  <div className="flex-7">
                    <div className="my-4">
                      <div className="sm:flex items-center">
                        <div className="flex-2">
                          <p className="font-light">{text.residence}:</p>
                        </div>
                        <div className="flex-5">
                          {generalEditable.location ? (editGeneralInfo.location.residence === 1 ? (
                            <div className="xs:flex">
                              <div className="xs:block hidden">
                                <BlueOutlineButton onClick={() => handleChange('location', 'residence', 1)}>{text.onCampus}</BlueOutlineButton>
                              </div>
                              <div className="xs:hidden block">
                                <BlueOutlineButton fullWidth onClick={() => handleChange('location', 'residence', 1)}>{text.onCampus}</BlueOutlineButton>
                              </div>
                              <div className="xs:block hidden ml-4">
                                <GrayOutlineButton onClick={() => handleChange('location', 'residence', 0)}>{text.offCampus}</GrayOutlineButton>
                              </div>
                              <div className="xs:hidden block xs:ml-4 xs:mt-0 mt-2">
                                <GrayOutlineButton fullWidth onClick={() => handleChange('location', 'residence', 0)}>{text.offCampus}</GrayOutlineButton>
                              </div>
                            </div>
                          ) : (
                            <div className="xs:flex">
                              <div className="xs:block hidden">
                                <GrayOutlineButton onClick={() => handleChange('location', 'residence', 1)}>{text.onCampus}</GrayOutlineButton>
                              </div>
                              <div className="xs:hidden block">
                                <GrayOutlineButton fullWidth onClick={() => handleChange('location', 'residence', 1)}>{text.onCampus}</GrayOutlineButton>
                              </div>
                              <div className="xs:block hidden ml-4">
                                <BlueOutlineButton onClick={() => handleChange('location', 'residence', 0)}>{text.offCampus}</BlueOutlineButton>
                              </div>
                              <div className="xs:hidden block xs:ml-4 xs:mt-0 mt-2">
                                <BlueOutlineButton fullWidth onClick={() => handleChange('location', 'residence', 0)}>{text.offCampus}</BlueOutlineButton>
                              </div>
                            </div>
                          )) : (
                            <p className="font-medium">{generalInfo.location.residence === 1 ? 'On-campus' : 'Off-campus'}</p>
                          )}
                        </div>
                      </div>
                      <div className="sm:flex items-center">
                        <div className="flex-2" />
                        <div className="flex-5">
                          {generalEditable.location && <p className="pt-1 text-xs leading-loose opacity-50">{text.limitLocations}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="xs:flex items-center">
                        <div className="flex-2">
                          <p className="font-light">{text.campus}:</p>
                        </div>
                        <div className="flex-5">
                          {generalEditable.location ? (
                            <Select
                              native
                              value={editGeneralInfo.location.campus}
                              onChange={e => handleChange('location', 'campus', parseInt(e.target.value))}
                              input={<SelectInput />}
                              children={campusList.map((item, index) => (
                                <option key={`campus-option-${index}`} className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={item.id}>{item.name}</option>
                              ))}
                            />
                          ) : (
                            <p className="font-medium">{campusList.find(item => item.id === generalInfo.location.campus) && campusList.find(item => item.id === generalInfo.location.campus).name}</p>
                          )}
                        </div>
                      </div>
                      <div className="xs:flex items-center">
                        <div className="flex-2" />
                        <div className="flex-5">
                          {generalEditable.location && <p className="pt-1 text-xs leading-loose opacity-50">{text.selectCampus}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="xs:flex items-center my-4">
                      <div className="flex-2">
                        <p className="font-light">{text.building}:</p>
                      </div>
                      <div className="flex-5">
                        {generalEditable.location ? (
                          <Select
                            native
                            value={editGeneralInfo.location.building}
                            onChange={e => handleChange('location', 'building', parseInt(e.target.value))}
                            input={<SelectInput />}
                            children={buildingList.map((item, index) => (
                              <option key={`building-option-${index}`} value={item.id}>{item.name}</option>
                            ))}
                          />
                        ) : (
                          <p className="font-medium">{buildingList.find(item => item.id === generalInfo.location.building) && buildingList.find(item => item.id === generalInfo.location.building).name}</p>
                        )}
                      </div>
                    </div>
                    {editGeneralInfo.location.residence === 1 ? (
                      <div className="my-4">
                        <div className="xs:flex items-center">
                          <div className="flex-2">
                            <p className="font-light">{text.room}:</p>
                          </div>
                          <div className="flex-5">
                            {generalEditable.location ? (
                              <TextInput value={editGeneralInfo.location.room} onChange={e => handleChange('location', 'room', e.target.value)} />
                            ) : (
                              <p className="font-medium">{generalInfo.location.room}</p>
                            )}
                          </div>
                        </div>
                        <div className="xs:flex items-center">
                          <div className="flex-2" />
                          <div className="flex-5">
                            {generalEditable.location && <p className="pt-1 text-xs leading-loose opacity-50">{text.provideResidence}</p>}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-3" />
                </div>
              </CardContent>
              <CardActions>
                {generalEditable.location ? (
                  <>
                    <BlueButton onClick={() => handleSave('location')}>{text.save}</BlueButton>
                    <GrayButton onClick={() => handleCancel('location')}>{text.cancel}</GrayButton>
                  </>
                ) : (
                  <GrayButton onClick={() => handleEdit('location')}>{text.edit}</GrayButton>
                )}
              </CardActions>
            </WhiteCard>
          </div>
          <div id="social-media" className="mt-5">
            <WhiteCard>
              <CardContent>
                <p className="mb-4 text-2xl font-semibold">{text.socialMedia}</p>
                <Divider />
                <div className="xl:flex mt-7.5">
                  <div className="flex-7">
                    <p className="text-gray-normal leading-1.75">{text.socialMediaDescription}</p>
                    <div className="mt-12.5 my-4">
                      <div className="xs:flex items-center">
                        <div className="sm:flex-2 flex-3">
                          <div className="flex items-center">
                            <FacebookIcon />
                            <p className="ml-3 font-light">{text.facebook}:</p>
                          </div>
                        </div>
                        <div className="sm:flex-5 flex-4 xs:mt-0 mt-2">
                          {generalEditable.social ? (
                            <>
                              <div className="xs:block hidden">
                                <GrayButton>{text.connectAccount}</GrayButton>
                              </div>
                              <div className="xs:hidden block">
                                <GrayButton fullWidth>{text.connectAccount}</GrayButton>
                              </div>
                            </>
                          ) : (
                            <p className="font-medium opacity-50">{text.notSet}</p>
                          )}
                        </div>
                      </div>
                      <div className="xs:flex items-center">
                        <div className="sm:flex-2 flex-3" />
                        <div className="sm:flex-5 flex-4">
                          {generalEditable.social && <p className="pt-1 text-xs leading-loose opacity-50">{text.allowFacebook}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="xs:flex items-center">
                        <div className="sm:flex-2 flex-3">
                          <div className="flex items-center">
                            <InstagramIcon />
                            <p className="ml-3 font-light">{text.instagram}:</p>
                          </div>
                        </div>
                        <div className="sm:flex-5 flex-4 xs:mt-0 mt-2">
                          {generalEditable.social ? (
                            <>
                              <div className="xs:block hidden">
                                <GrayButton>{text.connectAccount}</GrayButton>
                              </div>
                              <div className="xs:hidden block">
                                <GrayButton fullWidth>{text.connectAccount}</GrayButton>
                              </div>
                            </>
                          ) : (
                            <p className="font-medium opacity-50">{text.notSet}</p>
                          )}
                        </div>
                      </div>
                      <div className="xs:flex items-center">
                        <div className="sm:flex-2 flex-3" />
                        <div className="sm:flex-5 flex-4">
                          {generalEditable.social && <p className="pt-1 text-xs leading-loose opacity-50">{text.allowInstagram}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="xs:flex items-center">
                        <div className="sm:flex-2 flex-3">
                          <div className="flex items-center">
                            <TwitterIcon />
                            <p className="ml-3 font-light">{text.twitter}:</p>
                          </div>
                        </div>
                        <div className="sm:flex-5 flex-4 xs:mt-0 mt-2">
                          {generalEditable.social ? (
                            <>
                              <div className="xs:block hidden">
                                <GrayButton>{text.connectAccount}</GrayButton>
                              </div>
                              <div className="xs:hidden block">
                                <GrayButton fullWidth>{text.connectAccount}</GrayButton>
                              </div>
                            </>
                          ) : (
                            <p className="font-medium opacity-50">{text.notSet}</p>
                          )}
                        </div>
                      </div>
                      <div className="xs:flex items-center">
                        <div className="sm:flex-2 flex-3" />
                        <div className="sm:flex-5 flex-4">
                          {generalEditable.social && <p className="pt-1 text-xs leading-loose opacity-50">{text.allowTwitter}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-3" />
                </div>
              </CardContent>
              <CardActions>
                {generalEditable.social ? (
                  <>
                    <BlueButton onClick={() => handleSave('social')}>{text.save}</BlueButton>
                    <GrayButton onClick={() => handleCancel('social')}>{text.cancel}</GrayButton>
                  </>
                ) : (
                  <GrayButton onClick={() => handleEdit('social')}>{text.edit}</GrayButton>
                )}
              </CardActions>
            </WhiteCard>
          </div>
          <div id="delete-account" className="mt-5">
          </div>
          <WhiteCard>
            <CardContent>
              <p className="mb-4 text-2xl font-semibold">{text.deleteAccount}</p>
              <Divider />
              <p className="my-7.5 leading-1.75 opacity-50">{text.deleteAccountDescription}</p>
            </CardContent>
            <CardActions>
              <RedButton onClick={() => handleDelete()}>{text.deleteAccount}</RedButton>
            </CardActions>
          </WhiteCard>
        </div>
      </div>
      <div className="flex-1 lg:block hidden mt-7 ml-12">
        <SectionTabs tabs={generalTabs} />
      </div>
    </div>
  );
}

export default withCookies(General);
