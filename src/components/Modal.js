import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Modal.less';
// import SurveyList from './survey.json';
import { askBackend } from '../reducers/actions';


class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  render() {
    return (
      <div className='radio'>
        <label htmlFor={this.state.value}>
          <input
            type='radio'
            id={this.state.value}
            value={this.state.value}
            checked={this.props.data === this.state.value}
            onChange={(e) => {
              this.props.cb(e, this.props.name);
            }}
          />
          {this.state.value}
        </label>
      </div>
    );
  }
}

Radio.propTypes = {
  value: React.PropTypes.string.isRequired,
  data: React.PropTypes.string,
  cb: React.PropTypes.func.isRequired,
  name: React.PropTypes.number,
};

Radio.defaultProps = {
  data: '',
  name: '',
};


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
    };
  }


  handleChange = (e, propertyName) => {
    const newAnswers = {
      ...this.state.answers,
      [propertyName]: e.target.value
    };

    this.setState({ answers: newAnswers });
    // console.log(`You have selected ${newAnswers} `);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`You have selected ${this.state.answers} `);
    // this.props.askBackend('');
    this.props.askBackend('SURVEYS_ANSWER', this.state.answers);
  }

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  processOptions = (option, oid, qid) => {
    switch (option.type) {
      case 'radio':
        return (
          <div key={oid}>
            <Radio name={qid} value={option.value} key={`${qid}_${oid}`} data={this.state.answers[qid]} cb={this.handleChange} />
          </div>
        );

      case 'radio-text':
        return (
          <div key={oid}>
            <Radio name={qid} value={option.value} key={`${qid}_${oid}`} data={this.state.answers[qid]} cb={this.handleChange} />
            {this.state.answers[qid] === option.value ?
              <input type='text' onChange={e => this.handleChange(e, `${qid}_{oid}`)} value={this.state.answers[`${qid}_plus`]} />
              : null}
          </div>
        );

      case 'text':
        return (
          <div>
            <p> {option.value} </p>
            <input type='text' onChange={e => this.handleChange(e, `${qid}_${oid}`)} value={this.state.answers[`${qid}_${oid}`]} />;
          </div>
        );

      default:
        return null;
    }
  }


  processQuestion = (data, qid) => (
    <div key={qid}>
      <p> {data.question} </p>
      {data.options.map((cur, id) => this.processOptions(cur, id, qid))}
    </div>
  );

  render() {
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
              <form onSubmit={this.handleFormSubmit}>
                {this.props.surveys[1].json.map(this.processQuestion)}
                <button className="btn btn-default pull-right" type="submit"> Отправить </button>
              </form>
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
  return { surveys: state.surveys.byId };
}

function mapDispatchToProps(dispatch) {
  return {
    askBackend: bindActionCreators(askBackend, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
