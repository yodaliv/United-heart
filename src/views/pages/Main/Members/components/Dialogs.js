import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { StyledDialog } from '../../../../../components/Dialogs';
import { BlueButton } from '../../../../../components/Buttons';

const RequestDetailsDialog = ({ text, data, open, onClose }) => (
  <StyledDialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>{text.requestDetails}</DialogTitle>
    {Boolean(data) && (
      data.type === 'sin' ? (
        <DialogContent>
          <div className="flex items-center mt-4">
            <span className="w-40 font-light">{text.socialAssistance}:</span>
            <span>{data.social_assistance ? text.yes : text.no}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="w-40 font-light">{text.socialInsurance}:</span>
            <span>{data.social_insurance_id}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="w-40 font-light">{text.student}:</span>
            <span>{data.student_id}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="w-40 font-light">{text.dependents}:</span>
            <span>{data.dependencies}</span>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <div className="flex items-center mt-4">
            <span className="w-40 font-light">{text.student}:</span>
            <span>{data.student_id}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="w-40 font-light">{text.year}:</span>
            <span>{data.year}</span>
          </div>
        </DialogContent>
      ))}
    <DialogActions>
      <BlueButton onClick={() => onClose()}>{text.close}</BlueButton>
    </DialogActions>
  </StyledDialog>
);

export { RequestDetailsDialog };
