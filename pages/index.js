import { useState } from 'react'
import Image from 'next/image';
import styles from '../styles/Home.module.css'

function Home(props) {
  const starWarsFilms = props.data.results.map(result => ({...result, isFavourite: false}))
  const [searchInputValue, setSearchInputValue] = useState('')
  const [films, setFilms] = useState(starWarsFilms)

  const toggleFavourite = (id) => {
    setFilms((prevState) => {
      // get copy of previous state and assign to a new variable
      // so we can mutate the new value
      const updatedFilms = [...prevState]
      // find the object we want to update by using the index passed into the function
      const filmIndex = updatedFilms.findIndex(film => film.episode_id === id)
      // toggle the isFavourite property by using !
      updatedFilms[filmIndex] = { ...updatedFilms[filmIndex], isFavourite: !updatedFilms[filmIndex].isFavourite }
      // return value will be new new state for setFilms
      return updatedFilms
    })
  }

  return (
    <div className={styles.container}>
      Star Wars Films coming soon!
      <label>Search</label>
      <input type="text" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} />
      {films.filter(result => result.title.toLowerCase()
        .includes(searchInputValue))
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        // if comparison values are equal, return 0
        // if a is true then move to start of array
        // if a is false then move to back
        .sort((a, b) => (a.isFavourite === b.isFavourite) ? 0 : a.isFavourite ? -1 : 1)
        .map(result => {
          return (
            <p key={result.episode_id}>{result.title}
            <span onClick={() => toggleFavourite(result.episode_id)}>
              {result.isFavourite ? <Image src="/fave.svg" height={18} width={18} alt="purple heart icon" /> : <Image src="/fave-false.svg" height={18} width={18} alt="heart icon with purple outline" />}
            </span>
          </p>)}
          )
        }
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
