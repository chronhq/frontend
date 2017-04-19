import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Modal.less';

import { askBackend } from '../reducers/actions';

const optionPropTypes = {
  ids: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  cb: PropTypes.func.isRequired
};

const Radio = ({ ids, value, data, cb }) => (
  <div className='radio'>
    <label htmlFor={ids.join('r')}>
      <input
        type='radio'
        id={ids.join('r')}
        value={value}
        checked={data.checked}
        onChange={() => {
          cb(!data.checked, ...ids, 'checked');
        }}
      />
      {value}
    </label>
  </div>
);
Radio.propTypes = optionPropTypes;

const RadioText = ({ ids, value, data, cb }) => (
  <div>
    <Radio ids={ids} value={value} data={data} cb={cb} />
    {data.checked === true ?
      <input type='text' onChange={e => cb(e.target.value, ...ids, 'text')} value={data.text} />
      : null}
  </div>
);
RadioText.propTypes = optionPropTypes;

const TextOption = ({ ids, value, data, cb }) => (
  <div>
    <p> {value} </p>
    <input type='text' onChange={e => cb(e.target.value, ...ids, 'text')} value={data.text} />
  </div>
);
TextOption.propTypes = optionPropTypes;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    const answers = Object.keys(this.props.surveys).reduce(
      (prev, sid) => ({
        ...prev,
        [sid]: this.props.surveys[sid].survey.map(
        quest => quest.options.map((opt) => {
          switch (opt.type) {
            case 'radio':
              return { checked: false };
            case 'radio-text':
              return { checked: false, text: '' };
            case 'text':
              return { text: '' };
            default:
              return {};
          }
        }))
      }), {}
    );
    this.state = { answers };
  }

  handleChange = (e, sid, qid, oid, type) => {
    // console.log('Hello from handle change', this.state.answers);
    const question = this.state.answers[sid][qid].map((cur, id) => {
      if (id === oid) { // Change current value
        return type === 'checked' && e === false
          ? cur // Disable uncheck the radio button
          : { ...cur, [type]: e };
      }
      if (type === 'checked') {
        const curType = this.props.surveys[sid].survey[qid].options[id].type;
        // Disable checked: true on other radio_buttons
        if (curType === 'radio' || curType === 'radio-text') {
          return { ...this.state.answers[sid][qid][id], checked: false };
        }
      }
      return cur;
    });
    const newAnswers = {
      ...this.state.answers,
      [sid]: [
        ...this.state.answers[sid].slice(0, qid),
        question,
        ...this.state.answers[sid].slice(qid + 1)
      ]
    };
    // console.log('Bye from handle change', newAnswers);

    this.setState({ answers: newAnswers });
  }

  handleFormSubmit = (e, sid) => {
    e.preventDefault();
    // console.log(`You have selected ${this.state.answers} `);
    this.props.askBackend('SURVEYS_ANSWER', { surveyId: sid, surveyData: this.state.answers[sid] });
  }

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  processOptions = (option, oid, qid, sid) => {
    const data = {
      ids: [sid, qid, oid],
      key: `${sid}_${qid}_${oid}_option`,
      value: option.value,
      data: this.state.answers[sid][qid][oid],
      cb: this.handleChange
    };
    switch (option.type) {
      case 'radio':
        return <Radio {...data} />;
      case 'radio-text':
        return <RadioText {...data} />;
      case 'text':
        return <TextOption {...data} />;
      default:
        return null;
    }
  }


  processQuestion = (data, qid, sid) => (
    <div key={`${sid}_${qid}`}>
      <p> {data.question} </p>
      {data.options.map((cur, id) => this.processOptions(cur, id, qid, sid))}
      {data.noSeparator !== true && <hr />}
    </div>
  );

  printForm = sid => (
    <form key={`${sid}_form`} onSubmit={e => this.handleFormSubmit(e, sid)}>
      {this.props.surveys[sid].survey.map(
        (cur, curId) => this.processQuestion(cur, curId, sid))
      }
      <button className="btn btn-default text-right" type="submit"> Отправить </button>
    </form>
  )

  render() {
    if (this.props.isOpen === false) {
      return null;
    }
    return (
      <div>
        <div className='overlay' />
        <div className='modal-dialog modal-lg'>
          <div className='survey'>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={e => this.close(e)} >&times;</button>
              <h4 className="modal-title pul5l-left">Опрос</h4>
            </div>
            <div className='modal-body'>
              <p>Нам важно, чтобы вы оценили свой опыт от использования сервиса.
                 Пожалуйста, после тестирования заполните небольшую анкету,
                 которая сделает продукт лучше.
              </p>
              <hr />
              {Object.keys(this.props.surveys).map((sid) => {
                if (sid in this.props.posted) {
                  return this.props.posted[sid].result === true
                    ? <p>Ваши данные успешно переданы на сервер</p>
                    : <p>Произошла ошибка {this.props.posted[sid].error}</p>;
                }
                return this.printForm(sid);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  askBackend: React.PropTypes.func.isRequired,
  surveys: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return { surveys: state.surveys.byId, posted: state.answers };
}

function mapDispatchToProps(dispatch) {
  return {
    askBackend: bindActionCreators(askBackend, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
