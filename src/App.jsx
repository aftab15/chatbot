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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState({
    label: "v1",
    value: "http://192.168.15.43:8087/getGPTApiResponse",
  });

  const options = [
    {
      label: "v1",
      value: "http://192.168.15.43:8087/getGPTApiResponse",
    },
    {
      label: "v2",
      value: "http://10.0.5.6:5000/api/ai_contact_discovery",
    },
    {
      label: "v3",
      value: "http://10.0.5.6:5000/api/buying_group_a1",
    },
  ];

  var helpText;
  switch (selectedVersion.label) {
    case "v1":
      helpText = <p className=" font-semibold">v1 prompt example: <span className=" font-normal select-text">what is the buying group for https://www.oracle.com/products at the https://www.smarteinc.com</span></p>
      break;
    case "v2":
      helpText = <p className=" font-semibold">v2 prompt example: <span className=" font-normal select-text">find 10 contacts from accenture india</span></p>
      break;
    case "v3":
      helpText = <p className=" font-semibold">v3 prompt example: <span className=" font-normal select-text">what is the buying group for https://www.oracle.com/products at the https://www.smarteinc.com</span></p>
      break;
    default:
      helpText = <p className=" font-semibold">v1 prompt example: <span className=" font-normal select-text">what is the buying group for https://www.oracle.com/products at the https://www.smarteinc.com</span></p>
      break;
  }

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sentTime: "just now",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToAPI(newMessages, message);
  };

  async function processMessageToAPI(chatMessages, currentMessage) {
    let headers =
      selectedVersion.label == "v1"
        ? { "Content-Type": "application/json" }
        : {};
    setIsLoading(true);
    let data = {
      prompt: currentMessage,
    };
    var formData = new FormData();
    if (selectedVersion.label == "v1") {
      formData.append("data", JSON.stringify(data));
    } else {
      formData.append("prompt", currentMessage);
    }
    let reqBody =
      selectedVersion.label == "v1" ? JSON.stringify(data) : formData;
    await fetch(`${selectedVersion.value}`, {
      headers: headers,
      method: "POST",
      body: reqBody,
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          throw new Error("Failed to fetch data. Response code: " + res.status);
        }
      })
      .then((json) => {
        console.log(json);
        setMessages([
          ...chatMessages,
          {
            message: "Success",
            responseObject:
              selectedVersion.label == "v1"
                ? json
                : selectedVersion.label == "v2"
                ? json.contacts
                : json.buying_group,
            status: 200,
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
        setMessages([
          ...chatMessages,
          {
            message: "Something went worng",
            responseObject: [],
            status: 500,
            direction: "incoming",
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div className=" relative h-[90vh] w-[1024px]">
        <MainContainer className="flex flex-col">
          <ConversationHeader className=" absolute w-full !z-10">
            <Avatar src={Logo} name="Smarte AI" />
            <ConversationHeader.Content
              userName="Smarte AI"
              info={helpText}
            />
            {/* <ConversationHeader.Actions>
              <InfoButton className=" text-[#eb614b]" />
            </ConversationHeader.Actions> */}
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
              {messages?.map((message, i) => {
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
              disabled={isLoading}
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
