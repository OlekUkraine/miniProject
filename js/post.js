const wrapper = document.getElementById('wrap-detail-post');
const head = document.getElementById('head');
const hToTitle = document.createElement('h2');
const aBack = document.createElement('a');
const url = new URLSearchParams(location.search);
const postId = url.get('postId') || 1;
const userId = url.get('id');

aBack.classList.add('back');
aBack.innerText = 'BACK';
aBack.href = `user-details.html` + "?id=" + userId;

hToTitle.innerText = 'Post';
head.appendChild(hToTitle);

head.append(aBack, hToTitle);

const getPost = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(post => post.json())
}

const getComments = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(comments => comments.json())
}

(async () => {
    const post = await getPost();
    console.log(post)
    const comments = await getComments();
    console.log(comments)

    const divDetailsPost = document.createElement('div');
    const divBlockComments = document.createElement('div');

    divDetailsPost.classList.add('details-post');
    divBlockComments.classList.add('block-comments');

    const createPostListDetails = (post) => {

        for (const key in post) {
            const div = document.createElement('div');
            div.classList.add(`inner`);
            const newKey = key.charAt(0).toUpperCase() + key.slice(1);

            if (typeof post[key] !== 'object') {
                div.innerText = `${newKey}: ${post[key]}`;
                divDetailsPost.appendChild(div);
            } else {
                div.innerText = `${newKey}:`;

                divDetailsPost.appendChild(div);
                createPostListDetails(post[key]);
            }
        }
        wrapper.appendChild(divDetailsPost);
    }

    const createCommentsForPost = (comments) => {
        const hToTitle = document.createElement('h2');
        hToTitle.innerText = 'COMMENTS';

        comments.forEach(comment => {
            const divComment = document.createElement('div');
            divComment.classList.add('comment');

            for (const key in comment) {
                const div = document.createElement('div');
                div.classList.add('inner');
                const newKey = key.charAt(0).toUpperCase() + key.slice(1);

                div.innerText = `${newKey}: ${comment[key]}`;
                divComment.appendChild(div);
            }
            divBlockComments.appendChild(divComment);
        })
        wrapper.appendChild(hToTitle);
    }

    createPostListDetails(post);
    createCommentsForPost(comments);

    wrapper.appendChild(divBlockComments);
})()



