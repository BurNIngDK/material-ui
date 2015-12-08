'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stylesTypography = require('./styles/typography');

var _stylesTypography2 = _interopRequireDefault(_stylesTypography);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

// Badge
exports['default'] = _react2['default'].createClass({
  displayName: 'Badge',
  mixins: [_mixinsStylePropable2['default']],
  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },
  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  propTypes: {
    badgeContent: _react2['default'].PropTypes.node.isRequired,
    badgeStyle: _react2['default'].PropTypes.object,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    primary: _react2['default'].PropTypes.bool,
    secondary: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      primary: false,
      secondary: false,
      style: {},
      badgeStyle: {}
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme
    });
  },
  getStyles: function getStyles() {
    var theme = this.state.muiTheme.badge;

    var badgeBackgroundColor = this.props.primary ? theme.primaryColor : this.props.secondary ? theme.secondaryColor : theme.color;

    var badgeTextColor = this.props.primary ? theme.primaryTextColor : this.props.secondary ? theme.secondaryTextColor : theme.textColor;

    var radius = 12;
    var radius2x = Math.floor(2 * radius);

    return {
      root: {
        position: 'relative',
        display: 'inline-block',
        padding: [radius2x + 'px', radius2x + 'px', radius + 'px', radius + 'px'].join(' ')
      },
      badge: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        fontWeight: _stylesTypography2['default'].fontWeightMedium,
        fontSize: radius,
        width: radius2x,
        height: radius2x,
        borderRadius: '50%',
        backgroundColor: badgeBackgroundColor,
        color: badgeTextColor
      }
    };
  },
  render: function render() {
    var styles = this.getStyles();
    return _react2['default'].createElement(
      'div',
      { style: this.prepareStyles(styles.root, this.props.style), className: this.props.className },
      this.props.children,
      _react2['default'].createElement(
        'span',
        { style: this.prepareStyles(styles.badge, this.props.badgeStyle) },
        this.props.badgeContent
      )
    );
  }
});
module.exports = exports['default'];