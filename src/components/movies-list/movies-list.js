import { Component } from 'react'
import { Flex } from 'antd'

import TmdbApiService from '../../services/tmdb-api-service'
import Movie from '../movie'
import './movies-list.css'

export default class MoviesList extends Component {
  TmdbApiService = new TmdbApiService()

  constructor(props) {
    super(props)
    this.state = {
      moviesData: [],
    }
    this.getMoviesData('return')
  }

  getMoviesData(query) {
    this.TmdbApiService.getAllMoviesOnSearch(query).then((data) => {
      this.setState({
        moviesData: data,
      })
    })
  }

  render() {
    const { moviesData } = this.state
    const movieItems = moviesData.map((el) => (
      <Movie
        key={el.id}
        imgSrc={el.backdrop_path}
        titleMovie={el.original_title}
        description={el.overview}
        releaseDate={el.release_date}
      />
    ))

    return <Flex className="movie-list">{movieItems}</Flex>
  }
}
