import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { ActionButton } from '../../../../components/Buttons';

import { getUsers } from '../../../../apis/user';
import { getInventories } from '../../../../apis/inventory';
import { getRequests, deleteRequest } from '../../../../apis/request';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function Request(props) {
  const { history, match } = props;
  const donationID = match.params.id;
  const text = useTranslations('requestManagement');
  const { setLoading, setMessage } = useAppContext();
  const [inventoryList, setInventoryList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadRequests = useCallback(() => {
    setLoading(true);
    getRequests(donationID).then(res => {
      setRequestList(res);
      setLoading(false);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedLoadRequests });
      setLoading(false);
    });
  }, [text, donationID, setLoading, setMessage]);

  const loadData = useCallback(() => {
    if (!Boolean(donationID)) history.push('/admin/donation');

    setLoading(true);
    getInventories(donationID).then(res => {
      setInventoryList(res.filter(item => item.is_active === true));
      getUsers().then(res => {
        setUserList(res);
        loadRequests();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedLoadUsers  });
        setLoading(false);
      });
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedLoadInventories });
      setLoading(false);
    });
  }, [donationID, history, text, loadRequests, setLoading, setMessage]);

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

  const handleDelete = (id) => {
    setLoading(true);
    deleteRequest(id).then(res => {
      loadRequests();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteRequest });
      setLoading(false)
    });
  };

  const getUserName = (id) => {
    const match = userList.find(user => user.id === id);
    if (match) return `${match.firstname} ${match.lastname}`;
    else return '';
  };

  const getSchoolName = (id) => {
    const match = userList.find(user => user.id === id);
    if (match) return match.school_name;
    else return '';
  };

  const getCount = (id, requests) => {
    const match = requests.find(request => request.product_id === id);
    if (match) return match.product_quantity;
    else return 0;
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold">{text.title}</p>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width={100} align="center">{text.user}</TableCell>
              <TableCell width={100} align="center">{text.school}</TableCell>
              {inventoryList.map((inventory, index) => (
                <TableCell key={`th-request-${index}`} align="center">{inventory.product_name}</TableCell>
              ))}
              <TableCell width={50} align="center">{text.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              if (getUserName(item.user_id) === '') return null;
              else return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell width={100} align="center">{getUserName(item.user_id)}</TableCell>
                  <TableCell width={100} align="center">{getSchoolName(item.user_id)}</TableCell>
                  {inventoryList.map((inventory, index) => (
                    <TableCell key={`td-request-${index}`} align="center">{getCount(inventory.id, item.inventory_requests)}</TableCell>
                  ))}
                  <TableCell width={50} align="center">
                    <ActionButton onClick={() => handleDelete(item.id)}><Delete /></ActionButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={inventoryList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Request;
