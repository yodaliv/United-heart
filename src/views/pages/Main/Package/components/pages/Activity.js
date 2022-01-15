import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { ActionButton } from '../../../../../../components/Buttons';
import { TableCard, TableCardContent } from '../../../../../../components/Cards';
import { CheckRoundedIcon } from '../../../../../../components/Icons';
import { CustomTableRow, CustomPageSelectInput, CustomTablePagination } from '../../../../../../components/Table';

import { getDonations } from '../../../../../../apis/donation';
import { useAppContext } from '../../../../../../context/AppContext';

function Activity({ text, states }) {
  const { setLoading, setMessage } = useAppContext();

  const [packageList, setPackageList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = useCallback(() => {
    setLoading(true);
    getDonations().then(res => {
      setPackageList([
        { id: 90990, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 1, order_status: 1, building_id: 1, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90991, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 3, order_status: 2, building_id: 1, order_id: 'KAB3R673', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90992, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 3, order_status: 1, building_id: 2, order_id: 'KAB3R674', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90993, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 2, order_status: 1, building_id: 3, order_id: 'KAB3R675', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90994, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 3, order_status: 2, building_id: 3, order_id: 'KAB3R676', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90995, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 2, order_status: 2, building_id: 2, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90996, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 1, order_status: 1, building_id: 1, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90997, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 2, order_status: 1, building_id: 1, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90998, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 1, order_status: 1, building_id: 2, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 90999, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 1, order_status: 1, building_id: 3, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 91000, name: 'Justin Septimus', email: 'justin.septimus@mail.utoronto.ca', state: 1, order_status: 1, building_id: 3, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
        { id: 91001, name: 'Shelby Hahn', email: 'shelby.hahn@mail.utoronto.ca', state: 2, order_status: 1, building_id: 2, order_id: 'KAB3R672', updated_at: 'March 23, 2021 at 7PM EST' },
      ]);
      setLoading(false);
    }).catch(err => {
      setPackageList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadPackages });
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
                  <TableCell width={50} />
                  <TableCell>{text.sender}</TableCell>
                  <TableCell>{text.action}</TableCell>
                  <TableCell>{text.recipient}</TableCell>
                  <TableCell>{text.timestamp}</TableCell>
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {packageList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <CustomTableRow key={index}>
                      <TableCell width={50}>
                        <CheckRoundedIcon />
                      </TableCell>
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
                          ) : item.state === 2 ? (
                            <p className="w-fit-content bg-gray-100 text-gray-dark rounded-6 py-px px-2.5 mb-1 text-xs">{states.find(state => state.id === item.state)?.name}</p>
                          ) : (
                            <p className="w-fit-content bg-red-misty-rose text-red-strong rounded-6 py-px px-2.5 mb-1 text-xs">{states.find(state => state.id === item.state)?.name}</p>
                          )}
                          <p className="text-xs">{text.order}: {item.order_id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{item.name}</p>
                          <p>{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.updated_at}</TableCell>
                    </CustomTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={packageList.length}
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
