This demo showcases an ExtJS MVC application using client-side JavaScript AES encryption and SHA3 hashes.  The demo simulates login and uses the proxy extension to store encrypted data to localStorage. 

[Overview](http://starman69.github.io/Ext.ux.data.Encryption/overview/)

[Live Demo](http://starman69.github.io/Ext.ux.data.Encryption/)

### Ext.ux.data.Encryption
The Encryption class stores a SHA3 hash in a private in-memory var.

### Ext.ux.data.proxy.EncryptedLocalStorage
The EncryptedLocalStorage proxy class has an api we augment in from the Encryption class.