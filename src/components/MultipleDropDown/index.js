import React from 'react'
import chroma from 'chroma-js'

import Select, {StylesConfig} from 'react-select'

const SelectTagMultiple = props => {
  const {tagsList, dropDownFunction} = props

  const multiDropFun = event => {
    console.log('clicked')
    const selectedData = event.map(eachSelected => eachSelected.value)
    dropDownFunction(selectedData)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Select
            closeMenuOnSelect={false}
            defaultValue={[tagsList[0], tagsList[1]]}
            isMulti
            options={tagsList}
            onChange={multiDropFun}
          />
        </div>
      </div>
    </div>
  )
}
export default SelectTagMultiple
