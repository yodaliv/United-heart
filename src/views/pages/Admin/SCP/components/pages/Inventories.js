import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Description, ArrowBack } from '@material-ui/icons';

import { BlueButton, DarkGreenButton, RedButton, ActionButton } from '../../../../../../components/Buttons';
import { InventoryDialog } from '../Dialogs';

import { getUsers } from '../../../../../../apis/user';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

function Inventories({ text }) {
  const { setLoading, setMessage } = useAppContext();
  const { categories, products, getCategoryName, getProductName } = useSCPContext();
  const [inventoryList, setInventoryList] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [logData, setLogData] = useState({ title: '', date: '', description: '', headers: [], rows: [] });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [dialogData, setDialogData] = useState({
    from: '',
    description: '',
    items: []
  });

  const loadInventories = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      setInventoryList([
        { category_id: 1, product_id: 1, qty: 2500 },
        { category_id: 1, product_id: 2, qty: 2000 },
        { category_id: 2, product_id: 3, qty: 5000 },
        { category_id: 2, product_id: 4, qty: 6000 }
      ]);
      setLoading(false);
    }).catch(err => {
      setInventoryList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadInventories });
      setLoading(false)
    });
  }, [text, setLoading, setMessage]);

  const loadData = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      setTransactions([
        { id: 3425, description: 'Description1', date: '2021-06-04', items: [{ category_id: 1, product_id: 1, qty: -1000, remain: 2500 }, { category_id: 2, product_id: 4, qty: -2000, remain: 6000 }] },
        { id: 4293, description: 'Description2', date: '2021-05-02', items: [{ category_id: 1, product_id: 1, qty: 1500, remain: 3500 }, { category_id: 1, product_id: 2, qty: -1500, remain: 2000 }, { category_id: 2, product_id: 3, qty: -1000, remain: 5000 }] },
        { id: 1234, description: 'Description3', date: '2021-04-28', items: [{ category_id: 1, product_id: 1, qty: -500, remain: 2000 }, { category_id: 1, product_id: 2, qty: 500, remain: 3500 }, { category_id: 2, product_id: 4, qty: 3000, remain: 8000 }] },
      ]);
      loadInventories();
    }).catch(err => {
      setTransactions([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadTransactions });
      setLoading(false)
    });
  }, [text, loadInventories, setLoading, setMessage]);

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

  const handleCreate = () => {
    setDialogData({
      from: '',
      description: '',
      items: []
    });
    setOpenDialog({ type: 'create', open: true });
  };

  const handleDelete = () => {
    setDialogData({
      from: '',
      description: '',
      items: []
    });
    setOpenDialog({ type: 'delete', open: true });
  };

  const handleChangeDialog = (name, val, type = null, idx = 0) => {
    if (type) {
      if (type === 'add') {
        let category_id = categories[0].id;
        let product_id = products.filter(product => product.category_id === category_id)[0]?.id;
        setDialogData({ ...dialogData, items: [...dialogData.items, { category_id: category_id, product_id: product_id, qty: 1 }] });
      } else if (type === 'delete') {
        setDialogData({ ...dialogData, items: dialogData.items.filter((item, index) => index !== idx) });
      } else {
        if (name === 'category_id') {
          let category_id = val;
          let product_id = products.filter(product => product.category_id === category_id)[0]?.id;
          setDialogData({ ...dialogData, items: dialogData.items.map((item, index) => index === idx ? { ...item, category_id: category_id, product_id: product_id } : item) });
        } else {
          setDialogData({ ...dialogData, items: dialogData.items.map((item, index) => index === idx ? { ...item, [name]: val } : item) });
        }
      }
    } else {
      setDialogData({ ...dialogData, [name]: val });
    }
  };

  const handleSave = () => {
    setLoading(true);
    if (openDialog.type === 'create') {
      getUsers().then(res => {
        loadInventories();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedCreateInventory });
        setLoading(false);
      });
    } else {
      getUsers().then(res => {
        loadInventories();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedDeleteInventory });
        setLoading(false);
      });
    }

    setOpenDialog({ ...openDialog, open: false });
  };

  const handleViewLogs = (show, inventory = null, transaction = null) => {
    if (inventory) {
      let matchedTransactions = transactions.filter(t => t.items.find(item => item.product_id === inventory.product_id));
      let headers = matchedTransactions.map(t => ({ ...t, label: `#${t.id} (${t.description}, ${t.date})` }));
      let rows = [{
        ...inventory, items: matchedTransactions.map(t => {
          let matchedItem = t.items.find(item => item.product_id === inventory.product_id);
          return matchedItem ? `${matchedItem.remain}(${matchedItem.qty > 0 ? '+' + matchedItem.qty : matchedItem.qty})` : '';
        })
      }];
      setLogData({ title: `${text.product}: ${getProductName(inventory.product_id)}`, date: '', description: '', headers, rows });
    } else if (transaction) {
      let headers = [{ label: text.transactionBefore }, { label: text.transactionQty }, { label: text.transactionAfter }];
      let rows = transaction.items.map(item => ({ ...item, items: [item.remain - item.qty, item.qty > 0 ? '+' + item.qty : item.qty, item.remain] }));
      setLogData({ title: `${text.transaction}: #${transaction.id}`, date: transaction.date, description: transaction.description, headers, rows });
    } else {
      let headers = transactions.map(t => ({ ...t, label: `#${t.id} (${t.description}, ${t.date})` }));
      let rows = inventoryList.map(inventory => ({
        ...inventory, items: transactions.map(t => {
          let matchedItem = t.items.find(item => item.product_id === inventory.product_id);
          return matchedItem ? `${matchedItem.remain}(${matchedItem.qty > 0 ? '+' + matchedItem.qty : matchedItem.qty})` : '';
        })
      }));
      setLogData({ title: '', date: '', description: '', headers, rows });
    }

    setPage(0);
    setRowsPerPage(10);
    setShowLogs(show);
  };

  return (
    <div>
      {!showLogs ? (
        <>
          <div className="mb-6 flex justify-end items-center">
            <div className="mr-4">
              <DarkGreenButton onClick={() => handleViewLogs(true)}>{text.viewLogs}</DarkGreenButton>
            </div>
            <div>
              <BlueButton onClick={() => handleCreate()}>{text.addNew}</BlueButton>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="inventory table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">{text.category}</TableCell>
                  <TableCell align="center">{text.product}</TableCell>
                  <TableCell align="center">{text.qty}</TableCell>
                  <TableCell width={100} align="center">{text.viewLogs}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell align="center">{getCategoryName(item.category_id)}</TableCell>
                      <TableCell align="center">{getProductName(item.product_id)}</TableCell>
                      <TableCell align="center">{item.qty}</TableCell>
                      <TableCell width={100} align="center">
                        <div className="flex justify-center">
                          <ActionButton onClick={() => handleViewLogs(true, item)}><Description /></ActionButton>
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
            count={inventoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <div className="mt-6 flex justify-end items-center">
            <RedButton onClick={() => handleDelete()}>{text.delete}</RedButton>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 flex justify-start items-center">
            <ActionButton onClick={() => handleViewLogs(false)}><ArrowBack /></ActionButton>
          </div>
          <div className="mb-4">
            <div className="flex justify-center items-center">
              <p>{logData.title}</p>
            </div>
            <p>{logData.date && `${text.date}: ${logData.date}`}</p>
            <p>{logData.description && `${text.description}: ${logData.description}`}</p>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="inventory table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">{text.category}</TableCell>
                  <TableCell align="center">{text.product}</TableCell>
                  {logData.headers.map((item, index) => (
                    <TableCell key={index} align="center">
                      {item.id ? (
                        <span className="text-blue-cornflower font-semibold cursor-pointer hover:underline" onClick={() => handleViewLogs(true, null, item)}>{item.label}</span>
                      ) : item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {logData.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" key={idx}>
                      <TableCell align="center">{getCategoryName(row.category_id)}</TableCell>
                      <TableCell align="center">{getProductName(row.product_id)}</TableCell>
                      {row.items.map((item, index) => (
                        <TableCell key={index} align="center">{item}</TableCell>
                      ))}
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
        </>
      )}
      <InventoryDialog
        text={text}
        open={openDialog.open}
        type={openDialog.type}
        data={dialogData}
        onChange={handleChangeDialog}
        onClose={() => setOpenDialog({ ...openDialog, open: false })}
        onSave={() => handleSave()}
      />
    </div>
  );
}

export default Inventories;
