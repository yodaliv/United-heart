import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BlackButton = withStyles({
  root: {
    color: '#FFFFFF',
    padding: '15px 22px',
    backgroundColor: '#1D1D1B',
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: '#1A1A1A',
    },
    '&:focus': {
      outline: 'none',
    },
    '& span': {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 500,
    },
  },
})(Button);

const GrayButton = withStyles({
  root: {
    color: '#1D1D1B',
    padding: '15px 22px',
    backgroundColor: '#EAEBEC',
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: '#EEEFF0',
    },
    '&:focus': {
      outline: 'none',
    },
    '& span': {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 500,
    },
  },
})(Button);

export { BlackButton, GrayButton };
