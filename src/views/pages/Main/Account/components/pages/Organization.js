import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, Select } from '@material-ui/core';

import { SelectInput } from '../../../../../../components/Inputs';
import { BlueButton } from '../../../../../../components/Buttons';
import { TableCard, TableCardContent } from '../../../../../../components/Cards';
import { CustomTableRow, CustomPageSelectInput, CustomTablePagination } from '../../../../../../components/Table';
import { CreateOrgTypeDialog, InviteDialog } from '../Dialogs';
import InviteMenu from '../InviteMenu';

import { getOrganizationTypes, getOrganizations, createOrganizationType } from '../../../../../../apis/organization';
import { invite } from '../../../../../../apis/auth';
import { userTypes } from '../../../../../../constants';
import { validateEmail } from '../../../../../../utils';
import { useAppContext } from '../../../../../../context/AppContext';

function Organization({ text, org_id }) {
  const { setLoading, setMessage } = useAppContext();

  const [orgList, setOrgList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orgTypes, setOrgTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState({ type: userTypes.masterAdmin, open: false });
  const [createDialogData, setCreateDialogData] = useState({
    org_type: '',
  });
  const [inviteDialogData, setInviteDialogData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [validations, setValidations] = useState({
    org_type: '',
    email: '',
  });

  const loadOrgs = useCallback((org_id, type_id) => {
    setLoading(true);
    getOrganizations(org_id, type_id).then(res => {
      if (res.length > 0 && res[0].organizations?.length > 0) {
        setOrgList(res[0].organizations);
      } else {
        setOrgList([]);
      }
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setOrgList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrgs });
    });
  }, [text, setLoading, setMessage]);

  const loadData = useCallback(() => {
    setLoading(true);
    getOrganizationTypes(org_id).then(res => {
      setOrgTypes(res);
      if (res.length > 0) {
        setSelectedType(res[0].id);
        loadOrgs(org_id, res[0].id);
      } else {
        setLoading(false);
      }
    }).catch(err => {
      setOrgTypes([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrgTypes });
      setLoading(false);
    });
  }, [text, org_id, loadOrgs, setLoading, setMessage]);

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

  const onChangeType = (val) => {
    if (val === 'create') {
      setCreateDialogData({
        org_type: '',
      });
      setValidations(prevState => ({ ...prevState, org_type: '' }));
      setOpenCreateDialog(true);
    } else {
      setSelectedType(val);
      loadOrgs(org_id, val);
    }
  };

  const onChangeCreateDialog = (name, val) => {
    setCreateDialogData(prevState => ({ ...prevState, [name]: val }));
    setValidations(prevState => ({ ...prevState, [name]: '' }));
  };

  const onInvite = () => {
    setInviteDialogData({
      firstname: '',
      lastname: '',
      email: '',
    });
    setValidations(prevState => ({ ...prevState, email: '' }));
    setOpenInviteDialog({ type: userTypes.masterAdmin, open: true });
  };

  const onInviteMember = (type, org_id) => {
    setInviteDialogData({
      firstname: '',
      lastname: '',
      email: '',
      org_id: org_id,
    });
    setValidations(prevState => ({ ...prevState, email: '' }));
    setOpenInviteDialog({ type, open: true });
  };

  const onChangeInviteDialog = (name, val) => {
    setInviteDialogData(prevState => ({ ...prevState, [name]: val }));
    setValidations(prevState => ({ ...prevState, [name]: '' }));
  };

  const handleCreateType = () => {
    if (createDialogData.org_type === '') {
      setValidations(prevState => ({ ...prevState, org_type: 'has-empty' }));
      return;
    }

    setLoading(true);
    const params = {
      org_id: org_id,
      org_type: createDialogData.org_type,
    };
    createOrganizationType(params).then(res => {
      loadData();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedCreateOrgType });
      setLoading(false);
    });

    setOpenCreateDialog(false);
  };

  const handleInvite = () => {
    if (inviteDialogData.email === '') {
      setValidations(prevState => ({ ...prevState, email: 'has-empty' }));
      return;
    } else if (!validateEmail(inviteDialogData.email)) {
      setValidations(prevState => ({ ...prevState, email: 'has-danger' }));
      return;
    }

    setLoading(true);
    const params = {
      ...inviteDialogData,
      user_type: openInviteDialog.type,
      org_id: inviteDialogData.org_id || org_id,
      org_type_id: parseInt(selectedType),
    }
    invite(params).then(res => {
      setMessage({ open: true, title: text.success, description: `${text.successInvitation} ${inviteDialogData.email}` });
      setLoading(false);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedInvitation });
      setLoading(false);
    });

    setOpenInviteDialog({ ...openInviteDialog, open: false });
  };

  return (
    <div className="mb-12">
      <div className="mt-6 mb-4 flex justify-end">
        <div className="w-fit-content mr-4">
          <Select
            native
            value={selectedType}
            input={<SelectInput />}
            onChange={e => onChangeType(e.target.value)}
          >
            {orgTypes.map((orgType, index) => (
              <option key={index} value={orgType.id}>{orgType.org_type}</option>
            ))}
            <option value="create" className="text-gray-400">{text.createNew}</option>
            <option value="" hidden></option>
          </Select>
        </div>
        <BlueButton small disabled={orgTypes.length === 0 || selectedType === ''} onClick={() => onInvite()}>{text.invite}</BlueButton>
      </div>
      <TableCard>
        <TableCardContent>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <CustomTableRow>
                  <TableCell>{text.orgName}</TableCell>
                  <TableCell>{text.address}</TableCell>
                  <TableCell>{text.city}</TableCell>
                  <TableCell>{text.state}</TableCell>
                  <TableCell>{text.postalCode}</TableCell>
                  <TableCell>{text.country}</TableCell>
                  <TableCell width={100} />
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {orgList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <CustomTableRow key={index}>
                      <TableCell>{item.org_name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.state}</TableCell>
                      <TableCell>{item.postal_code}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell width={100}>
                        <InviteMenu text={text} onFinish={type => onInviteMember(type, item.id)} />
                      </TableCell>
                    </CustomTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orgList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              input: (<CustomPageSelectInput />),
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={CustomTablePagination}
          />
        </TableCardContent>
      </TableCard>
      <CreateOrgTypeDialog
        text={text}
        open={openCreateDialog}
        data={createDialogData}
        validations={validations}
        onChange={onChangeCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onFinish={() => handleCreateType()}
      />
      <InviteDialog
        text={text}
        userTypes={userTypes}
        open={openInviteDialog.open}
        type={openInviteDialog.type}
        data={inviteDialogData}
        validations={validations}
        onChange={onChangeInviteDialog}
        onClose={() => setOpenInviteDialog({ ...openInviteDialog, open: false })}
        onFinish={() => handleInvite()}
      />
    </div>
  );
}

export default Organization;
