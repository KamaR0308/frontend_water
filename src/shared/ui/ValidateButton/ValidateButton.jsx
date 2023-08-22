import React, { memo } from 'react';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

const ValidateButton = memo(function ValidateButton(props) {
    const { children, ...restProps } = props;

    const { isValid, resetForm } = useFormikContext();

    const handleSubmit = async () => {
        setTimeout(() => {
            resetForm();
        }, 700);
    };

    const configButton = {
        ...restProps,
        variant: restProps.variant || 'contained',
        onClick: handleSubmit,
        type: restProps.type || 'submit',
        disabled: !isValid
    };

    return <Button {...configButton}>{children}</Button>;
});

export default ValidateButton;
