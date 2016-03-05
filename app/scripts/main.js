'use strict';

$(document).ready(() => {
  Handlebars.registerHelper('renderPartial', function(partialName, options) {
      if (!partialName) {
          console.error('No partial name given.');
          return '';
      }
      var partial = app.templates[partialName];
      if (!partial) {
          console.error('Couldnt find the compiled partial: ' + partialName);
          return '';
      }
      return new Handlebars.SafeString( partial(options.hash) );
  });

  var content = $('.content');
  var currentPageNumber;

  var page = {
    home: 'home',
    about: 'about'
  };
  
  var templates = {
    home: [
      'home-1',
      'home-2',
      'home-3'
    ],
    about: [
      'about-1',
      'about-2'
    ]
  };

  function renderContent(pageName, pageNumber) {
    var pageTemplate = templates[pageName];
    var pageCount = pageTemplate.length;
    if (pageNumber >= 0 && pageNumber < pageCount) {
      var template = pageTemplate[pageNumber - 1];
      content.html(app.templates.content({
        template: template,
        currentPage: pageNumber,
        pageCount: pageCount
      }));
    } else {
      console.log('Wrong page number ' + pageNumber + ' for page ' + pageName);
    }
  };



  renderContent(page.home, 1);
});
