import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import routes from '../../../../routes';
import { useTranslations } from '../../../../hooks/translations';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  subitem: {
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const SideBar = ({ history }) => {
  const classes = useStyles();
  const text = useTranslations('admin');
  const adminRoutes = routes.filter(prop => prop.layout === '/admin');

  const activeRoute = (path) => {
    return history.location.pathname.indexOf(path) > -1 ? true : false;
  };

  const [openCollapses, setOpenCollapses] = useState([adminRoutes.find(prop => prop.collapse && activeRoute(prop.path))?.name]);

  const toggleCollapse = (name) => {
    const index = openCollapses.indexOf(name);
    if (index > -1)
      setOpenCollapses(prevState => ([...prevState.slice(0, index), ...prevState.slice(index + 1)]));
    else
      setOpenCollapses(prevState => ([...prevState, name]));
  };

  return (
    <div className="w-14 lg:w-50 h-full overflow-hidden shadow-left z-10 absolute">
      <List className={classes.list}>
        {adminRoutes.map((prop, key) => {
          if (prop.collapse) {
            return (
              <React.Fragment key={key}>
                <ListItem button selected={activeRoute(prop.path)} onClick={() => toggleCollapse(prop.name)}>
                  <ListItemIcon><prop.icon /></ListItemIcon>
                  <ListItemText primary={text[prop.name]} />
                  {openCollapses.indexOf(prop.name) > -1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCollapses.indexOf(prop.name) > -1} timeout="auto" unmountOnExit>
                  <List>
                    {prop.children.map((child, index) => {
                      if (Boolean(child.icon)) {
                        return (
                          <Link to={prop.layout + prop.path + child.path} key={index}>
                            <ListItem className={classes.subitem} button selected={activeRoute(prop.path + child.path)}>
                              <ListItemIcon><child.icon /></ListItemIcon>
                              <ListItemText primary={text[child.name]} />
                            </ListItem>
                          </Link>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return (
              <Link to={prop.layout + prop.path} key={key}>
                <ListItem button selected={activeRoute(prop.path)}>
                  <ListItemIcon><prop.icon /></ListItemIcon>
                  <ListItemText primary={text[prop.name]} />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
    </div>
  );
};

export default SideBar;
