import AppDataGrid from '../components/DevExtremme/DataGrid.tsx';
import MultiViewComponent from '../components/DevExtremme/MultiView.tsx';
import type { GridColumn, FormItemProps, ToastProps } from '../interfaces/index';
import { useState, useMemo, useCallback } from 'react';
import { Button } from 'devextreme-react';
import FormComponent from '../components/DevExtremme/FormComponent.tsx';
import AppPopup from '../components/DevExtremme/Popup.tsx';
import AppToast from '../components/DevExtremme/Toast.tsx';
import DataApi from '../hook/DataApi.tsx';
import ProductApi from '../hook/ProductHook/ProductApi.tsx';

const Products = () => {
  const [select, setSelect] = useState({ _id: null, status: true }); //almacenar el producto seleccionado
  const [viewIndex, setViewIndex] = useState(0); //cambia de vista
  const [visible, setVisible] = useState(false); //para el popup
  const [toast, setToast] = useState<ToastProps>({
    visible: false,
    message: ''
  }); //para el toast
  const [newProduct, setNewProduct] = useState(1); //para diferenciar entre nuevo y editar

  const emptyFormData = {
    name: '',
    equipmentTypeId: null,
    brandId: null,
    modelId: null,
    providerId: null,
    locationId: null,
    serialNumber: '',
    purchaseDate: null,
    purchasePrice: null,
    stock: null,
    status: null
  };

  const [formData, setFormData] = useState(emptyFormData); //almacenar los datos del formulario

  const { brands, equipmentTypes, locations, models, providers } = DataApi(); //obtener datos de marcas, tipos de equipo, ubicaciones, modelos y proveedores
  const { products, patchProductData, putProductData, postProductData } = ProductApi(); //obtener datos de productos

  //funciones del grid
  const handleGridAdd = useCallback(() =>{
    setSelect({ _id: null, status: true });
    setNewProduct(1);
    setViewIndex(1);
    setFormData(emptyFormData);
  },[]);
  
  const handleGridEdit = useCallback((cellData: any) =>{
    setSelect(cellData.data);
    setNewProduct(0);
    setViewIndex(1);
    setFormData({
      name: cellData.data.name,
      equipmentTypeId: cellData.data.equipmentTypeId,
      brandId: cellData.data.brandId,
      modelId: cellData.data.modelId,
      providerId: cellData.data.providerId,
      locationId: cellData.data.locationId,
      serialNumber: cellData.data.serialNumber,
      purchaseDate: cellData.data.purchaseDate,
      purchasePrice: cellData.data.purchasePrice,
      stock: cellData.data.stock,
      status: cellData.data.status
    });
  },[]);
  
  const handleGridCancel = useCallback((cellData: any) =>{
    setSelect(cellData.data);
    setVisible(true);
  },[]);
  
  //toolbarItems del grid
  const toolbarItems = useMemo(() =>
    [
      {
        location: 'before',
        widget: 'dxButton',
        options: {
          icon: 'plus',
          text: 'Agregar',
          type: 'default',
          onClick: handleGridAdd
        }
      }
    ],[handleGridAdd]
  );

  //iconos de la columna estado
  const iconStatus = useCallback((cellData: any) => {
    return (
      <div className="text-center">
            {cellData.value ? <span className="dx-icon-check text-green-500"></span> : <span className="dx-icon-close text-red-500"></span>}
      </div>
    )
  },[]);

  

  //botones de la última columna
  const renderActionButtons = useCallback((cellData: any) =>{
    return (
      <div className="flex gap-1 justify-center">
                <Button
                    hint="Editar"
                    icon="edit"
                    onClick= {() => handleGridEdit(cellData)}
                />
                <Button
                    hint={cellData.data.status ? 'Desactivar' : 'Activar'}
                    icon={cellData.data.status ? 'close' : 'check'}
                    onClick={() => handleGridCancel(cellData)}
                />
            </div>
    )
  },[handleGridEdit, handleGridCancel]);

  //columnas del grid
  const columns = useMemo<GridColumn[]>(() =>[
    { dataField: "_id", caption: "ID", visible: false },
    { dataField: "name", caption: "Producto", allowHeaderFiltering: false },
    { dataField: "brandId", caption: "Marca", allowHeaderFiltering: false,
      lookup: {
        dataSource: brands,
        valueExpr: '_id',
        displayExpr: 'name'
      }
    },
    { dataField: "modelId", caption: "Modelo", allowHeaderFiltering: false,
      lookup: {
        dataSource: models,
        valueExpr: '_id',
        displayExpr: 'name'
      }
    },
    { dataField: "stock", caption: "Stock", width: 100, allowHeaderFiltering: false },
    { dataField: "purchasePrice", caption: "Precio", width: 120, allowHeaderFiltering: false },
    { dataField: "status", caption: "Estado", width: 120, headerFilter: {
        dataSource: [
          { text: "Activo", value: true },
          { text: "Inactivo", value: false }
        ]
      },
      cellRender: (cellData: any) => iconStatus(cellData)
    },
    { dataField: "equipmentTypeId", caption: "Tipo de equipo", width: 120, visible: false },
    { dataField: "providerId", caption: "Proveedor", visible: false },
    { dataField: "locationId", caption: "Ubicación", visible: false },
    { dataField: "serialNumber", caption: "Número de serie", visible: false },
    { dataField: "purchaseDate", caption: "Fecha de compra", visible: false },
    {
      type: 'buttons',
      width: 110,
      cellRender: (cellData: any) => renderActionButtons(cellData)
    }
  ],[brands, models, handleGridEdit, handleGridCancel]);

  //FormComponent props
  const items: FormItemProps[] = useMemo(() => [
  {
    dataField: 'name',
    label: { text: 'Nombre' },
    editorType: 'dxTextBox',
    editorOptions: {
      placeholder: 'Ingrese el nombre del producto'
    },
    validationRules: [
      { type: 'required', message: 'El nombre del producto es obligatorio' }
    ]
  },
  {
    dataField: 'equipmentTypeId',
    label: { text: 'Tipo de equipo' },
    editorType: 'dxSelectBox',
    editorOptions: {
      placeholder: 'Seleccione un tipo de equipo',
      dataSource: equipmentTypes,
      valueExpr: '_id',
      displayExpr: 'name'
    },
    validationRules: [
      { type: 'required', message: 'El tipo de equipo es obligatorio' }
    ]
  },
  {
    dataField: 'brandId',
    label: { text: 'Marca' },
    editorType: 'dxSelectBox',
    editorOptions: {
      placeholder: 'Seleccione una marca',
      dataSource: brands,
      valueExpr: '_id',
      displayExpr: 'name'
    },
    validationRules: [
      { type: 'required', message: 'La marca es obligatoria' }
    ]
  },
  {
    dataField: 'modelId',
    label: { text: 'Modelo' },
    editorType: 'dxSelectBox',
    editorOptions: {
      placeholder: 'Seleccione un modelo',
      dataSource: models,
      valueExpr: '_id',
      displayExpr: 'name'
    },
    validationRules: [
      { type: 'required', message: 'El modelo es obligatorio' }
    ]
  },
  {
    dataField: 'providerId',
    label: { text: 'Proveedor' },
    editorType: 'dxSelectBox',
    editorOptions: {
      placeholder: 'Seleccione un proveedor',
      dataSource: providers,
      valueExpr: '_id',
      displayExpr: 'name'
    }
  },
  {
    dataField: 'locationId',
    label: { text: 'Ubicación' },
    editorType: 'dxSelectBox',
    editorOptions: {
      placeholder: 'Seleccione una ubicación',
      dataSource: locations,
      valueExpr: '_id',
      displayExpr: 'name'
    }
  },
  {
    dataField: 'serialNumber',
    label: { text: 'Número de serie' },
    editorType: 'dxTextBox',
    editorOptions: {
      placeholder: 'Ingrese el número de serie'
    },
    validationRules: [
      { type: 'required', message: 'El número de serie es obligatorio' }
    ]
  },
  {
    dataField: 'purchaseDate',
    label: { text: 'Fecha de compra' },
    editorType: 'dxDateBox',
    editorOptions: {
      type: 'date'
    }
  },
  {
    dataField: 'purchasePrice',
    label: { text: 'Precio de compra' },
    editorType: 'dxNumberBox',
    editorOptions: {
      placeholder: 'Ingrese el precio de compra',
      format: '#,##0.00',
      min: 0
    }
  },
  {
    dataField: 'stock',
    label: { text: 'Stock' },
    editorType: 'dxNumberBox',
    editorOptions: {
      placeholder: 'Ingrese el stock',
      min: 0
    }
  }
  ], [brands, models, equipmentTypes, locations, providers]);

  //funciones de popup
  const handlePopupVisible = useCallback<any>(() =>{
    setVisible(false);
  },[]);

  //Buttons de popup
  const handlePopupAceppt = useCallback(async () =>{
    try{
      const status = select.status ? 0 : 1;
      const resU = await patchProductData(select._id, status);
      if(resU){
        setVisible(false);
        setToast({
          visible: true,
          message: status == 1 ? 'Producto activado' : 'Producto desactivado',
          type: 'success',
        });
      }
    }catch(e: any){
      console.error(e);
      setToast({ visible: true, message: e.response.data.message, type: 'warning' })
    }
  }, [select])

  const handlePopupCancel = useCallback(() =>{
    setVisible(false);
  }, [])

  const buttons = useMemo<any[]>(() =>
    [
      {
        toolbar: 'bottom',
        widget: 'dxButton',
        options:{
          text: 'Aceptar',
          type: 'default',
          icon: 'check',
          onClick: handlePopupAceppt
        }
      },
      {
        toolbar: 'bottom',
        widget: 'dxButton',
        options:{
          text: 'Cancelar',
          type: 'normal',
          icon: 'close',
          onClick: handlePopupCancel
        }
      }
    ],[handlePopupAceppt, handlePopupCancel]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      {/* Example content */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <MultiViewComponent selectedIndex={viewIndex} animationEnabled={true} swipeEnabled={true}>
          <AppDataGrid
            data={products}
            columns={columns}
            keyExpr="_id"
            toolbarItems={toolbarItems}
          />
          <>
            <div className='flex justify-between items-center mb-3'>
              <h1>{newProduct === 1 ? "Nuevo Producto" : "Editar Producto"}</h1>
              <div className='flex gap-3'>
                <Button
                  icon="save"
                  text="Guardar"
                  onClick={async () => {
                    try{
                      const modifyFormData = {...formData, status: true};
                      let resU, resA;

                      if(newProduct == 1){
                        resA = await postProductData(modifyFormData);
                      }else{
                        resU = await putProductData(select._id,formData);
                      }

                      if(resA || resU){
                        setViewIndex(0);
                        setToast({
                          visible: true,
                          message: resA ? 'Producto guardado con éxito' : 'Producto actualizado con éxito',
                          type: 'success',
                        });
                      }
                    }catch(e: any){
                      console.error(e);
                      setToast({ visible: true, message: e.response.data.message, type: 'warning' })
                    }
                  }}
                  type="success"
                />
                <Button
                  icon="arrowleft"
                  text="Volver"
                  onClick={() => setViewIndex(0)}
                />
              </div>
            </div>
            <FormComponent
              formData={formData}
              items={items}
              colCount={2}
              readOnly={false}
              labelLocation="top"
            />
          </>
        </MultiViewComponent>
      </div>

      <AppToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        displayTime={toast?.displayTime}
        onHiding={() => setToast({...toast, visible: false })}
      />
      <AppPopup visible={visible} onHiding={handlePopupVisible} title={select.status ? 'Desactivar' : 'Activar'} width={300} height={200} bottomButtons={buttons}>
        <p className='text-center'>{`¿Desea ${select.status ? 'desactivar ' : 'activar'} este registro?`}</p>
      </AppPopup>
    </div>
  );
};

export default Products;