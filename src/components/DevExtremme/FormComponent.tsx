import { forwardRef } from 'react';
import type { FormItemProps, FormProps } from '../../interfaces/index';
import { Form, Item } from 'devextreme-react/form';

const FormComponent = forwardRef<any, FormProps>(
  ({ formData, items, colCount = 1, readOnly = false, labelLocation = 'left' }, ref) => {

    const renderFormItems = (formItems: FormItemProps[]) => {
      return formItems.map((item) => (
        <Item key={item.dataField} {...item} />
      ));
    };

    return (
      <Form
        ref={ref}
        formData={formData}
        colCount={colCount}
        readOnly={readOnly}
        labelLocation={labelLocation}
      >
        {renderFormItems(items)}
      </Form>
    );
  }
);

export default FormComponent;