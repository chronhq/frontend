import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { Modal, Button, Row, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Feedback.less';

class FeedbackForm extends React.Component {
  state ={
    visibile: false,
    success: false,
    name: '',
    email: '',
    text: ''
  }
  getGlyph() {
    return this.state.success ? 'fa icon-check ' : 'fa icon-cancel';
  }
  getSecret() {
    const pi = 314159;
    const ts = Math.floor(Date.now() / 1000);
    const arr = ts.toString().split('');
    const magic = arr.reduce((m, cur) => (Number(cur) === 0 ? m : m * cur), 1);
    const params = `p=${ts * pi}&m=${magic * this.state.text.length}`;
    return params;
  }

  render() {
    return (
      <div id='feedback' className='container-fluid'>
        <Form
          horizontal
          className='form-inline'
          onSubmit={(e) => {
            e.preventDefault();
            const _this = this;
            const url = '/shared/contact.php';
            const req = {
              method: 'POST',
              credentials: 'same-origin',
              body: `${this.getSecret()}&demo=1&email=${this.state.email}&name=${encode(this.state.name)}&text=${encodeURI(this.state.text)}`,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            fetch(url, req).then((response) => {
              const success = response.status === 200;
              const wipe = success ? { email: '', name: '', text: '' } : {};
              _this.setState({ ..._this.state, ...wipe, visibile: true, success });
              console.log('resp', response);
            })
            .catch(function (error) {
              _this.setState({ ..._this.state, visibile: true, success: false });
              console.log('err', error);
            });
          }}
        >
          <Row>
            <textarea
              className='long-input'
              type='text'
              value={this.state.text}
              rows='7'
              maxLength='2000'
              required
              // onInvalid={alert('Заполните это поле')}
              style={{ height: 200 }}
              placeholder='Опишите ситуацию *'
              onChange={(e) => {
                this.setState({ ...this.state, text: e.target.value });
              }}
            />
          </Row>
          <Row>
            <input
              className='short-input'
              type='text'
              value={this.state.name}
              // size='40'
              placeholder='Имя'
              maxLength='20'
              onChange={(e) => {
                this.setState({ ...this.state, name: e.target.value });
              }}
            />
          </Row>
          <Row>
            <input
              type='email'
              value={this.state.email}
              // size='20'
              maxLength='100'
              placeholder='Электронная почта'
              onChange={(e) => {
                this.setState({ ...this.state, email: e.target.value });
              }}
            />
          </Row>
          <Row>
            <button type='submit' className='btn btn-empty'>Отправить</button>
            <span key='result' style={this.state.visibile ? {} : { display: 'none' }} className={this.getGlyph()}>{' '}{this.state.success ? 'Ваше сообщение успешно отправлено' : 'Произошла ошибка'}<br /></span>
          </Row>
        </Form>
      </div>
    );
  }
}

class Feedback extends React.Component {
  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    if (this.props.isOpen === false) {
      return null;
    }
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Button className='close float-left' onClick={e => this.close(e)} > &times; </Button>
          <Modal.Title>Обратная связь</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Нашли ошибку?
          <FeedbackForm />
        </Modal.Body>
      </Modal.Dialog>
    );
  }
}

Feedback.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Feedback;
