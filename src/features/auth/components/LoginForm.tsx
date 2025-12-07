import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../hooks'
import type { UserRole } from '../types'

const loginSchema = z.object({
  email: z.string().min(1, 'Email jest wymagany').email('Nieprawidłowy adres email'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
})

type LoginFormData = z.infer<typeof loginSchema>

const demoAccounts: { label: string; role: UserRole }[] = [
  { label: 'User', role: 'user' },
  { label: 'Admin', role: 'admin' },
  { label: 'BBF', role: 'bbf' },
]

export function LoginForm() {
  const navigate = useNavigate()
  const { login, isLoading, isAuthenticated, role } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  // Redirect after successful login based on role
  useEffect(() => {
    if (isAuthenticated && role) {
      if (role === 'user' || role === 'admin') {
        navigate('/department/items')
      } else {
        navigate('/bbf-admin')
      }
    }
  }, [isAuthenticated, role, navigate])

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login data:', data)
    // TODO: Implement login logic
  }

  const handleDemoLogin = (userRole: UserRole) => {
    login(userRole)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Logowanie</h2>
        <p className="text-gray-500 text-center mb-6">System planowania budżetu</p>

        {/* Demo Test Accounts */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-3 text-center font-medium">Konta testowe</p>
          <div className="flex gap-2 justify-center">
            {demoAccounts.map(({ label, role }) => (
              <button
                key={role}
                type="button"
                onClick={() => handleDemoLogin(role)}
                disabled={isLoading}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2 font-medium">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="Wprowadź email"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2 font-medium">
              Hasło
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="Wprowadź hasło"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  )
}
