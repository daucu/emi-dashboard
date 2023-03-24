import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import Base from '../Base/Base';
import "./support.css";
import axios from 'axios';
import { API } from '../../constant';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Loader from '../loader/Loader';

const Support = () => {
  const [tickets, setTickets] = React.useState([]);
  const [chatTicket, setChatTicket] = React.useState("");
  const [chatData, setChatData] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const chatMsgRef = React.useRef();

  const [msgInp, setMsgInp] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    // get profile 
    try {
      axios.get(`${API}/profile`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((res) => {
          setProfile(res.data);
        })

    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }, [])

  useEffect(() => {
    try {
      axios.get(`${API}/support`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((res) => {
          setTickets(res.data.support);
        })
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }, []);

  const getChatData = (id) => {
    try {
      axios.get(`${API}/support/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((res) => {
          setChatData(res.data.supportChat);
        })
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {

      setTimeout(() => {
        setChatLoading(false);
      }, 1000);

    }
  }

  useEffect(() => {
    if (chatTicket !== "") {
      setChatLoading(true);
      getChatData(chatTicket);
    }
  }, [chatTicket])

  useEffect(() => {
    // scroll to bottom
    if (chatMsgRef.current)
      chatMsgRef.current.scrollTop = chatMsgRef.current.scrollHeight;
  }, [chatData, chatLoading])

  const onChangeText = (e) => {
    const { value } = e.target;
    setMsgInp(value);
  }

  const handleSendMsg = (e) => {
    e.preventDefault();
    try {
      axios.post(`${API}/support/chat`, {
        message: msgInp,
        ticket: chatTicket,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((res) => {
          if (res.status === 201) {
            const newChat = [...chatData, res.data.chat];
            setChatData(newChat);
            setMsgInp("");
          }
        })
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }


  return (
    <Base baseStyle={{ paddingBottom: "0", overflow: "hidden" }}>
      <div className='h-full flex flex-col'>

        <div className='support_header'>
          <h2>Support</h2>
          <MdOutlineKeyboardDoubleArrowRight style={{
            transition: "all 0.3s ease-in-out",
            transform: chatTicket == "" ? "rotate(0deg)" : "rotate(180deg)",
          }}
            size={26}
            onClick={() => {
              chatTicket !== "" && setChatTicket("")
            }}
          />
        </div>

        <div className='supportDiv' style={{
          gridTemplateColumns: "1fr 3fr",
        }}>

          {/* tickets  */}
          <div className="supportTickets" style={{
            width: chatTicket == "" ? "400%" : "100%",
          }}>
            {tickets.length > 0 && tickets.map((ticket) => (
              <div className="sTicket" key={ticket._id} onClick={() => setChatTicket(ticket._id)}>
                <h3>{ticket.title} - {ticket.seller.name}</h3>
                <h4>{ticket.description}.</h4>
              </div>
            ))}
          </div>

          {/* chat area  */}
          <Loader loading={chatLoading}>
            <div className="chatArea" style={{
              width: chatTicket == "" ? "0px" : "100%",
              zIndex: chatTicket == "" ? "-1" : "10",
            }}>
              <div className="chatMsgs" ref={chatMsgRef}>
                {chatData.length > 0 && chatData.map((chat) => (
                  <div className={`chatmsg ${chat.sent_by === profile?._id ? "myChat" : "userChat"} `} key={chat._id}>
                    <h3>{chat.message}</h3>
                    <h4>{chat.createdAt}</h4>
                  </div>
                ))}
              </div>
              <form className='chatInput' onSubmit={handleSendMsg}>
                <input onChange={onChangeText} value={msgInp} name={"msgInp"} type="text" placeholder='Type your message' />
                <button type='submit'><AiOutlineSend size={25} /></button>
              </form>
            </div>
          </Loader>
        </div>
      </div>
    </Base>
  )
}

export default Support;