import { Component } from 'react'
import { Flex, Typography, Card, Rate } from 'antd'

import Genres from '../genres'
import './rated-movie.css'

export default class RatedMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
          <img src={imgSrc} alt={`Poster of the film ${titleMovie} (${releaseDate})`} className="movie-img" />
          <Flex vertical align="flex-start" className="movie-info">
            <Flex className="movie-info-header" justify="space-between">
              <Typography.Title level={5} className="movie-title">
                {titleMovie}
              </Typography.Title>
              <div className={`movie-vote ${voteColor}`}>{vote}</div>
            </Flex>
            <Text type="secondary" className="movie-date">
              {releaseDate}
            </Text>
            <Genres genreIds={genreIds} />
            <Paragraph className="movie-description">{description}</Paragraph>
            <Rate className="movie-rate" disabled allowHalf count={10} defaultValue={rating} />
          </Flex>
        </Flex>
      </Card>
    )
  }
}
