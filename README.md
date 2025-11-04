# TODO Backend

Node.js로 구현된 TODO 백엔드 API 서버입니다.

## 설치 방법

1. 프로젝트를 클론합니다:
```bash
git clone <repository-url>
cd todo-backend
```

2. 의존성을 설치합니다:
```bash
npm install
```

3. 환경 변수 파일을 생성합니다:
```bash
cp .env.example .env
```

## 실행 방법

### 일반 실행
```bash
npm start
```

### 개발 모드 (nodemon)
```bash
npm run dev
```

서버는 기본적으로 `http://localhost:5000` 에서 실행됩니다.

## API 엔드포인트

### GET /api/todos
모든 TODO 목록을 가져옵니다.

**응답:**
```json
[
  {
    "id": 1,
    "title": "첫 번째 할일",
    "description": "Node.js 프로젝트 세팅 완료",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/todos/:id
특정 TODO를 가져옵니다.

### POST /api/todos
새로운 TODO를 생성합니다.

**요청:**
```json
{
  "title": "새로운 할일",
  "description": "할일 설명"
}
```

### PUT /api/todos/:id
TODO를 수정합니다.

**요청:**
```json
{
  "title": "수정된 할일",
  "completed": true
}
```

### DELETE /api/todos/:id
TODO를 삭제합니다.

### GET /health
서버 상태를 확인합니다.

## 기술 스택

- Node.js
- Express.js
- CORS
- Body-parser
- Dotenv

## 데이터 저장

현재는 인메모리 저장을 사용합니다. 실제 프로덕션 환경에서는 데이터베이스(MongoDB, PostgreSQL 등)를 사용하는 것을 권장합니다.

