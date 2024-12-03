import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppDispatch, RootState } from "./store/store";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./store/employeeSlice";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";
import { Modal } from "./components/Modal";
import type { Employee } from "./types/employee";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, error } = useSelector(
    (state: RootState) => state.employees
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const handleAddEmployee = (employeeData: Employee) => {
    dispatch(addEmployee(employeeData));
    setIsModalOpen(false);
  };

  const handleUpdateEmployee = (employeeData: Employee) => {
    if (selectedEmployee) {
      dispatch(updateEmployee({ ...employeeData, id: selectedEmployee.id }));
      setIsModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteEmployee = () => {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete.id));
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  if (status === "loading") {
    return <div className="loading-state">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <Container maxWidth="xl">
        <div className="content-wrapper">
          <div className="header">
            <Typography variant="h4" component="h1" className="page-title">
              Employee Management
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Employee
            </Button>
          </div>

          <div className="main-content">
            <EmployeeList
              employees={employees}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
          onCancel={handleModalClose}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        title="Confirm Delete"
      >
        <Typography>
          Are you sure you want to delete{" "}
          <strong>
            {employeeToDelete?.firstName} {employeeToDelete?.lastName}
          </strong>
          ?
        </Typography>
        <div className="form-actions">
          <Button variant="outlined" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDeleteEmployee}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
