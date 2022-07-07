"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);

const router = new (0, _express.Router)();

router.get('/:id', _AlunoController2.default.showId);
router.get('/', _AlunoController2.default.indexAll);

exports. default = router;
