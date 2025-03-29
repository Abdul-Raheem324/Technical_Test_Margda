import { useEffect, useState } from 'react';
import AccountsList from './Components/AccountList'
import Form from './Components/Form'
import axios from 'axios';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts");
      setAccounts(response.data.accounts);
      setLoading(false); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);


  return (
   <div>
     <Form fetchAccounts={fetchAccounts}/>
     <AccountsList accounts={accounts} loading={loading} />
    </div>
  )
}

export default App
