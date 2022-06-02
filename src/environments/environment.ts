// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // firebase: {
  //   projectId: 'clinica-18fcc',
  //   appId: '1:622497511740:web:141dd068eb50ff09198639',
  //   storageBucket: 'clinica-18fcc.appspot.com',
  //   locationId: 'us-central',
  //   apiKey: 'AIzaSyCmLRbL8ifumRflNpvw6Lgqin49uItHh9E',
  //   authDomain: 'clinica-18fcc.firebaseapp.com',
  //   messagingSenderId: '622497511740',
  // },
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCmLRbL8ifumRflNpvw6Lgqin49uItHh9E",
    authDomain: "clinica-18fcc.firebaseapp.com",
    projectId: "clinica-18fcc",
    storageBucket: "clinica-18fcc.appspot.com",
    messagingSenderId: "622497511740",
    appId: "1:622497511740:web:141dd068eb50ff09198639"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
