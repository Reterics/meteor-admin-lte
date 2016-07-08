var screenSizes = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200
};

Template.AdminLTE.onCreated(function () {
  var self = this;
  this.my_skin = new ReactiveVar('blue');
  var skin = 'blue';
  var fixed = false;
  var sidebarMini = false;

  if (this.data) {
    skin = this.data.skin || skin;
    fixed = this.data.fixed || fixed;
    sidebarMini = this.data.sidebarMini || sidebarMini;
  }

  self.isReady = new ReactiveVar(false);
  self.style = waitOnCSS(cssUrl());
  self.skin = waitOnCSS(skinUrl(skin));

  fixed && $('body').addClass('fixed');
  sidebarMini && $('body').addClass('sidebar-mini');
  self.removeClasses = function () {
    fixed && $('body').removeClass('fixed');
    sidebarMini && $('body').removeClass('sidebar-mini');
  }

  this.autorun(function () {
    if (self.style.ready() && self.skin.ready()) {
      self.isReady.set(true);
    }
  });
});

Template.AdminLTE.onDestroyed(function () {
  this.removeClasses();
  this.style.remove();
  this.skin.remove();
});

Template.AdminLTE.helpers({
	my_skin: function() {
    //access reactiveVar template variable from onCreated() hook
    return Template.instance().my_skin.get();
  },
  isReady: function () {
    return Template.instance().isReady.get();
  },

  loadingTemplate: function () {
    return this.loadingTemplate || 'AdminLTE_loading';
  },

  skin: function () {
    return this.skin || 'blue';
  }
});

Template.AdminLTE.events({
	'click [data-toggle=control-sidebar]': function (e, t) {
		e.preventDefault();
		
		if($("aside.control-sidebar").hasClass("control-sidebar-open"))
		{
			$("aside.control-sidebar").removeClass("control-sidebar-open");
		}else {
			$("aside.control-sidebar").addClass("control-sidebar-open");
		}
	},
	'click [data-layout=fixed]': function (e, t) {
		e.preventDefault();
			$("a[data-layout=fixed]").text("On");
			$("a[data-layout=layout-boxed]").text("OFF");
		/*if(document.getElementById("boxed_lay").checked){
			//document.getElementById("fixed_lay").checked = true;
			document.getElementById("boxed_lay").removeAttribute('checked');
			
		}*/
		$('body').addClass('fixed')
			$('body').removeClass('layout-boxed');
			$('.control-sidebar').addClass('fixed');
		
		
	},
	'click [data-layout=layout-boxed]': function (e, t) {
		e.preventDefault();
		$("a[data-layout=layout-boxed]").text("On");
		$("a[data-layout=fixed]").text("Off");
		/*if(document.getElementById("fixed_lay").checked){
			//document.getElementById("boxed_lay").checked = true;
			document.getElementById("fixed_lay").removeAttribute('checked');
			
		}*/
		$('body').removeClass('fixed')
			$('body').addClass('layout-boxed');
			$('.control-sidebar').removeClass('fixed');
		
	},
	'click [data-skin=skin-black]': function (e, t) {
		e.preventDefault();
		skinChange('black',"dark");
		
	},
	'click [data-skin=skin-blue]': function (e, t) {
		e.preventDefault();
		skinChange('blue',"dark");
		
	},
	'click [data-skin=skin-purple]': function (e, t) {
		e.preventDefault();
		skinChange('purple',"dark");
		
	},
	'click [data-skin=skin-green]': function (e, t) {
		e.preventDefault();
		skinChange('green',"dark");
		
	},
	'click [data-skin=skin-red]': function (e, t) {
		e.preventDefault();
		skinChange('red',"dark");
		
	},
	'click [data-skin=skin-yellow]': function (e, t) {
		e.preventDefault();
		skinChange('yellow',"dark");
		
	},
	'click [data-skin=skin-blue-light]': function (e, t) {
		e.preventDefault();
		skinChange('blue-light',"light");
		
	},
	'click [data-skin=skin-black-light]': function (e, t) {
		e.preventDefault();
		skinChange('black-light',"light");
		
	},
	'click [data-skin=skin-purple-light]': function (e, t) {
		e.preventDefault();
		skinChange('purple-light',"light");
		
	},
	'click [data-skin=skin-green-light]': function (e, t) {
		e.preventDefault();
		skinChange('green-light',"light");
		
	},
	'click [data-skin=skin-red-light]': function (e, t) {
		e.preventDefault();
		skinChange('red-light',"light");
		
	},
	'click [data-skin=skin-yellow-light]': function (e, t) {
		e.preventDefault();
		skinChange('yellow-light',"light");
		
	},
  'click [data-toggle=offcanvas]': function (e, t) {
    e.preventDefault();

    //Enable sidebar push menu
    if ($(window).width() > (screenSizes.sm - 1)) {
      $("body").toggleClass('sidebar-collapse');
    }
    //Handle sidebar push menu for small screens
    else {
      if ($("body").hasClass('sidebar-open')) {
        $("body").removeClass('sidebar-open');
        $("body").removeClass('sidebar-collapse')
      } else {
        $("body").addClass('sidebar-open');
      }
    }
  },

  'click .content-wrapper': function (e, t) {
    //Enable hide menu when clicking on the content-wrapper on small screens
    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
      $("body").removeClass('sidebar-open');
    }
  },

  'click .sidebar li a': function (e, t) {
    //Get the clicked link and the next element
    var $this = $(e.currentTarget);
    var checkElement = $this.next();

    //Check if the next element is a menu and is visible
    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
      //Close the menu
      checkElement.slideUp('normal', function () {
        checkElement.removeClass('menu-open');
      });
      checkElement.parent("li").removeClass("active");
    }
    //If the menu is not visible
    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
      //Get the parent menu
      var parent = $this.parents('ul').first();
      //Close all open menus within the parent
      var ul = parent.find('ul:visible').slideUp('normal');
      //Remove the menu-open class from the parent
      ul.removeClass('menu-open');
      //Get the parent li
      var parent_li = $this.parent("li");

      //Open the target menu and add the menu-open class
      checkElement.slideDown('normal', function () {
        //Add the class active to the parent li
        checkElement.addClass('menu-open');
        parent.find('li.active').removeClass('active');
        parent_li.addClass('active');
      });
    }
    //if this isn't a link, prevent the page from being redirected
    if (checkElement.is('.treeview-menu')) {
      e.preventDefault();
    }
  }
});


