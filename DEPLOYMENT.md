# دليل النشر على GitHub Pages

## الخطوات

### 1. إنشاء مستودع على GitHub
1. افتح [github.com/new](https://github.com/new)
2. اكتب اسم المستودع مثلاً: `sadaqah-jariyah`
3. اتركه Public
4. اضغط **Create repository**

### 2. رفع الكود
```bash
cd sadaqah-jariyah
git init
git add .
git commit -m "Initial commit: صدقة جارية"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sadaqah-jariyah.git
git push -u origin main
```

### 3. تفعيل GitHub Pages
1. افتح Settings في المستودع
2. اختر **Pages** من القائمة الجانبية
3. في Source اختر **GitHub Actions**
4. احفظ الإعدادات

### 4. تشغيل الـ Workflow
عند كل push على main يعمل الـ workflow تلقائياً.
لتشغيله يدوياً: Actions > Deploy to GitHub Pages > Run workflow

### 5. الموقع جاهز!
سيكون الموقع على:
`https://YOUR_USERNAME.github.io/sadaqah-jariyah/`

---

## اختبار محلي
```bash
npm run dev
# افتح http://localhost:3000
```

## بناء محلي
```bash
npm run build
# ستجد الملفات في مجلد /out
```
