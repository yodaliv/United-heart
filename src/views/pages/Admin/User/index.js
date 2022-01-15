import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow, Select } from '@material-ui/core';

import { SelectInput } from '../../../../components/Inputs';

import { getUICOrganization, getOrganizationTypes } from '../../../../apis/organization';
import { getUsers } from '../../../../apis/user';
import { userTypes } from '../../../../constants';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function User() {
  const text = useTranslations('userManagement');
  const { setLoading, setMessage } = useAppContext();
  const [userList, setUserList] = useState([]);
  const [orgTypes, setOrgTypes] = useState([]);
  const [uicOrgId, setUicOrgId] = useState(null);
  const [selectedType, setSelectedType] = useState('0');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadUsers = useCallback((org_id, org_type_id) => {
    setLoading(true);
    getUsers(org_id, org_type_id).then(res => {
      setUserList(res.filter(item => item.role !== userTypes.uicAdmin));
      setLoading(false);
    }).catch(err => {
      setUserList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadUsers });
      setLoading(false)
    });
  }, [text, setLoading, setMessage]);

  const loadData = useCallback(() => {
    setLoading(true);
    getUICOrganization().then(res => {
      const parent_id = res.id;
      setUicOrgId(parent_id);
      getOrganizationTypes(parent_id).then(res => {
        setOrgTypes(res);
        loadUsers(parent_id);
      }).catch(err => {
        setOrgTypes([]);
        setMessage({ open: true, title: text.error, description: text.failedLoadOrgTypes });
        setLoading(false);
      });
    }).catch(err => {
      setOrgTypes([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrgTypes });
      setLoading(false);
    });
  }, [text, loadUsers, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChangeType = (type) => {
    setSelectedType(type);
    if (type === '0') loadUsers(uicOrgId);
    else loadUsers(uicOrgId, type);
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

  return (
    <div>
      <div className="mb-6 flex justify-start items-center">
        <div className="flex-5">
          <p className="text-xl font-bold">{text.title}</p>
        </div>
        <div className="flex-3 max-w-xs">
          <Select
            native
            value={selectedType}
            onChange={e => onChangeType(e.target.value)}
            input={<SelectInput />}
          >
            <option value="0">{text.all}</option>
            {orgTypes.map((orgType, index) => (
              <option key={index} value={orgType.id}>{orgType.org_type}</option>
            ))}
          </Select>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width={200} align="center">{text.name}</TableCell>
              <TableCell width={150} align="center">{text.email}</TableCell>
              <TableCell width={150} align="center">{text.phone}</TableCell>
              <TableCell width={150} align="center">{text.occupation}</TableCell>
              <TableCell width={100} align="center">{text.role}</TableCell>
              <TableCell width={50} align="center">{text.verification}</TableCell>
              <TableCell width={50} align="center">{text.status}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell width={200} align="center">{`${item.firstname} ${item.lastname}`}</TableCell>
                  <TableCell width={150} align="center">{item.email}</TableCell>
                  <TableCell width={150} align="center">{item.phone_number}</TableCell>
                  <TableCell width={150} align="center">{item.occupation}</TableCell>
                  <TableCell width={100} align="center">{getRoleName(item.role)}</TableCell>
                  <TableCell width={50} align="center">{item.email_verified ? <p className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.verified}</p> : <p className="bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.notYet}</p>}</TableCell>
                  <TableCell width={50} align="center">{item.is_active ? <p className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.active}</p> : <p className="bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.inactive}</p>}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default User;
