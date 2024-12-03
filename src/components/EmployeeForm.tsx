import { Formik, FormikHelpers } from "formik";
import { TextField, Button, Grid } from "@mui/material";
import type { Employee } from "../types/employee";
import "../styles/EmployeeForm.css";
import { validationSchema } from "../utiles/validations";

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
}

interface FormikValues extends Employee {}

export function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const initialValues: FormikValues = {
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    position: employee?.position || "",
    department: employee?.department || "",
    joinDate: employee?.joinDate || "",
    phoneNumber: employee?.phoneNumber || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }: FormikHelpers<FormikValues>) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="employee-form">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={values.position}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position && errors.position}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.department && Boolean(errors.department)}
                helperText={touched.department && errors.department}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Join Date"
                name="joinDate"
                type="date"
                value={values.joinDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.joinDate && Boolean(errors.joinDate)}
                helperText={touched.joinDate && errors.joinDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Grid>
          </Grid>

          <div className="form-actions">
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              {employee ? "Update" : "Add"} Employee
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
