/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__( 1 );
__webpack_require__( 2 );

__webpack_require__( 3 );
__webpack_require__( 4 );


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* 
 * Setting global variables to be shared across scripts.
 * 
 * Axios and encryptWithPubKey have been excluded because
 * of their size and will only be pulled in if needed.
 */ 

/* eslint-disable */
window.url = "http://localhost:8080";

// bling.js
window.$ = document.querySelectorAll.bind( document );
Node.prototype.on = window.on = function( name, fn ) {
  this.addEventListener( name, fn );
};
NodeList.prototype.__proto__ = Array.prototype;
NodeList.prototype.on = NodeList.prototype.addEventListener = function( name, fn ) {
  this.forEach( ( elem, i ) => {
    elem.on( name, fn );
  } );
};

window.checkResponse = ( res, errorRedirect, successRedirect = null ) => {
  if ( res.error ) {
    window.location.replace( `${url}/${errorRedirect}` );
  } else if ( res.success ) {
    if ( successRedirect ) { window.location.replace( `${url}/${successRedirect}` ); }
  } else if ( res.info ) {
    window.location.reload();
  } else if ( res.state ) {
    window.location.replace( url + res.state );
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals $ */
/* eslint-disable no-alert, no-use-before-define */

/*
 * Copy of app.js for providing a working demo of a card at /help.
 * Only axios requests and the addNewCard button have been removed.
 */

/* Visual DOM Selection Tree - always applies to the one above
 *>div.item      // > signifies entry point item
 *  span.class
 *<   p.2ndChild // < signifies out point item
 */

function setHeight( card, side ) {
  const inner = card.getElementsByClassName( side )[0];
  /*
   *>div.card
   *< div.inner
   */
  const items = inner.getElementsByClassName( "item" ).length;

  try {
    card.classList.remove( `-span${card.className.match( /-span(\d+)/ )[1]}` );
  } catch ( err ) {} // eslint-disable-line no-empty

  card.classList.add( `-span${items}` );
  card.style.height = `${( items + 2 ) * 22}px`;
}

const createNew = {
  item( parent, side, setListener, options = false ) {
    if ( options && options.last ) { // remove empty item to be added to the end later on
      options.last.parentNode.remove();
    }

    const newItem = parent.appendChild( document.createElement( "li" ) );

    const span = newItem.appendChild( document.createElement( "span" ) );
    span.className = "bullet";
    span.innerHTML = "&#9679;";

    const input = newItem.appendChild( document.createElement( "input" ) );
    input.className = "item";
    input.type = "text";
    input.value = options ? options.value : "";

    const svg = newItem.appendChild( document.createElementNS( "http://www.w3.org/2000/svg", "svg" ) );
    svg.setAttribute( "class", "switch" );
    svg.setAttribute( "viewBox", "0 0 477.175 477.175" );
    svg.setAttribute( "style", "enable-background:new 0 0 477.175 477.175;" );
    const g = svg.appendChild( document.createElementNS( "http://www.w3.org/2000/svg", "g" ) );
    const path = g.appendChild( document.createElementNS( "http://www.w3.org/2000/svg", "path" ) );
    path.setAttribute( "fill", "#f5f7fa" );
    path.setAttribute( "d", side === "front" ? "M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " : "M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" );

    setListener.item( input );
    setListener.bullet( span );
    setListener.itemSwitch( svg );

    if ( options && options.last ) { // move previously removed empty item to last position
      createNew.item( parent, side, setListener );
    }
  },
  async card() {
    const card = $( "#inner" )[0].appendChild( document.createElement( "div" ) );
    card.classList.add( "card" );
    card.innerHTML = `
      <div class="front inner">
        <input class="title" type="text" placeholder="Add title">
        <ul></ul>
      </div>
      <div class="back inner">
        <p class="future">Future</p>
        <div class="titleContainer">
          <div class="removeWrapper">
            <div class="remove">&#9679</div>
          </div>        
          <input class="title" type="text" placeholder="Add title">
        </div>
        <ul></ul>
      </div>
    `;

    const ul = card.getElementsByTagName( "UL" );
    createNew.item( ul[0], "front", setListener );
    createNew.item( ul[1], "back", setListener );

    for ( const title of card.children ) {
      setListener.title( title.getElementsByClassName( "title" )[0] );
      /*
      *>div.inner(.front/.back)
      *  input.title
      */
    }

    flipCard( card );
    setHeight( card, "front" );
    setListener.remove( card.getElementsByClassName( "remove" )[0] );
  },
};

const setListener = {
  item( item ) {
    let originalItem = item.value;

    item.addEventListener( "keydown", async () => {
      if ( event.which === 13 ) {
        const innerCard = item.parentNode.parentNode.parentNode;
        /*
         *<div.inner
         *  ul
         *    li
         *>     input.item
         */
        const side = innerCard.className.match( /back/ ) ? "back" : "front";
        const ul = innerCard.getElementsByTagName( "UL" )[0];
        /*
         *>div.inner(.front/.back)
         *< ul
         */
        const title = innerCard.getElementsByClassName( "title" )[0].value;
        /*
         *>div.inner(.front/.back)
         *< input.title
         */
        const lastItem = ul.children[ul.children.length - 1].children[1];
        /*
         *>ul
         *  li
         *< li [-1]
         */

        if ( lastItem === item ) {
          createNew.item( ul, side, setListener );
          setHeight( innerCard.parentNode, side );
        }

        originalItem = item.value;
	 		}
    } );
  },
  title( title ) {
    let originalTitle = title.value;

    title.addEventListener( "keydown", async () => {
      if ( event.which === 13 ) {
        if ( title.value.length >= 20 ) {
          alert( `The title "${title.value}" will probably be cut off as its too long.
							${title.value.length}` );
        }

        const cards = title.parentNode.parentNode.getElementsByClassName( "inner" );
        /*
         *<div.inner.front
         *<div.inner.back
         *> input.title
         */
        const side = title.parentNode.parentNode.className.match( /inner/ ) ? "back" : "front";
        const otherSide = side === "front" ?
          title.parentNode.parentNode.getElementsByClassName( "back" )[0].getElementsByClassName( "title" )[0] :
          title.parentNode.parentNode.parentNode.getElementsByClassName( "front" )[0].getElementsByClassName( "title" )[0];

        otherSide.value = title.value;

        originalTitle = title.value;
      }
    } );
  },
  bullet( bullet ) {
    async function removeItem() {
      const item = bullet.parentNode.getElementsByClassName( "item" )[0].value;
      /*
       * li
       *> span.bullet
       *< input.item
       */
      const side = bullet.parentNode.parentNode.parentNode.className.match( /back/ ) ? "back" : "front";
      /*
       *<div.inner(.front/.back)
       *  ul
       *    li
       *>     span.bullet
       */
      const title = side === "back" ?
        bullet.parentNode.parentNode.parentNode.getElementsByClassName( "title" )[0].value :
        bullet.parentNode.parentNode.parentNode.getElementsByClassName( "title" )[0].value;
      /*
       * div.inner
       *< input.title
       *  ul
       *    li
       *>     span.bullet
       */
      const card = bullet.parentNode.parentNode.parentNode.parentNode;
      /*
       *<div.card
       *  ...
       *>   span.bullet 
       */
      bullet.parentNode.remove();
      setHeight( card, side );
    }

    bullet.addEventListener( "mouseenter", () => {
      bullet.style = "color: #333;";

      bullet.addEventListener( "click", removeItem );
    } );
    bullet.addEventListener( "mouseleave", () => {
      bullet.style = "color: #F5F7FA";

      bullet.removeEventListener( "click", removeItem );
    } );
  },
  itemSwitch( switchEl, toBack = false ) {
    async function switchHandler() {
      const item = switchEl.parentNode.getElementsByClassName( "item" )[0];
      /*
       * li
       *  span.bullet
       *< input.item 
       *> svg.switch 
       */
      const sideEl = switchEl.parentNode.parentNode.parentNode;
      /*
       *<div.inner
       *  ul
       *    li
       *>     svg.switch
       */
      const side = sideEl.className.match( /back/ ) ? "back" : "front";
      const otherSide = side === "back" ? "front" : "back";
      const title = sideEl.getElementsByClassName( "title" )[0];
      /*
       *>div.inner
       *  (p.future)
       *< input.title
       */
      const card = switchEl.parentNode.parentNode.parentNode.parentNode;
      /*
       *<div.card
       *  div.inner
       *    ul
       *      li
       *>       svg.switch
       */
      const otherCard = card.getElementsByClassName( otherSide )[0];
      const ul = otherCard.getElementsByTagName( "UL" )[0].children;
      const lastItem = ul[ul.length - 1].getElementsByClassName( "item" )[0];
      /*
       *>div.inner
       *  ul
       *    li
       *<     input.item
       */

      const options = { value: item.value };

      if ( lastItem.value === "" ) {
        options.last = lastItem;
      }

      createNew.item( otherCard.getElementsByTagName( "UL" )[0], otherCard, setListener, options );

      item.parentNode.remove();
    }

    switchEl.addEventListener( "mouseenter", () => {
      switchEl.addEventListener( "click", switchHandler );
    } );
    switchEl.addEventListener( "mouseleave", () => {
      switchEl.removeEventListener( "click", switchHandler );
    } );
  },
  remove( remove ) {
    remove.addEventListener( "click", async () => {
      if ( window.confirm( "Do you want to remove the card?" ) ) {
        const card = remove.parentNode.parentNode.parentNode.parentNode;
        /*
         *<div.card
         *    ...
         *>        div.remove
         */
        const title = card.getElementsByClassName( "title" )[0].value;

        card.remove();
      }
    } );
  },
};

function flipCard( card ) {
  let side = "front";

  card.addEventListener( "dblclick", ( event ) => {
    const tag = event.target.tagName;
    const permitted = [ "DIV", "P" ];

    if ( ~permitted.indexOf( tag ) ) {
      const inner = card.getElementsByClassName( side === "back" ? "front" : "back" )[0];
      const items = inner.getElementsByClassName( "item" ).length;
      const style = card.style;

      if ( side === "front" ) {
        style.transform = "rotateY( 180deg )";
        side = "back";
        setHeight( card, side );
      } else {
        style.transform = "rotateY( 0deg )";
        side = "front";
        setHeight( card, side );
      }
    }
  } );
}

( function setEventListeners() {
  const items = $( ".item" );
  const titles = $( ".title" );
  const bullets = $( ".bullet" );
  const switchElems = $( ".switch" );
  const removeElems = $( ".remove" );
  const cards = $( ".card" );

  for ( const item of items ) {
	  setListener.item( item );
  }
  for ( const title of titles ) {
	  setListener.title( title );
  }
  for ( const bullet of bullets ) {
    setListener.bullet( bullet );
  }
  for ( const switchEl of switchElems ) {
    setListener.itemSwitch( switchEl );
  }
  for ( const remove of removeElems ) {
    setListener.remove( remove );
  }
  for ( const card of cards ) {
    const classes = card.className;

    flipCard( card );
    setHeight( card, "front" );
  }
} )();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);