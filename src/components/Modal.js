import React from 'react';
import './Modal.less';

const QuestionZero = 'Я';
const OptionsZero = ['учитель', 'учащийся', 'научный работник', 'укажите свой вариант:'];

const QuestionOne = 'Подобный формат отображения данных для меня:';
const OptionsOne = ['удобный', 'неудобный'];
const QuestionOneOne = 'Я бы добавил';
const QuestionOneTwo = 'Я бы убрал';

const QuestionTwo = 'Я считаю, что для моих нужд он:';
const OptionsTwo = ['подходит', 'не подходит'];
const QuestionTwoOne = 'Почему?';
const QuestionTwoTwo = 'Мне не хватает';

const QuestionThree = 'Я думаю, что буду пользоваться ресурсом';
const OptionsThree = ['регулярно', 'время от времени', 'больше никогда'];

const QuestionFour = 'Я рассматриваю возможность оформления платной подписки на сервис:';
const OptionsFour = ['да', 'нет'];

const QuestionFive = 'Я уже использую подобный сервис:';
const OptionsFive = ['да', 'нет'];

const QuestionSix = 'Мне бы хотелось показать сервис знакомым или коллегам';
const OptionsSix = ['да', 'нет'];

const QuestionSixOne = 'В качестве: ';
const OptionsSixOne = ['развлечения', 'рабочего процесса', 'свой вариант'];

const QuestionSeven = 'Вы всё делаете:';
const OptionsSeven = ['правильно', 'неправильно, но я знаю как лучше'];

const QuestionEight = 'Пришлите мне:';
const OptionsEight = ['только новости про обновление сервиса', 'новые опросы, я помогу сделать сервис лучше'];


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
  name: React.PropTypes.string.isRequired,
};

Radio.defaultProps = {
  data: '',
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
    console.log(`You have selected ${this.state.answers.question1} `);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`You have selected ${this.state.answers.question1} `);
  }

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
                {QuestionZero}
                {OptionsZero.map(option => <Radio name='question0' value={option} key={option} data={this.state.answers.question0} cb={this.handleChange} />)}
                {this.state.answers.question0 === OptionsZero[3] ?
                  <input type="text" onChange={e => this.handleChange(e, 'question0why')} value={this.state.answers.question0why} />
                  : null}
                <hr />

                {QuestionOne}
                {OptionsOne.map(option => <Radio name='question1' value={option} key={option} data={this.state.answers.question1} cb={this.handleChange} />)}
                <p> {QuestionOneOne}
                  <input type="text" onChange={e => this.handleChange(e, 'question11')} value={this.state.answers.question11} />
                </p>
                <p> {QuestionOneTwo}
                  <input type="text" onChange={e => this.handleChange(e, 'question12')} value={this.state.answers.question12} />
                </p>
                <hr />


                {QuestionTwo}
                {OptionsTwo.map(option => <Radio name='question2' value={option} key={option} data={this.state.answers.question2} cb={this.handleChange} />)}
                <p> {QuestionTwoOne}
                  <input type="text" onChange={e => this.handleChange(e, 'question21')} value={this.state.answers.question21} />
                </p>
                <p> {QuestionTwoTwo}
                  <input type="text" onChange={e => this.handleChange(e, 'question22')} value={this.state.answers.question22} />
                </p>
                <hr />

                <p> {QuestionThree} </p>
                {OptionsThree.map(option => <Radio name='question3' value={option} key={option} data={this.state.answers.question3} cb={this.handleChange} />)}
                <hr />

                <p> {QuestionFour} </p>
                {OptionsFour.map(option => <Radio name='question4' value={option} key={option} data={this.state.answers.question4} cb={this.handleChange} />)}
                <hr />

                <p> {QuestionFive} </p>
                {OptionsFive.map(option => <Radio name='question5' value={option} key={option} data={this.state.answers.question5} cb={this.handleChange} />)}
                <p> Если используете, перечислите пожалуйста: </p>
                <input type="text" onChange={e => this.handleChange(e, 'question51')} value={this.state.answers.question51} />
                <hr />

                <p> {QuestionSix} </p>
                {OptionsSix.map(option => <Radio name='question6' value={option} key={option} data={this.state.answers.question6} cb={this.handleChange} />)}
                <p> {QuestionSixOne} </p>
                {OptionsSixOne.map(option => <Radio name='question61' value={option} key={option} data={this.state.answers.question61} cb={this.handleChange} />)}
                {this.state.answers.question61 === OptionsSix[2] ?
                  <input type="text" onChange={e => this.handleChange(e, 'question61why')} value={this.state.answers.question61why} />
                : null}
                <hr />

                <p> {QuestionSeven} </p>
                {OptionsSeven.map(option => <Radio name='question7' value={option} key={option} data={this.state.answers.question7} cb={this.handleChange} />)}
                {this.state.answers.question7 === OptionsSeven[1] ?
                  <input type="text" onChange={e => this.handleChange(e, 'question7why')} value={this.state.answers.question7why} />
                    : null}
                <hr />


                <p> {QuestionEight} </p>
                {OptionsEight.map(option => <Radio name='question8' value={option} key={option} data={this.state.answers.question8} cb={this.handleChange} />)}

                Пожалуйста, оставьте свой контакт для связи.

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
};

export default Modal;
