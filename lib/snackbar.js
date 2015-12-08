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

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _mixinsClickAwayable = require('./mixins/click-awayable');

var _mixinsClickAwayable2 = _interopRequireDefault(_mixinsClickAwayable);

var _flatButton = require('./flat-button');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _mixinsContextPure = require('./mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var _mixinsStyleResizable = require('./mixins/style-resizable');

var _mixinsStyleResizable2 = _interopRequireDefault(_mixinsStyleResizable);

var Snackbar = _react2['default'].createClass({
  displayName: 'Snackbar',

  mixins: [_mixinsStylePropable2['default'], _mixinsStyleResizable2['default'], _mixinsClickAwayable2['default'], _mixinsContextPure2['default']],

  manuallyBindClickAway: true,

  // ID of the active timer.
  _autoHideTimerId: undefined,

  _oneAtTheTimeTimerId: undefined,

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      openOnMount: false
    };
  },

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      var theme = muiTheme.snackbar;
      var spacing = muiTheme.rawTheme.spacing;

      return {
        textColor: theme.textColor,
        backgroundColor: theme.backgroundColor,
        desktopGutter: spacing.desktopGutter,
        desktopSubheaderHeight: spacing.desktopSubheaderHeight,
        actionColor: theme.actionColor
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [_flatButton2['default']];
    }
  },

  propTypes: {
    action: _react2['default'].PropTypes.string,
    autoHideDuration: _react2['default'].PropTypes.number,
    bodyStyle: _react2['default'].PropTypes.object,
    message: _react2['default'].PropTypes.node.isRequired,
    onActionTouchTap: _react2['default'].PropTypes.func,
    onDismiss: _react2['default'].PropTypes.func,
    onShow: _react2['default'].PropTypes.func,
    openOnMount: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
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
      open: this.props.openOnMount,
      message: this.props.message,
      action: this.props.action,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var _this = this;

    //to update theme inside state whenever a new theme is passed down
    //from the parent / owner using context
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (this.state.open && (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      this.setState({
        open: false
      });

      clearTimeout(this._oneAtTheTimeTimerId);
      this._oneAtTheTimeTimerId = setTimeout(function () {
        if (_this.isMounted()) {
          _this.setState({
            message: nextProps.message,
            action: nextProps.action,
            open: true
          });
        }
      }, 400);
    } else {
      this.setState({
        message: nextProps.message,
        action: nextProps.action
      });
    }
  },

  componentDidMount: function componentDidMount() {
    if (this.props.openOnMount) {
      this._setAutoHideTimer();
      this._bindClickAway();
    }
  },

  componentClickAway: function componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        setTimeout(function () {
          if (_this2.isMounted()) {
            _this2._bindClickAway();
          }
        }, 400);
      } else {
        clearTimeout(this._autoHideTimerId);
        this._unbindClickAway();
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._autoHideTimerId);
    this._unbindClickAway();
  },

  getStyles: function getStyles() {
    var _constructor$getRelevantContextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var textColor = _constructor$getRelevantContextKeys.textColor;
    var backgroundColor = _constructor$getRelevantContextKeys.backgroundColor;
    var desktopGutter = _constructor$getRelevantContextKeys.desktopGutter;
    var desktopSubheaderHeight = _constructor$getRelevantContextKeys.desktopSubheaderHeight;
    var actionColor = _constructor$getRelevantContextKeys.actionColor;

    var isSmall = this.state.deviceSize === this.constructor.Sizes.SMALL;

    var styles = {
      root: {
        position: 'fixed',
        left: 0,
        display: 'flex',
        right: 0,
        bottom: 0,
        zIndex: 10,
        visibility: 'hidden',
        transform: 'translate3d(0, ' + desktopSubheaderHeight + 'px, 0)',
        transition: _stylesTransitions2['default'].easeOut('400ms', 'transform') + ',' + _stylesTransitions2['default'].easeOut('400ms', 'visibility')
      },
      rootWhenOpen: {
        visibility: 'visible',
        transform: 'translate3d(0, 0, 0)'
      },
      body: {
        backgroundColor: backgroundColor,
        padding: '0 ' + desktopGutter + 'px',
        height: desktopSubheaderHeight,
        lineHeight: desktopSubheaderHeight + 'px',
        borderRadius: isSmall ? 0 : 2,
        maxWidth: isSmall ? 'inherit' : 568,
        minWidth: isSmall ? 'inherit' : 288,
        flexGrow: isSmall ? 1 : 0,
        margin: 'auto'
      },
      content: {
        fontSize: 14,
        color: textColor,
        opacity: 0,
        transition: _stylesTransitions2['default'].easeOut('400ms', 'opacity')
      },
      contentWhenOpen: {
        opacity: 1,
        transition: _stylesTransitions2['default'].easeOut('500ms', 'opacity', '100ms')
      },
      action: {
        color: actionColor,
        float: 'right',
        marginTop: 6,
        marginRight: -16,
        marginLeft: desktopGutter,
        backgroundColor: 'transparent'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onActionTouchTap = _props.onActionTouchTap;
    var style = _props.style;
    var bodyStyle = _props.bodyStyle;

    var others = _objectWithoutProperties(_props, ['onActionTouchTap', 'style', 'bodyStyle']);

    var styles = this.getStyles();

    var _state = this.state;
    var open = _state.open;
    var action = _state.action;
    var message = _state.message;

    var rootStyles = open ? this.mergeStyles(styles.root, styles.rootWhenOpen, style) : this.mergeStyles(styles.root, style);

    var actionButton = undefined;
    if (action) {
      actionButton = _react2['default'].createElement(_flatButton2['default'], {
        style: styles.action,
        label: action,
        onTouchTap: onActionTouchTap });
    }

    var mergedBodyStyle = this.mergeStyles(styles.body, bodyStyle);

    var contentStyle = open ? this.mergeStyles(styles.content, styles.contentWhenOpen) : styles.content;

    return _react2['default'].createElement(
      'div',
      _extends({}, others, { style: rootStyles }),
      _react2['default'].createElement(
        'div',
        { style: mergedBodyStyle },
        _react2['default'].createElement(
          'div',
          { style: contentStyle },
          _react2['default'].createElement(
            'span',
            null,
            message
          ),
          actionButton
        )
      )
    );
  },

  show: function show() {
    this.setState({
      open: true
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  dismiss: function dismiss() {
    this.setState({
      open: false
    });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _setAutoHideTimer: function _setAutoHideTimer() {
    var _this3 = this;

    if (this.props.autoHideDuration > 0) {
      clearTimeout(this._autoHideTimerId);
      this._autoHideTimerId = setTimeout(function () {
        if (_this3.isMounted()) {
          _this3.dismiss();
        }
      }, this.props.autoHideDuration);
    }
  }

});

exports['default'] = Snackbar;
module.exports = exports['default'];