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

export default function DriverPage() {
  const router = useRouter()
  const [dutyStatus, setDutyStatus] = useState<'off' | 'waiting' | 'on-duty'>('off')
  const [driverInfoExpanded, setDriverInfoExpanded] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [showHelpModal, setShowHelpModal] = useState(false)

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const appType = localStorage.getItem('appType')
    const userInfoStr = localStorage.getItem('userInfo')
    
    if (!isLoggedIn || appType !== 'driver') {
      router.push('/login')
      return
    }
    
    if (userInfoStr) {
      setUserInfo(JSON.parse(userInfoStr))
    }
  }, [router])

  const toggleDutyStatus = () => {
    if (dutyStatus === 'off') {
      setDutyStatus('waiting')
    } else {
      setDutyStatus('off')
    }
  }

  const toggleDriverInfo = () => {
    setDriverInfoExpanded(!driverInfoExpanded)
  }

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
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mobile-container bg-white overflow-hidden">
      {/* 헤더 */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">기사용 APP</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHelpModal(true)}
            className="text-white hover:text-blue-200"
          >
            <i className="bi bi-question-circle-fill text-xl"></i>
          </button>
          <button 
            onClick={logout}
            className="text-white hover:text-blue-200"
          >
            <i className="bi bi-box-arrow-right text-xl"></i>
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="p-4 pb-20 overflow-y-auto" style={{ height: 'calc(100% - 64px - 70px)' }}>
        {/* 차량 정보 카드 */}
        <div className="bg-white rounded-lg p-5 mb-4 shadow-lg border">
          <h2 className="text-lg font-semibold mb-4">차량 정보</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-3 ${
                dutyStatus === 'off' 
                  ? 'bg-gray-200 text-gray-600' 
                  : dutyStatus === 'waiting'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-red-100 text-red-600'
              }`}>
                {dutyStatus === 'off' ? '차량번호' : dutyStatus === 'waiting' ? '대기중' : '운행중'}
              </span>
              <span>서울 12가 3456</span>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full text-sm font-semibold mr-3 bg-green-100 text-green-600">
                차량종류
              </span>
              <span>민간구급차</span>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full text-sm font-semibold mr-3 bg-orange-100 text-orange-600">
                기사정보
              </span>
              <span>{userInfo.nickname} (남)</span>
            </div>
          </div>
          <button
            onClick={toggleDutyStatus}
            className={`w-full mt-4 p-3 rounded-lg font-semibold text-white transition-colors ${
              dutyStatus === 'off'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {dutyStatus === 'off' ? '출근하기' : '퇴근하기'}
          </button>
        </div>

        {/* 기사 정보 섹션 */}
        <div className="bg-white rounded-lg p-5 mb-4 shadow-lg border">
          <div 
            className="flex justify-between items-center cursor-pointer p-2 -m-2 rounded hover:bg-gray-50"
            onClick={toggleDriverInfo}
          >
            <h2 className="text-lg font-semibold">기사 정보</h2>
            <i className={`bi bi-chevron-down transition-transform ${driverInfoExpanded ? 'rotate-180' : ''}`}></i>
          </div>
          {driverInfoExpanded && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">이름:</span>
                  <span>{userInfo.nickname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">성별:</span>
                  <span>남</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">면허번호:</span>
                  <span>12-34-567890-12</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">연락처:</span>
                  <span>010-1234-5678</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">소속:</span>
                  <span>서울응급의료센터</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QR 코드 섹션 */}
        <div className="bg-white rounded-lg p-5 shadow-lg border">
          <h2 className="text-lg font-semibold mb-4">지정코드 QR</h2>
          <div className="bg-gray-50 rounded-lg p-5 flex items-center justify-center">
            <div className="text-center">
              <div className="w-30 h-30 bg-white border-2 border-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded pattern-qr"></div>
              </div>
              <div className="text-xl font-bold text-blue-600 mb-2">AMB-2024-001</div>
              <div className="text-sm text-gray-600">승객에게 보여주세요</div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white flex justify-around items-center h-16 border-t border-gray-200">
        <button className="flex flex-col items-center text-blue-600">
          <i className="bi bi-house-door text-xl mb-1"></i>
          <span className="text-xs">홈</span>
        </button>
        <button 
          onClick={() => router.push('/driver/call-waiting')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-telephone text-xl mb-1"></i>
          <span className="text-xs">콜 대기</span>
        </button>
        <button 
          onClick={() => router.push('/driver/driving')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-car-front text-xl mb-1"></i>
          <span className="text-xs">운행중</span>
        </button>
        <button 
          onClick={() => router.push('/driver/reservations')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-calendar text-xl mb-1"></i>
          <span className="text-xs">예약내역</span>
        </button>
        <button 
          onClick={() => router.push('/driver/settings')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-gear text-xl mb-1"></i>
          <span className="text-xs">설정</span>
        </button>
      </div>

      {/* 도움말 모달 */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">앱 사용 설명서</h3>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">📱 앱 사용 설명서</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>1. 출근하기 버튼을 눌러 운행을 시작하세요.</li>
                  <li>2. QR코드를 승객에게 보여주세요.</li>
                  <li>3. 콜 대기 화면에서 새로운 배차 요청을 확인하세요.</li>
                  <li>4. 운행 중 화면에서 실시간 위치를 확인하세요.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚠️ 주의사항</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 운행 전 차량 상태를 반드시 점검하세요.</li>
                  <li>• 안전운전을 최우선으로 하세요.</li>
                  <li>• 긴급상황 발생 시 즉시 관리자에게 연락하세요.</li>
                  <li>• 승객 정보는 철저히 보호하세요.</li>
                </ul>
              </div>
            </div>
            <button 
              onClick={() => setShowHelpModal(false)}
              className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}