import { withStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';

const StyledIcon = withStyles({
  root: {
    width: '40px',
    height: '40px'
  },
})(SvgIcon);

const HeartIcon = () => (
  <StyledIcon viewBox="0 0 24 24">
    <g fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </g>
  </StyledIcon>
);

const GiftIcon = () => (
  <StyledIcon viewBox="0 0 24 24">
    <g fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </g>
  </StyledIcon>
);

export { HeartIcon, GiftIcon };
