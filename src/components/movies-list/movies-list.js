import { Component } from 'react'
import { Flex, Spin } from 'antd'

import { NoData, IsError } from '../notifications'
import TmdbApiService from '../../services/tmdb-api-service'
import Movie from '../movie'
import './movies-list.css'

export default class MoviesList extends Component {
  TmdbApiService = new TmdbApiService()

  constructor(props) {
    super(props)
    this.state = {
      moviesData: [],
      isLoader: true,
      isNoData: false,
      isError: false,
      msgError: '',
    }
  }

  componentDidMount() {
    const query = 'return'
    this.TmdbApiService.getAllMoviesOnSearch(query)
      .then((data) => {
        this.setState({
          moviesData: data,
          isLoader: false,
        })

        if (data.length === 0) {
          this.setState({
            isNoData: true,
          })
        }
      })
      .catch(this.onError)
  }

  onError = (err) => {
    this.setState({
      isError: true,
      isLoader: false,
      msgError: err.message,
    })
  }

  render() {
    const { moviesData, isLoader, isNoData, isError, msgError } = this.state
    const errorView = isError ? <IsError msgError={msgError} /> : null
    let movieItems = isNoData ? <NoData /> : null

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

    return <Flex className="movie-list">{isLoader ? <Spin size="large" /> : content}</Flex>
  }
}
