import{navigationState as e}from"../utils.js";let navbarShrink={navbarDom:document.querySelector(".navbar-container"),leftAsideDom:document.querySelector(".page-aside"),isnavbarShrink:!1,navbarHeight:0,init(){this.navbarHeight=this.navbarDom.getBoundingClientRect().height,this.shrink(),this.togglenavbarDrawerShow(),this.toggleSubmenu(),window.addEventListener("scroll",()=>{this.shrink()})},shrink(){var e=document.documentElement.scrollTop||document.body.scrollTop;!this.isnavbarShrink&&e>this.navbarHeight?(this.isnavbarShrink=!0,document.body.classList.add("navbar-shrink")):this.isnavbarShrink&&e<=this.navbarHeight&&(this.isnavbarShrink=!1,document.body.classList.remove("navbar-shrink"))},togglenavbarDrawerShow(){var e=[document.querySelector(".window-mask"),document.querySelector(".navbar-bar")],e=(document.querySelector(".navbar-drawer")&&e.push(...document.querySelectorAll(".navbar-drawer .drawer-navbar-list .drawer-navbar-item"),...document.querySelectorAll(".navbar-drawer .tag-count-item")),e.forEach(e=>{e.dataset.navbarInitialized||(e.dataset.navbarInitialized=1,e.addEventListener("click",()=>{document.body.classList.toggle("navbar-drawer-show")}))}),document.querySelector(".navbar-container .navbar-content .logo-title"));e&&!e.dataset.navbarInitialized&&(e.dataset.navbarInitialized=1,e.addEventListener("click",()=>{document.body.classList.remove("navbar-drawer-show")}))},toggleSubmenu(){document.querySelectorAll("[navbar-data-toggle]").forEach(e=>{e.dataset.eventListenerAdded||(e.dataset.eventListenerAdded="true",e.addEventListener("click",function(){let e=document.querySelector('[data-target="'+this.getAttribute("navbar-data-toggle")+'"]'),a=e.children,t=this.querySelector(".fa-chevron-right");var r;e&&(r=!e.classList.contains("hidden"),t&&t.classList.toggle("icon-rotated",!r),r?anime({targets:a,opacity:0,translateY:-10,duration:300,easing:"easeInQuart",delay:anime.stagger(80,{start:20,direction:"reverse"}),complete:function(){e.classList.add("hidden")}}):(e.classList.remove("hidden"),anime({targets:a,opacity:[0,1],translateY:[10,0],duration:300,easing:"easeOutQuart",delay:anime.stagger(80,{start:20})})))}))})}};try{swup.hooks.on("page:view",()=>{navbarShrink.init(),e.isNavigating=!1}),swup.hooks.on("visit:start",()=>{e.isNavigating=!0,document.body.classList.remove("navbar-shrink")})}catch(e){}document.addEventListener("DOMContentLoaded",()=>{navbarShrink.init()});export{navbarShrink};