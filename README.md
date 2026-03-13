# OLS Menu — Digital Menu + Admin Panel

منيو OLS الرقمي مع لوحة تحكم مدمجة.

---

## 🚀 الرفع على Vercel (خطوة بخطوة)

### الخطوة 1: GitHub
1. سوّ Repository جديد على GitHub (اسمه مثلاً `ols-menu`)
2. ارفع كل الملفات هذي فيه

### الخطوة 2: Vercel
1. ادخل [vercel.com](https://vercel.com) وسجّل بحساب GitHub
2. اضغط **"Add New" → "Project"**
3. اختر الـ repo `ols-menu`
4. اضغط **Deploy** — خلاص!

### الخطوة 3: Blob Storage (لحفظ بيانات المنيو)
1. في Vercel dashboard → اختر المشروع
2. روح **Storage** tab
3. اضغط **"Create Database"** → اختر **"Blob"**
4. اسمه: `ols-menu-data`
5. Vercel يضيف الـ `BLOB_READ_WRITE_TOKEN` تلقائياً

### الخطوة 4: PIN المالك
1. في Vercel → المشروع → **Settings** → **Environment Variables**
2. أضف: `OWNER_PIN` = `126019` (أو أي PIN تبيه)

### الخطوة 5: ربط الدومين
1. في Vercel → المشروع → **Settings** → **Domains**
2. أضف `ols.sa`
3. Vercel يعطيك DNS records — تضيفها عند مزود الدومين

### الخطوة 6: تحميل البيانات الأولية
1. افتح الموقع
2. اضغط ⚙ في الهيدر
3. ادخل PIN المالك
4. اضغط "+ إضافة صنف جديد" وأضف أصنافك

أو شغّل: `node seed.js https://ols.sa 126019`

---

## 📁 هيكل المشروع
```
ols-menu/
├── vercel.json         ← إعدادات Vercel
├── package.json
├── menu-data.json      ← بيانات أولية (للـ seed)
├── seed.js             ← سكريبت تحميل أولي
├── api/
│   └── menu.js         ← API (قراءة + كتابة المنيو)
└── public/
    └── index.html      ← صفحة المنيو + لوحة التحكم
```

## 🔑 الاستخدام
- **العميل**: يدخل `ols.sa` → يشوف المنيو
- **المالك**: يضغط ⚙ → يدخل PIN → يعدّل كل شي من الجوال

## 💡 ملاحظات
- Vercel Blob مجاني (250 MB + 1000 PUT/شهر)
- الصور تبقى مستضافة على Framer أو أي رابط خارجي
- لو تبي تنقل صورة: ارفعها على أي hosting واستخدم الرابط
- كل تعديل من لوحة التحكم ينعكس فوراً على المنيو

---
Developed by Mohammed Al-Hasoon
