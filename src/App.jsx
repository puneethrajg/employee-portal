import React, { useCallback, useEffect, useState } from 'react';
import "./styles.css";
import EmployeeTable from './components/EmployeeTable.jsx';
import EmployeeFormPanel from './components/EmployeeFormPanel.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from './api/employeeApi.js';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [saving, setSaving] = useState(false);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setLoadError(err.message || 'Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  function openAddPanel() {
    setEditingEmployee(null);
    setPanelOpen(true);
  }

  function openEditPanel(employee) {
    setEditingEmployee(employee);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditingEmployee(null);
  }

  async function handleFormSubmit(values) {
    setSaving(true);
    try {
      if (editingEmployee) {
        const updated = await updateEmployee(editingEmployee.eid, values);
        setEmployees((prev) => prev.map((e) => (e.eid === updated.eid ? updated : e)));
      } else {
        const created = await createEmployee(values);
        setEmployees((prev) => [...prev, created]);
      }
      closePanel();
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteEmployee(pendingDelete.eid);
      setEmployees((prev) => prev.filter((e) => e.eid !== pendingDelete.eid));
      setPendingDelete(null);
    } catch (err) {
      setLoadError(err.message || 'Could not delete that record.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-header__eyebrow">Emp Portal</p>
          <h1>Roster</h1>
        </div>
        <button type="button" className="button button--primary" onClick={openAddPanel}>
          Add employee
        </button>
      </header>

      <main className="app-main">
        {loadError && (
          <div className="banner banner--error">
            <p>{loadError}</p>
            <button type="button" className="link-button" onClick={loadEmployees}>
              Retry
            </button>
          </div>
        )}

        <EmployeeTable
          employees={employees}
          loading={loading}
          onEdit={openEditPanel}
          onDelete={setPendingDelete}
        />
      </main>

      <EmployeeFormPanel
        open={panelOpen}
        editingEmployee={editingEmployee}
        onClose={closePanel}
        onSubmit={handleFormSubmit}
        saving={saving}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove this employee?"
        body={pendingDelete ? `${pendingDelete.ename} (ID ${pendingDelete.eid}) will be deleted permanently.` : ''}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
        busy={deleting}
      />
    </div>
  );
}