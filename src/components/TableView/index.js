import {useTable, useSortBy} from 'react-table'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import React, {useMemo, useState} from 'react'
import Select from 'react-select'
import SelectTag from '../ReactDropDown/index'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Image,
  TableHeadingContainer,
  Table,
  Th,
  Td,
  Icon,
  CommentsContainer,
  CommentsParagraph,
  DropDownContainer,
} from './style'
import ApproveButton from '../ApproveButton/index'
import CommentsImage from '../CommentsImage/index'

const TableView = props => {
  const {acceptRequestList, approveFunction} = props
  const [newList, setterFun] = useState(acceptRequestList)
  console.log('hello table this is table')
  console.log(acceptRequestList)
  const data = React.useMemo(() => acceptRequestList, [acceptRequestList])

  const columns = React.useMemo(
    () => [
      {
        Header: 'PostId',
        accessor: 'postId', // accessor is the "key" in the data
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'PostContent',
        accessor: 'postContent',
      },
      {
        Header: 'PostedBy',
        accessor: 'userName',
      },
      {
        Header: 'Request_Status',
        accessor: 'requestStatus',
      },

      {
        Header: 'PostAt',
        accessor: 'postedAt',
      },

      {
        Header: 'CommentsCount',
        accessor: 'commentsCount',
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data}, useSortBy)

  const tableApproveFunction = (username, id) => {
    approveFunction(username, id)
  }
  console.log('table')
  console.log(acceptRequestList[0].requestStatus)

  const tagsList = acceptRequestList.map(eachItem => {
    const {tags} = eachItem
    const innerTags = tags.map(item => ({
      id: uuidv4(),
      value: item.tagName,
      label: item.tagName,
    }))
    return innerTags.flat()
  })

  const catageory = [
    {id: 1, value: 'Success', label: 'Success'},
    {id: 2, value: 'Approve', label: 'Approve'},
  ]

  console.log(tagsList.flat())
  return (
    <>
      <DropDownContainer className="col-12">
        <div className="container">
          <div className="row">
            <div className="col-9">
              <Select options={catageory} />
            </div>
          </div>
        </div>
        <SelectTag tagsList={tagsList.flat()} />
      </DropDownContainer>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <TableHeadingContainer>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}

                    {column.render('Header') === 'PostAt' ||
                    column.render('Header') === 'PostId' ? (
                      <span>
                        {column.isSortedDesc ? (
                          <Image
                            src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648178109/samples/people/Chevron_Down_2_-_10px_3x_f5an9b.png"
                            alt="desc"
                            sort
                          />
                        ) : (
                          <Image
                            src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648179375/samples/people/Chevron_up_2_-_10px_3x_eau8kg.png"
                            alt="asc"
                            sort
                          />
                        )}
                      </span>
                    ) : (
                      ''
                    )}
                  </TableHeadingContainer>
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>
                    {cell.render('Header') === 'PostedBy' ? (
                      <>
                        <Image
                          src={
                            cell.render('Cell').props.row.original.profilePic
                          }
                          alt="hello"
                        />
                        <p>{cell.render('Cell')}</p>
                      </>
                    ) : null}

                    {cell.render('Header') === 'CommentsCount' ? (
                      <CommentsContainer>
                        <CommentsImage
                          src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648089070/svgfile/Icon_3x_n5po8t.png"
                          alt="comments"
                          tableComment
                        />
                        <CommentsParagraph>
                          {cell.render('Cell')}
                        </CommentsParagraph>
                      </CommentsContainer>
                    ) : null}

                    {cell.render('Header') === 'PostAt' ? (
                      <p>{cell.value.slice(0, 10)}</p>
                    ) : null}

                    {cell.render('Header') === 'Request_Status' ? (
                      <>
                        <ApproveButton
                          username={
                            cell.render('Cell').props.row.original.userName
                          }
                          id={cell.render('Cell').props.row.original.postId}
                          requestStatus={cell.value}
                          approve={tableApproveFunction}
                        />

                        {cell.value !== 'Success' ? (
                          <div testid="loader">
                            <Loader
                              type="TailSpin"
                              color="#00bfff"
                              height={50}
                              width={50}
                            />
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    {cell.render('Header') !== 'CommentsCount' &&
                    cell.render('Header') !== 'Request_Status' &&
                    cell.render('Header') !== 'PostAt' &&
                    cell.render('Header') !== 'PostedBy' ? (
                      <p>{cell.render('Cell')}</p>
                    ) : null}
                  </Td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default TableView
