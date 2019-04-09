/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var VERY_SMALL_VALUE = -99999999999;
  var VERY_BIG_VALUE = 99999999999;
  var bbox = {
    min: {
      x: VERY_BIG_VALUE,
      y: VERY_BIG_VALUE
    },
    max: {
      x: VERY_SMALL_VALUE,
      y: VERY_SMALL_VALUE
    }
  };

  function parse(indoor) {
    var docId = indoor.value.id;

    // primalSpaceFeatures
    var primalSpaceFeatures = indoor.value.primalSpaceFeatures.primalSpaceFeatures;
    var primalSpaceFeaturesId = primalSpaceFeatures.id;
    var cm = primalSpaceFeatures.cellSpaceMember != undefined ?
      parseCellSpaceMember(primalSpaceFeatures.cellSpaceMember) : {
        cells: {},
        cellListByHight: {}
      };
    var cbm = primalSpaceFeatures.cellSpaceBoundaryMember != undefined ?
      parseCellBoundaryMember(primalSpaceFeatures.cellSpaceBoundaryMember) : {
        cellBoundaries: {},
        cellBoundaryListByHigth: {}
      };

    // multiLayeredGraph
    var spaceLayers = {};
    if (indoor.value.multiLayeredGraph != undefined) {
      var mlg = indoor.value.multiLayeredGraph.multiLayeredGraph;
      var mlgId = mlg.id;
      var spaceLayersId = mlg.spaceLayers.id;
      for (var spaceLayer of mlg.spaceLayers[0].spaceLayerMember) {
        spaceLayer = spaceLayer.spaceLayer;
        spaceLayers[spaceLayer.id] = parseSpaceLayer(spaceLayer);
      }

      spaceLayers['undefined'] = {
        states: {},
        transitions: {}
      }
    }

    var floorData = getFloorData(cm, cbm, spaceLayers);

    return {
      docId: docId,
      bbox: bbox,
      floorData: floorData
    };

  }

  function setBBox(coor) {
    if (coor.x > bbox.max.x) bbox.max.x = coor.x;
    if (coor.y > bbox.max.y) bbox.max.y = coor.y;
    if (coor.x < bbox.min.x) bbox.min.x = coor.x;
    if (coor.y < bbox.min.y) bbox.min.y = coor.y;
  }

  function parseCellSpaceMember(cellSpaceMember) {

    var cells = {};
    var cellListByHight = {};
    var layers = {};

    for (var cell of cellSpaceMember) {
      cell = cell.cellSpace.value;

      var cellData = parseBasicProperty(cell);
      cellData['partialboundedBy'] = [];

      if (cell.partialboundedBy != undefined) {
        for (var obj of cell.partialboundedBy) {
          var pbb = obj.href.substring(1);
          if(pbb.indexOf("REVERSE") != -1) pbb = pbb.substring(0, pbb.indexOf("-REVERSE"));

          cellData['partialboundedBy'].push(pbb);
        }
      }

      // geometry
      if (cell.cellSpaceGeometry.geometry3D != undefined) {
        var parsed = parseSolid(cell.cellSpaceGeometry.geometry3D.abstractSolid);
        cellData['points'] = parsed.points;
        cellData['floorHight'] = parsed.floorHight;
        cellData['celingHeight'] = parsed.celingHeight;
        cellData['holes'] = parsed.holes;
        cellData['bottom'] = 0;
        cellData['height'] = parsed.celingHeight;
      } else {
        // 2D
      }

      // NonNavigableSpaceType
      var type = cell.TYPE_NAME != undefined ? cell.TYPE_NAME.substring(cell.TYPE_NAME.indexOf('.') + 1, cell.TYPE_NAME.indexOf('Type')) : "";
      if (type == 'NonNavigableSpace') {
        cellData['navi'] = {
          type: 'NonNavigableSpace',
          obstacleType: cell.obstacleType.value
        }
      } else if(type == 'CellSpace'){
        cellData['navi'] = {
          type: ""
        }
      } else {
        cellData['navi'] = {
          type: cell.TYPE_NAME != undefined ? cell.TYPE_NAME.substring(cell.TYPE_NAME.indexOf('.') + 1, cell.TYPE_NAME.indexOf('Type')) : "",
          class: cell.class != undefined ? cell.class.value : "",
          function: cell.function != undefined ? cell.function.value : "",
          usage: cell.usage != undefined ? cell.usage.value : ""
        }
      }

      for (var point of parsed.points)
        setBBox({
          x: point[0],
          y: point[1]
        });

      cells[cellData.id] = cellData;

      var key = JSON.stringify({
        floor: cellData.floorHight,
        celing: cellData.celingHeight
      });

      if (cellListByHight[key] == undefined) cellListByHight[key] = [cellData];
      else cellListByHight[key].push(cellData)
    }

    var heightKeys = Object.keys(cellListByHight);
    for (var i = 0; i < heightKeys.length - 1; i++) {
      var outer = JSON.parse(heightKeys[i]);
      for (var j = i + 1; j < heightKeys.length; j++) {
        var inner = JSON.parse(heightKeys[j]);
        if (outer.floor <= inner.floor && outer.floor + outer.celing >= inner.floor + inner.celing) {
          // out (  in  )
          var diff = inner.floor - outer.floor;
          var height = inner.celing - inner.floor;

          for (var o of cellListByHight[heightKeys[j]]) {
            o.height = height;
            o.floorHight = outer.floor;
            o.celingHeight = outer.celing;
            o['bottom'] = inner.floor - outer.floor;
            o['height'] = inner.celing - inner.floor;
          }

          cellListByHight[heightKeys[i]] = cellListByHight[heightKeys[i]].concat(cellListByHight[heightKeys[j]]);
          delete cellListByHight[heightKeys[j]];
          heightKeys.splice(j, 1);
          j--;
        } else if (outer.floor >= inner.floor && outer.floor + outer.celing <= inner.floor + inner.celing) {
          // in (  out  )
          var diff = outer.floor - inner.floor;
          var height = inner.celing - inner.floor;

          for (var o of cellListByHight[heightKeys[i]]) {
            o.height = height;
            o.floorHight = inner.floo;
            o.celingHeight = inner.celing;
            o['bottom'] = outer.floor - inner.floor;
            o['height'] = outer.celing - outer.floor;
          }

          cellListByHight[heightKeys[j]] = cellListByHight[heightKeys[j]].concat(cellListByHight[heightKeys[i]]);
          delete cellListByHight[heightKeys[i]];
          heightKeys.splice(i, 1);
          i--;
          break;
        }
      }

    }

    return {
      cells: cells,
      cellListByHight: cellListByHight,
    };
  }

  function parseCellBoundaryMember(cellSpaceBoundaryMember) {
    var cellBoundaries = {};
    var cellBoundaryListByHigth = {};
    for (var cellBoundary of cellSpaceBoundaryMember) {
      cellBoundary = cellBoundary.cellSpaceBoundary.value;

      // property
      var cbData = parseBasicProperty(cellBoundary);

      if (cbData.id.indexOf("REVERSE") != -1) continue;
      if (cbData.duality != null &&
          cbData.duality.indexOf("REVERSE") != -1)
        cbData.duality = cbData.duality.substring(0, cbData.duality.indexOf("-REVERSE"));

      // parse navi data
      cbData['navi'] = {
        type: cellBoundary.TYPE_NAME != undefined ? cellBoundary.TYPE_NAME.substring(cellBoundary.TYPE_NAME.indexOf('.') + 1, cellBoundary.TYPE_NAME.indexOf('Type')) : "",
        class: cellBoundary.class != undefined ? cellBoundary.class.value : "",
        function: cellBoundary.function != undefined ? cellBoundary.function.value : "",
        usage: cellBoundary.usage != undefined ? cellBoundary.usage.value : ""
      }

      // geometry
      if (cellBoundary.cellSpaceBoundaryGeometry.geometry3D != undefined) {
        var parsed = parsePolygon(cellBoundary.cellSpaceBoundaryGeometry.geometry3D);
        cbData['points'] = parsed._points;
        cbData['floorHight'] = parsed.low;
        cbData['celingHeight'] = parsed.high - parsed.low;
        cbData['bottom'] = parsed.low;
        cbData['height'] = parsed.high - parsed.low;
      } else {
        // 2D
      }

      if (cbData['points'].length <= 1) continue;

      for (var point of cbData.points)
        setBBox({
          x: point[0],
          y: point[1]
        });

      cellBoundaries[cbData.id] = cbData;

      var key = JSON.stringify({
        floor: cbData.floorHight,
        celing: cbData.celingHeight
      });

      if (cellBoundaryListByHigth[key] == undefined) cellBoundaryListByHigth[key] = [cbData];
      else cellBoundaryListByHigth[key].push(cbData)
    }

    return {
      cellBoundaries: cellBoundaries,
      cellBoundaryListByHigth: cellBoundaryListByHigth
    };
  }

  function parseSpaceLayer(sl) {
    var states = {},
      transitions = {};

    for (var node of sl.nodes) {
      if (node.stateMember == undefined) continue;

      for (var state of node.stateMember) {
        state = state.state;
        var stateData = parseBasicProperty(state);
        stateData['connects'] = state.connects != undefined ? state.connects : [];

        if (stateData.connects.length > 0) {
          for (var i in stateData.connects) {
            stateData.connects[i] = stateData.connects[i].href.substring(1);
          }
        }

        stateData['point'] = [state.geometry.point.pos.value[0], state.geometry.point.pos.value[1]];
        stateData['height'] = state.geometry.point.pos.value[2];

        setBBox({
          x: stateData.point[0],
          y: stateData.point[1]
        });

        states[stateData.id] = stateData;
      }
    }

    for (var edge of sl.edges) {
      if (edge.transitionMember == undefined) continue;

      for (var transition of edge.transitionMember) {
        transition = transition.transition;
        var transitionData = parseBasicProperty(transition);
        if (transitionData.id.split('-')[1] == "REVERSE") continue;
        if (transitionData.duality != null &&
          transitionData.duality.split('-')[1] == "REVERSE")
          transitionData.duality = transitionData.duality.split('-')[0];


        transitionData['points'] = [];
        var lineString = transition.geometry.abstractCurve.value.posOrPointPropertyOrPointRep;
        for (var point of lineString) {
          transitionData.points.push(point.value.value);
          setBBox({
            x: point.value.value[0],
            y: point.value.value[1]
          })
        }


        transitionData['connects'] = [transition.connects[0].href.substring(1), transition.connects[1].href.substring(1)];
        transitionData['weight'] = transition.weight;
        transitions[transitionData.id] = transitionData;
      }
    }

    return {
      states: states,
      transitions: transitions
    };
  }

  function parseBasicProperty(obj) {
    var property = {
      id: obj.id,
      description: {},
      duality: null,
      name: null
    };

    if (obj.name != undefined) property['name'] = obj.name[0].value.trim();
    if (obj.duality != undefined) property['duality'] = obj.duality.href.substring(1);

    if (obj.description != undefined && Object.keys(obj.description).length > 0) {
      var descArr = obj.description.value.trim().split(':');
      if (descArr.length == 1 && descArr[0].split('=').length == 1) {
        property['description']['desc'] = descArr[0];
      } else {
        for (var desc of descArr) {
          if (desc != "") {
            var parse = desc.split('=');
            property['description'][parse[0]] = parse[1].substring(1, parse[1].length - 1);
          }
        }
      }

    }

    if (obj.externalReference != undefined) {
      property['externalReference'] = obj.externalReference;
    }

    return property;
  }

  function parseSurface(surface) {
    function existInArray(_points, coor) {
      for (var c of _points) {
        if (coor[0] == c[0] && coor[1] == c[1]) return true;
      }
      return false;
    }

    var posOrPointPropertyOrPointRep = surface.abstractSurface.value.exterior.abstractRing.value.posOrPointPropertyOrPointRep;
    var _points = [];
    var low = 999999999999,
      high = -999999999999,
      _z = -1;

    for (var point of posOrPointPropertyOrPointRep) {
      var coor = [point.value.value[0], point.value.value[1]];
      var z = point.value.value[2];

      if (low > z) low = z;
      if (high < z) high = z;

      if (_z == -1) _z = z;
      else if (_z == z && !existInArray(_points, coor)) _points.push(coor);
    }

    return {
      _points: _points,
      low: low,
      high: high
    };
  }

  function parseSolid(solid) {
    var result = {},
      exterior;
    var z_low = 999999999999,
      z_high = -999999999999;
    var points = [];

    if (solid.value.exterior != undefined) {
      exterior = solid.value.exterior.shell.surfaceMember;

      for (var surface of exterior) {
        var parse = parseSurface(surface);
        if (z_low > parse.low) z_low = parse.low;
        if (z_high < parse.high) z_high = parse.high;

        if (parse._points.length > 0 && parse._points.length > points.length) points = parse._points;
      }

      result['points'] = points;
      result['floorHight'] = z_low;
      result['celingHeight'] = z_high - z_low;

      var holes = [];
      if (solid.value.interior != undefined) {
        var interiors = solid.value.interior;

        for (var interior of interiors) {
          points = [];

          for (var surface of interior.shell.surfaceMember) {
            var parse = parseSurface(surface);
            if (parse._points.length > 0 && parse._points.length > points.length) points = parse._points;
          }

          if (points.length > 0) holes.push(points);
        }

        result['holes'] = holes;
      }
    }
    return result;
  }

  function parsePolygon(polygon) {
    // log.info(polygon.abstractSurface.value);
    var posOrPointPropertyOrPointRep = polygon.abstractSurface.value.exterior.abstractRing.value.posOrPointPropertyOrPointRep;
    var _points = [];
    var low = 999999999999,
      high = -999999999999,
      _z = -1;

    function existInArray(_points, coor) {
      for (var c of _points) {
        if (coor[0] == c[0] && coor[1] == c[1]) return true;
      }
      return false;
    }

    for (var point of posOrPointPropertyOrPointRep) {
      var coor = [point.value.value[0], point.value.value[1]];
      var z = point.value.value[2];

      if (low > z) low = z;
      if (high < z) high = z;

      if (!existInArray(_points, coor)) {
        if (_z == -1) {
          _z = z;
          _points.push(coor);
        } else if (_z == z)
          _points.push(coor);
      }

    }

    return {
      _points: _points,
      low: low,
      high: high
    };
  }

  function getFloorData(_cm, _cbm, _spaceLayers) {

    var cm = JSON.parse(JSON.stringify(_cm)),
      cbm = JSON.parse(JSON.stringify(_cbm)),
      spaceLayers = JSON.parse(JSON.stringify(_spaceLayers));

    var floorData = {};

    function getLayer(id, type) {
      for (var lk in spaceLayers) {
        if (type == 'state' && spaceLayers[lk].states[id] != undefined) return lk;
        if (type == 'transition' && spaceLayers[lk].transitions[id] != undefined) return lk;
      }

      for (var f in floorData) {
        if (type == 'state' && floorData[f].states[id]) return floorData[f].layer;
        if (type == 'transition' && floorData[f].transitions[id]) return floorData[f].layer;
      }

      return 'undefined';
    }

    function floorDataFactory(floor, celing, door, layer) {
      return {
        id: window.conditions.guid(),
        floorHight: floor,
        celingHeight: celing,
        doorHeight: door,
        layer: layer,
        cells: {},
        cellBoundaries: {},
        states: {},
        transitions: {}
      }
    }

    function isFloorDataExist(option) {
      for (var fd of Object.values(floorData)) {
        if (fd.floorHight === option.floor && fd.celingHeight === option.celing && fd.layer === option.layer) return fd;
        if (fd.floorHight === option.floor && fd.doorHeight === option.door && fd.layer === option.layer) return fd;
      }
      return null;
    }

    function findFloorData(objType, floor, height, connects, layer) {
      for (var fd of Object.values(floorData)) {
        if (objType == 'cell' && fd.floorHight === floor && fd.celingHeight === height && fd.layer === layer) return fd;
        if (objType == 'cellBoundary' && fd.floorHight === floor && fd.doorHeight === height && fd.layer === layer) return fd;
        if (objType == 'state' && (fd.celingHeight + fd.floorHight) >= height && fd.floorHight <= height && fd.layer === layer) return fd;
        if (objType == 'transition') {
          var state = _spaceLayers[layer].states[connects[0]];
          return findFloorData('state', -1, state.height, [], layer);
        }
      }
      return null;
    }

    function setCellFloor(c, thisFloor) {
      thisFloor.cells[c.id] = c;

      // duality(state)
      if (c.duality != null &&
        thisFloor.states[c.duality] == undefined &&
        spaceLayers[layer].states[c.duality] != undefined)
        setStateFloor(spaceLayers[layer].states[c.duality], thisFloor);

      // partialboundedBy(cellboundary)
      for (var cb of c.partialboundedBy) {
        if (thisFloor.cellBoundaries[cb] == undefined &&
          cbm.cellBoundaries[cb] != undefined)
          setCellBoundaryFloor(cbm.cellBoundaries[cb], thisFloor);
      }

      delete cm.cells[c.id];
    }

    function setCellBoundaryFloor(cb, thisFloor) {
      thisFloor.cellBoundaries[cb.id] = cb;
      thisFloor.doorHeight = cb.celingHeight;

      // duality(transition)
      if (cb.duality != null &&
        thisFloor.transitions[cb.duality] == undefined &&
        spaceLayers[thisFloor.layer].transitions[cb.duality] != undefined)
        setTransitionFloor(spaceLayers[thisFloor.layer].transitions[cb.duality], thisFloor);

      delete cbm.cellBoundaries[cb.id];
    }

    function setStateFloor(s, thisFloor) {
      s.height -= thisFloor.floorHight;
      thisFloor.states[s.id] = s;

      // duality(cellspace)
      if (s.duality != null &&
        thisFloor.cells[s.duality] == undefined &&
        cm.cells[s.duality] != undefined)
        setCellFloor(cm.cells[s.duality], thisFloor);

      // connections
      for (var t of s.connects) {
        if (thisFloor.transitions[t] == undefined &&
          spaceLayers[thisFloor.layer].transitions[t] != undefined &&
          spaceLayers[thisFloor.layer].transitions[t].connects[0] == s.id)
          setTransitionFloor(spaceLayers[thisFloor.layer].transitions[t], thisFloor);
      }

      delete spaceLayers[thisFloor.layer].states[s.id];
    }

    function setTransitionFloor(t, thisFloor) {
      thisFloor.transitions[t.id] = t;

      // duality
      if (t.duality != null &&
        thisFloor.cellBoundaries[t.duality] == undefined &&
        cbm.cellBoundaries[t.duality] != undefined)
        setCellBoundaryFloor(cbm.cellBoundaries[t.duality], thisFloor);

      // connects(state)
      // for (var i = 0; i < 2; i++) {
      //   var sid = t.connects[i];
      //   if (sid != undefined &&
      //       sid != null && thisFloor.states[sid] == undefined &&
      //       spaceLayers[thisFloor.layer].states[sid] != undefined)
      //     setStateFloor(spaceLayers[thisFloor.layer].states[sid], thisFloor);
      // }

      delete spaceLayers[thisFloor.layer].transitions[t.id];
    }

    for (var c of Object.values(cm.cells)) {
      var layer = (c.duality != undefined && c.duality != null) ? getLayer(c.duality, 'state') : 'undefined';
      var thisFloor = findFloorData('cell', c.floorHight, c.celingHeight, [], layer);

      if (thisFloor == null) {
        thisFloor = floorDataFactory(c.floorHight, c.celingHeight, -1, layer);
        floorData[thisFloor.id] = thisFloor;
      }

      if (thisFloor.cells[c.id] == undefined)
        setCellFloor(c, thisFloor);

      // thisFloor.cells[c.id] = c;
      //
      // if(c.duality != null){
      //   thisFloor.states[c.duality] = spaceLayers[layer].states[c.duality];
      //   thisFloor.states[c.duality].height -= thisFloor.floorHight;
      //   delete spaceLayers[layer].states[c.duality];
      // }
      //
      // delete cm.cells[c.id];
      //
      //
      // if(c.partialboundedBy.length != 0){
      //   for(var cb of c.partialboundedBy) {
      //     if(thisFloor.cellBoundaries[cb] == undefined){
      //       thisFloor.cellBoundaries[cb] = cbm.cellBoundaries[cb];
      //       thisFloor.doorHeight = cbm.cellBoundaries[cb].celingHeight; // door height
      //       delete cbm.cellBoundaries[cb];
      //
      //       if(thisFloor.cellBoundaries[cb].duality != null){
      //         var tid = thisFloor.cellBoundaries[cb].duality;
      //         thisFloor.transitions[tid] = spaceLayers[layer].transitions[tid];
      //         delete spaceLayers[layer].transitions[tid];
      //       }
      //     }
      //   }
      // }
    }

    for (var cb of Object.values(cbm.cellBoundaries)) {
      var layer = (cb.duality != undefined && cb.duality != null) ? getLayer(cb.duality, 'transition') : 'undefined';
      var thisFloor = findFloorData('cellBoundary', cb.floorHight, cb.celingHeight, [], layer);

      if (thisFloor == null) {
        thisFloor = floorDataFactory(cb.floorHight, cb.celingHeight, cb.celingHeight, layer);
        floorData[thisFloor.id] = thisFloor;
      }

      if (thisFloor.cellBoundaries[cb.id] == undefined)
        setCellBoundaryFloor(cb, thisFloor);
      // thisFloor.cellBoundaries[cb.id] = cb;
      // if(cb.duality != null)
      //   thisFloor.transitions[cb.duality] = spaceLayers[layer].transitions[cb.duality];
      // delete spaceLayers[layer].transitions[cb.duality];
      // delete cbm.cellBoundaries[cb.id];
    }

    for (var layer in spaceLayers) {
      for (var s of Object.values(spaceLayers[layer].states)) {
        var thisFloor = findFloorData('state', -1, s.height, [], layer);

        if (thisFloor == null) {
          thisFloor = floorDataFactory(s.floorHight, s.celingHeight, s.celingHeight, layer);
          floorData[thisFloor.id] = thisFloor;
        }

        if (thisFloor.states[s.id] == undefined)
          setStateFloor(s, thisFloor);
        // s.height -= thisFloor.floorHight;
        // thisFloor.states[s.id] = s;
        // delete spaceLayers[layer].states[s.id];
      }

      for (var t of Object.values(spaceLayers[layer].transitions)) {
        var thisFloor = findFloorData('transition', -1, -1, t.connects, layer);
        if (thisFloor.transitions[t.id] == undefined)
          setTransitionFloor(t, thisFloor);
        // thisFloor.transitions[t.id] = t;
        // delete spaceLayers[layer].transitions[t.id];
      }
    }

    log.info(floorData);

    return floorData;
  }

  function mirrorTransformation(point, minH, maxH) {
    var mirrorMatrix = math.matrix([
      [1, 0, 0],
      [0, -1, minH + maxH],
      [0, 0, 1]
    ]);
    var pointMatrix = math.matrix([point[0], point[1], 1]);
    var mirroredPoint = math.multiply(mirrorMatrix, pointMatrix);
    return [mirroredPoint._data[0], mirroredPoint._data[1]];
  }

  function affineTransformation(point, srcSize, dstSize, bbox) {
    var pointMatrix = math.matrix([point[0], point[1], 1]);
    var widthScale = Math.abs(dstSize.width / srcSize.width);
    var heightScale = Math.abs(dstSize.height / srcSize.height);
    var widthTrans = -bbox.min.x * widthScale;
    var heightTrans = -bbox.min.y * heightScale;
    var matrix = math.matrix([
      [widthScale, 0, widthTrans],
      [0, heightScale, heightTrans],
      [0, 0, 0]
    ]);

    var result = math.multiply(matrix, pointMatrix);
    return [result._data[0], result._data[1]];
  }

  function transCoor(data, oldCanvasSize) {
    var dataSize = {
      width: Math.abs(data.bbox.max.x - data.bbox.min.x),
      height: Math.abs(data.bbox.max.y - data.bbox.min.y)
    };


    var newCanvasSize = getNewCanvasSize(dataSize, oldCanvasSize);

    for (var floor of Object.values(data.floorData)) {

      for (var c of Object.values(floor.cells)) {
        for (var i in c.points) {
          c.points[i] = mirrorTransformation(c.points[i], data.bbox.min.y, data.bbox.max.y);
          c.points[i] = affineTransformation(c.points[i], dataSize, newCanvasSize, data.bbox);
        }

        if (c.holes != undefined) {
          for (var holeIdx in c.holes) {
            for (var pointKey in c.holes[holeIdx]) {
              c.holes[holeIdx][pointKey] = mirrorTransformation(c.holes[holeIdx][pointKey], data.bbox.min.y, data.bbox.max.y);
              c.holes[holeIdx][pointKey] = affineTransformation(c.holes[holeIdx][pointKey], dataSize, newCanvasSize, data.bbox);
            }
          }
        }
      }

      for (var cb of Object.values(floor.cellBoundaries)) {
        for (var i in cb.points) {
          cb.points[i] = mirrorTransformation(cb.points[i], data.bbox.min.y, data.bbox.max.y);
          cb.points[i] = affineTransformation(cb.points[i], dataSize, newCanvasSize, data.bbox);
        }
      }

      for (var s of Object.values(floor.states)) {
        s.point = mirrorTransformation(s.point, data.bbox.min.y, data.bbox.max.y);
        s.point = affineTransformation(s.point, dataSize, newCanvasSize, data.bbox);
      }

      for (var t of Object.values(floor.transitions)) {
        for (var i in t.points) {
          t.points[i] = mirrorTransformation(t.points[i], data.bbox.min.y, data.bbox.max.y);
          t.points[i] = affineTransformation(t.points[i], dataSize, newCanvasSize, data.bbox);
        }
      }
    }

    return {
      data: data,
      newCanvasSize: newCanvasSize
    };
  }



  function getNewCanvasSize(dataSize, oldCanvasSize) {
    function NOT(A) {
      if (A == 'width') return 'height';
      else return 'width';
    }

    function Ratio(T) {
      return dataSize[NOT(T)] / dataSize[T];
    }

    var T = dataSize.width > dataSize.height ? 'width' : 'height';
    var newCanvasSize = {
      width: oldCanvasSize.width,
      height: oldCanvasSize.height
    };

    newCanvasSize[NOT(T)] = newCanvasSize[T] * Ratio(T);

    if (newCanvasSize[NOT(T)] > oldCanvasSize[NOT(T)]) {
      T = NOT(T);
      newCanvasSize[T] = oldCanvasSize[T];
      newCanvasSize[NOT(T)] = newCanvasSize[T] * Ratio(T);
    }

    return newCanvasSize;
  }

  return {
    parse: parse,
    transCoor: transCoor
  };
});
