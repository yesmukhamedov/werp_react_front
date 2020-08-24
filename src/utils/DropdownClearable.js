import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

const DropdownClearable = props => {
  const {
    handleClear,
    error,
    options = [],
    onChange,
    placeholder,
    value,
    disabled,
  } = props;
  const iconStyle = {
    position: 'absolute',
    bottom: '-1px',
    margin: '1em',
    right: '0.5em',
    lineHeight: 1,
    zIndex: 1,
  };
  const optionsArr = [
    {
      key: 696969,
      text: 'Все',
      value: '',
    },
    ...options,
  ];

  return (
    <div style={{ position: 'relative' }}>
      {disabled == true ? (
        ''
      ) : (
        <Icon link name="close" style={iconStyle} onClick={handleClear} />
      )}

      <Dropdown
        disabled={disabled}
        fluid
        error={error}
        search
        selection
        options={optionsArr}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DropdownClearable;
