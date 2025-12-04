# Financial Ledge Backend

Spring Boot 3.2.5 기반의 Financial Ledge 백엔드 애플리케이션입니다.

## 요구사항

- Java 17 이상
- Gradle 8.5 이상

## 프로젝트 구조

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── financialledge/
│   │   │           ├── FinancialLedgeApplication.java
│   │   │           └── controller/
│   │   │               └── HealthController.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
├── build.gradle
├── settings.gradle
└── README.md
```

## 초기 설정

### Gradle Wrapper 초기화 (첫 실행 시)

시스템에 Gradle이 설치되어 있지 않은 경우, 먼저 Gradle Wrapper를 초기화해야 합니다:

```bash
cd backend
# Windows
gradle wrapper

# Linux/Mac (시스템에 Gradle이 설치된 경우)
./gradlew wrapper
```

또는 IDE(IntelliJ IDEA, VS Code 등)에서 프로젝트를 열면 자동으로 처리됩니다.

## 실행 방법

### Gradle Wrapper를 사용한 실행

```bash
cd backend

# Windows
gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

### 또는 빌드 후 실행

```bash
cd backend

# Windows
gradlew.bat build
java -jar build/libs/financial-ledge-backend-0.0.1-SNAPSHOT.jar

# Linux/Mac
./gradlew build
java -jar build/libs/financial-ledge-backend-0.0.1-SNAPSHOT.jar
```

## 주요 기능

- Spring Boot 3.2.5 (LTS)
- Spring Web (REST API)
- Spring Data JPA
- H2 Database (개발용)
- MySQL 지원 (프로덕션용)

## API 엔드포인트

### Health Check
```
GET http://localhost:8080/api/health
```

## 데이터베이스

개발 환경에서는 H2 인메모리 데이터베이스를 사용합니다.
H2 콘솔: http://localhost:8080/h2-console

## 설정

`src/main/resources/application.yml` 파일에서 애플리케이션 설정을 변경할 수 있습니다.

