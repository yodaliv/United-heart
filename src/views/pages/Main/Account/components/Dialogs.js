import { DialogActions, DialogContent, DialogTitle, FormHelperText } from '@material-ui/core';

import { StyledDialog, StyledInput } from '../../../../../components/Dialogs';
import { BlueButton } from '../../../../../components/Buttons';

const CreateOrgTypeDialog = ({ text, open, data, validations, onChange, onClose, onFinish }) => (
  <StyledDialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>{text.createOrgType}</DialogTitle>
    <DialogContent>
      <div className="flex items-center mt-4">
        <p className="w-40 font-light">{text.name}:</p>
        <StyledInput
          value={data.org_type}
          error={validations.org_type !== ''}
          onChange={e => onChange('org_type', e.target.value)}
        />
      </div>
      <div className="ml-32 mb-4">
        <FormHelperText error={validations.org_type !== ''}>{validations.org_type === 'has-empty' ? text.fieldRequired : ''}</FormHelperText>
      </div>
    </DialogContent>
    <DialogActions>
      <BlueButton onClick={() => onFinish()}>{text.create}</BlueButton>
    </DialogActions>
  </StyledDialog>
);

const InviteDialog = ({ text, userTypes, open, type, data, validations, onChange, onClose, onFinish }) => (
  <StyledDialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>{type === userTypes.masterAdmin ? text.inviteOrg : type === userTypes.admin ? text.inviteAdmin : text.inviteAmbassador}</DialogTitle>
    <DialogContent>
      <div className="flex items-center mt-4">
        <p className="w-40 font-light">{text.email}:</p>
        <StyledInput
          value={data.email}
          error={validations.email !== ''}
          onChange={e => onChange('email', e.target.value)}
        />
      </div>
      <div className="ml-32 mb-4">
        <FormHelperText error={validations.email !== ''}>{validations.email === 'has-empty' ? text.fieldRequired : validations.email === 'has-danger' ? text.emailIncorrect : ''}</FormHelperText>
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

export { CreateOrgTypeDialog, InviteDialog };
