const APIURL = "https://api.github.com/users/"
const searchInputElement = document.getElementById('searchInput');
const searchButtonElement = document.getElementById('search-btn');
const profileContainerElement = document.getElementById('profileContainer');
const loadingDisplayElement = document.getElementById('loadingDisplay');

const generateProfile = (profile)  => {
    return (
        `
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="avatar">
                    </div>
                    <div class="self">
                        <h1 id="displayName">${profile.name}</h1>
                        <h1 id="displayId">@${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                <button class="primary-btn" id="github-btn">Github <i class="fa fa-github"></i> </button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>
                  ${profile.bio}
                </p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p> 
                </div>
                <div class="status-item">
                    <h3>Following</h3>
                    <p>${profile.following}</p> 
                </div>
                <div class="status-item">
                    <h3>Repositories</h3>
                    <p>${profile.public_repos}</p> 
                </div>
            </div>
        </div>

        `
    )
}

const fetchProfile = async() => {
    const username = searchInputElement.value;
    loadingDisplayElement.innerHTML = "fetching...";

    try {
        const response = await fetch(`${APIURL}${username}`);
        const fetchedData = await response.json();

        if (fetchedData.bio) {
            loadingDisplayElement.innerText = ""; 
            profileContainerElement.innerHTML = generateProfile(fetchedData);
        } else {
            loadingDisplayElement.innerText = fetchedData.message;
            loadingDisplayElement.style.color = "black";
            profileContainerElement.innerText = "";
        }

        console.log(fetchedData);
    } catch (error) {
        console.log({error});
        loadingDisplayElement.innerHTML = "";
    }
}


searchButtonElement.addEventListener('click', fetchProfile);
searchInputElement.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
      fetchProfile();
    }
  });
