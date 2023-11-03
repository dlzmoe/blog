const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const now = new Date();

function relativeTime(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  const seconds = Math.floor(diff);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 60 / 60);
  const days = Math.floor(diff / 60 / 60 / 24);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  if (days < 30) {
    return `${days} days ago`;
  }
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function setRelativeTime() {
  document.querySelectorAll('relative-time').forEach(elem => {
    const dateStr = elem.getAttribute('datetime');
    elem.innerHTML = relativeTime(dateStr);
    elem.setAttribute('title', new Date(dateStr).toLocaleString());
  });
}

function getToc() {
  const markdown = document.querySelector('.markdown-body')
  if(markdown == null) {
      return
  }
  const hs = markdown.querySelectorAll('h2, h3, h4, h5, h6');
 
  const toc_list = document.querySelector("#toc-list");
  for (const h of hs) {
      const size = Number(h.tagName.toLowerCase().replace('h', ''));
      
      const li = document.createElement('li');
      li.classList.add("dropdown-item");

      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.classList.add("text-dark-emphasis", "text-decoration-none");
      a.innerText = h.innerText;
      a.style.paddingLeft = `${(size-2) * 12}px`;

      li.appendChild(a);

      toc_list.appendChild(li);
  }
}

(() => {
  setRelativeTime();
  getToc();
})();
