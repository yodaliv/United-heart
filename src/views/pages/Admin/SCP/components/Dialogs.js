import React, { useState, useEffect, useRef } from 'react';
import { DialogActions, DialogContent, DialogTitle, Select } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { StyledDialog, StyledInput, SelectInput } from '../../../../../components/Dialogs';
import { BlueButton, GrayButton, RedButton, ActionButton } from '../../../../../components/Buttons';

import { ProductSelectTable, ProductViewTable, TemplateTable } from './Tables';

import { useSCPContext } from '../../../../../context/SCPContext';

const DeleteDialog = ({ text, open, type, description, onClose, onConfirm }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{`${text.delete} ${type}`}</DialogTitle>
      <DialogContent>
        <p className="font-light">
          {description}
        </p>
      </DialogContent>
      <DialogActions>
        <GrayButton onClick={() => onClose()}>{text.cancel}</GrayButton>
        <RedButton onClick={() => onConfirm()}>{text.yes}</RedButton>
      </DialogActions>
    </StyledDialog>
  );
};

const CategoryDialog = ({ text, open, type, data, onChange, onClose, onSave }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{type === 'create' ? text.createCategory : text.updateCategory}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.name}:</p>
          <StyledInput value={data.name} onChange={e => onChange('name', e.target.value)} />
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={data.description} onChange={e => onChange('description', e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <BlueButton disabled={data.name === '' || data.description === ''} onClick={() => onSave()}>{type === 'create' ? text.create : text.update}</BlueButton>
      </DialogActions>
    </StyledDialog>
  );
};

const ProductDialog = ({ text, open, type, data, onChange, onClose, onSave }) => {
  const { categories } = useSCPContext();
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
    >
      <DialogTitle>{type === 'create' ? text.createProduct : text.updateProduct}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.categories}:</p>
          <Select
            native
            value={data.category_id}
            onChange={e => onChange('category_id', parseInt(e.target.value))}
            input={<SelectInput />}
          >
            {categories.map((item, index) => (
              <option key={`category-${index}`} className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={item.id}>{item.name}</option>
            ))}
          </Select>
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.name}:</p>
          <StyledInput value={data.name} onChange={e => onChange('name', e.target.value)} />
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={data.description} onChange={e => onChange('description', e.target.value)} />
        </div>
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
        <BlueButton disabled={data.name === '' || data.description === ''} onClick={() => onSave()}>{type === 'create' ? text.create : text.update}</BlueButton>
      </DialogActions>
    </StyledDialog>
  );
};

