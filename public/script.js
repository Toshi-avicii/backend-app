const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    let name = inputs[0].value;
    let email = inputs[1].value;
    let password = inputs[2].value;
    let confirmPassword = inputs[3].value;
    
    const formData = {
        name,
        email,
        password,
        passwordConfirm: confirmPassword
    }
    
    
    try {
        const response = await axios.post('http://localhost:8000/user/register', formData);
        console.log(response.data);
    } catch(err) {
        console.log(err.message);
    }
})