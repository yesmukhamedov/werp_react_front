import React from 'react';
import { Dropdown, Icon, Form } from 'semantic-ui-react';

const DropdownClearable = props => {
  const {
    handleClear,
    error,
    options = [],
    onChange,
    placeholder,
    value,
  } = props;
  const iconStyle = {
    position: 'absolute',
    top: '1.5em',
    bottom: 0,
    margin: '1em',
    right: '118.5em',
    lineHeight: 1,
    zIndex: 1,
  };
  return (
    <div>
      <Icon link name="close" style={iconStyle} onClick={handleClear} />
      <Dropdown
        error={error}
        search
        selection
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DropdownClearable;
