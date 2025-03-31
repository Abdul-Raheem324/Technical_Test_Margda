import Account from "./models/accountModel.js";

export const getBeneficiaryid = async (introducerId) => {
  // Case 1: No introducer for the first account or invalid introducer
  if (!introducerId || introducerId === null || introducerId === 0) {
    console.log("No introducer - First account or self-introduction.");
    return 0; // No beneficiary for the first account
  }

  // Count number of accounts introduced by the introducer
  const introducedAccounts = await Account.countDocuments({ introducerId });
  console.log(introducedAccounts + 1)
  // Case 2: If introducedAccounts count is odd then Beneficiary is the introducer
  if ((introducedAccounts + 1) % 2 === 1) {
    console.log(
      `Odd number of accounts introduced by ${introducerId}, beneficiary is introducer.`
    );
    return introducerId;
  }

  // Case 3: If introducedAccounts count is even then Beneficiary is introducer's introducer
  const introducer = await Account.findOne({ accountId: introducerId });

  // If introducer does not exist
  if (!introducer || introducer.introducerId === 0) {
    console.log(`Introducer with accountId ${introducerId} not found.`);
    return introducerId;
  }

  // console.log(`Found introducer and BeneficiaryId is ${introducer.beneficiaryId}`);
  const introducerOfIntroducer = await Account.findOne({
    accountId: introducer.introducerId,
  });

  if (!introducerOfIntroducer) {
    console.log(
      `Introducer's introducer not found, falling back to introducer ${introducerId}`
    );
    return introducerId; 
  }

  return introducerOfIntroducer.beneficiaryId || introducerId;
};
