import { Button } from "@/components/ui";
import Modal from "./Modal";

export default function ConfirmModal({ children, onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <div>{children}</div>
      <div className="flex gap-2 items-center justify-end mt-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
          variant="destructive"
        >
          Yes
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
          variant="secondary"
        >
          Cancel
        </Button>

      </div>
    </Modal>
  );
}

