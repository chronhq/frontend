import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import Picker from 'rmc-picker';

import TypeOne from './YearSelect-Type1';

import './Picker.less';
import './YearInput.less';

@inject('store')
@observer
class YearInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      value: this.props.store.year.now,
    };
  }

  getItems(start, end) {
    const items: any[] = [];
    const len = end - start + 1;
    for (let i = start; i < start + len; i++) {
      items.push(
        <Picker.Item value={i} key={i} text={i}>
          {i}
        </Picker.Item>
      );
    }
    return items;
  }

  onChange(value) {
    this.setState({
      value,
    });
  }

  handleWheel(event) {
    event.stopPropagation();
    if (event.deltaY > 0) {
      (this.state.value <= this.props.store.year.max -1) ?
        this.setState({ value: (this.state.value + 1) }) :
        null;
    } else if (event.deltaY < 0) {
      (this.state.value > this.props.store.year.min) ?
        this.setState({ value: (this.state.value - 1) }) :
        null;
    }
  }


  @computed get isOpen() {
    return this.props.store.flags.flags.runtime.yearInput;
  }

  @action close() {
    this.props.store.flags.flags.runtime.yearInput = false;
  }

  handleSet() {
    this.props.store.year.setYear(Number(this.state.value));
    this.close();
  }

  render() {
    if (this.isOpen === false) {
      return null;
    }
    return (
      <div className='yearinput__window layer-3'>
        <div className='yearinput__title'>
          <TypeOne />
        </div>
        <div onWheel={(e) => this.handleWheel(e)}>
          <Picker
            selectedValue={this.state.value}
            disabled={this.state.disabled}
            defaultSelectedValue={this.state.value}
            onValueChange={(v) => this.onChange(v)}
            // onScrollChange={(v) => this.onScrollChange(v)}
          >
            {this.getItems(this.props.store.year.min, this.props.store.year.max)}
          </Picker>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <button onClick={() => this.handleSet()} type='button'> Set </button>
          <button onClick={() => this.close()} type='button'>Dismiss</button>
        </div>
      </div>
    );
  }
}


// class YearInputOld extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       disabled: false,
//       items: this.getItems(count),
//       value: 1724,
//     };
//   }

//   getItems(start) {
//     const items: any[] = [];
//     for (let i = start; i < start + len; i++) {
//       items.push(<Picker.Item value={i} key={i}>
//         {i}
//       </Picker.Item>);
//     }
//     return items;
//   }

//   onChange(value) {
//     console.log('onChange', value);
//     this.setState({
//       value,
//     });
//   }

//   // onScrollChange(event) {
//   //   // console.log('onScrollChange', event);
//   // }

//   handleWheel(event) {
//     console.log(event.deltaY);
//     event.stopPropagation();
//     if (event.deltaY > 0) {
//       (this.state.value < 2015) ? this.setState({value: (this.state.value + 1)}) : null;
//     } else if (event.deltaY < 0) {
//       (this.state.value > 1700) ? this.setState({value: (this.state.value - 1)}) : null;
//     }
//   }

//   handlePress(event) {
//     switch (event.key) {
//       case 'Enter':
//         this.props.store.year.setYear(Number(this.now));
//         this.localNow = null;
//         break;
//       default:
//         break;
//     }
//   }

//   handleChange(event) {
//     console.log(`input handle: ${event.target.value}`);
//     if (isNaN(event.target.value)) {
//     } else {
//       this.setState({ value: event.target.value});
//     }
//   }

//   render() {
//     return (
//       <div className='yearinput__window'>

//         <select>
//           {this.state.options}
//         </select>
//         <input
//           type="text"
//           pattern="[0-9]*"
//           length='4'
//           value={this.state.value}
//           // onKeyDown={event => this.handlePress(event)}
//           onChange={event => this.handleChange(event)}
//           // className={this.errors.now ? 'yearInput error' : 'yearInput'}
//         />
//         <div
//           onWheel={(v) => this.handleWheel(v)}
//         >
//           <Picker
//             selectedValue={this.state.value}
//             disabled={this.state.disabled}
//             defaultSelectedValue={1724}
//             onValueChange={(v) => this.onChange(v)}
//             onScrollChange={(v) => this.onScrollChange(v)}
//           >
//             {this.state.items}
//           </Picker>
//         </div>
//       </div>
//     );
//   }
// }

export default YearInput;
