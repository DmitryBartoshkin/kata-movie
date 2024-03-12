import { Component } from 'react'
import { Typography } from 'antd'

import './genres.css'

export default class Genres extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { Text, Paragraph } = Typography
    return (
      <Paragraph className="genres-list">
        <Text code className="genre-tag">
          Action
        </Text>
        <Text code className="genre-tag">
          Drama
        </Text>
      </Paragraph>
    )
  }
}
