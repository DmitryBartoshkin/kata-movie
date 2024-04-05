import { Component } from 'react'
import { Flex, Spin } from 'antd'
import debounce from 'lodash.debounce'

import { NoData, IsError } from '../notifications'
import TmdbApiService from '../../services/tmdb-api-service'
import Movie from '../movie'
import Search from '../search'
import PaginationPages from '../pagination'
import './movies-list.css'

export default class MoviesList extends Component {
  TmdbApiService = new TmdbApiService()

  constructor(props) {
    super(props)
    this.state = {
      moviesData: [],
      isLoader: false,
      isNoData: false,
      isError: false,
      isPagination: false,
      msgError: '',
      totalPages: null,
      query: '',
      page: 1,
      moviesRaring: [],
    }
  }

  setRating = (movieId, rate) => {
    const { moviesRaring } = this.state
    moviesRaring.push({ id: movieId, rating: rate })

    this.setState({
      moviesRaring,
    })
  }

  getMoviesList = debounce((query, page) => {
    this.setState({ isLoader: true, isPagination: false })
    this.TmdbApiService.getAllMoviesOnSearch(query, page)
      .then((data) => {
        this.setState({
          moviesData: data.results,
          isLoader: false,
          isNoData: false,
          isPagination: true,
          totalPages: data.total_results,
          query,
          page,
        })

        if (data.results.length === 0) {
          this.setState({
            isNoData: true,
            isPagination: false,
          })
        }
      })
      .catch(this.onError)
  }, 800)

  onError = (err) => {
    this.setState({
      isError: true,
      isLoader: false,
      isPagination: false,
      msgError: err.message,
    })
  }

  render() {
    const { moviesData, isLoader, isNoData, isError, isPagination, msgError, totalPages, query, page, moviesRaring } =
      this.state
    const { guestSessionId, cutDescription, formatDate, getPosterUrl } = this.props
    const errorView = isError ? <IsError msgError={msgError} /> : null
    let movieItems = isNoData ? <NoData /> : null
    const pagination = isPagination ? (
      <PaginationPages totalPages={totalPages} getMoviesList={this.getMoviesList} query={query} page={page} />
    ) : null

    if (!isNoData) {
      movieItems = moviesData.map((el) => (
        <Movie
          key={el.id}
          movieId={el.id}
          imgSrc={getPosterUrl(el.poster_path)}
          titleMovie={el.title}
          description={cutDescription(el.overview)}
          releaseDate={formatDate(el.release_date)}
          guestSessionId={guestSessionId}
          voteAverage={el.vote_average}
          genreIds={el.genre_ids}
          setRating={this.setRating}
          rating={moviesRaring.find((item) => item.id === el.id)}
        />
      ))
    }

    const content = isError ? errorView : movieItems
    return (
      <Flex className="movie-list">
        <Search getMoviesList={this.getMoviesList} />
        {isLoader ? <Spin size="large" /> : content}
        {pagination}
      </Flex>
    )
  }
}
