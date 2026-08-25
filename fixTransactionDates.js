import "dotenv/config";
import mongoose from "mongoose";

const fixCreatedAt = async () => {
    try {
        if (!process.env.DATABASE) {
            throw new Error("DATABASE مش موجود");
        }

        await mongoose.connect(process.env.DATABASE);

        console.log("MongoDB Connected");
        console.log("Database:", mongoose.connection.name);

        // الوصول للـ collection مباشرة
        const collection = mongoose.connection.db.collection("transactions");

        // عدد الـ documents بدون createdAt
        const count = await collection.countDocuments({
            createdAt: { $exists: false },
            updatedAt: { $exists: true }
        });

        console.log(
            `Documents without createdAt: ${count}`
        );

        // التعديل مباشرة في MongoDB
        const result = await collection.updateMany(
            {
                createdAt: { $exists: false },
                updatedAt: { $exists: true }
            },
            [
                {
                    $set: {
                        createdAt: "$updatedAt"
                    }
                }
            ]
        );

        console.log(
            `Matched: ${result.matchedCount}`
        );

        console.log(
            `Modified: ${result.modifiedCount}`
        );

        await mongoose.disconnect();

        console.log("تم الانتهاء بنجاح");

    } catch (error) {
        console.error("❌ Error:", error);

        try {
            await mongoose.disconnect();
        } catch {}

        process.exit(1);
    }
};

fixCreatedAt();