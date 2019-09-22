import React from 'react';
import PropTypes from 'prop-types';

export default class TextIconButton extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    ariaControls: PropTypes.string,
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }

  render () {
    const { label, title, active, ariaControls } = this.props;

    return (
      <div>
        <label>
          <span className="ec ec-selfie"></span> {label}
        </label>
      </div>
    );
  }

}
