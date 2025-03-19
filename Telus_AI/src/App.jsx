import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  // Predefined responses for common questions
  const predefinedResponses = [
    { 
      keywords: ["courses", "offered", "study", "learn"], 
      response: "Telus Institute offers comprehensive courses in Web Development, Cybersecurity, Data Science, Digital Marketing, and Artificial Intelligence. Each course is designed with industry standards and includes hands-on projects." 
    },
    { 
      keywords: ["fees", "cost", "price", "payment"], 
      response: "Our course fees are competitive and vary by program. Web Development: $500, Cybersecurity: $700, Data Science: $900. We also offer flexible payment plans and scholarships for eligible students. Visit our website for detailed pricing." 
    },
    { 
      keywords: ["faculty", "teachers", "instructors", "staff"], 
      response: "Our faculty includes industry experts like Dr. John Smith (Cybersecurity), Prof. Emily Davis (Web Development), and Dr. Robert Green (Data Science). All instructors have extensive industry experience." 
    },
    { 
      keywords: ["certificate", "certification", "diploma"], 
      response: "Upon successful course completion, you'll receive a recognized certificate. You can download it from your student portal. Our certificates are industry-recognized and can help boost your career prospects." 
    },
    { 
      keywords: ["location", "address", "where", "place"], 
      response: "Telus Institute is located at 1234 Learning Street, Knowledge City. We have modern facilities and a conducive learning environment. Visit our website for directions and campus tour information." 
    },
    { 
      keywords: ["contact", "reach", "phone", "email"], 
      response: "You can reach us at: Phone: (555) 123-4567, Email: info@telusinstitute.com. Our office hours are Monday-Friday, 9 AM to 6 PM." 
    }
  ];

  // Function to check if user question matches predefined responses
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
        aiResponse = "Hello! I'm the Telus Institute AI assistant. I can help you with information about our courses, fees, faculty, certificates, and more. How can I assist you today?";
        setFirstMessageSent(true);
      } 
      // Check predefined responses
      else {
        const predefined = getPredefinedResponse(question);
        if (predefined) {
          aiResponse = predefined;
        } 
        // Otherwise, send question to Gemini API
        else {
          const prompt = `Answer only if this question is related to the Telus Institute website or education. If not, reply: "I'm sorry, but I can only answer questions related to our institute and education." Question: ${question}`;
          
          const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyApD1hqhAaCz-QejOWX0reWPLjW4S_Hn4Y",
            {
              contents: [{ parts: [{ text: prompt }] }],
            }
          );

          aiResponse =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm sorry, but I can only answer questions related to our institute and education.";
        }
      }

      const botEntry = { sender: "bot", text: aiResponse };
      setChatHistory((prev) => [...prev, botEntry]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "I apologize, but I'm having trouble processing your request. Please try again or contact our support team for assistance." }
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <div className="App">
      <h1>Telus Bot 🤖</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "10px",
          width: "400px",
          height: "500px",
          overflowY: "auto",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {chatHistory.map((entry, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div
              style={{
                textAlign: entry.sender === "user" ? "right" : "left",
                padding: "8px",
                borderRadius: "10px",
                backgroundColor: entry.sender === "user" ? "#2196f3" : "#7e57c2",
                color: "#ffffff",
                display: "inline-block",
                maxWidth: "70%",
              }}
            >
              <strong>{entry.sender === "user" ? "You" : "Bot"}:</strong> {entry.text}
            </div>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask about courses, fees, certificates..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && generateAnswer()}
        style={{
          border: "2px solid #ccc",
          padding: "8px",
          borderRadius: "5px",
          marginRight: "5px",
          width: "300px",
        }}
      />

      <button 
        onClick={generateAnswer} 
        disabled={loading}
        style={{
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Get Answer"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;