# Beer Debt Mk.2

For the [Normalizing XPages Development](http://iamiconus.org/iamiconus/iconus2016.nsf/session.xsp?action=openDocument&documentId=10DC98278072638C86257F77004D2BE7) ICON US 2016 session with [Shean McManus](https://twitter.com/sheanpmcmanus) and [Eric McCormick](https://twitter.com/edm00se).

## To Download and Use This Application

Required:

* node and npm, install from [nodejs.org](https://nodejs.org/) (required for development tooling)
* Domino Designer for development of server-side assets and local web preview
* (optional) a Domino server for interaction with the Domino Data Services (DDS)
  * to use DDS on the server, it must be [enabled and set up correctly](https://www-10.lotus.com/ldd/ddwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Domino+Access+Services+9.0.1#action=openDocument&content=catcontent&ct=api)
* using without a Domino server with DDS enabled will still work with local web preview, you will/may notice a failing over of an initial request against the DDS before resolving a data connection via an _xe:resetService_ located within the `api.xsp` XPage

To Use:

* Clone the repository		`git clone https://edm00se@bitbucket.org/edm00se/beer-debt-mk2.git`
* Install dependencies from npm	`npm install` + `bower install`
* Perform the build				`grunt`
* Import the On Disk Project (ODP) in Designer’s Package Explorer (or Navigator)
* Right-click the ODP and Associate with New/Existing NSF
* Done!
