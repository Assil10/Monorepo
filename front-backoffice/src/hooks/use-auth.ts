import { useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { jwtDecode } from 'jwt-decode'
import AuthService, {
  SignInRequest,
  SignUpRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthError,
  AuthErrorType,
  SignInResponse,
} from '@/api/services/auth-service'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/hooks/use-toast'

// Define interfaces for JWT token payload
interface JwtPayload {
  role: string[]
  exp: number
  [key: string]: unknown
}

// Define API error type
interface ApiError {
  message?: string
  title?: string
}

export const useSignIn = () => {
  const navigate = useNavigate()
  const { setUser, setAccessToken } = useAuthStore((state) => state.auth)
  const [failedAttempts, setFailedAttempts] = useState(0)

  const handleAuthSuccess = (data: SignInResponse, rememberMe?: boolean) => {
    setFailedAttempts(0) // Reset failed attempts on success
    setAccessToken(data.accessToken, rememberMe)

    // Decode token to get user info including roles
    const decodedToken = jwtDecode<JwtPayload>(data.accessToken)
    setUser({
      accountNo: data.user.accountNo,
      email: data.user.email,
      role: decodedToken.role || [],
      exp: decodedToken.exp,
    })

    // Show device info if it's a new device
    if (
      data.deviceInfo &&
      !localStorage.getItem(`device_${data.deviceInfo.deviceId}`)
    ) {
      toast({
        title: 'New device detected',
        description: `Logged in from ${data.deviceInfo.browser} on ${data.deviceInfo.os}${
          data.deviceInfo.location ? ` in ${data.deviceInfo.location}` : ''
        }`,
        duration: 6000,
      })
      localStorage.setItem(`device_${data.deviceInfo.deviceId}`, 'known')
    }

    toast({
      title: 'Sign in successful',
      description: 'Welcome back!',
    })

    navigate({ to: '/' })
  }

  const handleAuthError = (error: AuthError) => {
    switch (error.type) {
      case AuthErrorType.INVALID_CREDENTIALS:
        setFailedAttempts((prev) => prev + 1)
        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: [
            error.message,
            error.remainingAttempts &&
              `${error.remainingAttempts} attempts remaining before account lockout`,
            error.suggestedAction,
          ]
            .filter(Boolean)
            .join('\n'),
          duration: 6000,
        })
        break

      case AuthErrorType.ACCOUNT_LOCKED:
        toast({
          variant: 'destructive',
          title: 'Account locked',
          description: [
            error.message,
            error.lockoutDuration &&
              `Try again in ${Math.ceil(error.lockoutDuration / 60000)} minutes`,
            error.suggestedAction,
          ]
            .filter(Boolean)
            .join('\n'),
          duration: 8000,
        })
        break

      case AuthErrorType.EMAIL_NOT_VERIFIED:
        toast({
          variant: 'destructive',
          title: 'Email not verified',
          description: [error.message, error.suggestedAction]
            .filter(Boolean)
            .join('\n'),
          duration: 6000,
        })
        break

      case AuthErrorType.NETWORK_ERROR:
        toast({
          variant: 'destructive',
          title: 'Connection error',
          description: [error.message, error.suggestedAction]
            .filter(Boolean)
            .join('\n'),
          duration: 6000,
        })
        break

      default:
        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: error.message || 'An unexpected error occurred',
        })
    }
  }

  const signInMutation = useMutation({
    mutationFn: (data: SignInRequest) => AuthService.signIn(data),
    onSuccess: (data, variables) =>
      handleAuthSuccess(data, variables.rememberMe),
    onError: handleAuthError,
  })

  const signInWithGoogleMutation = useMutation({
    mutationFn: () => AuthService.signInWithGoogle(),
    onSuccess: (data) => handleAuthSuccess(data),
    onError: handleAuthError,
  })

  return {
    signIn: signInMutation,
    signInWithGoogle: signInWithGoogleMutation,
    failedAttempts,
  }
}

export const useSignUp = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: SignUpRequest) => AuthService.signUp(data),
    onSuccess: (_response, variables) => {
      toast({
        title: 'Sign up successful',
        description: 'Please check your email for verification instructions',
      })
      navigate({
        to: '/otp',
        search: {
          email: variables.email,
          type: 'verify-email',
        },
      })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
        description:
          error.response?.data?.message || 'An error occurred during sign up',
      })
    },
  })
}

export const useVerifyEmail = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => AuthService.verifyEmail(data),
    onSuccess: () => {
      toast({
        title: 'Email verified',
        description: 'Your email has been verified successfully',
      })
      navigate({ to: '/sign-in' })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description:
          error.response?.data?.message ||
          'An error occurred during verification',
      })
    },
  })
}

export const useForgotPassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      AuthService.forgotPassword(data),
    onSuccess: (_response, variables) => {
      toast({
        title: 'Reset code sent',
        description: 'Please check your email for password reset instructions',
      })
      navigate({
        to: '/otp',
        search: {
          email: variables.email,
          type: 'reset-password',
        },
      })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast({
        variant: 'destructive',
        title: 'Request failed',
        description: error.response?.data?.message || 'An error occurred',
      })
    },
  })
}

export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => AuthService.resetPassword(data),
    onSuccess: () => {
      toast({
        title: 'Password reset',
        description: 'Your password has been reset successfully',
      })
      navigate({ to: '/sign-in' })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast({
        variant: 'destructive',
        title: 'Reset failed',
        description:
          error.response?.data?.message ||
          'An error occurred during password reset',
      })
    },
  })
}

export const useSignOut = () => {
  const navigate = useNavigate()
  const { reset } = useAuthStore((state) => state.auth)

  return useMutation({
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => {
      reset()
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      })
      navigate({ to: '/sign-in' })
    },
    onError: () => {
      reset()
      navigate({ to: '/sign-in' })
    },
  })
}

export const useValidateToken = () => {
  const { user } = useAuthStore((state) => state.auth)

  return useQuery({
    queryKey: ['validateToken'],
    queryFn: () => AuthService.validateToken(),
    enabled: !!user, // Only run if user is logged in
    refetchOnWindowFocus: true,
  })
}
