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

import './ActionButtons.less';

const handleKeyboard = (cb) => (
  (e) => (e.key === 'Enter' ? cb() : null)
);

const ActionButtonBody = ({ enabled, icon, text }) => (
  <span className={`action-button action-button__font action-button--${enabled ? 'enabled' : 'disabled'}`}>
    <div className={`icon ${icon ? `icon-${icon}--light action-button__icon` : ''}`} />
    <span>
      {text}
    </span>
  </span>
);

const ActionButton = ({
  text, icon, click, enabled = true
}) => (
  <Button
    btnType={BUTTON_TYPE.ICON}
    btnSize={BUTTON_SIZE.AUTO}
    onClick={enabled ? click : () => null}
    enabled={enabled}
  >
    <ActionButtonBody enabled={enabled} icon={icon} text={text} />
  </Button>
);

const ActionButtonFill = ({
  click, enabled = true, text = '', icon = 'edit--light', style = {}, className = ''
}) => (
  <div
    className={`action-button--inline action-button--${enabled ? 'enabled' : 'disabled'} ${className}`}
    role='button'
    style={style}
    tabIndex={0}
    onKeyDown={enabled ? handleKeyboard(click) : () => null}
    onClick={enabled ? click : () => null}
  >
    <div className={`icon icon-${icon} ${text ? 'action-button__icon' : ''}`} />
    {text && <div>{text}</div>}
  </div>
);

const ActionButtonFillText = ({
  click, icon, size, text, className, style, enabled = true
}) => (
  <div className={className} style={style}>
    <ActionButtonFill
      click={click}
      icon={icon}
      style={{ height: size, width: size, backgroundColor: 'transparent' }}
      enabled={enabled}
    />
    <div>{text}</div>
  </div>
);

/* eslint-disable new-cap */
const SandboxActionButton = ({ text, click }) => ActionButton({ text, click, icon: 'sandbox' });
const CreateActionButton = ({ text, click }) => ActionButton({ text, click, icon: 'add' });
const ChangeActionButton = ({ text, click }) => ActionButton({ text, click, icon: 'edit' });
const CalendarActionButton = ({ text, click }) => ActionButton({ text, click, icon: 'calendar' });
const LabelActionButton = ({ text, click }) => ActionButton({ text, click, icon: 'road-sign' });

const GiantActionButtonFillText = ({
  text, icon, click, size = '4rem', enabled = true
}) => (
  <ActionButtonFillText
    className='admin-te-card-main__font'
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    click={click}
    icon={icon}
    size={size}
    text={text}
    enabled={enabled}
  />
);


export {
  CreateActionButton,
  ChangeActionButton,
  SandboxActionButton,
  CalendarActionButton,
  LabelActionButton,
  ActionButtonFill,
  ActionButtonFillText,
  GiantActionButtonFillText,
};

export default ActionButton;
