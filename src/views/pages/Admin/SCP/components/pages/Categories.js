import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { BlueButton, ActionButton } from '../../../../../../components/Buttons';
import { CategoryDialog, DeleteDialog } from '../Dialogs';

import { getUsers } from '../../../../../../apis/user';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

function Categories({ text }) {
  const { setLoading, setMessage } = useAppContext();
  const { categories, setCategories, products } = useSCPContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: '',
    description: '',
  });

  const loadCategories = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      // setCategories(res);
      setCategories([{ id: 1, name: 'Clothing', description: 'Clothing tool' }, { id: 2, name: 'Cleaning', description: 'Cleaning tool' }]);
      setLoading(false);
    }).catch(err => {
      setCategories([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadCategories });
      setLoading(false)
    });
  }, [text, setCategories, setLoading, setMessage]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    setDialogData({
      name: '',
      description: '',
    });
    setOpenDialog({ type: 'create', open: true });
  };

  const handleEdit = (item) => {
    setDialogData(item);
    setOpenDialog({ type: 'edit', open: true });
  };

  const handleChangeDialog = (name, val) => {
    setDialogData({ ...dialogData, [name]: val });
  };

  const handleSave = () => {
    setLoading(true);
    if (openDialog.type === 'create') {
      getUsers().then(res => {
        loadCategories();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedCreateCategory });
        setLoading(false);
      });
    } else {
      getUsers().then(res => {
        loadCategories();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedUpdateCategory });
        setLoading(false);
      });
    }

    setOpenDialog({ ...openDialog, open: false });
  };

  const onDelete = (item) => {
    setDialogData(item);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    setLoading(true);
    getUsers(dialogData.id).then(res => {
      loadCategories();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteCategory });
      setLoading(false);
    });

    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-end items-center">
        <BlueButton onClick={() => handleCreate()}>{text.addNew}</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="category table">
          <TableHead>
            <TableRow>
              <TableCell width={200} align="center">{text.name}</TableCell>
              <TableCell align="center">{text.description}</TableCell>
              <TableCell align="center">{text.productsInCategory}</TableCell>
              <TableCell width={100} align="center">{text.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell width={200} align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">
                    {products.filter(p => p.category_id === item.id).map((p, i) => i === 0 ? p.name : ', ' + p.name)}
                  </TableCell>
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <CategoryDialog
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
        type={text.category}
        description={`${text.confrimDelete} ${dialogData.name} ${text.categoryLower}?`}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
}

export default Categories;
