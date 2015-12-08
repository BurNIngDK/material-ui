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

var _mixinsWindowListenable = require('./mixins/window-listenable');

var _mixinsWindowListenable2 = _interopRequireDefault(_mixinsWindowListenable);

var _utilsKeyCode = require('./utils/key-code');

var _utilsKeyCode2 = _interopRequireDefault(_utilsKeyCode);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _flatButton = require('./flat-button');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _renderToLayer = require('./render-to-layer');

var _renderToLayer2 = _interopRequireDefault(_renderToLayer);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var TransitionItem = _react2['default'].createClass({
  displayName: 'TransitionItem',

  mixins: [_mixinsStylePropable2['default']],

  propTypes: {
    children: _react2['default'].PropTypes.node,
    style: _react2['default'].PropTypes.object
  },

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

  getInitialState: function getInitialState() {
    return {
      style: {},
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  componentWillEnter: function componentWillEnter(callback) {
    this.componentWillAppear(callback);
  },

  componentWillAppear: function componentWillAppear(callback) {
    var spacing = this.state.muiTheme.rawTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)'
      }
    });

    setTimeout(callback, 450); // matches transition duration
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this = this;

    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }
    });

    setTimeout(function () {
      if (_this.isMounted()) callback();
    }, 450); // matches transition duration
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var children = _props.children;

    var other = _objectWithoutProperties(_props, ['style', 'children']);

    return _react2['default'].createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(this.state.style, style) }),
      children
    );
  }
});

var DialogInline = _react2['default'].createClass({
  displayName: 'DialogInline',

  mixins: [_mixinsWindowListenable2['default'], _mixinsStylePropable2['default']],

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
    actionFocus: _react2['default'].PropTypes.string,
    actions: _react2['default'].PropTypes.array,
    autoDetectWindowHeight: _react2['default'].PropTypes.bool,
    autoScrollBodyContent: _react2['default'].PropTypes.bool,
    bodyStyle: _react2['default'].PropTypes.object,
    children: _react2['default'].PropTypes.node,
    contentClassName: _react2['default'].PropTypes.string,
    contentStyle: _react2['default'].PropTypes.object,
    modal: _react2['default'].PropTypes.bool,
    onRequestClose: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool.isRequired,
    repositionOnUpdate: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    title: _react2['default'].PropTypes.node,
    titleStyle: _react2['default'].PropTypes.object
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
    resize: '_handleResize'
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      actions: [],
      repositionOnUpdate: true,
      open: null
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  componentDidMount: function componentDidMount() {
    this._positionDialog();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._positionDialog();
  },

  getStyles: function getStyles() {
    var spacing = this.state.muiTheme.rawTheme.spacing;

    var main = {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      zIndex: 10,
      top: 0,
      left: -10000,
      width: '100%',
      height: '100%',
      transition: _stylesTransitions2['default'].easeOut('0ms', 'left', '450ms')
    };

    var content = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: _stylesTransitions2['default'].easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: 10
    };

    var body = {
      padding: spacing.desktopGutter,
      overflowY: this.props.autoScrollBodyContent ? 'auto' : 'hidden',
      overflowX: 'hidden'
    };

    var gutter = spacing.desktopGutter + 'px ';
    var title = {
      margin: 0,
      padding: gutter + gutter + '0 ' + gutter,
      color: this.state.muiTheme.rawTheme.palette.textColor,
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: '400'
    };

    if (this.props.open) {
      main = this.mergeStyles(main, {
        left: 0,
        transition: _stylesTransitions2['default'].easeOut('0ms', 'left', '0ms')
      });
    }

    return {
      main: this.mergeStyles(main, this.props.style),
      content: this.mergeStyles(content, this.props.contentStyle),
      paper: {
        background: this.state.muiTheme.rawTheme.palette.canvasColor
      },
      body: this.mergeStyles(body, this.props.bodyStyle),
      title: this.mergeStyles(title, this.props.titleStyle)
    };
  },

  render: function render() {
    var styles = this.getStyles();
    var actions = this._getActionsContainer(this.props.actions);
    var title = undefined;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ? _react2['default'].createElement(
        'h3',
        { style: this.prepareStyles(styles.title) },
        this.props.title
      ) : this.props.title;
    }

    return _react2['default'].createElement(
      'div',
      { ref: 'container', style: this.prepareStyles(styles.main) },
      _react2['default'].createElement(
        _reactAddonsTransitionGroup2['default'],
        { component: 'div', ref: 'dialogWindow',
          transitionAppear: true, transitionAppearTimeout: 450,
          transitionEnter: true, transitionEnterTimeout: 450 },
        this.props.open && _react2['default'].createElement(
          TransitionItem,
          {
            className: this.props.contentClassName,
            style: styles.content },
          _react2['default'].createElement(
            _paper2['default'],
            {
              style: styles.paper,
              zDepth: 4 },
            title,
            _react2['default'].createElement(
              'div',
              { ref: 'dialogContent', style: this.prepareStyles(styles.body) },
              this.props.children
            ),
            actions
          )
        )
      ),
      _react2['default'].createElement(_overlay2['default'], {
        show: this.props.open,
        onTouchTap: this._handleOverlayTouchTap })
    );
  },

  _getAction: function _getAction(actionJSON, key) {
    var _this2 = this;

    var props = {
      key: key,
      secondary: true,
      onClick: actionJSON.onClick,
      onTouchTap: function onTouchTap() {
        if (actionJSON.onTouchTap) {
          actionJSON.onTouchTap.call(undefined);
        }
        if (!(actionJSON.onClick || actionJSON.onTouchTap)) {
          _this2._requestClose(true);
        }
      },
      label: actionJSON.text,
      style: {
        marginRight: 8
      }
    };

    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }
    if (actionJSON.id) {
      props.id = actionJSON.id;
    }

    return _react2['default'].createElement(_flatButton2['default'], props);
  },

  _getActionsContainer: function _getActionsContainer(actions) {
    var actionContainer = undefined;
    var actionObjects = [];
    var actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right'
    };

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        var currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!_react2['default'].isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        actionObjects.push(currentAction);
      }

      actionContainer = _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(actionStyle) },
        actionObjects
      );
    }

    return actionContainer;
  },

  _positionDialog: function _positionDialog() {
    if (!this.props.open) {
      return;
    }

    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var container = _reactDom2['default'].findDOMNode(this);
    var dialogWindow = _reactDom2['default'].findDOMNode(this.refs.dialogWindow);
    var dialogContent = _reactDom2['default'].findDOMNode(this.refs.dialogContent);
    var minPaddingTop = 16;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    dialogContent.style.height = '';

    var dialogWindowHeight = dialogWindow.offsetHeight;
    var paddingTop = (clientHeight - dialogWindowHeight) / 2 - 64;
    if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }

    // Force a height if the dialog is taller than clientHeight
    if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
      var styles = this.getStyles();
      var maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + 64);

      if (this.props.title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
      if (this.props.actions.length) maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;

      dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
    }
  },

  _requestClose: function _requestClose(buttonClicked) {

    if (!buttonClicked && this.props.modal) {
      return;
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(!!buttonClicked);
    }
  },

  _handleOverlayTouchTap: function _handleOverlayTouchTap() {
    this._requestClose(false);
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(event) {
    if (event.keyCode === _utilsKeyCode2['default'].ESC) {
      this._requestClose(false);
    }
  },

  _handleResize: function _handleResize() {
    if (this.props.open) {
      this._positionDialog();
    }
  }

});

