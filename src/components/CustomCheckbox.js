import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';

const CustomCheckbox = withStyles({
  root: {
    color: '#e8e8e8',
    borderRadius: 0,
    padding: 0,
    '&$checked': {
      color: '#4588ff',
    },
    '&.MuiCheckbox-indeterminate': {
      color: '#4588ff',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default CustomCheckbox;