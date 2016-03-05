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

  var $content = $('.content');
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

  function renderContent(template) {
    $content.html(app.templates.content({
      template: template
    }));
  }

  renderContent(templates.home[0]);
});
