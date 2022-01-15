import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="py-4">
          {children}
        </div>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const StyledTab = withStyles({
  root: {
    '&:focus': {
      outline: 'none'
    }
  },
})(Tab);

const CustomTabs = (props) => {
  const { items, children, } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedIndex(newValue);
  };

  return (
    <div className="w-full">
      <Tabs
        value={selectedIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {items.map((item, index) => (
          <StyledTab key={`tab-${index}`} label={item} />
        ))}
      </Tabs>
      {children.map((el, index) => (
        <TabPanel key={`tab-panel-${index}`} value={selectedIndex} index={index}>
          {el}
        </TabPanel>
      ))}
    </div>
  );
};

CustomTabs.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array.isRequired,
};

export default CustomTabs;