import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { ActionButton } from '../../../../../../components/Buttons';
import { TableCard, TableCardContent } from '../../../../../../components/Cards';
import { TruckIcon, TimeScheduleIcon } from '../../../../../../components/Icons';
import { CustomTableRow, CustomPageSelectInput, CustomTablePagination } from '../../../../../../components/Table';

import { getDonations } from '../../../../../../apis/donation';
import { useAppContext } from '../../../../../../context/AppContext';

function Locations({ text, orderStates }) {
  const { setLoading, setMessage } = useAppContext();

  const [packageList, setPackageList] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = useCallback(() => {
    setLoading(true);
    getDonations().then(res => {
      setBuildings([
        { id: 1, name: 'Trinity', address: '40 Willcocks St #1007, Toronto, ON M5S 1C6' },
        { id: 2, name: 'Innis college', address: '52 Willcocks St #2817, Toronto, ON M5S 1C6' },
        { id: 3, name: 'Loretto college', address: '67 Willcocks St #1092, Toronto, ON M5S 1C6' }
      ]);
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
    }).catch(err => {
      setBuildings([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadBuildings });
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
                  <TableCell>{text.identifier}</TableCell>
                  <TableCell>{text.building}</TableCell>
                  <TableCell>{text.ambassador}</TableCell>
                  <TableCell>{text.inventory}</TableCell>
                  <TableCell>{text.refillOrder}</TableCell>
                  <TableCell width={50} />
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {packageList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <CustomTableRow key={index}>
                      <TableCell>{text.scpLabel} {item.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{buildings.find(building => building.id === item.building_id)?.name}</p>
                          <p>{buildings.find(building => building.id === item.building_id)?.address}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{item.name}</p>
                          <p>{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="w-fit-content bg-green-pale-lime text-green-dark-lime rounded-6 py-px px-2.5 mb-1 text-xs">Full</p>
                          <p className="text-xs">{text.updated}: {item.updated_at}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {item.order_status === 1 ? (
                            <div className="flex items-center w-fit-content bg-brown-pale text-brown-dark rounded-6 py-px px-2.5 mb-1">
                              <div className="mr-1"><TruckIcon /></div>
                              <span className="font-medium text-xs">{orderStates.find(orderState => orderState.id === item.order_status)?.name}</span>
                            </div>
                          ) : (
                            <div className="flex items-center w-fit-content bg-gray-100 text-gray-dark rounded-6 py-px px-2.5 mb-1">
                              <div className="mr-1"><TimeScheduleIcon /></div>
                              <span className="font-medium text-xs">{orderStates.find(orderState => orderState.id === item.order_status)?.name}</span>
                            </div>
                          )}
                          <p className="text-xs">{text.on}: {item.updated_at}</p>
                        </div>
                      </TableCell>
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

export default Locations;
