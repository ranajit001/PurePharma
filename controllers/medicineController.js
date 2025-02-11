const Medicine = require('../models/medicine');

const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMedicine = async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const newMedicine = new Medicine({
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
        });

        const savedMedicine = await newMedicine.save();
        res.status(201).json(savedMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMedicine = async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        medicine.name = name || medicine.name;
        medicine.description = description || medicine.description;
        medicine.price = price || medicine.price;
        medicine.stock = stock || medicine.stock;
        medicine.category = category || medicine.category;
        medicine.imageUrl = imageUrl || medicine.imageUrl;

        const updatedMedicine = await medicine.save();
        res.json(updatedMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        await medicine.remove();
        res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMedicines, getMedicineById, createMedicine, updateMedicine, deleteMedicine };
