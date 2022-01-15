import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { StyledDialog, StyledInput } from '../../../../../components/Dialogs';
import { BlueButton } from '../../../../../components/Buttons';

const InviteDialog = ({ text, open, data, onChange, onClose, onFinish }) => (
  <StyledDialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>{text.inviteOrg}</DialogTitle>
    <DialogContent>
      <div className="flex items-center my-4">
        <p className="w-40 font-light">{text.email}:</p>
        <StyledInput value={data.email} onChange={e => onChange('email', e.target.value)} />
      </div>
      <div className="flex items-center my-4">
        <p className="w-40 font-light">{text.firstname}:</p>
        <StyledInput value={data.firstname} onChange={e => onChange('firstname', e.target.value)} />
      </div>
      <div className="flex items-center my-4">
        <p className="w-40 font-light">{text.lastname}:</p>
        <StyledInput value={data.lastname} onChange={e => onChange('lastname', e.target.value)} />
      </div>
    </DialogContent>
    <DialogActions>
      <BlueButton onClick={() => onFinish()}>{text.invite}</BlueButton>
    </DialogActions>
  </StyledDialog>
);

export default InviteDialog;
