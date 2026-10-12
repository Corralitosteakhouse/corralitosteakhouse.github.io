// Se inyecta en <head> desde el layout del servidor; por eso no vive en lang.ts ("use client").
export const STORAGE_KEY = "lang";

export const LANG_BOOT_SCRIPT = `(function(){var d=document.documentElement,l;try{l=localStorage.getItem('${STORAGE_KEY}')}catch(e){}if(l!=='es'&&l!=='en'){var n=(navigator.languages&&navigator.languages[0])||navigator.language||'es';l=/^en/i.test(n)?'en':'es'}d.dataset.lang=l;d.lang=l})()`;
