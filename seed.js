/*
  سكريبت تحميل البيانات الأولية — شغّله مرة واحدة بس
  
  الطريقة:
  1. افتح المنيو في المتصفح
  2. اضغط ⚙ وادخل PIN
  3. البيانات تتحمل تلقائي أول مرة

  أو شغّل هذا السكريبت:
  BLOB_READ_WRITE_TOKEN=xxx node seed.js
*/

const MENU_DATA = require('./menu-data.json');

async function seed() {
  const url = process.argv[2] || 'http://localhost:3000';
  const pin = process.argv[3] || '126019';
  
  const res = await fetch(`${url}/api/menu`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-pin': pin },
    body: JSON.stringify(MENU_DATA)
  });
  
  const data = await res.json();
  console.log('Seed result:', data);
}

seed().catch(console.error);
