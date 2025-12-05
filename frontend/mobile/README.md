# Financial Ledge Mobile

Expo 기반의 React Native 모바일 애플리케이션입니다.

## 기술 스택

- **Framework**: Expo ~52.0.0
- **Language**: TypeScript
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios

## 요구사항

- Node.js 18 이상
- Expo CLI (전역 설치 권장): `npm install -g expo-cli`

## 설치

```bash
cd frontend/mobile
npm install
```

## 실행

### 개발 서버 시작

```bash
npm start
# 또는
npx expo start
```

### 플랫폼별 실행

```bash
# Android 에뮬레이터
npm run android
# 또는 expo start 후 'a' 키 입력

# iOS 시뮬레이터 (macOS만)
npm run ios
# 또는 expo start 후 'i' 키 입력

# 웹 브라우저
npm run web
# 또는 expo start 후 'w' 키 입력
```

### 실제 기기에서 실행

1. Expo Go 앱 설치 (iOS App Store 또는 Google Play Store)
2. `npm start` 실행
3. QR 코드를 Expo Go 앱으로 스캔

## 프로젝트 구조

```
frontend/mobile/
├── src/
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── components/      # React Native 컴포넌트
│   ├── hooks/           # Custom React Hooks
│   ├── lib/             # 유틸리티 및 API 클라이언트
│   ├── screens/         # 화면 컴포넌트
│   └── types/           # TypeScript 타입 정의
├── assets/              # 이미지 및 리소스 파일
├── app.json            # Expo 설정
└── package.json
```

## API 연동

백엔드 API는 자동으로 플랫폼에 맞게 설정됩니다:

- **Android 에뮬레이터**: `http://10.0.2.2:8080/api`
- **iOS 시뮬레이터/실제 기기**: `http://localhost:8080/api`
- **프로덕션**: 환경 변수로 설정 (추후 추가)

## 주요 기능

- 거래 내역 조회
- 거래 생성/수정/삭제
- 거래 유형별 필터링
- 카테고리별 필터링

## 개발 팁

### Expo 명령어

- `r` - 앱 리로드
- `m` - 개발자 메뉴 열기
- `d` - 개발자 도구 열기
- `j` - 디버거 열기

### 문제 해결

1. **캐시 클리어**: `expo start -c`
2. **의존성 재설치**: `rm -rf node_modules && npm install`
3. **Metro 번들러 재시작**: `expo start --clear`

## 빌드

### Android APK 빌드

```bash
eas build --platform android
```

### iOS 빌드 (macOS만)

```bash
eas build --platform ios
```

**참고**: EAS Build를 사용하려면 Expo 계정이 필요합니다.
