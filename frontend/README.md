# Financial Ledge Frontend

Financial Ledge 프로젝트의 프론트엔드 애플리케이션입니다.

## 프로젝트 구조

```
frontend/
├── web/          # Next.js 웹 애플리케이션
└── mobile/       # React Native 모바일 애플리케이션
```

## 웹 애플리케이션 (Next.js)

웹 애플리케이션은 Next.js 14를 사용합니다.

자세한 내용은 [web/README.md](./web/README.md)를 참조하세요.

### 빠른 시작

```bash
cd web
npm install
npm run dev
```

## 모바일 애플리케이션 (React Native)

모바일 애플리케이션은 React Native를 사용합니다.

자세한 내용은 [mobile/README.md](./mobile/README.md)를 참조하세요.

### 빠른 시작

```bash
cd mobile
npm install
npm run android  # 또는 npm run ios
```

## 공통 기능

두 애플리케이션 모두 다음 기능을 공유합니다:

- 거래 내역 조회
- 거래 생성/수정/삭제
- 거래 유형별 필터링
- 카테고리별 필터링

## 백엔드 연동

백엔드 API는 `http://localhost:8080/api`로 연결됩니다.

## 기술 스택

### 웹
- Next.js 14
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios

### 모바일
- React Native 0.76
- TypeScript
- TanStack Query
- Axios

