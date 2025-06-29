'use client'

// MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

// Third-party Imports
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { ToastContainerProps } from 'react-toastify'

// Hook Imports

type Props = ToastContainerProps & {
  boxProps?: BoxProps
}

// Styled Components
const ToastifyWrapper = styled(Box)<BoxProps>(() => {
  // Hooks
  const isSmallScreen = useMediaQuery('(max-width: 480px)')

  return {
    ...(isSmallScreen && {
      '& .Toastify__toast-container': {
        marginBlockStart: '1rem',
        marginInline: '1rem',
        width: 'calc(100vw - 1.5rem)'
      }
    }),
    '& .Toastify__toast': {
      minBlockSize: '46px',
      borderRadius: '8px',
      padding: '12px 20px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      ...(isSmallScreen && {
        marginBlockEnd: '16px'
      }),
      '&:not(.custom-toast)': {
        '& .Toastify__toast-body': {
          color: '#333333'
        },
        '&.Toastify__toast--success': {
          '& .Toastify__toast-icon svg': {
            fill: '#4caf50'
          }
        },
        '&.Toastify__toast--error': {
          '& .Toastify__toast-icon svg': {
            fill: '#f44336'
          }
        },
        '&.Toastify__toast--warning': {
          '& .Toastify__toast-icon svg': {
            fill: '#ff9800'
          }
        },
        '&.Toastify__toast--info': {
          '& .Toastify__toast-icon svg': {
            fill: '#2196f3'
          }
        }
      },
      '[data-skin="bordered"] &': {
        boxShadow: 'none',
        border: '1px solid #e0e0e0'
      }
    },
    '& .Toastify__toast-body': {
      margin: 0,
      lineHeight: '1.5',
      fontSize: '14px'
    },
    '& .Toastify__toast-icon': {
      marginRight: '12px',
      height: '20px',
      width: '20px',
      '& .Toastify__spinner': {
        margin: '3px',
        height: '14px',
        width: '14px'
      }
    },
    '& .Toastify__close-button': {
      color: '#333333'
    }
  }
})

const AppReactToastify = (props: Props) => {
  const { boxProps,  ...rest } = props

  return (
    <ToastifyWrapper {...boxProps}>
      <ToastContainer position={"top-right"} {...rest} />
    </ToastifyWrapper>
  )
}

export default AppReactToastify
