import axios from 'axios';
import { Message } from 'element-ui';
function ajax_post(url, post_data) {
    return axios.post(url, post_data)
    .then(res => {
        // console.log(res.data);
        if (res.data.result == 'SUCCESS') {
            // return Promise.resolve(res);
            return res;
        } else {
            Message({message: `${res.data.message}`, type: 'error'});
        }
    })
    .catch(error => {
        Message({message: `${error.message}`,type: 'error'});
        if (error.response.status === 401 ) {
            window.location = '/login/'
        }
    });
}

function ajax_get(url) {
    return axios.get(url)
    .then(res => {
        // console.log(res.data);
        if (res.data.result == 'SUCCESS') {
            // return Promise.resolve(res);
            return res;
        } else {
            Message({message: `${res.data.message}`, type: 'error'});
        }
    })
    .catch(error => {
        Message({message: `${error.message}`,type: 'error'});
        if (error.response.status === 401 ) {
            window.location = '/login/'
        }
    });
}


//others
function not_finished(){
    this.$message({message: "功能火速开发中，敬请期待！", type: 'error'});
}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


export {ajax_post, ajax_get, not_finished, sleep};
