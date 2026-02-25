
type SearchboxProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Searchbox : React.FC<SearchboxProps> = ({ search, setSearch }) =>{
return(
    <>
        <input
        type="text"
        placeholder='Search for any product (title/description)'
        className='search-box'
        name="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
          />
      {/* <button className='search-btn' type="submit">Search</button> */}
    </>
    )
}
export default Searchbox;