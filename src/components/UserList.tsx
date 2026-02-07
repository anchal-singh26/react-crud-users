import type { User } from "../types/user";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, IconButton } from "@mui/material";

type Props = {
  users: User[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

function UserList({ users, onEdit, onDelete }: Props) {
  if (users.length === 0) {
    return <div className="empty-state">No users added yet.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td className="actions-col">
                <Tooltip title="Edit user">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(index)}
                  >
                              <EditIcon
                                  fontSize="small"
                                  sx={{ color: "#1976d2" }}   // blue
                              />

                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete user">
                  <IconButton
                    size="small"
                    onClick={() => onDelete(index)}
                  >
                    <DeleteIcon
                      fontSize="small"
                      color="error"
                    />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
