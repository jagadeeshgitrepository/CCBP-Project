import ReactPaginate from 'react-paginate'

import {useTable, useSortBy} from 'react-table'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'
import {BiFilter} from 'react-icons/bi'
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
  FilterParagraph,
  DropDownContainer,
  RoleContainer,
  SearchButton,
  TableParagraph,
  TableRow,
  TableViewContainer,
} from './style'
import ApproveButton from '../ApproveButton/index'
import CommentsImage from '../CommentsImage/index'

const TableView = props => {
  const {acceptRequestList, approveFunction, approveLoader, approveId} = props
  const [offset, setOffset] = useState(0)
  const [paginationData, setPaginationData] = useState(acceptRequestList)
  const [perPage] = useState(3)

  console.log(perPage)
  const [pageCount, setPageCount] = useState(
    Math.ceil(acceptRequestList.length / perPage),
  )
  const [requestData, setRequestData] = useState(
    acceptRequestList.slice(offset, offset + perPage),
  )
  console.log('hello')
  console.log(offset)
  const [multipleSelect, setMultipleSelect] = useState('')
  const [singleSelect, setSingleSelect] = useState('Approve')

  useEffect(() => {
    setPaginationData(acceptRequestList)
    setRequestData(acceptRequestList.slice(offset, offset + perPage))

    setPageCount(Math.ceil(acceptRequestList.length / perPage))
  }, [acceptRequestList])

  const handlePageClick = e => {
    const selectedPage = e.selected
    const newoffset = selectedPage * perPage
    setOffset(newoffset)
    setRequestData(paginationData.slice(newoffset, newoffset + perPage))
  }

  const data = React.useMemo(() => requestData, [requestData])

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'postId', // accessor is the "key" in the data
      },
      {
        Header: 'TITLE',
        accessor: 'title',
      },
      {
        Header: 'CONTENT',
        accessor: 'postContent',
      },
      {
        Header: 'POST',
        accessor: 'userName',
      },
      {
        Header: 'STATUS',
        accessor: 'requestStatus',
      },
      {
        Header: 'TAGS',
        accessor: 'isReacted',
      },

      {
        Header: 'DATE',
        accessor: 'postedAt',
      },

      {
        Header: 'COMMENTS',
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

  let tagsList = acceptRequestList.map(eachItem => {
    const {tags} = eachItem
    const innerTags = tags.map(item => ({
      id: uuidv4(),
      value: item.tagName,
      label: item.tagName,
    }))
    return innerTags.flat()
  })

  tagsList = tagsList.flat()
  tagsList.unshift({id: uuidv4(), value: '', label: 'ALl Tags'})
  const catageory = [
    {id: 1, value: '', label: 'Success/Approve'},
    {id: 2, value: 'Success', label: 'Success'},
    {id: 3, value: 'Approve', label: 'Approve'},
  ]

  const multipleDropDownFunction = selectedData => {
    console.log(selectedData)
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
          requestStatus.includes(singleSelect)
        )
          return true
      }

      return false
    })

    setOffset(0)
    setPaginationData(refineSelectedData)
    setRequestData(refineSelectedData.slice(0, 0 + perPage))
    setPageCount(Math.ceil(refineSelectedData.length / perPage))
  }

  return (
    <>
      <TableViewContainer>
        <DropDownContainer drop>
          <DropDownContainer selectContainer>
            <SelectTagSingle
              options={catageory}
              dropDownFunction={singleDropDownFunction}
            />

            <SelectTagMultiple
              tagsList={tagsList}
              dropDownFunction={multipleDropDownFunction}
            />
            <SearchButton onClick={searchSelectedOptions}>Search</SearchButton>
          </DropDownContainer>
          <DropDownContainer IconContainer>
            <BiFilter />
            <FilterParagraph>FILTER</FilterParagraph>
          </DropDownContainer>
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

                      {column.render('Header') === 'DATE' ||
                      column.render('Header') === 'ID' ? (
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
                        {cell.render('Header') === 'POST' ? (
                          <>
                            <Image
                              src={
                                cell.render('Cell').props.row.original
                                  .profilePic
                              }
                              alt="hello"
                            />
                            <p>{cell.render('Cell')}</p>
                          </>
                        ) : null}

                        {cell.render('Header') === 'COMMENTS' ? (
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

                        {cell.render('Header') === 'DATE' ? (
                          <p>{cell.value.slice(0, 10)}</p>
                        ) : null}

                        {cell.render('Header') === 'TAGS' ? (
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

                        {cell.render('Header') === 'STATUS' ? (
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

                        {cell.render('Header') !== 'COMMENTS' &&
                        cell.render('Header') !== 'STATUS' &&
                        cell.render('Header') !== 'DATE' &&
                        cell.render('Header') !== 'TAGS' &&
                        cell.render('Header') !== 'POST' ? (
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

        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </TableViewContainer>
    </>
  )
}

export default TableView
