import { forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';

const OrgMenuItem = ({ level, ...other }) => {
  const RenderMenuItem = withStyles({
    root: {
      paddingLeft: level * 16,
    },
  })(MenuItem);

  return <RenderMenuItem {...other} />;
};

export default forwardRef((props, ref) => <OrgMenuItem ref={ref} {...props} />);