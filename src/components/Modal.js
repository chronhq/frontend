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
        <div className='modal-fix'>
          <div className='survey'>

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={e => this.close(e)} >&times;</button>
              <h4 className="modal-title pul5l-left">Survey Header</h4>
            </div>

            <form onSubmit={this.handleFormSubmit}>
              Я
              <div className='radio'>
                <label>
                  <input type='radio' value={opt1_1} checked={this.state.answers.question1===opt1_1} onChange={ (e) => this.handleChange(e, 'question1')} />
                  {opt1_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt1_2} checked={this.state.answers.question1===opt1_2} onChange={(e) => this.handleChange(e, 'question1')} />
                  {opt1_2}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt1_3} checked={this.state.answers.question1===opt1_3} onChange={(e) => this.handleChange(e, 'question1')} />
                  {opt1_3}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt1_4} checked={this.state.answers.question1===opt1_4} onChange={(e) => this.handleChange(e, 'question1')} />
                  {opt1_4}
                </label>
                {this.state.answers.question1===opt1_4 ? 
                  <input type="text" onChange={(e) => this.handleChange(e, 'question1why')} value={this.state.answers.question1why} /> 
                  : null} 
              </div>

              <hr />

              Подобный формат отображения данных для меня:

              <div className='radio'>
                <label>
                  <input type='radio' value={opt2_1} checked={this.state.answers.question2===opt2_1} onChange={(e) => this.handleChange(e, 'question2')} />
                  {opt2_1}
                </label>
              </div>
              <div className='radio'>
                <label> 
                  <input type='radio' value={opt2_2} checked={this.state.answers.question2===opt2_2} onChange={(e) => this.handleChange(e, 'question2')} />
                  {opt2_2}
                </label>
              </div>

              <p> Почему?
                <input type="text" onChange={(e) => this.handleChange(e, 'question21')} value={this.state.answers.question21} />
              </p>

              <p> Мне не хватает
               <input type="text" onChange={(e) => this.handleChange(e, 'question22')} value={this.state.answers.question22} />
              </p>

              <hr />

              <p> Я думаю, что буду пользоваться ресурсом </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt3_1} checked={this.state.answers.question3===opt3_1} onChange={(e) => this.handleChange(e, 'question3')} />
                  {opt3_1}
                </label>
              </div>
              <div className='radio'>
                <label> 
                  <input type='radio' value={opt3_2} checked={this.state.answers.question3===opt3_2} onChange={(e) => this.handleChange(e, 'question3')} />
                  {opt3_2}
                </label>
              </div>

              <hr />

              <p> Я рассматриваю возможность оформления платной подписки на сервис: </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt4_1} checked={this.state.answers.question4 === opt4_1} onChange={(e) => this.handleChange(e, 'question4')} />
                  {opt4_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt4_2} checked={this.state.answers.question4 === opt4_2} onChange={(e) => this.handleChange(e, 'question4')} />
                  {opt4_2}
                </label>
              </div>

              <hr />

              <p> Я уже использую подобный сервис: </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt5_1} checked={this.state.answers.question2===opt5_1} onChange={(e) => this.handleChange(e, 'question2')} />
                  {opt5_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt5_2} checked={this.state.answers.question2===opt5_2} onChange={(e) => this.handleChange(e, 'question2')} />
                  {opt5_2}
                </label>
              </div>

              <p> Если используете, перечислите пожалуйста: </p>
              <input type="text" onChange={(e) => this.handleChange(e, 'question51')} value={this.state.answers.question51} />

              <hr />

              <p> Я рассматриваю возможность оформления платной подписки на сервис: </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt6_1} checked={this.state.answers.question6 === opt6_1} onChange={(e) => this.handleChange(e, 'question6')} />
                  {opt6_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt6_2} checked={this.state.answers.question6 === opt6_2} onChange={(e) => this.handleChange(e, 'question6')} />
                  {opt6_2}
                </label>
              </div>

              <p> В качестве: </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt61_1} checked={this.state.answers.question61 === opt61_1} onChange={(e) => this.handleChange(e, 'question61')} />
                  {opt61_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt61_2} checked={this.state.answers.question61 === opt61_2} onChange={(e) => this.handleChange(e, 'question61')} />
                  {opt61_2}
                </label>
              </div>
               <div className='radio'>
                <label>
                  <input type='radio' value={opt61_3} checked={this.state.answers.question61 === opt61_3} onChange={(e) => this.handleChange(e, 'question61')} />
                  {opt61_3}
                </label>
              </div>
              {this.state.answers.question61===opt61_3 ? 
                  <input type="text" onChange={(e) => this.handleChange(e, 'question61why')} value={this.state.answers.question61why} />
                  : null} 

              <hr />

              <p> Вы всё делаете: </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt7_1} checked={this.state.answers.question7 === opt7_1} onChange={(e) => this.handleChange(e, 'question7')} />
                  {opt7_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt7_2} checked={this.state.answers.question7 === opt7_2} onChange={(e) => this.handleChange(e, 'question7')} />
                  {opt7_2}
                </label>
              </div>

              <hr />


              <p> Вы всё делаете: </p>

              <div className='radio'>
                <label>
                  <input type='radio' value={opt8_1} checked={this.state.answers.question8 === opt8_1} onChange={(e) => this.handleChange(e, 'question8')} />
                  {opt8_1}
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio' value={opt8_2} checked={this.state.answers.question8 === opt8_2} onChange={(e) => this.handleChange(e, 'question8')} />
                  {opt8_2}
                </label>
              </div>

              <button className="btn btn-default pull-right" type="submit">Save</button>                       
            </form>

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
