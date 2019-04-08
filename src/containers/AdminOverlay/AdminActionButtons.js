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

const Create = ({ fill = '#4A4A4A' }) => (
  <svg width="16px" height="18px" version="1.1" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-577 -546)" fill={fill}>
        <g id="New" transform="translate(577 544)">
          <path d="m15 17.75c0 0.61875-0.448 1.125-1 1.125h-12c-0.552 0-1-0.50625-1-1.125v-13.5c0-0.61875 0.448-1.125 1-1.125h12c0.552 0 1 0.50625 1 1.125v13.5zm-1-15.75h-12c-1.1045 0-2 1.0069-2 2.25v13.5c0 1.2431 0.8955 2.25 2 2.25h12c1.1045 0 2-1.0069 2-2.25v-13.5c0-1.2431-0.8955-2.25-2-2.25zm-3 8.4375h-2.5v-2.8125c0-0.30938-0.224-0.5625-0.5-0.5625s-0.5 0.25312-0.5 0.5625v2.8125h-2.5c-0.276 0-0.5 0.25312-0.5 0.5625s0.224 0.5625 0.5 0.5625h2.5v2.8125c0 0.30938 0.224 0.5625 0.5 0.5625s0.5-0.25312 0.5-0.5625v-2.8125h2.5c0.276 0 0.5-0.25312 0.5-0.5625s-0.224-0.5625-0.5-0.5625z" />
        </g>
      </g>
    </g>
  </svg>
);

const Change = ({ fill = '#4A4A4A' }) => (
  <svg width="16px" height="18px" version="1.1" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-577 -482)" fill={fill}>
        <g id="Edit-profile" transform="translate(577 482)">
          <path d="m5.8947 13.113-2.9496 2.0086c-0.26849 0.14078-0.51008-0.15066-0.38489-0.43345l1.7855-3.3194 1.5489 1.7443zm4.9197-9.3233 1.8172 2.0192-5.7746 6.5071c-0.6761-0.76255-1.6127-1.8179-1.8043-2.0337l5.7618-6.4927zm1.8617-1.7078c0.16724-0.24923 0.43837-0.24923 0.60604 0l0.9082 1.3506c0.16724 0.24923 0.16724 0.65221 0 0.9008l-0.9082 1.3512-1.4927-2.2847 0.88665-1.3179zm-8.8221 8.3442-2.1255 4.8316c-0.17845 0.5445 0.20909 1.0318 0.69352 0.77928l4.3-2.3883c0.18537-0.040518 0.3653-0.12155 0.50865-0.28252l7.6396-8.5843c0.38359-0.43016 0.38359-1.1295 0-1.5602l-1.736-1.951c-0.38408-0.43071-1.0054-0.43071-1.389 0l-7.6396 8.5837c-0.14384 0.16152-0.21503 0.36355-0.2516 0.57169zm11.146-3.6758v9c0 0.61819-0.543 1.1318-1.0915 1.1318h-11.922c-0.5485 0-0.9935-0.50062-0.9935-1.1188v-13.42c0-0.61819 0.4575-1.2178 1.0065-1.2178h8v-1.125h-8c-1.097 0-2 1.1076-2 2.3428v13.42c0 1.2358 0.8895 2.2371 1.987 2.2371h11.922c1.0975 0 2.0915-1.0148 2.0915-2.25v-9h-1z" />
        </g>
      </g>
    </g>
  </svg>
);

const Sandbox = ({ fill = '#4A4A4A' }) => (
  <svg width="16px" height="19px" version="1.1" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-577 -578)" fill={fill}>
        <g id="Sandbox" transform="translate(577 576)">
          <path d="m13.714 4.2857h-1.7143v1.1429h1.7143c0.63086 0 1.1429 0.512 1.1429 1.1429v11.429c0 0.63086-0.512 1.1429-1.1429 1.1429h-11.429c-0.63086 0-1.1429-0.512-1.1429-1.1429v-11.429c0-0.63086 0.512-1.1429 1.1429-1.1429h1.7143v-1.1429h-1.7143c-1.2623 0-2.2857 1.0234-2.2857 2.2857v11.429c0 1.2623 1.0234 2.2857 2.2857 2.2857h11.429c1.2623 0 2.2857-1.0234 2.2857-2.2857v-11.429c0-1.2623-1.0234-2.2857-2.2857-2.2857zm-10.09 8.4331 3.9423 3.9423c0.11943 0.11886 0.27771 0.16971 0.43314 0.16114 0.15543 0.0085714 0.31371-0.042286 0.43314-0.16114l3.9423-3.9423c0.22343-0.22343 0.22343-0.58571 0-0.80857-0.22286-0.22286-0.58514-0.22286-0.80857 0l-2.9954 2.996v-12.335c0-0.316-0.25543-0.57143-0.57143-0.57143-0.31543 0-0.57143 0.25543-0.57143 0.57143v12.335l-2.996-2.996c-0.22286-0.22286-0.58514-0.22286-0.808 0-0.22343 0.22286-0.22343 0.58514 0 0.80857z" />
        </g>
      </g>
    </g>
  </svg>
);

/* eslint-disable jsx-a11y/anchor-is-valid */
const ActionButton = ({ text, Icon, click }) => (
  <a
    href=''
    onClick={(e) => {
      e.preventDefault();
      click();
      return false;
    }}
    className='actionButton'
  >
    {Icon && <Icon />}
    {Icon && ' '}
    <span>
      {text}
    </span>
  </a>
);

/* eslint-disable new-cap */
const SandboxActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Sandbox });
const CreateActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Create });
const ChangeActionButton = ({ text, click }) => ActionButton({ text, click, Icon: Change });

export {
  Create,
  Change,
  Sandbox,
  CreateActionButton,
  ChangeActionButton,
  SandboxActionButton,
};

export default ActionButton;
