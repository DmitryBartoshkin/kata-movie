import { Component } from 'react'
import { Flex, Typography, Card, Rate } from 'antd'
import { format } from 'date-fns'

import Genres from '../genres'
import noMoviePoster from '../movie/no-movie-poster.jpg'
import './rated-movie.css'

export default class RatedMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {}

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

  render() {
    const { Text, Paragraph } = Typography
    const { description, imgSrc, titleMovie, releaseDate, rating, voteAverage, genreIds } = this.props
    const vote = Math.floor(voteAverage * 10) / 10
    let voteColor = ''

    if (vote < 3) {
      voteColor = 'vote-red'
    } else if (vote >= 3 && vote < 5) {
      voteColor = 'vote-orange'
    } else if (vote >= 5 && vote < 7) {
      voteColor = 'vote-yellow'
    } else {
      voteColor = 'vote-green'
    }
    return (
      <Card className="movie-card">
        <Flex justify="space-between">
          <img
            src={this.getPosterUrl(imgSrc)}
            alt={`Poster of the film ${titleMovie} (${releaseDate})`}
            className="movie-img"
          />
          <Flex vertical align="flex-start" className="movie-info">
            <Flex className="movie-info-header" justify="space-between">
              <Typography.Title level={5} className="movie-title">
                {titleMovie}
              </Typography.Title>
              <div className={`movie-vote ${voteColor}`}>{vote}</div>
            </Flex>
            <Text type="secondary" className="movie-date">
              {this.formatDate(releaseDate)}
            </Text>
            <Genres genreIds={genreIds} />
            <Paragraph className="movie-description">{this.cutDescription(description)}</Paragraph>
            <Rate className="movie-rate" disabled allowHalf count={10} defaultValue={rating} />
          </Flex>
        </Flex>
      </Card>
    )
  }
}
