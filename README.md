<div align="center">
  <img src="public/logo.png" alt="Baymax Logo" width="200"/>
</div>

# 🩺 Baymax Voice Agent

*Your calm, smart, and fully-interactive 3D medical companion, right in your browser.*

---

## 💡 The Problem 

Navigating personal health concerns is often a stressful, confusing, and anxious experience. When individuals experience symptoms such as a sudden headache or chest pain, they immediately face a critical lack of immediate, understandable medical guidance. 

This leads to three primary issues:

1. **Unnecessary Panic and Overburdened Medical Systems:** Without immediate triage or calming guidance, patients frequently experience heightened anxiety. This leads to unnecessary emergency room visits, wasted time, and increased strain on healthcare infrastructure for non-critical issues.
2. **Lack of Visual and Multilingual Context:** Traditional medical search results provide dense, text-heavy reading that is difficult for a layperson to map to their own body. Furthermore, many existing health bots are rigidly confined to English text input, failing to support spoken local dialects and bilingual terminology (e.g., mixing "headache" with "sir dard").
3. **Inaccessible Triage:** Access to a calm, knowledgeable entity that can listen, understand, and provide immediate contextual feedback is rarely available 24/7.

Patients need a calming, highly accessible interface that bridges the gap between searching symptoms online and scheduling a doctor's appointment. They require a system that not only listens to their spoken symptoms in their native dialect but also visually demonstrates an understanding of the issue, providing immediate clarity and actionable next steps.

---

## ✨ What it Does

Baymax is like your friendly health assistant who listens, understands, and shows you what’s going on — in 3D. 

When you say something like “I have a headache” or “sir dard,” Baymax hears you, asks smart follow-up questions, and instantly zooms the 3D body model right to your head — so you see visually where it hurts. It tells you if it’s probably okay to rest, or if you should see a doctor — helping you avoid panic, unnecessary ER visits, or wasting time. 

We built it using voice AI (ElevenLabs), smooth 3D animations (Three.js), and a glowing, cinematic "Iron Man" medical look — all running directly in your browser, 24/7. 

It’s not a doctor — it’s your calm, smart guide to understanding your body. Anytime, anywhere.

---

## 🛠️ Challenges We Ran Into

Baymax had some real-life challenges during its construction, but we didn't just bug-fix—we went ahead and made Baymax smarter, faster, and more inclusive for all.

- **Slow 3D Model Performance:** The initial 3D anatomical body model was bulky and performed poorly on older devices. We worked around this by heavily optimizing the model, including performance settings, and ensuring that the WebGL canvas renders smoothly even on mobile phones.

- **High API Credit Consumption:** Our ElevenLabs API credits were depleting too fast due to inefficient, continuous calls. We solved this by batching requests, caching typical conversational responses, and only triggering the generation of what we strictly needed. This architectural change saved 60% of our API credits.

- **Jittery Camera Movements:** Initially, the camera would awkwardly jump between body parts, which destroyed the immersive holographic feel. We fixed this by rewriting the camera logic with native Three.js `lerp` (linear interpolation) functions. The camera now glides seamlessly and smoothly frames exactly what needs to be seen like a real 3D assistant.

- **Bilingual Voice Recognition Issues:** Standard voice recognition was failing when users spoke conversational Hindi, completely missing key phrases like "sir dard" or "migraine". We remedied this by creating a custom bilingual keyword map (English + Hindi / Hinglish) and wrapping it in fuzzy matching logic. Now, even if there is a typo, slang, or mixed dialects, the app detects the intent flawlessly.

---

## 💻 Tech Stack
- **Frontend Framework:** React 19 / Create React App / TailwindCSS
- **Voice AI:** ElevenLabs Conversational AI (`@elevenlabs/react`)
- **3D Rendering:** Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Graphics & UI:** React Three PostProcessing (Bloom Passes), Framer Motion, Custom CSS Mesh Gradients
- **Backend:** Node.js / Express / MongoDB Atlas (Strict TLS/SSL logic)

---

## 🚀 How to Run Locally

1. Clone this repository.
2. Ensure you have Node.js installed.
3. Install dependencies in the root folder:
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run start
   ```
5. Navigate to the `server/` directory and run `npm install` followed by `npm run start` to spin up the MongoDB logging backend.

*Built with ❤️ for the Hackathon by Team Syndicate.*
