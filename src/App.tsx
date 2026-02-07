import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import type { User } from "./types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/userService";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [originalPhone, setOriginalPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ NEW

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddOrUpdateUser = async (
    user: User
  ): Promise<boolean> => {
    if (editingUserId && user.phone === originalPhone) {
      try {
        await updateUser(editingUserId, user);
        setEditingUserId(null);
        setOriginalPhone(null);
        setFormError("");
        await loadUsers();
        showSuccess("User updated successfully");
        return true;
      } catch {
        setFormError("Failed to save user");
        return false;
      }
    }

    const phoneAlreadyExists = users.some(
      (u) => u.phone === user.phone && u.id !== editingUserId
    );

    if (phoneAlreadyExists) {
      setFormError("Phone number already exists");
      return false;
    }

    try {
      if (editingUserId === null) {
        await createUser(user);
        showSuccess("User added successfully");
      } else {
        await updateUser(editingUserId, user);
        showSuccess("User updated successfully");
        setEditingUserId(null);
        setOriginalPhone(null);
      }

      setFormError("");
      await loadUsers();
      return true;
    } catch {
      setFormError("Failed to save user");
      return false;
    }
  };

  const handleEditUser = (index: number) => {
    const user = users[index];
    setEditingUserId(user.id ?? null);
    setOriginalPhone(user.phone);
    setFormError("");
    setModalOpen(true);
  };

  const handleDeleteUser = async (index: number) => {
    const userToDelete = users[index];
    if (!userToDelete.id) return;

    await deleteUser(userToDelete.id);
    await loadUsers();
    showSuccess("User deleted successfully");
  };

  return (
    <div className="page-wrapper">
      <div className="top-bar">
        <h5>User Management System</h5>

        <button
          className="add-user-btn"
          onClick={() => {
            setEditingUserId(null);
            setOriginalPhone(null);
            setFormError("");
            setModalOpen(true);
          }}
        >
          + Add User
        </button>
      </div>

      <UserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setFormError("");
          setEditingUserId(null);
          setOriginalPhone(null);
        }}
        initialData={
          editingUserId !== null
            ? users.find((u) => u.id === editingUserId)
            : undefined
        }
        onSubmit={handleAddOrUpdateUser}
        formError={formError}
      />

      {loading && <p className="info-text">Loading users...</p>}

      {successMessage && (
        <div className="success-banner">
          {successMessage}
        </div>
      )}

      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default App;
