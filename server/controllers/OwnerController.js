const Owner = require("../models/Owner");
const Boarding = require("../models/Boarding");
exports.getInfo = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await Owner.findOne({ email });

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
exports.getInfoOwner = async (req, res) => {
    try {
        const { id } = req.params;

        const findOwner = await Owner.findOne({ _id: id });


        if (!findOwner) {
            return res.status(404).json({ success: false, message: 'Owner not found', code: 404 });
        } else {
            res.status(200).json({ success: true, data: findOwner });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message, code: 500 });
    }
}

exports.saveOwner = async (req, res) => {
    try {
        const { email, name, avatar } = req.body;

        const owner = await Owner.findOne({ email: email });
        if (owner) {
            return res.status(400).json({ success: false, message: "Owner already exists", code: 400 });
        } else {
            const newOwner = new Owner({
                email: email,
                name: name,
                avatar: avatar,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });

            await newOwner.save();

            res.status(201).json({ success: true, data: newOwner });
        }




    } catch (error) {
        res.status(500).json({ success: false, message: error.message, code: 500 });
    }
}

exports.editOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const { birth, phone, from, description } = req.body;

        const owner = await Owner.findOne({ _id: id });
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found", code: 404 });
        } else {
            if (birth) {
                owner.birth = birth;
            }
            if (phone) {
                owner.phone = phone;
            }
            if (from) {
                owner.from = from;
            }
            if (description) {
                owner.description = description;
            }

            owner.updatedAt = Date.now();

            await owner.save();

            res.status(200).json({ success: true, data: owner });
        }


    } catch (error) {
        res.status(500).json({ success: false, message: error.message, code: 500 });
    }
}
