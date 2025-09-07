import { useState } from "react";
import { useAdminRoles } from "../../../../context/AdminRolesContext";

export default function AdminRolesTable() {
  return (
    <table className="rolesTable">
      <TableHead />
      <TableBody />
    </table>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Weight</th>
        <th>Default</th>
        <th>Staff</th>
        <th>Permissions</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

function TableBody() {
  const { roles } = useAdminRoles();

  return (
    <tbody>
      {roles.map((role) => {
        return (
          <tr key={role.id}>
            <RoleDisplayInfo role={role} />
            <RoleEditInfo role={role} />
          </tr>
        );
      })}
    </tbody>
  );
}

function RoleDisplayInfo({ role }) {
  const { editing, setEditing } = useAdminRoles();

  if (editing && editing.id === role.id) return;

  const handleEdit = () => {
    setEditing(role);
  };

  return (
    <>
      <td>{role.name}</td>
      <td>{role.weight}</td>
      <td>{role.is_default}</td>
      <td>{role.is_staff}</td>
      <td>{role.permissions}</td>
      <td className="roleEditBtns">
        <button onClick={handleEdit}>Edit</button>
      </td>
    </>
  );
}

function RoleEditInfo({ role }) {
  const { editing, setEditing } = useAdminRoles();
  const [formData, setFormData] = useState(role);
  const [selectedPerms, setSelectedPerms] = useState([...role.permissions]);

  if (!editing || editing.id !== role.id) return;

  const stopEditing = () => {
    setEditing(null);
  };

  const handleSave = () => {};

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlePermissionChange = (e) => {
    const value = e.target.value;

    setSelectedPerms((prev) => {
      const isSelected = prev.includes(value);

      if (isSelected) {
        return prev.filter((perm) => perm != value);
      }

      return [...prev, value];
    });
  };

  return (
    <>
      <td>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          defaultValue={role.name}
        />
      </td>
      <td>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          defaultValue={formData.weight}
        />
      </td>
      <td>
        <select
          name="is_default"
          onChange={handleChange}
          defaultValue={formData.is_default}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </td>
      <td>
        <select
          name="is_staff"
          onChange={handleChange}
          defaultValue={formData.is_staff}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </td>
      <td className="roleEditPermissions">
        {role.permissions.map((permission) => {
          return (
            <label key={permission}>
              {permission}
              <input
                type="checkbox"
                name="permissions"
                value={permission}
                checked={selectedPerms.includes(permission)}
                onChange={handlePermissionChange}
              />
            </label>
          );
        })}
      </td>
      <td className="roleEditBtns">
        <button onClick={stopEditing}>Cancel</button>
        <button onClick={() => handleSave(role)}>Save</button>
      </td>
    </>
  );
}
