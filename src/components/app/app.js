import { Component } from 'react'
import { Tabs, Flex } from 'antd'

import TmdbApiService from '../../services/tmdb-api-service'
import MoviesList from '../movies-list'
import RatedList from '../rated-list'
import { GenresProvider } from '../genres-context'
import './app.css'

export default class App extends Component {
  TmdbApiService = new TmdbApiService()

  constructor() {
    super()
    this.state = {
      guestSessionId: '',
      genresList: [],
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
        children: <MoviesList guestSessionId={guestSessionId} />,
        label: 'Search',
        destroyInactiveTabPane: false,
      },
      {
        children: <RatedList guestSessionId={guestSessionId} />,
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
