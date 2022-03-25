import React from 'react'
import chroma from 'chroma-js'

import Select, {StylesConfig} from 'react-select'

const SelectTag = props => {
  const {tagsList} = props

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Select
            closeMenuOnSelect={false}
            defaultValue={[tagsList[0], tagsList[1]]}
            isMulti
            options={tagsList}
          />
        </div>
      </div>
    </div>
  )
}
export default SelectTag
