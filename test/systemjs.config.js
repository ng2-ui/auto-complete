(function(global) {

  var ngVer = '@2.0.0-rc.1'; // lock in the angular package version; do not let it float to current!

  //map tells the System loader where to look for things
  var  map = {
    'app':                        '.',
    '@angular':                   '../node_modules/@angular', // sufficient if we didn't pin the version
    'rxjs':                       '../node_modules/rxjs',
    'typescript':                 '../node_modules/typescript/lib/typescript.js',
    'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js'
  };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { defaultExtension: 'js' },
    'auto-complete':              { main: 'index.ts', defaultExtension: 'ts' }
  };

  // for development
  map['auto-complete'] = '../dist';
  packages['auto-complete'] =  {main: 'index.js', defaultExtension: 'js'};
  map['auto-complete'] = '../src';
  packages['auto-complete'] =  {main: 'index.ts', defaultExtension: 'ts'};

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade'
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    // map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
    map['@angular/'+pkgName] = '../node_modules/@angular/' + pkgName;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    transpiler: 'typescript', //use typescript for compilation
    typescriptOptions: {      //typescript compiler options
      emitDecoratorMetadata: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
