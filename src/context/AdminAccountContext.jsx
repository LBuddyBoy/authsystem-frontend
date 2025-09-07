import { useContext, createContext, useState } from "react";
import useQuery from "../hooks/useQuery";
import Loading from "../components/Loading";

const AdminAccountContext = createContext();

export const PAGE_SIZE = 5;

export function AdminAccountProvider({ children }) {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [queryField, setQueryField] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const { loading: rolesLoading, data: roles } = useQuery("/roles");

  let accountsURL = `/admin/accounts?page=${page}&limit=${PAGE_SIZE}`;

  if (queryField && queryValue) {
    accountsURL += `&searchField=${queryField}`;
    accountsURL += `&searchValue=${queryValue}`;
  }

  const { loading, data } = useQuery(accountsURL, "accounts", [page, queryField, queryValue]);

  if (loading || !data || rolesLoading || !roles) {
    return <Loading></Loading>;
  }

  const { accounts, nextPage } = data;

  const handleNextPage = (e) => {
    e.preventDefault();
    setPage(nextPage);
  };

  const handlePreviousPage = () => {
    if (page - PAGE_SIZE < 0 || page <= 0) {
      return;
    }

    setPage((current) => current - PAGE_SIZE);
  };

  const exports = {
    handleNextPage,
    handlePreviousPage,
    accounts,
    nextPage,
    page,
    roles,
    setPage,
    queryField,
    setQueryField,
    queryValue,
    setQueryValue,
    selected,
    setSelected,
    formData,
    error,
    setError,
    setFormData,
  };

  return (
    <AdminAccountContext.Provider value={exports}>
      {children}
    </AdminAccountContext.Provider>
  );
}

export function useAdminAccount() {
  const context = useContext(AdminAccountContext);

  if (!context) {
    throw new Error(
      "useAdminAccount must be used within the AdminAccountProvider"
    );
  }

  return context;
}
