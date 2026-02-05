import type { FormItemProps, FormProps } from '../../interfaces/index';
import { Form, Item } from 'devextreme-react/form';
import { useRef } from 'react'

function FormComponent({formData, items, colCount = 1, readOnly = false, labelLocation = 'left'}: FormProps) {
    const formRef = useRef<Form>(null);

    // Función auxiliar para renderizar los items de forma recursiva (para grupos anidados)
    const renderFormItems = (formItems: FormItemProps[]) => {
        return formItems.map((item) => {
            return <Item key={item.dataField} {...item}/>
        });
    }

    return (
        <Form
        ref={formRef}
        formData={formData}
        colCount={colCount}
        readOnly={readOnly}
        labelLocation={labelLocation}
        >
        {renderFormItems(items)}
        </Form>
    );
};

export default FormComponent;
