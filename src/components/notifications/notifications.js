import { Alert, Space } from 'antd'
import './notifications.css'

function NoConnection() {
  return (
    <Space
      style={{
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
      }}
    >
      <Alert message="Error: No internet connection!" description="Check it and try again :)" type="error" showIcon />
    </Space>
  )
}

function NoData() {
  return (
    <Space>
      <Alert message="Ooops!" description="No results were found for your request!" type="warning" showIcon />
    </Space>
  )
}

function NoRatedMovies() {
  return (
    <Space>
      <Alert message="Ooops!" description="No rated movies!" type="warning" showIcon />
    </Space>
  )
}

function IsError({ msgError }) {
  return (
    <Space>
      <Alert message="Error" description={`Error: ${msgError} =( We're fixing it now!`} type="error" showIcon />
    </Space>
  )
}

export { NoConnection, NoData, IsError, NoRatedMovies }
