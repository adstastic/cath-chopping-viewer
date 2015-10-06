console.log( "DEFINE CCV.Model.PdbInfo" );

CCV.Model.PdbInfo = Backbone.Model.extend({
  defaults: {
    header: null,
    title: null,
    keywords: null,
    expdata: null,
    author: null,
    journal_author: null,
    journal_title: null,
    journal_ref: null,
    journal_doi: null
  },
  parseFromPdb: function(data) {
    var line,
      re_line = /^([A-Z]+)\s+(.*?)$/mg,
      re_jrnl = /^([A-Z]+)\s+/;

    var h = this;

    PDB: while (line = re_line.exec(data)) {
      var key = line[1],
        content = line[2].trim();

      switch (key) {
        case 'HEADER':
          var tmp = h.get('header') || '';
          h.set('header', tmp + content);
          break;
        case 'TITLE':
          var tmp = h.get('title') || '';
          h.set('title', tmp + content);
          break;
        case 'KEYWDS':
          var tmp = h.get('keywords') || '';
          h.set('keywords', tmp + content);
          break;
        case 'JRNL':
          var parts = re_jrnl.exec( content );
          if ( ! parts ) {
            console.warn("Failed to parse journal key from '" + content + "' (skipping)");
            break;
          }
          var jrnl_key = parts[1];
          var jrnl_content = content.substr(7).trim();
          switch (jrnl_key) {
            case 'AUTH':
              var tmp = h.get('journal_author') || '';
              h.set('journal_author', tmp + jrnl_content);
              break;
            case 'TITL':
              var tmp = h.get('journal_title') || '';
              h.set('journal_title', tmp + jrnl_content);
              break;
            case 'REF':
              var tmp = h.get('journal_ref') || '';
              h.set('journal_ref', tmp + jrnl_content);
              break;
            case 'DOI':
              var tmp = h.get('journal_doi') || '';
              h.set('journal_doi', tmp + jrnl_content);
              break;
          }
          break;
        case 'ATOM':
        case 'REMARK':
        case 'SEQRES':
          break PDB;

      }
    }

    console.log( "pdbInfo: parseFromPdb: ", this );
  }
});
