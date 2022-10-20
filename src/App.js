import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  const fetchData = (parameter) => {
    axios
      .get(`https://itunes.apple.com/search?term=${parameter}&media=music`)
      .then((data) => {
        setResults(data.data.results);
      })
    .catch((err) => {
      console.log(err);
    })
  };

  const handleChange = (event) => {
    const value = event.target.value;
    !value ? setResults([]) : fetchData(value);
  };

  return (
    <section>
        <input
          id="parameter"
          type="text"
          onChange={handleChange}
          placeholder="Search"
        ></input>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      {results.length > 0 &&
        results.map((song, i) => (
          <div key={i} className="flex justify-start border-2 border-white-600 w-[80%]">
            <div className="flex flex-wrap w-[50%]">
              <h1>Artist:</h1>
              <p>{song.artistName}</p>
            </div>
            <div className="flex flex-wrap">
              <h1>Song:</h1>
              <p>{song.trackName}</p>
            </div>
          </div>
        ))}
    </section>
  );
}

export default App;
