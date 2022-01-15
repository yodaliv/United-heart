import { withStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ErrorAlert = withStyles({
  root: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.58px',
    color: '#ec2425'
  },
})(Alert);

const ToastAlert = (props) => (
  <Alert elevation={6} variant="filled" {...props} />
);

const Toast = ({ open, type, message, onClose }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <ToastAlert severity={type}>{message}</ToastAlert>
  </Snackbar>
);

export { ErrorAlert, Toast };