function skinChange(newSkin,light){
	var get = Template.instance().my_skin.get();
	$(".skin-"+get).addClass("skin-"+newSkin);
	if(light = "light")
	{
		if($("aside.control-sidebar").hasClass("control-sidebar-dark"))
		{
			$("aside.control-sidebar").removeClass("control-sidebar-dark");
			$("aside.control-sidebar").addClass("control-sidebar-light");
		}
	}
	else {
		if($("aside.control-sidebar").hasClass("control-sidebar-light"))
		{
			$("aside.control-sidebar").removeClass("control-sidebar-light");
			$("aside.control-sidebar").addClass("control-sidebar-dark");
		}
	}
	$(".skin-"+get).removeClass(".skin-"+get);
	//$("body").addClass(newSkin);
	$('link[href="' + Meteor.absoluteUrl('packages/redaty_admin-lte/css/skins/skin-' + get + '.min.css') + '"]').remove();
	Template.instance().my_skin.set(newSkin);
	waitOnCSS(skinUrl(newSkin));
}

function cssUrl () {
  return Meteor.absoluteUrl('packages/redaty_admin-lte/css/AdminLTE.min.css');
}

function skinUrl (name) {
  return Meteor.absoluteUrl(
    'packages/redaty_admin-lte/css/skins/skin-' + name + '.min.css');
}

function waitOnCSS (url, timeout) {
  var isLoaded = new ReactiveVar(false);
  timeout = timeout || 5000;

  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;

  link.onload = function () {
    isLoaded.set(true);
  };

  if (link.addEventListener) {
    link.addEventListener('load', function () {
      isLoaded.set(true);
    }, false);
  }

  link.onreadystatechange = function () {
    var state = link.readyState;
    if (state === 'loaded' || state === 'complete') {
      link.onreadystatechange = null;
      isLoaded.set(true);
    }
  };

  var cssnum = document.styleSheets.length;
  var ti = setInterval(function () {
    if (document.styleSheets.length > cssnum) {
      isLoaded.set(true);
      clearInterval(ti);
    }
  }, 10);

  setTimeout(function () {
    isLoaded.set(true);
  }, timeout);

  $(document.head).append(link);

  return {
    ready: function () {
      return isLoaded.get();
    },

    remove: function () {
      $('link[href="' + url + '"]').remove();
    }
  };
}
