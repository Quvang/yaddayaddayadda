"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

const getTheTheme = function(ev) {
  let req = Object.create(Ajax);
  req.init();
  req.getFile("/darkTheme", viewTheme);
};

const viewTheme = function (e) {

  let userTheme = JSON.parse(e.target.responseText);
  let theme = userTheme.dtheme;
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (theme === 'dark') {
    toggleSwitch.check = true;
    document.documentElement.setAttribute('data-theme', "dark");
    localStorage.setItem('theme', 'dark');
} else {
    toggleSwitch.check = false;
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
}

function getTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      window.location.href = "getTheme";
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      window.location.href = "getTheme";
    }    
}

toggleSwitch.addEventListener('change', getTheme);

};

window.addEventListener("load", getTheTheme);