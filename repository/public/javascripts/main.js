"use strict;"

import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

var maxchar = 167;
var i = document.getElementById("yaddatxtarea");
var c = document.getElementById("charcount");
c.innerHTML = "Remaining characters: " + maxchar;
function count(e){
    var len =  i.value.length;
    if (len >= maxchar){
       e.preventDefault();
    } else{
       c.innerHTML = maxchar - len-1;   
    }
       
};

i.addEventListener("keyup", count);
