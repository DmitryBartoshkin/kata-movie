import { Component } from 'react'
import { Flex, Spin } from 'antd'

import { NoData, NoRatedMovies } from '../notifications'
import TmdbApiService from '../../services/tmdb-api-service'
import RatedMovie from '../rated-movie'
import PaginationPages from '../pagination'
import './rated-list.css'

export default class RatedList extends Component {
  TmdbApiService = new TmdbApiService()

  constructor(props) {
    super(props)
    this.state = {
      moviesData: [],
      isLoader: false,
      isNoData: false,
      isError: false,
      isPagination: false,
      totalPages: null,
      page: 1,
    }
  }

  componentDidMount() {
    const { guestSessionId } = this.props
    const { page } = this.state
    this.getRatedList(guestSessionId, page)
  }

  getRatedList = (guestSessionId, page) => {
    this.setState({ isLoader: true, isPagination: false })
    this.TmdbApiService.getRatedMovies(guestSessionId, page)
      .then((data) => {
        this.setState({
          moviesData: data.results,
          isLoader: false,
          isNoData: false,
          isPagination: true,
          totalPages: data.total_results,
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
  }

  onError = () => {
    this.setState({
      isError: true,
      isLoader: false,
      isPagination: false,
    })
  }

  render() {
    const { moviesData, isLoader, isNoData, isError, isPagination, totalPages, page } = this.state
    const { guestSessionId } = this.props
    const errorView = isError ? <NoRatedMovies /> : null
    let movieItems = isNoData ? <NoData /> : null
    const pagination = isPagination ? (
      <PaginationPages
        totalPages={totalPages}
        getRatedList={this.getRatedList}
        guestSessionId={guestSessionId}
        page={page}
      />
    ) : null

    if (!isNoData) {
      movieItems = moviesData.map((el) => (
        <RatedMovie
          key={el.id}
          imgSrc={el.poster_path}
          titleMovie={el.title}
          description={el.overview}
          releaseDate={el.release_date}
          rating={el.rating}
          voteAverage={el.vote_average}
          genreIds={el.genre_ids}
        />
      ))
    }

    const content = isError ? errorView : movieItems
    return (
      <Flex className="rated-list">
        {isLoader ? <Spin size="large" /> : content}
        {pagination}
      </Flex>
    )
  }
}
