import { withStyles } from '@material-ui/core/styles';
import { InputBase, InputAdornment } from '@material-ui/core';

import { SearchIcon } from './Icons';

const TextInput = withStyles(theme => ({
  root: {
    width: '288px',
    height: '50px',
    padding: '12px 16px',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    color: '#2e2e2e',
    [theme.breakpoints.down('xs')]: {
      width: 'unset',
    },
  },
  input: {
    padding: 0,
  },
}))(InputBase);

const SearchInput = (props) => {
  return (
    <TextInput
      {...props}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  )
};

export default SearchInput;
