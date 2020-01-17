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
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import ModalWrapper from './ModalWrapper';

const id = 'modal-overlay';

@observer
class ModalPortalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.getElementById(id).appendChild(this.el);
  }

  componentWillUnmount() {
    document.getElementById(id).removeChild(this.el);
  }

  render() {
    const {
      close, className, isOpen
    } = this.props;

    return (
      ReactDOM.createPortal(isOpen ? (
        <ModalWrapper className={className} close={close} isOpen={isOpen}>
          {this.props.children}
        </ModalWrapper>
      ) : null, this.el)
    );
  }
}

export const ModalPortalContainer = () => (<div id={id} />);

export default ModalPortalWrapper;
