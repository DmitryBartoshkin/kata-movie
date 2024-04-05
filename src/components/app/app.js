import { Component } from 'react'
import { Tabs, Flex } from 'antd'
import { format } from 'date-fns'

import TmdbApiService from '../../services/tmdb-api-service'
import MoviesList from '../movies-list'
import RatedList from '../rated-list'
import { GenresProvider } from '../genres-context'

import './app.css'
import noMoviePoster from './no-movie-poster.jpg'

export default class App extends Component {
  TmdbApiService = new TmdbApiService()

  constructor() {
    super()
    this.state = {
      guestSessionId: '',
      genresList: [],
    }

    this.cutDescription = (text) => {
      if (text.length >= 203) {
        const cutIndex = text.lastIndexOf(' ', 203)
        const cutText = `${text.slice(0, cutIndex)} ...`
        return cutText
      }
      return text
    }

    this.formatDate = (date) => {
      if (date) {
        return format(new Date(date), 'PP')
      }
      return 'No Release Date'
    }

    this.getPosterUrl = (path) => {
      if (path) {
        return `https://image.tmdb.org/t/p/w500${path}`
      }
      return noMoviePoster
    }
  }

  componentDidMount() {
    this.TmdbApiService.createGuestSession()
      .then((res) => this.setState({ guestSessionId: res.guest_session_id }))
      .catch(this.onError)

    this.TmdbApiService.getMovieGenres()
      .then((res) => this.setState({ genresList: res.genres }))
      .catch(this.onError)
  }

  render() {
    const { guestSessionId, genresList } = this.state
    const arrTabs = [
      {
        children: (
          <MoviesList
            guestSessionId={guestSessionId}
            cutDescription={this.cutDescription}
            formatDate={this.formatDate}
            getPosterUrl={this.getPosterUrl}
          />
        ),
        label: 'Search',
        destroyInactiveTabPane: false,
      },
      {
        children: (
          <RatedList
            guestSessionId={guestSessionId}
            cutDescription={this.cutDescription}
            formatDate={this.formatDate}
            getPosterUrl={this.getPosterUrl}
          />
        ),
        label: 'Rated',
        destroyInactiveTabPane: true,
      },
    ]

    return (
      <Flex className="tabs">
        <GenresProvider value={genresList}>
          <Tabs
            defaultActiveKey="1"
            centered
            items={arrTabs.map((_, i) => {
              const id = String(i + 1)
              return {
                label: _.label,
                key: id,
                children: _.children,
                destroyInactiveTabPane: _.destroyInactiveTabPane,
              }
            })}
          />
        </GenresProvider>
      </Flex>
    )
  }
}
