import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.less';

const styles = {
  tooltip: {
    left: {
      bottom: '50%',
      left: '50%',
      transform: 'translate(-150%, 50%)',
    },
    right: {
      bottom: '50%',
      right: '50%',
      transform: 'translate(150%, 50%)',
    },
    top: {
      left: '50%',
      top: '-10px',
      transform: 'translate(-50%, -100%)',
    },
    bottom: {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, 50%)',
    }
  },
  arrow: {
    left: {
      bottom: '40%',
      right: '-5px',
      marginLeft: '-5px',
      borderTop: 'solid transparent 5px',
      borderBottom: 'solid transparent 5px',
      borderLeft: 'solid #000 5px',
    },
    right: {
      bottom: '40%',
      left: '-5px',
      marginRight: '-5px',
      borderTop: 'solid transparent 5px',
      borderBottom: 'solid transparent 5px',
      borderRight: 'solid #000 5px',
    },
    top: {
      bottom: '0%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '-5px',
      borderLeft: 'solid transparent 5px',
      borderRight: 'solid transparent 5px',
      borderTop: 'solid #000 5px',
    },
    bottom: {
      top: '0%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '-5px',
      borderLeft: 'solid transparent 5px',
      borderRight: 'solid transparent 5px',
      borderBottom: 'solid #000 5px',
    }
  }
};


class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }


  show() {
    this.setVisibility(true);
  }

  hide() {
    this.setVisibility(false);
  }

  setVisibility(visible) {
    this.setState(Object.assign({}, this.state, {
      visible,
    }));
  }

  handleTouch() {
    this.show();
    this.assignOutsideTouchHandler();
  }

  assignOutsideTouchHandler() {
    const handler = (e) => {
      let currentNode = e.target;
      const componentNode = ReactDOM.findDOMNode(this.refs.instance);
      while (currentNode.parentNode) {
        if (currentNode === componentNode) return;
        currentNode = currentNode.parentNode;
      }
      if (currentNode !== document) return;
      this.hide();
      document.removeEventListener('touchstart', handler);
    };
    document.addEventListener('touchstart', handler);
  }

  render() {
    const {
      props, state, show, hide, handleTouch
    } = this;
    return (
      <div
        onMouseEnter={() => show()}
        onMouseLeave={() => hide()}
        onTouchStart={() => handleTouch()}
        ref="wrapper"
        className='tooltip--wrapper'
      >
        {props.children}
        {
          state.visible
          && (
            <div ref="tooltip" className='tooltip' style={styles.tooltip[this.props.placement]}>
              <div ref="gap" className='tooltip--gap' />
              <div ref="arrow" className='tooltip--arrow' style={styles.arrow[this.props.placement]} />
              <div ref="content" className='tooltip--content'>
                {props.content}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Tooltip.defaultProps = {
  placement: 'left'
};

Tooltip.propTypes = {
  placement: PropTypes.string
};

export default Tooltip;
