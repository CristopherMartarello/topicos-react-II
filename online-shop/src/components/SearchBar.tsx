import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/productSlice";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (value: string) => {
    if (location.pathname === "/products") {
      dispatch(setSearchTerm(value));
    }
  };

  if (location.pathname !== "/products") return null;

  return (
    <Input.Search
      placeholder="Search products..."
      allowClear
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-md"
      style={{ minWidth: 250 }}
    />
  );
};

export default SearchBar;
