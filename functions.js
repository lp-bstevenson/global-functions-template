// CB_Global_Functions: v.1.1 (last update 22-june-2022)
 
/**** Global Functions layout ****/
// 1. Arrays
// 2. CB Function Aliases
// 3. CB helper Functions (to control management/flow of conversation)
// 4. Settings; including default escalation, transfer, unmatched phrase responses; auto-escalation settings, timezone offset, and "starting" & "initialisation" interaction names.
// 5. "__initConversation()" function, which executes once at the beginning of each new Bot Session

// resevered variables
var cb = {}; var bc = botContext;
var arrays = {
  yes: ["👍", "yes", "yse", "yeah", "yep", "yup", "sure", "correct"],
  no: ["👎", "no", "nah", "nope", "not sure"],
  months_long: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ],
  months_short: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ],
  days_short: ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"],
  days_long: [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", ],
  place_types: { accounting: "💲", airport: "✈️", amusement_park: " 🎢", aquarium: " 🐠", art_gallery: " 🧑‍🎨", atm: " 🏧", bakery: " 🥯", bank: " 🏦", bar: " 🥂", beauty_salon: " 💅", bicycle_store: " 🚴‍♂️", book_store: " 📚", bowling_alley: " 🎳", bus_station: " 🚌", cafe: "☕", campground: " 🏕️", car_dealer: " 🚙", car_rental: " 🚙", car_repair: " 🚙", car_wash: " 🚙🚿", casino: " 🎰", cemetery: " ⚰️", church: " 🛐", city_hall: "", clothing_store: " 👕", convenience_store: " 🏪", courthouse: " 👨‍⚖️", dentist: " 🦷", department_store: " 🏬", doctor: " 👩‍⚕️", drugstore: " 💊", electrician: " 🔌", electronics_store: " 📱", embassy: " 🏢", fire_station: " 🧑‍🚒", florist: " 💐", funeral_home: " ⚰️", furniture_store: " 🪑", gas_station: " ⛽", gym: " 🏋️", hair_care: " 💇", hardware_store: " 🛠️", hindu_temple: " 🛐", home_goods_store: " 🏠", hospital: " 🏥", insurance_agency: " 📝", jewelry_store: " 💍", laundry: " 🧺", lawyer: " 🧑‍⚖️", library: " 📚", light_rail_station: " 🚃", liquor_store: " 🥃", local_government_office: " 🏢", locksmith: " 🔐", lodging: " 🏨", meal_delivery: " 🍽️", meal_takeaway: " 🍽️", mosque: " 🛐", movie_rental: " 📼", movie_theater: " 🍿", moving_company: " 📦", museum: " 🦖", night_club: " 🕺", painter: " 👨‍🎨", park: " 🏞️", parking: " 🅿️", pet_store: " 🐶", pharmacy: " 💊", physiotherapist: " 👩‍⚕️", plumber: " 👨‍🔧", police: " 👮‍♂️", post_office: " 🏣", primary_school: " 🏫", real_estate_agency: "  💰🏘️", restaurant: " 🍽️", roofing_contractor: " 🏠", rv_park: "  🚚🅿️", school: " 🏫", secondary_school: " 🏫", shoe_store: " 👞", shopping_mall: " 🛍️", spa: " 🧖‍♂️🧖‍♀️", stadium: " 🏟️", storage: " 📦", store: " 🏬", subway_station: " 🚄", supermarket: " 🏪", synagogue: " 🛐", taxi_stand: " 🚕", tourist_attraction: " 🗻🗼🌋", train_station: " 🚄", transit_station: " 🚄", travel_agency: " 💱", university: " 🎓", veterinary_care: "  👨‍⚕️🐶", zoo: " 🐯🐘" }
};

