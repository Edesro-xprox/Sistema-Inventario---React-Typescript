import Toast from "devextreme-react/toast";
import type { ToastProps } from "../../interfaces";

function AppToast({ visible, message, type = "info", displayTime = 5000, onHiding }: ToastProps) {
    return (
        <Toast
            visible={visible}
            message={message}
            type={type}
            displayTime={displayTime}
            onHiding={onHiding}
        />
    );
};

export default AppToast;