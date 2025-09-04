// src/components/UI/SearchBar.jsx
const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      className="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default SearchBar