const InventoryDialog = ({ text, open, type, data, onChange, onClose, onSave }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{type === 'create' ? text.createInventory : text.deleteInventory}</DialogTitle>
      <DialogContent>
        {type === 'create' && (
          <div className="flex items-center my-4">
            <p className="w-40 font-light">{text.from}:</p>
            <StyledInput value={data.name} onChange={e => onChange('from', e.target.value)} />
          </div>
        )}
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={data.description} onChange={e => onChange('description', e.target.value)} />
        </div>
        <div className="my-4">
          <ProductSelectTable items={data.items} onChange={onChange} />
        </div>
        <div className="flex justify-center my-4">
          <ActionButton onClick={() => onChange(null, null, 'add')}><Add /></ActionButton>
        </div>
      </DialogContent>
      <DialogActions>
        {type === 'create' ? (
          <BlueButton disabled={data.from === '' || data.description === '' || data.items.filter(item => item.qty === 0).length > 0} onClick={() => onSave()}>{text.create}</BlueButton>
        ) : (
          <RedButton disabled={data.description === '' || data.items.filter(item => item.qty === 0).length > 0} onClick={() => onSave()}>{text.delete}</RedButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

const TemplateDialog = ({ text, open, type, data, onChange, onClose, onSave }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{type === 'create' ? text.createTemplate : text.updateTemplate}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.name}:</p>
          <StyledInput value={data.name} onChange={e => onChange('name', e.target.value)} />
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={data.description} onChange={e => onChange('description', e.target.value)} />
        </div>
        <div className="my-4">
          <ProductSelectTable items={data.items} onChange={onChange} />
        </div>
        <div className="flex justify-center my-4">
          <ActionButton onClick={() => onChange(null, null, 'add')}><Add /></ActionButton>
        </div>
      </DialogContent>
      <DialogActions>
        <BlueButton disabled={data.name === '' || data.description === '' || data.items.filter(item => item.qty === 0).length > 0} onClick={() => onSave()}>{type === 'create' ? text.create : text.update}</BlueButton>
      </DialogActions>
    </StyledDialog>
  );
};

const OrderDetailsDialog = ({ text, open, data, onClose }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{text.orderDetails}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <div className="flex-1 flex">
            <p className="font-light mr-2">{text.orderID}:</p>
            <p className="font-semibold">{data.id}</p>
          </div>
          <div className="flex-1 flex">
            <p className="font-light mr-2">{text.status}:</p>
            {data.status === 0 ? (
              <p className="bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.open}</p>
            ) : data.status === 1 ? (
              <p className="bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.completed}</p>
            ) : (
              <p className="bg-red-light-grayish text-red-bright rounded-6 text-center py-px px-2.5">{text.rejected}</p>
            )}
          </div>
        </div>
        <div className="flex items-center my-4">
          <p className="font-light mr-2">{text.schoolName}:</p>
          <p className="font-semibold">{data.school_name}</p>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-1 flex">
            <p className="font-light mr-2">{text.created}:</p>
            <p className="font-semibold">{data.created_at}</p>
          </div>
          <div className="flex-1 flex">
            <p className="font-light mr-2">{text.updated}:</p>
            <p className="font-semibold">{data.updated_at}</p>
          </div>
        </div>
        {data.status === 1 && (
          <div className="flex items-center my-4">
            <div className="flex-1 flex">
              <p className="font-light mr-2">{text.completed}:</p>
              <p className="font-semibold">{data.processed_at}</p>
            </div>
            <div className="flex-1 flex">
              <p className="font-light mr-2">{text.scpPackID}:</p>
              <p className="font-semibold">{'#2009'}</p>
            </div>
          </div>
        )}
        {data.status === 2 && (
          <>
            <div className="flex items-center my-4">
              <p className="font-light mr-2">{text.rejected}:</p>
              <p className="font-semibold">{data.processed_at}</p>
            </div>
            <div className="flex items-center my-4">
              <p className="font-light mr-2">{text.description}:</p>
              <p className="font-semibold">{data.description}</p>
            </div>
          </>
        )}
        <div className="my-8">
          <ProductViewTable text={text} type={data.status === 1 ? 1 : 0} items={data.items} />
        </div>
      </DialogContent>
    </StyledDialog>
  );
};

const DeleteDialogWithDescription = ({ text, open, title, onClose, onConfirm }) => {
  const [description, setDescription] = useState('');

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={description} onChange={e => setDescription(e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <GrayButton onClick={() => onClose()}>{text.cancel}</GrayButton>
        <RedButton onClick={() => onConfirm(description)}>{text.yes}</RedButton>
      </DialogActions>
    </StyledDialog>
  );
};

const EventDialog = ({ text, open, type, schools, orders, data, onChange, onClose, onSave }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{type === 'create' ? text.createScpPack : text.editScpPack}</DialogTitle>
      <DialogContent>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.sendTo}:</p>
          <Select
            native
            value={data.school_name}
            onChange={e => onChange('school_nam', e.target.value)}
            input={<SelectInput />}
          >
            {schools.map((item, index) => (
              <option key={`school-${index}`} className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={item}>{item}</option>
            ))}
          </Select>
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.orderID}:</p>
          <Select
            native
            value={data.order_id}
            onChange={e => onChange('order_id', parseInt(e.target.value))}
            input={<SelectInput />}
          >
            {orders.map((item, index) => (
              <option key={`order-${index}`} className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={item.id}>{item.id}</option>
            ))}
          </Select>
        </div>
        <div className="flex items-center my-4">
          <p className="w-40 font-light">{text.description}:</p>
          <StyledInput value={data.description} onChange={e => onChange('description', e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <BlueButton onClick={() => onSave()}>{type === 'create' ? text.create : text.update}</BlueButton>
      </DialogActions>
    </StyledDialog>
  );
};

const AddSCPDialog = ({ text, open, data, onChange, onClose, onSave }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{text.addSCP}</DialogTitle>
      <DialogContent>
        <div className="my-4">
          <TemplateTable items={data} onChange={onChange} />
        </div>
        <div className="flex justify-center my-4">
          <ActionButton onClick={() => onChange(null, null, 'add')}><Add /></ActionButton>
        </div>
      </DialogContent>
      <DialogActions>
        <BlueButton disabled={data.filter(item => item.qty === 0).length > 0} onClick={() => onSave()}>{text.add}</BlueButton>
      </DialogActions>
    </StyledDialog>
  );
};

