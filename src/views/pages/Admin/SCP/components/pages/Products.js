import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { BlueButton, ActionButton } from '../../../../../../components/Buttons';
import { ProductDialog, DeleteDialog } from '../Dialogs';

import { getInventories } from '../../../../../../apis/inventory';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

function Products({text}) {
  const { setLoading, setMessage } = useAppContext();
  const { categories, products, setProducts, getCategoryName } = useSCPContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    category_id: categories[0].id,
    name: '',
    description: '',
    images: []
  });

  const loadProducts = useCallback(() => {
    setLoading(true);
    getInventories(1).then(res => {
      // setProducts(res);
      setProducts([
        { id: 1, category_id: 1, name: 'Socks', description: 'Socks product' },
        { id: 2, category_id: 1, name: 'Gloves', description: 'Gloves product' },
        { id: 3, category_id: 2, name: 'Soap', description: 'Soap product' },
        { id: 4, category_id: 2, name: 'Toothpaste', description: 'Toothpaste product' }
      ]);
      setLoading(false);
    }).catch(err => {
      setProducts([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadProducts });
      setLoading(false);
    });
  }, [text, setProducts, setLoading, setMessage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    setDialogData({
      category_id: categories[0].id,
      name: '',
      description: '',
      images: []
    });
    setOpenDialog({ type: 'create', open: true });
  };

  const handleEdit = (item) => {
    // setDialogData(item)
    setDialogData({ ...item, images: [] });
    setOpenDialog({ type: 'edit', open: true });
  };

  const handleChangeDialog = (name, val) => {
    setDialogData({ ...dialogData, [name]: val });
  };

  const handleSave = () => {
    if (openDialog.type === 'create') {
      getInventories(1).then(res => {
        loadProducts();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedCreateProduct });
        setLoading(false);
      });
    } else {
      getInventories(1).then(res => {
        loadProducts();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedUpdateProduct });
        setLoading(false);
      });
    }

    setOpenDialog({ ...openDialog, open: false });
  };

  const onDelete = (item) => {
    // setDialogData(item);
    setDialogData({ ...item, images: [] });
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    setLoading(true);
    getInventories(1).then(res => {
      loadProducts();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteProduct });
      setLoading(false)
    });

    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-end items-center">
        <BlueButton onClick={() => handleCreate()}>{text.addNew}</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell width={100} align="center">{text.image}</TableCell>
              <TableCell width={200} align="center">{text.name}</TableCell>
              <TableCell align="center">{text.description}</TableCell>
              <TableCell width={200} align="center">{text.category}</TableCell>
              <TableCell width={100} align="center">{text.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell width={100} align="center">
                    <div className="flex justify-center">
                      {/* {item.images.length > 0 && (
                        <img className="w-7.5 h-7.5" src={item.images[0]} alt="Product item logo" />
                      )} */}
                    </div>
                  </TableCell>
                  <TableCell width={200} align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell width={200} align="center">{getCategoryName(item.category_id)}</TableCell>
                  <TableCell width={100} align="center">
                    <div className="flex justify-center">
                      <ActionButton onClick={() => handleEdit(item)}><Edit /></ActionButton>
                      <ActionButton onClick={() => onDelete(item)}><Delete /></ActionButton>
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ProductDialog
        text={text}
        open={openDialog.open}
        type={openDialog.type}
        data={dialogData}
        onChange={(name, val) => handleChangeDialog(name, val)}
        onClose={() => setOpenDialog({ ...openDialog, open: false })}
        onSave={() => handleSave()}
      />
      <DeleteDialog
        text={text}
        open={openDeleteDialog}
        type={text.product}
        description={`${text.confirmDelete} ${dialogData.name} ${text.fromProductList}?`}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
}

export default Products;
