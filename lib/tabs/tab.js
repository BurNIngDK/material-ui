'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Tab = _react2['default'].createClass({
  displayName: 'Tab',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    label: _react2['default'].PropTypes.node,
    onActive: _react2['default'].PropTypes.func,
    onTouchTap: _react2['default'].PropTypes.func,
    selected: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.string,
    width: _react2['default'].PropTypes.string
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

  getDefaultProps: function getDefaultProps() {
    return {
      onActive: function onActive() {},
      onTouchTap: function onTouchTap() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var onActive = _props.onActive;
    var onTouchTap = _props.onTouchTap;
    var selected = _props.selected;
    var style = _props.style;
    var value = _props.value;
    var width = _props.width;

    var other = _objectWithoutProperties(_props, ['label', 'onActive', 'onTouchTap', 'selected', 'style', 'value', 'width']);

    var styles = this.prepareStyles({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: selected ? this.state.muiTheme.tabs.selectedTextColor : this.state.muiTheme.tabs.textColor,
      outline: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      boxSizing: 'border-box',
      width: width
    }, style);

    return _react2['default'].createElement(
      'div',
      _extends({}, other, {
        style: styles,
        onTouchTap: this._handleTouchTap }),
      label
    );
  },

  _handleTouchTap: function _handleTouchTap(e) {
    this.props.onTouchTap(this.props.value, e, this);
  }

});

exports['default'] = Tab;
module.exports = exports['default'];