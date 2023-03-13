const wrapper = document.getElementById('wrap-detail');
const head = document.getElementById('head');
const hToTitle = document.createElement('h2');
const aBack = document.createElement('a');
const url = new URLSearchParams(location.search);
const userId = url.get('id') || 1;

aBack.classList.add('back');
aBack.innerText = 'BACK';
aBack.href = `index.html`;

hToTitle.innerText = 'User detail';
head.appendChild(hToTitle);

head.append(aBack, hToTitle);

const getUser = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(user => user.json())
}

const getPosts = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(posts => posts.json())
}


(async () => {
    const user = await getUser();
    const posts = await getPosts();

    const userDetailsBox = document.createElement('div');
    const divBtnOpenTitles = document.createElement('div');

    userDetailsBox.classList.add('details-user');
    divBtnOpenTitles.classList.add('btn__open-titles');
    divBtnOpenTitles.innerText = `post of current user`;

    const createUserListDetails = (obj, parentBlock) => {
        const block = document.createElement('div');
        block.classList.add('inner');
        parentBlock.appendChild(block);

        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                const div = document.createElement('div');
                const titleElem = document.createElement('h3');

                div.classList.add('inner');
                titleElem.innerText = key.toUpperCase();

                parentBlock.appendChild(div);
                div.appendChild(titleElem);

                createUserListDetails(obj[key], div);
            } else {
                const parElem = document.createElement('p');
                const newKey = key.charAt(0).toUpperCase() + key.slice(1);
                parElem.innerText = `${newKey}: ${obj[key]}`;

                block.appendChild(parElem);
            }
        }
    }

    divBtnOpenTitles.addEventListener('click', function () {
        const already = document.getElementsByClassName('titles-posts');
        if (!(already.length)) {
            const divListTitlePosts = document.createElement('div');
            divListTitlePosts.classList.add('titles-posts');

            for (let i = 0; i < posts.length; i += 5) {
                const ul = document.createElement('ul');
                ul.classList.add('posts-list');

                const newPosts = posts.slice(i, i + 5);
                newPosts.forEach(post => {
                    const li = document.createElement('li');
                    const aBtn = document.createElement('a');
                    const newPostTitle = post.title.charAt(0).toUpperCase() + post.title.slice(1);

                    aBtn.classList.add('btn__details-post');

                    li.innerText = `${newPostTitle}`;
                    aBtn.innerText = `Details`;
                    aBtn.href = 'post-details.html' + "?id=" + userId + "&postId=" + post.id;

                    li.appendChild(aBtn);
                    ul.appendChild(li);
                })
                divListTitlePosts.append(ul);
            }
            wrapper.appendChild(divListTitlePosts);
        }
    })

    createUserListDetails(user, userDetailsBox);
    wrapper.append(userDetailsBox, divBtnOpenTitles);
})()

