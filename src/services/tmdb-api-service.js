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

  async getAllMoviesOnSearch(query, page = 1) {
    const res = await this.getResource(`/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`)
    return res
  }

  async createGuestSession() {
    const res = await this.getResource('/authentication/guest_session/new')
    return res
  }

  async addRating(guestSessionId, movieId, movieRate) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGZhYWFkZTRmMDg5MzgwYTM2MmEzYzQ5ZjM0MmE1NCIsInN1YiI6IjY1ZWVlYTIwMTNhZjVmMDE3YzVhZThlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-OwQe0-fQ2epras97V_MfFw-jpQyu5uMhxSQBgzKoqY',
      },
      body: `{"value":${movieRate}}`,
    }
    const res = await fetch(`${this.apiBaseUrl}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, options)

    if (!res.ok) {
      throw new Error(`No fetch request! Status: ${res.status}`)
    }

    const body = await res.json()
    return body
  }

  async getRatedMovies(guestSessionId, page = 1) {
    const res = await this.getResource(
      `/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`
    )
    return res
  }

  async getMovieGenres() {
    const res = await this.getResource('/genre/movie/list?language=en')
    return res
  }
}
