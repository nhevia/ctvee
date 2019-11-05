// React-Select custom styles
const getCustomStyle = () => {
  return {
    control: (base) => ({
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
    option: (base) => ({
      ...base,
      color: 'white',
      background: 'black',
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
    placeholder: (base) => ({
      ...base,
      color: 'grey' 
    })
  }
}

export default getCustomStyle