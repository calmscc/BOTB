# 🚀 NOLAlytics
## AI Retail Visibility Analyzer
### Battle of the Brains (BOTB) Hackathon Project

---

# 🧠 What is NOLAlytics?

**NOLAlytics** is an AI analytics platform that measures **how often retailers appear in AI-generated product recommendations.**

As AI assistants like **ChatGPT, Gemini, and Perplexity** become the new way consumers search for products, retailers must understand:

> **“Does AI recommend our store when customers ask what to buy?”**

NOLAlytics answers that question.

The platform runs **hundreds of simulated shopping queries**, analyzes the results, and calculates **AI visibility scores for retailers**.

---

# 💡 The Problem

AI assistants are quickly replacing traditional search engines for product discovery.

Example queries:

```
best headphones
where should I buy a laptop
best running shoes under $200
```

AI assistants often recommend **specific retailers**.

However:

❌ Companies cannot see how often they appear  
❌ Companies cannot track AI visibility  
❌ Companies cannot benchmark competitors  

NOLAlytics solves this problem.

---

# 🛠 What NOLAlytics Does

For any **store + product query**, the system:

1️⃣ Generates **hundreds of real-world prompts**

Example:

```
best headphones
top rated headphones
where to buy headphones
best headphones under $200
best headphones reddit
```

2️⃣ Runs prompts through multiple simulated AI engines  

3️⃣ Extracts retailer mentions  

4️⃣ Calculates **AI visibility scores**  

5️⃣ Displays results in an interactive dashboard  

---

# 📊 Example Output

**Input**

```
Store: Walmart
Product: Headphones
```

**Output**

| AI Engine | Mentions | Visibility |
|----------|----------|-----------|
| ChatGPT | 42 | 21% |
| Gemini | 38 | 19% |
| Perplexity | 35 | 17% |

Prompts tested: **200**

---

# ✨ Key Features

### 🔎 AI Visibility Audits
Analyze how often retailers appear in AI-generated recommendations.

### 🤖 Multi-AI Engine Comparison
Evaluate performance across multiple AI platforms.

### 📈 Interactive Dashboard
Visualize results through charts and summary cards.

### 🧾 Audit History
Track previous analyses for comparison.

### ⚡ High-Volume Prompt Simulation
Runs **hundreds of prompts** to simulate real consumer searches.

---

# 🏗 System Architecture

NOLAlytics uses a **hybrid Node.js + Python architecture**.

```
Frontend Dashboard
        │
        ▼
Node.js API Server
(server.js)
        │
        ▼
Python AI Engine
(main.py)
        │
        ▼
AI Analysis Modules
 ├─ ai_query_engine.py
 ├─ retail_extractor.py
 ├─ audit_engine.py
 └─ verification_engine.py
```

### Why this architecture?

Node.js  
✔ Fast API server  
✔ Frontend integration  

Python  
✔ Data analysis  
✔ AI experimentation  
✔ Easy scaling to ML models  

---

# 🖥 Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend API
- Node.js  
- Express.js  

### AI Processing
- Python  

### Data Analysis
- Python analytics modules  

### Deployment
- Render Cloud Hosting

---

# 📁 Project Structure

```
BOTB
│
├── backend
│   ├── server.js
│   ├── main.py
│   ├── ai_query_engine.py
│   ├── retail_extractor.py
│   ├── audit_engine.py
│   └── verification_engine.py
│
├── frontend
│   └── index.html
│
├── database.js
├── promptGenerator.js
├── crawler.js
├── scheduler.js
│
├── requirements.txt
├── package.json
└── README.md
```

---

# ⚙️ How to Run the Application

### 1️⃣ Clone the Repository

```
git clone https://github.com/calmscc/BOTB
cd BOTB
```

---

### 2️⃣ Install Dependencies

Node:

```
npm install
```

Python:

```
pip install -r requirements.txt
```

---

### 3️⃣ Run the Server

```
node backend/server.js
```

---

### 4️⃣ Open the Dashboard

```
http://localhost:5000
```

---

# 🧪 How to Use

1️⃣ Enter a **Retail Store**

Example:

```
Walmart
```

2️⃣ Enter a **Product**

Example:

```
Headphones
```

3️⃣ Click:

```
Analyze Visibility
```

4️⃣ View results:

• Prompts tested  
• AI visibility percentages  
• Mentions per AI platform  

---

# ✅ How to Tell the App Started Successfully

When running the server you should see:

```
Server running on port 5000
```

Then open:

```
http://localhost:5000
```

If the dashboard loads and allows queries, the application is working.

---

# 🧠 Future Improvements

NOLAlytics can evolve into a full AI analytics platform with:

• Real AI API integrations  
• Competitor visibility benchmarking  
• SEO-style AI optimization tools  
• Brand monitoring dashboards  
• Automated weekly reports  

---

# 🏆 Hackathon Vision

AI assistants are becoming the **new search engines**.

Companies will need to track:

> **“How visible are we in AI?”**

NOLAlytics provides the foundation for **AI visibility analytics.**

---

# 👥 Team

Battle of the Brains Hackathon Project

Developed to explore the intersection of:

- AI
- Retail analytics
- Search visibility
- Data science

---

# ⭐ Final Note

NOLAlytics demonstrates how businesses can **measure their presence in the emerging AI-powered discovery ecosystem.**

As AI reshapes commerce, tools like NOLAlytics will become essential for understanding **who AI recommends — and why.**