var conversation_Builder_Function_Aliases = {
  // manaing the Conversation Context Service
  // https://developers.liveperson.com/conversation-builder-scripting-functions-manage-the-conversation-context-service.html
  // setting data
  setNamespace: function (n, ttl) { /* ttl = seconds */ bc.registerContextNamespace(n, ttl); },
  setContextConv: function (n, p, v) { this.log("set context data for conversation scope: " + bc.setContextDataForConversation(n, p, v)); },
  setContextUser: function (n, p, v) { this.log("set context data for user scope: " + bc.setContextDataForUser(n, p, v)); },
  setContextGlobal: function (n, p, v) { this.log("set context global scope: " + bc.setGlobalContextData(n, p, v)); },
  
  // getting data
  // to get ALL variables from a namespace, omit the property (only valid for conversation and user scopes)
  getContextConv: function (n, p) { return bc.getContextDataForConversation(n, p); },
  getContextUser: function (n, p) { return bc.getContextDataForUser(n, p); },
  getContextGlobal: function (n, p) { return bc.getGlobalContextData(n, p); },
  
  // deleting data
  deleteContextConv: function (n, p) { return bc.deleteContextDataForConversation(n, p); },
  deleteContextUser: function (n, p) { return bc.deleteContextDataForUser(n, p); },
  deleteContextGlobal: function (n, p) { return bc.deleteGlobalContextData(n, p); },
  deleteContextUserAll: function (n) { return bc.deleteAllContextDataForUser(n); },  
  deleteContextConversationAll: function (n) { return bc.deleteAllContextDataForConversation(n); },

  askMaven: function () { return bc.askMaven(); },
  delay: function (a) { bc.setMessageDelay(a); /* add to pre-process code */},
  logEvent: function (user_message, event_name, event_details) { bc.logCustomEvent(user_message, event_name, event_details); },
  getEnvVar: function (e) { return bc.getEnvVariable(e); },
  getVar: function (a) { return bc.getBotVariable(a); },
  ignoreMax: function () { bc.setAllowMaxTextResponse(true); },
  jumpTo: function (interaction_name) { bc.setTriggerNextMessage(interaction_name); },
  log: function (e) { bc.printDebugMessage(e); },
  logVar: function (a, b) { bc.printDebugMessage(a + ": " + b); },
  msgs: function (val) { bc.sendMessages(val); },
  QR: function (message, array) { bc.sendMessageWithQuickReplies(message, array); },
  setVar: function (a, b) { bc.setBotVariable(a, b, true, false); },
  setVarDialog: function (arg, val) { bc.setBotVariable(arg, val, true, false); },
  setVarPerm: function (arg, val) { bc.setBotVariable(arg, val, true, true); },
  txt: function (arg) { bc.sendMessage(arg); },
  userSaid: function () { return bc.getCurrentUserMessage(); },
  // get webview variables
  wvvar: function (val) { return bc.getWebViewVariable(val); },
};

