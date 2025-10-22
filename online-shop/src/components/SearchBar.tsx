import { Input } from "antd";

const SearchBar = () => {
  const { Search } = Input;

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Search
      placeholder="Type here to search..."
      onSearch={onSearch}
      className="w-2/6!"
    />
  );
};

export default SearchBar;
