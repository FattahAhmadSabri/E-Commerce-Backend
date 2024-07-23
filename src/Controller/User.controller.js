const UserService = require('../Service/User.service');

const getUserProfile = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        

        const token = authorizationHeader.split(" ");
        console.log('JWT Token:', token);

      

        const user = await UserService.getUserProfileByToken(token);
        console.log('User:', user);
        return res.status(200).send(user);
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        return res.status(500).send({ error: error.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await UserService.getAllUser();
        return res.status(200).send(users);
    } catch (error) {
        console.error('Error in getAllUser:', error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { getUserProfile, getAllUser };
