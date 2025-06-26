'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인 후 적절한 페이지로 이동
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const appType = localStorage.getItem('appType')
    
    const timer = setTimeout(() => {
      if (isLoggedIn === 'true' && appType) {
        // 이미 로그인된 상태라면 해당 앱으로 이동
        switch (appType) {
          case 'customer':
            router.push('/customer')
            break
          case 'driver':
            router.push('/driver')
            break
          case 'admin':
            router.push('/admin')
            break
          default:
            router.push('/login')
        }
      } else {
        // 로그인되지 않은 상태라면 로그인 페이지로 이동
        router.push('/login')
      }
    }, 2000) // 2초 후 이동

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="mobile-container flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-5 animate-pulse">
          <i className="bi bi-truck-front"></i>
        </div>
        <div className="text-2xl font-semibold mb-3">민간구급차 플랫폼</div>
        <div className="text-lg opacity-80 mb-8">안전하고 빠른 응급의료 서비스</div>
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}