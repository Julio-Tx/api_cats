"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _CatController = require('../controllers/CatController'); var _CatController2 = _interopRequireDefault(_CatController);

const router = new (0, _express.Router)();

router.get('/', _CatController2.default.index);
router.post('/', _CatController2.default.store);
router.put('/:id', _CatController2.default.update);
router.get('/:id', _CatController2.default.show);
router.delete('/:id', _CatController2.default.delete);

exports. default = router;
