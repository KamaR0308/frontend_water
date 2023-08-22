import React, { memo } from 'react';
import TextField from '@mui/material/TextField';
import { useField, useFormikContext } from 'formik';

const ValidateSelect = memo(({ name, options, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (evt) => {
        const { value } = evt.target;
        setFieldValue(name, value);
    };

    const configSelect = {
        ...props,
        ...field,
        variant: props.variant || 'outlined',
        select: true,
        SelectProps: { native: true },
        fullWidth: true,
        onChange: handleChange,
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
            {options.map((item, idx) => (
                <option key={idx} value={item}>
                    {item}
                </option>
            ))}
        </TextField>
    );
});

export default ValidateSelect;
