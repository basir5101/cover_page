// import { useState } from 'react'
// import ChatBox from './ChatBox'
// import { MessageCircle, MessageSquare } from 'react-feather'

// const ChatBot = () => {
//     const [showChatBox, setShowChatBox] = useState(false)

//     const handleChatIconClick = () => {
//         setShowChatBox(!showChatBox)
//     }

//     return (
//         <>
//             <div className='border shadow-lg px-4 py-2 fw-bold h4 bg-white rounded chatIcon' style={{
//                 position: 'fixed',
//                 bottom: 20,
//                 right: 30,
//                 cursor: 'pointer',
//                 zIndex: 9999,
//             }} onClick={handleChatIconClick}>
//                 Connect us  <MessageCircle size={38} />
//             </div>
//             {showChatBox && <ChatBox handleChatIconClick={handleChatIconClick} />}
//         </>
//     )
// }

// export default ChatBot

//import "./styles.css";
import emailjs from "@emailjs/browser";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "react-feather";
const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "input",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
    animate(
      "textarea",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required");
      return;
    } else if (!email) {
      setError("Email is required");
      return;
    } else if (!message || !message.length > 3) {
      setError("Please write a proper message");
      return;
    }
    setIsSubmitting(true);

    try {
      if (!formRef.current) {
        return;
      }
      await emailjs
        .sendForm(
          process.env.SERVICE_ID || "",
          process.env.TEMPLATE_ID || "",
          formRef.current,
          {
            publicKey: process.env.PUBLIC_ID,
          }
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("ERROR!", error);
          }
        );
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      setSubmitStatus("Failed to send email");
    }
  };
  return (
    <div className="menu" ref={scope}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary d-flex align-items-center gap-2"
      >
        <MessageSquare /> Message
        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </div>
      </motion.button>

      <ul
        className="expand-menu pt-4 pe-4"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
        }}
      >
        {isSubmitting && (
          <div className="card mb-4 text-center p-3 fw-bold text-success">
            Thank you for your message.
          </div>
        )}

        <form ref={formRef} className={`${isSubmitting ? "d-none" : ""}`}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfuinHLBsD4g1bYWjJNi73LMk5hoy_JQNHfyuUWU7c5GYmgFw/viewform?usp=header"
            target="_blank"
            className="btn btn-outline-warning w-100 fw-bold mb-3"
            style={{ fontSize: "1.1rem" }}
          >
            🚀 Request Cover Page
          </a>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="form-control mb-3"
            placeholder="Enter your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="form-control mb-3"
            placeholder="Enter your email"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="form-control mb-2"
            placeholder="Enter your advise/request/message"
          />
          {error && <div className="text-danger text-center mb-2">{error}</div>}
          <input
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success w-100"
            value="Submit Message"
          />
        </form>
      </ul>
    </div>
  );
}
