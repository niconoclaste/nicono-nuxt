const glob_import = import.meta.glob(
	['../src/pages/**/*.vue'],
	// ['../pages/*.vue', '!/articles/index.vue'],
	{eager: true}
);
const imports = Object.entries(glob_import);

// console.log(imports);

const articles = [];
for (const path in imports) {
  const article = imports[path][1];
	
  if (article) {
    if (article.metadata) {
      const category = article.metadata.category;
      const url = imports[path][0].replace('/src/pages', '').replace('.vue', '');
      articles.push({
        category,
        url,
        ...article.metadata,
      });
    }
  }
}
articles.filter((article) => !article.hidden);
articles.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() < new Date(b.date).getTime()
      ? 1
      : 0
  )
export { articles };