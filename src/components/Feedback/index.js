import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';
import './Feedback.less';
import { InputCheckBox } from '../Input';

@inject('store')
@observer
class FeedbackForm extends React.Component {
  @observable agreement = false;

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

  @action closeFeedback() {
    this.props.store.flags.flags.runtime.intro = false;
  }

  @action handleCheckbox() {
    this.agreement = !this.agreement;
  }


  render() {
    return (
      <div id='feedback' className='container-fluid'>
        <form
          horizontal
          className='form-inline'
          onSubmit={(e) => {
            e.preventDefault();
            this.feedback.submit();
            return false;
          }}
        >
          <div style={{display: 'flex', justifyContent: 'left'}}>
            <input
              type='text'
              value={this.feedback.name}
              placeholder={this.props.store.i18n.feedback.name}
              onChange={(e) => {
                this.feedback.name = e.target.value;
                return false;
              }}
            />
            <input
              type='email'
              value={this.feedback.email}
              placeholder={this.props.store.i18n.feedback.email}
              onChange={(e) => {
                this.feedback.email = e.target.value;
                return false;
              }}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'left'}}>
            <input
              type='number'
              value={this.feedback.year}
              placeholder={this.props.store.i18n.feedback.year}
              onChange={(e) => {
                this.feedback.year = e.target.value;
                return false;
              }}
            />
            <select
              type='number'
              value={this.feedback.layer}
              placeholder={this.props.store.i18n.feedback.layer}
              onChange={(e) => {
                this.feedback.year = e.target.value;
                return false;
              }}
            >
              {this.props.store.i18n.feedback.layers.map(
                // TODO replace array with object and get value from object.keys
                (value, i) => (<option value={value} key={`option_${i}`}>
                  {value}
                </option>)
              )}
            </select>
          </div>
          <textarea
            type='text'
            value={this.feedback.text}
            required
            // onInvalid={alert('Заполните это поле')}
            style={{ height: 200 }}
            placeholder={this.props.store.i18n.feedback.desc}
            onChange={(e) => {
              this.feedback.text = e.target.value;
              return false;
            }}
          />
          <input
            type='text'
            value={this.feedback.ref}
            placeholder={this.props.store.i18n.feedback.ref}
            onChange={(e) => {
              this.feedback.ref = e.target.value;
              return false;
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <InputCheckBox
              name='test'
              label={this.props.store.i18n.feedback.ToS}
              checked={this.agreement}
              cb={() => this.handleCheckbox()}
            />
            <button type='submit' disable={this.agreement ? true : undefined} className={this.agreement ? '' : 'disabled'}>
              {this.props.store.i18n.feedback.button}
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
          </div>
        </form>
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

  @action closeFeedback() {
    this.props.store.flags.flags.runtime.feedback = false;
  }

  render() {
    if (this.isOpen === false) {
      return null;
    }
    return (
      <div className='mistake-report layer-3'>
        <h2>
          {this.props.store.i18n.feedback.title}
        </h2>
        <h5>
          {this.props.store.i18n.feedback.subtitle}
        </h5>
        <button onClick={() => this.closeFeedback()} className='close-window' type='button'>
          <span className="lnr lnr-cross" />
        </button>
        <FeedbackForm />
      </div>
    );
  }
}

export default Feedback;