var Dialog = _react2['default'].createClass({
  displayName: 'Dialog',

  propTypes: {
    actionFocus: _react2['default'].PropTypes.string,
    actions: _react2['default'].PropTypes.array,
    autoDetectWindowHeight: _react2['default'].PropTypes.bool,
    autoScrollBodyContent: _react2['default'].PropTypes.bool,
    bodyStyle: _react2['default'].PropTypes.object,
    contentClassName: _react2['default'].PropTypes.string,
    contentStyle: _react2['default'].PropTypes.object,
    defaultOpen: _react2['default'].PropTypes.bool,
    modal: _react2['default'].PropTypes.bool,
    onDismiss: _react2['default'].PropTypes.func,
    onRequestClose: _react2['default'].PropTypes.func,
    onShow: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool,
    openImmediately: _react2['default'].PropTypes.bool,
    repositionOnUpdate: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    title: _react2['default'].PropTypes.node,
    titleStyle: _react2['default'].PropTypes.object
  },

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

  getInitialState: function getInitialState() {
    if (true) {
      this._testDeprecations();
    }

    var open = this.props.open;

    if (open === null) {
      open = this.props.openImmediately || this.props.defaultOpen;
    }

    return {
      open: open,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      open: null,
      defaultOpen: false,
      modal: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (true) {
      this._testDeprecations();
    }
    if (nextProps.open !== this.props.open) {
      if (nextProps.open && !this.state.open) {
        this._show();
      } else if (!nextProps.open && this.state.open) {
        this._dismiss();
      }
    }
  },

  render: function render() {
    return _react2['default'].createElement(_renderToLayer2['default'], { render: this.renderLayer, open: true, useLayerForClickAway: false });
  },

  renderLayer: function renderLayer() {
    return _react2['default'].createElement(DialogInline, _extends({}, this.props, { onRequestClose: this.props.onRequestClose, open: this.state.open }));
  },

  _testDeprecations: function _testDeprecations() {
    true ? (0, _warning2['default'])(!this.props.hasOwnProperty('openImmediately'), 'openImmediately has been deprecated in favor of defaultOpen') : undefined;

    true ? (0, _warning2['default'])(!(typeof this.props.onShow === 'function'), 'onShow will be removed in favor of explicitly setting open') : undefined;

    true ? (0, _warning2['default'])(!(typeof this.props.onDismiss === 'function'), 'onDismiss will be removed in favor of explicitly setting open and can be replaced by onRequestClose') : undefined;
  },

  show: function show() {
    true ? (0, _warning2['default'])(false, 'show has been deprecated in favor of explicitly setting the open property.') : undefined;

    this._show();
  },

  _onShow: function _onShow() {
    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  _show: function _show() {
    this.setState({
      open: true
    }, this._onShow);
  },

  dismiss: function dismiss() {
    true ? (0, _warning2['default'])(false, 'dismiss has been deprecated in favor of explicitly setting the open property.') : undefined;

    this._dismiss();
  },

  _onDismiss: function _onDismiss() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _dismiss: function _dismiss() {
    this.setState({
      open: false
    }, this._onDismiss);
  },

  isOpen: function isOpen() {
    return this.state.openImmediately;
  }

});

exports['default'] = Dialog;
module.exports = exports['default'];