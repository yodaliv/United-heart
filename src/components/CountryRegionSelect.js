import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '6px 16px',
    color: '#2e2e2e',
    border: '2px solid #f0f0f0',
    borderRadius: '6px',
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.67px',
    outline: 'none',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    'appearance': 'none',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 13px) calc(1em), calc(100% - 8px) calc(1em), calc(100% - 2.5em) 0.5em',
    backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
    backgroundRepeat: 'no-repeat',

    '&:disabled': {
      backgroundColor: '#e0e0e0',
    },
  },
  error: {
    width: '100%',
    padding: '6px 16px',
    color: '#f44336',
    border: '2px solid #f44336',
    borderRadius: '6px',
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.67px',
    outline: 'none',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    'appearance': 'none',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 13px) calc(1em + 10px), calc(100% - 8px) calc(1em + 10px), calc(100% - 2.5em) 0.5em',
    backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
    backgroundRepeat: 'no-repeat',

    '& option': {
      color: '#000',
    },

    '&:disabled': {
      backgroundColor: '#e0e0e0',
    },
  },
  errorMessage: {
    color: '#f44336',
    margin: '3px 14px 0 14px',
    fontSize: '0.75rem',
    textAlign: 'left',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
  },
}));

const CountrySelect = ({ value, onChange, disabled, error, errorMessage }) => {
  const classes = useStyles();

  return (
    <>
      <CountryDropdown
        classes={!error ? classes.root : classes.error}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

const RegionSelect = ({ country, value, onChange, disabled, error, errorMessage }) => {
  const classes = useStyles();

  return (
    <>
      <RegionDropdown
        classes={!error ? classes.root : classes.error}
        country={country}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export { CountrySelect, RegionSelect };
