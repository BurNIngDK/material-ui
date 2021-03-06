'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _getMuiTheme2 = require('./getMuiTheme');

var _getMuiTheme3 = _interopRequireDefault(_getMuiTheme2);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getMuiTheme: function getMuiTheme(baseTheme, muiTheme) {
    "production" !== "production" ? (0, _warning2.default)(false, 'ThemeManager is deprecated. please import getMuiTheme' + ' directly from "material-ui/lib/styles/getMuiTheme"') : undefined;
    return (0, _getMuiTheme3.default)(baseTheme, muiTheme);
  },
  modifyRawThemeSpacing: function modifyRawThemeSpacing(muiTheme, spacing) {
    "production" !== "production" ? (0, _warning2.default)(false, 'modifyRawThemeSpacing is deprecated. please use getMuiTheme ' + ' to modify your theme directly. http://www.material-ui.com/#/customization/themes') : undefined;
    return (0, _getMuiTheme3.default)((0, _reactAddonsUpdate2.default)(muiTheme.baseTheme, { spacing: { $set: spacing } }));
  },
  modifyRawThemePalette: function modifyRawThemePalette(muiTheme, palette) {
    "production" !== "production" ? (0, _warning2.default)(false, 'modifyRawThemePalette is deprecated. please use getMuiTheme ' + ' to modify your theme directly. http://www.material-ui.com/#/customization/themes') : undefined;
    var newPalette = (0, _lodash2.default)(muiTheme.baseTheme.palette, palette);
    return (0, _getMuiTheme3.default)((0, _reactAddonsUpdate2.default)(muiTheme.baseTheme, { palette: { $set: newPalette } }));
  },
  modifyRawThemeFontFamily: function modifyRawThemeFontFamily(muiTheme, fontFamily) {
    "production" !== "production" ? (0, _warning2.default)(false, 'modifyRawThemeFontFamily is deprecated. please use getMuiTheme ' + ' to modify your theme directly. http://www.material-ui.com/#/customization/themes') : undefined;
    return (0, _getMuiTheme3.default)((0, _reactAddonsUpdate2.default)(muiTheme.baseTheme, { fontFamily: { $set: fontFamily } }));
  }
};
module.exports = exports['default'];