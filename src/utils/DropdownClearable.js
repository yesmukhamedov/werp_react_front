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
  } = props;
  const iconStyle = {
    position: 'absolute',
    bottom: '-1px',
    margin: '1em',
    right: '0.5em',
    lineHeight: 1,
    zIndex: 1,
  };

  // useEffect(() => {
  //   if (options.length === 1) {
  //     onChange('', options[0]);
  //   }
  // }, [options]);

  return (
    <div style={{ position: 'relative' }}>
      <Icon link name="close" style={iconStyle} onClick={handleClear} />
      <Dropdown
        fluid
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
