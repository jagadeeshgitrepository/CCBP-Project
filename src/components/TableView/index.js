import {useTable, useSortBy} from 'react-table'
import React, {useMemo} from 'react'
import {
  Image,
  TableHeadingContainer,
  Table,
  Th,
  Td,
  Icon,
  CommentsContainer,
  CommentsParagraph,
} from './style'
import ApproveButton from '../ApproveButton/index'
import CommentsImage from '../CommentsImage/index'

const TableView = props => {
  const {acceptRequestList, approveFunction} = props
  console.log('hello table this is table')
  const data = React.useMemo(() => acceptRequestList, [])

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
        Header: 'IsReacted',
        accessor: 'isReacted',
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

  return (
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
                        src={acceptRequestList[index].profilePic}
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

                  {cell.render('Header') === 'Request_Status' ? (
                    <ApproveButton
                      username={acceptRequestList[index].userName}
                      id={acceptRequestList[index].postId}
                      requestStatus={cell.value}
                      approve={tableApproveFunction}
                    />
                  ) : null}

                  {cell.render('Header') !== 'CommentsCount' &&
                  cell.render('Header') !== 'Request_Status' &&
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
  )
}

export default TableView
