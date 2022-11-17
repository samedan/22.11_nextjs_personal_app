import * as JsSearch from "js-search";
import searchIndex from "@content/search/index.json";

class ContentIndexer {
  private static instance: ContentIndexer;

  // "!" definite assignment assertion
  private searchEngine!: JsSearch.Search;

  // create a SINGLETON
  // if an instance is not created yet, create a new one
  public static get Instance() {
    return (
      // if already created call this one
      this.instance ||
      // only first time call it
      (this.instance = new this())
    );
  }

  constructor() {
    this.buildIndex();
  }

  public search(query: string) {
    const results = this.searchEngine.search(query);
    return results;
  }

  private buildIndex() {
    console.log("Building search index only once");

    this.searchEngine = new JsSearch.Search("slug"); // "slug" always is different so used as index
    this.searchEngine.addIndex("title");
    this.searchEngine.addIndex("description");
    this.searchEngine.addDocuments(searchIndex);
  }
}

export default ContentIndexer.Instance;
