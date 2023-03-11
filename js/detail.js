const wrapper = document.getElementById('wrap-detail');
const url = new URLSearchParams(location.search);
const userId = url.get('id') || 1;



const getUser = () => {
    return new Promise((resolve, reject) => {                             // Знайшли потрібного юзера

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(user => user.json())
            .then(user => resolve(user))
    })
}

const getPosts = () => {
    return new Promise((resolve, reject) => {                               // Знайшли усі пости юзера

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(posts => posts.json())
            .then(posts => resolve(posts))
    })
}


(async () => {
    const user = await getUser();
    const posts = await getPosts();


    const divBox = document.createElement('div');
    const userDetailsBox = document.createElement('div');
    const divBtnOpenTitles = document.createElement('div');

    divBox.classList.add('div-box');
    userDetailsBox.classList.add('details-box');
    divBtnOpenTitles.classList.add('btn__open-titles');

    divBtnOpenTitles.innerText = `post of current user`;

    const createUserListDetails = (user, classDiv) => {


        for (const key in user) {
            if (typeof user[key] !== 'object') {
                const div = document.createElement('div');
                div.classList.add(`${classDiv}`);
                div.innerText = `${key}: ${user[key]}`;

                userDetailsBox.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.classList.add(`${classDiv}`);
                div.innerText = `${key}:`;

                userDetailsBox.appendChild(div);
                createUserListDetails(user[key], 'item');
            }
        }
        divBox.append(userDetailsBox, divBtnOpenTitles);
    }

    divBtnOpenTitles.addEventListener('click', function () {
        const ul = document.createElement('ul');
        ul.classList.add('posts-list');

        posts.forEach(post => {
            const divButton = document.createElement('div');
            const li = document.createElement('li');
            const aBtn = document.createElement('a');

            li.innerText = `${post.title}`;
            aBtn.innerText = `Details`;
            aBtn.href = 'post-details.html' + "?id=" + post.id;

            divButton.appendChild(aBtn);
            li.appendChild(divButton);
            ul.appendChild(li);
        })

        divBox.append(ul)
    })

    createUserListDetails(user, 'inner');

    wrapper.appendChild(divBox)

})()

