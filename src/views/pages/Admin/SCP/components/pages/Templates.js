import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { BlueButton, ActionButton } from '../../../../../../components/Buttons';
import { TemplateDialog, DeleteDialog } from '../Dialogs';

import { getUsers } from '../../../../../../apis/user';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

function Templates({ text }) {
  const { setLoading, setMessage } = useAppContext();
  const { categories, products, templates, setTemplates, getProductsData } = useSCPContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: '',
    description: '',
    items: []
  });

  const loadTemplates = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      setTemplates([
        { id: 1, name: 'Cleaning pack', description: 'Student care pack1', items: [{ category_id: 1, product_id: 1, qty: 2000 }, { category_id: 1, product_id: 2, qty: 3000 }] },
        { id: 2, name: 'Clothing pack', description: 'Student care pack2', items: [{ category_id: 2, product_id: 3, qty: 5000 }, { category_id: 2, product_id: 4, qty: 6000 }] },
      ]);
      setLoading(false);
    }).catch(err => {
      setTemplates([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadTemplates });
      setLoading(false)
    });
  }, [text, setTemplates, setLoading, setMessage]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

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
      items: []
    });
    setOpenDialog({ type: 'create', open: true });
  };

  const handleEdit = (item) => {
    setDialogData(item);
    setOpenDialog({ type: 'edit', open: true });
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
    if (openDialog.type === 'create') {
      getUsers().then(res => {
        loadTemplates();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedCreateTemplate });
        setLoading(false);
      });
    } else {
      getUsers().then(res => {
        loadTemplates();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedUpdateTemplate });
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
      loadTemplates();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteTemplate });
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
        <Table stickyHeader aria-label="template table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{text.name}</TableCell>
              <TableCell align="center">{text.description}</TableCell>
              <TableCell align="center">{text.productsInTemplate}</TableCell>
              <TableCell width={100} align="center">{text.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{getProductsData(item.items)}</TableCell>
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
        count={templates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TemplateDialog
        text={text}
        open={openDialog.open}
        type={openDialog.type}
        data={dialogData}
        onChange={handleChangeDialog}
        onClose={() => setOpenDialog({ ...openDialog, open: false })}
        onSave={() => handleSave()}
      />
      <DeleteDialog
        text={text}
        open={openDeleteDialog}
        type={text.template}
        description={`${text.confirmDelete} ${dialogData.name} ${text.templateLower}?`}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
}

export default Templates;
