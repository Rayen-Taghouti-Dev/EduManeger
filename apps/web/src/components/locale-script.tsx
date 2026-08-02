export function LocaleScript() {
  const code = `(function(){try{var k='edumanager-locale';var raw=localStorage.getItem(k);var locale='fr';if(raw){var parsed=JSON.parse(raw);if(parsed&&parsed.state&&(parsed.state.locale==='en'||parsed.state.locale==='fr')){locale=parsed.state.locale;}}else{var langs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];for(var i=0;i<langs.length;i++){var c=String(langs[i]||'').toLowerCase().split('-')[0];if(c==='en'){locale='en';break;}if(c==='fr'){locale='fr';break;}}localStorage.setItem(k,JSON.stringify({state:{locale:locale},version:0}));}document.documentElement.lang=locale;}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
