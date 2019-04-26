/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import Button, { BUTTON_TYPE, BUTTON_SIZE } from '../Button/Button';

import {
  Create,
  Change,
  Sandbox,
  Calendar,
  Upload,
  Label,
} from './Icons';

import './ActionButtons.less';

const ActionButtonBody = ({ enabled, Icon, text }) => (
  <span className={`action-button action-button--${enabled ? 'enabled' : 'disabled'}`}>
    {Icon && <Icon />}
    {Icon && ' '}
    <span>
      {text}
    </span>
  </span>
);

const ActionButton = ({
  text, Icon, click, enabled = true
}) => (
  <Button
    btnType={BUTTON_TYPE.ICON}
    btnSize={BUTTON_SIZE.AUTO}
    onClick={enabled ? click : () => null}
  >
    <ActionButtonBody enabled={enabled} Icon={Icon} text={text} />
  </Button>
);

const ActionButtonFill = ({
  click, enabled = true
}) => (
  <div
    className={`action-button-stretch action-button--${enabled ? 'enabled' : 'disabled'}`}
    role='button'
    tabIndex={0}
    onKeyDown={enabled ? click : () => null}
    onClick={enabled ? click : () => null}
  />
);


/* eslint-disable new-cap */
const SandboxActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Sandbox });
const CreateActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Create });
const ChangeActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Change });
const CalendarActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Calendar });
const UploadActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Upload });
const LabelActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Label });


export {
  CreateActionButton,
  ChangeActionButton,
  SandboxActionButton,
  CalendarActionButton,
  UploadActionButton,
  LabelActionButton,
  ActionButtonFill,
};

export default ActionButton;
