'use strict';

$(document).ready(() => {
  Handlebars.registerHelper('renderPartial', function(partialName, options) {
      if (!partialName) {
          console.error('No partial name given.');
          return '';
      }
      var parts = partialName.split('.');
      var partial = app.templates;
      for (var i = 0; i < parts.length; i++) {
        if (partial === null || partial === undefined)
          break;
        partial = partial[parts[i]];
      }
      if (!partial) {
          console.error('Couldnt find the compiled partial: ' + partialName);
          return '';
      }
      return new Handlebars.SafeString( partial(options.hash) );
  });

  var content = $('.content');
  var currentPageName;
  var currentPageNumber;
  var currentPageCount;

  var page = {
    home: 'home',
    about: 'about',
    culture: 'culture',
    preparation: 'preparation'
  };

  function renderContent(pageName, pageNumber) {
    var pageTemplates = app.templates[pageName];
    if (pageTemplates.hasOwnProperty(pageNumber)) {
      currentPageName = pageName;
      currentPageNumber = pageNumber;
      currentPageCount = countObjectProperties(pageTemplates);

      var templateName = pageName + '.' + pageNumber;

      content.html(app.templates.content({
        template: templateName,
        currentPage: currentPageNumber,
        pageCount: currentPageCount
      }));

      window.scrollTo(0, 0);

      bindNavArrows();
      checkNavArrows();
      checkNavigationMenu();
    } else {
      console.log('Wrong page number ' + pageNumber + ' for page ' + pageName);
    }
  };

  function countObjectProperties(o) {
    var count = 0;
    for (var p in o)
      if (o.hasOwnProperty(p)) count++;
    return count;
  }

  function bindNavArrows() {
    $('.main .content__navigation .icon--left').on('click', function() {
      renderContent(currentPageName, currentPageNumber - 1);
    });
    $('.main .content__navigation .icon--right').on('click', function() {
      renderContent(currentPageName, currentPageNumber + 1);
    });
  }

  function checkNavArrows() {
    $('.main .content__navigation .icon').removeClass('disabled');

    if (currentPageNumber === 1) {
      $('.main .content__navigation .icon--left').addClass('disabled');
    }
    if (currentPageNumber === currentPageCount) {
      $('.main .content__navigation .icon--right').addClass('disabled');
    }
  }

  function checkNavigationMenu() {
    $('.nav .list .list--item').removeClass('selected');
    $('.nav .list .list--item[data-page="' + currentPageName + '"]').addClass('selected');
  }


  $('.nav .list .list--item').on('click', function(e) {
    renderContent($(e.target).data('page'), 1);
  });

  renderContent(page.home, 1);
});
