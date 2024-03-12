import { Component } from 'react'

import MoviesList from '../movies-list'
import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <MoviesList />
  }
}
