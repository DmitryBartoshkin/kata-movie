import { Component } from 'react'
import { Flex, Typography, Card } from 'antd'
import { format } from 'date-fns'

import './movie.css'
import Genres from '../genres'

export default class Movie extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.cutDescription = (text) => {
      if (text.length > 203) {
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
      return date
    }
  }

  render() {
    const { Text, Paragraph } = Typography
    const { description, imgSrc, titleMovie, releaseDate } = this.props
    return (
      <Card className="movie-card">
        <Flex justify="space-between">
          <img
            src={`https://image.tmdb.org/t/p/w500${imgSrc}`}
            alt={`Сover of the film ${titleMovie} (${releaseDate})`}
            className="movie-img"
          />
          <Flex vertical align="flex-start" className="movie-info">
            <Typography.Title level={5} className="movie-title">
              {titleMovie}
            </Typography.Title>
            <Text type="secondary" className="movie-date">
              {this.formatDate(releaseDate)}
            </Text>
            <Genres />
            <Paragraph className="movie-description">{this.cutDescription(description)}</Paragraph>
          </Flex>
        </Flex>
      </Card>
    )
  }
}
