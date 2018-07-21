import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
import './Feedback.less';

@inject('store')
@observer
class FeedbackForm extends React.Component {
  @computed get feedback() {
    return this.props.store.feedback;
  }

  @computed get infoBlockStyle() {
    return this.props.store.feedback.visible === true
      ? {}
      : { display: 'none' };
  }

  @computed get infoMessage() {
    return this.props.store.feedback.success === true
      ? 'Ваше сообщение успешно отправлено'
      : 'Произошла ошибка';
  }

  render() {
    return (
      <div id='feedback' className='container-fluid'>
        <Form
          horizontal
          className='form-inline'
          onSubmit={(e) => {
            e.preventDefault();
            this.feedback.submit();
            return false;
          }}
        >
          <Row>
            <textarea
              className='long-input'
              type='text'
              value={this.feedback.text}
              rows='7'
              maxLength='2000'
              required
              // onInvalid={alert('Заполните это поле')}
              style={{ height: 200 }}
              placeholder='Опишите ситуацию *'
              onChange={(e) => {
                this.feedback.text = e.target.value;
                return false;
              }}
            />
          </Row>
          <Row>
            <input
              className='short-input'
              type='text'
              value={this.feedback.name}
              // size='40'
              placeholder='Имя'
              maxLength='20'
              onChange={(e) => {
                this.feedback.name = e.target.value;
                return false;
              }}
            />
          </Row>
          <Row>
            <input
              type='email'
              value={this.feedback.email}
              // size='20'
              maxLength='100'
              placeholder='Электронная почта'
              onChange={(e) => {
                this.feedback.email = e.target.value;
                return false;
              }}
            />
          </Row>
          <Row>
            <button type='submit' className='btn btn-empty'>
              { 'Отправить' }
            </button>
            <span
              key='result'
              style={this.infoBlockStyle}
              className={this.feedback.glyph}
            >
              {' '}
              {this.infoMessage}
              <br />
            </span>
          </Row>
          <Row className='text-center'>
            <p>
              { 'Нажимая на кнопку, вы даете согласие на обработку своих персональных данных' }
              <br />

              <a
                href='https://chronist.ru/privacy'
                target='_blank'
                rel='noopener noreferrer'
              >

              { 'Политика конфиденциальности' }
              </a>
            </p>
          </Row>
        </Form>
      </div>
    );
  }
}

@inject('store')
@observer
class Feedback extends React.Component {
  @computed get isOpen() {
    return this.props.store.flags.flags.runtime.feedback;
  }

  @action close() {
    this.props.store.flags.flags.runtime.feedback = false;
  }

  render() {
    if (this.isOpen === false) {
      return null;
    }
    // return (
    //   <Modal.Dialog>
    //     <Modal.Header>
    //       <Button className='close float-left' onClick={() => this.close()} > &times; </Button>
    //       <Modal.Title> Обратная связь </Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       Нашли ошибку?
    //       <FeedbackForm />
    //     </Modal.Body>
    //   </Modal.Dialog>
    // );
    return (
      <div>
        {' '}
Todo MODAL обратная связь
        {' '}
      </div>
    );
  }
}

export default Feedback;
