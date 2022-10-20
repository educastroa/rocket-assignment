import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState } from 'react';

function App() {
  const [results, setResults] = useState([])
  const [input, setInput] = useState()


  const fetchData = (parameter) => {

    axios.get(`https://itunes.apple.com/search?term=${parameter}&media=music`)
      .then(data => {
        setResults(data.data.results)
      })
  }

  const handleChange = (event) => {
    const name = event.target.id
    const value = event.target.value
    setInput((...values) => ({ ...values, [name]: value }))
    fetchData(value)
  }


  return (
    <section>
      <form onSubmit={(e) => {
        e.preventDefault()
        fetchData(input)
      }}
      >
        <input
          id="parameter"
          type="text"
          onChange={handleChange}
          placeholder="Search"
        >
        </input>
        <button
          type='submit'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      {results.length > 0 && results.map(song => 
      <div>
        <p>{song.artistName}</p>
        <p>{song.trackName}</p>
        </div>)}
    </section>
  );
}

export default App;
