const mongoose = require('mongoose');
require('dotenv').config();

const Todo = require('./models/Todo');

const mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : 'mongodb://localhost:27017/todo-app';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ MongoDB 연결 성공!');
    
    // 기존 데이터 확인
    const existingTodos = await Todo.find();
    console.log(`현재 TODO 개수: ${existingTodos.length}`);
    
    // 테스트 데이터가 없으면 추가
    if (existingTodos.length === 0) {
      const testTodo = new Todo({
        title: '테스트 TODO',
        description: '데이터베이스 생성 테스트입니다. 이 데이터가 저장되면 todo 데이터베이스가 MongoDB Compass에 보입니다.'
      });
      
      await testTodo.save();
      console.log('✅ 테스트 TODO가 생성되었습니다!');
    } else {
      console.log('ℹ️ 이미 데이터가 존재합니다.');
    }
    
    // 현재 데이터베이스 목록 확인
    const db = mongoose.connection.db;
    const adminDb = db.admin();
    const dbList = await adminDb.listDatabases();
    
    console.log('\n📊 현재 데이터베이스 목록:');
    dbList.databases.forEach(db => {
      if (db.name !== 'admin' && db.name !== 'config' && db.name !== 'local') {
        console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
      }
    });
    
    console.log('\n✨ 이제 MongoDB Compass에서 todo 데이터베이스를 확인할 수 있습니다!');
    console.log('   (MongoDB Compass를 새로고침하거나 연결을 다시 선택해주세요)');
    
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ 오류:', err.message);
    process.exit(1);
  });

