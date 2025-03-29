import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
    {
        accountId: { type: Number, unique: true, required: true },
        introducerId: { type: Number, default: null },
        beneficiaryId: { type: Number, default: null },
    }
)

const Account = mongoose.model("Account", accountSchema);
export default Account