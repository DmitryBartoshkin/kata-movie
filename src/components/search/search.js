import { Component } from 'react'
import { Input } from 'antd'

import './search.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state
    if (inputValue !== prevState.inputValue) {
      this.onSubmitQuery(inputValue)
    }
  }

  onChangeValue = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  onSubmitQuery = (query) => {
    const { getMoviesList } = this.props
    getMoviesList(query, 1)
  }

  render() {
    const { inputValue } = this.state

    return (
      <Input
        className="movie-search"
        placeholder="Type to search..."
        onChange={this.onChangeValue}
        value={inputValue}
      />
    )
  }
}
