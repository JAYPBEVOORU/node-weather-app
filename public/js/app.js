
//const request = require('postman-request');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    messageOne.textContent ="Loading ..."
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
                console.log(data.error);
            }else{
                messageOne.textContent = data.place;
                messageTwo.textContent = data.weather;
                console.log(data.place);
                console.log(data.weather);
            }
        })
    });
})

