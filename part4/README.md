# HBnB Part4 - Setup Guide

## 🚀 Quick Start

### Backend (Flask API)

1. **Navigate to backend folder:**
```bash
cd part4/hbnb
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Initialize database with demo data:**
```bash
python seed.py
```

4. **Run the server:**
```bash
python run.py
# or: flask run
```

Server runs on: **http://localhost:5000**

### Frontend (React)

1. **Navigate to frontend folder (in a new terminal):**
```bash
cd part4/front-hbnb
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend runs on: **http://localhost:5173**

## 🔐 Demo Credentials

### Admin User
- **Email:** admin@example.com
- **Password:** admin123

### Regular User
- **Email:** user@example.com
- **Password:** user123

## 📊 Database Contents

The `seed.py` script creates:

- **2 Users:** admin + regular user
- **10 Amenities:** WiFi, AC, Heating, Kitchen, Parking, Pool, Gym, Washer, Dryer, TV
- **6 Places:** Paris, London, Barcelona, Berlin, New York, Amsterdam
- **5 Reviews:** With ratings 3-5 stars

## 🔧 Important Fixes Applied

### Frontend API Endpoints Fixed:
- ✅ `/auth/login` → `/api/v1/auth/login`
- ✅ `/places/` → `/api/v1/places/`
- ✅ `/reviews/` → `/api/v1/reviews/`

### Authentication Flow:
1. User enters credentials on login page
2. Frontend sends POST to `/api/v1/auth/login`
3. Backend returns JWT `access_token`
4. Token stored in localStorage
5. Axios interceptor auto-injects token in all requests

## 📁 Project Structure

```
part4/
├── hbnb/              # Flask Backend
│   ├── app/           # Application code
│   ├── config.py      # Configuration
│   ├── run.py         # Entry point
│   ├── seed.py        # Database seeding script (NEW!)
│   └── requirements.txt
└── front-hbnb/        # React Frontend
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    ├── package.json
    └── .env.local
```

## 🧪 Testing Login

1. Open http://localhost:5173 in browser
2. Click "Login" or go to `/login`
3. Enter: admin@example.com / admin123
4. You should see "Login successful!" toast
5. Redirects to `/places` page
6. Browse places, view details, add reviews

## 🛠️ Troubleshooting

### Backend not starting?
- Make sure port 5000 is free: `netstat -ano | grep 5000`
- Or change port in `run.py`

### Login still failing?
- Clear browser cache/cookies
- Clear localStorage: Open DevTools → Application → LocalStorage → Clear
- Make sure backend is running on port 5000
- Check backend logs for errors

### No places showing?
- Verify `seed.py` ran successfully
- Check browser console for API errors (F12)
- Verify `/api/v1/places/` returns data

### CORS errors?
- Check if backend allows requests from http://localhost:5173
- Flask-CORS may need configuration

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (config.py)
- SQLite database used by default: `hbnb_dev.db`
- Can change to MySQL in config.py

## 🎯 Next Steps

- Add more places/reviews through UI
- Test delete review functionality
- Test search/filter on places page
- Create more users via API
- Test profile/settings page

---

**Everything is now set up and ready to use!** 🎉
