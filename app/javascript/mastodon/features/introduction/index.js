import React from 'react';
import PropTypes from 'prop-types';
import ReactSwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { closeOnboarding } from '../../actions/onboarding';
import screenHello from '../../../images/screen_hello.svg';
import screenFederation from '../../../images/screen_federation.svg';
import screenInteractions from '../../../images/screen_interactions.svg';
import logoTransparent from '../../../images/logo_transparent.svg';

const FrameWelcome = ({ domain, onNext }) => (
  <div className='introduction__frame'>
    <div className='introduction__illustration' style={{ background: `url(${logoTransparent}) no-repeat center center / auto 80%` }}>
      <img src={screenHello} alt='' />
    </div>

    <div className='introduction__text introduction__text--centered'>
      <h3><FormattedMessage id='introduction.welcome.headline' defaultMessage='Welcome to the clubhouse!' /></h3>
      <p><FormattedMessage id='introduction.welcome.text' defaultMessage="In a moment, you'll be be part of the club. You can always find your clubhouse at {domain}." values={{ domain: <code>{domain}</code> }} /></p>
    </div>

    <div className='introduction__action'>
      <button className='button' onClick={onNext}><FormattedMessage id='introduction.welcome.action' defaultMessage="Let's go!" /></button>
    </div>
  </div>
);

FrameWelcome.propTypes = {
  domain: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
};

const FrameFederation = ({ onNext }) => (
  <div className='introduction__frame'>
    <div className='introduction__illustration'>
      <img src={screenFederation} alt='' />
    </div>

    <div className='introduction__text introduction__text--centered'>
      <h3><FormattedMessage id='introduction.federation.home.headline' defaultMessage='Play together!' /></h3>
      <p><FormattedMessage id='introduction.federation.home.text' defaultMessage='With clubhouse, you can post messages, pictures, and video. You can also start a video chat to talk with a friend anytime.' /></p>
    </div>

    <div className='introduction__action'>
      <button className='button' onClick={onNext}><FormattedMessage id='introduction.federation.action' defaultMessage='Next' /></button>
    </div>
  </div>
);

FrameFederation.propTypes = {
  onNext: PropTypes.func.isRequired,
};

const FrameInteractions = ({ onNext }) => (
  <div className='introduction__frame'>
    <div className='introduction__illustration'>
      <img src={screenInteractions} alt='' />
    </div>

    <div className='introduction__text introduction__text--centered'>
      <h3><FormattedMessage id='introduction.federation.federated.headline' defaultMessage='Get started!' /></h3>
      <p><FormattedMessage id='introduction.federation.federated.text' defaultMessage='Post your first Toot. Share a message, picture, or video with your friends to get started.' /></p>
    </div>

    <div className='introduction__action'>
      <button className='button' onClick={onNext}><FormattedMessage id='introduction.interactions.action' defaultMessage='Finish toot-orial!' /></button>
    </div>
  </div>
);

FrameInteractions.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default @connect(state => ({ domain: state.getIn(['meta', 'domain']) }))
class Introduction extends React.PureComponent {

  static propTypes = {
    domain: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    currentIndex: 0,
  };

  componentWillMount () {
    this.pages = [
      <FrameWelcome domain={this.props.domain} onNext={this.handleNext} />,
      <FrameFederation onNext={this.handleNext} />,
      <FrameInteractions onNext={this.handleFinish} />,
    ];
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleDot = (e) => {
    const i = Number(e.currentTarget.getAttribute('data-index'));
    e.preventDefault();
    this.setState({ currentIndex: i });
  }

  handlePrev = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.max(0, currentIndex - 1),
    }));
  }

  handleNext = () => {
    const { pages } = this;

    this.setState(({ currentIndex }) => ({
      currentIndex: Math.min(currentIndex + 1, pages.length - 1),
    }));
  }

  handleSwipe = (index) => {
    this.setState({ currentIndex: index });
  }

  handleFinish = () => {
    this.props.dispatch(closeOnboarding());
  }

  handleKeyUp = ({ key }) => {
    switch (key) {
    case 'ArrowLeft':
      this.handlePrev();
      break;
    case 'ArrowRight':
      this.handleNext();
      break;
    }
  }

  render () {
    const { currentIndex } = this.state;
    const { pages } = this;

    return (
      <div className='introduction'>
        <ReactSwipeableViews index={currentIndex} onChangeIndex={this.handleSwipe} className='introduction__pager'>
          {pages.map((page, i) => (
            <div key={i} className={classNames('introduction__frame-wrapper', { 'active': i === currentIndex })}>{page}</div>
          ))}
        </ReactSwipeableViews>

        <div className='introduction__dots'>
          {pages.map((_, i) => (
            <div
              key={`dot-${i}`}
              role='button'
              tabIndex='0'
              data-index={i}
              onClick={this.handleDot}
              className={classNames('introduction__dot', { active: i === currentIndex })}
            />
          ))}
        </div>
      </div>
    );
  }

}
