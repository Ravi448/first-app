<p>This is a basic ionic app using basic ionic components to create the template</p>

<b>To create a new project open the terminal and type:</b>
    
<code>$ npm install -g ionic cordova</code>
    
After installing cordova create your very first ionic app project:

<code>$ ionic start first-app</code>
<p><strong>*Replace first app with the name of your project. First-app in my case.</strong></p>

</b>To start the project</b>
$ cd first-app
$ionic serve
  
<b>To add a platform: </b>
<code>$ ionic cordova platform add *platform-name*</code>
<p>*Replace platform name with either android or ios.</p>

For any reference of ionc please follow the official 
 <a href="https://ionicframework.com/docs/" target="_blank"> Ionic documents</a>
<p>There are many plugin are used in this project. To add a plugin to your project please follow the command :</p>

<code>$ ionic cordova plugin add cordova-plugin-*plugin_name*</code>
<p>*Replace plugin name with plugin name which you want to add.</p>
<p>E.g</p> 
<code>$ ionic cordova plugin add cordova-plugin-geolocation</code><br/>
<code>$ npm install --save @ionic-native/geolocation</code>

<p>To remove a plugin:</p><br/>
<code>$ ionic cordova plugin rm *plugin_name*</code><br/>
<p>E.g</p>
<code>$ ionic cordova plugin rm cordova-plugin-geolocation</code>

