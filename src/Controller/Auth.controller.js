const userService = require('../Service/User.service');
const jwtProvider = require('../Config/jwtProvider');
const bcrypt = require("bcrypt");
const cartService = require('../Service/Cart.service');


const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);
        console.log(user)
        await cartService.createCart(user);
        return res.status(200).send({ jwt, message: "Register success" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: `Email not found: ${email}` });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send({ message: "Incorrect password" });
        }
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({ jwt, message: "Login success" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = { register, login };
