window.onload = () => {
    const param = (new URL(location.href)).searchParams;
    const error_param = param.get('error');
    const success_param = param.get('success');
    if(error_param){
        alert(error_param);
    }
    else if(success_param){
        alert(success_param);
        location.href="/";
    }
}

const request = document.getElementById('signup-form');

const signup_btn = document.getElementById('signup-form_signup-btn');
signup_btn.addEventListener('click', () => {
    request.setAttribute('action', '/signup/check-signup');
    request.setAttribute('method', 'POST');
})

const main_btn = document.getElementById('signup-form_mainpage-btn');
main_btn.addEventListener('click', () => {
    request.setAttribute('action', '/signup/main-page');
    request.setAttribute('method', 'GET');
})