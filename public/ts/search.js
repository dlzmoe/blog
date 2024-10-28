(() => {
  // <stdin>
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "\u2026": "&hellip;"
  };
  function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
  }
  function replaceHTMLEnt(str) {
    return str.replace(/[&<>"]/g, replaceTag);
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  var Search = class _Search {
    data;
    form;
    input;
    list;
    resultTitle;
    resultTitleTemplate;
    constructor({ form, input, list, resultTitle, resultTitleTemplate }) {
      this.form = form;
      this.input = input;
      this.list = list;
      this.resultTitle = resultTitle;
      this.resultTitleTemplate = resultTitleTemplate;
      if (this.input.value.trim() !== "") {
        this.doSearch(this.input.value.split(" "));
      } else {
        this.handleQueryString();
      }
      this.bindQueryStringChange();
      this.bindSearchForm();
    }
    /**
     * Processes search matches
     * @param str original text
     * @param matches array of matches
     * @param ellipsis whether to add ellipsis to the end of each match
     * @param charLimit max length of preview string
     * @param offset how many characters before and after the match to include in preview
     * @returns preview string
     */
    static processMatches(str, matches, ellipsis = true, charLimit = 140, offset = 20) {
      matches.sort((a, b) => {
        return a.start - b.start;
      });
      let i = 0, lastIndex = 0, charCount = 0;
      const resultArray = [];
      while (i < matches.length) {
        const item = matches[i];
        if (ellipsis && item.start - offset > lastIndex) {
          resultArray.push(`${replaceHTMLEnt(str.substring(lastIndex, lastIndex + offset))} [...] `);
          resultArray.push(`${replaceHTMLEnt(str.substring(item.start - offset, item.start))}`);
          charCount += offset * 2;
        } else {
          resultArray.push(replaceHTMLEnt(str.substring(lastIndex, item.start)));
          charCount += item.start - lastIndex;
        }
        let j = i + 1, end = item.end;
        while (j < matches.length && matches[j].start <= end) {
          end = Math.max(matches[j].end, end);
          ++j;
        }
        resultArray.push(`<mark>${replaceHTMLEnt(str.substring(item.start, end))}</mark>`);
        charCount += end - item.start;
        i = j;
        lastIndex = end;
        if (ellipsis && charCount > charLimit) break;
      }
      if (lastIndex < str.length) {
        let end = str.length;
        if (ellipsis) end = Math.min(end, lastIndex + offset);
        resultArray.push(`${replaceHTMLEnt(str.substring(lastIndex, end))}`);
        if (ellipsis && end != str.length) {
          resultArray.push(` [...]`);
        }
      }
      return resultArray.join("");
    }
    async searchKeywords(keywords) {
      const rawData = await this.getData();
      const results = [];
      const regex = new RegExp(keywords.filter((v, index, arr) => {
        arr[index] = escapeRegExp(v);
        return v.trim() !== "";
      }).join("|"), "gi");
      for (const item of rawData) {
        const titleMatches = [], contentMatches = [];
        let result = {
          ...item,
          preview: "",
          matchCount: 0
        };
        const contentMatchAll = item.content.matchAll(regex);
        for (const match of Array.from(contentMatchAll)) {
          contentMatches.push({
            start: match.index,
            end: match.index + match[0].length
          });
        }
        const titleMatchAll = item.title.matchAll(regex);
        for (const match of Array.from(titleMatchAll)) {
          titleMatches.push({
            start: match.index,
            end: match.index + match[0].length
          });
        }
        if (titleMatches.length > 0) result.title = _Search.processMatches(result.title, titleMatches, false);
        if (contentMatches.length > 0) {
          result.preview = _Search.processMatches(result.content, contentMatches);
        } else {
          result.preview = replaceHTMLEnt(result.content.substring(0, 140));
        }
        result.matchCount = titleMatches.length + contentMatches.length;
        if (result.matchCount > 0) results.push(result);
      }
      return results.sort((a, b) => {
        return b.matchCount - a.matchCount;
      });
    }
    async doSearch(keywords) {
      const startTime = performance.now();
      const results = await this.searchKeywords(keywords);
      this.clear();
      for (const item of results) {
        this.list.append(_Search.render(item));
      }
      const endTime = performance.now();
      this.resultTitle.innerText = this.generateResultTitle(results.length, ((endTime - startTime) / 1e3).toPrecision(1));
    }
    generateResultTitle(resultLen, time) {
      return this.resultTitleTemplate.replace("#PAGES_COUNT", resultLen).replace("#TIME_SECONDS", time);
    }
    async getData() {
      if (!this.data) {
        const jsonURL = this.form.dataset.json;
        this.data = await fetch(jsonURL).then((res) => res.json());
        const parser = new DOMParser();
        for (const item of this.data) {
          item.content = parser.parseFromString(item.content, "text/html").body.innerText;
        }
      }
      return this.data;
    }
    bindSearchForm() {
      let lastSearch = "";
      const eventHandler = (e) => {
        e.preventDefault();
        const keywords = this.input.value.trim();
        _Search.updateQueryString(keywords, true);
        if (keywords === "") {
          lastSearch = "";
          return this.clear();
        }
        if (lastSearch === keywords) return;
        lastSearch = keywords;
        this.doSearch(keywords.split(" "));
      };
      this.input.addEventListener("input", eventHandler);
      this.input.addEventListener("compositionend", eventHandler);
    }
    clear() {
      this.list.innerHTML = "";
      this.resultTitle.innerText = "";
    }
    bindQueryStringChange() {
      window.addEventListener("popstate", (e) => {
        this.handleQueryString();
      });
    }
    handleQueryString() {
      const pageURL = new URL(window.location.toString());
      const keywords = pageURL.searchParams.get("keyword");
      this.input.value = keywords;
      if (keywords) {
        this.doSearch(keywords.split(" "));
      } else {
        this.clear();
      }
    }
    static updateQueryString(keywords, replaceState = false) {
      const pageURL = new URL(window.location.toString());
      if (keywords === "") {
        pageURL.searchParams.delete("keyword");
      } else {
        pageURL.searchParams.set("keyword", keywords);
      }
      if (replaceState) {
        window.history.replaceState("", "", pageURL.toString());
      } else {
        window.history.pushState("", "", pageURL.toString());
      }
    }
    static render(item) {
      return /* @__PURE__ */ createElement("article", null, /* @__PURE__ */ createElement("a", { href: item.permalink }, /* @__PURE__ */ createElement("div", { class: "article-details" }, /* @__PURE__ */ createElement("h2", { class: "article-title", dangerouslySetInnerHTML: { __html: item.title } }), /* @__PURE__ */ createElement("section", { class: "article-preview", dangerouslySetInnerHTML: { __html: item.preview } })), item.image && /* @__PURE__ */ createElement("div", { class: "article-image" }, /* @__PURE__ */ createElement("img", { src: item.image, loading: "lazy" }))));
    }
  };
  window.addEventListener("load", () => {
    setTimeout(function() {
      const searchForm = document.querySelector(".search-form"), searchInput = searchForm.querySelector("input"), searchResultList = document.querySelector(".search-result--list"), searchResultTitle = document.querySelector(".search-result--title");
      new Search({
        form: searchForm,
        input: searchInput,
        list: searchResultList,
        resultTitle: searchResultTitle,
        resultTitleTemplate: window.searchResultTitleTemplate
      });
    }, 0);
  });
  var stdin_default = Search;
})();