const EditSCPDialog = ({ text, open, mode, data, onChange, onClose, onSave }) => {
  const { templates } = useSCPContext();

  return open && (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{text.editSCP}</DialogTitle>
      {mode === 1 ? (
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="w-60 font-light">{text.templateName}:</p>
            <Select
              native
              value={data.template_id}
              input={<SelectInput />}
              onChange={e => onChange('template_id', !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : e.target.value)}
            >
              {templates.map((template, index) => (
                <option key={`template-${index}`} value={template.id}>{template.name}</option>
              ))}
              <option value="custom">{text.custom}</option>
            </Select>
          </div>
          <div className="flex items-center my-4">
            <p className="w-60 font-light">{text.qty}:</p>
            <StyledInput value={data.qty} onChange={e => {
              if (!isNaN(parseInt(e.target.value)))
                onChange('qty', parseInt(e.target.value));
              else
                onChange('qty', 0);
            }} />
          </div>
        </DialogContent>
      ) : mode === 2 ? (
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="font-light mr-2">{text.scpID}:</p>
            <p className="font-semibold">{data.id}</p>
          </div>
          <div className="flex items-center my-4">
            <p className="w-60 font-light">{text.templateName}:</p>
            <Select
              native
              value={data.template_id}
              input={<SelectInput />}
              onChange={e => onChange('template_id', !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : e.target.value)}
            >
              {templates.map((template, index) => (
                <option key={`template-${index}`} value={template.id}>{template.name}</option>
              ))}
              <option value="custom">{text.custom}</option>
            </Select>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="font-light mr-2">{text.scpID}:</p>
            <p className="font-semibold">{data.id}</p>
          </div>
          <div className="my-4">
            <ProductSelectTable items={data.items} onChange={onChange} />
          </div>
          <div className="flex justify-center my-4">
            <ActionButton onClick={() => onChange(null, null, 'add')}><Add /></ActionButton>
          </div>
        </DialogContent>
      )}
      <DialogActions>
        {mode === 1 ? (
          <BlueButton disabled={data.qty <= 0} onClick={() => onSave()}>{text.update}</BlueButton>
        ) : mode === 4 ? (
          <BlueButton disabled={data.items.filter(item => item.qty === 0).length > 0} onClick={() => onSave()}>{text.update}</BlueButton>
        ) : (
          <BlueButton onClick={() => onSave()}>{text.update}</BlueButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

const DeleteSCPDialog = ({ text, open, mode, data, onClose, onConfirm }) => {
  const { getTemplateName } = useSCPContext();

  return open && (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{text.deleteSCP}</DialogTitle>
      {mode === 1 ? (
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="w-60 font-light mr-2">{text.templateName}:</p>
            <p className="font-semibold">{getTemplateName(data.template_id)}</p>
          </div>
          <div className="flex items-center my-4">
            <p className="font-light mr-2">{text.qty}:</p>
            <p className="font-semibold">{data.qty}</p>
          </div>
          <div className="flex items-center my-4">
            <p className="font-light">{text.confirmDeleteSCP}</p>
          </div>
        </DialogContent>
      ) : mode === 2 ? (
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="font-light mr-2">{text.scpID}:</p>
            <p className="font-semibold">{data.id}</p>
          </div>
          <div className="flex items-center my-4">
            <p className="w-60 font-light mr-2">{text.templateName}:</p>
            <p className="font-semibold">{getTemplateName(data.template_id)}</p>
          </div>
          <div className="flex items-center my-4">
            <p className="font-light">{text.confirmDeleteSCP}</p>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="font-light mr-2">{text.scpID}:</p>
            <p className="font-semibold">{data.id}</p>
          </div>
          <div className="my-4">
            <ProductViewTable type={0} items={data.items} />
          </div>
          <div className="flex items-center my-4">
            <p className="font-light">{text.confirmDeleteSCP}</p>
          </div>
        </DialogContent>
      )}
      <DialogActions>
        <GrayButton onClick={() => onClose()}>{text.cancel}</GrayButton>
        <RedButton onClick={() => onConfirm()}>{text.yes}</RedButton>
      </DialogActions>
    </StyledDialog>
  );
};

export { DeleteDialog, CategoryDialog, ProductDialog, InventoryDialog, TemplateDialog, OrderDetailsDialog, DeleteDialogWithDescription, EventDialog, AddSCPDialog, EditSCPDialog, DeleteSCPDialog };