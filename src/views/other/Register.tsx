"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { object, string, minLength, email, custom } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { TextField, Button, IconButton, InputAdornment, Box, Typography, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { dictionary } from '@/dictionary';
import { RegisterService } from '@/Services/AuthServices';
import { Slide, toast } from 'react-toastify';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const validation=dictionary.validationErrorMessages
  // Doğrulama kuralları
  const schema = object(
    {
      firstName: string([minLength(1, validation.requiredField)]),
      lastName: string([minLength(1, validation.requiredField)]),
      email: string([
        minLength(1, validation.requiredField),
        email(validation.email),
      ]),
      password: string([
        minLength(8, validation.passwordMustBeAtleast8Char),
        custom(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/.test(
              value
            ),
          validation.passwordRules
        ),
      ]),
      confirmPassword: string([minLength(1, validation.requiredField)]),
    },
    [
      custom(
        ({ password, confirmPassword }) => {
         
          setError("root",{message:validation.passwordDontMatch})
          return password === confirmPassword;
        }
      )
    ]
  );
  

  const { setError,control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const handleRegister = async (data: FormData) => {
 
    const response=await RegisterService({email:data.email,firstName:data.firstName,lastName:data.lastName,password:data.password})
   if (!response.error) {
    router.push('/login');
   }
   else{
    toast.error(response.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      });
   }
   
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5" color="primary" sx={{ marginBottom: 2 }}>
          Kayıt Ol
        </Typography>
        <form onSubmit={handleSubmit(handleRegister)} noValidate>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="İsim"
                variant="outlined"
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Soyisim"
                variant="outlined"
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="E-posta"
                variant="outlined"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password?.message}
                    InputLabelProps={{ style: { color: 'white' } }}
           
                InputProps={{
                  style: { color: 'white' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ color: 'white' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Şifre Tekrarı"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                required
                error={!!errors.confirmPassword || !!errors.root?.message}
                helperText={errors.confirmPassword?.message || errors.root?.message}
                InputLabelProps={{ style: { color: 'white' } }}
          
                InputProps={{
                  style: { color: 'white' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ color: 'white' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Kayıt Ol
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/login" passHref>
              <Typography variant="body2" color="primary">
                Zaten hesabınız var mı? Giriş Yap
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
