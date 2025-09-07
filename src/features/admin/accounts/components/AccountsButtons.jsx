import Button from "../../../../components/Button";
import { useAdminAccount } from "../../../../context/AdminAccountContext";

export default function AccountsButtons() {
  const { page, handleNextPage, handlePreviousPage } = useAdminAccount();

  return (
    <div className="pageControls">
      <Button
        id={"previousAccountsPageBtn"}
        text={"Previous Page"}
        action={handlePreviousPage}
      />
      <p>Page {page == 0 ? 1 : page / 5 + 1}</p>
      <Button
        id={"nextAccountsPageBtn"}
        text={"Next Page"}
        action={handleNextPage}
      />
    </div>
  );
}
