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

var _stylesTypography = require('./styles/typography');

var _stylesTypography2 = _interopRequireDefault(_stylesTypography);

var _iconButton = require('./icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _svgIconsNavigationMenu = require('./svg-icons/navigation/menu');

var _svgIconsNavigationMenu2 = _interopRequireDefault(_svgIconsNavigationMenu);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _utilsPropTypes = require('./utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var AppBar = _react2['default'].createClass({
  displayName: 'AppBar',

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
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    iconClassNameLeft: _react2['default'].PropTypes.string,
    iconClassNameRight: _react2['default'].PropTypes.string,
    iconElementLeft: _react2['default'].PropTypes.element,
    iconElementRight: _react2['default'].PropTypes.element,
    iconStyleRight: _react2['default'].PropTypes.object,
    onLeftIconButtonTouchTap: _react2['default'].PropTypes.func,
    onRightIconButtonTouchTap: _react2['default'].PropTypes.func,
    onTitleTouchTap: _react2['default'].PropTypes.func,
    showMenuIconButton: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    title: _react2['default'].PropTypes.node,
    titleStyle: _react2['default'].PropTypes.object,
    zDepth: _utilsPropTypes2['default'].zDepth
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
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    };
  },

  componentDidMount: function componentDidMount() {
    if (true) {
      if (this.props.iconElementLeft && this.props.iconClassNameLeft) {
        console.warn('Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' + 'defined. Please use one or the other.');
      }

      if (this.props.iconElementRight && this.props.iconClassNameRight) {
        console.warn('Properties iconClassNameRight and iconElementRight cannot be simultaneously ' + 'defined. Please use one or the other.');
      }
    }
  },

  getStyles: function getStyles() {
    var spacing = this.state.muiTheme.rawTheme.spacing;
    var themeVariables = this.state.muiTheme.appBar;
    var iconButtonSize = this.state.muiTheme.button.iconButtonSize;
    var flatButtonSize = 36;
    var styles = {
      root: {
        position: 'relative',
        zIndex: 5,
        width: '100%',
        display: 'flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: _stylesTypography2['default'].fontWeightNormal,
        color: themeVariables.textColor,
        lineHeight: themeVariables.height + 'px'
      },
      mainElement: {
        boxFlex: 1,
        flex: '1'
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor
        }
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var title = _props.title;
    var titleStyle = _props.titleStyle;
    var iconStyleRight = _props.iconStyleRight;
    var showMenuIconButton = _props.showMenuIconButton;
    var iconElementLeft = _props.iconElementLeft;
    var iconElementRight = _props.iconElementRight;
    var iconClassNameLeft = _props.iconClassNameLeft;
    var iconClassNameRight = _props.iconClassNameRight;
    var className = _props.className;
    var style = _props.style;
    var zDepth = _props.zDepth;
    var children = _props.children;

    var other = _objectWithoutProperties(_props, ['title', 'titleStyle', 'iconStyleRight', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'className', 'style', 'zDepth', 'children']);

    var menuElementLeft = undefined;
    var menuElementRight = undefined;
    var styles = this.getStyles();
    var iconRightStyle = this.mergeStyles(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto'
    }, iconStyleRight);
    var titleElement = undefined;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ? _react2['default'].createElement(
        'h1',
        { onTouchTap: this._onTitleTouchTap, style: this.prepareStyles(styles.title, styles.mainElement, titleStyle) },
        title
      ) : _react2['default'].createElement(
        'div',
        { onTouchTap: this._onTitleTouchTap, style: this.prepareStyles(styles.title, styles.mainElement, titleStyle) },
        title
      );
    }

    if (showMenuIconButton) {
      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = _react2['default'].cloneElement(iconElementLeft, {
              iconStyle: this.mergeStyles(styles.iconButton.iconStyle)
            });
            break;
        }

        menuElementLeft = _react2['default'].createElement(
          'div',
          { style: this.prepareStyles(styles.iconButton.style) },
          iconElementLeft
        );
      } else {
        var child = iconClassNameLeft ? '' : _react2['default'].createElement(_svgIconsNavigationMenu2['default'], { style: this.mergeStyles(styles.iconButton.iconStyle) });
        menuElementLeft = _react2['default'].createElement(
          _iconButton2['default'],
          {
            style: this.mergeStyles(styles.iconButton.style),
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
            iconClassName: iconClassNameLeft,
            onTouchTap: this._onLeftIconButtonTouchTap },
          child
        );
      }
    }

    if (iconElementRight) {
      switch (iconElementRight.type.displayName) {
        case 'IconMenu':
        case 'IconButton':
          iconElementRight = _react2['default'].cloneElement(iconElementRight, {
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle)
          });
          break;

        case 'FlatButton':
          iconElementRight = _react2['default'].cloneElement(iconElementRight, {
            style: this.mergeStyles(styles.flatButton, iconElementRight.props.style)
          });
          break;
      }

      menuElementRight = _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(iconRightStyle) },
        iconElementRight
      );
    } else if (iconClassNameRight) {
      menuElementRight = _react2['default'].createElement(_iconButton2['default'], {
        style: iconRightStyle,
        iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
        iconClassName: iconClassNameRight,
        onTouchTap: this._onRightIconButtonTouchTap });
    }

    return _react2['default'].createElement(
      _paper2['default'],
      _extends({}, other, {
        rounded: false,
        className: className,
        style: this.mergeStyles(styles.root, style),
        zDepth: zDepth }),
      menuElementLeft,
      titleElement,
      menuElementRight,
      children
    );
  },

  _onLeftIconButtonTouchTap: function _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap: function _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  },

  _onTitleTouchTap: function _onTitleTouchTap(event) {
    if (this.props.onTitleTouchTap) {
      this.props.onTitleTouchTap(event);
    }
  }

});

exports['default'] = AppBar;
module.exports = exports['default'];