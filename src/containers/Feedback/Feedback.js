import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';

import {
  InputCheckBox,
  InputNumber,
  InputSelect,
  MailInput,
  TextInput,
  TextareaInput
} from '../../components/Input';
import './Feedback.less';

@inject('store')
@observer
class FeedbackForm extends React.Component {
  @computed get feedback() {
    return this.props.store.feedback;
  }

  @computed get i18n() {
    return this.props.store.i18n.data.feedback;
  }

  @computed get infoBlockStyle() {
    return this.props.store.feedback.visible === true
      ? { display: 'block', textAlign: 'right' }
      : { display: 'none' };
  }

  @computed get infoMessage() {
    return this.props.store.feedback.success === true
      ? this.i18n.success
      : this.i18n.error;
  }

  @action closeFeedback() {
    this.props.store.flags.flags.runtime.intro = false;
  }


  @action handleData(data) {
    Object.keys(data).map((cur) => {
      this.feedback[cur] = data[cur];
      return false;
    });
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
            <TextInput
              value={this.feedback.title}
              name='title'
              placeholder={this.i18n.name}
              invalid={this.i18n.textInvalid}
              cb={e => this.handleData(e)}
            />
            <MailInput
              value={this.feedback.email}
              name='email'
              placeholder={this.i18n.email}
              invalid={this.i18n.emailInvalid}
              cb={e => this.handleData(e)}
            />

          </div>
          <div className='feedback--line'>
            <InputNumber
              min={this.props.store.year.min}
              max={this.props.store.year.max}
              value={this.feedback.year}
              placeholder={this.i18n.year}
              cb={(value) => {
                this.feedback.year = value;
                return false;
              }}
            />
            <InputSelect
              value={this.feedback.layer}
              placeholder={this.i18n.layer}
              options={this.props.store.i18n.layerNames}
              cb={(value) => {
                console.log('cb value', value);
                this.feedback.layer = value;
                return false;
              }}
            />
          </div>

          <TextareaInput
            value={this.feedback.text}
            name='text'
            placeholder={this.i18n.desc}
            invalid={this.i18n.textareaInvalid}
            cb={e => this.handleData(e)}
          />
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignContent: 'center', verticalAlign: 'middle'
          }}
          >
            <div style={{ verticalAlign: 'middle' }}>
              <InputCheckBox
                name='agreement'
                label=''
                checked={this.feedback.agreement}
                cb={e => this.handleData(e)}
              />
              <p style={{ display: 'inline-block' }}>
                {this.i18n.ToS}
                {' '}
                {' '}
                <a className='decorless' href='https://chronist.ru/privacy'>
                  {this.i18n.ToSlink}
                </a>
              </p>
            </div>
            <button
              type='submit'
              disable={this.feedback.validation ? undefined : 'disabled'}
              className={this.feedback.validation ? '' : 'disabeld'}
            >
              {this.i18n.button}
            </button>
          </div>
          <div
            key='result'
            style={this.infoBlockStyle}
            className={this.feedback.glyph}
          >
            {this.infoMessage}
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
          {this.i18n.title}
        </h2>
        <FeedbackForm />
        <p>
          {this.i18n.subtitle}
        </p>
        <button onClick={() => this.closeFeedback()} className='close-window' type='button'>
          <span className="lnr lnr-cross" />
        </button>
      </div>
    );
  }
}

export default Feedback;
