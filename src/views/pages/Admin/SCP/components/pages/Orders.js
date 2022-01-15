import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Close, ArrowBack } from '@material-ui/icons';

import { DarkGreenButton, ActionButton } from '../../../../../../components/Buttons';
import { OrderDetailsDialog, DeleteDialogWithDescription } from '../Dialogs';

import { getUsers } from '../../../../../../apis/user';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

function Orders({ text }) {
  const { setLoading, setMessage } = useAppContext();
  const { categories } = useSCPContext();
  const [orders, setOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: '',
    description: '',
  });

  const loadOrders = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      // setOrders(res);
      setOrders([
        { id: 4698, school_name: 'Scarborough Campus', created_at: '2021-06-01', updated_at: '2021-06-03', status: 0, items: [{ category_id: 1, product_id: 1, qty: 2000, sent: null }, { category_id: 2, product_id: 3, qty: 3000, sent: null }] },
        { id: 4699, school_name: 'St.George Campus', created_at: '2021-05-12', updated_at: '2021-05-25', status: 0, items: [{ category_id: 1, product_id: 2, qty: 1000, sent: null }, { category_id: 2, product_id: 4, qty: 2000, sent: null }] }
      ]);
      setLoading(false);
    }).catch(err => {
      setOrders([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrders });
      setLoading(false)
    });
  }, [text, setLoading, setMessage]);

  const loadData = useCallback(() => {
    setLoading(true);
    // Load closed orders
    getUsers().then(res => {
      // setClosedOrders(res);
      setClosedOrders([
        { id: 4690, school_name: 'Mississauga Campus', created_at: '2021-06-01', updated_at: '2021-06-03', processed_at: '2021-06-03', status: 1, items: [{ category_id: 1, product_id: 1, qty: 2000, sent: 1500 }, { category_id: 2, product_id: 3, qty: 3000, sent: 2000 }] },
        { id: 4691, school_name: 'Toronto Campus', created_at: '2021-06-01', updated_at: '2021-06-03', processed_at: '2021-06-03', description: 'Wrong order', status: 2, items: [{ category_id: 1, product_id: 1, qty: 2000, sent: null }, { category_id: 2, product_id: 3, qty: 3000, sent: null }] },
      ]);
      loadOrders();
    }).catch(err => {
      setClosedOrders([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrders });
      setLoading(false)
    });
  }, [text, loadOrders, setLoading, setMessage]);

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

  const viewDetails = (item) => {
    setDialogData(item);
    setOpenDialog(true);
  };

  const onReject = (item) => {
    setDialogData(item);
    setOpenRejectDialog(true);
  };

  const handleReject = (message) => {
    setLoading(true);
    getUsers(dialogData.id, message).then(res => {
      loadOrders();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedRejectOrder });
      setLoading(false);
    });

    setOpenRejectDialog(false);
  };

  const handleViewLogs = (show) => {
    setPage(0);
    setRowsPerPage(10);
    setShowLogs(show);
  };

  return (
    <div>
      {!showLogs ? (
        <>
          <div className="mb-6 flex justify-end items-center">
            <DarkGreenButton onClick={() => handleViewLogs(true)}>{text.viewLogs}</DarkGreenButton>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="category table">
              <TableHead>
                <TableRow>
                  <TableCell width={100} align="center">{text.orderID}</TableCell>
                  <TableCell align="center">{text.schoolName}</TableCell>
                  <TableCell align="center">{text.createdAt}</TableCell>
                  <TableCell align="center">{text.lastUpdatedAt}</TableCell>
                  <TableCell width={100} align="center">{text.action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell width={100} align="center"><span className="text-blue-cornflower font-semibold cursor-pointer hover:underline" onClick={() => viewDetails(item)}>{item.id}</span></TableCell>
                      <TableCell align="center">{item.school_name}</TableCell>
                      <TableCell align="center">{item.created_at}</TableCell>
                      <TableCell align="center">{item.updated_at}</TableCell>
                      <TableCell width={100} align="center">
                        <div className="flex justify-center">
                          <ActionButton onClick={() => onReject(item)}><Close /></ActionButton>
                        </div>
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
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <>
          <div className="mb-6 flex justify-start items-center">
            <ActionButton onClick={() => handleViewLogs(false)}><ArrowBack /></ActionButton>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="category table">
              <TableHead>
                <TableRow>
                  <TableCell width={100} align="center">{text.orderID}</TableCell>
                  <TableCell align="center">{text.schoolName}</TableCell>
                  <TableCell align="center">{text.createdAt}</TableCell>
                  <TableCell align="center">{text.lastUpdatedAt}</TableCell>
                  <TableCell width={100} align="center">{text.status}</TableCell>
                  <TableCell align="center">{text.processedAt}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {closedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell width={100} align="center"><span className="text-blue-cornflower font-semibold cursor-pointer hover:underline" onClick={() => viewDetails(item)}>{item.id}</span></TableCell>
                      <TableCell align="center">{item.school_name}</TableCell>
                      <TableCell align="center">{item.created_at}</TableCell>
                      <TableCell align="center">{item.updated_at}</TableCell>
                      <TableCell width={100} align="center">
                        {item.status === 1 ? <span className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.completed}</span> : <span className="bg-red-light-grayish text-red-bright rounded-6 text-center py-px px-2.5">{text.rejected}</span>}
                      </TableCell>
                      <TableCell align="center">{item.processed_at}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
      <OrderDetailsDialog
        text={text}
        open={openDialog}
        data={dialogData}
        onClose={() => setOpenDialog(false)}
      />
      <DeleteDialogWithDescription
        text={text}
        open={openRejectDialog}
        title={text.rejectOrder}
        onClose={() => setOpenRejectDialog(false)}
        onConfirm={handleReject}
      />
    </div>
  );
}

export default Orders;
