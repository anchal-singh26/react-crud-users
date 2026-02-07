import { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { userFormSchema } from "../schemas/userFormSchema";
import type { User } from "../types/user";

type Props = {
  initialData?: User;
  onSubmit: (data: User) => void; // ✅ stays void
  formError?: string;
};

function UserForm({ initialData, onSubmit, formError }: Props) {
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const originalDataRef = useRef<User | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      originalDataRef.current = initialData;
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      });
      originalDataRef.current = null;
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (name: string, value: string) => {
    let cleanedValue = value;

    if (name === "firstName" || name === "lastName") {
      cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    if (name === "phone") {
      cleanedValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    userFormSchema.forEach((field) => {
      const value = String(formData[field.name as keyof User] || "");

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (
        (field.name === "firstName" ||
          field.name === "lastName") &&
        value &&
        !/^[a-zA-Z\s]+$/.test(value)
      ) {
        newErrors[field.name] =
          `${field.label} should contain only letters`;
      }

      if (field.name === "phone" && value.length !== 10) {
        newErrors[field.name] =
          "Phone number must be 10 digits";
      }

      if (
        field.name === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.name] =
          "Enter a valid email address";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    if (!originalDataRef.current) return true;

    return userFormSchema.some((field) => {
      const key = field.name as keyof User;
      return (
        String(formData[key]) !==
        String(originalDataRef.current![key])
      );
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!hasChanges()) {
      setErrors({
        form: "No changes detected. Please update at least one field.",
      });
      return;
    }

    onSubmit(formData); // ✅ unchanged
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1.6}>
        <TextField
          label="First Name"
          size="small"
          value={formData.firstName}
          onChange={(e) =>
            handleChange("firstName", e.target.value)
          }
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          fullWidth
        />

        <TextField
          label="Last Name"
          size="small"
          value={formData.lastName}
          onChange={(e) =>
            handleChange("lastName", e.target.value)
          }
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          fullWidth
        />

        <TextField
          label="Phone Number"
          size="small"
          value={formData.phone}
          onChange={(e) =>
            handleChange("phone", e.target.value)
          }
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          inputProps={{ maxLength: 10 }}
          fullWidth
        />

        <TextField
          label="Email Address"
          size="small"
          value={formData.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />

        {formError && <Alert severity="error">{formError}</Alert>}
        {errors.form && (
          <Alert severity="warning">{errors.form}</Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ height: 42 }}
        >
          {initialData ? "Update User" : "Save User"}
        </Button>
      </Stack>
    </form>
  );
}

export default UserForm;
