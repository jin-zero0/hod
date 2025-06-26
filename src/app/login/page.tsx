'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    Kakao: any
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [selectedAppType, setSelectedAppType] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 카카오 SDK 초기화 (중복 초기화 방지)
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('ae9cce23e8367af0be888d1657d525e7')
      }
    }

    // 이미 로그인된 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const appType = localStorage.getItem('appType')
    
    if (isLoggedIn === 'true' && appType) {
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
      }
    }
  }, [router])

  const selectApp = (appType: string) => {
    setSelectedAppType(appType)
    
    if (appType === 'admin') {
      adminDirectLogin()
    }
  }

  const adminDirectLogin = () => {
    setLoading(true)
    
    const adminInfo = {
      id: 'admin_001',
      nickname: '관리자',
      profile_image: '',
      email: 'admin@ambulance.com',
      appType: 'admin',
      loginTime: new Date().toISOString()
    }
    
    localStorage.setItem('userInfo', JSON.stringify(adminInfo))
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('appType', 'admin')
    
    setTimeout(() => {
      setLoading(false)
      alert('관리자님, 환영합니다!')
      router.push('/admin')
    }, 1000)
  }

  const loginWithKakao = () => {
    if (!selectedAppType) {
      alert('먼저 서비스를 선택해주세요.')
      return
    }
    
    setLoading(true)
    
    if (window.Kakao && window.Kakao.Auth && window.Kakao.isInitialized()) {
      window.Kakao.Auth.login({
        success: function(authObj: any) {
          console.log('카카오 로그인 성공:', authObj)
          
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(res: any) {
              console.log('사용자 정보:', res)
              
              const userInfo = {
                id: res.id,
                nickname: res.properties?.nickname || '사용자',
                profile_image: res.properties?.profile_image || '',
                email: res.kakao_account?.email || '',
                appType: selectedAppType,
                loginTime: new Date().toISOString()
              }
              
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
              localStorage.setItem('isLoggedIn', 'true')
              localStorage.setItem('appType', selectedAppType)
              
              setTimeout(() => {
                setLoading(false)
                alert(`${userInfo.nickname}님, 환영합니다!`)
                
                if (selectedAppType === 'customer') {
                  router.push('/customer')
                } else if (selectedAppType === 'driver') {
                  router.push('/driver')
                }
              }, 1000)
            },
            fail: function(error: any) {
              console.error('사용자 정보 가져오기 실패:', error)
              setLoading(false)
              alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
            }
          })
        },
        fail: function(err: any) {
          console.error('카카오 로그인 실패:', err)
          setLoading(false)
          alert('로그인에 실패했습니다. 다시 시도해주세요.')
        }
      })
    } else {
      setLoading(false)
      alert('카카오 SDK가 로드되지 않았습니다.')
    }
  }

  return (
    <div className="mobile-container bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-400 text-white p-10 text-center">
        <h1 className="text-2xl font-bold mb-3">
          <i className="bi bi-truck-front mr-2"></i>
          민간구급차
        </h1>
        <p className="opacity-90">안전하고 빠른 응급의료 서비스</p>
      </div>
      
      <div className="p-10">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-5 text-center text-gray-800">서비스 선택</h3>
          <div className="flex gap-3 mb-8 flex-wrap">
            <button
              onClick={() => selectApp('customer')}
              className={`flex-1 min-w-[100px] p-3 border-2 rounded-xl font-semibold text-sm transition-all ${
                selectedAppType === 'customer'
                  ? 'border-red-500 bg-red-500 text-white shadow-lg transform -translate-y-0.5'
                  : 'border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500 hover:transform hover:-translate-y-0.5'
              }`}
            >
              <i className="bi bi-person-heart block text-2xl mb-2"></i>
              고객용
            </button>
            <button
              onClick={() => selectApp('driver')}
              className={`flex-1 min-w-[100px] p-3 border-2 rounded-xl font-semibold text-sm transition-all ${
                selectedAppType === 'driver'
                  ? 'border-blue-500 bg-blue-500 text-white shadow-lg transform -translate-y-0.5'
                  : 'border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:transform hover:-translate-y-0.5'
              }`}
            >
              <i className="bi bi-truck block text-2xl mb-2"></i>
              기사용
            </button>
            <button
              onClick={() => selectApp('admin')}
              className={`flex-1 min-w-[100px] p-3 border-2 rounded-xl font-semibold text-sm transition-all ${
                selectedAppType === 'admin'
                  ? 'border-green-500 bg-green-500 text-white shadow-lg transform -translate-y-0.5'
                  : 'border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-500 hover:transform hover:-translate-y-0.5'
              }`}
            >
              <i className="bi bi-gear-fill block text-2xl mb-2"></i>
              운영자
            </button>
          </div>
        </div>
        
        {selectedAppType && selectedAppType !== 'admin' && (
          <div className="login-section">
            <button
              onClick={loginWithKakao}
              className="w-full bg-yellow-400 text-black p-4 rounded-xl font-semibold flex items-center justify-center gap-3 mb-5 hover:bg-yellow-300 transition-colors"
            >
              <div className="w-5 h-5 bg-black rounded-sm"></div>
              카카오로 간편 로그인
            </button>
            
            <div className="text-center relative mb-5">
              <div className="border-t border-gray-200 absolute top-1/2 left-0 right-0"></div>
              <span className="bg-white px-4 text-gray-500 text-sm">또는</span>
            </div>
            
            <div className="text-center text-sm text-gray-600 leading-relaxed">
              로그인 시 <a href="#" className="text-red-500 hover:underline">이용약관</a> 및 
              <a href="#" className="text-red-500 hover:underline ml-1">개인정보처리방침</a>에 동의하게 됩니다.
            </div>
          </div>
        )}
        
        {loading && (
          <div className="text-center p-5">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p>로그인 중...</p>
          </div>
        )}
      </div>
    </div>
  )
}