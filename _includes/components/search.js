class Search {

    addResult(result) {

    }

    async getLibrary() {
        if(!this.pageFind) {
            this.pageFind = await import("/_pagefind/pagefind.js");
        }
        return this.pageFind
    }

    async onInput(value) {
        let pagefind = await this.getLibrary();
        window.clearTimeout(this.onInputTimeout);
        this.onInputTimeout = window.setTimeout(async () => {
            this.clearResults();

            if (value.length > 2) {
                this.searchResults.classList.remove("hide");

                let search = await pagefind.search(value);
                let result = await Promise.all(search.results.map(r => r.data()));

                for (let result of results) {
                    this.addResult( result, value );
                }
            }
        })
    }
}

let search = new Search();