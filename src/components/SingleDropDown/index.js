import React from 'react'
import chroma from 'chroma-js'

import Select, {StylesConfig} from 'react-select'

const SelectTagSingle = props => {
  const {options, dropDownFunction} = props

  const singleDropFun = event => {
    dropDownFunction(event.value)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Select
            options={options}
            onChange={singleDropFun}
            placeholder="Status..."
            style={{
              color: 'green',
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default SelectTagSingle
