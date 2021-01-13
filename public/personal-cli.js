
window.onload = () => {
    const param = (new URL(location.href)).searchParams;
    const error_param = param.get('error');
    if(error_param){
        alert(error_param);
    }
}

const request = document.getElementById('personal-form');

const mainpage_btn = document.getElementById('mainpage-btn');
mainpage_btn.addEventListener('click', () => {
    request.setAttribute('action', '/');
    request.setAttribute('method', 'GET');
});

const logout_btn = document.getElementById('logout-btn');
logout_btn.addEventListener('click', () => {
    request.setAttribute('action', '/login/logout');
    request.setAttribute('method', 'POST');
});