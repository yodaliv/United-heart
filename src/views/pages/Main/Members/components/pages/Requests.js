import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { BlueButton, RedButton, ActionButton } from '../../../../../../components/Buttons';
import { TableCard, TableCardContent } from '../../../../../../components/Cards';
import { ApproveIcon, RejectIcon } from '../../../../../../components/Icons';
import { CustomTableRow, CustomPageSelectInput, CustomTablePagination } from '../../../../../../components/Table';
import CustomCheckbox from '../../../../../../components/CustomCheckbox';
import { RequestDetailsDialog } from '../Dialogs';

import { getAllRequests, approveRequest, declineRequest } from '../../../../../../apis/request';
import { getDetailsSIN, getDetailsAmbassador } from '../../../../../../apis/apply';
import { getDateString } from '../../../../../../utils';
import { useAppContext } from '../../../../../../context/AppContext';

function Requests({ text }) {
  const { setLoading, setMessage } = useAppContext();

  const [memberList, setMemberList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsDialogData, setDetailsDialogData] = useState(null);

  const loadData = useCallback(() => {
    setLoading(true);
    getAllRequests().then(res => {
      setMemberList(res);
      setLoading(false);
    }).catch(err => {
      setMemberList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadMembers });
      setLoading(false);
    });
  }, [text, setLoading, setMessage]);

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedItems(memberList.map(item => item));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItemClick = (event, item) => {
    if (event.target.checked) {
      setSelectedItems(prevState => [...prevState, item]);
    } else {
      const index = selectedItems.findIndex(s => s.id === item.id);
      setSelectedItems(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1)]);
    }
  };

  const handleApprove = (id) => {
    if (id) {
      setLoading(true);
      approveRequest([id]).then(res => {
        loadData();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedApproveRequest });
        setLoading(false);
      });
    } else {
      setLoading(true);
      approveRequest(selectedItems.map(item => item.id)).then(res => {
        setSelectedItems([]);
        loadData();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedApproveRequest });
        setLoading(false);
      });
    }
  };

  const handleDecline = (id) => {
    if (id) {
      setLoading(true);
      declineRequest([id]).then(res => {
        loadData();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedDeclineRequest });
        setLoading(false);
      });
    } else {
      setLoading(true);
      declineRequest(selectedItems.map(item => item.id)).then(res => {
        setSelectedItems([]);
        loadData();
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedDeclineRequest });
        setLoading(false);
      });
    }
  };

  const viewDetails = (item) => {
    if (item.request_type === 'APPLY_STUDENT_IN_NEED') {
      setLoading(true);
      getDetailsSIN(item.request_ref_id).then(res => {
        setDetailsDialogData({ ...res, type: 'sin' });
        setOpenDetailsDialog(true);
        setLoading(false);
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedLoadRequestDetails });
        setLoading(false);
      });
    } else {
      setLoading(true);
      getDetailsAmbassador(item.request_ref_id).then(res => {
        setDetailsDialogData({ ...res, type: 'ambassador' });
        setOpenDetailsDialog(true);
        setLoading(false);
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.failedLoadRequestDetails });
        setLoading(false);
      });
    }
  };

  return (
    <div className="my-12">
      <TableCard>
        <TableCardContent>
          <div className="ml-6 mt-2">
            <ActionButton color="inherit"><FilterList /></ActionButton>
          </div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <CustomTableRow>
                  <TableCell padding="checkbox">
                    <CustomCheckbox
                      indeterminate={selectedItems.length > 0 && selectedItems.length < memberList.length}
                      checked={selectedItems.length > 0 && selectedItems.length === memberList.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all members' }}
                    />
                  </TableCell>
                  <TableCell>{text.no}</TableCell>
                  <TableCell>{text.member}</TableCell>
                  <TableCell>{text.type}</TableCell>
                  <TableCell>{text.occupation}</TableCell>
                  <TableCell>{text.organization}</TableCell>
                  <TableCell>{text.time}</TableCell>
                  <TableCell width={150} />
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {memberList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <CustomTableRow key={index}>
                      <TableCell padding="checkbox">
                        <CustomCheckbox
                          checked={!!selectedItems.find(s => s.id === item.id)}
                          onChange={e => handleSelectItemClick(e, item)}
                        />
                      </TableCell>
                      <TableCell>
                        <p className="text-blue-cornflower font-semibold cursor-pointer" onClick={() => viewDetails(item)}>{index + 1}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{`${item.firstname} ${item.lastname}`}</p>
                          <p>{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{text.roleLabel}: {item.request_type === "APPLY_STUDENT_IN_NEED" ? text.sin : text.ambassador}</TableCell>
                      <TableCell>{item.occupation}</TableCell>
                      <TableCell>{item.org_name}</TableCell>
                      <TableCell>{getDateString(item.created_at)}</TableCell>
                      <TableCell width={150}>
                        <ActionButton onClick={() => handleApprove(item.id)}>
                          <ApproveIcon />
                        </ActionButton>
                        <ActionButton onClick={() => handleDecline(item.id)}>
                          <RejectIcon />
                        </ActionButton>
                      </TableCell>
                    </CustomTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex items-center mt-8 ml-10 mr-6">
            {selectedItems.length > 0 && (
              <div className="flex">
                <div>
                  <BlueButton onClick={() => handleApprove()}>{text.approve}</BlueButton>
                </div>
                <div className="ml-4">
                  <RedButton onClick={() => handleDecline()}>{text.decline}</RedButton>
                </div>
              </div>
            )}
            <div className="flex-1">
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={memberList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  input: (<CustomPageSelectInput />),
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={CustomTablePagination}
              />
            </div>
          </div>
        </TableCardContent>
      </TableCard>
      <RequestDetailsDialog
        text={text}
        open={openDetailsDialog}
        data={detailsDialogData}
        onClose={() => setOpenDetailsDialog(false)}
      />
    </div>
  );
}

export default Requests;
