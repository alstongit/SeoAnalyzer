# Insight SEO - AI-Powered Text Optimization Tool

**Insight SEO** is a full-stack, single-page web application designed to help content creators, marketers, and writers enhance their text for search engine optimization. By leveraging a suite of AI and data-driven APIs, this tool provides actionable insights, keyword suggestions, and a unique "Precision Strike" feature to intelligently integrate keywords without disrupting the natural flow of the text.




---

## ✨ Features

*   **Multi-Faceted Text Analysis:** Get instant metrics on your text, including a **Flesch-Kincaid Readability Score**, **Word Count**, and **Sentiment Analysis**.
*   **Intelligent Topic Extraction:** Utilizes the TextRazor API to accurately identify the main topics and entities within your content.
*   **SEO Keyword Suggestions:** Generates a list of high-value, searchable keywords based on your primary topic, powered by a real-time SEO data API.
*   **"Precision Strike" Keyword Insertion:** A cutting-edge feature that:
    1.  **Targets** the most semantically relevant sentence in your text using a Text Similarity API.
    2.  **Injects** your chosen keyword into that sentence.
    3.  **Paraphrases** only that single sentence using an AI rewriter to make it sound natural and fluent.
    4.  **Replaces** the original sentence, seamlessly weaving the new keyword into your existing content.
*   **Convenience Tools:** Includes "Copy to Clipboard" and a "Clear Session" functionality for a smooth user workflow.

---

## 🛠️ Tech Stack

This project is a full-stack MERN application (minus the MongoDB) built with a focus on a modern, efficient, and scalable architecture.

### **Frontend**
*   **Framework:** **React.js** (with Vite for blazing-fast development)
*   **UI Components:** **shadcn/ui** - A beautifully designed and accessible component library.
*   **Styling:** **Tailwind CSS** - For utility-first styling.
*   **Animations:** **Framer Motion** - For subtle and professional UI animations.
*   **HTTP Client:** **Axios** - For making requests to the backend API.

### **Backend**
*   **Framework:** **Node.js** with **Express.js**
*   **Architecture:** A stateless, service-oriented architecture that separates concerns into **Routes**, **Controllers**, and **Services**.
*   **Security:** Environment variables managed with `dotenv` to keep API keys and secrets secure.

### **External APIs & Services**
*   **Topic Extraction:** [TextRazor API](https://www.textrazor.com/)
*   **SEO Keyword Suggestions:** [RapidAPI - SEO Keyword Research](https://rapidapi.com/aves-api/api/seo-keyword-research)
*   **Sentence Similarity:** [API-Ninjas - Text Similarity API](https://api-ninjas.com/api/textsimilarity)
*   **AI Paraphrasing:** [RapidAPI - Quillbot Alternative](https://rapidapi.com/rest-apis/api/quillbot-alternative-advanced-paraphrasing)
*   **Sentiment Analysis:** [API-Ninjas - Sentiment API](https://api-ninjas.com/api/sentiment)

---

## 🚀 Getting Started

To run this project locally, you will need to set up both the backend and frontend services.

### **Prerequisites**
*   Node.js (v18 or later recommended)
*   npm or yarn
*   API keys for all the services listed in the Tech Stack section.

### **Backend Setup**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name/seo-analyzer-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    *   Create a `.env` file in the `seo-analyzer-backend` root directory.
    
    ```
    TEXTRAZOR_API_KEY=YOUR_TEXTRAZOR_API_KEY
    RAPIDAPI_SEO_KEY=YOUR_RAPIDAPI_SEO_KEY
    API_NINJAS_KEY=YOUR_API_NINJAS_KEY
    QUILLBOT_ALT_API_KEY=YOUR_QUILLBOT_ALT_API_KEY
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:5001`.

### **Frontend Setup**

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../seo-analyzer-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    *   Create a `.env.local` file in the `seo-analyzer-frontend` root directory.
    *   Add the following line:
    ```
    VITE_API_BASE_URL=http://localhost:5001/api
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 🏛️ Design & Architectural Decisions

*   **Decoupled Backend:** The backend is designed as an "orchestrator" or "gateway." Its primary role is to manage requests and orchestrate calls to specialized third-party APIs. This keeps the application lightweight and focused.
*   **Service-Oriented Architecture:** Each external API call or complex business logic (like readability) is encapsulated in its own **service** file. This makes the system highly modular, easy to test, and easy to extend. For example, swapping out a paraphrasing API only required changing one file (`paraphraseService.js`) without touching any core controller logic.
*   **"Precision Strike" Insertion:** The decision to paraphrase only a single, targeted sentence was a key design choice. It respects the user's original voice, improves performance, and reduces API costs compared to paraphrasing the entire document.
*   **Concurrent API Calls:** On the backend, `Promise.all` is used to run non-dependent analyses (readability, topic extraction, sentiment) in parallel, minimizing the total wait time for the user.
*   **Stateless Backend:** The backend does not store any user data or session information, making it simple, scalable, and secure.

---

## 💡 Future Enhancements

This project has a solid foundation that can be extended with many more features:
*   **User-Selectable Tone:** Allow users to choose a `mode` (e.g., 'formal', 'creative') for the paraphrasing API.
*   **Keyword Density Analysis:** Show how many times key topics are mentioned in the text.
*   **SEO Checklist & Scoring:** Provide a gamified "report card" for the text based on a set of SEO best practices.
*   **User Authentication & Saved History:** Allow users to create accounts and save their analysis history.

---

**Author:** [Alston Dsouza]
