const { Router } = require('express');
const controller = require('../controllers/controller');

const router = Router();

router.route('/')
    .get(controller.index_get)
    .post(controller.index_post);

router.get('/about', controller.about_get);
router.get('/:customListName', controller.customListName_get);
router.post('/delete', controller.delete_post);

module.exports = router;