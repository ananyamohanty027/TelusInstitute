import React, { useState } from "react";
import axios from "axios";
import "./ChatWidget.css";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  const predefinedResponses = [
    {
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      response: "Hello! 👋 I'm your Telus Institute assistant. How can I help you today?"
    },
    {
      keywords: ["bye", "goodbye", "tata", "see you", "good night"],
      response: "Goodbye! 👋 Have a great day! Feel free to come back if you have more questions about Telus Institute."
    },
    {
      keywords: ["address", "location", "where", "place"],
      response: "Telus Institute is located at Street No 05, Dagana Road, near Ramgarhia Chowk, Labh Nagar, Subhash Nagar, Hoshiarpur, Punjab 146001"
    },
    {
      keywords: ["courses", "list of courses", "what courses", "available courses"],
      response: "We offer a wide range of courses:\n1. Computer Science Courses:\n   - Programming Languages – ₹1200\n   - Data Structures and Algorithms (DSA) – ₹1350\n   - Object-Oriented Programming (OOPs) – ₹1100\n   - Computer Organization and Architecture – ₹1400\n   - Operating Systems (OS) – ₹1300\n   - Database Management Systems (DBMS) – ₹1250\n   - Computer Networks – ₹1450\n   - Theory of Computation – ₹1150\n   - Compiler Design – ₹1500\n   - Software Engineering – ₹1050\n   - Cyber Security and Cryptography – ₹1480\n   - Artificial Intelligence (AI) & Machine Learning (ML) – ₹1350\n   - Deep Learning & Neural Networks – ₹1380\n   - Cloud Computing – ₹1470\n   - Big Data Analytics – ₹1290\n   - Blockchain Technology – ₹1420\n\n2. English Courses:\n   - Spoken English – ₹900\n   - Business English – ₹1050\n   - IELTS Preparation – ₹1450\n   - Academic Writing – ₹800\n\n3. Science Courses:\n   - Physics – ₹1150\n   - Chemistry – ₹980\n   - Biology – ₹1250"
    },
    {
      keywords: ["operating system", "os", "fee for os", "price of os", "cost of os", "os course fee", "operating system fee", "operating system price", "operating system cost"],
      response: "The fee for Operating Systems (OS) course is ₹1300. This course covers process management, memory management, file systems, and device management."
    },
    {
      keywords: ["big data analytics", "big data", "data analytics", "fee for big data", "price of big data", "cost of big data", "big data course fee", "big data analytics fee", "big data analytics price", "big data analytics cost"],
      response: "The fee for Big Data Analytics course is ₹1290. This course covers data collection, processing, analysis, visualization, and machine learning integration."
    },
    {
      keywords: ["programming languages", "programming", "languages", "fee for programming", "price of programming", "cost of programming", "programming course fee", "programming languages fee", "programming languages price", "programming languages cost"],
      response: "The fee for Programming Languages course is ₹1200. This course covers various programming paradigms and languages including Python, Java, C++, and JavaScript."
    },
    {
      keywords: ["dsa", "data structures", "algorithms", "fee for dsa", "price of dsa", "cost of dsa", "dsa course fee", "data structures fee", "algorithms fee", "data structures price", "algorithms price", "data structures cost", "algorithms cost"],
      response: "The fee for Data Structures and Algorithms (DSA) course is ₹1350. This course covers arrays, linked lists, trees, graphs, and various algorithms."
    },
    {
      keywords: ["oops", "object oriented", "object-oriented", "fee for oops", "price of oops", "cost of oops", "oops course fee", "object oriented fee", "object oriented price", "object oriented cost"],
      response: "The fee for Object-Oriented Programming (OOPs) course is ₹1100. This course covers classes, objects, inheritance, polymorphism, and design patterns."
    },
    {
      keywords: ["computer organization", "architecture", "fee for computer organization", "price of computer organization", "cost of computer organization", "computer organization fee", "computer organization price", "computer organization cost"],
      response: "The fee for Computer Organization and Architecture course is ₹1400. This course covers digital logic, CPU architecture, memory systems, and I/O systems."
    },
    {
      keywords: ["dbms", "database", "databases", "fee for dbms", "price of dbms", "cost of dbms", "dbms course fee", "database fee", "database price", "database cost"],
      response: "The fee for Database Management Systems (DBMS) course is ₹1250. This course covers relational database design, SQL, data modeling, and transaction management."
    },
    {
      keywords: ["computer networks", "networks", "fee for networks", "price of networks", "cost of networks", "networks course fee", "computer networks fee", "computer networks price", "computer networks cost"],
      response: "The fee for Computer Networks course is ₹1450. This course covers network architecture, protocols, security, and wireless networks."
    },
    {
      keywords: ["theory of computation", "computation", "fee for theory of computation", "price of theory of computation", "cost of theory of computation", "theory of computation fee", "theory of computation price", "theory of computation cost"],
      response: "The fee for Theory of Computation course is ₹1150. This course covers automata theory, formal languages, and complexity theory."
    },
    {
      keywords: ["compiler design", "compilers", "fee for compiler", "price of compiler", "cost of compiler", "compiler course fee", "compiler design fee", "compiler design price", "compiler design cost"],
      response: "The fee for Compiler Design course is ₹1500. This course covers lexical analysis, syntax analysis, code generation, and optimization techniques."
    },
    {
      keywords: ["software engineering", "software development", "fee for software engineering", "price of software engineering", "cost of software engineering", "software engineering fee", "software engineering price", "software engineering cost"],
      response: "The fee for Software Engineering course is ₹1050. This course covers software development life cycle, requirements engineering, and project management."
    },
    {
      keywords: ["cyber security", "cryptography", "security", "fee for cyber security", "price of cyber security", "cost of cyber security", "security course fee", "cyber security fee", "cyber security price", "cyber security cost"],
      response: "The fee for Cyber Security and Cryptography course is ₹1480. This course covers network security, cryptography algorithms, and security protocols."
    },
    {
      keywords: ["ai", "artificial intelligence", "machine learning", "ml", "fee for ai", "price of ai", "cost of ai", "ai course fee", "artificial intelligence fee", "machine learning fee", "artificial intelligence price", "machine learning price", "artificial intelligence cost", "machine learning cost"],
      response: "The fee for Artificial Intelligence (AI) & Machine Learning (ML) course is ₹1350. This course covers neural networks, deep learning, and AI applications."
    },
    {
      keywords: ["deep learning", "neural networks", "fee for deep learning", "price of deep learning", "cost of deep learning", "deep learning course fee", "deep learning fee", "deep learning price", "deep learning cost"],
      response: "The fee for Deep Learning & Neural Networks course is ₹1380. This course covers advanced neural network architectures, deep learning frameworks, and applications."
    },
    {
      keywords: ["cloud computing", "cloud", "fee for cloud", "price of cloud", "cost of cloud", "cloud course fee", "cloud computing fee", "cloud computing price", "cloud computing cost"],
      response: "The fee for Cloud Computing course is ₹1470. This course covers cloud architecture, virtualization, service models, and cloud security."
    },
    {
      keywords: ["blockchain", "blockchain technology", "fee for blockchain", "price of blockchain", "cost of blockchain", "blockchain course fee", "blockchain fee", "blockchain price", "blockchain cost"],
      response: "The fee for Blockchain Technology course is ₹1420. This course covers blockchain architecture, smart contracts, cryptocurrency systems, and applications."
    },
    {
      keywords: ["spoken english", "speaking english", "fee for spoken english", "price of spoken english", "cost of spoken english", "spoken english course fee", "spoken english fee", "spoken english price", "spoken english cost"],
      response: "The fee for Spoken English course is ₹900. This course focuses on improving your speaking skills, pronunciation, and communication abilities."
    },
    {
      keywords: ["business english", "fee for business english", "price of business english", "cost of business english", "business english course fee", "business english fee", "business english price", "business english cost"],
      response: "The fee for Business English course is ₹1050. This course covers professional communication, business writing, and workplace vocabulary."
    },
    {
      keywords: ["ielts", "ielts preparation", "fee for ielts", "price of ielts", "cost of ielts", "ielts course fee", "ielts fee", "ielts price", "ielts cost"],
      response: "The fee for IELTS Preparation course is ₹1450. This course prepares you for all sections of the IELTS exam with practice tests and strategies."
    },
    {
      keywords: ["academic writing", "fee for academic writing", "price of academic writing", "cost of academic writing", "academic writing course fee", "academic writing fee", "academic writing price", "academic writing cost"],
      response: "The fee for Academic Writing course is ₹800. This course covers essay writing, research papers, and academic style guidelines."
    },
    {
      keywords: ["physics", "fee for physics", "price of physics", "cost of physics", "physics course fee", "physics fee", "physics price", "physics cost"],
      response: "The fee for Physics course is ₹1150. This course covers fundamental physics concepts, practical experiments, and problem-solving techniques."
    },
    {
      keywords: ["chemistry", "fee for chemistry", "price of chemistry", "cost of chemistry", "chemistry course fee", "chemistry fee", "chemistry price", "chemistry cost"],
      response: "The fee for Chemistry course is ₹980. This course covers chemical principles, laboratory work, and practical applications."
    },
    {
      keywords: ["biology", "fee for biology", "price of biology", "cost of biology", "biology course fee", "biology fee", "biology price", "biology cost"],
      response: "The fee for Biology course is ₹1250. This course covers biological concepts, laboratory work, and practical applications."
    },
    {
      keywords: ["fee", "fees", "price", "cost", "charges", "course fee", "course fees"],
      response: "Our course fees are as follows:\n\nComputer Science Courses:\n- Programming Languages: ₹1200\n- Data Structures and Algorithms (DSA): ₹1350\n- Object-Oriented Programming (OOPs): ₹1100\n- Computer Organization and Architecture: ₹1400\n- Operating Systems (OS): ₹1300\n- Database Management Systems (DBMS): ₹1250\n- Computer Networks: ₹1450\n- Theory of Computation: ₹1150\n- Compiler Design: ₹1500\n- Software Engineering: ₹1050\n- Cyber Security and Cryptography: ₹1480\n- AI & Machine Learning (ML): ₹1350\n- Deep Learning & Neural Networks: ₹1380\n- Cloud Computing: ₹1470\n- Big Data Analytics: ₹1290\n- Blockchain Technology: ₹1420\n\nEnglish Courses:\n- Spoken English: ₹900\n- Business English: ₹1050\n- IELTS Preparation: ₹1450\n- Academic Writing: ₹800\n\nScience Courses:\n- Physics: ₹1150\n- Chemistry: ₹980\n- Biology: ₹1250\n\nPlease note that these fees are subject to change. For the most up-to-date information, please contact our office."
    },
    {
      keywords: ["number of courses", "how many courses", "total courses"],
      response: "We currently offer 19 specialized courses across three main categories: Computer Science (16 courses), English Language (4 courses), and Science (3 courses)."
    },
    {
      keywords: ["faculty", "teachers", "instructors", "who teaches"],
      response: "Our faculty members are highly qualified professionals with years of experience in their respective fields. Each course is taught by expert instructors who are dedicated to providing quality education."
    },
    {
      keywords: ["timing", "hours", "schedule", "class timing", "opening hours"],
      response: "Our institute is open Monday to Saturday:\n- Weekdays: 9:00 AM to 8:00 PM\n- Saturday: 9:00 AM to 5:00 PM\n- Sunday: Closed\n\nClass timings vary by course. Please contact us for specific course schedules."
    },
    {
      keywords: ["certificate", "certificates", "how to get certificate", "enroll certificate"],
      response: "To get a certificate from Telus Institute:\n1. Choose your desired course\n2. Complete the registration process\n3. Attend the required number of classes\n4. Pass the course assessment\n5. Receive your certificate upon successful completion\n\nFor specific course requirements, please contact our office."
    },
    {
      keywords: ["enroll", "admission", "join", "register", "how to join"],
      response: "To enroll in our courses:\n1. Visit our institute or contact us online\n2. Choose your desired course\n3. Fill out the registration form\n4. Submit required documents\n5. Pay the course fee\n\nOur staff will guide you through the entire process."
    },
    {
      keywords: ["computer", "programming", "coding", "software", "it"],
      response: "We offer various computer courses including Python Programming, Web Development, Data Science, and Machine Learning. Our courses are designed to provide hands-on experience and industry-relevant skills."
    },
    {
      keywords: ["english", "language", "speaking", "writing"],
      response: "We provide comprehensive English language courses including Spoken English, Business English, IELTS preparation, and Academic Writing. Our experienced faculty ensures personalized attention."
    },
    {
      keywords: ["science", "physics", "chemistry", "biology"],
      response: "Our science courses cover Physics, Chemistry, and Biology. We have well-equipped laboratories and experienced faculty to provide practical knowledge."
    },
    {
      keywords: ["current affairs", "news", "latest", "recent"],
      response: "We regularly organize current affairs sessions and discussions to keep our students updated with the latest developments in various fields."
    }
  ];

  function getPredefinedResponse(input) {
    input = input.toLowerCase();
    for (let item of predefinedResponses) {
      if (item.keywords.some(keyword => input.includes(keyword))) {
        return item.response;
      }
    }
    return null;
  }

  async function generateAnswer() {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);

    const newEntry = { sender: "user", text: question };
    setChatHistory((prev) => [...prev, newEntry]);

    try {
      let aiResponse = "";

      // First bot message
      if (!firstMessageSent) {
        aiResponse = "Hello! 👋 I'm your Telus Institute assistant. I can help you with information about our institute's location, courses, faculty, timings, certificates, and more. How can I assist you today?";
        setFirstMessageSent(true);
      } 
      // Check predefined responses
      else {
        const predefined = getPredefinedResponse(question);
        if (predefined) {
          aiResponse = predefined;
        } 
        // For any non-predefined question, return the restricted message
        else {
          aiResponse = "I am sorry, but I can only answer questions related to our institute or education.";
        }
      }

      const botEntry = { sender: "bot", text: aiResponse };
      setChatHistory((prev) => [...prev, botEntry]);
    } catch (error) {
      console.error("Error in generateAnswer:", error);
      setError("An error occurred while processing your request. Please try again.");
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "I am sorry, but I can only answer questions related to our institute or education." }
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Telus Bot 🤖</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`message ${entry.sender === "user" ? "user-message" : "bot-message"}`}
              >
                <strong>{entry.sender === "user" ? "You" : "Bot"}:</strong> {entry.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about our location, courses, faculty, timings, or certificates..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && generateAnswer()}
            />
            <button onClick={generateAnswer} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>
    </div>
  );
}; 