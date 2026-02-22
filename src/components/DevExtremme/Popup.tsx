import { useState, forwardRef, useImperativeHandle } from "react";
import Popup from "devextreme-react/popup";
import { Button } from "devextreme-react/button";

const AppPopup = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onAccept, setOnAccept] = useState<(() => void) | null>(null);
  const [onCancel, setOnCancel] = useState<(() => void) | null>(null);

  useImperativeHandle(ref, () => ({
    show(title: string, description: string, onAccept?: () => void, onCancel?: () => void) {
      setTitle(title);
      setDescription(description);
      setOnAccept(() => onAccept);
      setOnCancel(() => onCancel);
      setVisible(true);
    },
    hide() {
      setVisible(false);
    }
  }));

  return (
    <Popup
      visible={visible}
      title={title}
      width={400}
      height="auto"
      showCloseButton={true}
      onHiding={() => setVisible(false)}
    >
      <div className="p-4">
        <p className="mb-6 text-center">{description}</p>

        <div className="flex justify-center gap-3">
          <Button
            text="Cancelar"
            type="normal"
            onClick={() => {
              onCancel?.();
              setVisible(false);
            }}
          />

          <Button
            text="Aceptar"
            type="success"
            onClick={() => {
              onAccept?.();
              setVisible(false);
            }}
          />
        </div>
      </div>
    </Popup>
  );
});

export default AppPopup;