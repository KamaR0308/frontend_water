import React, { memo } from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const ValidateInput = memo(function CustomInput(props) {
    const { name, ...restProps } = props;

    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...restProps,
        fullWidth: true,
        variant: restProps.variant || 'outlined'
    };

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return <TextField {...configTextField} />;
});

export default ValidateInput;
