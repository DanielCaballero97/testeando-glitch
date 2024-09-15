

const socket = io();
const chatbox = document.getElementById("chatbox");

let user;

Swal.fire({
    title:"identificate padre",
    icon:"question",
    input:"text",
    inputValidator : (value) =>{
        if(!value){
            return "identificate padre "
        }
    },
    allowOutsideClick: false,
    allowEscapeKey: false,

}).then((response)=>{
    user = response.value;
    socket.emit("authenticated",user);
})



chatbox.addEventListener("keyup",evt=>{

    if(evt.key==="Enter"){
        socket.emit("message",{user:user,message:chatbox.value});
        chatbox.value="";
    }

})

//listeners de socket

socket.on('logs',data=>{

    console.log(data);
    const p = document.getElementById('logs');
    let messages = ``;
    data.forEach(logItem=>{

        messages += `${logItem.user} dice: ${logItem.message} <br/>`

    })
    p.innerHTML = messages;

})