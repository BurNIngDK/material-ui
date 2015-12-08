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

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _dropDownMenu = require('./drop-down-menu');

var _dropDownMenu2 = _interopRequireDefault(_dropDownMenu);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _mixinsContextPure = require('./mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var SelectField = _react2['default'].createClass({
  displayName: 'SelectField',

  mixins: [_mixinsStylePropable2['default'], _mixinsContextPure2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  statics: {
    getChildrenClasses: function getChildrenClasses() {
      return [_textField2['default'], _dropDownMenu2['default']];
    }
  },

  propTypes: {
    autoWidth: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    errorStyle: _react2['default'].PropTypes.object,
    errorText: _react2['default'].PropTypes.node,
    floatingLabelStyle: _react2['default'].PropTypes.object,
    floatingLabelText: _react2['default'].PropTypes.node,
    fullWidth: _react2['default'].PropTypes.bool,
    hintText: _react2['default'].PropTypes.node,
    iconStyle: _react2['default'].PropTypes.object,
    id: _react2['default'].PropTypes.string,
    inputStyle: _react2['default'].PropTypes.object,
    labelMember: _react2['default'].PropTypes.string,
    labelStyle: _react2['default'].PropTypes.object,
    menuItemStyle: _react2['default'].PropTypes.object,
    menuItems: _react2['default'].PropTypes.array.isRequired,
    multiLine: _react2['default'].PropTypes.bool,
    onBlur: _react2['default'].PropTypes.func,
    onChange: _react2['default'].PropTypes.func,
    onEnterKeyDown: _react2['default'].PropTypes.func,
    onFocus: _react2['default'].PropTypes.func,
    onKeyDown: _react2['default'].PropTypes.func,
    rows: _react2['default'].PropTypes.number,
    selectFieldRoot: _react2['default'].PropTypes.object,
    selectedIndex: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object,
    type: _react2['default'].PropTypes.string,
    underlineStyle: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.any
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

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fullWidth: false,
      labelMember: 'text'
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        height: 46,
        position: 'relative',
        width: '100%',
        top: 16,
        fontSize: 16
      },
      label: {
        paddingLeft: 0,
        top: 4,
        width: '100%'
      },
      icon: {
        top: 20,
        right: 0
      },
      underline: {
        borderTop: 'none'
      },
      input: {},
      error: {}
    };

    if (!this.props.floatingLabelText) {
      styles.label.top = -6;
      styles.icon.top = 11;

      if (this.props.hintText) {
        styles.root.top = -5;
      } else {
        styles.root.top = -8;
      }
    } else {
      styles.error.bottom = -15;
    }

    return styles;
  },

  render: function render() {
    var styles = this.getStyles();
    var _props = this.props;
    var style = _props.style;
    var labelStyle = _props.labelStyle;
    var iconStyle = _props.iconStyle;
    var underlineStyle = _props.underlineStyle;
    var errorStyle = _props.errorStyle;
    var selectFieldRoot = _props.selectFieldRoot;
    var menuItems = _props.menuItems;
    var disabled = _props.disabled;
    var floatingLabelText = _props.floatingLabelText;
    var floatingLabelStyle = _props.floatingLabelStyle;
    var hintText = _props.hintText;
    var fullWidth = _props.fullWidth;
    var errorText = _props.errorText;
    var onFocus = _props.onFocus;
    var onBlur = _props.onBlur;
    var labelMember = _props.labelMember;

    var other = _objectWithoutProperties(_props, ['style', 'labelStyle', 'iconStyle', 'underlineStyle', 'errorStyle', 'selectFieldRoot', 'menuItems', 'disabled', 'floatingLabelText', 'floatingLabelStyle', 'hintText', 'fullWidth', 'errorText', 'onFocus', 'onBlur', 'labelMember']);

    var textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      floatingLabelStyle: floatingLabelStyle,
      hintText: !hintText && !floatingLabelText ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
      onFocus: onFocus,
      onBlur: onBlur
    };
    var dropDownMenuProps = {
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline, underlineStyle),
      autoWidth: false,
      labelMember: labelMember
    };

    return _react2['default'].createElement(
      _textField2['default'],
      textFieldProps,
      _react2['default'].createElement(_dropDownMenu2['default'], _extends({}, dropDownMenuProps, other))
    );
  }
});

exports['default'] = SelectField;
module.exports = exports['default'];