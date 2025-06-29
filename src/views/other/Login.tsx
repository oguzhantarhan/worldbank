"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, email, minLength } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { signIn } from 'next-auth/react';
import { TextField, Button, IconButton, InputAdornment, Box, Typography, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { dictionary } from '@/dictionary';

type ErrorType = {
  message: string
}

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<ErrorType | null>(null)
  const router = useRouter();
  const searchParams = useSearchParams();
const validation=dictionary.validationErrorMessages
  const schema = object({
    email: string([minLength(1,validation.requiredField ), email(validation.email)]),
    password: string([minLength(8, validation.passwordMustBeAtleast8Char)]),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: { email: '', password: '' },
    
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      language: "tr",
      redirect: false
    })

    if (res && res.ok && res.error === null) {
     
      const redirectURL = searchParams.get('redirectTo') ?? '/'

      router.push(redirectURL)
    } else {
      if (res?.status == 401) {
        const error = {
          message: res.error as string
        }

        setLoginError(error)
      }
    }
  }

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
         Hoş Geldiniz
        </Typography>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="E-Posta"
                variant="outlined"
                fullWidth
                required
                autoComplete='off'
                error={!!errors.email || !!loginError}
                helperText={errors.email?.message || loginError?.message} 
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
                autoComplete='off'
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş Yap
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/forgot-password" passHref>
              <Typography variant="body2" color="primary">
                Şifremi Unuttum
              </Typography>
            </Link>
            <Link href="/register" passHref>
              <Typography variant="body2" color="primary">
                Hesabınız yok mu? Kayıt Ol
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
