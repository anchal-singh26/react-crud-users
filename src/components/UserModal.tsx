import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import type { User } from "../types/user";
import UserForm from "./UserForm";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: User;
  onSubmit: (data: User) => Promise<boolean>;
  formError?: string;
};

function UserModal({
  open,
  onClose,
  initialData,
  onSubmit,
  formError,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth={false}
      PaperProps={{
        sx: {
          width: "420px",      // ✅ reduced width
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {initialData ? "Update User" : "Add User"}
      </DialogTitle>

      <DialogContent
        className="user-form-wrapper"
        sx={{ pt: 2.5 }}
      >
        <UserForm
          initialData={initialData}
          formError={formError}
          onSubmit={(data) => {
            onSubmit(data).then((success) => {
              if (success) {
                onClose();
              }
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UserModal;
