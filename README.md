# 호출이 - 민간구급차 플랫폼 (Next.js 버전)

기존 HTML/CSS/JavaScript 기반의 "호출이" 민간구급차 플랫폼을 Next.js + TypeScript + Tailwind CSS로 마이그레이션한 프로젝트입니다.

## 🚀 주요 기능

### 🏥 3가지 사용자 타입
- **고객용**: 긴급 구급차 호출, 예약 호출, 이용 내역 조회
- **기사용**: 배차 대기, 콜 수락/거절, 운행 관리, QR 코드 표시
- **운영자용**: 시스템 관리 및 모니터링

### 📱 모바일 최적화
- Android 규격 대응 (411x731, 360x640)
- 반응형 디자인
- PWA 지원 준비

### 🔐 인증 시스템
- 카카오 로그인 연동
- LocalStorage 기반 상태 관리
- 자동 로그인 유지

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Bootstrap Icons
- **Authentication**: Kakao SDK
- **Build Tool**: Next.js

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 프로덕션 실행
```bash
npm start
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── globals.css                 # 전역 스타일
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 메인 페이지 (로딩 화면)
│   ├── login/
│   │   └── page.tsx               # 로그인 페이지
│   ├── customer/
│   │   ├── page.tsx               # 고객용 메인
│   │   ├── emergency/             # 긴급 호출
│   │   ├── reservation/           # 예약 호출
│   │   ├── history/               # 이용 내역
│   │   └── profile/               # 내 정보
│   ├── driver/
│   │   ├── page.tsx               # 기사용 메인
│   │   ├── call-waiting/          # 콜 대기
│   │   ├── driving/               # 운행중
│   │   ├── reservations/          # 예약내역
│   │   └── settings/              # 설정
│   └── admin/
│       └── page.tsx               # 운영자용 페이지
```

## 🔄 마이그레이션 내용

### ✅ 완료된 기능
- [x] 프로젝트 구조 설정 (Next.js + TypeScript + Tailwind)
- [x] 로그인 페이지 (카카오 로그인 연동)
- [x] 기사용 메인 페이지 (차량 정보, QR 코드, 기사 정보)
- [x] 기사용 콜 대기 페이지 (실시간 콜 요청 관리)
- [x] 고객용 메인 페이지 (긴급 호출, 예약 호출)
- [x] 모바일 반응형 디자인
- [x] 상태 관리 (LocalStorage)

### 🚧 진행 중인 기능
- [ ] 고객용 긴급 호출 페이지
- [ ] 고객용 예약 호출 페이지
- [ ] 기사용 운행중 페이지
- [ ] 관리자 페이지
- [ ] 이용 내역 페이지
- [ ] 설정 페이지

### 🔮 예정된 기능
- [ ] 실시간 위치 추적 (Geolocation API)
- [ ] 지도 연동 (카카오맵 API)
- [ ] 푸시 알림
- [ ] PWA 기능
- [ ] 서버 API 연동
- [ ] 데이터베이스 연동

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary Blue**: #007AFF (기사용)
- **Emergency Red**: #FF3B30 (고객용, 긴급)
- **Success Green**: #28a745 (관리자용)
- **Warning Yellow**: #FDD835 (카카오)

### 반응형 브레이크포인트
- **Large Mobile**: 411px × 731px
- **Small Mobile**: 360px × 640px

## 🔧 환경 설정

### Kakao SDK 설정
`src/app/layout.tsx`에서 카카오 앱 키를 설정해주세요:
```typescript
// 실제 카카오 앱 키로 교체 필요
window.Kakao.init('your-kakao-app-key')
```

### 환경 변수
```env
NEXT_PUBLIC_KAKAO_APP_KEY=your-kakao-app-key
```

## 📱 사용 방법

### 로그인
1. 서비스 선택 (고객용/기사용/운영자)
2. 카카오 로그인 (고객용/기사용) 또는 직접 로그인 (운영자)

### 기사용 앱
1. 출근하기 버튼으로 근무 시작
2. 콜 대기 화면에서 배차 요청 확인
3. 콜 수락 후 운행 시작
4. QR 코드로 승객 확인

### 고객용 앱
1. 긴급 상황 시 긴급 호출 버튼
2. 일반적인 경우 예약 호출
3. 이용 내역에서 과거 기록 확인

## 🚨 주의사항

- 이 프로젝트는 데모/프로토타입 목적으로 제작되었습니다
- 실제 서비스 운영을 위해서는 추가적인 보안, 인프라, 법적 검토가 필요합니다
- 카카오 SDK 키는 실제 서비스용으로 교체해야 합니다
- 응급의료 서비스 특성상 안전성과 신뢰성이 최우선되어야 합니다

## 📄 라이선스

MIT License - 자세한 내용은 LICENSE 파일을 참조하세요.

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📞 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.