import { withStyles } from '@material-ui/core/styles';
import { Icon, SvgIcon } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const StyledSVGIcon = withStyles({
  root: {
    width: '27px',
    height: '25px'
  },
})(SvgIcon);

const SmallSVGIcon = withStyles({
  root: {
    width: '15px',
    height: '15px'
  },
})(SvgIcon);

const StyledIcon = withStyles({
  root: {
    width: '2.25rem',
    height: '2.25rem',
    color: 'rgba(0, 0, 0, 0.54)',
    '& .MuiSvgIcon-root': {
      width: '2.25rem',
      height: '2.25rem',
    },
  },
})(Icon);

const FacebookIcon = () => (
  <StyledSVGIcon viewBox="0 0 27 25">
    <g fill="none" fillRule="evenodd">
      <g fill="#1877F2" fillRule="nonzero">
        <g>
          <g>
            <g>
              <g>
                <path d="M26.408 12.142C26.408 5.436 20.622 0 13.484 0S.56 5.436.56 12.142c0 6.06 4.726 11.083 10.905 11.994v-8.484H8.183v-3.51h3.282V9.467c0-3.043 1.929-4.724 4.881-4.724 1.414 0 2.893.237 2.893.237v2.988h-1.63c-1.605 0-2.106.936-2.106 1.896v2.278h3.585l-.573 3.51h-3.012v8.484c6.179-.91 10.905-5.934 10.905-11.994" transform="translate(-151 -1691) translate(121 1482) translate(30 103) translate(0 100.263) translate(0 6.016)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const InstagramIcon = () => (
  <StyledSVGIcon viewBox="0 0 27 25">
    <defs>
      <linearGradient id="sel3hvkd2a" x1="50%" x2="50%" y1="99.709%" y2=".777%">
        <stop offset="0%" stopColor="#E09B3D" />
        <stop offset="30%" stopColor="#C74C4D" />
        <stop offset="60%" stopColor="#C21975" />
        <stop offset="100%" stopColor="#7024C4" />
      </linearGradient>
      <linearGradient id="rgl9v7jo4b" x1="50%" x2="50%" y1="146.099%" y2="-45.16%">
        <stop offset="0%" stopColor="#E09B3D" />
        <stop offset="30%" stopColor="#C74C4D" />
        <stop offset="60%" stopColor="#C21975" />
        <stop offset="100%" stopColor="#7024C4" />
      </linearGradient>
      <linearGradient id="m41uq9cxlc" x1="50%" x2="50%" y1="658.141%" y2="-140.029%">
        <stop offset="0%" stopColor="#E09B3D" />
        <stop offset="30%" stopColor="#C74C4D" />
        <stop offset="60%" stopColor="#C21975" />
        <stop offset="100%" stopColor="#7024C4" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <g>
          <g>
            <g>
              <g transform="translate(-151 -1731) translate(121 1482) translate(30 103) translate(0 140.369) translate(0 6.009)">
                <path fill="url(#sel3hvkd2a)" d="M18.84 0H7.994C3.586 0 0 3.206 0 7.148v9.697c0 3.942 3.586 7.148 7.994 7.148H18.84c4.409 0 7.995-3.206 7.995-7.148V7.148C26.835 3.206 23.248 0 18.84 0zm5.295 16.845c0 2.615-2.37 4.734-5.295 4.734H7.994c-2.924 0-5.294-2.12-5.294-4.734V7.148c0-2.615 2.37-4.734 5.294-4.734H18.84c2.925 0 5.295 2.12 5.295 4.734v9.697z" />
                <path fill="url(#rgl9v7jo4b)" d="M13.417 5.791c-3.827 0-6.94 2.784-6.94 6.205 0 3.422 3.113 6.206 6.94 6.206 3.827 0 6.94-2.784 6.94-6.206 0-3.421-3.113-6.205-6.94-6.205zm0 9.997c-2.342 0-4.24-1.697-4.24-3.791 0-2.095 1.898-3.792 4.24-3.792 2.343 0 4.241 1.697 4.241 3.792 0 2.094-1.899 3.791-4.24 3.791z" />
                <ellipse cx="20.371" cy="5.838" fill="url(#m41uq9cxlc)" rx="1.663" ry="1.487" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const TwitterIcon = () => (
  <StyledSVGIcon viewBox="0 0 27 25">
    <g fill="none" fillRule="evenodd">
      <g fill="#1DA1F2" fillRule="nonzero">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path d="M8.45 19.24c10.131 0 15.672-7.403 15.672-13.822 0-.21 0-.42-.016-.628 1.078-.688 2.008-1.54 2.747-2.515-1.005.393-2.071.65-3.163.764 1.15-.607 2.01-1.562 2.421-2.687-1.081.566-2.264.965-3.497 1.18-2.086-1.957-5.575-2.052-7.793-.212-1.43 1.187-2.037 2.955-1.593 4.642C8.8 5.766 4.674 3.922 1.878.886c-1.463 2.22-.716 5.06 1.704 6.485-.876-.023-1.733-.231-2.5-.608v.062c.001 2.313 1.85 4.304 4.42 4.762-.811.195-1.662.224-2.488.084.722 1.979 2.79 3.335 5.146 3.374-1.95 1.352-4.36 2.085-6.84 2.083-.438 0-.876-.024-1.311-.07 2.518 1.426 5.45 2.182 8.442 2.179" transform="translate(-151 -1773) translate(121 1482) translate(30 103) translate(0 180.432) translate(0 5.928) translate(0 1.976)" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const LockIcon = () => (
  <SmallSVGIcon viewBox="0 0 24 24">
    <g fill="none" stroke="#979797" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#979797"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </g>
  </SmallSVGIcon>
);

const AvatarIcon = () => (
  <StyledIcon>
    <AccountCircle />
  </StyledIcon>
);

export { FacebookIcon, InstagramIcon, TwitterIcon, LockIcon, AvatarIcon };
