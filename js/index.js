const form = document.getElementById("github-form");
form.addEventListener("submit", (event) => {
    event.preventDefault()
    //event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(response => response.json())
    .then(response => {
        const userList = document.querySelector("#user-list")
        const reposList = document.getElementById("repos-list")
        reposList.innerHTML = ""
        userList.innerHtml = ""
        const li = document.createElement('li');
        //login,avatar_URL,profileURL
        response.items.map(item => {
            const h2 = document.createElement("h2")
            h2.textContent = item.login
            h2.addEventListener("click", e => showUserRepos(item.login , e))
            const img = document.createElement("img")
            img.src = item.avatar_url
            //"#user-list"
            li.appendChild(h2, img)
            userList.appendChild(li)
        })
        event.target[0].value = ""
    })

    //form.reset() // clears out input field
});
function showUserRepos(username , e) {
    const reposList = document.getElementById("repos-list")
    reposList.innerHtml = ""
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${username}/repos}`)
        .then(response => response.json())
        .then(response => response.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
    })
    )}
//    })

//#user-repos-endpoint 