import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';
import './Feedback.less';
import { InputCheckBox, InputNumber, InputSelect } from '../Input';

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
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.feedback.submit();
            return false;
          }}
        >
          <div className='feedback--line'>
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
          <div className='feedback--line'>
            <InputNumber
              min={this.props.store.year.min}
              max={this.props.store.year.max}
              value={this.feedback.year}
              placeholder={this.props.store.i18n.feedback.year}
              cb={(value) => {
                console.log('inpute number value', value);
                this.feedback.year = value;
                return false;
              }}
            />
            <InputSelect
              value={this.feedback.layer}
              placeholder={this.props.store.i18n.tooltips.layers}
              options={this.props.store.i18n.layerNames}
              cb={(value) => {
                console.log('cb value', value);
                this.feedback.layer = value;
                return false;
              }}
            />
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
