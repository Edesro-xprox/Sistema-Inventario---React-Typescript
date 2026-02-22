import { useState, forwardRef, useImperativeHandle } from "react";
import Toast from "devextreme-react/toast";
import type { ToastProps } from "../../interfaces/index.tsx";

const AppToast = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastProps['type']>("info");

  useImperativeHandle(ref, () => ({
    show(message: string, type: ToastProps['type']) {
      setMessage(message);
      setType(type);
      setVisible(true);
    },
    hide() {
      setVisible(false);
    }
  }));

  return (
    <Toast
      visible={visible}
      message={message}
      type={type}
      displayTime={3000}
      onHiding={() => setVisible(false)}
    />
  );
});

export default AppToast;