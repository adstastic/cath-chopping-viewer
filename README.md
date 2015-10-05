# cath-chopping-viewer

1. Run **serve** to start a HTTP server on **localhost:8000**
2. Use [this](http://localhost:8000/domchop.html) to see the chopping viewer. 

### Notes
* To see a different pdb file, replace the `1fup` parts of `id=1fup&chopping=1fup` part of the URL with the first 4 characters of any other PDB filename in the pdb folder.
* If any PDB files have a `.pdb` extension, remove it before updating the URL.
* Unless the numerical parameters after `...chopping=1fup` in the URL are changed the domain highlighting will remain the same.
