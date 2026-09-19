import React from "react";

function formatSalary(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function EmployeeTable({
  employees,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className="table-status">Loading employees…</p>;
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">No employees yet</p>
        <p className="empty-state__body">
          Add the first record to start the roster.
        </p>
      </div>
    );
  }

  return (
    <table className="roster-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>State</th>
          <th>Salary</th>
          <th aria-label="Actions"></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.eid}>
            <td className="mono">{emp.eid}</td>
            <td>{emp.ename}</td>
            <td>{emp.age ?? "—"}</td>
            <td>{emp.city || "—"}</td>
            <td>{emp.state || "—"}</td>
            <td className="mono">{formatSalary(emp.salary)}</td>
            <td className="row-actions">
              <button
                type="button"
                className="link-button"
                onClick={() => onEdit(emp)}
              >
                Edit
              </button>
              <button
                type="button"
                className="link-button link-button--danger"
                onClick={() => onDelete(emp)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
