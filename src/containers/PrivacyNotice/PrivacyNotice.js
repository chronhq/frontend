import React from 'react';

import Button from '../../components/Button/Button';
import { getCookie, setCookie } from '../../utils/localStorage';
import './PrivacyNotice.less';

class PrivacyNotice extends React.Component {
  state = {
    gdpr: false,
  }

  componentDidMount() {
    if (getCookie().indexOf('gdpr') >= 0) {
      this.setState({ gdpr: true });
    }
  }

  handleClick = () => {
    setCookie('gdpr', true, Date.now());
    this.setState({ gdpr: true });
  }

  render() {
    if (this.state.gdpr) {
      return null;
    }
    return (
      <div className='notification'>
        <div className='page--content'>
          <p>
            {'This website uses cookies'}
            <br />
            {'We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. You consent to our cookies if you continue to use our website.'}
          </p>
          <Button onClick={this.handleClick}>
            {'Agree'}
          </Button>
        </div>
      </div>
    );
  }
}

export default PrivacyNotice;
