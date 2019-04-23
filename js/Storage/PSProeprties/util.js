/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  function copyBase(a, b){
    b.name = JSON.parse(JSON.stringify(b.name));
    b.description = JSON.parse(JSON.stringify(b.description));
    b.duality = JSON.parse(JSON.stringify(b.duality));
  }

  function copyCell(a, b) {
    copyBase(a, b);
    b.externalReference = [ ...b.externalReference ];
    b.partialboundedBy = [ ...b.partialboundedBy ];
    b.bottom = JSON.parse(JSON.stringify(b.bottom))*1;
    b.height = JSON.parse(JSON.stringify(b.bottom))*1;
    b.storey = JSON.parse(JSON.stringify(b.storey));
  }

  function copyBoundary(a, b){
    copyBase(a, b);
    b.externalReference = [ ...b.externalReference ];
    b.bottom = JSON.parse(JSON.stringify(b.bottom))*1;
    b.height = JSON.parse(JSON.stringify(b.bottom))*1;
    b.storey = JSON.parse(JSON.stringify(b.storey));
  }

  function copyState(a, b){
    copyBase(a, b);
    b.connects = JSON.parse(JSON.stringify(b.connects));
    b.height = JSON.parse(JSON.stringify(b.height));
  }

  return {
    copyCell: copyCell,
    copyBoundary: copyBoundary,
    copyState: copyState
  };
});
