<div align="center">
    <br/>
    <img alt="DEV" src="https://blog.phonehouse.es/wp-content/uploads/2018/01/giphy-1-1.gif" width="500px">
    <p>I am a GIPHY-powered GIF mobile wallet. Feel free to explore around!</p>
</div>

<br/>


## Dev Usage

Run `npm install` to install dependencies.

Run `ionic serve` for a dev server. The app will automatically reload if you change any of the source files.

## Build for Mobile (First time only)
Run below to build your ionic project:

    ionic build

Run below commands for first only (for creating iOS and Android projects):

    ionic cap build ios 
    ionic cap build android


## Build
Subsequently, just use below command to perform ionic build and copy web assets to Capacitor native platform(s)

    ionic cap copy

In case of making updates to the native portion of the code (such as adding a new plugin), use:

    ionic cap sync



