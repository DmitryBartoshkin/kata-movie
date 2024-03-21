import { Pagination } from 'antd'
import { Component } from 'react'
import './pagination-pages.css'

export default class PaginationPages extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     currentPage: 1,
  //   }
  // }

  onChangePage = (page) => {
    const { getMoviesList, query } = this.props
    // this.setState({
    //   currentPage: page,
    // })
    getMoviesList(query, page)
  }

  render() {
    // const { currentPage } = this.state
    const { totalPages, page } = this.props
    return (
      <Pagination
        className="pagination-pages"
        size="small"
        current={page}
        onChange={this.onChangePage}
        total={totalPages}
        showSizeChanger={false}
      />
    )
  }
}
