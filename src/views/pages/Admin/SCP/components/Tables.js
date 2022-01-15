import React from 'react';
import { Select, Paper, Table, TableBody, TableContainer, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { StyledInput } from '../../../../../components/Dialogs';
import { ActionButton } from '../../../../../components/Buttons';

import { useSCPContext } from '../../../../../context/SCPContext';

const ProductSelectTable = ({ items, onChange }) => {
  const { categories, products } = useSCPContext();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="category table">
        <TableHead>
          <TableRow>
            <TableCell width={200} align="center">Category</TableCell>
            <TableCell width={200} align="center">Product</TableCell>
            <TableCell width={150} align="center">Qty</TableCell>
            <TableCell width={100} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell width={200} align="center">
                <Select
                  native
                  value={item.category_id}
                  onChange={e => onChange('category_id', parseInt(e.target.value), 'change', index)}
                >
                  {categories.map((category, index) => (
                    <option key={`category-${index}`} value={category.id}>{category.name}</option>
                  ))}
                </Select>
              </TableCell>
              <TableCell width={200} align="center">
                <Select
                  native
                  value={item.product_id}
                  onChange={e => onChange('product_id', parseInt(e.target.value), 'change', index)}
                >
                  {products.filter(p => p.category_id === item.category_id).map((product, index) => (
                    <option key={`product-${index}`} value={product.id}>{product.name}</option>
                  ))}
                </Select>
              </TableCell>
              <TableCell width={150} align="center">
                <StyledInput value={item.qty} onChange={e => {
                  if (!isNaN(parseInt(e.target.value)))
                    onChange('qty', parseInt(e.target.value), 'change', index);
                  else
                    onChange('qty', 0, 'change', index);
                }} />
              </TableCell>
              <TableCell width={100} align="center">
                <div className="flex justify-center">
                  <ActionButton onClick={() => onChange(null, null, 'delete', index)}><Delete /></ActionButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProductViewTable = ({ text, type, items }) => {
  const { getCategoryName, getProductName } = useSCPContext();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="category table">
        <TableHead>
          <TableRow>
            <TableCell width={200} align="center">Category</TableCell>
            <TableCell width={200} align="center">Product</TableCell>
            <TableCell width={100} align="center">Qty</TableCell>
            {type === 1 && (
              <TableCell width={100} align="center">Sent Qty</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell width={200} align="center">
                {getCategoryName(item.category_id)}
              </TableCell>
              <TableCell width={200} align="center">
                {getProductName(item.product_id)}
              </TableCell>
              <TableCell width={100} align="center">
                {item.qty}
              </TableCell>
              {type === 1 && (
                <TableCell width={100} align="center">{item.sent}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TemplateTable = ({ items, onChange }) => {
  const { templates } = useSCPContext();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="category table">
        <TableHead>
          <TableRow>
            <TableCell width={200} align="center">Template Name</TableCell>
            <TableCell width={150} align="center">Qty</TableCell>
            <TableCell width={100} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell width={200} align="center">
                <Select
                  native
                  value={item.template_id}
                  onChange={e => onChange('template_id', !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : e.target.value, 'change', index)}
                >
                  {templates.map((template, index) => (
                    <option key={`template-${index}`} value={template.id}>{template.name}</option>
                  ))}
                  <option value="custom">Custom</option>
                </Select>
              </TableCell>
              <TableCell width={150} align="center">
                <StyledInput value={item.qty} onChange={e => {
                  if (!isNaN(parseInt(e.target.value)))
                    onChange('qty', parseInt(e.target.value), 'change', index);
                  else
                    onChange('qty', 0, 'change', index);
                }} />
              </TableCell>
              <TableCell width={100} align="center">
                <div className="flex justify-center">
                  <ActionButton onClick={() => onChange(null, null, 'delete', index)}><Delete /></ActionButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ProductSelectTable, ProductViewTable, TemplateTable };