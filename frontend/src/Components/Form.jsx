import { useState } from "react";
import axios from "axios";

const Form = ({ fetchAccounts }) => {
  const [accountId, setAccountId] = useState("");
  const [introducerId, setIntroducerId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accountId || !introducerId) return alert("All fields are required");

    try {
      await axios.post("/api/add-account", {
        accountId: parseInt(accountId),
        introducerId: parseInt(introducerId),
      });
      setAccountId("");
      setIntroducerId("");
      fetchAccounts(); 
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        alert(err.response.data.message || "Something went wrong");
      } 
      else {
        console.error(err);
        alert(res.message);
      }
      
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-4xl font-extrabold text-center mb-4 text-teal-400">
          Add Account
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg mb-2">Account ID:</label>
            <input
              type="number"
              className="p-2 rounded-md text-gray-200 border focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder="Enter Account ID"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg mb-2">Introducer ID:</label>
            <input
              type="number"
              className="p-2 rounded-md text-gray-200 border focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={introducerId}
              onChange={(e) => setIntroducerId(e.target.value)}
              placeholder="Enter Introducer ID"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-teal-500 text-lg font-bold text-black rounded-md hover:bg-teal-400 transition duration-300 hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
      <p className="text-teal-500 mt-2">Scroll to see list of accounts</p>
    </div>
  );
};

export default Form;