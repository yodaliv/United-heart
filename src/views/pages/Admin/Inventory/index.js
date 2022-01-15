import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { BlueButton, ActionButton } from '../../../../components/Buttons';
import InventoryDialog from './components/InventoryDialog';

import { getInventories, createInventory, updateInventory, deleteInventory } from '../../../../apis/inventory';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function Inventory(props) {
  const { history, match } = props;
  const donationID = match.params.id;
  const text = useTranslations('inventoryManagement');
  const { setLoading, setMessage } = useAppContext();
  const [inventoryList, setInventoryList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [dialogData, setDialogData] = useState({
    product_name: '',
    product_description: '',
    product_quantity: '',
    images: []
  });

  const loadInventories = useCallback(() => {
    if (!Boolean(donationID)) history.push('/admin/donation');

    setLoading(true);
    getInventories(donationID).then(res => {
      setInventoryList(res);
      setLoading(false);
    }).catch(err => {
      setInventoryList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadInventories });
      setLoading(false);
    });
  }, [donationID, history, text, setLoading, setMessage]);

  useEffect(() => {
    loadInventories();
  }, [loadInventories]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    setOpenDialog({ type: 'create', open: true });
    setDialogData({
      product_name: '',
      product_description: '',
      product_quantity: '',
      images: []
    });
  };

  const handleEdit = (item) => {
    setOpenDialog({ type: 'edit', open: true });
    setDialogData({ ...item, images: [] });
  };

  const handleChangeDialog = (name, val) => {
    setDialogData({ ...dialogData, [name]: val });
  }

  const handleSave = () => {
    if (openDialog.type === 'create') {
      if (dialogData.product_name === '' || dialogData.product_description === '' || dialogData.product_quantity === '' || dialogData.images.length === 0) {
        setMessage({ open: true, title: text.warning, description: text.fillAllData });
      } else {
        const formData = new FormData();
        formData.append('product_name', dialogData.product_name);
        formData.append('product_description', dialogData.product_description);
        formData.append('product_quantity', dialogData.product_quantity);
        for (const key of Object.keys(dialogData.images)) {
          formData.append('product_images', dialogData.images[key]);
        }
        setLoading(true);
        createInventory(donationID, formData).then(res => {
          loadInventories();
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedCreateInventory });
          setLoading(false);
        });
      }
    } else {
      const formData = new FormData();
      formData.append('product_name', dialogData.product_name);
      formData.append('product_description', dialogData.product_description);
      formData.append('product_quantity', dialogData.product_quantity);
      formData.append('is_active', dialogData.is_active);
      for (const key of Object.keys(dialogData.images)) {
        formData.append('product_images', dialogData.images[key]);
      }
      setLoading(true);
      updateInventory(dialogData.id, formData).then(res => {
        loadInventories();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedUpdateInventory });
        setLoading(false);
      });
    }

    setOpenDialog({ type: 'create', open: false });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteInventory(id).then(res => {
      loadInventories();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteInventory });
      setLoading(false)
    });
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold">{text.title}</p>
        <BlueButton onClick={() => handleCreate()}>{text.addNew}</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width={100} align="center">{text.image}</TableCell>
              <TableCell width={200} align="center">{text.name}</TableCell>
              <TableCell align="center">{text.description}</TableCell>
              <TableCell width={150} align="center">{text.quantity}</TableCell>
              <TableCell width={100} align="center">{text.status}</TableCell>
              <TableCell width={100} align="center">{text.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell width={100} align="center">
                    <div className="flex justify-center">
                      {item.product_urls.length > 0 && (
                        <img className="w-7.5 h-7.5" src={item.product_urls[0]} alt="Inventory item logo" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell width={200} align="center">{item.product_name}</TableCell>
                  <TableCell align="center">{item.product_description}</TableCell>
                  <TableCell width={150} align="center">{item.product_quantity}</TableCell>
                  <TableCell width={50} align="center">{item.is_active ? <p className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.active}</p> : <p className="bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.inactive}</p>}</TableCell>
                  <TableCell width={100} align="center">
                    <div className="flex justify-around">
                      <ActionButton onClick={() => handleEdit(item)}><Edit /></ActionButton>
                      <ActionButton onClick={() => handleDelete(item.id)}><Delete /></ActionButton>
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
      <InventoryDialog
        text={text}
        open={openDialog.open}
        type={openDialog.type}
        data={dialogData}
        onChange={(name, val) => handleChangeDialog(name, val)}
        onClose={() => setOpenDialog({ ...openDialog, open: false })}
        onFinish={() => handleSave()}
      />
    </div>
  );
}

export default Inventory;
