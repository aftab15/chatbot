import { useState } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import Logo from './assets/roundSmarte.svg'


function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Samrte - AI Bot! Ask me anything!",
      sentTime: "just now",
      direction: "incoming"
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sentTime: "just now"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
      await fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * 10) + 1}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setMessages([
            ...chatMessages,
            {
              message: json.title,
            },
          ]);
          setIsTyping(false);
        });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "90vh", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Smarte AI is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} position='single' >
                  <Avatar src={Logo} />
                </Message>;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
