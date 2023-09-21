const User = require("../models/User");

exports.getInfo = async (req, res) => {
    const { email } = req.query;
    // Find the user by email
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ success: true, data: user });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getInfoUser = async (req, res) => {
    try {
        const id = req.params.id;
        const findUser = await User.findOne({ _id: id });
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ success: true, data: findUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.saveUser = async (req, res) => {
    try {
        const { email, name, avatar, role } = req.body

        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ error: 'User already exists' }); // Return a 400 status for "Bad Request".
        } else {
            const newUser = new User({
                email: email,
                name: name,
                avatar: avatar,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })

            await newUser.save()

            return res.json({ success: true, data: newUser });
        }


    } catch (error) {
        return res.status(500).json({ error: error.message }); // Return a 500 status for "Internal Server Error".
    }
}

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params.id to get the user ID
        const { birth, from, description, expected_district, expected_city, expected_cost } = req.body

        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' }); // Return a 404 status for "Not Found".
        } else {
            if (birth) { user.birth = birth }
            if (from) { user.from = from }
            if (description) { user.description = description }
            if (expected_district) { user.expected_district = expected_district }
            if (expected_city) { user.expected_city = expected_city }
            if (expected_cost) { user.expected_cost = expected_cost }

            user.updatedAt = Date.now()

            await user.save()

            return res.json({ success: true, data: user });
        }


    } catch (error) {
        return res.status(500).json({ error: error.message }); // Return a 500 status for "Internal Server Error".
    }
}
