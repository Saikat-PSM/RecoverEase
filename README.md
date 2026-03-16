# 🏥 RecoverEase

> A mobile-first post-hospitalization care companion app for patients and caregivers.

![RecoverEase Banner](https://img.shields.io/badge/RecoverEase-Post--Hospital%20Care-185FA5?style=for-the-badge)
![React Native](https://img.shields.io/badge/React%20Native-Expo-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 💡 Project Background

This project was conceptualized from a real-life scenario — managing the post-hospitalization recovery of a bilateral shoulder surgery patient (Mrs. Dipali Bhattacharya, Orthopaedics, MH012515258). The discharge summary included a complex medication schedule, physiotherapy plan, and follow-up appointments. Managing all of this for a caregiver was overwhelming — and that's exactly the problem RecoverEase solves.

---

## 📱 What is RecoverEase?

RecoverEase is a mobile application that helps patients and their family caregivers manage:

- **Medication schedules** — morning, afternoon, and night sessions with mark-as-given tracking
- **Caregiver nudges** — email/push notifications sent 5, 10, or 15 minutes before each medicine session
- **Caregiver management** — patients can add, remove, pause, or update caregivers by email
- **Prescription uploads** — store discharge summaries, X-rays, and lab reports in-app
- **Recovery checklist** — post-surgery equipment, hygiene, home safety items
- **Follow-up scheduler** — OPD appointments, clip removal reminders, physiotherapy tracking
- **Patient profile** — full medical profile with editable details

---

## 🎯 Core Problem Solved

| Problem | RecoverEase Solution |
|---|---|
| Complex multi-drug schedules | Structured Morning / Afternoon / Night dashboard |
| Caregiver misses medicine time | Nudge notifications X minutes before each session |
| Discharge papers get lost | In-app prescription document upload & storage |
| Forgotten follow-up appointments | Follow-up scheduler with countdown reminders |
| No central patient record | Editable patient profile with medical summary |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native (Expo) |
| Navigation | React Navigation v6 |
| State Management | React Context + useReducer |
| Notifications | Expo Notifications |
| Storage | AsyncStorage + Firebase Firestore |
| Auth | Firebase Authentication |
| File Uploads | Expo Document Picker + Firebase Storage |
| AI Parsing | Anthropic Claude API (prescription scan) |
| Backend | Firebase Cloud Functions |

---

## 📁 Project Structure

```
recoverease/
├── app/
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   ├── CaregiversScreen.jsx
│   │   ├── MedicinesScreen.jsx
│   │   ├── ChecklistScreen.jsx
│   │   └── FollowUpScreen.jsx
│   ├── components/
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── MedicineCard.jsx
│   │   ├── CaregiverCard.jsx
│   │   └── NudgeSelector.jsx
│   ├── context/
│   │   ├── AppContext.jsx
│   │   └── NotificationContext.jsx
│   ├── services/
│   │   ├── firebase.js
│   │   ├── notifications.js
│   │   ├── prescriptionParser.js
│   │   └── storageService.js
│   ├── hooks/
│   │   ├── useCaregivers.js
│   │   ├── useMedicines.js
│   │   └── useNotifications.js
│   ├── constants/
│   │   ├── medicines.js
│   │   ├── colors.js
│   │   └── config.js
│   └── navigation/
│       └── AppNavigator.jsx
├── assets/
│   ├── icon.png
│   └── splash.png
├── .env.example
├── app.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- A Firebase project
- An Anthropic API key (for prescription parsing)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/recoverease.git
cd recoverease

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Firebase and Anthropic API keys

# 4. Start the development server
npx expo start
```

### Environment Variables

```env
FIREBASE_API_KEY=your_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
ANTHROPIC_API_KEY=your_anthropic_key
```

---

## 🔔 Notification Flow

```
Patient sets medicine schedule
        ↓
Caregiver added with nudge preference (5 / 10 / 15 min)
        ↓
Firebase Cloud Function scheduled trigger
        ↓
Push notification sent to caregiver's device
        ↓
Caregiver gives medicine → marks as "Given" in app
        ↓
Dashboard progress updates in real time
```

---

## 🗺️ Roadmap

- [x] MVP — Medicine schedule + Caregiver nudges
- [x] Patient profile + Prescription uploads
- [x] Recovery checklist
- [x] Follow-up scheduler
- [ ] AI prescription scan (Claude API)
- [ ] Multi-patient support
- [ ] Hospital staff portal
- [ ] WhatsApp nudge integration
- [ ] Analytics dashboard for caregivers

---

## 🙋 About This Project

RecoverEase was ideated and designed based on a real-world post-hospitalization experience. The product logic, feature set, and UX flow were conceived by the project owner, with development support using modern AI-assisted tools.

**Patient context used for design:**
- Patient: Mr. John Doe, 62M
- Procedure: Bilateral ORIF – Proximal Humerus (both shoulders)
- Hospital: MH012515258, Orthopaedics Dept.
- Surgeon: Dr. Malcolm Speed
- Discharge: 13 March 2026

---

## 📄 License

MIT License — feel free to fork, build on, and share.

---

*Built with ❤️ to simplify post-hospital care for families everywhere.*
