export default class TmdbApiService {
  constructor() {
    this.apiBaseUrl = 'https://api.themoviedb.org/3'
  }

  async getResource(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGZhYWFkZTRmMDg5MzgwYTM2MmEzYzQ5ZjM0MmE1NCIsInN1YiI6IjY1ZWVlYTIwMTNhZjVmMDE3YzVhZThlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-OwQe0-fQ2epras97V_MfFw-jpQyu5uMhxSQBgzKoqY',
      },
    }
    const res = await fetch(`${this.apiBaseUrl}${url}`, options)

    if (!res.ok) {
      throw new Error(`No fetch request! Status: ${res.status}`)
    }

    const body = await res.json()
    return body
  }

  async getAllMoviesOnSearch(query) {
    const res = await this.getResource(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    return res.results
  }
}
