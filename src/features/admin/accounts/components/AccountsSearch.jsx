import Button from "../../../../components/Button";
import { useAdminAccount } from "../../../../context/AdminAccountContext";

export default function AccountsSearch() {
  const { setPage, setQueryField, setQueryValue, queryField, queryValue } =
    useAdminAccount();

  const handleSubmit = async (formData) => {
    const search = formData.get("search");
    const field = formData.get("field");

    setQueryField(field);
    setQueryValue(search);
    setPage(0);
  };

  return (
    <>
      <form action={handleSubmit}>
        <input
          name="search"
          placeholder="Search for an account..."
          type="text"
        ></input>
        <label>
          Filter By
          <select name="field" defaultValue={"username"} required>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="id">ID</option>
          </select>
        </label>
        <Button id={"searchAccountBtn"} text={"Search"} />
      </form>
      {(queryField || queryValue) && (
        <Button
          id={"clearSearchBtn"}
          text={"Clear"}
          action={() => {
            setQueryField(null);
            setQueryValue(null);
          }}
        />
      )}
    </>
  );
}
