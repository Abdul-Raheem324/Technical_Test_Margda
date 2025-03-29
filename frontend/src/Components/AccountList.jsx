const AccountsList = ({ accounts, loading }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-6 text-teal-400">
        Accounts List
      </h1>

      {loading && (
        <div className="flex items-center justify-center space-x-3 text-teal-300">
          <span className="text-xl animate-spin border-4 border-teal-500 rounded-full w-6 h-6"></span>
          <span>Loading...</span>
        </div>
      )}

      {!loading && accounts.length > 0 ? (
        <table className="w-full max-w-4xl border-collapse border border-teal-500 rounded-lg shadow-lg bg-gray-700">
          <thead>
            <tr className="bg-teal-500 text-gray-900 text-xl font-semibold">
              <th className="border p-4">Account ID</th>
              <th className="border p-4">Introducer ID</th>
              <th className="border p-4">Beneficiary ID</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.accountId} className="hover:bg-gray-600">
                <td className="border p-4 text-center">{acc.accountId}</td>
                <td className="border p-4 text-center">
                  {acc.introducerId || "N/A"}
                </td>
                <td className="border p-4 text-center">
                  {acc.beneficiaryId || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <p className="text-teal-300 text-lg font-medium mt-6">
            No accounts found. Please add some accounts!
          </p>
        )
      )}
    </div>
  );
};

export default AccountsList;
