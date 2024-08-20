const User = require('../models/User');
const { Client, Databases, Query } = require('appwrite');

// Configuração do cliente Appwrite
const client = new Client();

client
    .setEndpoint('https://appwrite.nsyncfdx.com')
    .setProject('665f06800039a70f5350');

const databases = new Databases(client);


// Atualização de usuário
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Recuperação de usuário
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualização de status de guia
const updateGuideStatus = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.guia = true;
        await user.save();

        res.status(200).json({ message: 'Guide status updated to true', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adicionar uma atividade aos favoritos pelo nome
const addFavoriteActivityByName = async (req, res) => {
    try {
        const { userId, activityName } = req.params;

        const response = await databases.listDocuments(
            '665f0758002313801977', 
            '66605b7200120a0c7efd', 
            [
                Query.equal('name', activityName)
            ]
        );

        if (response.total === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const activityDocumentId = response.documents[0].$id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.favoriteActivities.includes(activityDocumentId)) {
            user.favoriteActivities.push(activityDocumentId);
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remover favorito
const removeFavorite = async (req, res) => {
    try {
        const { userId, cardId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.favoriteCards = user.favoriteCards.filter(fav => fav.toString() !== cardId);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adicionar uma atividade a um guia
const addActivityToGuide = async (req, res) => {
    try {
        const { guideId, activityId } = req.body;

        const guide = await User.findById(guideId);
        if (!guide || !guide.guia) {
            return res.status(404).json({ error: 'Guide not found or not a guide' });
        }

        if (!guide.favoriteActivities.includes(activityId)) {
            guide.favoriteActivities.push(activityId);
            await guide.save();
        }

        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Recuperar atividades por guia
const getActivitiesByGuide = async (req, res) => {
    try {
        const { guideId } = req.params;

        const response = await databases.listDocuments(
            '665f0758002313801977',
            '66605b7200120a0c7efd',
            [
                Query.equal('guideId', guideId)
            ]
        );

        if (response.total === 0) {
            return res.status(404).json({ error: 'No activities found for this guide' });
        }

        res.status(200).json(response.documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    updateUser,
    getUser,
    addFavoriteActivityByName,
    removeFavorite,
    addActivityToGuide,
    getActivitiesByGuide,
    updateGuideStatus,
};
