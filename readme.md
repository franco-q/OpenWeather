# Developer Applicant Interview Test

### Built With
* [react-native-cli](https://github.com/react-native-community/cli)
* [redux](https://redux.js.org/)
* [redux-saga](https://redux-saga.js.org/)
* [redux-persist](https://github.com/rt2zz/redux-persist)
* [react native papper](https://callstack.github.io/react-native-paper/)
* [styled-components](https://styled-components.com/)
* [react-navigation](https://reactnavigation.org/)
### Test
* [redux-saga-tester](https://github.com/wix/redux-saga-tester)
### Services
* [openweathermap](https://openweathermap.org/api)
* [ip-api](http://ip-api.com/json)


### Estructura
    .
    ├── ...
    ├── __test__
    │   ├── __snapshots__
    │   ├── App-test.js         # Screen tests
    │   └── Store-test.js       # Store/sagas tests
    ├── src
    │   ├── components
    │   │   └── ...
    │   ├── redux
    │   │   ├── actions.js      # Action creators
    │   │   ├── index.js        # Provider/Store
    │   │   ├── reducers.js     # combineReducers
    │   │   └── sagas.js        # Sagas Watchers 
    │   ├── screens
    │   │   └── ...
    │   ├── api.js              # Api services
    │   └── constans.js
    ├── App.js
    └── ...

