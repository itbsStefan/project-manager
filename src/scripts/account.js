/* global checkResponse encryptWithPubKey $ */
/* eslint-disable no-alert */

const axios = require( "axios" );
const sweetalert = require( "sweetalert" );

const setListener = {
  username: async () => {
    const username = document.getElementsByName( "username" )[0].value;
    let password = document.getElementsByName( "username_confirm" )[0].value;

    password = await encryptWithPubKey( password );

    const response = await axios.post( "api/update-username", {
      newUsername: username, password,
    } );
    checkResponse( response.data, "account", "app" );
  },
  password: async () => {
    let password = document.getElementsByName( "password" )[0].value;
    let passwordRepeat = document.getElementsByName( "password_repeat" )[0].value;
    let passwordConfirm = document.getElementsByName( "password_confirm" )[0].value;

    password = await encryptWithPubKey( password );
    passwordRepeat = await encryptWithPubKey( passwordRepeat );
    passwordConfirm = await encryptWithPubKey( passwordConfirm );

    const response = await axios.post( "api/update-password", {
      password, passwordRepeat, passwordConfirm,
    } );
    checkResponse( response.data, "account", "app" );
  },
  remove: () => {
    sweetalert( {
      title     : "Remove Account",
      text      : "Do you really want to remove your account?",
      icon      : "warning",
      buttons   : [ "Cancel", "Remove" ],
      dangerMode: true,
    } ).then( async ( willDelete ) => {
      if ( willDelete ) {
        let passwordConfirm = document.getElementsByName( "remove_confirm" )[0].value;

        passwordConfirm = await encryptWithPubKey( passwordConfirm );

        const response = await axios.post( "api/remove-account", { passwordConfirm } );
        checkResponse( response.data, "account", "login" );
      }
    } );
  },
  clear: () => {
    sweetalert( {
      title     : "Clear",
      text      : "Do you really want to remove all cards in your account?",
      icon      : "warning",
      buttons   : [ "Cancel", "Clear" ],
      dangerMode: true,
    } ).then( async ( willDelete ) => {
      if ( willDelete ) {
        let passwordConfirm = document.getElementsByName( "clear_confirm" )[0].value;

        passwordConfirm = await encryptWithPubKey( passwordConfirm );

        const response = await axios.post( "api/clear-cards", { passwordConfirm } );
        checkResponse( response.data, "account", "app" );
      }
    } );
  },
};

document.getElementsByName( "username_button" )[0].addEventListener( "click", setListener.username );
document.getElementsByName( "username_confirm" )[0].addEventListener( "keydown", ( event ) => {
  if ( event.which === 13 ) { setListener.username(); }
} );
document.getElementsByName( "password_button" )[0].addEventListener( "click", setListener.password );
document.getElementsByName( "password_confirm" )[0].addEventListener( "keydown", ( event ) => {
  if ( event.which === 13 ) { setListener.password(); }
} );
document.getElementsByName( "remove_button" )[0].addEventListener( "click", setListener.remove );
document.getElementsByName( "remove_confirm" )[0].addEventListener( "keydown", ( event ) => {
  if ( event.which === 13 ) { setListener.remove(); }
} );
document.getElementsByName( "clear_button" )[0].addEventListener( "click", setListener.clear );
document.getElementsByName( "clear_confirm" )[0].addEventListener( "keydown", ( event ) => {
  if ( event.which === 13 ) { setListener.clear(); }
} );

$( ".toogle" ).forEach( ( el ) => {
  el.addEventListener( "click", () => {
    const groupWrapper = el.parentNode.parentNode;
    const inputWrapper = groupWrapper.querySelector( ".input-wrapper" ).style;

    const isHidden = ~Array.from( groupWrapper.classList ).indexOf( "hidden" );

    if ( isHidden ) {
      groupWrapper.classList.remove( "hidden" );
    } else {
      groupWrapper.classList.add( "hidden" );
    }
  } );
} );
