import { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [wallet, setWallet] = useState<{ balance: string, currency: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/e_wallet/wallet/", {
      withCredentials: true  // Important for session-authenticated APIs
    })
      .then((res) => {
        setWallet(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch wallet. Are you logged in?");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wallet Info</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {wallet ? (
        <div>
          <p><strong>Balance:</strong> {wallet.balance}</p>
          <p><strong>Currency:</strong> {wallet.currency}</p>
          {/* Add other fields as needed */}
        </div>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}

export default Test;
