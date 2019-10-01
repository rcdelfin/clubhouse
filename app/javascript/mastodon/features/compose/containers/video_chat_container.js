import { connect } from 'react-redux';
import TextIconButton from '../components/text_icon_button';
import { injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  video_chat_message: { id: 'video_chat_message', defaultMessage: 'Click to chat' },
});

const mapStateToProps = (state, { intl }) => ({
  label: 'Add a video chat link',
  title: intl.formatMessage(messages.video_chat_message),
  ariaControls: 'cw-spoiler-input',
});

const mapDispatchToProps = dispatch => ({

  onClick () {},

});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TextIconButton));
