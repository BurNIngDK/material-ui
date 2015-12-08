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

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsKeyCode = require('./utils/key-code');

var _utilsKeyCode2 = _interopRequireDefault(_utilsKeyCode);

var _svgIconsNavigationArrowDropDown = require('./svg-icons/navigation/arrow-drop-down');

var _svgIconsNavigationArrowDropDown2 = _interopRequireDefault(_svgIconsNavigationArrowDropDown);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _menuMenu = require('./menu/menu');

var _menuMenu2 = _interopRequireDefault(_menuMenu);

var _clearfix = require('./clearfix');

var _clearfix2 = _interopRequireDefault(_clearfix);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var DropDownMenu = _react2['default'].createClass({
  displayName: 'DropDownMenu',

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

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    autoWidth: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string,
    disabled: _react2['default'].PropTypes.bool,
    displayMember: _react2['default'].PropTypes.string,
    iconStyle: _react2['default'].PropTypes.object,
    labelMember: _react2['default'].PropTypes.string,
    labelStyle: _react2['default'].PropTypes.object,
    menuItemStyle: _react2['default'].PropTypes.object,
    menuItems: _react2['default'].PropTypes.array.isRequired,
    onChange: _react2['default'].PropTypes.func,
    openImmediately: _react2['default'].PropTypes.bool,
    selectedIndex: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object,
    underlineStyle: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.any,
    valueLink: _react2['default'].PropTypes.object,
    valueMember: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoWidth: true,
      disabled: false,
      valueMember: 'payload',
      displayMember: 'text',
      openImmediately: false,
      labelMember: 'text'
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openImmediately,
      selectedIndex: this._isControlled() ? null : this.props.selectedIndex || 0,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      return;
    } else if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
  },

  getStyles: function getStyles() {
    var disabled = this.props.disabled;

    var zIndex = 5; // As AppBar
    var spacing = this.state.muiTheme.rawTheme.spacing;
    var accentColor = this.state.muiTheme.dropDownMenu.accentColor;
    var backgroundColor = this.state.muiTheme.menu.backgroundColor;
    var styles = {
      root: {
        transition: _stylesTransitions2['default'].easeOut(),
        position: 'relative',
        display: 'inline-block',
        height: spacing.desktopSubheaderHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        outline: 'none'
      },
      control: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'static',
        height: '100%'
      },
      controlBg: {
        transition: _stylesTransitions2['default'].easeOut(),
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        opacity: 0
      },
      icon: {
        position: 'absolute',
        top: (spacing.desktopToolbarHeight - 24) / 2,
        right: spacing.desktopGutterLess,
        fill: this.state.muiTheme.dropDownMenu.accentColor
      },
      label: {
        transition: _stylesTransitions2['default'].easeOut(),
        lineHeight: spacing.desktopToolbarHeight + 'px',
        position: 'absolute',
        paddingLeft: spacing.desktopGutter,
        top: 0,
        opacity: 1,
        color: disabled ? this.state.muiTheme.rawTheme.palette.disabledColor : this.state.muiTheme.rawTheme.palette.textColor
      },
      underline: {
        borderTop: 'solid 1px ' + accentColor,
        margin: '-1px ' + spacing.desktopGutter + 'px'
      },
      menu: {
        zIndex: zIndex + 1
      },
      menuItem: {
        paddingRight: spacing.iconSize + spacing.desktopGutterLess + spacing.desktopGutterMini,
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight + 'px',
        whiteSpace: 'nowrap'
      },
      rootWhenOpen: {
        opacity: 1
      },
      labelWhenOpen: {
        opacity: 0,
        top: spacing.desktopToolbarHeight / 2
      },
      overlay: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: zIndex
      }
    };

    return styles;
  },

  getInputNode: function getInputNode() {
    var root = this.refs.root;
    var item = this.props.menuItems[this.state.selectedIndex];
    if (item) {
      root.value = item[this.props.displayMember];
    }

    return root;
  },

  render: function render() {
    var _props = this.props;
    var autoWidth = _props.autoWidth;
    var className = _props.className;
    var style = _props.style;
    var displayMember = _props.displayMember;
    var valueMember = _props.valueMember;
    var valueLink = _props.valueLink;
    var labelStyle = _props.labelStyle;
    var iconStyle = _props.iconStyle;
    var underlineStyle = _props.underlineStyle;
    var menuItemStyle = _props.menuItemStyle;
    var labelMember = _props.labelMember;

    var other = _objectWithoutProperties(_props, ['autoWidth', 'className', 'style', 'displayMember', 'valueMember', 'valueLink', 'labelStyle', 'iconStyle', 'underlineStyle', 'menuItemStyle', 'labelMember']);

    var styles = this.getStyles();
    var selectedIndex = this._isControlled() ? null : this.state.selectedIndex;
    var displayValue = '';
    if (selectedIndex) {
      if (true) {
        console.assert(!!this.props.menuItems[selectedIndex], 'SelectedIndex of ' + selectedIndex + ' does not exist in menuItems.');
      }
    } else if (valueMember && this._isControlled()) {
      var value = this.props.hasOwnProperty('value') ? this.props.value : valueLink.value;
      if (value !== null && value !== undefined) {
        for (var i = 0; i < this.props.menuItems.length; i++) {
          if (this.props.menuItems[i][valueMember] === value) {
            selectedIndex = i;
          }
        }
      }
    }

    var selectedItem = this.props.menuItems[selectedIndex];
    if (selectedItem) {
      displayValue = selectedItem[labelMember];
    }

    var menuItems = this.props.menuItems.map(function (item) {
      item.text = item[displayMember];
      item.payload = item[valueMember];
      return item;
    });

    return _react2['default'].createElement(
      'div',
      _extends({}, other, {
        ref: 'root',
        onKeyDown: this._onKeyDown,
        className: className,
        style: this.prepareStyles(styles.root, this.state.open && styles.rootWhenOpen, style) }),
      _react2['default'].createElement(
        _clearfix2['default'],
        { style: this.mergeStyles(styles.control), onTouchTap: this._onControlClick },
        _react2['default'].createElement(_paper2['default'], { style: this.mergeStyles(styles.controlBg), zDepth: 0 }),
        _react2['default'].createElement(
          'div',
          { style: this.prepareStyles(styles.label, this.state.open && styles.labelWhenOpen, labelStyle) },
          displayValue
        ),
        _react2['default'].createElement(_svgIconsNavigationArrowDropDown2['default'], { style: this.mergeStyles(styles.icon, iconStyle) }),
        _react2['default'].createElement('div', { style: this.prepareStyles(styles.underline, underlineStyle) })
      ),
      _react2['default'].createElement(_menuMenu2['default'], {
        ref: 'menuItems',
        autoWidth: autoWidth,
        selectedIndex: selectedIndex,
        menuItems: menuItems,
        style: styles.menu,
        menuItemStyle: this.mergeStyles(styles.menuItem, menuItemStyle),
        hideable: true,
        visible: this.state.open,
        onRequestClose: this._onMenuRequestClose,
        onItemTap: this._onMenuItemClick }),
      this.state.open && _react2['default'].createElement('div', { style: this.prepareStyles(styles.overlay), onTouchTap: this._handleOverlayTouchTap })
    );
  },

  _setWidth: function _setWidth() {
    var el = _reactDom2['default'].findDOMNode(this);
    var menuItemsDom = _reactDom2['default'].findDOMNode(this.refs.menuItems);
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
      el.style.width = menuItemsDom.offsetWidth + 'px';
    }
  },

  _setSelectedIndex: function _setSelectedIndex(props) {
    var selectedIndex = props.selectedIndex;

    if (true && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({ selectedIndex: selectedIndex > -1 ? selectedIndex : 0 });
  },

  _onControlClick: function _onControlClick() {
    if (!this.props.disabled) {
      this.setState({ open: !this.state.open });
    }
  },

  _onKeyDown: function _onKeyDown(e) {
    switch (e.which) {
      case _utilsKeyCode2['default'].UP:
        if (!this.state.open) {
          this._selectPreviousItem();
        } else {
          if (e.altKey) {
            this.setState({ open: false });
          }
        }
        break;
      case _utilsKeyCode2['default'].DOWN:
        if (!this.state.open) {
          if (e.altKey) {
            this.setState({ open: true });
          } else {
            this._selectNextItem();
          }
        }
        break;
      case _utilsKeyCode2['default'].ENTER:
      case _utilsKeyCode2['default'].SPACE:
        this.setState({ open: true });
        break;
      default:
        return; //important
    }
    e.preventDefault();
  },

  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    var selectedItem = this.props.menuItems[key];
    if (selectedItem) {
      e.target.value = selectedItem[this.props.valueMember];
    }

    if (this.props.onChange && (this.state.selectedIndex !== key || e.target.value !== this.props.value)) {
      if (this.props.valueLink) {
        this.props.valueLink.requestChange(e.target.value);
      } else {
        this.props.onChange(e, key, payload);
      }
    }

    this.setState({
      selectedIndex: key,
      value: e.target.value,
      open: false
    });
  },

  _onMenuRequestClose: function _onMenuRequestClose() {
    this.setState({ open: false });
  },

  _selectPreviousItem: function _selectPreviousItem() {
    this.setState({ selectedIndex: Math.max(this.state.selectedIndex - 1, 0) });
  },

  _selectNextItem: function _selectNextItem() {
    this.setState({ selectedIndex: Math.min(this.state.selectedIndex + 1, this.props.menuItems.length - 1) });
  },

  _handleOverlayTouchTap: function _handleOverlayTouchTap() {
    this.setState({
      open: false
    });
  },

  _isControlled: function _isControlled() {
    return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
  }

});

exports['default'] = DropDownMenu;
module.exports = exports['default'];