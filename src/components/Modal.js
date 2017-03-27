import React from 'react';
import './Modal.less';

const opt1_1 = 'учитель', opt1_2 = 'учащийся', opt1_3 ='научный работник', opt1_4 = 'укажите свой вариант: ';
const opt2_1 = 'удобный' , opt2_2 = 'неудобный';
const opt3_1 = 'регулярно', opt3_2 = 'время от времени', opt3_3 = 'больше никогда';
const opt4_1 = 'да', opt4_2 = 'нет';
const opt5_1 = 'да', opt5_2 = 'нет';
const opt6_1 = 'да', opt6_2 = 'нет';
const opt61_1 = ' развлечения', opt61_2 = 'рабочего процесса', opt61_3 = 'свой вариант';
const opt7_1 = 'правильно', opt7_2 = 'неправильно, но я знаю как лучше';
const opt8_1 = 'только новости про обновление сервиса', opt8_2 = 'новые опросы, я помогу сделать сервис лучше';

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
                Я
                <Radio name='question1' value={opt1_1} data={this.state.answers.question1} cb={this.handleChange} />
                <Radio name='question1' value={opt1_2} data={this.state.answers.question1} cb={this.handleChange} />
                <Radio name='question1' value={opt1_3} data={this.state.answers.question1} cb={this.handleChange} />
                <Radio name='question1' value={opt1_4} data={this.state.answers.question1} cb={this.handleChange} />
                {this.state.answers.question1 === opt1_4 ?
                  <input type="text" onChange={e => this.handleChange(e, 'question1why')} value={this.state.answers.question1why} />
                  : null}
                <hr />

                Подобный формат отображения данных для меня:
                <Radio name='question2' value={opt2_1} data={this.state.answers.question2} cb={this.handleChange} />
                <Radio name='question2' value={opt2_2} data={this.state.answers.question2} cb={this.handleChange} />
                <p> Почему?
                  <input type="text" onChange={e => this.handleChange(e, 'question21')} value={this.state.answers.question21} />
                </p>
                <p> Мне не хватает
                 <input type="text" onChange={e => this.handleChange(e, 'question22')} value={this.state.answers.question22} />
                </p>
                <hr />

                <p> Я думаю, что буду пользоваться ресурсом </p>
                <Radio name='question3' value={opt3_1} data={this.state.answers.question3} cb={this.handleChange} />
                <Radio name='question3' value={opt3_2} data={this.state.answers.question3} cb={this.handleChange} />
                <hr />

                <p> Я рассматриваю возможность оформления платной подписки на сервис: </p>
                <Radio name='question4' value={opt4_1} data={this.state.answers.question4} cb={this.handleChange} />
                <Radio name='question4' value={opt4_2} data={this.state.answers.question4} cb={this.handleChange} />
                <hr />

                <p> Я уже использую подобный сервис: </p>
                <Radio name='question5' value={opt5_1} data={this.state.answers.question5} cb={this.handleChange} />
                <Radio name='question5' value={opt5_2} data={this.state.answers.question5} cb={this.handleChange} />
                <p> Если используете, перечислите пожалуйста: </p>
                <input type="text" onChange={e => this.handleChange(e, 'question51')} value={this.state.answers.question51} />
                <hr />

                <p> Я рассматриваю возможность оформления платной подписки на сервис: </p>
                <Radio name='question6' value={opt6_1} data={this.state.answers.question6} cb={this.handleChange} />
                <Radio name='question6' value={opt6_2} data={this.state.answers.question6} cb={this.handleChange} />
                <p> В качестве: </p>
                <Radio name='question61' value={opt61_1} data={this.state.answers.question61} cb={this.handleChange} />
                <Radio name='question61' value={opt61_2} data={this.state.answers.question61} cb={this.handleChange} />
                <Radio name='question61' value={opt61_3} data={this.state.answers.question61} cb={this.handleChange} />
                {this.state.answers.question61 === opt61_3 ?
                  <input type="text" onChange={e => this.handleChange(e, 'question61why')} value={this.state.answers.question61why} />
                : null}
                <hr />

                <p> Вы всё делаете: </p>
                <Radio name='question7' value={opt7_1} data={this.state.answers.question7} cb={this.handleChange} />
                <Radio name='question7' value={opt7_2} data={this.state.answers.question7} cb={this.handleChange} />
                {this.state.answers.question7===opt7_2 ?
                    <input type="text" onChange={e => this.handleChange(e, 'question7why')} value={this.state.answers.question7why} />
                    : null}
                <hr />


                <p> Пришлите мне: </p>
                <Radio name='question8' value={opt8_1} data={this.state.answers.question8} cb={this.handleChange} />
                <Radio name='question8' value={opt8_2} data={this.state.answers.question8} cb={this.handleChange} />
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
