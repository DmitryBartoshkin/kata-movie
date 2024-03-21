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
    }
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
          totalPages: data.total_pages,
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
    const { moviesData, isLoader, isNoData, isError, isPagination, msgError, totalPages, query, page } = this.state
    const errorView = isError ? <IsError msgError={msgError} /> : null
    let movieItems = isNoData ? <NoData /> : null
    const pagination = isPagination ? (
      <PaginationPages totalPages={totalPages} getMoviesList={this.getMoviesList} query={query} page={page} />
    ) : null

    if (!isNoData) {
      movieItems = moviesData.map((el) => (
        <Movie
          key={el.id}
          imgSrc={el.poster_path}
          titleMovie={el.title}
          description={el.overview}
          releaseDate={el.release_date}
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
