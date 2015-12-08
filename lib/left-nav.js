'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsBrowser = require('./utils/is-browser');

var _utilsIsBrowser2 = _interopRequireDefault(_utilsIsBrowser);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsKeyCode = require('./utils/key-code');

var _utilsKeyCode2 = _interopRequireDefault(_utilsKeyCode);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesAutoPrefix = require('./styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _mixinsWindowListenable = require('./mixins/window-listenable');

var _mixinsWindowListenable2 = _interopRequireDefault(_mixinsWindowListenable);

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _menuMenu = require('./menu/menu');

var _menuMenu2 = _interopRequireDefault(_menuMenu);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Modernizr = _utilsIsBrowser2['default'] ? require('./utils/modernizr.custom') : undefined;

var openNavEventHandler = null;

var LeftNav = _react2['default'].createClass({
  displayName: 'LeftNav',

  mixins: [_mixinsStylePropable2['default'], _mixinsWindowListenable2['default']],

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
    disableSwipeToOpen: _react2['default'].PropTypes.bool,
    docked: _react2['default'].PropTypes.bool,
    header: _react2['default'].PropTypes.element,
    menuItemClassName: _react2['default'].PropTypes.string,
    menuItemClassNameLink: _react2['default'].PropTypes.string,
    menuItemClassNameSubheader: _react2['default'].PropTypes.string,
    menuItems: _react2['default'].PropTypes.array,
    onChange: _react2['default'].PropTypes.func,
    onNavClose: _react2['default'].PropTypes.func,
    onNavOpen: _react2['default'].PropTypes.func,
    onRequestChange: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool,
    openRight: _react2['default'].PropTypes.bool,
    selectedIndex: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
  },

  windowListeners: {
    keyup: '_onWindowKeyUp',
    resize: '_onWindowResize'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disableSwipeToOpen: false,
      docked: true,
      open: null
    };
  },

  getInitialState: function getInitialState() {
    this._maybeSwiping = false;
    this._touchStartX = null;
    this._touchStartY = null;
    this._swipeStartX = null;

    this._testDeprecations();

    return {
      open: this.props.open !== null ? this.props.open : this.props.docked,
      swiping: null,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    var newState = { muiTheme: newMuiTheme };

    this._testDeprecations();

    // If docked is changed, change the open state for when uncontrolled.
    if (this.props.docked !== nextProps.docked) newState.open = nextProps.docked;

    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) newState.open = nextProps.open;

    this.setState(newState);
  },

  componentDidMount: function componentDidMount() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._disableSwipeHandling();
  },

  toggle: function toggle() {
    true ? (0, _warning2['default'])(false, 'using methods on left nav has been deprecated. Please refer to documentations.') : undefined;
    if (this.state.open) this.close();else this.open();
    return this;
  },

  close: function close() {
    true ? (0, _warning2['default'])(false, 'using methods on left nav has been deprecated. Please refer to documentations.') : undefined;
    this.setState({ open: false });
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open: function open() {
    true ? (0, _warning2['default'])(false, 'using methods on left nav has been deprecated. Please refer to documentations.') : undefined;
    this.setState({ open: true });
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getThemePalette: function getThemePalette() {
    return this.state.muiTheme.rawTheme.palette;
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.leftNav;
  },

  getStyles: function getStyles() {
    var x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());
    var styles = {
      root: {
        height: '100%',
        width: this.getTheme().width,
        position: 'fixed',
        zIndex: 10,
        left: _utilsIsBrowser2['default'] && Modernizr.csstransforms3d ? 0 : x,
        top: 0,
        transform: 'translate3d(' + x + 'px, 0, 0)',
        transition: !this.state.swiping && _stylesTransitions2['default'].easeOut(),
        backgroundColor: this.getTheme().color,
        overflow: 'hidden'
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        borderRadius: '0'
      },
      overlay: {
        pointerEvents: this.state.open ? 'auto' : 'none' },
      // Bypass mouse events when left nav is closing.
      menuItem: {
        height: this.state.muiTheme.rawTheme.spacing.desktopLeftNavMenuItemHeight,
        lineHeight: this.state.muiTheme.rawTheme.spacing.desktopLeftNavMenuItemHeight + 'px'
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0
      }
    };

    styles.menuItemLink = this.mergeStyles(styles.menuItem, {
      display: 'block',
      textDecoration: 'none',
      color: this.getThemePalette().textColor
    });
    styles.menuItemSubheader = this.mergeStyles(styles.menuItem, {
      overflow: 'hidden'
    });

    return styles;
  },

  render: function render() {
    var selectedIndex = this.props.selectedIndex;
    var overlay = undefined;

    var styles = this.getStyles();
    if (!this.props.docked) {
      overlay = _react2['default'].createElement(_overlay2['default'], {
        ref: 'overlay',
        show: this._shouldShow(),
        style: styles.overlay,
        transitionEnabled: !this.state.swiping,
        onTouchTap: this._onOverlayTouchTap });
    }
    var children = undefined;
    if (this.props.menuItems === undefined) {
      children = this.props.children;
    } else {
      children = _react2['default'].createElement(_menuMenu2['default'], {
        ref: 'menuItems',
        style: this.mergeStyles(styles.menu),
        zDepth: 0,
        menuItems: this.props.menuItems,
        menuItemStyle: this.mergeStyles(styles.menuItem),
        menuItemStyleLink: this.mergeStyles(styles.menuItemLink),
        menuItemStyleSubheader: this.mergeStyles(styles.menuItemSubheader),
        menuItemClassName: this.props.menuItemClassName,
        menuItemClassNameSubheader: this.props.menuItemClassNameSubheader,
        menuItemClassNameLink: this.props.menuItemClassNameLink,
        selectedIndex: selectedIndex,
        onItemTap: this._onMenuItemClick });
    }
    return _react2['default'].createElement(
      'div',
      { className: this.props.className },
      overlay,
      _react2['default'].createElement(
        _paper2['default'],
        {
          ref: 'clickAwayableElement',
          zDepth: 2,
          rounded: false,
          transitionEnabled: !this.state.swiping,
          style: this.mergeStyles(styles.root, this.props.openRight && styles.rootWhenOpenRight, this.props.style) },
        this.props.header,
        children
      )
    );
  },

  _testDeprecations: function _testDeprecations() {
    true ? (0, _warning2['default'])(!(typeof this.props.onNavClose === 'function'), 'onNavClose will be removed in favor of onRequestChange') : undefined;

    true ? (0, _warning2['default'])(!(typeof this.props.onNavOpen === 'function'), 'onNavOpen will be removed in favor of onRequestChange') : undefined;
  },

  _shouldShow: function _shouldShow() {
    return this.state.open || !!this.state.swiping; // component is swiping
  },

  _close: function _close(reason) {
    if (this.props.open === null) this.setState({ open: false });
    if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
    return this;
  },

  _open: function _open(reason) {
    if (this.props.open === null) this.setState({ open: true });
    if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
    return this;
  },

  _updateMenuHeight: function _updateMenuHeight() {
    if (this.props.header) {
      var menu = _reactDom2['default'].findDOMNode(this.refs.menuItems);
      if (menu) {
        var container = _reactDom2['default'].findDOMNode(this.refs.clickAwayableElement);
        var menuHeight = container.clientHeight - menu.offsetTop;
        menu.style.height = menuHeight + 'px';
      }
    }
  },

  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
    if (!this.props.docked) this._close('clickaway');
  },

  _onOverlayTouchTap: function _onOverlayTouchTap() {
    this._close('clickaway');
  },

  _onWindowKeyUp: function _onWindowKeyUp(e) {
    if (e.keyCode === _utilsKeyCode2['default'].ESC && !this.props.docked && this.state.open) {
      this._close('escape');
    }
  },

  _onWindowResize: function _onWindowResize() {
    this._updateMenuHeight();
  },

  _getMaxTranslateX: function _getMaxTranslateX() {
    return this.getTheme().width + 10;
  },

  _getTranslateMultiplier: function _getTranslateMultiplier() {
    return this.props.openRight ? 1 : -1;
  },

  _enableSwipeHandling: function _enableSwipeHandling() {
    if (!this.props.docked) {
      document.body.addEventListener('touchstart', this._onBodyTouchStart);
      if (!openNavEventHandler) {
        openNavEventHandler = this._onBodyTouchStart;
      }
    } else {
      this._disableSwipeHandling();
    }
  },

  _disableSwipeHandling: function _disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this._onBodyTouchStart);
    if (openNavEventHandler === this._onBodyTouchStart) {
      openNavEventHandler = null;
    }
  },

  _onBodyTouchStart: function _onBodyTouchStart(e) {

    var swipeAreaWidth = 30;

    var touchStartX = e.touches[0].pageX;
    var touchStartY = e.touches[0].pageY;

    // Open only if swiping from far left (or right) while closed
    if (!this.state.open) {
      if (this.props.openRight) {
        // If openRight is true calculate from the far right
        if (touchStartX < document.body.offsetWidth - swipeAreaWidth) return;
      } else {
        // If openRight is false calculate from the far left
        if (touchStartX > swipeAreaWidth) return;
      }
    }

    if (!this.state.open && (openNavEventHandler !== this._onBodyTouchStart || this.props.disableSwipeToOpen)) {
      return;
    }

    this._maybeSwiping = true;
    this._touchStartX = touchStartX;
    this._touchStartY = touchStartY;

    document.body.addEventListener('touchmove', this._onBodyTouchMove);
    document.body.addEventListener('touchend', this._onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this._onBodyTouchEnd);
  },

  _setPosition: function _setPosition(translateX) {
    var leftNav = _reactDom2['default'].findDOMNode(this.refs.clickAwayableElement);
    var transformCSS = 'translate3d(' + this._getTranslateMultiplier() * translateX + 'px, 0, 0)';
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
    _stylesAutoPrefix2['default'].set(leftNav.style, 'transform', transformCSS);
  },

  _getTranslateX: function _getTranslateX(currentX) {
    return Math.min(Math.max(this.state.swiping === 'closing' ? this._getTranslateMultiplier() * (currentX - this._swipeStartX) : this._getMaxTranslateX() - this._getTranslateMultiplier() * (this._swipeStartX - currentX), 0), this._getMaxTranslateX());
  },

  _onBodyTouchMove: function _onBodyTouchMove(e) {
    var currentX = e.touches[0].pageX;
    var currentY = e.touches[0].pageY;

    if (this.state.swiping) {
      e.preventDefault();
      this._setPosition(this._getTranslateX(currentX));
    } else if (this._maybeSwiping) {
      var dXAbs = Math.abs(currentX - this._touchStartX);
      var dYAbs = Math.abs(currentY - this._touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      var threshold = 10;

      if (dXAbs > threshold && dYAbs <= threshold) {
        this._swipeStartX = currentX;
        this.setState({
          swiping: this.state.open ? 'closing' : 'opening'
        });
        this._setPosition(this._getTranslateX(currentX));
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this._onBodyTouchEnd();
      }
    }
  },

  _onBodyTouchEnd: function _onBodyTouchEnd(e) {
    if (this.state.swiping) {
      var currentX = e.changedTouches[0].pageX;
      var translateRatio = this._getTranslateX(currentX) / this._getMaxTranslateX();

      this._maybeSwiping = false;
      var swiping = this.state.swiping;
      this.setState({
        swiping: null
      });

      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.5) {
        if (swiping === 'opening') {
          this._setPosition(this._getMaxTranslateX());
        } else {
          this._close('swipe');
        }
      } else {
        if (swiping === 'opening') {
          this._open('swipe');
        } else {
          this._setPosition(0);
        }
      }
    } else {
      this._maybeSwiping = false;
    }

    document.body.removeEventListener('touchmove', this._onBodyTouchMove);
    document.body.removeEventListener('touchend', this._onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this._onBodyTouchEnd);
  }

});

exports['default'] = LeftNav;
module.exports = exports['default'];