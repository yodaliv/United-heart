import { makeStyles } from '@material-ui/core/styles';

const useMasterAdminStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 8,
    '& div': {
      height: 'inherit',
      width: '18%',
      borderRadius: 6,
    },
  },
  fill: {
    background: '#4588FF',
  },
  noFill: {
    background: '#C4C4C4',
  },
}));

const useAdminAmbassadorStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 8,
    '& div': {
      height: 'inherit',
      width: '20%',
      borderRadius: 6,
    },
  },
  fill: {
    background: '#4588FF',
  },
  noFill: {
    background: '#C4C4C4',
  },
}));

const useStudentStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 8,
    '& div': {
      height: 'inherit',
      width: '20%',
      margin: '0 3%',
      borderRadius: 6,
    },
  },
  fill: {
    background: '#4588FF',
  },
  noFill: {
    background: '#C4C4C4',
  },
}));

const MasterAdminRegisterStepper = ({ step }) => {
  const classes = useMasterAdminStyles();

  return (
    <div className={classes.container}>
      <div className={step >= 1 ? classes.fill : classes.noFill} />
      <div className={step >= 2 ? classes.fill : classes.noFill} />
      <div className={step >= 3 ? classes.fill : classes.noFill} />
      <div className={step >= 4 ? classes.fill : classes.noFill} />
      <div className={step >= 5 ? classes.fill : classes.noFill} />
    </div>
  );
};

const AdminAmbassadorRegisterStepper = ({ step }) => {
  const classes = useAdminAmbassadorStyles();

  return (
    <div className={classes.container}>
      <div className={step >= 1 ? classes.fill : classes.noFill} />
      <div className={step >= 2 ? classes.fill : classes.noFill} />
      <div className={step >= 3 ? classes.fill : classes.noFill} />
      <div className={step >= 4 ? classes.fill : classes.noFill} />
    </div>
  );
};

const StudentRegisterStepper = ({ step }) => {
  const classes = useStudentStyles();

  return (
    <div className={classes.container}>
      <div className={step >= 1 ? classes.fill : classes.noFill} />
      <div className={step >= 2 ? classes.fill : classes.noFill} />
    </div>
  );
};

export { MasterAdminRegisterStepper, AdminAmbassadorRegisterStepper, StudentRegisterStepper };
