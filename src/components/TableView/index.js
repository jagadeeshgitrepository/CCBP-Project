import {useTable, useSortBy} from 'react-table'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import React, {useMemo, useState, useEffect} from 'react'
import Select from 'react-select'
import SelectTagMultiple from '../MultipleDropDown/index'
import SelectTagSingle from '../SingleDropDown/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import Span from '../Span/index'
import './index.css'
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
  RoleContainer,
  SearchButton,
  TableParagraph,
  TableRow,
} from './style'
import ApproveButton from '../ApproveButton/index'
import CommentsImage from '../CommentsImage/index'

const TableView = props => {
  const {acceptRequestList, approveFunction, approveLoader, approveId} = props
  const [requestData, setRequestData] = useState(acceptRequestList)

  const [multipleSelect, setMultipleSelect] = useState('')
  const [singleSelect, setSingleSelect] = useState('Approve')

  useEffect(() => {
    setRequestData(acceptRequestList)
  }, [acceptRequestList])

  const data = React.useMemo(() => requestData, [requestData])

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
        Header: 'Tags',
        accessor: 'isReacted',
      },

      {
        Header: 'Date',
        accessor: 'postedAt',
      },

      {
        Header: 'Comments',
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

  const multipleDropDownFunction = selectedData => {
    setMultipleSelect(selectedData)
  }

  const singleDropDownFunction = value => setSingleSelect(value)

  const searchSelectedOptions = () => {
    const refineSelectedData = acceptRequestList.filter(originalData => {
      const {tags} = originalData
      const {requestStatus} = originalData
      if (tags.length !== 0) {
        if (
          (multipleSelect.includes(tags[0].tagName) ||
            multipleSelect.includes(tags[1].tagName)) &&
          requestStatus === singleSelect
        )
          return true
      }

      return false
    })

    setRequestData(refineSelectedData)
  }

  return (
    <>
      <DropDownContainer className="col-12">
        <SelectTagSingle
          options={catageory}
          dropDownFunction={singleDropDownFunction}
        />

        <SelectTagMultiple
          tagsList={tagsList.flat()}
          dropDownFunction={multipleDropDownFunction}
        />
        <SearchButton onClick={searchSelectedOptions}>Search</SearchButton>
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

                    {column.render('Header') === 'Date' ||
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
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>
                    <TableParagraph>
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

                      {cell.render('Header') === 'Comments' ? (
                        <CommentsContainer>
                          <CommentsImage
                            src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648295260/output-onlinepngtools_1_zufztr.png"
                            alt="comments"
                            tableComment
                          />
                          <CommentsParagraph>
                            {cell.render('Cell')}
                          </CommentsParagraph>
                        </CommentsContainer>
                      ) : null}

                      {cell.render('Header') === 'Date' ? (
                        <p>{cell.value.slice(0, 10)}</p>
                      ) : null}

                      {cell.render('Header') === 'Tags' ? (
                        <RoleContainer>
                          <Span
                            spanContent={
                              cell.render('Cell').props.row.original.tags[0]
                                .tagName
                            }
                            content={0}
                          />
                          <Span
                            spanContent={
                              cell.render('Cell').props.row.original.tags[1]
                                .tagName
                            }
                            content={1}
                          />
                        </RoleContainer>
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

                          {approveLoader === true &&
                          approveId ===
                            cell.render('Cell').props.row.original.postId ? (
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

                      {cell.render('Header') !== 'Comments' &&
                      cell.render('Header') !== 'Request_Status' &&
                      cell.render('Header') !== 'Date' &&
                      cell.render('Header') !== 'Tags' &&
                      cell.render('Header') !== 'PostedBy' ? (
                        <p>{cell.render('Cell')}</p>
                      ) : null}
                    </TableParagraph>
                  </Td>
                ))}
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default TableView
