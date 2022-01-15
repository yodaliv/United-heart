import { withStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';

const NotificationBadge = withStyles({
  badge: {
    right: 6,
    top: 6,
    height: '15px',
    fontSize: '9px',
    backgroundColor: '#ec2425'
  },
})(Badge);

export default NotificationBadge;
