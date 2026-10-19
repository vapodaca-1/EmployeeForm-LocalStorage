import React from "react";
import "../EmployeeForm.css";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      title: "",
      department: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.employeeToEdit &&
      this.props.employeeToEdit !== prevProps.employeeToEdit
    ) {
      this.setState({
        name: this.props.employeeToEdit.name,
        email: this.props.employeeToEdit.email,
        title: this.props.employeeToEdit.title,
        department: this.props.employeeToEdit.department
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const employee = {
      name: this.state.name,
      email: this.state.email,
      title: this.state.title,
      department: this.state.department
    };

    this.props.addEmployee(employee);

    this.setState({
      name: "",
      email: "",
      title: "",
      department: ""
    });
  };

  render() {
    return (
      <div className="employee-form-container">
        <h2>
          {this.props.employeeToEdit
            ? "Edit Employee"
            : "Add Employee"}
        </h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label>Job Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
              required
            />
          </div>

          <button type="submit">
            {this.props.employeeToEdit
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;