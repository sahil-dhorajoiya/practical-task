import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  position: Yup.string().required("Position is required"),
  department: Yup.string().required("Department is required"),
  joinDate: Yup.date().required("Join Date is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});
