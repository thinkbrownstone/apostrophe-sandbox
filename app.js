var site = require('apostrophe-site')({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'tbi-apostrophe',
  hostName: 'tbi-apostrope',
  title: 'Think Brownstone',
  sessionSecret: 'Think Brownstone website on apostrophe',
  adminPassword: 'demo',

  locals: {
    loginButton: true,
    arrShuffle: function( array ) {
      var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  },

  addImageSizes: [
    {
      name: 'max',
      width: 1600,
      height: 1280
    }
  ],

  lockups: {
    left: {
      label: 'Left',
      tooltip: 'Float Small',
      icon: 'icon-arrow-left',
      // Only allows one type of widget
      widgets: [ 'slideshow' ],
      // Override the options for slideshows when they are inside the lockup to get the size right
      slideshow: {
        size: 'one-third'
      },
      video: {
        size: 'one-half'
      }
    },
    right: {
      label: 'Right',
      tooltip: 'Float Right',
      icon: 'icon-arrow-right',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      },
      video: {
        size: 'one-half'
      }
    }
  },

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default (Two Column)' },
      { name: 'onecolumn', label: 'One Column' },
      { name: 'blocks', label: 'Blocks' },
      { name: 'marquee', label: 'Marquee' },
      { name: 'home', label: 'Home Page' },
      // { name: 'blog', label: 'Blog' }, // removed because of special singular "content" type
      { name: 'map', label: 'Map' },
      { name: 'groups', label: 'Directory' },
      { name: 'company', label: 'Company' }
    ]
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-ui-2': {},
    'apostrophe-snippets': {},
    'apostrophe-blog': {
      label: 'Content',
      instanceLabel: 'Content Item',
      addFields: [
        {
          name: 'client',
          label: 'Client Name',
          type: 'string',
          before: 'clientLogo'
        },
        {
          name: 'clientLogo',
          label: 'Client Logo',
          type: 'singleton',
          after: 'thumbnail',
          widgetType: 'slideshow',
          options: {
            label: 'Client Logo',
            limit: 1
          }
        }
      ]
    },

    // demonstrates extending a content type / subclassing of Blog
    // 'tbiContent': {
    //   extend: 'apostrophe-blog',
    //   name: 'tbiContent',
    //   label: 'Content',
    //   instance: 'content',
    //   instanceLabel: 'Content',
    //   menuName: 'aposContentMenu',
    //   addFields: [
    //     {
    //       name: 'client',
    //       label: 'Client Name',
    //       type: 'string',
    //       before: 'clientLogo'
    //     },
    //     {
    //       name: 'clientLogo',
    //       label: 'Client Logo',
    //       type: 'singleton',
    //       after: 'thumbnail',
    //       widgetType: 'slideshow',
    //       options: {
    //         label: 'Client Logo',
    //         limit: 1
    //       }
    //     }
    //   ]
    // },
    'apostrophe-people': {
      email: {
        from: 'Brian Feister <brian.feister@thinkbrownstone.com>'
      },
      addFields: [
        {
          name: 'jobTitle',
          type: 'string',
          label: 'Job Title'
        }
      ]
    },
    'apostrophe-groups': {},
    'apostrophe-map':      {},
    // The new editor
    'apostrophe-editor-2': {},
    'apostrophe-blocks': {
      types: [
        {
          name: 'one',
          label: 'One Column'
        },
        {
          name: 'two',
          label: 'Two Column'
        }
      ]
    }
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    scripts: ['site'],
    stylesheets: ['site']
  },

  // beforeEndAssets: function(callback) {
  //   // Apostrophe already loads these for logged-out users, but we
  //   // want them all the time in this project.
  //   site.apos.pushAsset('script', { name: 'vendor/blueimp-iframe-transport', when: 'always' });
  //   site.apos.pushAsset('script', { name: 'vendor/blueimp-fileupload', when: 'always' });
  //   return callback(null);
  // }
});
