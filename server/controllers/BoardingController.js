const Boarding = require("../models/Boarding");
const Owner = require("../models/Owner");

exports.getListBoarding = async (req, res) => {
    try {
        const { type, district, city, priceFrom, priceTo, orderByCreated, orderByUpdated, ownerId } = req.query;

        // Create a filter object to build the query conditions
        const filter = {};

        if (type) {
            if (["ROOMMATE", "ALONE"].includes(type)) {
                filter.type = type;
            } else {
                return res.status(400).json({ error: "Invalid type value" });
            }
        }

        if (district) {
            filter.district = district;
        }

        if (city) {
            filter.city = city;
        }

        if (priceFrom || priceTo) {
            filter.price = {};

            if (priceFrom) {
                filter.price.$gte = parseFloat(priceFrom);
            }

            if (priceTo) {
                filter.price.$lte = parseFloat(priceTo);
            }
        }
        if (ownerId) {
            filter.owner = ownerId;
        } 
        const sort = {};

        if (orderByCreated) {
            sort.createdAt = orderByCreated === "asc" ? 1 : -1;
        }

        if (orderByUpdated) {
            sort.updatedAt = orderByUpdated === "asc" ? 1 : -1;
        }

    
        const boardings = await Boarding.find(filter)
            .populate('owner')
            .sort(sort);

        res.json({ success: true, data: boardings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBoarding = async (req, res) => {
    try {
        const id = req.params.id;

        const boarding = await Boarding.findOne({ _id: id }).populate('owner');

        if (!boarding) {
            return res.status(404).json({ error: 'Boarding record not found' });
        }
        else {
            return res.json({ success: true, data: boarding });
        }


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.registerBoarding = async (req, res) => {
    try {
        const { ownerId, name, image, type, district, city, address, description, price } = req.body;
        const owner = await Owner.findOne({ _id: ownerId });

        if (!owner) {
            res.status(404).json({ error: 'Owner not found' });
            return;
        }

        const newBoarding = new Boarding({
            owner: owner,
            name: name,
            image: image,
            type: type,
            district: district,
            city: city,
            address: address,
            description: description,
            price: price,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        await newBoarding.save();
        res.status(201).json({ success: true, data: newBoarding });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editBoarding = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, type, district, city, description, price } = req.body;

        const boarding = await Boarding.findOne({ _id: id });

        if (!boarding) {
            res.status(404).json({ error: "Boarding not found" });
            return;
        }

        if (name) { boarding.name = name; }
        if (image) { boarding.image = image; }
        if (type) { boarding.type = type; }
        if (district) { boarding.district = district }
        if (city) { boarding.city = city }
        if (description) { boarding.description = description; }
        if (price) { boarding.price = price }
        await boarding.save();
        res.json({ success: true, data: boarding });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.softDeleteBoarding = async (req, res) => {
    try {
        const { id } = req.params;
        const boarding = await Boarding.findOne({ _id: id });

        if (!boarding) {
            res.status(404).json({ error: "Boarding not found" });
            return;
        }

        boarding.deletedAt = Date.now();

        await boarding.save();
        res.json({ success: true, data: boarding });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.restoreBoarding = async (req, res) => {
    try {
        const { id } = req.params;
        const boarding = await Boarding.findOne({ _id: id });

        if (!boarding) {
            res.status(404).json({ error: "Boarding not found" });
            return;
        }

        boarding.deletedAt = null;

        await boarding.save();
        res.json({ success: true, data: boarding });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};