import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, Select, Checkbox, ListItemText } from '@material-ui/core';

import { SelectInput } from '../../../../../../components/Inputs';
import { TableCard, TableCardContent } from '../../../../../../components/Cards';
import { CustomTableRow, CustomPageSelectInput, CustomTablePagination } from '../../../../../../components/Table';
import OrgMenuItem from '../OrgMenuItem';

import { getSubOrganizations } from '../../../../../../apis/organization';
import { getUsersWithOrgIds } from '../../../../../../apis/user';
import { getDateString } from '../../../../../../utils';
import { useAppContext } from '../../../../../../context/AppContext';

const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right"
  },
  getContentAnchorEl: null,
  PaperProps: {
    style: {
      maxHeight: '250px',
      marginTop: '-4px',
    },
  },
};

function Current({ text, org_id, getRoleName }) {
  const { setLoading, setMessage } = useAppContext();

  const [memberList, setMemberList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orgs, setOrgs] = useState([]);
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [stored, setStored] = useState({ count: 0, history: null, data: [] });

  const getOrgsTree = useCallback((list) => {
    let map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i;
      list[i].subOrgs = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_org_id !== org_id) {
        list[map[node.parent_org_id]].subOrgs.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }, [org_id]);

  const loadSubOrgs = useCallback(() => {
    setLoading(true);
    getSubOrganizations(org_id).then(res => {
      const treeData = getOrgsTree(res);
      setOrgs(treeData);
      setLoading(false);
    }).catch(err => {
      setOrgs([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadMembers });
      setLoading(false)
    });
  }, [text, org_id, getOrgsTree, setLoading, setMessage]);

  useEffect(() => {
    loadSubOrgs();
  }, [loadSubOrgs]);

  const loadMembers = (org_ids) => {
    setLoading(true);
    getUsersWithOrgIds(org_ids).then(res => {
      setMemberList(res);
      setLoading(false);
    }).catch(err => {
      setMemberList([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadSubOrgs });
      setLoading(false);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onOpenSelect = () => {
    setStored({ count: 0, history: null, data: [] });
  };

  const onClickItem = (item) => {
    let count = stored.history === item.id ? stored.count : 0;

    let temp = selectedOrgs;
    if (selectedOrgs.indexOf(item.id) === -1) {
      if (count === 0) {
        temp = [...selectedOrgs, item.id];
        setStored({ count: 1, history: item.id, data: selectedOrgs });
      } else if (count === 1) {
        // deselect all
        const allIds = getAllOrgs(item).map(org => org.id);
        allIds.forEach(id => {
          temp.splice(selectedOrgs.indexOf(id), 1);
        });
        setStored({ ...stored, count: 2, history: item.id });
      } else if (count === 2) {
        // select all
        const allIds = getAllOrgs(item).map(org => org.id);
        temp = [...selectedOrgs, ...allIds];
        temp = [...new Set(temp)];
        setStored({ ...stored, count: 3, history: item.id });
      } else if (count === 3) {
        temp = stored.data;
        setStored({ ...stored, count: 0, history: item.id });
      }
    } else {
      if (count === 0) {
        temp.splice(selectedOrgs.indexOf(item.id), 1);
        setStored({ count: 1, history: item.id, data: selectedOrgs });
      } if (count === 1) {
        // select all
        const allIds = getAllOrgs(item).map(org => org.id);
        temp = [...selectedOrgs, ...allIds];
        temp = [...new Set(temp)];
        setStored({ ...stored, count: 2, history: item.id });
      } else if (count === 2) {
        // deselect all
        const allIds = getAllOrgs(item).map(org => org.id);
        allIds.forEach(id => {
          temp.splice(selectedOrgs.indexOf(id), 1);
        });
        setStored({ ...stored, count: 3, history: item.id });
      } else if (count === 3) {
        temp = stored.data;
        setStored({ ...stored, count: 0, history: item.id });
      }
    }

    setSelectedOrgs(temp);
    loadMembers(temp);
  };

  const getOrgNames = (ids) => {
    if (ids.length > 0) {
      const names = ids.map(id => {
        let matchedItem = null;
        orgs.forEach(org => {
          const searched = findOrgById(org, id);
          if (Boolean(searched)) {
            matchedItem = searched;
            return;
          }
        });

        if (Boolean(matchedItem)) return matchedItem.org_name;
        else return '';
      });

      return names.join(', ');
    } else {
      return text.noSelectedOrg;
    }
  };

  const findOrgById = (org, id) => {
    if (org.id === id) {
      return org;
    } else if (org.subOrgs.length > 0) {
      let i;
      let result = null;
      for (i = 0; result == null && i < org.subOrgs.length; i++) {
        result = findOrgById(org.subOrgs[i], id);
      }

      return result;
    }

    return null;
  };

  const getAllOrgs = (org) => {
    let stack = [], array = [], hashMap = {};
    array.push(org);
    stack.push(org);

    while (stack.length !== 0) {
      let node = stack.pop();
      if (node.subOrgs.length === 0 || node.subOrgs === null) {
        if (!hashMap[node.id]) {
          hashMap[node.id] = true;
          array.push(node);
        }
      } else {
        for (let i = node.subOrgs.length - 1; i >= 0; i--) {
          stack.push(node.subOrgs[i]);
        }
      }
    }

    return [...new Set(array)];
  };

  const renderOrgMenus = (list, level) => {
    level = Boolean(level) ? level + 1 : 1;

    return list.map(item => (
      <div key={`org-menu-${item.id}-${level}`} id={`org-menu-${item.id}-${level}`}>
        <OrgMenuItem value={item.id} level={level} onClick={() => onClickItem(item)}>
          <ListItemText primary={item.org_name} />
          <Checkbox color="primary" checked={selectedOrgs.indexOf(item.id) > -1} />
        </OrgMenuItem>
        {renderOrgMenus(item.subOrgs, level)}
      </div>
    ));
  };

  return (
    <div className="my-12">
      <TableCard>
        <TableCardContent>
          {orgs.length > 0 && (
            <div className="flex justify-end">
              <div className="w-60 mr-4">
                <Select
                  multiple
                  displayEmpty
                  value={selectedOrgs}
                  input={<SelectInput />}
                  renderValue={(selected) => getOrgNames(selected)}
                  MenuProps={MenuProps}
                  onOpen={() => onOpenSelect()}
                >
                  {renderOrgMenus(orgs)}
                </Select>
              </div>
            </div>
          )}
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <CustomTableRow>
                  <TableCell>{text.member}</TableCell>
                  <TableCell>{text.status}</TableCell>
                  <TableCell>{text.role}</TableCell>
                  <TableCell>{text.permissions}</TableCell>
                  <TableCell>{text.memberSince}</TableCell>
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {memberList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <CustomTableRow key={index}>
                      <TableCell>
                        <div>
                          <p>{`${item.firstname} ${item.lastname}`}</p>
                          <p>{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.is_active ? (
                          <p className="w-fit-content bg-green-pale-lime text-green-dark-lime rounded-6 py-px px-2.5 mb-1 text-xs">{text.active}</p>
                        ) : (
                          <p className="w-fit-content bg-red-misty-rose text-red-strong rounded-6 py-px px-2.5 mb-1 text-xs">{text.inActive}</p>
                        )}
                      </TableCell>
                      <TableCell>{getRoleName(item.role)}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{getDateString(item.created_at)}</TableCell>
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

export default Current;
