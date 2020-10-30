import React from 'react';

import { Label } from 'semantic-ui-react';

const CRMCategoryColor = props => {
  const { value } = props;
  const color =
    value == 'ЗЕЛЕНЫЙ'
      ? 'green'
      : value == 'ЧЕРНЫЙ'
      ? 'black'
      : value == 'КРАСНЫЙ'
      ? 'red'
      : 'yellow';

  return (
    <div>
      {value ? (
        <Label color={color} horizontal>
          {value}
        </Label>
      ) : (
        ''
      )}
    </div>
  );
};

export default CRMCategoryColor;
