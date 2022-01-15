import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { ActionButton } from '../../../../../../components/Buttons';
import { TableCard, TableCardContent } from '../../../../../../components/Cards';
import { CustomTableRow, CustomPageSelectInput, CustomTablePagination } from '../../../../../../components/Table';

import { getAllRequests } from '../../../../../../apis/request';
import { useAppContext } from '../../../../../../context/AppContext';

function Activity({ text, types, states }) {
  const { setLoading, setMessage } = useAppContext();

  const [memberList, setMemberList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = useCallback(() => {
    setLoading(true);
    getAllRequests().then(res => {
      setMemberList([
        { id: 1, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 1, type_id: 1, building_id: 1, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 2, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 4, type_id: 2, building_id: 1, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 3, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 3, type_id: 1, building_id: 2, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 4, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 2, type_id: 3, building_id: 3, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 5, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 3, type_id: 3, building_id: 3, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 6, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 4, type_id: 1, building_id: 2, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 7, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 1, type_id: 1, building_id: 1, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 8, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 4, type_id: 2, building_id: 1, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 9, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 1, type_id: 1, building_id: 2, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 10, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 4, type_id: 3, building_id: 3, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 11, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 4, type_id: 3, building_id: 3, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
        { id: 12, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 2, type_id: 1, building_id: 2, residence: 'Off-campus', phone: '(555) 555-5555', last_login: '14/Apr/2021', since: 'March 23, 2021' },
      ]);
      setLoading(false);
    }).catch(err => {
      setMemberList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadMembers });
      setLoading(false)
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
                  <TableCell>{text.sender}</TableCell>
                  <TableCell>{text.action}</TableCell>
                  <TableCell>{text.recipient}</TableCell>
                  <TableCell>{text.timestamp}</TableCell>
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {memberList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <CustomTableRow key={index}>
                      <TableCell>
                        <div>
                          <p>{item.name}</p>
                          <p>{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {item.state === 1 ? (
                            <p className="w-fit-content bg-green-pale-lime text-green-dark-lime rounded-6 py-px px-2.5 mb-1 text-xs">{states.find(state => state.id === item.state)?.name}</p>
                          ) : item.state === 4 ? (
                            <p className="w-fit-content bg-red-misty-rose text-red-strong rounded-6 py-px px-2.5 mb-1 text-xs">{states.find(state => state.id === item.state)?.name}</p>
                          ) : (
                            <p className="w-fit-content bg-gray-100 text-gray-dark rounded-6 py-px px-2.5 mb-1 text-xs">{states.find(state => state.id === item.state)?.name}</p>
                          )}
                          <p className="text-xs">{text.typeLabel}: {types.find(type => type.id === item.type_id)?.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{item.name}</p>
                          <p>{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.since}</TableCell>
                    </CustomTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
        </TableCardContent>
      </TableCard>
    </div>
  );
}

export default Activity;
