import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow, Select } from '@material-ui/core';
import { Add, Done, Delete, Edit, ArrowBack } from '@material-ui/icons';

import { BlueButton, ActionButton } from '../../../../../../components/Buttons';
import { SelectInput } from '../../../../../../components/Inputs';
import { EventDialog, DeleteDialogWithDescription, AddSCPDialog, EditSCPDialog, DeleteSCPDialog } from '../Dialogs';

import { getUsers } from '../../../../../../apis/user';
import { scpIDListDocFilename } from '../../../../../../constants';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

function Events({ text }) {
  const { loading, setLoading, setMessage } = useAppContext();
  const { categories, products, getCategoryName, getProductName, getTemplateName, getProductsData } = useSCPContext();
  const [eventList, setEventList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [schools, setSchools] = useState([]);
  const [orders, setOrders] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [showDetails, setShowDetails] = useState({ mode: 1, open: false });
  const [detailsData, setDetailsData] = useState({ id: '', school_name: '', order_id: '', description: '', items: [] });
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    school_name: '',
    order_id: '',
    description: ''
  });

  const [openAddSCPDialog, setOpenAddSCPDialog] = useState(false);
  const [addSCPDialogData, setAddSCPDialogData] = useState([]);
  const [openEditSCPDialog, setOpenEditSCPDialog] = useState(false);
  const [editSCPDialogData, setEditSCPDialogData] = useState(null);
  const [openDeleteSCPDialog, setOpenDeleteSCPDialog] = useState(false);
  const [deleteSCPDialogData, setDeleteSCPDialogData] = useState(null);

  const loadEvents = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      setEventList([
        { id: 2865, school_name: 'Scarborough Campus', order_id: 4698, created_at: '2021-05-20', updated_at: '2021-06-03', processed_at: '2021-06-03' },
        { id: 3928, school_name: 'Toronto Campus', order_id: 4699, created_at: '2021-04-04', updated_at: '2021-05-08', processed_at: '2021-05-10' },
        { id: 4204, school_name: 'Mississauga Campus', order_id: 5690, created_at: '2021-03-13', updated_at: '2021-04-26', processed_at: '2021-05-02' }
      ]);
      setLoading(false);
    }).catch(err => {
      setEventList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadEvents });
      setLoading(false)
    });
  }, [text, setLoading, setMessage]);

  const loadData = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      setSchools(['Scarborough Campus', 'Toronto Campus', 'Mississauga Campus']);

      getUsers().then(res => {
        setOrders([
          { id: 4698, school_name: 'Scarborough Campus', created_at: '2021-06-01', updated_at: '2021-06-03', status: 0, items: [{ category_id: 1, product_id: 1, qty: 2000, sent: null }, { category_id: 2, product_id: 3, qty: 3000, sent: null }] },
          { id: 4699, school_name: 'Toronto Campus', created_at: '2021-05-12', updated_at: '2021-05-25', status: 0, items: [{ category_id: 1, product_id: 2, qty: 1000, sent: null }, { category_id: 2, product_id: 4, qty: 2000, sent: null }] },
          { id: 5690, school_name: 'Mississauga Campus', created_at: '2021-05-12', updated_at: '2021-05-25', status: 0, items: [{ category_id: 1, product_id: 2, qty: 1000, sent: null }, { category_id: 2, product_id: 4, qty: 2000, sent: null }] }
        ]);

        getUsers().then(res => {
          setTemplates([
            { id: 1, name: 'Cleaning pack', description: 'Student care pack1', items: [{ category_id: 1, product_id: 1, qty: 2000 }, { category_id: 1, product_id: 2, qty: 3000 }] },
            { id: 2, name: 'Clothing pack', description: 'Student care pack2', items: [{ category_id: 2, product_id: 3, qty: 5000 }, { category_id: 2, product_id: 4, qty: 6000 }] },
          ]);
          loadEvents();
        }).catch(err => {
          setOrders([]);
          setMessage({ open: true, title: text.error, description: text.failedLoadData });
          setLoading(false)
        });
      }).catch(err => {
        setOrders([]);
        setMessage({ open: true, title: text.error, description: text.failedLoadData });
        setLoading(false)
      });
    }).catch(err => {
      setSchools([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadData });
      setLoading(false)
    });
  }, [text, loadEvents, setLoading, setMessage]);

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
      school_name: schools?.length > 0 ? schools[0] : '',
      order_id: orders?.length > 0 ? orders[0].id : '',
      description: ''
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
        loadEvents();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedCreateEvent });
        setLoading(false);
      });
    } else {
      getUsers(dialogData.id).then(res => {
        handleViewDetails(showDetails.mode, detailsData.id);
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedUpdateEvent });
        setLoading(false);
      });
    }

    setOpenDialog({ ...openDialog, open: false });
  };

  const handleComplete = (id) => {
    setLoading(true);
    getUsers(id).then(res => {
      loadEvents();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedCompleteEvent });
      setLoading(false);
    });
  };

  const onDelete = (item) => {
    setDialogData(item);
    setOpenDeleteDialog(true);
  };

  const handleDelete = (message) => {
    setLoading(true);
    getUsers(dialogData.id, message).then(res => {
      loadEvents();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteEvent });
      setLoading(false);
    });

    setOpenDeleteDialog(false);
  };

  const handleViewDetails = (mode, id) => {
    setLoading(true);
    getUsers(id, mode).then(res => {
      // setDetailsData(res);
      if (mode === 1)
        setDetailsData({ id: id, order_id: 4698, school_name: 'Scarborough Campus', description: '...', items: [{ template_id: 1, qty: 20 }, { template_id: 2, qty: 10 }, { template_id: 'custom', qty: 1 }] });
      else if (mode === 2)
        setDetailsData({ id: id, order_id: 4699, school_name: 'Toronto Campus', description: '...', items: [{ id: 39075, template_id: 1 }, { id: 42029, template_id: 2 }] });
      else if (mode === 3)
        setDetailsData({ id: id, order_id: 4699, school_name: 'Toronto Campus', description: '...', items: [{ category_id: 1, product_id: 1, request: 1000, qty: 900 }, { category_id: 2, product_id: 3, request: 2000, qty: 1500 }] });
      else
        setDetailsData({ id: id, order_id: 4699, school_name: 'Toronto Campus', description: '...', items: [{ id: 32023, items: [{ category_id: 1, product_id: 1, qty: 500 }, { category_id: 1, product_id: 2, qty: 1000 }, { category_id: 2, product_id: 3, qty: 2000 }] }, { id: 43233, items: [{ category_id: 1, product_id: 1, qty: 200 }, { category_id: 2, product_id: 3, qty: 500 }, { category_id: 2, product_id: 4, qty: 800 }] }] });

      setShowDetails({ mode, open: true });
      setLoading(false);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedLoadEvent });
      setLoading(false);
    });
  };

  const handleChangeAddSCPDialog = (name, val, type, idx = 0) => {
    if (type === 'add') {
      let template_id = templates[0].id;
      setAddSCPDialogData([...addSCPDialogData, { template_id: template_id, qty: 1 }]);
    } else if (type === 'delete') {
      setAddSCPDialogData(addSCPDialogData.filter((item, index) => index !== idx));
    } else {
      setAddSCPDialogData(addSCPDialogData.map((item, index) => index === idx ? { ...item, [name]: val } : item));
    }
  };

  const handleAddSCP = () => {
    // addSCPDialogData
    setLoading(true);
    getUsers().then(res => {
      handleViewDetails(showDetails.mode, detailsData.id);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedCreateSCP });
      setLoading(false);
    });

    setOpenAddSCPDialog(false);
  };

  const handleChangeEditSCPDialog = (name, val, type, idx = 0) => {
    if (type) {
      if (type === 'add') {
        let category_id = categories[0].id;
        let product_id = products.filter(product => product.category_id === category_id)[0]?.id;
        setEditSCPDialogData({ ...editSCPDialogData, items: [...editSCPDialogData.items, { category_id: category_id, product_id: product_id, qty: 1 }] });
      } else if (type === 'delete') {
        setEditSCPDialogData({ ...editSCPDialogData, items: editSCPDialogData.items.filter((item, index) => index !== idx) });
      } else {
        if (name === 'category_id') {
          let category_id = val;
          let product_id = products.filter(product => product.category_id === category_id)[0]?.id;
          setEditSCPDialogData({ ...editSCPDialogData, items: editSCPDialogData.items.map((item, index) => index === idx ? { ...item, category_id: category_id, product_id: product_id } : item) });
        } else {
          setEditSCPDialogData({ ...editSCPDialogData, items: editSCPDialogData.items.map((item, index) => index === idx ? { ...item, [name]: val } : item) });
        }
      }
    } else {
      setEditSCPDialogData({ ...editSCPDialogData, [name]: val });
    }
  };

  const handleSaveSCP = () => {
    // editSCPDialogData
    setLoading(true);
    getUsers().then(res => {
      handleViewDetails(showDetails.mode, detailsData.id);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedUpdateSCP });
      setLoading(false);
    });

    setOpenEditSCPDialog(false);
  };

  const handleDeleteSCP = () => {
    // deleteSCPDialogData
    setLoading(true);
    getUsers().then(res => {
      handleViewDetails(showDetails.mode, detailsData.id);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteSCP });
      setLoading(false);
    });

    setOpenDeleteSCPDialog(false);
  };

  const handleDownload = () => {

  };

  return (
    <div>
      {!showDetails.open ? (
        <>
          <div className="mb-6 flex justify-end items-center">
            <BlueButton onClick={() => handleCreate()}>{text.addNew}</BlueButton>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="inventory table">
              <TableHead>
                <TableRow>
                  <TableCell width={100} align="center">{text.packID}</TableCell>
                  <TableCell align="center">{text.schoolName}</TableCell>
                  <TableCell align="center">{text.createdAt}</TableCell>
                  <TableCell align="center">{text.updatedAt}</TableCell>
                  <TableCell align="center">{text.sent}</TableCell>
                  <TableCell width={100} align="center">{text.action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell align="center">
                        <span className="text-blue-cornflower font-semibold cursor-pointer hover:underline" onClick={() => handleViewDetails(1, item.id)}>{item.id}</span>
                      </TableCell>
                      <TableCell align="center">{item.school_name}</TableCell>
                      <TableCell align="center">{item.created_at}</TableCell>
                      <TableCell align="center">{item.updated_at}</TableCell>
                      <TableCell align="center">{item.processed_at}</TableCell>
                      <TableCell width={100} align="center">
                        <div className="flex justify-center">
                          <ActionButton onClick={() => handleComplete(item.id)}><Done /></ActionButton>
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
            count={eventList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <>
          <div className="flex justify-start items-center mt-2">
            <ActionButton onClick={() => setShowDetails({ ...showDetails, open: false })}><ArrowBack /></ActionButton>
          </div>
          <div className="mb-4">
            <div className="flex justify-center items-center">
              <p>{text.scpPack} {detailsData.id} {text.details}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>{text.overview}</p>
              <ActionButton onClick={() => handleEdit(detailsData)}><Edit /></ActionButton>
            </div>
            <hr className="border-gray-300" />
            <p className="mt-2">{text.sendTo}: {detailsData.school_name}</p>
            <p>{text.orderID}: {detailsData.order_id}</p>
            <p>{text.description}: {detailsData.description}</p>
          </div>
          <div className="flex justify-between items-end">
            <p>{text.scpList}</p>
            <div className="flex items-center">
              <p className="mr-2">{text.viewMode}:</p>
              <div>
                <Select
                  native
                  value={detailsData.mode}
                  onChange={e => handleViewDetails(parseInt(e.target.value), detailsData.id)}
                  input={<SelectInput />}
                >
                  <option value={1}>{text.scpTemplate}</option>
                  <option value={2}>{text.details}</option>
                  <option value={3}>{text.productQty}</option>
                  <option value={4}>{text.custom}</option>
                </Select>
              </div>
              <ActionButton onClick={() => {
                setOpenAddSCPDialog(true);
                setAddSCPDialogData([]);
              }}>
                <Add />
              </ActionButton>
            </div>
          </div>
          <hr className="my-2 border-gray-300" />
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="inventory table">
              <TableHead>
                <TableRow>
                  {showDetails.mode === 1 ? (
                    <>
                      <TableCell align="center">{text.scpTemplateName}</TableCell>
                      <TableCell align="center">{text.scpTemplateQty}</TableCell>
                      <TableCell width={100} align="center">{text.action}</TableCell>
                    </>
                  ) : showDetails.mode === 2 ? (
                    <>
                      <TableCell align="center">{text.scpID}</TableCell>
                      <TableCell align="center">{text.scpTemplateName}</TableCell>
                      <TableCell width={100} align="center">{text.action}</TableCell>
                    </>
                  ) : showDetails.mode === 3 ? (
                    <>
                      <TableCell align="center">{text.category}</TableCell>
                      <TableCell align="center">{text.product}</TableCell>
                      <TableCell align="center">{text.requested}</TableCell>
                      <TableCell align="center">{text.qty}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="center">{text.scpID}</TableCell>
                      <TableCell align="center">{text.qty}</TableCell>
                      <TableCell width={100} align="center">{text.action}</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading && detailsData.items.map((row, idx) => {
                  switch (showDetails.mode) {
                    case 1:
                      return (
                        <TableRow hover role="checkbox" key={idx}>
                          <TableCell align="center">{getTemplateName(row.template_id)}</TableCell>
                          <TableCell align="center">{row.qty}</TableCell>
                          <TableCell align="center">
                            <div className="flex justify-center">
                              {row.template_id && <ActionButton onClick={() => {
                                setEditSCPDialogData(row);
                                setOpenEditSCPDialog(true);
                              }}>
                                <Edit />
                              </ActionButton>}
                              <ActionButton onClick={() => {
                                setDeleteSCPDialogData(row);
                                setOpenDeleteSCPDialog(true);
                              }}>
                                <Delete />
                              </ActionButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    case 2:
                      return (
                        <TableRow hover role="checkbox" key={idx}>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{getTemplateName(row.template_id)}</TableCell>
                          <TableCell align="center">
                            <div className="flex justify-center">
                              <ActionButton onClick={() => {
                                setEditSCPDialogData(row);
                                setOpenEditSCPDialog(true);
                              }}>
                                <Edit />
                              </ActionButton>
                              <ActionButton onClick={() => {
                                setDeleteSCPDialogData(row);
                                setOpenDeleteSCPDialog(true);
                              }}>
                                <Delete />
                              </ActionButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    case 3:
                      return (
                        <TableRow hover role="checkbox" key={idx}>
                          <TableCell align="center">{getCategoryName(row.category_id)}</TableCell>
                          <TableCell align="center">{getProductName(row.product_id)}</TableCell>
                          <TableCell align="center">{row.request}</TableCell>
                          <TableCell align="center">{row.qty}</TableCell>
                        </TableRow>
                      );
                    case 4:
                      return (
                        <TableRow hover role="checkbox" key={idx}>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{getProductsData(row.items)}</TableCell>
                          <TableCell align="center">
                            <div className="flex justify-center">
                              <ActionButton onClick={() => {
                                setEditSCPDialogData(row);
                                setOpenEditSCPDialog(true);
                              }}>
                                <Edit />
                              </ActionButton>
                              <ActionButton onClick={() => {
                                setDeleteSCPDialogData(row);
                                setOpenDeleteSCPDialog(true);
                              }}>
                                <Delete />
                              </ActionButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    default:
                      return null;
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="mt-4">
            <p>{text.help}</p>
            <hr className="my-2 border-gray-300" />
            <p className="text-blue-cornflower font-semibold cursor-pointer hover:underline" onClick={() => handleDownload()}>{scpIDListDocFilename}</p>
          </div>
        </>
      )}
      <EventDialog
        text={text}
        open={openDialog.open}
        type={openDialog.type}
        schools={schools}
        orders={orders}
        data={dialogData}
        onChange={handleChangeDialog}
        onClose={() => setOpenDialog({ ...openDialog, open: false })}
        onSave={() => handleSave()}
      />
      <DeleteDialogWithDescription
        text={text}
        open={openDeleteDialog}
        title={text.deleteScpPack}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      />
      <AddSCPDialog
        text={text}
        open={openAddSCPDialog}
        data={addSCPDialogData}
        onChange={handleChangeAddSCPDialog}
        onClose={() => setOpenAddSCPDialog(false)}
        onSave={() => handleAddSCP()}
      />
      <EditSCPDialog
        text={text}
        open={openEditSCPDialog}
        mode={showDetails.mode}
        data={editSCPDialogData}
        onChange={handleChangeEditSCPDialog}
        onClose={() => setOpenEditSCPDialog(false)}
        onSave={() => handleSaveSCP()}
      />
      <DeleteSCPDialog
        text={text}
        open={openDeleteSCPDialog}
        mode={showDetails.mode}
        data={deleteSCPDialogData}
        onClose={() => setOpenDeleteSCPDialog(false)}
        onConfirm={() => handleDeleteSCP()}
      />
    </div>
  );
}

export default Events;
