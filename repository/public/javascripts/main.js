"use strict;"

import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

var maxchar = 167;
var i = document.getElementById("yaddatxtarea");
var c = document.getElementById("count");
c.innerHTML = maxchar;
    
i.addEventListener("keydown",count);

function count(e){
    var len =  i.value.length;
    if (len >= maxchar){
       e.preventDefault();
    } else{
       c.innerHTML = maxchar - len-1;   
    }
}
