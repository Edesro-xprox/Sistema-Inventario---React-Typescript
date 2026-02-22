import MultiViewComponent from '../components/DevExtremme/MultiView.tsx';
import type { GridColumn, FormItemProps, ToastRef, PopupRef } from '../interfaces/index';
import { useState, useMemo, useCallback, useRef } from 'react';
import { Button } from 'devextreme-react';
import AppDataGrid from '../components/DevExtremme/DataGrid.tsx';
import FormComponent from '../components/DevExtremme/FormComponent.tsx';
import DataApi from '../hook/DataApi.tsx';
import ProductApi from '../hook/ProductHook/ProductApi.tsx';
import AppPopup from '../components/DevExtremme/Popup.tsx';
import AppToast from '../components/DevExtremme/Toast.tsx';

const emptyFormData = {
  equipmentTypeId: null,
  brandId: null,
  modelId: null,
  providerId: null,
  locationId: null,
  serialNumber: '',
  purchaseDate: null,
  purchasePrice: null,
  status: null
};

const Products = () => {
  const { brands, equipmentTypes, locations, models, providers } = DataApi();
  const { products, patchProductData, putProductData, postProductData } = ProductApi();

  const [select, setSelect] = useState({ _id: null, status: true });
  const [viewIndex, setViewIndex] = useState(0);
  const [newProduct, setNewProduct] = useState(1);
  const [formData, setFormData] = useState(emptyFormData);
  const [modelFlt, setModelFlt] = useState([]);

  const formRef = useRef<any>(null);
  const popupRef = useRef<PopupRef>(null);
  const toastRef = useRef<ToastRef>(null);

  const handleGridAdd = useCallback(() => {
    setSelect({ _id: null, status: true });
    setNewProduct(1);
    setViewIndex(1);
    setFormData(emptyFormData);
  }, []);

  const handleGridEdit = useCallback((cellData: any) => {
    setSelect(cellData.data);
    setNewProduct(0);
    setViewIndex(1);

    const { _id, ...dataWithoutId } = cellData.data; 

    setFormData(dataWithoutId);
  }, []);

  const handleGridCancel = useCallback((cellData: any) => {
    setSelect(cellData.data);
    popupRef.current?.show(
      "Confirmación",
      "¿Desea cambiar el estado del producto?",
      async () => {
        try {
          const selectRow = cellData.data;
          const status = selectRow.status ? 0 : 1;
          const response = await patchProductData(selectRow._id, status);

          if (response) {
            popupRef.current?.hide();
            toastRef.current?.show(`Producto ${status ? 'activado' : 'desactivado'} exitosamente`, 'success');
          }
        } catch (e: any) {
          toastRef.current?.show('Error al actualizar el producto', 'error');
        }
      }
    );
  }, [patchProductData]);

  const toolbarItems = useMemo(() => [
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
  ], [handleGridAdd]);

  const iconStatus = useCallback((cellData: any) => (
    <div className="text-center">
      {cellData.value
        ? <span className="dx-icon-check text-green-500"></span>
        : <span className="dx-icon-close text-red-500"></span>}
    </div>
  ), []);

  const renderActionButtons = useCallback((cellData: any) => (
    <div className="flex gap-1 justify-center">
      <Button
        hint="Editar"
        icon="edit"
        onClick={() => handleGridEdit(cellData)}
      />
      <Button
        hint={cellData.data.status ? 'Desactivar' : 'Activar'}
        icon={cellData.data.status ? 'close' : 'check'}
        onClick={() => handleGridCancel(cellData)}
      />
    </div>
  ), [handleGridEdit, handleGridCancel]);

  const columns = useMemo<GridColumn[]>(() => [
    { dataField: "_id", visible: false },
    {
      dataField: "equipmentTypeId",
      caption: "Tipo de equipo",
      lookup: { dataSource: equipmentTypes, valueExpr: '_id', displayExpr: 'name' }
    },
    {
      dataField: 'serialNumber',
      caption: 'Número de Serie'
    },
    {
      dataField: "brandId",
      caption: "Marca",
      lookup: { dataSource: brands, valueExpr: '_id', displayExpr: 'name' }
    },
    {
      dataField: "modelId",
      caption: "Modelo",
      lookup: { dataSource: models, valueExpr: '_id', displayExpr: 'name' }
    },
    {
      dataField: "providerId",
      caption: "Proveedor",
      lookup: { dataSource: providers, valueExpr: '_id', displayExpr: 'name' }
    },
    { dataField: "purchasePrice", width: 120 },
    {
      dataField: "status",
      caption: "Estado",
      width: 120,
      cellRender: iconStatus
    },
    {
      type: 'buttons',
      width: 110,
      cellRender: renderActionButtons
    }
  ], [brands, models, iconStatus, renderActionButtons]);

  const items: FormItemProps[] = useMemo(() => [
    {
      dataField: 'brandId',
      label: { text: 'Marca' },
      editorType: 'dxSelectBox',
      editorOptions: {
        placeholder: 'Seleccione una marca',
        dataSource: brands,
        valueExpr: '_id',
        displayExpr: 'name',
        onValueChanged: (e: any) =>{
          let mdlFlt = models.filter((mdl: any) => mdl.brandId == e.value);
          setModelFlt(mdlFlt);
        }
      },
      validationRules: [{ type: 'required' }]
    },
    {
      dataField: 'modelId',
      label: { text: 'Modelo' },
      editorType: 'dxSelectBox',
      editorOptions: {
        placeholder: 'Seleccione un modelo',
        dataSource: modelFlt,
        valueExpr: '_id',
        displayExpr: 'name',
        disabled: !formData.brandId
      },
      validationRules: [{ type: 'required' }]
    },
    {
      dataField: 'equipmentTypeId',
      label: { text: 'Tipo de Equipo' },
      editorType: 'dxSelectBox',
      editorOptions: {
        placeholder: 'Seleccione un tipo de equipo',
        dataSource: equipmentTypes,
        valueExpr: '_id',
        displayExpr: 'name'
      },
      validationRules: [{ type: 'required' }]
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
      },
      validationRules: [{ type: 'required' }]
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
      },
      validationRules: [{ type: 'required' }]
    },
    {
      dataField: 'serialNumber',
      label: { text: 'Número de Serie' },
      editorType: 'dxTextBox',
      editorOptions:{
        placeholder: 'Ingrese el número de serie'
      }      
    },
    {
      dataField: 'purchaseDate',
      label: { text: 'Fecha de Compra' },
      editorType: 'dxDateBox',
      editorOptions: {
        placeholder: 'Seleccione la fecha de compra',
        displayFormat: 'dd/MM/yyyy'
      }
    },
    {
      dataField: 'purchasePrice',
      label: { text: 'Precio de Compra' },
      editorType: 'dxNumberBox',
      editorOptions: {
        placeholder: 'Ingrese el precio de compra',
        format: 'currency',
        currency: 'USD'
      },
      validationRules: [{ type: 'required' }]
    }
  ], [brands, modelFlt, equipmentTypes, providers, locations]);

  const handleSave = useCallback(async () => {
    try {
      let response;
      
      const validation = formRef.current?.instance.validate();

      if (!validation.isValid) {
        toastRef.current?.show('Por favor, complete todos los campos requeridos', 'warning');
        return;
      }

      if (newProduct === 1) {
        response = await postProductData({ ...formData, status: true });
      } else {
        response = await putProductData(select._id, formData);
      }

      if (response) {
        setViewIndex(0);
      }
    } catch (e: any) {
    }
  }, [formData, newProduct, select._id, postProductData, putProductData]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <MultiViewComponent selectedIndex={viewIndex}>
          <AppDataGrid
            data={products}
            columns={columns}
            keyExpr="_id"
            toolbarItems={toolbarItems}
          />

          <>
            <div className='flex justify-between mb-3'>
              <h1>{newProduct === 1 ? "Nuevo Producto" : "Editar Producto"}</h1>
              <div className='flex gap-3'>
                <Button icon="save" text="Guardar" onClick={handleSave} type="success" />
                <Button icon="arrowleft" text="Volver" onClick={() => setViewIndex(0)} />
              </div>
            </div>

            <FormComponent
              ref={formRef}
              formData={formData}
              items={items}
              colCount={2}
              readOnly={false}
              labelLocation="top"
            />
          </>
        </MultiViewComponent>

        <AppPopup ref={popupRef} />
        <AppToast ref={toastRef}/>
      </div>
    </div>
  );
};

export default Products;