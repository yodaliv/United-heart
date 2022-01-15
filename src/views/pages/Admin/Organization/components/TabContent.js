import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';

import { BlueButton } from '../../../../../components/Buttons';
import InviteDialog from './InviteDialog';

import { invite } from '../../../../../apis/auth';
import { userTypes } from '../../../../../constants';
import { validateEmail } from '../../../../../utils';
import { getOrganizations } from '../../../../../apis/organization';
import { useAppContext } from '../../../../../context/AppContext';

function TabContent({ text, org_id, type_id }) {
  const { setLoading, setMessage } = useAppContext();
  const [orgList, setOrgList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const loadOrgs = useCallback(() => {
    if (!Boolean(org_id)) return;

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
  }, [text, org_id, type_id, setLoading, setMessage]);

  useEffect(() => {
    loadOrgs();
  }, [loadOrgs]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onInvite = () => {
    setOpenDialog(true);
    setDialogData({
      firstname: '',
      lastname: '',
      email: '',
    });
  };

  const handleChangeDialog = (name, val) => {
    setDialogData({ ...dialogData, [name]: val });
  };

  const handleInvite = () => {
    if (dialogData.email === '') {
      setMessage({ open: true, title: text.warning, description: text.emailEmpty });
      return;
    } else if (!validateEmail(dialogData.email)) {
      setMessage({ open: true, title: text.warning, description: text.emailIncorrect });
      return;
    }

    setLoading(true);
    invite({ ...dialogData, user_type: userTypes.masterAdmin, org_id, org_type_id: type_id }).then(res => {
      setMessage({ open: true, title: text.success, description: `${text.successInvitation} ${dialogData.email}` });
      setLoading(false);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedInvitation });
      setLoading(false);
    });

    setOpenDialog(false);
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <BlueButton onClick={() => onInvite()}>{text.invite}</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width={200} align="center">{text.orgName}</TableCell>
              <TableCell width={200} align="center">{text.address}</TableCell>
              <TableCell width={150} align="center">{text.city}</TableCell>
              <TableCell width={150} align="center">{text.state}</TableCell>
              <TableCell width={150} align="center">{text.postalCode}</TableCell>
              <TableCell width={150} align="center">{text.country}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow hover role="checkbox" key={index}>
                <TableCell width={200} align="center">{item.org_name}</TableCell>
                <TableCell width={200} align="center">{item.address}</TableCell>
                <TableCell width={150} align="center">{item.city}</TableCell>
                <TableCell width={150} align="center">{item.state}</TableCell>
                <TableCell width={150} align="center">{item.postal_code}</TableCell>
                <TableCell width={150} align="center">{item.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orgList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <InviteDialog
        text={text}
        open={openDialog}
        data={dialogData}
        onChange={(name, val) => handleChangeDialog(name, val)}
        onClose={() => setOpenDialog(false)}
        onFinish={() => handleInvite()}
      />
    </>
  );
}

export default TabContent;
