import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const HeaderButton = withStyles({
  root: {
    padding: 0,
    marginLeft: '10px',
    '&:focus': {
      outline: 'none'
    }
  },
})(IconButton);

export default HeaderButton;
