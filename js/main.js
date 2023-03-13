const getUsers = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/users')
        .then(users => users.json());
}

(async () => {
    const arrayUsers = await getUsers();
    const wrapper = document.getElementById('wrap');
    const head = document.getElementById('head');
    const hToTitle = document.createElement('h2');

    hToTitle.innerText = 'List of users';
    head.appendChild(hToTitle);

    arrayUsers.forEach(user => {
        const divUser = document.createElement('div');
        const divText = document.createElement('div');
        const a = document.createElement('a');

        divUser.classList.add('user');
        divText.classList.add('text');
        a.classList.add('btn__details-user');

        divText.innerText = `${user.id} ${user.name}`;
        a.innerText = `Detail`;
        a.href = `user-details.html` + "?id=" + user.id;

        divUser.addEventListener('mouseenter', () => {
            divUser.classList.add('anim-rotate');
        })
        divUser.addEventListener('mouseout', () => {
            setTimeout(() => divUser.classList.remove('anim-rotate'), 800);
        })


        divUser.append(divText, a);
        wrapper.appendChild(divUser);
    })
})();


