require('./bootstrap');
import Vue from 'vue'
import Messages from './components/Messages.vue'
import Form from './components/Form.vue'
import axios from 'axios';

Vue.component('dw-messages', Messages)
Vue.component('dw-form', Form)

const app = new Vue({
    el: '#app',
    data : {
        messages : []
    },
    created() {
        //MAKA AKAN MENJALANKAN FUNGSI fetchMessage()
        this.fetchMessages();
      
        //DAN MENGGUNAKAN LARAVEL ECHO, KITA AKSES PRIVATE CHANNEL BERNAMA CHAT YANG NNTINYA AKAN DIBUAT
        //KEMUDIAN EVENTNYA KITA LISTEN ATAU PANTAU JIKA ADA DATA YANG DIKIRIM 
        Echo.private('chat')
        .listen('MessageSent', (e) => {
            //DATA YANG DITERIMA AKAN DITAMBAHKAN KE DALAM VARIABLE MESSAGES SEBELUMNYA
            this.messages.push({
                message: e.message.message,
                user: e.user
            })
        })
    },
    methods: {
        fetchMessages(){
            axios.get('/messages').then(response => {
                this.messages=response.data
            })
        },
        addMessage(message){
            this.messages.push(message)
            axios.post('/messages', message).then(response => {
                console.log(response.data)
            })
        }
    }
});
