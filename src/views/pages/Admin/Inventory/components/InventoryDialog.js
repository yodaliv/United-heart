import { useState, useEffect, useRef } from 'react';
import { DialogActions, DialogContent, DialogTitle, Switch } from '@material-ui/core';

import { StyledDialog, StyledInput } from '../../../../../components/Dialogs';
import { BlueButton, GrayButton } from '../../../../../components/Buttons';

const InventoryDialog = ({ text, open, type, data, onChange, onClose, onFinish }) => {
  const imageRef = useRef();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const files = Array.from(data.images);
    Promise.all(files.map(file => {
      return (new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', (ev) => {
          resolve(ev.target.result);
        });
        reader.addEventListener('error', reject);
        reader.readAsDataURL(file);
      }));
    })).then(images => {
      setImages(images)
    });
  }, [data]);

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{type === 'create' ? text.createInventory : text.updateInventory}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.name}:</p>
          <StyledInput value={data.product_name} onChange={e => onChange('product_name', e.target.value)} />
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={data.product_description} onChange={e => onChange('product_description', e.target.value)} />
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.quantity}:</p>
          <StyledInput
            value={data.product_quantity}
            onChange={e => {
              const val = e.target.value;
              if (!isNaN(val)) {
                if (!isNaN(parseInt(val))) onChange('product_quantity', parseInt(val));
                else onChange('product_quantity', 0);
              }
            }}
          />
        </div>
        {data.is_active !== null && data.is_active !== undefined && (
          <div className="flex items-center my-4">
            <p className="w-28 font-light">{text.activeLabel}:</p>
            <Switch
              checked={data.is_active}
              onChange={e => onChange('is_active', e.target.checked)}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
        )}
        <div className="flex my-4">
          <p className="w-40 font-light">{text.images}:</p>
          <div className="w-full">
            <input
              ref={imageRef}
              className="hidden"
              accept="image/*"
              type="file"
              multiple
              onChange={e => onChange('images', e.target.files)}
            />
            <GrayButton onClick={() => imageRef.current.click()}>{text.upload}</GrayButton>
            <div className="w-full flex mt-6 max-w-sm overflow-auto">
              {images.map((item, i) => (
                <img key={i} className="w-12.5 h-12.5 mr-3" src={item} alt="logo" />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <BlueButton onClick={() => onFinish()}>{type === 'create' ? text.create : text.update}</BlueButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default InventoryDialog;
