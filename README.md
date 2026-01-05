# Nexira – Hospital Administration Decision Support System

Nexira is a comprehensive **hospital management and decision-support platform** designed to assist healthcare administrators in improving operational efficiency, reducing patient waiting times, and enhancing overall service quality. Developed as a **graduation project** at the **Department of Systems and Biomedical Engineering, Faculty of Engineering, Cairo University**, Nexira applies engineering, analytical, and simulation techniques to real-world healthcare challenges.

The system transforms hospital operational data into **actionable insights** using statistical analysis, discrete-event simulations, and performance evaluation tools, enabling administrators to make **data-driven decisions** that optimize hospital operations.

---

## 🚀 Project Overview

Healthcare institutions face increasing pressure to improve patient care while efficiently managing resources. Nexira addresses this by providing administrators with tools to:

- Monitor hospital performance indicators
- Analyze patient flow and resource utilization
- Simulate operational changes before implementation
- Compare hospital performance and benchmark against best practices

The platform acts as a **decision-support layer**, reducing uncertainty and enabling strategic, evidence-based planning.

---

## ✨ Key Features

### 📊 Performance Monitoring with Control Charts

- Track hospital metrics using statistical control charts
- Early detection of abnormal variations and operational inefficiencies
- Trend analysis for continuous performance improvement

### 🏥 Outpatient Department (OPD) Simulation

- Model patient flow in outpatient clinics
- Analyze service times, queues, and resource utilization
- Generate analytical reports automatically

### ⏱️ Waiting Time Reduction Analysis

- Simulate operational scenarios such as:
  - Adding new clinics
  - Modifying booking systems
  - Reallocating staff and resources
- Predict the impact of changes on patient waiting times

### 📈 Hospital Comparison & Ranking

- Compare multiple hospitals using efficiency analysis
- Rank hospitals based on performance metrics
- Identify operational strengths and weaknesses

### 🧠 Data-Driven Decision Support

- Combines statistical analysis, simulation, and efficiency evaluation
- Supports evidence-based hospital management decisions

---

## 🎯 Objectives

- Improve hospital operational efficiency
- Reduce patient waiting times
- Enhance healthcare service quality
- Support hospital administrators with reliable decision-making tools
- Provide a scalable framework adaptable to different healthcare institutions

---

## 👥 Target Users

- Hospital administrators
- Healthcare managers
- Decision-makers and policymakers
- Healthcare systems and operations analysts

---

## 🛠️ Technologies & Concepts

- Healthcare systems engineering
- Statistical process control
- Discrete-event simulation
- Performance and efficiency analysis
- Data-driven decision support methodologies

## 👨‍🎓 Project Team

- **[Mahmoud Zakaria](https://github.com/Mahmoud46)** – Senior Biomedical Engineering Student
- **[Abdelrahman Ali](https://github.com/abdelrahman-ali123)** – Senior Biomedical Engineering Student

### 🎓 Supervisor

- **Dr. Mohamed Sherine**, Faculty of Engineering – Cairo University

---

## 📌 Academic Context

This project was developed as part of the graduation requirements for the **Systems and Biomedical Engineering program** at Cairo University, focusing on applying engineering and analytical techniques to real-world healthcare challenges.

---

**Nexira** — Empowering hospital administrators with data-driven healthcare decisions.

- For additional details about the project, [please click here!](https://mahmoud46.github.io/nexira/)

---

## Demo

![Nexira Demo](nexira.gif)

---

## 📂 Project Structure

```bash
project-root/
├── controllers/
├── services/
├── db/
|   ├── constants_tables.json
|   ├── example_files.json
|   └── users.json
├── static/
|   ├── imgs/
|   ├── temps/
|   ├── js/
|   └── scss/
├── templates/         # HTML templates
├── app.py             # Flask application entry point
└── requirements.txt   # Python dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- pip (included with Python)

### ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/Bachelor-Graduation-Project-Demo.git
```

2. Navigate to the project directory

```bash
cd Bachelor-Graduation-Project-Demo
```

3. Create and activate a virtual environment

```bash
python -m venv venv
venv\Scripts\activate    # On macOS / Linux: source venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run the Flask server

```bash
flask run
```
