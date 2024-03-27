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
} from "@chatscope/chat-ui-kit-react";
import Logo from "./assets/roundSmarte.svg";
import MessageCustomContent from "./MessageCustomContent";
import constants from "./constants/constants";
import Select from 'react-dropdown-select'

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Samrte - AI Bot! Ask me anything!",
      responseObject: [
        {
          "id": 2,
          "title": "iPhone X",
          "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
          "price": 899,
          "discountPercentage": 17.94,
          "rating": 4.44,
          "stock": 34,
          "brand": "Apple",
          "category": "smartphones",
          "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
          "images": [
              "https://cdn.dummyjson.com/product-images/2/1.jpg",
              "https://cdn.dummyjson.com/product-images/2/2.jpg",
              "https://cdn.dummyjson.com/product-images/2/3.jpg",
              "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
          ]
      }
      ],
      status:'',
      sentTime: "just now",
      direction: constants.INCOMING,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [seletedVersion, setSelectedVersion] = useState({
    label:"v1",
    value:"https://dummyjson.com/products/"
  });

  const options = [
    {
    label:"v1",
    value:"https://dummyjson.com/products/"
  },
    {
    label:"v2",
    value:"https://dummyjson.com/categories/"
  }
]
  
  const handleSend = async (message) => {
    console.log('e',message)
    const newMessage = {
      message,
      direction: "outgoing",
      sentTime: "just now",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  // useEffect(() => {
  //   const a= new Promise(
  //     (res,rej)=>{
  //     if(true){
  //     res();
  //     }
  //   })
  //   a .then((res) => res.json())
  //   .then((json) => {
  //     console.log("JSON:: ",json)
  // })}, [])

  async function processMessageToChatGPT(chatMessages) {
    await fetch(
      `${seletedVersion.value}${Math.floor(Math.random() * 10) + 1}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMessages([
          ...chatMessages,
          {
            message: json.title,
            responseObject: [{
              'Full_Name': 'yesu hosmani',
              'Job_Title': 'Student', 'Contact Location': 'None', 
              'Job_Started_On': 'None',
              'Level': 'Other', 
              'Function': 'Education / Teaching',
              'Contact_Linkedin_Url': 'https://www.linkedin.com/in/yesu-hosmani-1b679b183',
            },
            {
              'Full_Name': 'yesu hosmani',
              'Company_Name': 'little flower of jesus high school', 
              'Job_Title': 'Student', 'Contact Location': 'None', 
              'Job_Started_On': 'None',
              'Level': 'Other', 
              'Function': 'Education / Teaching',
              'Contact_Linkedin_Url': 'https://www.linkedin.com/in/yesu-hosmani-1b679b183'
            }
          ],
            status: '200',
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "90vh", width: "700px" }}>
        <MainContainer>
        <Select
            searchable={false}
            clearable={false}
            dropdownGap={0}
            className='chat-dropdown'
            dropdownPosition="auto"
            options={options}
            onChange={(item)=>{
              console.log("vall : ",item)
              setSelectedVersion(item[0])
              setMessages([
                {
                  message: "Hello, I'm Samrte - AI Bot! Ask me anything!",
                  responseObject: [
                    {
                      "id": 2,
                      "title": "iPhone X",
                      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                      "price": 899,
                      "discountPercentage": 17.94,
                      "rating": 4.44,
                      "stock": 34,
                      "brand": "Apple",
                      "category": "smartphones",
                      "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
                      "images": [
                          "https://cdn.dummyjson.com/product-images/2/1.jpg",
                          "https://cdn.dummyjson.com/product-images/2/2.jpg",
                          "https://cdn.dummyjson.com/product-images/2/3.jpg",
                          "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
                      ]
                  }
                  ],
                  sentTime: "just now",
                  direction: constants.INCOMING,
                },
              ])
            }}
            values={[{
              label:seletedVersion.label,
              value:seletedVersion.value
            }]}
          />
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
            <MessageInput placeholder="Type message here" onSend={(e)=>{handleSend(e)}} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
