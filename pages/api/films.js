export default async function handler(req, res) {
    const response = await fetch(`https://swapi.dev/api/films`)
    const data = await response.json()

    res.status(200).json(data)
}