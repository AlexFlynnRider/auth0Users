const express = require('express');
const { 
    updateUser, 
    getUser, 
    addFavoriteActivityByName, 
    removeFavorite, 
    addActivityToGuide, 
    getActivitiesByGuide,
    updateGuideStatus
} = require('../controllers/userController');

const router = express.Router();

router.put('/users/:id', updateUser);
router.get('/users/:id', getUser);
router.post('/users/:userId/favorites/add-by-name/:activityName', addFavoriteActivityByName); // Adiciona uma atividade aos favoritos pelo nome
router.post('/users/favorites/remove', removeFavorite);
router.post('/guides/activities/add', addActivityToGuide);
router.get('/guides/:guideId/activities', getActivitiesByGuide);
router.post('/users/:userId/update-guide-status', updateGuideStatus);

module.exports = router;
