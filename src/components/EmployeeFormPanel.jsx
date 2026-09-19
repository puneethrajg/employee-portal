import React, { useEffect, useState } from 'react';

const EMPTY_FORM = { ename: '', age: '', city: '', state: '', salary: '' };

export default function EmployeeFormPanel({ open, editingEmployee, onClose, onSubmit, saving }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        ename: editingEmployee.ename || '',
        age: editingEmployee.age ?? '',
        city: editingEmployee.city || '',
        state: editingEmployee.state || '',
        salary: editingEmployee.salary ?? ''
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError(null);
  }, [editingEmployee, open]);

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.ename.trim()) {
      setError('Name is required.');
      return;
    }
    setError(null);
    try {
      await onSubmit({
        ename: form.ename.trim(),
        age: form.age === '' ? null : Number(form.age),
        city: form.city.trim(),
        state: form.state.trim(),
        salary: form.salary === '' ? null : Number(form.salary)
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    }
  }

  if (!open) return null;

  return (
    <aside className="panel" role="dialog" aria-label={editingEmployee ? 'Edit employee' : 'Add employee'}>
      <div className="panel__header">
        <h2>{editingEmployee ? `Edit ${editingEmployee.ename}` : 'Add employee'}</h2>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <form className="panel__form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            value={form.ename}
            onChange={handleChange('ename')}
            placeholder="e.g. Priya Nair"
            autoFocus
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Age</span>
            <input type="number" min="18" max="80" value={form.age} onChange={handleChange('age')} />
          </label>
          <label className="field">
            <span>Salary (₹)</span>
            <input type="number" min="0" step="1000" value={form.salary} onChange={handleChange('salary')} />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>City</span>
            <input type="text" value={form.city} onChange={handleChange('city')} placeholder="e.g. Hyderabad" />
          </label>
          <label className="field">
            <span>State</span>
            <input type="text" value={form.state} onChange={handleChange('state')} placeholder="e.g. Telangana" />
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="panel__actions">
          <button type="button" className="button button--ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="button button--primary" disabled={saving}>
            {saving ? 'Saving…' : editingEmployee ? 'Save changes' : 'Add employee'}
          </button>
        </div>
      </form>
    </aside>
  );
}