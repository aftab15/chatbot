import { useEffect, useState } from "react";
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
  ConversationHeader,
  InfoButton,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import Logo from "./assets/roundSmarte.svg";
import MessageCustomContent from "./MessageCustomContent";
import constants from "./constants/constants";
import Select from "react-dropdown-select";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Smarte - AI Bot! Ask me anything!",
      responseObject: [],
      status: "",
      sentTime: "just now",
      direction: constants.INCOMING,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState({
    label: "v1",
    value: "https://dummyjson.com/products/",
  });

  const options = [
    {
      label: "v1",
      value: "https://dummyjson.com/products/",
    },
    {
      label: "v2",
      value: "https://dummyjson.com/products/",
    },
  ];

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sentTime: "just now",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages, message);
  };

  async function processMessageToChatGPT(chatMessages, currentMessage) {
    let data = {
      prompt: currentMessage,
    };
    var formData = new FormData();
    formData.append("data", JSON.stringify(data));
    await fetch(`${selectedVersion.value}${Math.floor(Math.random() * 10) + 1}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMessages([
          ...chatMessages,
          {
            message: json.title,
            responseObject: [
              {
                Full_Name: "yesu hosmani",
                Company_Name: "little flower of jesus high school",
                Job_Title: "Student",
                Contact_Location: "None",
                Job_Started_On: "None",
                Level: "Other",
                Function: "Education / Teaching",
                Contact_LinkedinUrl:
                  "https://www.linkedin.com/in/yesu-hosmani-1b679b183",
              },
              {
                Full_Name: "yesu hosmani",
                Company_Name: "little flower of jesus high school",
                Job_Title: "Student",
                Contact_Location: "None",
                "Job Started_On": "None",
                Level: "Other",
                Function: "Education / Teaching",
                Contact_LinkedinUrl:
                  "https://www.linkedin.com/in/yesu-hosmani-1b679b183",
              },
              {
                Full_Name: "yesu hosmani",
                Company_Name: "little flower of jesus high school",
                Job_Title: "Student",
                Contact_Location: "None",
                "Job Started_On": "None",
                Level: "Other",
                Function: "Education / Teaching",
                Contact_LinkedinUrl:
                  "https://www.linkedin.com/in/yesu-hosmani-1b679b183",
              },
              {
                Full_Name: "yesu hosmani",
                Company_Name: "little flower of jesus high school",
                Job_Title: "Student",
                Contact_Location: "None",
                "Job Started_On": "None",
                Level: "Other",
                Function: "Education / Teaching",
                Contact_LinkedinUrl:
                  "https://www.linkedin.com/in/yesu-hosmani-1b679b183",
              },
            ],
            status: "200",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "90vh", width: "700px" }}>
        <MainContainer className="flex flex-col">
          <ConversationHeader className=" absolute w-full !z-10">
            <Avatar src={Logo} name="Smarte AI" />
            <ConversationHeader.Content
              userName="Smarte AI"
              info="We typically reply in a few minutes"
            />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <ChatContainer className="pt-16">
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Smarte AI is typing" />
                ) : null
              }
            >
              <MessageSeparator content={new Date().toDateString()} />
              {messages.map((message, i) => {
                return (
                  <Message key={i} model={message} position="single">
                    <Avatar src={Logo} />
                    <Message.CustomContent>
                      <MessageCustomContent id={i} message={message} />
                    </Message.CustomContent>
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={(e) => {
                handleSend(e);
              }}
            ></MessageInput>
          </ChatContainer>
          <Select
            searchable={false}
            clearable={false}
            dropdownGap={0}
            className="chat-dropdown"
            dropdownPosition="auto"
            options={options}
            onChange={(item) => {
              setSelectedVersion(item[0]);
              setMessages([
                {
                  message: "Hello, I'm Samrte - AI Bot! Ask me anything!",
                  sentTime: "just now",
                  direction: constants.INCOMING,
                },
              ]);
            }}
            values={[
              {
                label: selectedVersion.label,
                value: selectedVersion.value,
              },
            ]}
          />
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
