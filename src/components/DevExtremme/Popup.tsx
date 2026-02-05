import Popup from 'devextreme-react/popup';
import type { PopupProps } from '../../interfaces';

function AppPopup({ visible, onHiding, title, width = 600, height = 'auto', children, bottomButtons }: PopupProps) {
    return (
        <Popup
            visible= {visible}
            onHiding={onHiding}
            title={title}
            width={width}
            height={height}
            showTitle={true}
            dragEnabled={true}
            toolbarItems={bottomButtons}
        > 
            {children}
        </Popup>
    );
}

export default AppPopup