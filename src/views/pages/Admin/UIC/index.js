import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';

import { BlueButton } from '../../../../components/Buttons';
import InviteDialog from './components/InviteDialog';

import { getUICOrganization } from '../../../../apis/organization';
import { getUsersWithOrgIds } from '../../../../apis/user';
import { invite } from '../../../../apis/auth';
import { userTypes } from '../../../../constants';
import { validateEmail } from '../../../../utils';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function UIC() {
  const text = useTranslations('uicManagement');
  const { setLoading, setMessage } = useAppContext();
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const loadUsers = useCallback(() => {
    setLoading(true);
    getUICOrganization().then(res => {
      const parent_id = res.id;
      if (parent_id) {
        getUsersWithOrgIds([parent_id]).then(res => {
          setUserList(res);
          setLoading(false);
        }).catch(err => {
          setUserList([]);
          setMessage({ open: true, title: text.error, description: text.failedLoadAdmins });
          setLoading(false);
        });
      } else {
        setUserList([]);
        setMessage({ open: true, title: text.error, description: text.failedLoadAdmins });
        setLoading(false);
      }
    }).catch(err => {
      setUserList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadAdmins });
      setLoading(false);
    });
  }, [text, setLoading, setMessage]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

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
    invite({ ...dialogData, user_type: userTypes.uicAdmin }).then(res => {
      setMessage({ open: true, title: text.success, description: `${text.successInvitation} ${dialogData.email}` });
      setLoading(false);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedInvitation });
      setLoading(false);
    });

    setOpenDialog(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold">{text.title}</p>
        <BlueButton onClick={() => onInvite()}>{text.invite}</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width={200} align="center">{text.name}</TableCell>
              <TableCell width={150} align="center">{text.email}</TableCell>
              <TableCell width={150} align="center">{text.phone}</TableCell>
              <TableCell align="center">{text.occupation}</TableCell>
              <TableCell width={50} align="center">{text.status}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow hover role="checkbox" key={index}>
                <TableCell width={200} align="center">{`${item.firstname} ${item.lastname}`}</TableCell>
                <TableCell width={150} align="center">{item.email}</TableCell>
                <TableCell width={150} align="center">{item.phone_number}</TableCell>
                <TableCell align="center">{item.occupation}</TableCell>
                <TableCell width={50} align="center">{item.is_active ? <p className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.active}</p> : <p className="bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.inactive}</p>}</TableCell>
              </TableRow>
            ))}
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
      <InviteDialog
        text={text}
        open={openDialog}
        data={dialogData}
        onChange={(name, val) => handleChangeDialog(name, val)}
        onClose={() => setOpenDialog(false)}
        onFinish={() => handleInvite()}
      />
    </div>
  );
}

export default UIC;
