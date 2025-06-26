'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CallRequest {
  id: string
  patientName: string
  pickupLocation: string
  destination: string
  urgency: 'high' | 'medium' | 'low'
  distance: string
  estimatedTime: string
  createdAt: string
}

export default function CallWaitingPage() {
  const router = useRouter()
  const [callRequests, setCallRequests] = useState<CallRequest[]>([])
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const appType = localStorage.getItem('appType')
    
    if (!isLoggedIn || appType !== 'driver') {
      router.push('/login')
      return
    }

    // 모의 콜 요청 데이터
    const mockCalls: CallRequest[] = [
      {
        id: '1',
        patientName: '김**',
        pickupLocation: '서울시 강남구 테헤란로 123',
        destination: '삼성서울병원',
        urgency: 'high',
        distance: '2.3km',
        estimatedTime: '8분',
        createdAt: '2024-01-15 14:30'
      },
      {
        id: '2',
        patientName: '이**',
        pickupLocation: '서울시 서초구 서초대로 456',
        destination: '서울대학교병원',
        urgency: 'medium',
        distance: '5.1km',
        estimatedTime: '15분',
        createdAt: '2024-01-15 14:25'
      }
    ]

    if (isOnline) {
      setCallRequests(mockCalls)
    } else {
      setCallRequests([])
    }
  }, [router, isOnline])

  const acceptCall = (callId: string) => {
    const call = callRequests.find(c => c.id === callId)
    if (call) {
      alert(`${call.patientName} 환자의 호출을 수락했습니다.`)
      router.push('/driver/driving')
    }
  }

  const rejectCall = (callId: string) => {
    setCallRequests(prev => prev.filter(c => c.id !== callId))
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return '긴급'
      case 'medium': return '보통'
      case 'low': return '낮음'
      default: return '보통'
    }
  }

  return (
    <div className="mobile-container bg-white overflow-hidden">
      {/* 헤더 */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()}
          className="text-white hover:text-blue-200"
        >
          <i className="bi bi-arrow-left text-xl"></i>
        </button>
        <h1 className="text-lg font-semibold">콜 대기</h1>
        <div></div>
      </div>

      {/* 상태 토글 */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <span className="font-semibold">배차 대기 상태</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {isOnline ? '배차 요청을 받을 수 있습니다' : '배차 요청을 받지 않습니다'}
        </p>
      </div>

      {/* 콜 요청 목록 */}
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 64px - 80px - 70px)' }}>
        {!isOnline ? (
          <div className="text-center py-20">
            <i className="bi bi-telephone-x text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg font-semibold">배차 대기가 꺼져있습니다</p>
            <p className="text-gray-400 text-sm">위의 스위치를 켜서 콜을 받아보세요</p>
          </div>
        ) : callRequests.length === 0 ? (
          <div className="text-center py-20">
            <i className="bi bi-clock-history text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg font-semibold">새로운 콜을 기다리는 중...</p>
            <p className="text-gray-400 text-sm">콜이 오면 알림을 받을 수 있습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {callRequests.map((call) => (
              <div key={call.id} className={`border-2 rounded-lg p-4 ${getUrgencyColor(call.urgency)}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{call.patientName}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      call.urgency === 'high' ? 'bg-red-500 text-white' :
                      call.urgency === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {getUrgencyText(call.urgency)}
                    </span>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{call.distance}</div>
                    <div>{call.estimatedTime}</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <i className="bi bi-geo-alt text-blue-500 mr-2 mt-1"></i>
                    <div>
                      <div className="text-sm text-gray-600">출발지</div>
                      <div className="font-semibold">{call.pickupLocation}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="bi bi-hospital text-red-500 mr-2 mt-1"></i>
                    <div>
                      <div className="text-sm text-gray-600">도착지</div>
                      <div className="font-semibold">{call.destination}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => acceptCall(call.id)}
                    className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    수락
                  </button>
                  <button
                    onClick={() => rejectCall(call.id)}
                    className="flex-1 bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500"
                  >
                    거절
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white flex justify-around items-center h-16 border-t border-gray-200">
        <button 
          onClick={() => router.push('/driver')}
          className="flex flex-col items-center text-gray-400"
        >
          <i className="bi bi-house-door text-xl mb-1"></i>
          <span className="text-xs">홈</span>
        </button>
        <button className="flex flex-col items-center text-blue-600">
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
    </div>
  )
}