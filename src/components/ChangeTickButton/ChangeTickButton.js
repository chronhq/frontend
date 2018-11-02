import * as React from 'react';

import { Tooltip } from '../Input';
import './ChangeTickButton.less';

const ChangeTickButton = ({ direction, tip, cb }) => (
  <div className={`timeline__control control__${direction}`}>
    <Tooltip content={tip} placement='left'>
      <button onClick={() => cb()} type='button'>
        {direction === 'down' ? <hr /> : null}
        <span className={`lnr lnr-chevron-${direction}`} />
        {direction === 'up' ? <hr /> : null}
      </button>
    </Tooltip>
  </div>
);

export default ChangeTickButton;
