import { useEffect, useState } from 'react'
import {
  Typography,
  Input,
  notification,
  Button,
  Table,
  Select,
  Spin
} from 'antd'
import {
  pageSizeList,
  columns,
  sortOrderList,
  sortFieldList
} from '../../utils/constants'
import './Home.css'
import { componentReduxTypes, reducerObject } from '../../utils/dataTypes'

export const Home = (params: componentReduxTypes) => {
  const [repos, setRepos] = useState<Array<Object>>([]) //useState(params?.reposData?.data ?? [])
  const [api, contextHolder] = notification.useNotification()
  const [userName, setUserName] = useState<string>('')
  const [pageNo, setPageNo] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('10')
  const [sortOrder, setSortOrder] = useState<string>('asc')
  const [sortFied, setSortField] = useState<string>('updated')

  const openNotification = () => {
    api.error({
      message: 'Error',
      description: 'Something went wrong, please try again',
      duration: 0
    })
  }

  const parseData = (response: reducerObject) => {
    console.log('Success!', response)
    setRepos(response.data)
  }

  const fetchRepoError = (error: Object) => {
    console.log(error)
    openNotification()
  }

  const fetchData = async () => {
    params.getRepositories && await params.getRepositories(
      userName,
      `page=${pageNo}&per_page=${Number(
        pageSize
      )}&sort=${sortFied}&direction=${sortOrder}`,
      parseData,
      fetchRepoError
    )
  }

  useEffect(() => {
    if (userName) fetchData()
  }, [pageSize, pageNo, sortOrder, sortFied])

  return (
    <div className='homeContainer'>
      {contextHolder}
      <Typography className='heading'>Github Repository Listing</Typography>
      <div className='formContainer'>
        <Typography className='userLabel'>
          Enter user or organisation name
        </Typography>
        <div className='inputContainer'>
          <Input
            placeholder='Enter Username'
            className='repoNameInput'
            onChange={event => {
              setUserName(event.target.value)
            }}
          />
          <Button
            type='primary'
            onClick={() => {
              if (userName) fetchData()
            }}
          >
            Get
          </Button>
        </div>
      </div>
      <div className='tableContainer'>
        {params?.reposData?.isPending && (
          <div className='spinContainer'>
            <Spin size='large' />
          </div>
        )}
        {params?.reposData?.isFulfilled && (
          <>
            <div className='sortContainer'>
              <div className='sortFieldContorl'>
                <div className='paginationControlMargin sortLabel'>
                  Sort Field:
                </div>
                <Select
                  className='paginationControlMargin'
                  defaultValue={sortFied}
                  style={{ width: 120 }}
                  onChange={event => {
                    setPageNo(1)
                    setSortField(event)
                  }}
                  options={sortFieldList}
                />
              </div>
              <div className='sortFieldContorl'>
                <div className='paginationControlMargin sortLabel'>
                  Sort Order:
                </div>
                <Select
                  className='paginationControlMargin'
                  defaultValue={sortOrder}
                  style={{ width: 120 }}
                  onChange={event => {
                    setPageNo(1)
                    setSortOrder(event)
                  }}
                  options={sortOrderList}
                />
              </div>
            </div>
            <Table columns={columns} dataSource={repos} pagination={false} />
            <div className='paginationControl'>
              <div className='paginationControlMargin sortLabel'>
                Page No: {pageNo}
              </div>
              <Button
                color='default'
                variant='outlined'
                className='paginationControlMargin'
                onClick={() => {
                  setPageNo(pageNo - 1)
                }}
                disabled={pageNo === 1}
              >
                Previous
              </Button>
              <Button
                color='default'
                variant='outlined'
                className='paginationControlMargin'
                onClick={() => {
                  setPageNo(pageNo + 1)
                }}
                disabled={repos.length === 0 || repos.length < Number(pageSize)}
              >
                Next
              </Button>
              <Select
                className='paginationControlMargin'
                defaultValue={pageSize}
                style={{ width: 120 }}
                onChange={event => {
                  setPageNo(1)
                  setPageSize(event)
                }}
                options={pageSizeList}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