var conversation_Builder_Helper_Functions = {
  // manage auth state within Bot
  setAuth: function (a) { this.setVar('isAuth', a); },
  checkAuth: function () {
    var isa = cb.tf(cb.getVar('isAuth'));
    if (!isa) cb.jumpTo('NOT_AUTHENICATED');
    return ;
  },
  
  // simple method to get variable type
  typeOf: function (data) {
    if (!data) return null;
    if (typeof data === 'object' && Array.isArray(data)) return 'array';
    if (typeof data === 'object') return 'object';
    return typeof data;
  },

  // substitue for ARRAY.find((x) => { x === y }) and ARRAY.findIndex((x) => { x === y })
  // the array to search, property to target and value to match
  
  objFind: function (array, property, value) {
    var a = [
      { name: 'billy' } ,
      { name: 'sam' }
    ];
    cb.objFind(a, 'name', 'sam');
    for (var i in array) {
      if (!array[i][property]) continue;
      var val = typeof value === 'string' ? value.toLowerCase() : value;
      var prop = typeof array[i][property] === 'string' ? array[i][property].toLowerCase() : array[i][property];
      if (prop === val) { 
        return {
          val: array[i],
          index: i
        };
      }
    }
  },
  
  // converts java.util.HashMap to standard JSON object
  // required to convert data when retreieving ALL variables from Context Service as per: https://developers.liveperson.com/conversation-builder-scripting-functions-manage-the-conversation-context-service.html#get-all-variables
  convertHash: function (map) {
    var obj = {};
    var stringOfMap = map.toString();
    map.keySet().forEach(function(k, i) {
      obj[k] = map[k];
    });
    return obj;
},
  
  // convert properties from an JSON object into botContext (session) variables
  objToVars: function (a) { var t = this; Object.keys(a).forEach(function (key) { t.setVar(key, a[key]); }); },

  // returns an array of matched entity values and categories based on the consumer message
  // example entity: (PRODUCT) = 's22¬mobile device'. 's22' is the value, mobile device is the category (values are seprated by the tilda (¬)).
  getNamedEntities: function (entity) {
    var output = { result: false }; var entityArray = botContext.getNamedEntities(entity); output.entity = []; output.category = null; if (entityArray != null && entityArray.length > 0) { for (j = 0; j < entityArray.length; j++) { this.log('ENTITY (' + j + '):  ' + entityArray[j].getPhrase() + ' | ' + 'Classifier: ' + entityArray[j].getDataValue()); output.category = entityArray[j].getDataValue(); output.entity.push(entityArray[j].getPhrase()); output.result = true; } } return output;
  },

  // injects a 'welcome' message into the conversation if not already sent
  firstMessage: function (welcomeMessage) { var fm = this.tf(this.getVar("isConvStarted")); if (welcomeMessage && !fm) { this.welcome(); } this.setVar("isConvStarted", true); return !fm; },

  // injects 'welcome' message into a conversation (if not already sent)
  welcome: function () { var a = this.getVar("welcomeMessage"); if (!this.tf(this.getVar("isWelcomeSent")) && !!a) { this.setVar("isWelcomeSent", true); this.txt(a); } },

  // simple ES5 substitute for ES6 "includes()" method to search array
  contains: function (array, string) { return array.indexOf(string) >= 0; },
  
  randomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  // returns random item from an array... usage example:
  // var hotwords = ['awesome', 'cool', 'much wow', 'amazing'];
  // cb.txt('that is ' + cb.randomArray(hotwords) + '!'); = 'that is much wow!'
  randomArray: function (array) { return  array[Math.floor(Math.random()*array.length)]; },
  
  // sorts array in ascending order (by default) based on alpha-numeric values;
  // 2 arguments (<array>, <isDescending:true/false>[optional]), 
  // e.g: var array = [109, 88, 77, 1];
  // cb.sortObjArray(array, 'name'); // log = [1, 77, 88, 109];
  sortArray: function (array, isDesc) { function c( a, b ) { if (typeof a === 'number') { if ( a < b){ return isDesc ? 1 : -1; } if ( a > b){ return isDesc ? -1 : 1; } } else if (typeof a === 'string') { if ( a.toLowerCase() < b.toLowerCase()){ return isDesc ? 1 : -1; } if ( a.toLowerCase() > b.toLowerCase()){ return isDesc ? -1 : 1; } } return 0; } return array.sort(c); },
  
  // 3 arguments (<array>, <property>, <isDescending:true/false>[optional]), 
  // cb.sortObjArray(array, 'name'); // log = [{ name: "barry"}, { name: "zara"}];
  sortObjArray: function (array, prop, isDesc) { function c( a, b ) { var p = a[prop]; var v = b[prop]; if (typeof p === 'number') { if ( p < v){ return isDesc ? 1 : -1; } if ( p > v){ return isDesc ? -1 : 1; } } else if (typeof p === 'string') { if ( p.toLowerCase() < v.toLowerCase()){ return isDesc ? 1 : -1; } if ( p.toLowerCase() > v.toLowerCase()){ return isDesc ? -1 : 1; } } return 0; } return array.sort(c); },

  // Counts words in a string
  countWords: function (s) { s = s.replace(/(^\s*)|(\s*$)/gi, ""); s = s.replace(/[ ]{2,}/gi, " "); s = s.replace(/\n /, "\n"); return s.split(" ").filter(function (str) { return str != ""; }).length; },

  // forces Bot to run through the 'INIT' Dialog and execute API integrations beforing returning to original interaction
  // takes in the name of the interaction where this function is called (so it can return to the same interaction
  // this should be placed in EVERY dialog starter within pre-process code of first interaction
  initConv: function (I_N) { this.setVar("breadcrumb", !I_N ? this.getVar("firstInteraction") : I_N); if (!this.tf(this.getVar("INIT"))) { this.setVar("INIT", true); this.trail(I_N); this.jumpTo(this.getVar("init_interaction")); } },

  // returns to previous interaction (set using "trail()"), or if not yet set, returns to "firstInteraction", which is defined in SETTINGS below
  // if first message is not matched - and bot subsequently triggers fallback for the first message, the 'trail()' function would not have been called yet, and therefore the 'first' interaction should be defined in global functions so the Bot can start on the desired starting point.
  previous: function () { var c = this.getVar("breadcrumb") || this.getVar("firstInteraction"); if (!c) { return; } this.log("previous(): interaction: " + c); this.jumpTo(c); },

  // Manages the responses for unmatched user phrases and escalation.
  // sends error response messages from the "unmatchedResponses" property in SETTINGS.
  // if 'sequential' parameter is true, the function will send the error messages in the order defined in the array, otherwise it will send randomly.
  // if the user message exceeds the LONG_MESSAGE_LIMIT (defined in SETTINGS), the LONG_MESSAGE_RESPONSE will be sent as a message.
  // When the "errorThreshold" is reach (defined in settings), the function will go to the interaction provided (escalationName parameter)
  unmatched: function (sequential, escalationName) { var ec = Number(cb.getVar("errorCount")); var et = Number(cb.getVar("errorThreshold")); var w = cb.countWords(cb.userSaid()); var u = JSON.parse(cb.getVar("unmatchedResponses")); var last = cb.getVar("lerrorR"); var idx = last ? u.indexOf(last) : null; if (escalationName && ec > et) { this.txt(this.getVar("ERROR_LIMIT_MESSAGE")); if (escalationName) { this.jumpTo(escalationName); } else { cb.previous(); } return; } else if (Number(w) >= Number(cb.getVar("LONG_MESSAGE_LIMIT"))) { cb.txt(cb.getVar("LONG_MESSAGE_RESPONSE")); } else { if (!sequential) { var a = Math.floor(Math.random() * u.length); while (a === idx) { a = Math.floor(Math.random() * u.length); } cb.txt(u[a]); cb.setVar("lerrorR", u[idx]); } else { idx = idx === u.length - 1 || idx === null ? 0 : idx + 1; cb.setVar("lerrorR", u[idx]); this.txt(u[idx]); } } cb.previous(); return; },

  // Records the current interaction and adds to historical array and increments an 'errorCount' (which is used by the 'unmatched()' function).
  // Also used by the 'previous()', 'goBack()', and 'initConv()' functions.
  trail: function (val) {
    var count = Number(botContext.getBotVariable("errorCount")); var breadcrumb = botContext.getBotVariable("breadcrumb"); /* reset error counter if conversation has moved to a new interaction */ if (breadcrumb !== val) { count = 0; } botContext.setBotVariable("errorCount", count, true, false); botContext.setBotVariable("breadcrumb", val, true, false); /* add interaction name to interaction history array */ var ih = botContext.getBotVariable("interactionHistory"); ih = ih ? JSON.parse(ih) : []; ih.push(val); this.log("array: " + JSON.stringify(ih)); botContext.setBotVariable("interactionHistory", JSON.stringify(ih), true, false);
  },

  // Uses the interaction history created by the 'trail()' function, and returns to the last interaction recorded in the array (and removes it from the array)
  goBack: function () {
    var bc = this.getVar("interactionHistory"); bc = bc ? JSON.parse(bc) : []; if (bc.length === 0) { this.log("Cannot goBack any further, end of interaction history"); return; } var s = bc.splice(0, bc.length - 1); var l = s.pop(); this.setVar("interactionHistory", JSON.stringify(s)); this.jumpTo(l);
  },

  // to review and remove
  returnCustomerInfo: function (customerInfo) { if (customerInfo) { this.log("customerId:" + customerInfo.customerId); return customerInfo.customerId; } else { return "not available"; }},

  // simply returns a Booean of true/false, ensuring
  tf: function (e) { return e == "true" || e == true; },

  // takes an epoch timestamp (in milliseconds) and returns localised time formats
  convertTime: function (time, tzOffset) {
    /* capitalise string*/ function cap(string) { return string.charAt(0).toUpperCase() + string.slice(1); } /* add preceding 0 to single digit numbers*/ function addZ(e) { return e < 10 ? '0' + e : e; } function ampm(e) { return e < 12 ? 'am' : 'pm'; } /* format as ordinal*/ function nth(d) { if (d > 3 && d < 21) return 'th'; switch (d % 10) { case 1: return "st"; case 2: return "nd"; case 3: return "rd"; default: return "th"; } } /* get weekOfYear */ function week(d) { d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7)); var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7); return weekNo; } /* declare required variables */ tzOffset = (Number(tzOffset || Number(cb.getVar('tz')))) * 3600000; var gmtOffset = Number(new Date().getTimezoneOffset() * 60000); var c = ":"; var d = "-"; var days = arrays.days_long; var MONTHS_LONG = arrays.months_long; var MONTHS_SHORT = arrays.months_short; var queryTime = new Date(time + tzOffset + gmtOffset); var _n = Date.now(); var present = new Date(_n + tzOffset + gmtOffset); /* get day of year*/ function dayAndYear(time) { var now = new Date(time); var start = new Date(now.getFullYear(), 0, 0); var year = now.getFullYear(); var diff = now - start; var oneDay = 1000 * 60 * 60 * 24; var day = Math.floor(diff / oneDay); return { day: day, year: year }; } /* calculate variances between given time and current time */ function variances(present, queryTime) { var p = dayAndYear(present); var q = dayAndYear(queryTime); var days = (((q.year - 1) * 365) + q.day) - (((p.year - 1) * 365) + p.day); var ms = queryTime - present; var seconds = ms / 1000; var minutes = seconds / 60; var hours = minutes / 60; var weeks = days / 7; var months = days / (365 / 12); var years = days / 365; return { years: years, months: months, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds, ms: ms }; } var relativeTimes = function (vary, tu) { var a; var q = tu.queryTime; var p = tu.present; var isFuture = q.epoch > p.epoch; var dateString = cap(arrays.days_long[q.day]) + ' the ' + q.date + nth(q.date) + ' of ' + arrays.months_long[q.month - 1]; var hour = q.hour > 12 ? q.hour - 12 : addZ(q.hour); var timeString = hour + ':' + addZ(q.minute); /* if next year (and at least more than 1 month) */ if (isFuture && (q.year - p.year) >= 1 && vary.months >= 2) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ', ' + dateString + ' (' + q.year + ').'; } /* 2 months or more in future */ else if (isFuture && vary.months > 1) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ', ' + dateString + ' (' + q.year + ').'; } /* less than 2 months in future but more than 1 week (next month)*/ else if (isFuture && vary.months < 2 && vary.weeks >= 2) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ', ' + cap(arrays.days_long[q.day]) + ' the ' + q.date + nth(q.date) + ' (next month)'; } /* next week */ else if (isFuture && vary.months < 2 && (q.week - p.week) === 1) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ', next ' + cap(arrays.days_long[q.day]); } /* this week (after tomorrow) */ else if (isFuture && vary.months < 2 && (q.week - p.week) === 0 && vary.days > 1) { a = cap(arrays.days_long[q.day]) + ' ' + (q.minute === 0 ? hour : timeString) + ampm(q.hour); } /* this week (tomorrow) */ else if (isFuture && vary.months < 2 && (q.week - p.week) === 0 && vary.days === 1) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ' tomorrow'; } /* today */ else if (isFuture && vary.days === 0 && vary.minutes > 10) { /* evening */ if (q.hour > 18) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ' this evening'; } /* afternoon */ if (q.hour > 12) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ' this afternoon'; } /* morning */ if (q.hour < 12) { a = (q.minute === 0 ? hour : timeString) + ampm(q.hour) + ' this morning'; } } else if (isFuture && vary.days === 0 && vary.minutes < 10 && vary.minutes > 5) { a = 'in 5 to 10 minutes'; } else if (isFuture && vary.days === 0 && vary.minutes < 10 && vary.minutes <= 5) { a = 'in a few minutes'; } return a; }; var timeUnits = function (time) { var u = { epoch: time.getTime(), year: time.getFullYear(), month: time.getMonth(), week: week(time), date: time.getDate(), day: time.getDay(), hour: time.getHours(), minute: time.getMinutes(), second: time.getSeconds(), ms: time.getMilliseconds(), full: null, }; u.full = days[u.day] + ", " + u.date + d + MONTHS_LONG[u.month] + d + u.year + "," + addZ(u.hour) + c + addZ(u.minute) + c + addZ(u.second); return u; }; /* MAIN FUNCTION EXECUTION */ var a = { timeUnits: { present: timeUnits(present), queryTime: timeUnits(queryTime) }, variance: variances(present, queryTime), relative: null }; a.relative = relativeTimes(a.variance, a.timeUnits); return a;
  },

  // creates unique IDs, similar to uuidv4()
  uuid: function () { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
},

  // Simplifies programatic generataion of rich content for Universal Tiles
  rich: {
    create: function (name, type, content) {
      var c = conversation_Builder_Function_Aliases;
      if (type === 'walist') {
        var con = this.walist(content);
        c.log("content: " + con);
        c.setVar(name, JSON.stringify(con));
      } else if (type === 'wabuttons') {
        c.setVar(name, JSON.stringify(this.wabuttons(content)));
      } else if (type === 'verticalCard') {
        c.setVar(name, JSON.stringify(this.verticalCard(content)));
      } else if (type === 'carousel') {
        c.setVar(name, JSON.stringify(this.carousel(content)));
      }
    },
    wabuttons: function (a) {
      if (!a.title || !a.buttons || a.buttons.length === 0) return;
      var card = {
        "type": "vertical",
        "tag": "generic",
        "elements": [
        ]
      };
      if (a.title) {
        card.elements.push({
          "type": "text",
          "text": a.title,
          "tag": "title"
        });
      }
      a.buttons.forEach(function (button) {
        card.elements.push({
          "type": "button",
          "title": button.title,
          "click": {
            "actions": [
              {
                "type": "publishText",
                "text": button.label || button.title
              }
            ]
          }
        });
      });
      return card;
    },
    walist: function (a) {
      if (!a.buttonLabel) { cb.log('button label missing'); return; }
      if (!a.title) { cb.log('title missing'); return; }
      var card = {
        "type": "vertical",
        "tag": "list",
        "elements": [
          {
            "type": "vertical",
            "elements": [
              {
                "type": "text",
                "text": a.title,
                "tag": "title"
              }
            ]
          }
        ]
      };
      if (a.subtitle) {
        card.elements[0].elements.push({
          "type": "text",
          "text": a.subtitle,
          "tag": "subtitle"
        });
      }
      if (a.footer) {
        card.elements[0].elements.push({
          "type": "text",
          "text": a.footer,
          "tag": "subtitle"
        });
      }
      card.elements[0].elements.push({
          "type": "button",
          "tag": "menu",
          "title": a.buttonLabel,
          "click": {
            "actions": [
              {
                "type": "publishText",
                "text": a.buttonLabel
              }
            ]
          }
        });
        a.sections.forEach(function(section) {
          var sCard = {
            "type": "horizontal",
            "elements": [
              {
                "type": "vertical",
                "elements": [
                  {
                    "type": "text",
                    "tag": "title",
                    "text": section.title
                  }
                ]
              }
            ]};
          section.buttons.forEach(function(b) {
            sCard.elements[0].elements.push({
              "type": "button",
              "title": b.title,
              "subtitle": b.subtitle,
              "click": {
                "actions": [
                  {
                    "type": "publishText",
                    "text": b.title
                  }
                ]
              }
            });
          });
          card.elements[0].elements.push(sCard);
        });
      return card;
    },
    verticalCard: function (a) {
      cb.log(a);
      var card = {
        "type": "vertical",
        "elements": []
      };
      a.forEach(function (el) {
        // text element
        if (el.hasOwnProperty('text')) {
          card.elements.push({
            "type": "text",
            "text": el.text,
            "tooltip": el.tooltip || el.text,
            "style": el.style
          });
        }
        // link button (open url)
        else if (el.hasOwnProperty('uri')) {
          card.elements.push({
            "type": "button",
            "title": el.title,
            "tooltip": el.tooltip || el.text,
            "style": el.style,
            "click": {
              "actions": [
                {
                  "type": "link",
                  "uri": el.uri,
                  "target": el.target || 'blank'
                }
              ]
            }
          });
        }
        // postback button
        else if (el.hasOwnProperty('postback')) {
          card.elements.push({
            "type": "button",
            "title": el.title,
            "tooltip": el.tooltip || el.text,
            "style": el.style,
            "click": {
              "actions": [
                {
                  "type": "publishText",
                  "text": el.posstback || el.title
                }
              ]
            }
          });
        }
        // image
        else if (el.hasOwnProperty('image')) {
          card.elements.push({
            "type": "image",
            "url": el.image,
            "caption": el.caption,
            "tooltip": el.tooltip || el.caption,
            "click": {}
          });
        }
      });
      return card;
    },
    carousel: function (a) {
      if (a.length === 1) {
        return a[0];
      }
      return {
        "padding": 10,
        "type": "carousel",
        "elements": a
      };
    }
  }
};
// for Google Maps location (calculates distances between 2 sets for geo-coordinates(
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }
function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

