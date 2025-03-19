import React, { useState, useEffect } from "react";
import "./ChatWidget.css";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  // Predefined responses for common questions
  const predefinedResponses = [
    {
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      response: "Hello! 👋 Welcome to our e-learning platform. How can I assist you today?"
    },
    {
      keywords: ["bye", "goodbye", "tata", "see you", "good night"],
      response: "Goodbye! 👋 Have a great day! Feel free to come back if you have more questions."
    },
    {
      keywords: ["contact", "location", "address", "where", "place"],
      response: "You can reach us at:\n\n📍 Location: 123 E-Learning Street, Knowledge City, Edutopia.\n📞 Contact: +1 234 567 890\n📧 Email: support@elearningplatform.com"
    },
    {
      keywords: ["courses", "list of courses", "what courses", "available courses"],
      response: "We offer a wide range of courses:\n\n1. **Programming & Development**:\n   - Python Programming\n   - Web Development (HTML, CSS, JavaScript)\n   - Data Science & Machine Learning\n\n2. **Business & Finance**:\n   - Digital Marketing\n   - Financial Analysis\n   - Business Management\n\n3. **Design & Creativity**:\n   - Graphic Design\n   - UI/UX Design\n   - Video Editing\n\n4. **Personal Development**:\n   - Time Management\n   - Public Speaking\n   - Leadership Skills\n\nLet me know if you'd like more details about any course!"
    },
    {
      keywords: ["pricing", "fee", "cost", "price", "how much"],
      response: "Our course pricing varies depending on the course and its duration. Here are some examples:\n\n- **Python Programming**: $99\n- **Web Development**: $149\n- **Digital Marketing**: $79\n- **Graphic Design**: $89\n\nFor detailed pricing, please visit our website or contact us."
    },
    {
      keywords: ["enroll", "admission", "join", "register", "how to join"],
      response: "To enroll in a course:\n1. Visit our website and browse the courses.\n2. Select the course you're interested in.\n3. Click 'Enroll Now' and complete the registration process.\n4. Make the payment.\n5. Start learning!\n\nNeed help? Contact us at support@elearningplatform.com."
    },
    {
      keywords: ["certificate", "certificates", "how to get certificate", "enroll certificate"],
      response: "To receive a certificate:\n1. Complete the course requirements (videos, quizzes, assignments).\n2. Pass the final assessment.\n3. Download your certificate from your dashboard.\n\nCertificates are issued for all paid courses upon successful completion."
    },
    {
      keywords: ["free courses", "free", "no cost"],
      response: "We offer a selection of free courses to help you get started:\n\n- **Introduction to Programming**\n- **Basics of Digital Marketing**\n- **Fundamentals of Graphic Design**\n\nVisit our website to explore all free courses!"
    },
    {
      keywords: ["trial", "demo", "free trial"],
      response: "We offer a 7-day free trial for most of our courses. During the trial, you can access course materials and decide if it's right for you. No credit card is required!"
    },
    {
      keywords: ["refund", "cancel", "money back"],
      response: "We offer a 30-day money-back guarantee. If you're not satisfied with a course, contact us at support@elearningplatform.com, and we'll process your refund."
    },
    {
      keywords: ["support", "help", "customer service"],
      response: "Our support team is here to help! You can reach us at:\n📞 +1 234 567 890\n📧 support@elearningplatform.com\n\nWe're available Monday to Friday, 9 AM to 6 PM."
    },
    {
      keywords: ["platform", "how it works", "how to use"],
      response: "Our platform is easy to use:\n1. Sign up and create an account.\n2. Browse or search for courses.\n3. Enroll in a course.\n4. Access video lessons, quizzes, and assignments.\n5. Complete the course and earn your certificate.\n\nNeed help? Contact us!"
    },
    {
      keywords: ["mobile app", "app", "download"],
      response: "Yes, we have a mobile app! You can download it from the App Store or Google Play. The app allows you to learn on the go, download lessons, and track your progress."
    },
    {
      keywords: ["instructor", "teachers", "who teaches"],
      response: "Our courses are taught by industry experts with years of experience. Each instructor is carefully selected to ensure high-quality learning."
    },
    {
      keywords: ["duration", "how long", "course length"],
      response: "Course durations vary:\n\n- Short courses: 2-4 weeks\n- Comprehensive courses: 6-12 weeks\n\nYou can check the duration of each course on its details page."
    },
    {
      keywords: ["lifetime access", "access duration"],
      response: "Once you enroll in a course, you get lifetime access to the course materials. You can learn at your own pace and revisit the content anytime."
    },
    {
      keywords: ["payment", "payment methods", "how to pay"],
      response: "We accept various payment methods:\n- Credit/Debit Cards\n- PayPal\n- Bank Transfer\n\nAll payments are secure and encrypted."
    },
    {
      keywords: ["discount", "offer", "coupon"],
      response: "We frequently run discounts and special offers. Subscribe to our newsletter to stay updated on the latest deals!"
    },
    {
      keywords: ["corporate", "business", "team"],
      response: "We offer corporate training programs tailored to your team's needs. Contact us at corporate@elearningplatform.com for more details."
    },
    {
      keywords: ["feedback", "review", "rate"],
      response: "We value your feedback! You can leave a review on the course page or contact us directly at feedback@elearningplatform.com."
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

  // Function to call Gemini API
  async function callGeminiAPI(userQuestion) {
    const apiKey = "YOUR_GEMINI_API_KEY"; // Replace with your Gemini API key
    const apiUrl = "https://api.gemini.com/v1/generate"; // Replace with the actual Gemini API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: userQuestion,
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini API");
      }

      const data = await response.json();
      return data.choices[0].text.trim(); // Extract the generated response
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  // Function to handle user input and generate responses
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
        aiResponse = "Hello! 👋 Welcome to our e-learning platform. How can I assist you today?";
        setFirstMessageSent(true);
      } 
      // Check predefined responses
      else {
        const predefined = getPredefinedResponse(question);
        if (predefined) {
          aiResponse = predefined;
        } 
        // For non-predefined questions, call Gemini API
        else {
          const geminiResponse = await callGeminiAPI(question);
          // Ensure the response is related to the institute
          if (geminiResponse.toLowerCase().includes("institute") || geminiResponse.toLowerCase().includes("e-learning")) {
            aiResponse = geminiResponse;
          } else {
            aiResponse = "I am sorry, but I can only answer questions related to our e-learning platform.";
          }
        }
      }

      const botEntry = { sender: "bot", text: aiResponse };
      setChatHistory((prev) => [...prev, botEntry]);
    } catch (error) {
      console.error("Error in generateAnswer:", error);
      setError("An error occurred while processing your request. Please try again.");
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "I am sorry, but I can only answer questions related to our e-learning platform." }
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  // Effect to display welcome message when chat window is opened
  useEffect(() => {
    if (isOpen && !firstMessageSent) {
      const welcomeMessage = "Welcome to our e-learning platform! 👋 How can I assist you today?";
      setChatHistory([{ sender: "bot", text: welcomeMessage }]);
      setFirstMessageSent(true);
    }
  }, [isOpen, firstMessageSent]);

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>E-Learning Bot 🤖</h3>
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
              placeholder="Ask about courses, pricing, enrollment, or support..."
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