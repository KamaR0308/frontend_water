import * as Yup from 'yup'
import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import React from 'react';
import ValidateInput from '../../shared/ui/ValidateInput/ValidateInput';

import styles from './Register.module.scss'
import ValidateButton from '../../shared/ui/ValidateButton/ValidateButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const INITIAL_FORM_STATE = {
        login: '',
        password: ''
    }

    const REGISTER_VALIDATION = Yup.object().shape({
        login: Yup
            .string()
            .required('Обязательное поле')
            .test('valid-username', 'Не правильный логин', (value) => value === 'admin'),
        password: Yup
            .string()
            .required('Обязательное поле')
            .test('valid-password', 'Не правильный пароль', (value) => value === '12345')
    })

    const navigate = useNavigate()

    const handleRegister = () => {
        localStorage.setItem('auth', 'admin')
        navigate('/admin')
    }

    const goBack = () => navigate('/')

    return (
        <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={REGISTER_VALIDATION}
            onSubmit={handleRegister}
        >
            <Form>
                <Box className={styles.box} >
                    <Paper className={styles.paper} >
                        <Button color='success' onClick={goBack}>
                            назад
                        </Button>
                        <Stack className={styles.paper__subcontent}>
                            <Avatar className={styles.paper__ava} />
                            <Typography
                                variant='h6'
                                sx={{ mb: 2, mt: 2 }}
                            >
                                Вход в аккаунт
                            </Typography>
                        </Stack>
                        <ValidateInput
                            label="Логин"
                            name='login'
                        />
                        <ValidateInput
                            label="Пароль"
                            name="password"
                            sx={{ mb: 2, mt: 2 }}
                        />
                        <ValidateButton fullWidth color='success' >
                            войти
                        </ValidateButton>
                    </Paper>
                </Box>
            </Form>
        </Formik>
    );
};

export default Login;