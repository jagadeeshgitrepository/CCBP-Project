import {useTable} from 'react-table'
import React, {useMemo} from 'react'
import {Image} from './style'

const TableView = props => {
  const {acceptRequestList} = props
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
  } = useTable({columns, data})

  return (
    <table
      {...getTableProps()}
      style={{
        border: 'solid 1px #d7dfe9',
        width: '90%',
        'border-spacing': '0px',
        margin: '40px',
      }}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 1px #d7dfe9',
                  background: 'white',
                  color: '#171f46',
                  fontWeight: 'bold',
                  height: '70px',
                  fontSize: '15px',
                }}
              >
                {column.render('Header')}
              </th>
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
                <td
                  {...cell.getCellProps()}
                  style={{
                    borderBottom: 'solid 1px #d7dfe9',
                    background: 'white',
                    color: '#7e858e',
                    fontSize: '13px',
                    height: '70px',
                    padding: '10px',
                  }}
                >
                  {cell.render('Header') === 'PostedBy' ? (
                    <Image
                      src={acceptRequestList[index].profilePic}
                      alt="hello"
                    />
                  ) : null}

                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableView
