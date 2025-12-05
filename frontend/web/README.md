# Financial Ledge Web

Next.js 14 기반의 Financial Ledge 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios

## 요구사항

- Node.js 18 이상
- npm 또는 yarn

## 설치

```bash
cd frontend/web
npm install
```

## 실행

### 개발 서버

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
frontend/web/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 컴포넌트
│   ├── hooks/           # Custom React Hooks
│   ├── lib/             # 유틸리티 및 API 클라이언트
│   ├── providers/       # Context Providers
│   └── types/           # TypeScript 타입 정의
├── public/              # 정적 파일
└── package.json
```

## API 연동

백엔드 API는 `http://localhost:8080/api`로 프록시됩니다.

환경 변수 설정:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 주요 기능

- 거래 내역 조회
- 거래 생성/수정/삭제
- 거래 유형별 필터링
- 카테고리별 필터링

