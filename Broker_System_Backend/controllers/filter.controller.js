
const Property = require("../models/property.model");
const Category = require("../models/category.model");

const filterPreferences = async (req, res) => {
    try {
        const { 
            type, minSize, maxSize, 
            minPrice, maxPrice, 
            minBedRoom, maxBedRoom, 
            minBathRoom, maxBathRoom 
        } = req.query;

        
        const parseNum = (val) => (val ? Number(val) : undefined);
        const parsedMinSize = parseNum(minSize);
        const parsedMaxSize = parseNum(maxSize);
        const parsedMinPrice = parseNum(minPrice);
        const parsedMaxPrice = parseNum(maxPrice);
        const parsedMinBedRoom = parseNum(minBedRoom);
        const parsedMaxBedRoom = parseNum(maxBedRoom);
        const parsedMinBathRoom = parseNum(minBathRoom);
        const parsedMaxBathRoom = parseNum(maxBathRoom);

        let query = {};

        // Ensure values are numbers for filtering
        const houseSizes = (await Property.distinct("houseSize")).map(Number);
        const rentalPrices = (await Property.distinct("rentalPrice")).map(Number);
        const bedRooms = (await Property.distinct("numberOfBedRooms")).map(Number);
        const bathRooms = (await Property.distinct("numberOfBathRooms")).map(Number);

        console.log("Query Params:", req.query);
        console.log("Available House Sizes:", houseSizes);
        console.log("Available Rental Prices:", rentalPrices);
        console.log("Available Bed Rooms:", bedRooms);
        console.log("Available Bath Rooms:", bathRooms);

        // ✅ Find category ID for filtering by type
        // if (type) {
        //     const category = await Category.findOne({ name: type }).select("_id");
        //     if (!category) {
        //         return res.status(404).json({ success: false, message: `Category '${type}' not found` });
        //     }
        //     query.categoryId = category._id;
        // }

        
        if (parsedMinSize || parsedMaxSize) {
            const validSizes = houseSizes.filter(size => 
                (!parsedMinSize || size >= parsedMinSize) && 
                (!parsedMaxSize || size <= parsedMaxSize)
            );
            if (!validSizes.length) {
                return res.status(404).json({ success: false, message: "No properties found within the selected size range" });
            }
            query.houseSize = { $in: validSizes };
        }

        
        if (parsedMinPrice || parsedMaxPrice) {
            const validPrices = rentalPrices.filter(price => 
                (!parsedMinPrice || price >= parsedMinPrice) && 
                (!parsedMaxPrice || price <= parsedMaxPrice)
            );
            if (!validPrices.length) {
                return res.status(404).json({ success: false, message: "No properties found within the selected price range" });
            }
            query.rentalPrice = { $in: validPrices };
        }

        
        if (parsedMinBedRoom || parsedMaxBedRoom) {
            const validBedRooms = bedRooms.filter(bed => 
                (!parsedMinBedRoom || bed >= parsedMinBedRoom) && 
                (!parsedMaxBedRoom || bed <= parsedMaxBedRoom)
            );
            if (!validBedRooms.length) {
                return res.status(404).json({ success: false, message: "No properties found with the selected bedroom count" });
            }
            query.numberOfBedRooms = { $in: validBedRooms };
        }

        
        if (parsedMinBathRoom || parsedMaxBathRoom) {
            const validBathRooms = bathRooms.filter(bath => 
                (!parsedMinBathRoom || bath >= parsedMinBathRoom) && 
                (!parsedMaxBathRoom || bath <= parsedMaxBathRoom)
            );
            if (!validBathRooms.length) {
                return res.status(404).json({ success: false, message: "No properties found with the selected bathroom count" });
            }
            query.numberOfBathRooms = { $in: validBathRooms };
        }

        
        // console.log("Final Query:", query);
        const properties = await Property.find(query).populate({
            path: 'addressId',
            select: 'city subcity district locality streetNumber postalCode streetName region subregion',
          }).populate({
            path: 'categoryId',
            select: 'type residentialTypeUnit amenities',
          })
                  
            // .populate("categoryId")
            // .populate("addressId")
            // .populate("ownerId");

        
        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties,
            availableHouseSizes: houseSizes,
            availableRentalPrices: rentalPrices,
            availableBedRooms: bedRooms,
            availableBathRooms: bathRooms
        });

    } catch (error) {
        console.error("Error filtering properties:", error);
        res.status(404).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = { filterPreferences };
