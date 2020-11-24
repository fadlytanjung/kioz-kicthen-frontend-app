import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({});

export default function AppContextProvider({ children }) {
  
  return (
    <AppContext.Provider>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
