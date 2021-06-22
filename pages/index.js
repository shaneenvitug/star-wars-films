import { useState } from 'react'
import styles from '../styles/Home.module.css'

function Home(props) {

  const [searchInputValue, setSearchInputValue] = useState('');
  console.log(props)
  return (
    <div className={styles.container}>
      Star Wars Films coming soon!
      <label>Search</label>
      <input type="text" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} />
      {searchInputValue && props.data.results.filter(result => result.title.includes(searchInputValue)).map(result => <p key={result.episode_id}>{result.title}</p>)}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://swapi.dev/api/films/`)
    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default Home;
