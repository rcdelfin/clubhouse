import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { debounce } from 'lodash';
import { isUserTouching } from '../../../is_mobile';
import Icon from 'mastodon/components/icon';
import NotificationsCounterIcon from './notifications_counter_icon';

export const links = [
  <NavLink className='tabs-bar__link' to='/timelines/public/local' data-preview-title-id='column.community' data-preview-icon='users' ><span className="ec ec-boy"></span><span className="ec ec-liv"></span><span className="ec ec-girl-brown"></span><FormattedMessage id='tabs_bar.local_timeline' defaultMessage='Local' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/timelines/direct' data-preview-title-id='column.direct' data-preview-icon='envelope' ><Icon id='envelope' fixedWidth /><FormattedMessage id='tabs_bar.direct' defaultMessage='Direct Messages' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/notifications' data-preview-title-id='column.notifications' data-preview-icon='bell' ><NotificationsCounterIcon /><FormattedMessage id='tabs_bar.notifications' defaultMessage='Notifications' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/favourites' data-preview-title-id='column.favourites' data-preview-icon='star' ><Icon id='star' fixedWidth /><FormattedMessage id='tabs_bar.favourites' defaultMessage='Favourites' /></NavLink>,
  <NavLink className='tabs-bar__link optional' to='/search' data-preview-title-id='tabs_bar.search' data-preview-icon='bell' ><span className="ec ec-mag"></span><FormattedMessage id='tabs_bar.search' defaultMessage='Search' /></NavLink>,
];

// <NavLink className='tabs-bar__link' style={{ flexGrow: '0', flexBasis: '30px' }} to='/getting-started' data-preview-title-id='getting_started.heading' data-preview-icon='bars' ><Icon id='bars' fixedWidth /></NavLink>


export function getIndex (path) {
  return links.findIndex(link => link.props.to === path);
}

export function getLink (index) {
  return links[index].props.to;
}

export default @injectIntl
@withRouter
class TabsBar extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  setRef = ref => {
    this.node = ref;
  }

  handleClick = (e) => {
    // Only apply optimization for touch devices, which we assume are slower
    // We thus avoid the 250ms delay for non-touch devices and the lag for touch devices
    if (isUserTouching()) {
      e.preventDefault();
      e.persist();

      requestAnimationFrame(() => {
        const tabs = Array(...this.node.querySelectorAll('.tabs-bar__link'));
        const currentTab = tabs.find(tab => tab.classList.contains('active'));
        const nextTab = tabs.find(tab => tab.contains(e.target));
        const { props: { to } } = links[Array(...this.node.childNodes).indexOf(nextTab)];


        if (currentTab !== nextTab) {
          if (currentTab) {
            currentTab.classList.remove('active');
          }

          const listener = debounce(() => {
            nextTab.removeEventListener('transitionend', listener);
            this.props.history.push(to);
          }, 50);

          nextTab.addEventListener('transitionend', listener);
          nextTab.classList.add('active');
        }
      });
    }

  }

  render () {
    const { intl: { formatMessage } } = this.props;

    return (
      <div className="tabs-bar-holder">
        <svg className="logo" width="250" height="125" viewBox="0 0 250 125" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M250 0C250 69.0356 194.036 125 125 125C55.9644 125 0 69.0356 0 0C0 0 51.5318 8.66592e-06 120.567 8.66592e-06C189.603 8.66592e-06 250 0 250 0Z" fill="white"/>
        </svg>
        <nav className='tabs-bar' ref={this.setRef}>
          {links.map(link => React.cloneElement(link, { key: link.props.to, onClick: this.handleClick, 'aria-label': formatMessage({ id: link.props['data-preview-title-id'] }) }))}
        </nav>
      </div>
    );
  }

}
