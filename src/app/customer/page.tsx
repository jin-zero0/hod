'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UserInfo {
  id: string
  nickname: string
  profile_image: string
  email: string
  appType: string
  loginTime: string
}

export default function CustomerPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [emergencyMode, setEmergencyMode] = useState(false)

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const appType = localStorage.getItem('appType')
    const userInfoStr = localStorage.getItem('userInfo')
    
    if (!isLoggedIn || appType !== 'customer') {
      router.push('/login')
      return
    }
    
    if (userInfoStr) {
      setUserInfo(JSON.parse(userInfoStr))
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('appType')
    localStorage.removeItem('userInfo')
    router.push('/login')
  }

  const requestEmergencyCall = () => {
    alert('긴급 구급차를 요청합니다. 잠시만 기다려주세요.')
    router.push('/customer/emergency')
  }

  const requestRegularCall = () => {
    router.push('/customer/reservation')
  }

  if (!userInfo) {
    return (
      <div className="mobile-container bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mobile-container bg-white overflow-hidden">
      {/* 헤더 */}
      <div className="bg-red-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">민간구급차</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm">{userInfo.nickname}님</span>
          <button 
            onClick={logout}
            className="text-white hover:text-red-200"
          >
            <i className="bi bi-box-arrow-right text-xl"></i>
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 64px - 70px)' }}>
        {/* 환영 메시지 */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-5 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            안녕하세요, {userInfo.nickname}님! 👋
          </h2>
          <p className="text-gray-600">
            안전하고 빠른 응급의료 서비스를 제공합니다.
          </p>
        </div>

        {/* 긴급 호출 버튼 */}
        <div className="mb-6">
          <button
            onClick={requestEmergencyCall}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-6 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 transition-all"
          >
            <i className="bi bi-telephone-fill text-2xl"></i>
            긴급 구급차 호출
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">
            생명이 위험한 응급상황 시 이용해주세요
          </p>
        </div>

        {/* 일반 예약 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={requestRegularCall}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-semibold flex flex-col items-center gap-2"
          >
            <i className="bi bi-calendar-plus text-2xl"></i>
            예약 호출
          </button>
          <button
            onClick={() => router.push('/customer/history')}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-semibold flex flex-col items-center gap-2"
          >
            <i className="bi bi-clock-history text-2xl"></i>
            이용 내역
          </button>
        </div>

        {/* 빠른 메뉴 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">빠른 메뉴</h3>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => router.push('/customer/profile')}
              className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <i className="bi bi-person text-xl text-gray-600 mb-1"></i>
              <div className="text-xs text-gray-600">내 정보</div>
            </button>
            <button className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow">
              <i className="bi bi-geo-alt text-xl text-gray-600 mb-1"></i>
              <div className="text-xs text-gray-600">즐겨찾기</div>
            </button>
            <button className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow">
              <i className="bi bi-headset text-xl text-gray-600 mb-1"></i>
              <div className="text-xs text-gray-600">고객센터</div>
            </button>
          </div>
        </div>

        {/* 안전 수칙 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <i className="bi bi-exclamation-triangle mr-2"></i>
            안전 수칙
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 응급상황이 아닌 경우 예약 호출을 이용해주세요</li>
            <li>• 정확한 위치정보를 제공해주세요</li>
            <li>• 환자의 상태를 정확히 설명해주세요</li>
            <li>• 구급차 도착 전까지 안전한 곳에서 대기해주세요</li>
          </ul>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white flex justify-around items-center h-16 border-t border-gray-200">
        <button className="flex flex-col items-center text-red-500">
          <i className="bi bi-house-door text-xl mb-1"></i>
          <span className="text-xs">홈</span>
        </button>
        <button 
          onClick={() => router.push('/customer/reservation')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-calendar text-xl mb-1"></i>
          <span className="text-xs">예약</span>
        </button>
        <button 
          onClick={() => router.push('/customer/history')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-clock-history text-xl mb-1"></i>
          <span className="text-xs">내역</span>
        </button>
        <button 
          onClick={() => router.push('/customer/profile')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-person text-xl mb-1"></i>
          <span className="text-xs">내정보</span>
        </button>
      </div>
    </div>
  )
}