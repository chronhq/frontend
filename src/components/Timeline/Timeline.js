import React from 'react';

import './Timeline.less';

const dummy_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const Event = () =>  (
  <div>
  <div className='timeline__content timeline__content--flipped'>
  <h4 className='timeline__heading'> Flipped Heading </h4>
  <p className='timeline__text'>
    Lorem ipsum
    Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to
  </p>
  </div>
  <div className='timeline__content'>
  <h4 className='timeline__heading'> Year </h4>
  {/* <p className='timeline__text'> Text</p> */}
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
      <div className='container'>
      <ol className='timeline'>
      {dummy_array.map(point =>
        <li key={`key_${point}`} className={ this.state.isSelect ? 'timeline__entry timeline__selected' : 'timeline__entry' } onClick={e => this.selectEvent(e)}>
          <span className="timeline__id" />
          <Event someProp={point} />
        </li>
        )}
      </ol>
      </div>
      );
  }
}
// const Timeline = () => (<div>Timeline Div QUADR</div>);


// Lorem Ipsum is simply dummy
// text of the printing and typesetting industry.
// Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an unknown
// printer took a galley of type and scrambled it to
//  make a type specimen book. It has survived not only
//   five centuries, but also the leap into electronic
//    typesetting, remaining essentially unchange

        // <ul className='timeline'>
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
