class GitHub {
    constructor() {
      const searchInput = document.getElementById("search");
      searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          this.getUserDetails(searchInput.value);
          searchInput.value = ""; // Clear the form input after pressing Enter
        }
      });
    }
  
    async getUserDetails(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        console.log(data);
        this.createUserCard(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        this.clearUserCard();
      }
    }
  
    createUserCard(data) {
      this.clearUserCard(); // Clear any existing user card
  
      const card = document.createElement("div");
      card.classList.add("card");
  
      const avatar = document.createElement("img");
      avatar.src = data.avatar_url;
      card.appendChild(avatar);
  
      const userDetails = document.createElement("div");
      userDetails.classList.add("card-details");
  
      const nameElement = document.createElement("h2");
      nameElement.textContent = data.name || data.login;
      userDetails.appendChild(nameElement);
  
      if (data.bio) {
        const bioElement = document.createElement("p");
        bioElement.textContent = data.bio;
        userDetails.appendChild(bioElement);
      }
  
      const followersFollowingElement = document.createElement("p");
      followersFollowingElement.textContent = `Followers: ${data.followers} | Following: ${data.following}`;
      userDetails.appendChild(followersFollowingElement);
  
      const repoCountElement = document.createElement("p");
      repoCountElement.textContent = `Public Repos: ${data.public_repos}`;
      userDetails.appendChild(repoCountElement);
  
      if (data.twitter_username) {
        const twitterElement = document.createElement("p");
        twitterElement.textContent = `Twitter: @${data.twitter_username}`;
        userDetails.appendChild(twitterElement);
      }
  
      if (data.location) {
        const locationElement = document.createElement("p");
        locationElement.textContent = `Location: ${data.location}`;
        userDetails.appendChild(locationElement);
      }
  
      card.appendChild(userDetails);
      document.getElementById("main").appendChild(card);
    }
  
    clearUserCard() {
      const mainElement = document.getElementById("main");
      while (mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
      }
    }
  }
  
  // Initialize the GitHub class when the page loads
  const gitHub = new GitHub();
  