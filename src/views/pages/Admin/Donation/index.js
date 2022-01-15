import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Edit, Delete, Store, LocalGroceryStore } from '@material-ui/icons';

import { BlueButton, ActionButton } from '../../../../components/Buttons';
import DonationDialog from './components/DonationDialog';

import { getDonations, createDonation, updateDonation, deleteDonation } from '../../../../apis/donation';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function Donation(props) {
  const { history } = props;
  const text = useTranslations('donationManagement');
  const { setLoading, setMessage } = useAppContext();
  const [donationList, setDonationList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState({ type: 'create', open: false });
  const [dialogData, setDialogData] = useState({
    name: '',
    description: '',
    from_date: '',
    to_date: '',
    files: []
  });

  const loadDonations = useCallback(() => {
    setLoading(true);
    getDonations().then(res => {
      setDonationList(res);
      setLoading(false);
    }).catch(err => {
      setDonationList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadDonations });
      setLoading(false);
    });
  }, [text, setLoading, setMessage]);

  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

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
      name: '',
      description: '',
      from_date: '',
      to_date: '',
      files: []
    });
  };

  const handleEdit = (item) => {
    setOpenDialog({ type: 'edit', open: true });
    setDialogData({ ...item, files: [] });
  };

  const handleChangeDialog = (name, val) => {
    setDialogData({ ...dialogData, [name]: val });
  };

  const handleSave = () => {
    if (openDialog.type === 'create') {
      if (dialogData.name === '' || dialogData.description === '' || dialogData.from_date === '' || dialogData.to_date === '' || dialogData.files.length === 0) {
        setMessage({ open: true, title: text.warning, description: text.fillAllData });
        return;
      } else {
        const formData = new FormData();
        formData.append('name', dialogData.name);
        formData.append('description', dialogData.description);
        formData.append('from_date', dialogData.from_date);
        formData.append('to_date', dialogData.to_date);
        for (const key of Object.keys(dialogData.files)) {
          formData.append('images', dialogData.files[key]);
        }
        setLoading(true);
        createDonation(formData).then(res => {
          loadDonations();
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedLoadDonations });
          setLoading(false);
        });
      }
    } else {
      if (dialogData.name === '' || dialogData.description === '' || dialogData.from_date === '' || dialogData.to_date === '') {
        setMessage({ open: true, title: text.warning, description: text.fillAllData });
        return;
      } else {
        const formData = new FormData();
        formData.append('name', dialogData.name);
        formData.append('description', dialogData.description);
        formData.append('from_date', dialogData.from_date);
        formData.append('to_date', dialogData.to_date);
        formData.append('is_active', dialogData.is_active);
        for (const key of Object.keys(dialogData.files)) {
          formData.append('images', dialogData.files[key]);
        }
        setLoading(true);
        updateDonation(dialogData.id, formData).then(res => {
          loadDonations();
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedLoadDonations });
          setLoading(false);
        });
      }
    }

    setOpenDialog({ type: 'create', open: false });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteDonation(id).then(res => {
      loadDonations();
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedDeleteDonation });
      setLoading(false)
    });
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold mr-2">{text.title}</p>
        <BlueButton onClick={() => handleCreate()}>{text.addNew}</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width={100} align="center">{text.image}</TableCell>
              <TableCell width={200} align="center">{text.name}</TableCell>
              <TableCell align="center">{text.description}</TableCell>
              <TableCell width={150} align="center">{text.from}</TableCell>
              <TableCell width={150} align="center">{text.to}</TableCell>
              <TableCell width={100} align="center">{text.status}</TableCell>
              <TableCell width={100} align="center">{text.management}</TableCell>
              <TableCell width={100} align="center">{text.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donationList && donationList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell width={100} align="center">
                    <div className="flex justify-center">
                      {item.images.length > 0 && (
                        <img className="w-7.5 h-7.5" src={item.images[0]} alt="Donation item logo" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell width={200} align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell width={150} align="center">{item.from_date}</TableCell>
                  <TableCell width={150} align="center">{item.to_date}</TableCell>
                  <TableCell width={50} align="center">{item.is_active ? <p className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.active}</p> : <p className="bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.inactive}</p>}</TableCell>
                  <TableCell width={100} align="center">
                    <div className="flex justify-around">
                      <ActionButton onClick={() => history.push(`/admin/donation/${item.id}/inventory`)}><Store /></ActionButton>
                      <ActionButton onClick={() => history.push(`/admin/donation/${item.id}/request`)}><LocalGroceryStore /></ActionButton>
                    </div>
                  </TableCell>
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
        count={donationList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DonationDialog
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

export default Donation;
