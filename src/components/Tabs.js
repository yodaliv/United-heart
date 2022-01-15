import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';

const StyledTabs = withStyles({
  root: {
    borderBottom: '1px solid #cbcbcb',
  },
  indicator: {
    backgroundColor: '#2e2e2e',
  },
})(Tabs);

const StyledTab = withStyles({
  root: {
    textTransform: 'none',
    minWidth: 98,
    height: 45,
    fontFamily: 'Poppins',
    fontSize: '15px',
    fontWeight: 'normal',
    padding: '0 20px 0 20px',
    color: '#2e2e2e',
    opacity: 0.5,
    '&:hover': {
      opacity: 0.8,
    },
    '&$selected': {
      fontWeight: '500',
    },
    '&:focus': {
      opacity: 1,
      outline: 'none'
    },
  },
  selected: {},
})((props) => <Tab disableRipple {...props} />);

const StyledTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-account-tab-panel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

StyledTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const MainTabs = (props) => {
  const { tabs, children, } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedIndex(newValue);
  };

  return (
    <div className="w-full">
      <StyledTabs
        value={selectedIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((item, index) => (
          <StyledTab key={`main-tab-${index}`} label={item} />
        ))}
      </StyledTabs>
      {children.map((el, index) => (
        <StyledTabPanel key={`main-tab-panel-${index}`} value={selectedIndex} index={index}>
          {el}
        </StyledTabPanel>
      ))}
    </div>
  );
};

MainTabs.propTypes = {
  children: PropTypes.node,
  tabs: PropTypes.array.isRequired,
};

const SectionTabs = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <p className="text-lg font-medium -tracking-0.75 mb-6">SECTIONS</p>
      <div className="border-l border-solid border-gray-100">
        {tabs.map((item, index) => (
          <div key={`section-tab-${item.href}-${index}`} className={selectedTab === index ? 'py-2 pl-4 border-l-2 border-solid border-gray-dark' : 'py-2 pl-4 opacity-50'}>
            <a href={`#${item.href}`} onClick={() => setSelectedTab(index)}><span className="text-sm font-medium">{item.title}</span></a>
          </div>
        ))}
      </div>
    </div>
  )
};

export { MainTabs, SectionTabs };
