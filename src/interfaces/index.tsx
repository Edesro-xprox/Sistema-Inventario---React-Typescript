//Interfaces de productos
interface Product {
  _id: string;
  name: string;
  brand: string;
  model: string;
  stock: number;
  purchasePrice: number;
  status: string;
}

//Interfaces de DataGrid
interface GridColumn {
  dataField?: string;
  caption?: string;
  width?: number | string;
  lookup?: {
    dataSource: any[];
    valueExpr: string;
    displayExpr: string;
  };
  headerFilter?: any;
  allowHeaderFiltering?: boolean;
  visible?: boolean;
  type?: "buttons";
  cellRender?: any;
  buttons?: any[];
}

interface DataGridProps {
  data: Product[];
  columns: any[]; // Assuming 'any' for now, can be more specific later
  keyExpr?: string;
  toolbarItems?: any[]; // New prop for toolbar content
  repaintChangesOnly?: boolean;
}

//Interfaces de Form
interface FormItemProps {
    dataField?: string;
    itemType?: 'simple' | 'group' | 'tabbed' | 'empty' | 'button';
    editorType?: 'dxTextBox' | 'dxSelectBox' | 'dxTextArea' | 'dxNumberBox' | 'dxCheckBox' | 'dxDateBox';
    editorOptions?: any;
    label?: {
        text?: string;
        location?: 'top' | 'left' | 'right';
        visible?: boolean;
    };
    validationRules?: any[];
    colSpan?: number;
    isRequired?: boolean;
    visible?: boolean;
}

interface FormProps {
    ref: any;
    formData: any; 
    items: FormItemProps[];
    colCount?: number;
    readOnly?: boolean;
    labelLocation?: 'top' | 'left' | 'right';
}

type FormComponentRef = {
  validate: () => any
  reset: () => void
  getFormData: () => any
}

//Interfaces de MultiView
interface MultiViewProps {
  children: React.ReactNode,
  selectedIndex?: number; // Índice de la vista actualmente seleccionada
  onSelectionChanged?: () => void;
  animationEnabled?: boolean; // Habilita/deshabilita animaciones
  swipeEnabled?: boolean; // Habilita/deshabilita la navegación con gestos de deslizamiento
}

//Toast
type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  displayTime?: number;
  onHiding?: () => void;
}

interface ToastRef {
  show: (message: string, type: ToastType) => void;
  hide: () => void;
}

//Popup
interface PopupProps {
  visible: boolean;
  onHiding?: () => void;
  title: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode | string;
  bottomButtons?: any[];
}

interface PopupRef {
  show: (title: string, description: string, onAccept?: () => void, onCancel?: () => void) => void;
  hide: () => void;
}

export type { 
    GridColumn,
    DataGridProps,
    FormItemProps,
    FormProps,
    FormComponentRef,
    MultiViewProps,
    Product,
    ToastProps,
    ToastRef,
    PopupProps,
    PopupRef
};