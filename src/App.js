import React, { useState, useEffect } from "react";
import {  FormControl, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState(""); // inputtaki ilk değeri ve sonrasında değerleri tutacak.ve input içersini boş bırakacak
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // uygulama yüklendiğinde çalışıcak.DB bilgileri çekme
  useEffect(() => {
    // collection verileri array olarak setMessages e gönderme
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // Kullanıcı bilgisi
  useEffect(() => {
    setUsername(prompt("Lütfen bir kullanıcı adınızı girin?"));
  }, []);

  // onClick olduğunda sendMessage fonksiyonunu çağırdık ve fonksiyon içersinde inputtaki değerleri messages arrayine atıyoruz.Mesajları tutmak için  sonra setInput('') ile inputun içeriğini boşaltıyoruz.

  // Mesaj gönderme İşlemi
  const sendMessage = (event) => {
    event.preventDefault(); // sayfa yenilemesini engeller

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };




  // sayfa içeriği
  return (
    <div className="App">
    <input className="l" type="checkbox" id="toggle" onChange={(e) => 
    document.body.classList.toggle("dark", e.target.checked)}/>
      <h1>
      <img
        src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=30&h=30"
        alt="facebook-messenger"
      />
          Facebook Messenger Klon <img
        src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=30&h=30"
        alt="facebook-messenger"
      /></h1>
     
      <h2>  {username ? "Hoş Geldin " + username : ""}</h2>
      <form className="app__form">
        <FormControl
          className="app__formControl"
        >
         
          <Input
            className="app__input"
            placeholder='Mesaj Girin...'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} /> // message değerinin içindeki datayı Message.js gönderiyoruz.props.text ile erişim sağlayacak.
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
