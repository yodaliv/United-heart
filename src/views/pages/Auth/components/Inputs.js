import React, { useState } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { InputBase, FilledInput, InputLabel, FormHelperText, InputAdornment, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MuiPhoneInput from 'material-ui-phone-number';
import ReactCodeInput from 'react-verification-code-input';

import { ActionButton } from '../../../../components/Buttons';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid #f0f0f0',
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: '#fff',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {},
    '&.Mui-error': {
      boxShadow: `${fade('#ec2425', 0.25)} 0 0 0 2px`,
      borderColor: '#ec2425',
    },
  },
  focused: {
    backgroundColor: '#fff',
    boxShadow: `${fade('#4588ff', 0.25)} 0 0 0 2px`,
    borderColor: '#4588ff',
  },
}));

const phoneInputStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    '& label': {
      color: '#bbbbbb',
      fontFamily: 'Poppins',
      fontWeight: 500,
      transform: 'translate(12px, 25px) scale(0.75)',
      zIndex: '999',
      '&.Mui-focused': {
        color: '#4588ff',
        boxShadow: 'unset',
      },
      '&.Mui-error': {
        color: '#f44336',
      },
    },
    '& .MuiInputBase-root': {
      border: '2px solid #f0f0f0',
      overflow: 'hidden',
      borderRadius: 6,
      backgroundColor: '#fff',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '& input': {
        padding: '27px 12px 10px',
      },
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&.Mui-error': {
        boxShadow: `${fade('#ec2425', 0.25)} 0 0 0 2px`,
        borderColor: '#ec2425',
      },
    },
    '& .Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade('#4588ff', 0.25)} 0 0 0 2px`,
      borderColor: '#4588ff',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '0px !important',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '0px !important',
    },
    '& .MuiPhoneNumber-flagButton': {
      height: '30px',
      padding: '0',
      minWidth: '30px',
      margin: '16px -16px 0 8px',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  dropdown: {
    maxHeight: '300px',
    margin: '125px 0 0 0',
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

const codeInputStyles = makeStyles(() => ({
  normal: {
    width: '100% !important',
    display: 'flex',
    justifyContent: 'center',
    '& div': {
      display: 'flex',
      width: '100%',
      overflow: 'auto',
    },
    '& input': {
      width: '15% !important',
      minWidth: '50px',
      height: '70px !important',
      marginLeft: '2%',
      border: 'solid 1px #F0F0F0 !important',
      borderRadius: '6px !important',
    },
    '& input:focus': {
      border: 'solid 1px #006FFF !important',
    },
    '& input:nth-child(1)': {
      marginLeft: 0,
    },
  },
  error: {
    width: '100% !important',
    display: 'flex',
    justifyContent: 'center',
    '& div': {
      display: 'flex',
      width: '100%',
      overflow: 'auto',
    },
    '& input': {
      width: '15% !important',
      minWidth: '50px',
      height: '70px !important',
      marginLeft: '2%',
      border: 'solid 1px #FF0000 !important',
      borderRadius: '6px !important',
    },
    '& input:focus': {
      caretColor: '#FF0000 !important',
    },
    '& input:nth-child(1)': {
      marginLeft: 0,
    },
  },
}));

const SelectInput = withStyles({
  root: {
    width: '100%',
    border: '2px solid #f0f0f0',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  input: {
    padding: '18px 12px 19px 10px',
  }
})(InputBase);

const StyledLabel = withStyles({
  root: {
    color: '#bbbbbb',
    fontFamily: 'Poppins',
    fontWeight: 500,
    transform: 'translate(16px, 21px) scale(1)',
    '&.Mui-focused': {
      color: '#4588ff',
    },
    '&.Mui-error': {
      color: '#f44336',
    },
  },
})(InputLabel);

const TextInput = ({ label, helperText, value, onChange, ...other }) => {
  const classes = useStyles();

  return (
    <FormControl className="w-full" variant="filled">
      <StyledLabel {...other}>{label}</StyledLabel>
      <FilledInput
        disableUnderline
        classes={classes}
        value={value}
        onChange={e => onChange(e.target.value)}
        {...other}
      />
      <FormHelperText {...other}>{helperText}</FormHelperText>
    </FormControl>
  );
};

const PasswordInput = ({ label, helperText, value, onChange, ...other }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl className="w-full" variant="filled">
      <StyledLabel {...other}>{label}</StyledLabel>
      <FilledInput
        disableUnderline
        classes={classes}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <ActionButton
              tabIndex={-1}
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </ActionButton>
          </InputAdornment>
        }
        {...other}
      />
      <FormHelperText {...other}>{helperText}</FormHelperText>
    </FormControl>
  );
};

const PhoneInput = ({ label, value, onChange, error, errorMessage }) => {
  const classes = phoneInputStyles();

  return (
    <>
      <MuiPhoneInput
        label={label}
        defaultCountry="ca"
        countryCodeEditable={false}
        inputClass={classes.input}
        // dropdownClass={classes.dropdown}
        value={value}
        onChange={onChange}
        error={error}
      />
      {error && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

const CodeInput = ({ error, ...others }) => {
  const classes = codeInputStyles();

  return (
    <ReactCodeInput {...others} className={error ? classes.error : classes.normal} />
  );
};

export { TextInput, PasswordInput, SelectInput, PhoneInput, CodeInput };
