import { withStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const StyledSVGIcon = withStyles({
  root: {
    width: '36px',
    height: '36px'
  },
})(SvgIcon);

const StyledIcon = withStyles({
  root: {
    width: '2rem',
    height: '2rem',
    '& .MuiSvgIcon-root': {
      width: '2rem',
      height: '2rem',
    },
  },
})(SvgIcon);

const PeopleIcon = () => (
  <StyledSVGIcon viewBox="0 0 36 36">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g transform="translate(-1097 -26) translate(-1 -1) translate(1098 27)">
            <g stroke="#1D1D1B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(7 9)">
              <path d="M16 18v-2c0-2.21-1.79-4-4-4H4c-2.21 0-4 1.79-4 4v2" />
              <circle cx="8" cy="4" r="4" />
              <path d="M22 18v-2c-.001-1.823-1.235-3.414-3-3.87M15 .13c1.77.453 3.008 2.048 3.008 3.875S16.77 7.427 15 7.88" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const CubeIcon = () => (
  <StyledSVGIcon viewBox="0 0 36 36">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g transform="translate(-1143 -26) translate(-1 -1) translate(1144 27)">
            <g>
              <g stroke="#1D1D1B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M13.5 7.398L4.5 2.208M18 13.998v-8c0-.714-.382-1.373-1-1.73l-7-4c-.619-.357-1.381-.357-2 0l-7 4c-.618.357-1 1.016-1 1.73v8c0 .714.382 1.373 1 1.73l7 4c.619.357 1.381.357 2 0l7-4c.618-.357 1-1.016 1-1.73z" transform="translate(9 7.502)" />
                <path d="M.27 4.958L9 10.008 17.73 4.958M9 20.078L9 9.998" transform="translate(9 7.502)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const SendIcon = () => (
  <StyledSVGIcon viewBox="0 0 36 36">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g transform="translate(-1189 -26) translate(-1 -1) translate(1190 27)">
            <g>
              <g stroke="#1D1D1B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M20 0L9 11M20 0L13 20 9 11 0 7z" transform="translate(8 8)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const NotificationIcon = () => (
  <StyledSVGIcon viewBox="0 0 36 36">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g transform="translate(-1235 -26) translate(-1 -1) translate(1236 27)">
            <g>
              <g stroke="#1D1D1B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M15 6c0-3.314-2.686-6-6-6S3 2.686 3 6c0 7-3 9-3 9h18s-3-2-3-9M10.73 19c-.358.617-1.017.996-1.73.996-.713 0-1.372-.38-1.73-.996" transform="translate(9 8)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </StyledSVGIcon>
);

const NewsIcon = () => (
  <StyledSVGIcon viewBox="0 0 36 36">
    <path d="M19.1111 13.5H24.6667V15.7222H19.1111V13.5ZM19.1111 21.2778H24.6667V23.5H19.1111V21.2778ZM25.7778 8.5H10.2222C9 8.5 8 9.5 8 10.7222V26.2778C8 27.5 9 28.5 10.2222 28.5H25.7778C27 28.5 28 27.5 28 26.2778V10.7222C28 9.5 27 8.5 25.7778 8.5ZM25.7778 26.2778H10.2222V10.7222H25.7778V26.2778ZM16.8889 11.8333H11.3333V17.3889H16.8889V11.8333ZM15.7778 16.2778H12.4444V12.9444H15.7778V16.2778ZM16.8889 19.6111H11.3333V25.1667H16.8889V19.6111ZM15.7778 24.0556H12.4444V20.7222H15.7778V24.0556Z" fill="#323232" />
  </StyledSVGIcon>
);

const DonationIcon = () => (
  <StyledSVGIcon viewBox="0 0 36 36">
    <path d="M25.7778 11.0556H23.5556C23.5556 7.98889 21.0667 5.5 18 5.5C14.9333 5.5 12.4444 7.98889 12.4444 11.0556H10.2222C9 11.0556 8 12.0556 8 13.2778V26.6111C8 27.8333 9 28.8333 10.2222 28.8333H25.7778C27 28.8333 28 27.8333 28 26.6111V13.2778C28 12.0556 27 11.0556 25.7778 11.0556ZM18 7.72222C19.8444 7.72222 21.3333 9.21111 21.3333 11.0556H14.6667C14.6667 9.21111 16.1556 7.72222 18 7.72222ZM25.7778 26.6111H10.2222V13.2778H25.7778V26.6111ZM18 17.7222C16.1556 17.7222 14.6667 16.2333 14.6667 14.3889H12.4444C12.4444 17.4556 14.9333 19.9444 18 19.9444C21.0667 19.9444 23.5556 17.4556 23.5556 14.3889H21.3333C21.3333 16.2333 19.8444 17.7222 18 17.7222Z" fill="#323232" />
  </StyledSVGIcon>
);

const AvatarIcon = () => (
  <StyledIcon>
    <AccountCircle />
  </StyledIcon>
);

export { PeopleIcon, CubeIcon, SendIcon, NotificationIcon, NewsIcon, DonationIcon, AvatarIcon };
