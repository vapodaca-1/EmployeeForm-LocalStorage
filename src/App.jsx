import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import EmployeeForm from "./components/EmployeeForm";

function Home() {
  return (
    <div>
      <h1>Employee Management System</h1>
      <p>Welcome to the Home Page.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        This application demonstrates React forms,
        event handling, React Router,
        and Local Storage.
      </p>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedEmployees =
      localStorage.getItem("employees");

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  const saveData = (employeeData) => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employeeData)
    );
  };

  const addEmployee = (employee) => {
    if (editingIndex !== null) {
      const updatedEmployees = [...employees];

      updatedEmployees[editingIndex] = employee;

      setEmployees(updatedEmployees);
      saveData(updatedEmployees);

      setEditingIndex(null);
    } else {
      const updatedEmployees = [
        ...employees,
        employee
      ];

      setEmployees(updatedEmployees);
      saveData(updatedEmployees);
    }
  };

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter(
      (_, i) => i !== index
    );

    setEmployees(updatedEmployees);
    saveData(updatedEmployees);

    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const editEmployee = (index) => {
    setEditingIndex(index);
  };

  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "15px",
          backgroundColor: "#1e3a8a"
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px"
          }}
        >
          Home
        </Link>

        <Link
          to="/employee"
          style={{
            color: "white",
            marginRight: "20px"
          }}
        >
          Employee Form
        </Link>

        <Link
          to="/about"
          style={{ color: "white" }}
        >
          About
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/employee"
          element={
            <div>
              <EmployeeForm
                addEmployee={addEmployee}
                employeeToEdit={
                  editingIndex !== null
                    ? employees[editingIndex]
                    : null
                }
              />

              <h2>Employee List</h2>

              <p>
                Currently Editing:
                {" "}
                {editingIndex !== null
                  ? editingIndex
                  : "None"}
              </p>

              {employees.length === 0 ? (
                <p>No employees added.</p>
              ) : (
                <ul>
                  {employees.map(
                    (employee, index) => (
                      <li key={index}>
                        <strong>
                          {employee.name}
                        </strong>
                        {" | "}
                        {employee.email}
                        {" | "}
                        {employee.title}
                        {" | "}
                        {employee.department}

                        <button
                          onClick={() =>
                            editEmployee(index)
                          }
                          style={{
                            marginLeft: "10px"
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteEmployee(index)
                          }
                          style={{
                            marginLeft: "10px"
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;