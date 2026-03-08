#  Baymax Voice Agent

Your interactive, intelligent, and totally 3D medical companion, in your browser.

---

##  The Problem 

The process of passing through personal health issues is usually stressful, disorienting, and nervous. When people report with such symptoms as sudden headache or pain in their chest, critically lack of timely, comprehensible medical advice is confronted. 

This gives birth to three main problems:

1. Unjustified Panic and Overworked Medical Systems: Patients often undergo a new wave of anxiety, unless it is timely triaged or soothed with a calming manner. The end result is a waste of time and unnecessary visits to the emergency room and overload on the healthcare infrastructure due to non-critical cases.
2. Absence of Visual and Multilingual Context: Conventional medical search results are overly rich in text, and a layperson finds it hard to be able to relate the text to his own body. Moreover, most of the current health bots are strictly tied to text input in the English language, which does not admit of spoken local dialects and bi-lingual terminology (e.g., uniting of headache and sir dard).
3. Unavailable Triage: 24/7 access to a calm knowledgeable being which can listen, comprehend, and give immediate contextual response is seldom the case.

The patients require a relaxing and easy to use interface that is able to bridge the gap between the online symptom search and making a doctor appointment. They need to have a system that does not just listen to what they are saying with their own native tongue, but also displays an awareness of the problem that gives immediate clarity and a next course of action.

---



##  What it Does

Baymax can be seen as your close healthcare companion that listens, empathizes, and displays what is happening to you, but in 3D. 

Baymax listens to you when you say something like I have a headache or sir dard, asks you some smart follow-up questions, and then immediately flies the 3D body model into your head so that you can see, directly, where it hurts. It informs you whether it is likely safe to rest or not, or whether you need to visit a doctor, or end up wasting time and avoiding panic and unjustified visits to the ER. 

We created it with voice AI (ElevenLabs), 3D smooth-animating (Three.js), and a glow and an entheliastic cinematic Iron Man medical appearance - all in your browser, 24/7. 

It is not a doctor, it is the smart comfortable person who is explaining your body. Anytime, anywhere.

---

## [?] Challenges We Ran Into

Baymax also did not go without its own construction issues in the real world, our bugfixing only ended with enhancing Baymax to be smarter, faster, and more accommodating to everyone.

- Slow 3D Model Performance: The original 3D anatomy body model was large and was not actorable with older devices. We have gone around this by drastically optimizing the model and performance settings as well as making the WebGL canvas render smoothly even on the mobile phones.

- Large API Credit Usage: API credits in ElevenLabs were being consumed too rapidly because of the inefficient, continuous calls. The solution here was to batch requests, store common conversational replies and only request the generation of what we actually require. This architectural modification saved 60 percent of our API credits.

- Unnaturality of the Camera Movements: First, the camera leaped clumsily between the parts of the body, and this killed the immersive holographic experience. We corrected this by completely rewriting the camera logic to use native Three.js lerp (linear interpolation) functions. This is because the camera now slides around effortlessly and fluidly capturing at any point what must be viewed as much as it would seem to an actual 3D assistant.

- Bilingual Voice Recognition Problems: Standard voice recognition was not working at all when people talked conversational Hindi as they did not recognize the key phrases such as sir dard or migraine at all. This we corrected by developing our own bilingual (English + Hindi / Hinglish) keyword map and enclosing it in fuzzy matching logic. Today, notwithstanding typos, colloquialisms or hybrid dialects, the app reads the intent perfectly.

---

##  Tech Stack
- Frontend Framework: React 19 / Create React App / TailwindCSS.
- Voice AI: ElevenLabs Conversational AI (`elevenlabs/react`)
- 3D Rendering: Three.js / React Three Fiber (`@react-three/fiber`,`@react-three/drei)
- Graphics & UI: React Three PostProcessing (Bloom Passes), Framer Motion, CSS mesh gradients (custom).
- Backend: Node.js / Express / MongoDB Atlas (Strict TLS/SSL logic)

---

##  How to Run Locally

1. Clone this repository.
2. Make sure that you have installed Node.js.
3. Install requirements in root:
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run start
   ```
5. Everyone inside the directory, go to the server/ directory and run npm install then npm run start to spin up the MongoDB logging backend.


<img width="1800" height="1001" alt="Screenshot 2026-03-07 at 9 44 21 PM" src="https://github.com/user-attachments/assets/29572d22-1c90-4292-a432-e79d2fbf7ad4" />


Built with Team Syndicate for the Hackathon.
