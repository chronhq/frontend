import React from 'react';
import Tooltip from 'rc-tooltip';

const Component = ({
  children, placement = 'left', dark = false, content
}) => (
  <Tooltip
    placement={placement}
    trigger={['hover']}
    overlay={() => (
      <span>
        {content}
      </span>
    )}
    overlayClassName={dark ? 'rc-tooltip-dark' : ''}
  >
    {children}
  </Tooltip>
);

export default Component;
