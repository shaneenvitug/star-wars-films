import styles from '../styles/Home.module.css'

function Home(props) {
  console.log(props)
  return (
    <div className={styles.container}>
    Star Wars Films coming soon!
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
