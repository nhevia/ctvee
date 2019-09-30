// React-Select custom styles
const getCustomStyle = () => {
  return {
    container: (base) => ({
      ...base,
      marginLeft: 'auto',
      marginRight: 'auto'
    }),
    option: (base, state) => ({
      ...base,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'white' : 'black',
    }),
    dropdownIndicator: () => ({
      visibility: 'hidden'
    })
  }
}

export default getCustomStyle