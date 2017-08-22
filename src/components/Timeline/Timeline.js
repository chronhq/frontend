import React from 'react';

import './Timeline.less';

const DummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Event = () =>  (
  <div>
    <div className="timeline__heading">
      <h4 className='event__name'> Какидзаки Ёсихиро получает имя Мацумаэ и лицензию сёгуна на торговлю с айнами </h4>
      <h4 className='event__date'> 1604 </h4>
    </div>
    <div className="timeline__text">
      <p>
        В 1604 г. Токугава Иэясу, ставший годом ранее сёгуном, выдал Какидзаки Ёсихиро лицензию на монопольную торговлю с айнами. В отличие от других владетельных князей, он не получил от сёгуна земли (то есть остров Хоккайдо по-прежнему не входил в территорию Японии), но при этом стал прямым вассалом сёгуна и попросил о смене имени своего дома на Мацумаэ.
      </p>
      {/*
      <ul>
        <li>Rerum sit libero possimus amet excepturi</li>
        <li>Exercitationem enim dolores sunt praesentium dolorum praesentium</li>
        <li>Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo</li>
      </ul>
    */}
    </div>
  </div>
);


class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false,
    };
  }

  selectEvent(e) {
    e.preventDefault();
    this.setState({ isSelect: !this.state.isSelect });
  };

  render() {
    return (
      <div className='timeline'>
      {DummyArray.map(id =>
        <div key={`key_${id}`} className={ this.state.isSelect ? 'timeline__entry timeline__entry--selected' : 'timeline__entry' } onClick={e => this.selectEvent(e)}>
          <Event />
        </div>
        )}
      </div>
      );
  }
}

//         <li key={`key_${point}`} className={ this.state.isSelect ? 'timeline__entry timeline__selected' : 'timeline__entry' } onClick={e => this.selectEvent(e)}>


// const Timeline = () => (<div>Timeline Div QUADR</div>);


// Lorem Ipsum is simply dummy
// text of the printing and typesetting industry.
// Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an unknown
// printer took a galley of type and scrambled it to
//  make a type specimen book. It has survived not only
//   five centuries, but also the leap into electronic
//    typesetting, remaining essentially unchange

        // <ul classNameName='timeline'>
        //   <li className='timeline__entry'>
        //     <span className="timeline__id">Date</span>
        //     <div className='timeline__content'>
        //       <h4 className='timeline__heading'>This is where our heading will go</h4>
        //       <p className='timeline__text'>This is where our text will go
        //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat nulla, venenatis non interdum ac, mollis vitae tortor. Nam mollis nunc quis sem aliquet vulputate. Etiam vestibulum odio at mi euismod interdum. Cras vel quam sagittis, egestas quam at, porta dui. Suspendisse vulputate lectus eu purus blandit scelerisque. Ut quis erat congue, volutpat risus quis, aliquam lacus. Etiam id tristique ante. Maecenas mattis ex felis, eget congue velit ultrices eget. Proin vitae dolor maximus, varius ligula eget, maximus massa. Phasellus sed mauris sit amet massa consequat semper eget in arcu. Vestibulum eget augue malesuada orci aliquet aliquam quis vitae nunc. Phasellus a dolor lectus.</p>
        //     </div>
        //   </li>
        //   <li className='timeline__entry'>
        //     <span className="timeline__id">Date</span>
        //     <div className='timeline__content'>
        //       <h4 className='timeline__heading'>This is where our heading will go</h4>
        //       <p className='timeline__text'>This is where our text will go</p>
        //     </div>
        //   </li>
        // </ul>

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // style: { color: 'blue' },
//       // ghost: this.props.
//     };
//   }

//     // state = {
//     //   style: { color: 'blue' }
//     // };

//   render() {
//     return(
//       <div style={this.state.style}> Test </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     borderProp: state.runtime.bordersData.properties,
//     colorData: state.runtime.colorsData.name,
//   };
// }

// connect(mapStateToProps)(Test);

export default Timeline;
