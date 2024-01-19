const socket=io('http://localhost:8000');
// Below i am getting DOM element in a respective below variables(DOM-->Document Object Modal)
const form=document.getElementById('f_id');
const messageInput=document.getElementById('write');
const messageContainer=document.querySelector(".a"); //<--Previous is Used to keep messages in div tag or in that boxhaving class=a
// Below is Used to import an audio which will work as a notification sound whenever we send or receive a message
var aaya=new Audio('simple simple.mp3');
var aawaz=new Audio('wat.mp3');
const arrival=(message, position)=>{         //<--Previous is Used to append the names of user who joined the chat, & position means left or right
    const messageElement=document.createElement('div'); //<--Previous is Just a Div(we can also use Inner Stylling rather than using this)
    messageElement.innerText=message;        //<--Previous is Used to tell that the text of above div_block(messageElement) is above message of parenthesis()
    messageElement.classList.add('message'); //<--Every message of new user arrival is being added into the classList of messageElement
    messageElement.classList.add(position);  //<--Position will tell where arrival message should be showed
    messageContainer.append(messageElement); //<--messageElement is appended to the messageContainer(which will keep our messages in that big_box)
}
// Some Block of Code is Used to send a message
form.addEventListener('submit', (e)=>{       //<--In previous, we are adding Event_Listener when we will click send button it will come here
    e.preventDefault();                      //<--Previous is Used to stop the refreshing page whenever we click on send button
    const message=messageInput.value;
    arrival(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})
// In below, name is like a event
const name=prompt("Enter name to join:- ");
socket.emit('new-user-joined', name);
// whenever Event('user-joined') come below will handle
socket.on('user-joined', name=>{
    aaya.play();
    arrival(`${name} joined the chat`, 'right'); //<--In previous, I am Calling the Function with name(arrival) by passing 2 values in it
})
socket.on('receive', data=>{                     //<--In previous, data is an Object
    aawaz.play();
    arrival(`${data.name}: ${data.message}`, 'left');
})
socket.on('leave', name=>{
    arrival(`${name} left the chat`, 'right');
})