// assign functions to 'cb'
var aA = conversation_Builder_Function_Aliases; var aB = conversation_Builder_Helper_Functions;
for (var a in Object.keys(aA)) { cb[Object.keys(aA)[a]] = aA[Object.keys(aA)[a]]; }
for (var a in Object.keys(aB)) { cb[Object.keys(aB)[a]] = aB[Object.keys(aB)[a]]; }

// for defining LP API host domains
var region = "sy";
var regionCode = region === "sy" ? "z3" : region === "lo" ? "lo" : "va";
var brandName = "Liveperson";

var SETTINGS = {
  DEFAULTS: {
    botId: botContext.chatBotId,
    // for google locations (need better place to store Google API key!)
    googleAPIKey: "",
    maxLocationResults: 3,
    brandName: brandName,
    // Default timezone offset (GMT+ -> your offset).
    tz: 11,
    // Default skill ID/Name (name is not required for agent transfer). This is for cases where the conversation
    // is escalated before routing is confirmed
    skillId: '1400599670',
    defaultSkillName: "",
    // default namespace for setting attributes in CCS
    namespace: 'debug'
  },
  DEFAULT_CONVERSATION_MESSAGES: {
    authMessage: "Please log into your account so that I can provide you with personalised information related to your account",
    offerEscalationMessage: "Would you like to speak with a human?",
    unmatchedResponses: JSON.stringify([
      "Sorry, I didn't quite get that",
      "Please try rephrasing",
      "I'm stumped! Try asking a simple question (one at a time)",
    ]),
    transferMessage: "BLANK_MESSAGE",
    welcomeMessage: "Hi!, I'm the *" + brandName  + "* In Virtual Assistant. How can I help today?",
    escalationMessage: "It seem's I'm having some trouble, please bear with me a moment while I check if there's a human supervisor who can assist",
    LONG_MESSAGE_RESPONSE: "That's a big question, please try rephrasing with a shorter question (I work best with short, concise questions)",
    ERROR_LIMIT_MESSAGE: "This seems to be running off the rails a little!",
  },
  CONVERSATION_SETTINGS: {
    errorThreshold: 1, // if the errorThreshold is set to 2, the offer to escalate will occur on the 3rd consecutive error
    LONG_MESSAGE_LIMIT: 20, // number of words in an unmatched phrase will trigger the alternative "LONG_MESSAGE_RESPONSE" message
    KNOWLEDGE_BASE_ENABLED: true, // for template using the KAI / KB integration; this can be set to false to disable the KB and use a simple fallback response
    init_interaction: "init", // this is the name of the FIRST interaction within your 'INIT' dialog
    firstInteraction: "start", // this is the name of the preffered starting point in your bot. In the case that the first user message is unmatched, the user will be directed to this interaction
    testMode: false, // for testing purposes
  },
  CONTEXT_SESSION_STORE: {
    // This is for degbugging purposes.
    // If a namespace is defined below, any prop/values defined below will be set in the Conversational Context Service using the defined namespace name.
    // set the namespace to 'null' if this is not required
    namespace: null,
    currentSkill: botContext.getLPEngagementAttribute("currentSkillId"),
    previousSkill: botContext.getLPEngagementAttribute("previousSkillId"),
    campaignId: botContext.getLPEngagementAttribute("campaignId"),
    engagementId: botContext.getLPEngagementAttribute("engagementId"),
    customerInfo: botContext.getLPCustomerInfo(),
    personalInfo: JSON.stringify(botContext.getLPUserPersonalInfo()),
    channel: botContext.getUserChannel(),
    customerId: cb.returnCustomerInfo(botContext.getLPCustomerInfo()),
  },
  API_SETTINGS: {
    asyncMessagingEnt: region + ".msg.liveperson.net",
    msgHist: region + ".msghist.liveperson.net",
    smt: region + ".msg.liveperson.net",
    leDataReporting: region + ".data.liveperson.net",
    askMaven: regionCode + ".askmaven.liveperson.net",
    agentTransfer: region + ".bc-bot.liveperson.net",
    acr: regionCode + ".acr.liveperson.net",
    MSGINT_AUTOCLOSE: true,
    MSGINT_HOURS_SINCE_AUTOCLOSE: 24,
    MSGINT_ROUTE_PREVIOUS_AGENT: false,
  },
  CONVERSATION_ATTRIBUTES: {
    lpAttributes: ["currentSkillId", "previousSkillId", "campaignId", "rtSessionId", "sharkSessionId", "sharkVisitorId", "BearerToken", "chatSessionKey", "agentSessionId", "engagementId"],
    accountId: botContext.getLPAccountId(),
    conversationId: botContext.getConversationId(),
    userId: botContext.getUserPlatformId(),
    consumerParticipantId: botContext.getUserPlatformId(),
    channel: botContext.getUserChannel(),
    customerId: cb.returnCustomerInfo(botContext.getLPCustomerInfo()),
    customerInfo: botContext.getLPCustomerInfo(),
    personalInfo: JSON.stringify(botContext.getLPUserPersonalInfo()),
  }
};

function __initConversation() {
  // converts settings object to botContext variables
  var s = {};
  for (var a in Object.keys(SETTINGS)) {
    var k = Object.keys(SETTINGS)[a]; var v = SETTINGS[Object.keys(SETTINGS)[a]];
    if (!Array.isArray(v) && "object" === typeof v) {
      for (var b in Object.keys(v)) {
        var k1 = Object.keys(v)[b]; var v1 = v[k1]; s[k1] = v1; cb.setVar(k1, v1);
        var n = SETTINGS.CONTEXT_SESSION_STORE.namespace;
        if ("CONTEXT_SESSION_STORE" === k && n) { cb.setContextConv(n, k, v); }
        if ("CONVERSATION_ATTRIBUTES" === k) { var atrs = SETTINGS[k].lpAttributes; for (var _i in atrs) { cb.setVar(atrs[_i], botContext.getLPEngagementAttribute(atrs[_i])); }
        }
      }
    }
  }
}
