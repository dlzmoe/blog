(() => {
  // <stdin>
  fetch(mastodonProfile + ".rss").then((response) => response.text()).then((str) => new window.DOMParser().parseFromString(str, "text/xml")).then((data) => {
    const channelTitle = data.querySelector("channel > title").textContent;
    const channelLink = data.querySelector("channel > link").textContent;
    const channelImage = data.querySelector("channel > image > url").textContent;
    const feed = document.getElementById("mastodon-feed");
    const headerElement = document.createElement("div");
    headerElement.className = "header";
    const imageElement = document.createElement("img");
    imageElement.src = channelImage;
    headerElement.appendChild(imageElement);
    const titleElement = document.createElement("a");
    titleElement.href = channelLink;
    titleElement.textContent = channelTitle;
    headerElement.appendChild(titleElement);
    const followElement = document.createElement("a");
    followElement.className = "follow-button";
    followElement.href = channelLink;
    followElement.textContent = i18n.followOnMastodon;
    headerElement.appendChild(followElement);
    feed.appendChild(headerElement);
    const items = data.querySelectorAll("item");
    const itemsArray = Array.from(items).slice(0, maxItems);
    itemsArray.forEach((item) => {
      const statusElement = document.createElement("div");
      statusElement.className = "status";
      statusElement.innerHTML = item.querySelector("description").textContent;
      const footerElement = document.createElement("div");
      footerElement.className = "post-footer";
      const dateElement = document.createElement("p");
      const pubDate = new Date(item.querySelector("pubDate").textContent);
      dateElement.textContent = `${i18n.publishedDateOnMastodon} ${pubDate.toLocaleDateString()} - ${pubDate.toLocaleTimeString()} | `;
      footerElement.appendChild(dateElement);
      const linkElement = document.createElement("a");
      linkElement.href = item.querySelector("link").textContent;
      linkElement.textContent = i18n.viewOnMastodon;
      footerElement.appendChild(linkElement);
      statusElement.appendChild(footerElement);
      feed.appendChild(statusElement);
    });
  });
})();
