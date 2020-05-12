const signIn = async (email, password) => {
    console.log(email, password);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/users/signin',
            data: {
                email,
                password,
            },
        });
        console.log(res);
    } catch (err) {
        console.log(err.response.data);
    }
};

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signIn(email, password);
});
