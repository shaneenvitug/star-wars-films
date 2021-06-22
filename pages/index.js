import { useState } from 'react'
import styles from '../styles/Home.module.css'

function Home(props) {
  const starWarsFilms = props.data.results.map(result => ({...result, isFavourite: false}))
  const [searchInputValue, setSearchInputValue] = useState('')
  const [films, setFilms] = useState(starWarsFilms)

  const toggleFavourite = (id) => {
    console.log(id)
    setFilms((prevState) => {
      // This was the fix below babs
      // The reference to the old array instead of spreading the old array into a new array
      const updatedFilms = [...prevState]
      const filmIndex = updatedFilms.findIndex(film => film.episode_id === id)
      updatedFilms[filmIndex] = { ...updatedFilms[filmIndex], isFavourite: !updatedFilms[filmIndex].isFavourite }
      console.log("updatedFilms", updatedFilms)
      return updatedFilms
    })
  }

  console.log("films", films)

  return (
    <div className={styles.container}>
      Star Wars Films coming soon!
      <label>Search</label>
      <input type="text" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} />
      {films.filter(result => result.title.toLowerCase()
        .includes(searchInputValue))
        .map(result => {
          console.log("result.isFavourite", result.isFavourite)
          return (
            <p key={result.episode_id}>{result.title}
            <span onClick={() => toggleFavourite(result.episode_id)}>
              {console.log(`result.title is ${result.title}, and result.isFavourite is ${result.isFavourite}`)}
              {result.isFavourite ? 'Favourite' : 'Not Favourite'}
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
