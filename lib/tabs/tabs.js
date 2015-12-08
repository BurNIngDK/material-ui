'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tabTemplate = require('./tabTemplate');

var _tabTemplate2 = _interopRequireDefault(_tabTemplate);

var _inkBar = require('../ink-bar');

var _inkBar2 = _interopRequireDefault(_inkBar);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _mixinsControllable = require('../mixins/controllable');

var _mixinsControllable2 = _interopRequireDefault(_mixinsControllable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Tabs = _react2['default'].createClass({
  displayName: 'Tabs',

  mixins: [_mixinsStylePropable2['default'], _mixinsControllable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    children: _react2['default'].PropTypes.node,
    contentContainerStyle: _react2['default'].PropTypes.object,
    initialSelectedIndex: _react2['default'].PropTypes.number,
    inkBarStyle: _react2['default'].PropTypes.object,
    style: _react2['default'].PropTypes.object,
    tabItemContainerStyle: _react2['default'].PropTypes.object,
    tabTemplate: _react2['default'].PropTypes.func
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
      initialSelectedIndex: 0,
      tabTemplate: _tabTemplate2['default']
    };
  },

  getInitialState: function getInitialState() {
    var valueLink = this.getValueLink(this.props);
    var initialIndex = this.props.initialSelectedIndex;

    return {
      selectedIndex: valueLink.value ? this._getSelectedIndex(this.props) : initialIndex < this.getTabCount() ? initialIndex : 0,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getEvenWidth: function getEvenWidth() {
    return parseInt(window.getComputedStyle(_reactDom2['default'].findDOMNode(this)).getPropertyValue('width'), 10);
  },

  getTabCount: function getTabCount() {
    return _react2['default'].Children.count(this.props.children);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps, nextContext) {
    var valueLink = this.getValueLink(newProps);
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (valueLink.value) {
      this.setState({ selectedIndex: this._getSelectedIndex(newProps) });
    }

    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var children = _props.children;
    var contentContainerStyle = _props.contentContainerStyle;
    var initialSelectedIndex = _props.initialSelectedIndex;
    var inkBarStyle = _props.inkBarStyle;
    var style = _props.style;
    var tabItemContainerStyle = _props.tabItemContainerStyle;
    var tabTemplate = _props.tabTemplate;

    var other = _objectWithoutProperties(_props, ['children', 'contentContainerStyle', 'initialSelectedIndex', 'inkBarStyle', 'style', 'tabItemContainerStyle', 'tabTemplate']);

    var themeVariables = this.state.muiTheme.tabs;
    var styles = {
      tabItemContainer: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: 48,
        backgroundColor: themeVariables.backgroundColor,
        whiteSpace: 'nowrap',
        display: 'table'
      }
    };

    var valueLink = this.getValueLink(this.props);
    var tabValue = valueLink.value;
    var tabContent = [];

    var width = 100 / this.getTabCount() + '%';

    var left = 'calc(' + width + '*' + this.state.selectedIndex + ')';

    var tabs = _react2['default'].Children.map(children, function (tab, index) {
      if (tab.type.displayName === 'Tab') {
        if (!tab.props.value && tabValue && true) {
          console.error('Tabs value prop has been passed, but Tab ' + index + ' does not have a value prop. Needs value if Tabs is going' + ' to be a controlled component.');
        }

        tabContent.push(tab.props.children ? _react2['default'].createElement(tabTemplate, {
          key: index,
          selected: _this._getSelected(tab, index)
        }, tab.props.children) : undefined);

        return _react2['default'].cloneElement(tab, {
          key: index,
          selected: _this._getSelected(tab, index),
          tabIndex: index,
          width: width,
          onTouchTap: _this._handleTabTouchTap
        });
      } else {
        var type = tab.type.displayName || tab.type;
        console.error('Tabs only accepts Tab Components as children. Found ' + type + ' as child number ' + (index + 1) + ' of Tabs');
      }
    }, this);

    var inkBar = this.state.selectedIndex !== -1 ? _react2['default'].createElement(_inkBar2['default'], {
      left: left,
      width: width,
      style: inkBarStyle }) : null;

    var inkBarContainerWidth = tabItemContainerStyle ? tabItemContainerStyle.width : '100%';

    return _react2['default'].createElement(
      'div',
      _extends({}, other, {
        style: this.prepareStyles(style) }),
      _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(styles.tabItemContainer, tabItemContainerStyle) },
        tabs
      ),
      _react2['default'].createElement(
        'div',
        { style: { width: inkBarContainerWidth } },
        inkBar
      ),
      _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(contentContainerStyle) },
        tabContent
      )
    );
  },

  _getSelectedIndex: function _getSelectedIndex(props) {
    var valueLink = this.getValueLink(props);
    var selectedIndex = -1;

    _react2['default'].Children.forEach(props.children, function (tab, index) {
      if (valueLink.value === tab.props.value) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  },

  _handleTabTouchTap: function _handleTabTouchTap(value, e, tab) {
    var valueLink = this.getValueLink(this.props);
    var tabIndex = tab.props.tabIndex;

    if (valueLink.value && valueLink.value !== value || this.state.selectedIndex !== tabIndex) {
      valueLink.requestChange(value, e, tab);
    }

    this.setState({ selectedIndex: tabIndex });
    tab.props.onActive(tab);
  },

  _getSelected: function _getSelected(tab, index) {
    var valueLink = this.getValueLink(this.props);
    return valueLink.value ? valueLink.value === tab.props.value : this.state.selectedIndex === index;
  }

});

exports['default'] = Tabs;
module.exports = exports['default'];