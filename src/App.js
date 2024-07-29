import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  // Fetching crypto data from the API only once when the component is mounted
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': '1YMWFRIFgbdLp6KIAyqDbOQt7ZO1NkcjdUMs2qTPuxk=' // Replace with your actual API key
      }
    };

    fetch('https://openapiv1.coinstats.app/coins', options)
      .then(response => response.json())
      .then(data => {
        // Update this part to handle the new API structure
        if (data && Array.isArray(data.result)) {
          setCrypto(data.result); // Use data.result for setting state
        } else {
          console.error("Unexpected API response structure:", data);
        }
      })
      .catch(err => console.error("Error fetching data from API:", err));
  }, []);

  return (
    <div className="App">
      <h1>All Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => {
              // Ensure the filtering works correctly
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, id) => {
              return (
                <tr key={id}>
                  <td className="rank">{val.rank}</td>
                  <td className="logo">
                    <a href={val.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <img src={val.icon} alt="logo" width="30px" />
                    </a>
                    <p>{val.name}</p>
                  </td>
                  <td className="symbol">{val.symbol}</td>
                  <td>${val.marketCap}</td>
                  <td>${val.price.toFixed(2)}</td>
                  <td>{val.availableSupply}</td>
                  <td>{val.volume.toFixed(0)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
