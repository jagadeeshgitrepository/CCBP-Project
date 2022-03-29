import Select from 'react-select'

const SelectTagMultiple = props => {
  const {tagsList, dropDownFunction} = props

  const multiDropFun = event => {
    let selectedData = event.map(eachSelected => eachSelected.value)
    if (selectedData[0] === '')
      selectedData = tagsList.map(eachTag => eachTag.value)
    const noDuplicates = [...new Set(selectedData)]
    dropDownFunction(noDuplicates)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={tagsList}
            onChange={multiDropFun}
            placeholder="Tags..."
          />
        </div>
      </div>
    </div>
  )
}
export default SelectTagMultiple
