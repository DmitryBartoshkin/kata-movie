import { Component } from 'react'
import { Typography } from 'antd'

import { GenresConsumer } from '../genres-context'
import './genres.css'

export default class Genres extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { Text, Paragraph } = Typography
    const { genreIds } = this.props

    return (
      <GenresConsumer>
        {(genresList) => {
          let genresMovie = genresList.filter((el) => genreIds.find((item) => item === el.id))

          if (genresMovie.length === 0) {
            genresMovie = [{ id: 1, name: 'No Genres' }]
          }
          const showGenres = genresMovie.map((el) => (
            <Text code className="genre-tag" key={el.id}>
              {el.name}
            </Text>
          ))

          return <Paragraph className="genres-list">{showGenres}</Paragraph>
        }}
      </GenresConsumer>
    )
  }
}
