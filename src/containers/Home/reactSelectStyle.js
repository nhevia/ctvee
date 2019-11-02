// React-Select custom styles
const getCustomStyle = () => {
  return {
    control: (base, state) => ({
      ...base,
      background: "black"
    }),
    container: (base) => ({
      ...base,
      marginLeft: 'auto',
      marginRight: 'auto',
      background: 'black'
    }),
    menu: (base) => ({
      ...base,
      background: 'black'
    }),
    option: (base, state) => ({
      ...base,
      color: 'white',
      '&:hover': {
        background: 'grey'
      }
    }),
    input: (base) => ({
      ...base,
      color: 'white'
    }),
    dropdownIndicator: () => ({
      visibility: 'hidden'
    }),
    indicatorSeparator: () => ({
      visibility: 'hidden'
    }),
  }
}

export default getCustomStyle