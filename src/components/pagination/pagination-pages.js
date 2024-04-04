import { Pagination } from 'antd'
import { Component } from 'react'
import './pagination-pages.css'

export default class PaginationPages extends Component {
  onChangePage = (page) => {
    const { getMoviesList, getRatedList, query, guestSessionId } = this.props
    if (getMoviesList) {
      getMoviesList(query, page)
    }
    if (getRatedList) {
      getRatedList(guestSessionId, page)
    }
  }

  render() {
    const { totalPages, page } = this.props
    return (
      <Pagination
        className="pagination-pages"
        size="small"
        current={page}
        onChange={this.onChangePage}
        total={totalPages}
        showSizeChanger={false}
        defaultPageSize={20}
      />
    )
  }
}
