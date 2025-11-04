const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const todoRouter = require('./routers/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // 모든 출처에서 접근 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 서빙 (HTML, CSS, JS)
app.use(express.static('public'));

// MongoDB 연결
console.log('🔍 환경변수 확인 중...');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI 존재:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI 길이:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI 환경변수가 설정되지 않았습니다!');
  console.error('Cloudtype에서 환경변수를 설정해주세요:');
  console.error('  Name: MONGODB_URI');
  console.error('  Value: mongodb+srv://...');
  process.exit(1);
}

const mongoURI = process.env.MONGODB_URI.trim();
console.log('🔍 MongoDB 연결 시도 중...');
console.log('🔍 연결 URI (처음 30자):', mongoURI.substring(0, 30) + '...');
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공!');
    
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 서버가 포트 ${PORT}번에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패:', err.message);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/todos', todoRouter);
