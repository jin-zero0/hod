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

export default function AdminPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const appType = localStorage.getItem('appType')
    const userInfoStr = localStorage.getItem('userInfo')
    
    if (!isLoggedIn || appType !== 'admin') {
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

  if (!userInfo) {
    return (
      <div className="mobile-container bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mobile-container bg-white overflow-hidden">
      {/* 헤더 */}
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">운영자 관리</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm">{userInfo.nickname}</span>
          <button 
            onClick={logout}
            className="text-white hover:text-green-200"
          >
            <i className="bi bi-box-arrow-right text-xl"></i>
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
        {/* 대시보드 카드들 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">운행 중 차량</p>
                <p className="text-2xl font-bold text-blue-800">12</p>
              </div>
              <i className="bi bi-truck text-2xl text-blue-500"></i>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">긴급 호출</p>
                <p className="text-2xl font-bold text-red-800">3</p>
              </div>
              <i className="bi bi-telephone-fill text-2xl text-red-500"></i>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">대기 중 기사</p>
                <p className="text-2xl font-bold text-yellow-800">8</p>
              </div>
              <i className="bi bi-person-check text-2xl text-yellow-500"></i>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">오늘 완료</p>
                <p className="text-2xl font-bold text-green-800">45</p>
              </div>
              <i className="bi bi-check-circle text-2xl text-green-500"></i>
            </div>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="bg-white rounded-lg p-5 mb-6 shadow-lg border">
          <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <i className="bi bi-telephone-fill text-red-500 mr-3"></i>
                <div>
                  <p className="font-semibold">긴급 호출 접수</p>
                  <p className="text-sm text-gray-600">강남구 → 삼성병원</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">방금</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <i className="bi bi-truck text-blue-500 mr-3"></i>
                <div>
                  <p className="font-semibold">배차 완료</p>
                  <p className="text-sm text-gray-600">차량 12가3456</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2분 전</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <i className="bi bi-check-circle text-green-500 mr-3"></i>
                <div>
                  <p className="font-semibold">운행 완료</p>
                  <p className="text-sm text-gray-600">서초구 → 서울대병원</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">5분 전</span>
            </div>
          </div>
        </div>

        {/* 관리 메뉴 */}
        <div className="bg-white rounded-lg p-5 shadow-lg border">
          <h2 className="text-lg font-semibold mb-4">관리 메뉴</h2>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition-colors">
              <i className="bi bi-people text-2xl text-blue-600 mb-2"></i>
              <div className="text-sm font-semibold text-blue-800">사용자 관리</div>
            </button>
            
            <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition-colors">
              <i className="bi bi-truck text-2xl text-green-600 mb-2"></i>
              <div className="text-sm font-semibold text-green-800">차량 관리</div>
            </button>
            
            <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition-colors">
              <i className="bi bi-graph-up text-2xl text-purple-600 mb-2"></i>
              <div className="text-sm font-semibold text-purple-800">통계</div>
            </button>
            
            <button className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg text-center transition-colors">
              <i className="bi bi-bell text-2xl text-orange-600 mb-2"></i>
              <div className="text-sm font-semibold text-orange-800">알림 관리</div>
            </button>
            
            <button className="bg-red-50 hover:bg-red-100 p-4 rounded-lg text-center transition-colors">
              <i className="bi bi-exclamation-triangle text-2xl text-red-600 mb-2"></i>
              <div className="text-sm font-semibold text-red-800">신고 관리</div>
            </button>
            
            <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
              <i className="bi bi-gear text-2xl text-gray-600 mb-2"></i>
              <div className="text-sm font-semibold text-gray-800">시스템 설정</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}