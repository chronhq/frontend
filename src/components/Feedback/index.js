import React from 'react';
import PropTypes from 'prop-types';
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

  render() {
    return (
      <div id='feedback' className='container-fluid'>
        <Form
          horizontal
          className='form-inline'
          // action='contact.php'
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   console.log(`submit: name:${this.state.name}, email: ${this.state.email}, text: ${this.state.text}`);
          //   const _this = this;
          //   axios.post('/contact.php', `email=${this.state.email}&name=${this.state.name}&text=${this.state.text}`)
          //     .then(function (response) {
          //       _this.setState({ ..._this.state, email: '', name: '', text: '', visibile: true, success: true });
          //       console.log(response);
          //     })
          //     .catch(function (error) {
          //       _this.setState({ ..._this.state, visibile: true, success: false });
          //       console.log(error);
          //     });
          // }}
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
          </Row>
          <Row className='text-center'>
            <p>Нажимая на кнопку, вы даете согласие на обработку своих персональных данных <br />

            <a
              href='https://chronist.ru/privacy'
              target='_blank'
              rel='noopener noreferrer'
            >Политика конфедициальности</a>
            </p>
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
          <Modal.Title> Обратная связь </Modal.Title>
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
