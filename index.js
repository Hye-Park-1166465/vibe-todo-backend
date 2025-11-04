const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const todoRouter = require('./routers/todos');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/todo";

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
console.log('🔍 MongoDB 연결 시도 중...');
console.log('🔍 URI (처음 50자):', MONGO_URI.substring(0, 50) + '...');
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공!');
    
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 서버가 포트 ${PORT}번에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패:');
    console.error('❌ 오류 메시지:', err.message);
    console.error('❌ 오류 상세:', err);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/todos', todoRouter);
