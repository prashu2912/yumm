const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor'); // Renamed to avoid conflict
const multer = require('multer');
const path = require('path'); // Fix: Import path module

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.extname(file.originalname)); // Fix: Path module used here
    }
});

const upload = multer({ storage: storage });

// Add Firm Function
const addFirmFunction = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Ensure vendorId is available
        console.log("Vendor ID:", req.vendorId);

        // Find Vendor
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }


        // Ensure vendor.firm is initialized as an array (if it's missing or undefined)
        if (!Array.isArray(vendor.firm)) {
            console.log("Initializing vendor.firm as an empty array");
            vendor.firm = [];
        }

      console.log("Vendor Object before adding firm:", vendor);

        // Create Firm
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();
        console.log("Vendor Object after initialization:", vendor);
    
        vendor.firm.push(savedFirm);

        
        await vendor.save();

        return res.status(200).json({ message: "Firm added successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// Delete Firm By ID Function
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ message: "No firm found" }); // Corrected error message
        }

        return res.status(200).json({ message: "Firm deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Export Middleware Correctly
module.exports = { 
    addFirm: [upload.single('file'), addFirmFunction], // Ensure this matches the field name in the frontend ('file')
    deleteFirmById 
};
