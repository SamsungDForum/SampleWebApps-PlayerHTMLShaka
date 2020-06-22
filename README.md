# Shaka Player

This application demonstrates the usage of **Shaka Player**.

Using **Shaka Player** user is able to play streams using HTML5 `video` tag. User is also able to play DRM encoded content.

## How to use the application

Use TV remote controller to navigate. 

Using **Next** and **Previous** buttons user can change streamed content. Each movie is of different type: no DRM, ClearKey, Widevine and PlayReady.

There are **Play** / **Pause**, **Stop**, **Fast forward**, **Rewind** and **Full screen** buttons to control playback.


## Supported platforms

2017 and newer


### Prerequisites

To use **Shaka Player**, 

``<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/shaka-player/2.5.4/shaka-player.compiled.js"></script>``

should be loaded in `index.html`.

### File structure

```
PlayerHTMLShaka/ - PlayerHTMLShaka sample app root folder
│
├── assets/ - resources used by this app
│   │
│   ├── JosefinSans-Light.ttf - font used in application
│   └── shaka-player.compiled.js - library containing Shaka player
│
├── css/ - styles used in the application
│   │
│   ├── main.css - styles specific for the application
│   └── style.css - style for application's template
│
├── js/ - scripts used in the application
│   │
│   ├── init.js - script that runs before any other for setup purpose
│   ├── keyhandler.js - module responsible for handling keydown events
│   ├── logger.js - module allowing user to register logger instances
│   ├── main.js - main application script
│   ├── navigation.js - module responsible for handling in-app focus and navigation
│   └── utils.js - module with useful tools used through application
│
├── CHANGELOG.md - changes for each version of application
├── config.xml - application's configuration file
├── icon.png - application's icon
├── index.html - main document
└── README.md - this file
```

## Other resources

*  **Shaka Player github page**  
  https://github.com/google/shaka-player/

*  **Shaka Player hosted demo**  
  http://shaka-player-demo.appspot.com/

* **Shaka Player hosted documentation**  
  https://shaka-player-demo.appspot.com/docs/api/index.html


## Copyright and License

**Copyright 2019 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.


Shaka Player is licensed under Apache License 2.0:  
https://github.com/google/shaka-player/blob/master/LICENSE
