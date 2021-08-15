---
title: We built an iMessage Extension for our React Native app
oneliner: Now you can too.
date: '2019-04-14'
---

This post was redacted by the lovely marketing people of Lisk, and originally published in [medium](https://medium.com/lisk-blog/we-built-an-imessage-extension-for-our-react-native-based-mobile-app-now-you-can-too-495beb8e6047), [dev.to](https://dev.to/altay/we-built-an-imessage-extension-for-our-react-native-based-mobile-app-now-you-can-too-2387) and [dzone](https://dzone.com/posts/imessenger).

There is [a Github repository](https://github.com/altaywtf/react-native-imessage-extension) for the code screenshots you will see below.

---

When we set out to build an iMessage extension for [Lisk Mobile](https://lisk.io/hub) using React Native, we immediately hit an exciting challenge. As it turns out, when it comes to third-party applications, Apple likes developers to play by its own rules. If a company wants to benefit new features of the tech giant’s operational systems and rich user base, it needs to be built using Apple’s tools and programming language. iPhone’s iMessage is definitely worth this hassle. It has proven to be a big hit since its release in 2016. Within the first six months, iMessage has generated [thousands of innovative](https://sensortower.com/posts/imessage-app-store-six-months-later) in-messenger extensions including those created by [Airbnb](https://medium.com/airbnb-engineering/introducing-the-airbnb-imessage-app-806f48d303a8#.jkydkawtx) and [Dropbox](https://www.cnet.com/how-to/share-dropbox-files-via-imessage-and-sign-pdfs-on-your-iphone/). Late in 2018, Mark Zuckerberg admitted this feature is one of Facebook’s ['biggest competitor by far'](https://www.macrumors.com/2018/10/31/mark-zuckerberg-says-imessage/). Since the release of Lisk Mobile during Lisk’s Berlin meetup in October 2018, our team has been busy implementing features such as Face ID Authentication, as well as developing blockchain-specific solutions. Identifying the opportunity to extend the iMessage option for our users, we got to work on our own integration.

The iMessage extension was included in Lisk Mobile 0.10.0, which was released in February 2019. Our users can now request and send LSK tokens straight from the iOS-based messenger without opening our app. However, the journey to implement this feature wasn’t straightforward — **Lisk Mobile is written in JavaScript using React Native**, while iMessage requires development in native iOS. During our research, we have found there is just a handful of resources available to help with using React Native to build iOS extensions available out there. There was no clear way to proceed. After thorough deliberation, we have decided to try a different approach by building our own bridge implementation. We found it a very educational and motivational journey for our team to develop the feature in this way. We will show you how by breaking the solution down into native and React Native parts and describing how to bind these separated parts together.

![](/images/posts/react-native-imessage/0.gif)

### The problem: there was no up-to-date documentation to create an iMessage extension using React Native.

Before we dive deep into the solution, let’s first set out the actual challenge. We used React Native in order to stay aligned with the programming language of the entire Lisk platform. We have been developing our mobile blockchain wallet since April 2018. This means we already have visual components and business logic enhanced by utility functions for cryptographic operations and communicating with the API of [Lisk Core](https://lisk.io/documentation/lisk-core), which is a platform containing all information necessary to interact with our blockchain, including security, consensus algorithm and much more. The communication is provided by [Lisk Elements](https://lisk.io/documentation/lisk-elements), _our modular JavaScript library_.

The first option was to look for existing React Native component and educational material. Unfortunately, we could not find official documentation or up-to-date resources due to the fast pace of change in both React Native and native iOS development.

The second option was to try native iOS development within the Lisk Mobile codebase. The benefit of this approach was [example projects](https://developer.apple.com/documentation/messages/icecreambuilder_building_an_imessage_extension) and [conference talks](https://developer.apple.com/videos/play/wwdc2016/224) provided by Apple. However, introducing a considerable amount of Swift or Objective-C into the codebase was not desirable. Such a move would cause too much code duplication due to us having to rewrite most of our existing business logic and UI components.

### The solution: we wrote our own bridge implementation and documented the process.

After careful evaluation, we decided to take an alternative route: writing our own bridge implementation. In the rest of this article, we will explain how we did it. If you want to jump straight into code, we’ve also created this handy [demo project on GitHub](https://github.com/LightcurveHQ/react-native-imessage-extension)

## Create a React Native Project

First things first! Let’s start by creating a brand new React Native application. Since we are going to use native features, it would be better to [follow the related part of the official documentation](https://facebook.github.io/react-native/docs/getting-started#the-react-native-cli) that suggests using the [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html#the-react-native-cli).

If you don’t have it installed, you can do it by running

```
$ npm install -g react-native-cli
```

Then let’s create a new project called, of course, AwesomeProject!

```
$ react-native init AwesomeProject
```

## Add an iMessage Extension Target

The next step is to add a target for our Xcode project that covers the iMessage extension.

![](/images/posts/react-native-imessage/1.png)
_Open the iOS project with Xcode_

![](/images/posts/react-native-imessage/2.png)
_Add new target to the project by navigating through \*\*\_File -> New -> Target _\*\*menu\_

![](/images/posts/react-native-imessage/3.png)
_Choose iMessage Extension_

![](/images/posts/react-native-imessage/4.png)
_Give it a creative name_

## Create an iMessage Root on the React Native Side

Now that we have our Xcode target for the iMessage extension, it’s time to create a blueprint for our root component on the React Native side.

![](/images/posts/react-native-imessage/5.png)
_The entry point of the iMessage Extension on the React Native Side_

We also need to register that component in order to access it easily in the following steps. Let’s create another file in the project root [similar to the one React Native creates for the main application](https://github.com/aydieneue/react-native-imessage-extension/blob/master/index.js).

![](/images/posts/react-native-imessage/6.png)
_App Registry Part of the iMessage Extension on the React Native Side_

## Connecting iMessage Component with the Native Side

At this step, we will update our iMessage target to have the capability of rendering a React Native application within a native one. In order to achieve this, we have some manual work to do. In a regular React Native application, this step is actually handled automatically by the boilerplate that we have from _react-native-cli_, this is the case for Lisk. If you feel something is missing, you can compare the configuration and structure of your iMessage extension target with the main application.

![](/images/posts/react-native-imessage/7.png)
_Build Phase configuration of Main Application_

![](/images/posts/react-native-imessage/8.png)
_Build Phase configuration of iMessage Extension Target_

### Linking Libraries

We will start the configuration by linking the React related libraries. Since it’s meant to be a simple application, libraries we add are just the core ones we need at the moment. **[If you are using some third party modules on your main application](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) and also need them in your iMessage Extension, don’t forget to link them here as well!**

![](/images/posts/react-native-imessage/9.png)
_Build Phase / Link Binary With Libraries configuration of iMessage Extension Target_

![](/images/posts/react-native-imessage/10.png)
_Build Phase / Link Binary With Libraries configuration of iMessage Extension Target_

### Creating a Bridge Header file for Swift

Now that we have made those libraries available for our native part, it’s time to create a Bridging-Header file make them recognizable for the Swift compiler. The reason behind this is the libraries we have linked on the previous step are written with Objective-C. This has been a common approach since [Apple introduced Swift as the new language of the iOS platform](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift) and you can obtain deeper knowledge about it [here](https://www.hackingwithswift.com/example-code/language/how-to-create-an-objective-c-bridging-header-to-use-code-in-swift).

We start with creating a new header file called **Bridging-Header.h** inside **AwesomeProjectMessageExtension** folder.

![](/images/posts/react-native-imessage/11.png)
_Xcode -> File -> New_

![](/images/posts/react-native-imessage/12.png)
_Freshly Configured Bridging Header_

Next, by navigating to **Build Settings / Swift Compiler — General** section of the Xcode configuration, choose that file as the Objective-C bridging header.

![](/images/posts/react-native-imessage/13.png)
_Build Settings / Swift Compiler — General section of the Xcode configuration_

### Updating Project and Build Configuration

The first one is updating **Info.plist**, a configuration file placed in every iOS project. In order to make our React Native bundle accessible in development mode, we need to enable loading content from localhost.

![](/images/posts/react-native-imessage/14.png)
Updating Info.plist to make sure we are able to load bundle from localhost

The next step is to add a **Build Phase** for iMessage extensions target in order to make sure we trigger the build script of React Native when we are running the extension.

![](/images/posts/react-native-imessage/15.png)
Add a new (Run Script) step to the Build Phases of iMessage Extension Target

The last step for this section is to update the schemes of the project. Each target in the application has a scheme that defines the configuration for actions available within the context of Xcode like _Build, Run and Analyze._

We update the schemes of both the main application and iMessage extension to make sure we have all the required content while preparing the app for the release.

![](/images/posts/react-native-imessage/16.png)
_Navigate to the Edit Scheme menu of Xcode_

![](/images/posts/react-native-imessage/17.png)
_Add message extension to the build targets of the main app_

![](/images/posts/react-native-imessage/18.png)
_Add React to the build targets of the iMessage Extension_

### RCTBridge and the Initial Render

Now that we are pretty much done with the configuration, it’s time to start building our structure to render the application we have registered in the **Create iMessage Root on React Native Side** section.

First, let’s take a quick look at the structure of the iMessage extension. Every iMessage Extension [has an entry point called MSMessagesAppViewController](https://developer.apple.com/documentation/messages/msmessagesappviewcontroller) which extends the [UIViewController class from UIKit](https://developer.apple.com/documentation/uikit/uiviewcontroller) and contains lifecycle methods and properties of an iMessage extension instance. This is similar to the [AppDelegate in our main iOS application](https://developer.apple.com/documentation/uikit/uiapplicationdelegate) but doesn’t have all the capabilities of it.

What we focus on at this point is to find a suitable way to create our _RCTRootView_ (an UIView subclass exposed by React Native that can be embedded in any part of a native application) and load our iMessage related code on the React Native side as the bundle.

![](/images/posts/react-native-imessage/19.png)
_Initial structure of MessagesViewController.swift_

First, we start with modifying our _MessagesViewController.swift_ to create an _RCTBridge_, _RCTRootView_ and render our registered _AwesomeProjectMessageExtension_ module within that view.

![](/images/posts/react-native-imessage/20.png)
_The initial state of the presentReactNativeView method_

Since we want to clear out everything in the screen before and after opening the iMessage extension, we also create a little helper module that does the trick for us!

![](/images/posts/react-native-imessage/21.png)
_We have added removeAllChildViewControllers utility to clear view hierarchy when needed: Before presenting React Native view and cleaning out the application_

![](/images/posts/react-native-imessage/22.png)
_Initial run!_

## Creating Bridge Modules

In this section, we are going to create our helpers and modules on the Swift side in order to expose the required methods and events to communicate with the React Native side.

### Creating a Mapper for Swift — JS Communication

Since we are going to send data from Swift to the React Native, it would be nice to create a mapper utility for formatting that data properly.

![](/images/posts/react-native-imessage/23.png)
_Mapper utility_

### Creating a Manager for MessagesViewController

Now we are going to create a module named _MessagesManager_ that has a connection with our main _MessagesViewController_ and will help us to interact with from the React Native side.

Based on the guidance from the [official documentation](https://developer.apple.com/documentation/messages/msmessagesappviewcontroller) we will need access to [activeConversion](https://developer.apple.com/documentation/messages/msmessagesappviewcontroller/1649188-activeconversation) object and [presentation](https://developer.apple.com/documentation/messages/msmessagesappviewcontroller/1649182-presentationstyle) style as well as the methods will allow us to modify them.

![](/images/posts/react-native-imessage/24.png)
_Initial structure of MessagesManager.swift_

Since we are creating that custom class with Swift, we also need to provide the interface file to make sure it’s recognized as a native module by React Native.

![](/images/posts/react-native-imessage/25.png)
_MessagesManager.m file that contains interface declaration for React Native_

### Creating an EventEmitter for MessagesViewController

In addition to the helper methods we have provided in the previous section, now we will create another class [by following the EventEmitter guide from official React Native documentation](https://facebook.github.io/react-native/docs/native-modules-ios#sending-events-to-javascript).

_MessagesEventEmitter_ will help us to keep the JavaScript side informed when there’s a change in the iMessage context. Those changes may be applied as a result of an interaction made by the user (like updating presentation style, selecting a message in a conversation) or receiving a new message from one of the remote participants.

First of all, we update our _MessagesViewController_ to define a [protocol](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html) that can be easily implemented by _MessagesEventEmitter_ to reduce the effort we need to make (and encourage separation of concerns) in order to follow an event-based design pattern.

![](/images/posts/react-native-imessage/26.png)
_Updates we have made on MessagesViewController file in order to use protocol pattern_

![](/images/posts/react-native-imessage/27.png)
_Initial structure of MessagesEventEmitter_

![](/images/posts/react-native-imessage/28.png)
_MessagesEventEmitter.m file that contains interface declaration for React Native_

### Custom Module Initializer

If you create a native module with React Native by following the [basic flow](https://facebook.github.io/react-native/docs/native-modules-ios#native-module-setup), you’ll end up with a pre-instantiated object that is created during the initialization step of the bridge. If it was a regular iOS application, we would have a chance to communicate with the root view controller by using [UIApplication’s shared property](https://developer.apple.com/documentation/uikit/uiapplication/1622975-shared) but that’s not what we were exactly looking for.

Considering that our Native Module needs to be stateful to communicate with the _MessagesAppViewController_ instance, we ended up creating a custom module initializer[ by following an approach](https://stackoverflow.com/a/47468905/4965161) derived from the[ the dependency injection guide on React Native documentation](https://facebook.github.io/react-native/docs/native-modules-ios#dependency-injection).

![](/images/posts/react-native-imessage/29.png)
_Custom ModuleInitializer that allows us to use dependency injection pattern at the initialization step of MessagesManager and MessagesEventEmitter modules_

Then we will update the _presentReactNative_ method of _MessagesViewController_ to use that custom module initializer.

![](/images/posts/react-native-imessage/30.png)
_Updating related parts of MessagesViewController to use custom module initializer_

## Consuming Native Modules on React Native

Now that we have covered pretty much all the things we need from our native modules, we can start playing with them on the React Native side.

### Updating Presentation Style

![](/images/posts/react-native-imessage/31.png)
_Making use of getPresentationStyle and updatePresentationStyle methods on the React Native side_

![](/images/posts/react-native-imessage/32.gif)
_onTogglePresentationStyle Method in Action_

So far so good huh? But we forgot something. Let’s look at the recording below and try to catch what’s missing.

![](/images/posts/react-native-imessage/33.gif)
🤔 🤔 🤔

Since we are not listening to the events related to the presentation style changes triggered by the native UI, we end up in a loop with the sheet continually opening, we don’t have the correct value of _presentationStyle_ right after it’s been updated. In order to resolve this, we are going to use the _MessagesEventEmitter_ module.

This will allow the sheet to receive updates on the state from both the native Swift environment (for when users manually close the sheet) and from within our React Native app.

![](/images/posts/react-native-imessage/34.png)
_Using MessagesEventEmitter for listening changes on presentationStyle_

Now the app responds to both triggers from the codebase, and users manually close or open the sheet.

### Composing a Message

Now we are so close to our main goal, composing an iMessage from the React Native side!

Let’s start with initializing our blueprint to create the data of a message object that we can through our MessagesManager module.

![](/images/posts/react-native-imessage/35.png)
_Using composeMessage method of MessagesManager to create a test message_

![](/images/posts/react-native-imessage/36.png)
_Assets section of the Xcode, where we add images in order to use in the Message templates_

![](/images/posts/react-native-imessage/37.gif)
_Outcome of the test message_

### Using the URL field to share data

Now that we are able to compose and send a message, we create a very simple example to demonstrate the usage of url field.

What we are going to do is to put a timestamp and the identifier of the sender to the URL field and present it on the screen. We will also make use of the _getActiveConversation_ method exposed by _MessagesManager_ as well as the _didReceiveMessage_ and _didSelectMessage_ events from the _MessagesEvents_ module.

![](/images/posts/react-native-imessage/38.png)
_Updating App.iMessage.js to make use of URL field_

Now if we send a message as Kate to John (or vica-versa) we can observe the change in the timestamps and the sender IDs.

![](/images/posts/react-native-imessage/39.gif)
_Sending a message as Kate to John. Kate’s sender ID is CD8FBE2C-D25F-4683–85f5–669C6E42DDF8_

![](/images/posts/react-native-imessage/40.gif)
_Opening and replying Kate’s message as John. John’s sender ID is 721FA6A5-CC6F-42FD-A840–4B846E634E62_

If you want to share more data and handle complex logic, our recommendation is to use a third-party library for simplifying the URL construction and parsing logic. For a better example, you can check out [the iMessage part of our open source Lisk Mobile application](https://github.com/LiskHQ/lisk-mobile/tree/development/src/components/imessage).

## Extras

### Unsettled Problems

### Mysterious Simulator Crash

When the application is run from the Xcode, there’s a crash that happens right after we go back from the message detail screen to the list screen. We haven’t found the crux of this problem but we were able to reproduce it also with the example project from Apple’s official documentation.

![](/images/posts/react-native-imessage/42.gif)
_Mysterious Simulator Crash_ 🤔

Our workaround for the crash is to stop the Xcode right after we get everything running. It will make more sense if you take a look at the **Remote Debugger and Reload Menu for Development** section below.

### Less Mysterious iOS 10 Crash

Unfortunately, we couldn’t make our iMessage extension run successfully within a simulator that has iOS 10. The interface of the iMessage extensions has been updated when there’s a migration from iOS 10 to 11. It might be related with that update but there was not enough information for us to track the problem so we ended up choosing iOS 11 as our deployment target of the iMessage extension.

### Not sure if bug or feature: Simulator Refreshes Participant IDs

While running the iMessage extension in the simulator, the participant identifiers coming from the _activeConversation_ object of Kate and John are changed each time you compose a message. Whether it stems from a bug or a feature remains to be seen, but we had to run the application on testing devices in order to make sure our participant identifier logic worked properly.

## Gotchas

### Remote Debugger and Reload Menu for Development

The setup we have made so far forces us to re-run the iMessage extension from the Xcode every time we want to see the latest version of the app after updating the JavaScript part.

Considering the **mysterious simulator crash** we have mentioned in the section above, this whole experience is kind of painful for developers coming from the realm of [the hot reloading with time travel](https://www.youtube.com/watch?v=xsSnOQynTHs). In order to improve the developer experience, we have implemented a little utility by using the [DevSettings module](https://github.com/facebook/react-native/blob/master/React/Modules/RCTDevSettings.mm) provided by React Native.

[https://github.com/LightcurveHQ/react-native-imessage-extension/blob/master/DevMenu.js](https://github.com/LightcurveHQ/react-native-imessage-extension/blob/master/DevMenu.js)

And import it to our _App.iMessage.js_ component as following:

![](/images/posts/react-native-imessage/43.png)
_Usage of DevMenu component within the root iMessage component_

Unfortunately, _DevSettings_ module does not export a method to get the value of **liveReload** and **remoteDebugging** flags so we need to double click the buttons within our **DevMenu** component to make sure we sync their state correctly.

![](/images/posts/react-native-imessage/44.gif)
_DevMenu in action!_

### Deep Link Opener

In our Lisk Mobile application, we also needed a utility for opening the main application and redirecting the user to a specific deep link. We have resolved this issue by enhancing the _MessagesManager_.

After setting up the main application to handle deep links by following [the guide from official React Native documentation](https://facebook.github.io/react-native/docs/linking), next step is to update the _MessagesManager_ to provide a utility for opening deep links.

![](/images/posts/react-native-imessage/45.png)
_We have added openURL method to MessagesManager_

![](/images/posts/react-native-imessage/46.png)
_Also updated interface file of the MessagesManager to contain openURL method_

![](/images/posts/react-native-imessage/47.png)
_Usage of openURL method on React Native side_

![](/images/posts/react-native-imessage/48.gif)
_openURL method in action!_

### Display a Loading View during the Initial Load

The natural behavior of iMessage extensions is to show the application logo uploaded in the assets section during the initial load as shown below.

![](/images/posts/react-native-imessage/49.png)
_Default behavior of launch screen_

In our case, we are also waiting for React Native bundle to be loaded until we see something to interact on the screen. Luckily, _RCTRootView_ has a property named _loadingView_ that allows us to provide a temporary view to be shown while the bundle is loading.

In order to enhance this experience, let’s create a view with the activity indicator and assign it to the _loadingView_ property of _RCTRootView_.

![](/images/posts/react-native-imessage/50.png)
_Xcode -> File -> New -> View_

![](/images/posts/react-native-imessage/51.gif)
_Using storyboard to set the layout of the LoadingView_

![](/images/posts/react-native-imessage/52.png)
_Updating the presentReactNative method of the MessagesViewController to make sure our RCTRootView instance uses LoadingView_

![](/images/posts/react-native-imessage/53.gif)
_End result of this section: LoadingView is presented until the React Native bundle is loaded._

### Controlling the Loading View from the React Native Side

Now that we have our blueprint for displaying that loading view, we can also spend a little effort to make it controllable from the React Native side.

This would be very handy if there’s a case you need to delay the initial render (eg: fetching data from the server) and don’t want to deal with creating another loading view that covers full screen for such a task.

First, the _presentReactNativeView_ method of _MessagesViewController_ needs to be refactored a little bit as following:

![](/images/posts/react-native-imessage/54.png)
_presentReactNative method initializes and presents a LoadingView on top of the RCTRootView, instead of using the RCTRootView.loadingView property._

![](/images/posts/react-native-imessage/55.png)
_In order to control the presence of that loadingView, we have added two methods to the MessagesManager_

![](/images/posts/react-native-imessage/56.png)
_Updated interface file of the MessagesManager to contain methods for controlling the loadingView._

Now it’s time to make use of those freshly added methods in the React Native side. What we are going to do is to fake an asynchronous task in _componentDidMount_ and delay the initial rendering of the content until that task is completed. We will also add an additional button to the sample set to toggle the loading screen again.

![](/images/posts/react-native-imessage/57.png)
_Making use of loadingView related methods on the React Native side_

## Final Thoughts

Working on user-facing applications in an insular software environment such as that of Apple requires innovative solutions. While Apple definitely provides comprehensive documentation aimed at helping developers coding with native iOS, connecting the existing pieces to the native ecosystem is another thing altogether. After deciding to implement iMessage extension for the React Native-based [Lisk](https://twitter.com/LiskHQ) Mobile, we experienced this obstacle first hand. Nonetheless, we found writing a bridge between React Native and the native iOS-based app an exciting and educational experience. We hope this tutorial will save you time in implementing a similar feature to your React Native application as well!
