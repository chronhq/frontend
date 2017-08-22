import React from 'react';
import './StartPage.less';


const StartPage = (props) => (
  <div className='startpage__container'>
    <h2 className='starpage__title'> Выберите Режим - Props {props.id} </h2>
    <div className='tile__container'>
      <Tile id={1} />
      <Tile id={2} />
      <Tile id={3} />
    </div>
  </div>
);


class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('props:');
    // console.log(this.props.id);
  }

  render() {
    return (
      <div className='startpage__tile'>
        <h3> Course {this.props.id} </h3>
        <i className="fa fa-globe fa-5x tile__icon" aria-hidden="true"></i>
        <p className='tile__description'>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat. </p>

      </div>
    );
  }
}

export default StartPage;
