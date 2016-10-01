(function(global) {
  var map = {
    app: ".",
    '@angular': '../node_modules/@angular',
    'rxjs': '../node_modules/rxjs',
    '@angular2-material': '../node_modules/@angular2-material'
  };
  var packages = {
    'app': { 'main' : './main.ts', defaultExtension: 'ts' },
    '@angular/common': { main: 'bundles/common.umd.js', defaultExtension: 'js' },
    '@angular/compiler': { main: 'bundles/compiler.umd.js', defaultExtension: 'js' },
    '@angular/core': { main: 'bundles/core.umd.js', defaultExtension: 'js' },
    '@angular/forms': { main: 'bundles/forms.umd.js', defaultExtension: 'js' },
    '@angular/http': { main: 'bundles/http.umd.js', defaultExtension: 'js' },
    '@angular/platform-browser': { main: 'bundles/platform-browser.umd.js', defaultExtension: 'js' },
    '@angular/platform-browser-dynamic': { main: 'bundles/platform-browser-dynamic.umd.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    '@angular2-material/core': {main: 'core.js'},
    '@angular2-material/input': {main: 'input.js'}
  };

  map['ng2-auto-complete'] = '../dist';
  packages['ng2-auto-complete'] =  {main: 'ng2-auto-complete.umd.js', defaultExtension: 'js'};
  map['ng2-auto-complete'] = '../src';
  packages['ng2-auto-complete'] =  {main: 'index.ts', defaultExtension: 'ts'};


  System.config({
    transpiler: 'typescript', //use typescript for compilation
    typescriptOptions: {      //typescript compiler options
      emitDecoratorMetadata: true
    },
    map: map,
    packages: packages
  });
})(this);

