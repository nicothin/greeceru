document.addEventListener('DOMContentLoaded', function(){
  const allSearchTags = document.querySelectorAll('.search-tags');

  allSearchTags.forEach(searchTags => {
    const showAllBtn = searchTags.querySelector('.search-tags__show-all');
    const allTags = searchTags.querySelectorAll('.search-tags__item');
    const counter = searchTags.dataset.showCounter;

    showAllBtn.addEventListener('click', () => {
      let showAllState = !searchTags.querySelectorAll('.search-tags__item--hidden').length;
      const showText = showAllBtn.dataset.showText;
      const hideText = showAllBtn.dataset.hideText;

      if (showAllState) {
        showAllBtn.innerHTML = showText;

        allTags.forEach((hiddenTag, i) => {
          if (i >= counter) {
            hiddenTag.classList.add('search-tags__item--hidden');
          }
        });
      }
      else {
        showAllBtn.innerHTML = hideText;

        allTags.forEach((hiddenTag) => {
          hiddenTag.classList.remove('search-tags__item--hidden');
        });
      }
    })
  });
});
