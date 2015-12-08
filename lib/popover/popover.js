'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mixinsWindowListenable = require('../mixins/window-listenable');

var _mixinsWindowListenable2 = _interopRequireDefault(_mixinsWindowListenable);

var _renderToLayer = require('../render-to-layer');

var _renderToLayer2 = _interopRequireDefault(_renderToLayer);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _utilsPropTypes = require('../utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _paper = require('../paper');

var _paper2 = _interopRequireDefault(_paper);

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _stylesAutoPrefix = require('../styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

var Popover = _react2['default'].createClass({
  displayName: 'Popover',

  mixins: [_mixinsStylePropable2['default'], _mixinsWindowListenable2['default']],

  propTypes: {
    anchorEl: _react2['default'].PropTypes.object,
    anchorOrigin: _utilsPropTypes2['default'].origin,
    animated: _react2['default'].PropTypes.bool,
    autoCloseWhenOffScreen: _react2['default'].PropTypes.bool,
    canAutoPosition: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    onRequestClose: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    targetOrigin: _utilsPropTypes2['default'].origin,
    useLayerForClickAway: _react2['default'].PropTypes.bool,
    zDepth: _utilsPropTypes2['default'].zDepth
  },

  getDefaultProps: function getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      animated: true,
      autoCloseWhenOffScreen: true,
      canAutoPosition: true,
      onRequestClose: function onRequestClose() {},
      open: false,
      style: {},
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      useLayerForClickAway: true,
      zDepth: 1
    };
  },

  getInitialState: function getInitialState() {
    this.setPlacementThrottled = (0, _lodashThrottle2['default'])(this.setPlacement, 100);

    return {
      open: this.props.open,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
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

  windowListeners: {
    resize: 'setPlacementThrottled',
    scroll: 'setPlacementThrottled'
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var _this = this;

    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (this._isAnimating === true || nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.anchorEl = nextProps.anchorEl || this.props.anchorEl;
        this.setState({
          open: true,
          muiTheme: newMuiTheme
        }, function () {
          _this._animate(true);
        });
      } else {
        if (nextProps.animated) {
          this._animate(false);
          this._isAnimating = true;
          this._timeout = setTimeout(function () {
            if (_this.isMounted()) {
              _this._isAnimating = false;
              _this.setState({
                open: false,
                muiTheme: newMuiTheme
              });
            }
          }, 500);
        } else {
          this.setState({
            open: false,
            muiTheme: newMuiTheme
          });
        }
      }
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setPlacement();
  },

  render: function render() {
    return _react2['default'].createElement(_renderToLayer2['default'], {
      ref: 'layer',
      open: this.state.open,
      componentClickAway: this.componentClickAway,
      render: this.renderLayer });
  },

  renderLayer: function renderLayer() {
    var _props = this.props;
    var animated = _props.animated;
    var targetOrigin = _props.targetOrigin;
    var className = _props.className;
    var zDepth = _props.zDepth;

    var anchorEl = this.props.anchorEl || this.anchorEl;
    var anchor = this.getAnchorPosition(anchorEl);
    var horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

    var wrapperStyle = this.mergeAndPrefix({
      position: 'fixed',
      top: anchor.top,
      left: anchor.left,
      zIndex: this.state.muiTheme.zIndex.popover,
      opacity: 1,
      overflow: 'auto',
      maxHeight: '100%',
      transform: 'scale(0,0)',
      transformOrigin: horizontal + ' ' + targetOrigin.vertical,
      transition: animated ? _stylesTransitions2['default'].easeOut('500ms', ['transform', 'opacity']) : null
    }, this.props.style);

    var horizontalAnimation = {
      maxHeight: '100%',
      overflowY: 'auto',
      transform: 'scaleX(0)',
      opacity: 1,
      transition: animated ? _stylesTransitions2['default'].easeOut('250ms', ['transform', 'opacity']) : null,
      transformOrigin: horizontal + ' ' + targetOrigin.vertical
    };

    var verticalAnimation = {
      opacity: 1,
      transform: 'scaleY(0)',
      transformOrigin: horizontal + ' ' + targetOrigin.vertical,
      transition: animated ? _stylesTransitions2['default'].easeOut('500ms', ['transform', 'opacity']) : null
    };

    return _react2['default'].createElement(
      _paper2['default'],
      { style: wrapperStyle, zDepth: zDepth, className: className },
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { style: horizontalAnimation },
          _react2['default'].createElement(
            'div',
            { style: verticalAnimation },
            this.props.children
          )
        )
      )
    );
  },

  requestClose: function requestClose(reason) {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(reason);
    }
  },

  componentClickAway: function componentClickAway() {
    this.requestClose('clickAway');
  },

  _resizeAutoPosition: function _resizeAutoPosition() {
    this.setPlacement();
  },

  _animate: function _animate(open) {
    if (!this.refs.layer || !this.refs.layer.getLayer()) {
      return;
    }

    var el = this.refs.layer.getLayer().children[0];
    var value = '0';
    var inner = el.children[0];
    var innerInner = inner.children[0];
    var innerInnerInner = innerInner.children[0];
    var rootStyle = inner.style;
    var innerStyle = innerInner.style;

    if (open) {
      value = '1';
    }

    _stylesAutoPrefix2['default'].set(el.style, 'transform', 'scale(' + value + ',' + value + ')');
    _stylesAutoPrefix2['default'].set(innerInner.style, 'transform', 'scaleX(' + value + ')');
    _stylesAutoPrefix2['default'].set(innerInnerInner.style, 'transform', 'scaleY(' + value + ')');
    _stylesAutoPrefix2['default'].set(rootStyle, 'opacity', value);
    _stylesAutoPrefix2['default'].set(innerStyle, 'opacity', value);
    _stylesAutoPrefix2['default'].set(innerInnerInner.style, 'opacity', value);
    _stylesAutoPrefix2['default'].set(el.style, 'opacity', value);
  },

  getAnchorPosition: function getAnchorPosition(el) {
    if (!el) {
      el = _reactDom2['default'].findDOMNode(this);
    }

    var rect = el.getBoundingClientRect();
    var a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight
    };

    a.right = rect.right || a.left + a.width;
    a.bottom = rect.bottom || a.top + a.height;
    a.middle = a.left + (a.right - a.left) / 2;
    a.center = a.top + (a.bottom - a.top) / 2;

    return a;
  },

  getTargetPosition: function getTargetPosition(targetEl) {
    return {
      top: 0,
      center: targetEl.offsetHeight / 2,
      bottom: targetEl.offsetHeight,
      left: 0,
      middle: targetEl.offsetWidth / 2,
      right: targetEl.offsetWidth
    };
  },

  setPlacement: function setPlacement() {
    if (!this.state.open) {
      return;
    }

    var anchorEl = this.props.anchorEl || this.anchorEl;

    if (!this.refs.layer.getLayer()) {
      return;
    }

    var targetEl = this.refs.layer.getLayer().children[0];
    if (!targetEl) {
      return;
    }

    var _props2 = this.props;
    var targetOrigin = _props2.targetOrigin;
    var anchorOrigin = _props2.anchorOrigin;

    var anchor = this.getAnchorPosition(anchorEl);
    var target = this.getTargetPosition(targetEl);

    var targetPosition = {
      top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
      left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal]
    };

    if (this.props.autoCloseWhenOffScreen) {
      this.autoCloseWhenOffScreen(anchor);
    }

    if (this.props.canAutoPosition) {
      target = this.getTargetPosition(targetEl); // update as height may have changed
      targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
    }

    targetEl.style.top = targetPosition.top + 'px';
    targetEl.style.left = targetPosition.left + 'px';
  },

  autoCloseWhenOffScreen: function autoCloseWhenOffScreen(anchorPosition) {
    if (anchorPosition.top < 0 || anchorPosition.top > window.innerHeight || anchorPosition.left < 0 || anchorPosition.left > window.innerWith) {
      this.requestClose('offScreen');
    }
  },

  getOverlapMode: function getOverlapMode(anchor, target, median) {
    if ([anchor, target].indexOf(median) >= 0) return 'auto';
    if (anchor === target) return 'inclusive';
    return 'exclusive';
  },

  getPositions: function getPositions(anchor, target) {
    var a = (0, _utilsExtend2['default'])(anchor, {});
    var t = (0, _utilsExtend2['default'])(target, {});

    var positions = {
      x: ['left', 'right'].filter(function (p) {
        return p !== t.horizontal;
      }),
      y: ['top', 'bottom'].filter(function (p) {
        return p !== t.vertical;
      })
    };

    var overlap = {
      x: this.getOverlapMode(a.horizontal, t.horizontal, 'middle'),
      y: this.getOverlapMode(a.vertical, t.vertical, 'center')
    };

    positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
    positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

    if (overlap.y !== 'auto') {
      a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
      if (overlap.y === 'inclusive') {
        t.vertical = t.vertical;
      }
    }

    if (overlap.x !== 'auto') {
      a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
      if (overlap.y === 'inclusive') {
        t.horizontal = t.horizontal;
      }
    }

    return {
      positions: positions,
      anchorPos: a
    };
  },

  applyAutoPositionIfNeeded: function applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
    var _getPositions = this.getPositions(anchorOrigin, targetOrigin);

    var positions = _getPositions.positions;
    var anchorPos = _getPositions.anchorPos;

    if (targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
      var newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
      if (newTop + target.bottom <= window.innerHeight) targetPosition.top = Math.max(0, newTop);else {
        newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
        if (newTop + target.bottom <= window.innerHeight) targetPosition.top = Math.max(0, newTop);
      }
    }
    if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
      var newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
      if (newLeft + target.right <= window.innerWidth) targetPosition.left = Math.max(0, newLeft);else {
        newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
        if (newLeft + target.right <= window.innerWidth) targetPosition.left = Math.max(0, newLeft);
      }
    }
    return targetPosition;
  }

});

exports['default'] = Popover;
module.exports = exports['default'];