import React from 'react';
import { Field } from 'formik';

const Checkbox = props => {
  return (
    <Field name={props.name}>
      {({ field, form }) => {
        return (
          <div className="ui toggle checkbox">
            <input
              type="checkbox"
              {...props}
              checked={field.value.includes(props.value)}
              onChange={() => {
                if (field.value.includes(props.value)) {
                  const nextValue = field.value.filter(
                    value => value !== props.value
                  );
                  form.setFieldValue(props.name, nextValue);
                } else {
                  const nextValue = field.value.concat(props.value);
                  form.setFieldValue(props.name, nextValue);
                }
              }}
            />
            <label>{props.value}</label>
          </div>
        );
      }}
    </Field>
  );
};

export default Checkbox;
