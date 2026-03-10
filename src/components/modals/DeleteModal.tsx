interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">Are you sure you want to delete this item?</h3>
        <div className="modal-footer">
          <button className="btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}