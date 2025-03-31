import express from "express";
import connectDB from "./db/dbconfig.js";
import Account from "./models/accountModel.js";
import cors from "cors";

import dotenv from "dotenv";
import { getBeneficiaryid } from "./utils.js";
dotenv.config();
connectDB();

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.post("/api/add-account", async (req, res) => {
  try {
    let { accountId, introducerId } = req.body;
    // Check if the accountId already exists
    const existingAccount = await Account.findOne({ accountId });
    if (existingAccount) {
      return res.status(400).json({
        message: `Account with ID ${accountId} already exists.`,
      });
    }

    // Check if any accounts exist in the database
    const totalAccounts = await Account.countDocuments({});

    // Case 1: No accounts in the database , Create first account with no introducer
    if (totalAccounts === 0) {
      console.log("Creating first account...");
      let newAccount = await Account.create({
        accountId,
        introducerId: 0, // No introducer for the first account
        beneficiaryId: null, // No beneficiary for the first account
      });

      return res.status(200).json({
        message: "First account created successfully",
        account: newAccount,
      });
    }
    // case 2 : if there are multiple accounts then there should be an introducer
    const introducer = await Account.findOne({ accountId: introducerId });
    if (!introducer) {
      return res
        .status(400)
        .json({ message: `No user exists with this introducer Id` });
    }
    let beneficiaryId = await getBeneficiaryid(introducerId);
    // if(!beneficiaryId) {
    //     return res.status(400).json({message : "Beneficiary errro"})
    // }

    let newAccount = await Account.create({
      accountId,
      introducerId,
      beneficiaryId,
    });
    res.status(200).json({
      message: "Account created successfully",
      account: newAccount,
    });
  } catch (error) {
    console.log("Error in creating account", error);
    res.status(500).json({ message: `Error in creating account` });
  }
});

app.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await Account.find().sort({ account_id: 1 });
    res.status(200).json({
      message: "Accounts fetched",
      accounts: accounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching accounts!" });
  }
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
