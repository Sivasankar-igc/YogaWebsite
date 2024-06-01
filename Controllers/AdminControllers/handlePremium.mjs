import premiumCol from "../../Models/premiumModel.mjs";

export const addPremiumSection = async (req, res) => {
    try {
        console.log("hello")
        const { premiumName, premiumPeriod, premiumPrice, discount, backgroundImage, premiumFeatures } = req.body;
        const data = new premiumCol({
            premiumName: premiumName,
            premiumPeriod: {
                numericValue: premiumPeriod.numericValue,
                alphabetValue: premiumPeriod.alphabetValue
            },
            premiumPrice: premiumPrice,
            discount: discount,
            backgroundImage: backgroundImage,
            premiumFeatures: premiumFeatures
        })

        const response = await data.save();

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null });
    } catch (error) {
        console.error(`Server error : add premium error --> ${error}`)
        res.status(400).send("database error")
    }
}

export const managePremiumSection = async () => {
    try {
        const { oldPremiumName, updatedPremiumName, premiumPeriod, premiumPrice, discount, backgroundImage } = req.body;

        const response = await premiumCol.updateOne({ premiumName: oldPremiumName },
            {
                $set: {
                    premiumName: updatedPremiumName,
                    premiumPeriod: premiumPeriod,
                    premiumPrice: premiumPrice,
                    discount: discount,
                    backgroundImage: backgroundImage
                }
            }
        )

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`Server Error : manage premium error --> ${error}`)
        res.status(400).send("database error")
    }
}

export const removePremiumSection = async () => {
    try {
        const premiumName = req.params.premiumName;
        const response = await premiumCol.deleteOne({ premiumName: premiumName })

        response.deletedCount > 0 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`Server Error : remove premium error --> ${error}`)
        res.status(400).send("database error")
    }
}