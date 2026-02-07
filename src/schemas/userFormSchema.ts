export type UserFormField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
};

export const userFormSchema: UserFormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter last name",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "Enter phone number",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "Enter email address",
  },
];
