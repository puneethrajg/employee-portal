import React from 'react';

export default function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onCancel, busy }) {
  if (!open) return null;

  return (
    <div className="overlay" role="alertdialog" aria-label={title}>
      <div className="confirm-card">
        <p className="confirm-card__title">{title}</p>
        <p className="confirm-card__body">{body}</p>
        <div className="confirm-card__actions">
          <button type="button" className="button button--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="button button--danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Removing…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}