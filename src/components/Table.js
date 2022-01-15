import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { InputBase, TableRow } from '@material-ui/core';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';

import { ActionButton } from './Buttons';

const CustomTableRow = withStyles((theme) => ({
  root: {
    '& th': {
      backgroundColor: '#FFFFFF',
      color: '#969696',
      fontFamily: 'Poppins',
      fontSize: '12px',
      fontWeight: '600',
      borderColor: '#F0F0F0',
    },
    '& td': {
      color: '#1D1D1B',
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: '400',
      borderColor: '#F0F0F0',
      '& p:nth-child(1)': {
        fontWeight: '500',
      },
      '& p:nth-child(2)': {
        color: '#969696',
      },
    },
    '& th:first-child, td:first-child': {
      paddingLeft: '30px',
    },
  },
}))(TableRow);

const CustomPageSelectInput = withStyles({
  root: {
    width: '80px',
    height: '36px',
    margin: '0 50px 0 15px',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2e2e2e'
  },
  input: {
    height: '36px',
    padding: '0 0 0 16px',
    textAlignLast: 'left',
    '&:focus': {
      backgroundColor: 'unset',
    },
  }
})(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const CustomTablePagination = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <ActionButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </ActionButton>
      <ActionButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </ActionButton>
      <ActionButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </ActionButton>
      <ActionButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </ActionButton>
    </div>
  );
}

CustomTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export { CustomTableRow, CustomPageSelectInput, CustomTablePagination };