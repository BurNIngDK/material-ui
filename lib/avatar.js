'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesColors = require('./styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Avatar = _react2['default'].createClass({
  displayName: 'Avatar',

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
    backgroundColor: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node,
    color: _react2['default'].PropTypes.string,
    icon: _react2['default'].PropTypes.element,
    size: _react2['default'].PropTypes.number,
    src: _react2['default'].PropTypes.string,
    style: _react2['default'].PropTypes.object
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

  getDefaultProps: function getDefaultProps() {
    return {
      backgroundColor: _stylesColors2['default'].grey400,
      color: _stylesColors2['default'].white,
      size: 40
    };
  },

  render: function render() {
    var _props = this.props;
    var backgroundColor = _props.backgroundColor;
    var color = _props.color;
    var icon = _props.icon;
    var size = _props.size;
    var src = _props.src;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['backgroundColor', 'color', 'icon', 'size', 'src', 'style']);

    var styles = {
      root: {
        height: size,
        width: size,
        userSelect: 'none',
        borderRadius: '50%',
        display: 'inline-block'
      }
    };

    if (src) {
      var borderColor = this.state.muiTheme.avatar.borderColor;

      if (borderColor) {
        styles.root = this.mergeStyles(styles.root, {
          height: size - 2,
          width: size - 2,
          border: 'solid 1px ' + borderColor
        });
      }

      return _react2['default'].createElement('img', _extends({}, other, { src: src, style: this.prepareStyles(styles.root, style) }));
    } else {
      styles.root = this.mergeStyles(styles.root, {
        backgroundColor: backgroundColor,
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color
      });

      var styleIcon = {
        margin: 8
      };

      var iconElement = icon ? _react2['default'].cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styleIcon, icon.props.style)
      }) : null;

      return _react2['default'].createElement(
        'div',
        _extends({}, other, { style: this.prepareStyles(styles.root, style) }),
        iconElement,
        this.props.children
      );
    }
  }
});

exports['default'] = Avatar;
module.exports = exports['default'];