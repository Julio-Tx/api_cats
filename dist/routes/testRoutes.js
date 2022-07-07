"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TestController = require('../controllers/TestController'); var _TestController2 = _interopRequireDefault(_TestController);

const router = new (0, _express.Router)();

router.get('/', _TestController2.default.index);

exports. default = router;
