var IndoorGML_Core_1_0_3_Module_Factory = function () {
  var IndoorGML_Core_1_0_3 = {
    name: 'IndoorGML_Core_1_0_3',
    defaultElementNamespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2',
    defaultAttributeNamespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
    typeInfos: [{
        localName: 'OffsetCurveType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'offsetBase',
            required: true,
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'distance',
            required: true,
            typeInfo: '.LengthType'
          }, {
            name: 'refDirection',
            typeInfo: '.VectorType'
          }]
      }, {
        localName: 'DerivationUnitTermType',
        baseTypeInfo: '.UnitOfMeasureType',
        propertyInfos: [{
            name: 'exponent',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'exponent'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LILineageType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LI_Lineage_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'statement',
            elementName: {
              localPart: 'statement',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'processStep',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'processStep',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LIProcessStepPropertyType'
          }, {
            name: 'source',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'source',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LISourcePropertyType'
          }]
      }, {
        localName: 'CircleByCenterPointType',
        baseTypeInfo: '.ArcByCenterPointType'
      }, {
        localName: 'TimeCSPropertyType',
        propertyInfos: [{
            name: 'timeCS',
            required: true,
            elementName: 'TimeCS',
            typeInfo: '.TimeCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'LocalisedCharacterStringPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LocalisedCharacterString_PropertyType'
        },
        baseTypeInfo: '.ObjectReferencePropertyType',
        propertyInfos: [{
            name: 'localisedCharacterString',
            required: true,
            elementName: {
              localPart: 'LocalisedCharacterString',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LocalisedCharacterStringType'
          }]
      }, {
        localName: 'DQQuantitativeAttributeAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_QuantitativeAttributeAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'dqQuantitativeAttributeAccuracy',
            required: true,
            elementName: {
              localPart: 'DQ_QuantitativeAttributeAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQQuantitativeAttributeAccuracyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AssociationRoleType',
        propertyInfos: [{
            name: 'any',
            required: true,
            allowDom: false,
            mixed: false,
            type: 'anyElement'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDImagingConditionCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ImagingConditionCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdImagingConditionCode',
            required: true,
            elementName: {
              localPart: 'MD_ImagingConditionCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DictionaryEntryType',
        baseTypeInfo: '.AbstractMemberType',
        propertyInfos: [{
            name: 'definition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'Definition',
            typeInfo: '.DefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CIAddressPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Address_PropertyType'
        },
        propertyInfos: [{
            name: 'ciAddress',
            required: true,
            elementName: {
              localPart: 'CI_Address',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIAddressType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDatumType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'domainOfValidity',
            typeInfo: '.DomainOfValidity'
          }, {
            name: 'scope',
            required: true,
            collection: true
          }, {
            name: 'anchorDefinition',
            mixed: false,
            allowDom: false,
            typeInfo: '.CodeType',
            type: 'elementRef'
          }, {
            name: 'realizationEpoch',
            typeInfo: 'Date'
          }]
      }, {
        localName: 'MeasureListType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Double'
            },
            type: 'value'
          }, {
            name: 'uom',
            required: true,
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ArcStringByBulgeType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'bulge',
            required: true,
            collection: true,
            typeInfo: 'Double'
          }, {
            name: 'normal',
            required: true,
            collection: true,
            typeInfo: '.VectorType'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }, {
            name: 'numArc',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'numArc'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'VerticalCSPropertyType',
        propertyInfos: [{
            name: 'verticalCS',
            required: true,
            elementName: 'VerticalCS',
            typeInfo: '.VerticalCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDFormatType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Format_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'version',
            required: true,
            elementName: {
              localPart: 'version',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'amendmentNumber',
            elementName: {
              localPart: 'amendmentNumber',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'specification',
            elementName: {
              localPart: 'specification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'fileDecompressionTechnique',
            elementName: {
              localPart: 'fileDecompressionTechnique',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'formatDistributor',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'formatDistributor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDistributorPropertyType'
          }]
      }, {
        localName: 'LocatorType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'locatorType'
        },
        propertyInfos: [{
            name: 'title',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            typeInfo: '.TitleEltType'
          }, {
            name: 'type',
            required: true,
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            required: true,
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'label',
            typeInfo: 'NCName',
            type: 'attribute'
          }]
      }, {
        localName: 'NodeType',
        baseTypeInfo: '.AbstractTopoPrimitiveType',
        propertyInfos: [{
            name: 'container',
            typeInfo: '.FaceOrTopoSolidPropertyType'
          }, {
            name: 'directedEdge',
            minOccurs: 0,
            collection: true,
            typeInfo: '.DirectedEdgePropertyType'
          }, {
            name: 'pointProperty',
            typeInfo: '.PointPropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractSolidType',
        baseTypeInfo: '.AbstractGeometricPrimitiveType'
      }, {
        localName: 'CoordinateSystemAxisPropertyType',
        propertyInfos: [{
            name: 'coordinateSystemAxis',
            required: true,
            elementName: 'CoordinateSystemAxis',
            typeInfo: '.CoordinateSystemAxisType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EXVerticalExtentPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_VerticalExtent_PropertyType'
        },
        propertyInfos: [{
            name: 'exVerticalExtent',
            required: true,
            elementName: {
              localPart: 'EX_VerticalExtent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXVerticalExtentType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQElementPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_Element_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQElement',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_Element',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQElementType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CIOnlineResourceType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_OnlineResource_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'linkage',
            required: true,
            elementName: {
              localPart: 'linkage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.URLPropertyType'
          }, {
            name: 'protocol',
            elementName: {
              localPart: 'protocol',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'applicationProfile',
            elementName: {
              localPart: 'applicationProfile',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'name',
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'description',
            elementName: {
              localPart: 'description',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'function',
            elementName: {
              localPart: 'function',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIOnLineFunctionCodePropertyType'
          }]
      }, {
        localName: 'DSOtherAggregateType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_OtherAggregate_Type'
        },
        baseTypeInfo: '.AbstractDSAggregateType'
      }, {
        localName: 'MDTopicCategoryCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_TopicCategoryCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdTopicCategoryCode',
            required: true,
            elementName: {
              localPart: 'MD_TopicCategoryCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDTopicCategoryCodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CIDateTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_DateTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'ciDateTypeCode',
            required: true,
            elementName: {
              localPart: 'CI_DateTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDPortrayalCatalogueReferencePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_PortrayalCatalogueReference_PropertyType'
        },
        propertyInfos: [{
            name: 'mdPortrayalCatalogueReference',
            required: true,
            elementName: {
              localPart: 'MD_PortrayalCatalogueReference',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDPortrayalCatalogueReferenceType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CIDateType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Date_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'date',
            required: true,
            elementName: {
              localPart: 'date',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DatePropertyType'
          }, {
            name: 'dateType',
            required: true,
            elementName: {
              localPart: 'dateType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIDateTypeCodePropertyType'
          }]
      }, {
        localName: 'CIDatePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Date_PropertyType'
        },
        propertyInfos: [{
            name: 'ciDate',
            required: true,
            elementName: {
              localPart: 'CI_Date',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIDateType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSProductionSeriesType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_ProductionSeries_Type'
        },
        baseTypeInfo: '.DSSeriesType'
      }, {
        localName: 'OrientableCurveType',
        baseTypeInfo: '.AbstractCurveType',
        propertyInfos: [{
            name: 'baseCurve',
            required: true,
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'orientation',
            values: ['-', '+'],
            attributeName: {
              localPart: 'orientation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDBandType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Band_Type'
        },
        baseTypeInfo: '.MDRangeDimensionType',
        propertyInfos: [{
            name: 'maxValue',
            elementName: {
              localPart: 'maxValue',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'minValue',
            elementName: {
              localPart: 'minValue',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'units',
            elementName: {
              localPart: 'units',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.UomLengthPropertyType'
          }, {
            name: 'peakResponse',
            elementName: {
              localPart: 'peakResponse',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'bitsPerValue',
            elementName: {
              localPart: 'bitsPerValue',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'toneGradation',
            elementName: {
              localPart: 'toneGradation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'scaleFactor',
            elementName: {
              localPart: 'scaleFactor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'offset',
            elementName: {
              localPart: 'offset',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }]
      }, {
        localName: 'DQFormatConsistencyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_FormatConsistency_Type'
        },
        baseTypeInfo: '.AbstractDQLogicalConsistencyType'
      }, {
        localName: 'MDDistributorPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Distributor_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDistributor',
            required: true,
            elementName: {
              localPart: 'MD_Distributor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDistributorType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MultiplicityPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Multiplicity_PropertyType'
        },
        propertyInfos: [{
            name: 'multiplicity',
            required: true,
            elementName: {
              localPart: 'Multiplicity',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.MultiplicityType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'VerticalCRSPropertyType',
        propertyInfos: [{
            name: 'verticalCRS',
            required: true,
            elementName: 'VerticalCRS',
            typeInfo: '.VerticalCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TinType',
        baseTypeInfo: '.SurfaceType',
        propertyInfos: [{
            name: 'stopLines',
            minOccurs: 0,
            collection: true,
            typeInfo: '.LineStringSegmentArrayPropertyType'
          }, {
            name: 'breakLines',
            minOccurs: 0,
            collection: true,
            typeInfo: '.LineStringSegmentArrayPropertyType'
          }, {
            name: 'maxLength',
            required: true,
            typeInfo: '.LengthType'
          }, {
            name: 'controlPoint',
            required: true,
            typeInfo: '.TinType.ControlPoint'
          }]
      }, {
        localName: 'PTLocaleType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'PT_Locale_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'languageCode',
            required: true,
            elementName: {
              localPart: 'languageCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LanguageCodePropertyType'
          }, {
            name: 'country',
            elementName: {
              localPart: 'country',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CountryPropertyType'
          }, {
            name: 'characterEncoding',
            required: true,
            elementName: {
              localPart: 'characterEncoding',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDCharacterSetCodePropertyType'
          }]
      }, {
        localName: 'UnitDefinitionType',
        baseTypeInfo: '.DefinitionType',
        propertyInfos: [{
            name: 'quantityType',
            typeInfo: '.StringOrRefType'
          }, {
            name: 'quantityTypeReference',
            typeInfo: '.ReferenceType'
          }, {
            name: 'catalogSymbol',
            typeInfo: '.CodeType'
          }]
      }, {
        localName: 'DerivedUnitType',
        baseTypeInfo: '.UnitDefinitionType',
        propertyInfos: [{
            name: 'derivationUnitTerm',
            required: true,
            collection: true,
            typeInfo: '.DerivationUnitTermType'
          }]
      }, {
        localName: 'PointArrayPropertyType',
        propertyInfos: [{
            name: 'point',
            minOccurs: 0,
            collection: true,
            elementName: 'Point',
            typeInfo: '.PointType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractTimePrimitiveType',
        baseTypeInfo: '.AbstractTimeObjectType',
        propertyInfos: [{
            name: 'relatedTime',
            minOccurs: 0,
            collection: true,
            typeInfo: '.RelatedTimeType'
          }]
      }, {
        localName: 'MDGeoreferenceableType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Georeferenceable_Type'
        },
        baseTypeInfo: '.MDGridSpatialRepresentationType',
        propertyInfos: [{
            name: 'controlPointAvailability',
            required: true,
            elementName: {
              localPart: 'controlPointAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'orientationParameterAvailability',
            required: true,
            elementName: {
              localPart: 'orientationParameterAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'orientationParameterDescription',
            elementName: {
              localPart: 'orientationParameterDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'georeferencedParameters',
            required: true,
            elementName: {
              localPart: 'georeferencedParameters',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RecordPropertyType'
          }, {
            name: 'parameterCitation',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'parameterCitation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }]
      }, {
        localName: 'DirectPositionListType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Double'
            },
            type: 'value'
          }, {
            name: 'count',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'count'
            },
            type: 'attribute'
          }, {
            name: 'srsName',
            attributeName: {
              localPart: 'srsName'
            },
            type: 'attribute'
          }, {
            name: 'srsDimension',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'srsDimension'
            },
            type: 'attribute'
          }, {
            name: 'axisLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'axisLabels'
            },
            type: 'attribute'
          }, {
            name: 'uomLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'uomLabels'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OperationParameterGroupType',
        baseTypeInfo: '.AbstractGeneralOperationParameterType',
        propertyInfos: [{
            name: 'maximumOccurs',
            typeInfo: 'PositiveInteger'
          }, {
            name: 'parameter',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AbstractGeneralOperationParameterPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'TimeCalendarEraPropertyType',
        propertyInfos: [{
            name: 'timeCalendarEra',
            required: true,
            elementName: 'TimeCalendarEra',
            typeInfo: '.TimeCalendarEraType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeClockPropertyType',
        propertyInfos: [{
            name: 'timeClock',
            required: true,
            elementName: 'TimeClock',
            typeInfo: '.TimeClockType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RecordTypeType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'RecordType_Type'
        },
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ScaleType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'MDResolutionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Resolution_PropertyType'
        },
        propertyInfos: [{
            name: 'mdResolution',
            required: true,
            elementName: {
              localPart: 'MD_Resolution',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDResolutionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'EdgesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'EdgesType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'transitionMember',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'transitionMember',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.TransitionMemberType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BagType',
        baseTypeInfo: '.AbstractGMLType',
        propertyInfos: [{
            name: 'member',
            minOccurs: 0,
            collection: true,
            typeInfo: '.AssociationRoleType'
          }, {
            name: 'members',
            typeInfo: '.ArrayAssociationType'
          }]
      }, {
        localName: 'AbstractParametricCurveSurfaceType',
        baseTypeInfo: '.AbstractSurfacePatchType',
        propertyInfos: [{
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'UomVolumePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomVolume_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractTimeComplexType',
        baseTypeInfo: '.AbstractTimeObjectType'
      }, {
        localName: 'ValueArrayPropertyType',
        propertyInfos: [{
            name: 'abstractValueOrAbstractGeometryOrAbstractTimeObject',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'AbstractTimeObject',
                typeInfo: '.AbstractTimeObjectType'
              }, {
                elementName: 'Null',
                typeInfo: {
                  type: 'list'
                }
              }, {
                elementName: 'AbstractValue',
                typeInfo: 'AnyType'
              }, {
                elementName: 'AbstractGeometry',
                typeInfo: '.AbstractGeometryType'
              }],
            type: 'elementRefs'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DirectionVectorType',
        propertyInfos: [{
            name: 'vector',
            required: true,
            typeInfo: '.VectorType'
          }, {
            name: 'horizontalAngle',
            required: true,
            typeInfo: '.AngleType'
          }, {
            name: 'verticalAngle',
            required: true,
            typeInfo: '.AngleType'
          }]
      }, {
        localName: 'DQPositionalAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_PositionalAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQPositionalAccuracy',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_PositionalAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQPositionalAccuracyType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CurveType',
        baseTypeInfo: '.AbstractCurveType',
        propertyInfos: [{
            name: 'segments',
            required: true,
            typeInfo: '.CurveSegmentArrayPropertyType'
          }]
      }, {
        localName: 'CIRoleCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_RoleCode_PropertyType'
        },
        propertyInfos: [{
            name: 'ciRoleCode',
            required: true,
            elementName: {
              localPart: 'CI_RoleCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TypeNamePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'TypeName_PropertyType'
        },
        propertyInfos: [{
            name: 'typeName',
            required: true,
            elementName: {
              localPart: 'TypeName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.TypeNameType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQAccuracyOfATimeMeasurementPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_AccuracyOfATimeMeasurement_PropertyType'
        },
        propertyInfos: [{
            name: 'dqAccuracyOfATimeMeasurement',
            required: true,
            elementName: {
              localPart: 'DQ_AccuracyOfATimeMeasurement',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQAccuracyOfATimeMeasurementType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CharacterStringPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'CharacterString_PropertyType'
        },
        propertyInfos: [{
            name: 'characterString',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'CharacterString',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DirectionPropertyType',
        propertyInfos: [{
            name: 'directionVector',
            required: true,
            elementName: 'DirectionVector',
            typeInfo: '.DirectionVectorType'
          }, {
            name: 'directionDescription',
            required: true,
            elementName: 'DirectionDescription',
            typeInfo: '.DirectionDescriptionType'
          }, {
            name: 'compassPoint',
            required: true,
            elementName: 'CompassPoint',
            typeInfo: '.CompassPointEnumeration'
          }, {
            name: 'directionKeyword',
            required: true,
            elementName: 'DirectionKeyword',
            typeInfo: '.CodeType'
          }, {
            name: 'directionString',
            required: true,
            elementName: 'DirectionString',
            typeInfo: '.StringOrRefType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeInstantType',
        baseTypeInfo: '.AbstractTimeGeometricPrimitiveType',
        propertyInfos: [{
            name: 'timePosition',
            required: true,
            typeInfo: '.TimePositionType'
          }]
      }, {
        localName: 'DomainOfValidity',
        typeName: null,
        propertyInfos: [{
            name: 'exExtent',
            required: true,
            elementName: {
              localPart: 'EX_Extent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXExtentType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TimeCalendarType',
        baseTypeInfo: '.TimeReferenceSystemType',
        propertyInfos: [{
            name: 'referenceFrame',
            required: true,
            collection: true,
            typeInfo: '.TimeCalendarEraPropertyType'
          }]
      }, {
        localName: 'EngineeringCRSPropertyType',
        propertyInfos: [{
            name: 'engineeringCRS',
            required: true,
            elementName: 'EngineeringCRS',
            typeInfo: '.EngineeringCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDImageDescriptionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ImageDescription_PropertyType'
        },
        propertyInfos: [{
            name: 'mdImageDescription',
            required: true,
            elementName: {
              localPart: 'MD_ImageDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDImageDescriptionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ArrayType',
        baseTypeInfo: '.AbstractGMLType',
        propertyInfos: [{
            name: 'members',
            typeInfo: '.ArrayAssociationType'
          }]
      }, {
        localName: 'EXBoundingPolygonType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_BoundingPolygon_Type'
        },
        baseTypeInfo: '.AbstractEXGeographicExtentType',
        propertyInfos: [{
            name: 'polygon',
            required: true,
            collection: true,
            elementName: {
              localPart: 'polygon',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.GMObjectPropertyType'
          }]
      }, {
        localName: 'MultiPointType',
        baseTypeInfo: '.AbstractGeometricAggregateType',
        propertyInfos: [{
            name: 'pointMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.PointPropertyType'
          }, {
            name: 'pointMembers',
            typeInfo: '.PointArrayPropertyType'
          }]
      }, {
        localName: 'UomScalePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomScale_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'PrimeMeridianType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'greenwichLongitude',
            required: true,
            typeInfo: '.AngleType'
          }]
      }, {
        localName: 'TimePrimitivePropertyType',
        propertyInfos: [{
            name: 'abstractTimePrimitive',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTimePrimitive',
            typeInfo: '.AbstractTimePrimitiveType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractTopologyType',
        baseTypeInfo: '.AbstractGMLType'
      }, {
        localName: 'QuantityExtentType',
        baseTypeInfo: '.MeasureOrNilReasonListType'
      }, {
        localName: 'MDUsagePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Usage_PropertyType'
        },
        propertyInfos: [{
            name: 'mdUsage',
            required: true,
            elementName: {
              localPart: 'MD_Usage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDUsageType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EXSpatialTemporalExtentType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_SpatialTemporalExtent_Type'
        },
        baseTypeInfo: '.EXTemporalExtentType',
        propertyInfos: [{
            name: 'spatialExtent',
            required: true,
            collection: true,
            elementName: {
              localPart: 'spatialExtent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXGeographicExtentPropertyType'
          }]
      }, {
        localName: 'ConversionType',
        baseTypeInfo: '.AbstractGeneralConversionType',
        propertyInfos: [{
            name: 'method',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.OperationMethodPropertyType',
            type: 'elementRef'
          }, {
            name: 'parameterValue',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AbstractGeneralParameterValuePropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'EXGeographicExtentPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_GeographicExtent_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractEXGeographicExtent',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractEX_GeographicExtent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractEXGeographicExtentType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DirectedNodePropertyType',
        propertyInfos: [{
            name: 'node',
            required: true,
            elementName: 'Node',
            typeInfo: '.NodeType'
          }, {
            name: 'orientation',
            values: ['-', '+'],
            attributeName: {
              localPart: 'orientation'
            },
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDLegalConstraintsType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_LegalConstraints_Type'
        },
        baseTypeInfo: '.MDConstraintsType',
        propertyInfos: [{
            name: 'accessConstraints',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'accessConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRestrictionCodePropertyType'
          }, {
            name: 'useConstraints',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'useConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRestrictionCodePropertyType'
          }, {
            name: 'otherConstraints',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'otherConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'CellSpaceBoundaryType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceBoundaryType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'duality',
            elementName: {
              localPart: 'duality',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.TransitionPropertyType'
          }, {
            name: 'cellSpaceBoundaryGeometry',
            elementName: {
              localPart: 'cellSpaceBoundaryGeometry',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceBoundaryGeometryType'
          }, {
            name: 'externalReference',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'externalReference',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.ExternalReferenceType'
          }]
      }, {
        localName: 'CISeriesPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Series_PropertyType'
        },
        propertyInfos: [{
            name: 'ciSeries',
            required: true,
            elementName: {
              localPart: 'CI_Series',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CISeriesType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'GridLimitsType',
        propertyInfos: [{
            name: 'gridEnvelope',
            required: true,
            elementName: 'GridEnvelope',
            typeInfo: '.GridEnvelopeType'
          }]
      }, {
        localName: 'MDDimensionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Dimension_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDimension',
            required: true,
            elementName: {
              localPart: 'MD_Dimension',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDimensionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'PTLocaleContainerType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'PT_LocaleContainer_Type'
        },
        propertyInfos: [{
            name: 'description',
            required: true,
            elementName: {
              localPart: 'description',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'locale',
            required: true,
            elementName: {
              localPart: 'locale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.PTLocalePropertyType'
          }, {
            name: 'date',
            required: true,
            collection: true,
            elementName: {
              localPart: 'date',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIDatePropertyType'
          }, {
            name: 'responsibleParty',
            required: true,
            collection: true,
            elementName: {
              localPart: 'responsibleParty',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }, {
            name: 'localisedString',
            required: true,
            collection: true,
            elementName: {
              localPart: 'localisedString',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LocalisedCharacterStringPropertyType'
          }]
      }, {
        localName: 'ScalePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Scale_PropertyType'
        },
        propertyInfos: [{
            name: 'scale',
            required: true,
            elementName: {
              localPart: 'Scale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.ScaleType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SurfacePatchArrayPropertyType',
        propertyInfos: [{
            name: 'abstractSurfacePatch',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSurfacePatch',
            typeInfo: '.AbstractSurfacePatchType',
            type: 'elementRef'
          }]
      }, {
        localName: 'OperationParameterType',
        baseTypeInfo: '.AbstractGeneralOperationParameterType'
      }, {
        localName: 'UomAnglePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomAngle_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SpeedType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'numDerivativesAtStart',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'numDerivativesAtStart'
            },
            type: 'attribute'
          }, {
            name: 'numDerivativesAtEnd',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'numDerivativesAtEnd'
            },
            type: 'attribute'
          }, {
            name: 'numDerivativeInterior',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'numDerivativeInterior'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ConcatenatedOperationType',
        baseTypeInfo: '.AbstractCoordinateOperationType',
        propertyInfos: [{
            name: 'coordOperation',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CoordinateOperationPropertyType',
            type: 'elementRef'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimePositionType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list'
            },
            type: 'value'
          }, {
            name: 'frame',
            attributeName: {
              localPart: 'frame'
            },
            type: 'attribute'
          }, {
            name: 'calendarEraName',
            attributeName: {
              localPart: 'calendarEraName'
            },
            type: 'attribute'
          }, {
            name: 'indeterminatePosition',
            typeInfo: '.TimeIndeterminateValueType',
            attributeName: {
              localPart: 'indeterminatePosition'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RangeSetType',
        propertyInfos: [{
            name: 'valueArray',
            required: true,
            collection: true,
            elementName: 'ValueArray',
            typeInfo: '.ValueArrayType'
          }, {
            name: 'abstractScalarValueList',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractScalarValueList',
            typeInfo: 'AnyType',
            type: 'elementRef'
          }, {
            name: 'dataBlock',
            required: true,
            elementName: 'DataBlock',
            typeInfo: '.DataBlockType'
          }, {
            name: 'file',
            required: true,
            elementName: 'File',
            typeInfo: '.FileType'
          }]
      }, {
        localName: 'MDBrowseGraphicPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_BrowseGraphic_PropertyType'
        },
        propertyInfos: [{
            name: 'mdBrowseGraphic',
            required: true,
            elementName: {
              localPart: 'MD_BrowseGraphic',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDBrowseGraphicType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CITelephonePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Telephone_PropertyType'
        },
        propertyInfos: [{
            name: 'ciTelephone',
            required: true,
            elementName: {
              localPart: 'CI_Telephone',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CITelephoneType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'RSReferenceSystemPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'RS_ReferenceSystem_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractRSReferenceSystem',
            required: true,
            elementName: {
              localPart: 'AbstractRS_ReferenceSystem',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractRSReferenceSystemType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractGriddedSurfaceType.Rows',
        typeName: null,
        propertyInfos: [{
            name: 'row',
            required: true,
            collection: true,
            elementName: 'Row',
            typeInfo: '.AbstractGriddedSurfaceType.Rows.Row'
          }]
      }, {
        localName: 'SpaceLayerMemberType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'SpaceLayerMemberType'
        },
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'spaceLayer',
            required: true,
            elementName: {
              localPart: 'SpaceLayer',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SpaceLayerType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'LocalisedCharacterStringType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LocalisedCharacterString_Type'
        },
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id'
            },
            type: 'attribute'
          }, {
            name: 'locale',
            attributeName: {
              localPart: 'locale'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SecondDefiningParameter',
        typeName: null,
        propertyInfos: [{
            name: 'inverseFlattening',
            required: true,
            typeInfo: '.MeasureType'
          }, {
            name: 'semiMinorAxis',
            required: true,
            typeInfo: '.LengthType'
          }, {
            name: 'isSphere',
            required: true,
            typeInfo: 'Boolean'
          }]
      }, {
        localName: 'MeasureOrNilReasonListType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list'
            },
            type: 'value'
          }, {
            name: 'uom',
            required: true,
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TypeNameType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'TypeName_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'aName',
            required: true,
            elementName: {
              localPart: 'aName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MDPixelOrientationCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_PixelOrientationCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdPixelOrientationCode',
            required: true,
            elementName: {
              localPart: 'MD_PixelOrientationCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDPixelOrientationCodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQQuantitativeResultPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_QuantitativeResult_PropertyType'
        },
        propertyInfos: [{
            name: 'dqQuantitativeResult',
            required: true,
            elementName: {
              localPart: 'DQ_QuantitativeResult',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQQuantitativeResultType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'InterLayerConnectionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'InterLayerConnectionType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'typeOfTopoExpression',
            elementName: {
              localPart: 'typeOfTopoExpression',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            }
          }, {
            name: 'comment',
            elementName: {
              localPart: 'comment',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            }
          }, {
            name: 'interConnects',
            required: true,
            minOccurs: 2,
            maxOccurs: 2,
            collection: true,
            elementName: {
              localPart: 'interConnects',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.StatePropertyType'
          }, {
            name: 'connectedLayers',
            required: true,
            minOccurs: 2,
            maxOccurs: 2,
            collection: true,
            elementName: {
              localPart: 'ConnectedLayers',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SpaceLayerPropertyType'
          }]
      }, {
        localName: 'SolidPropertyType',
        propertyInfos: [{
            name: 'abstractSolid',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSolid',
            typeInfo: '.AbstractSolidType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SolidArrayPropertyType',
        propertyInfos: [{
            name: 'abstractSolid',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSolid',
            typeInfo: '.AbstractSolidType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CubicSplineType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'vectorAtStart',
            required: true,
            typeInfo: '.VectorType'
          }, {
            name: 'vectorAtEnd',
            required: true,
            typeInfo: '.VectorType'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }, {
            name: 'degree',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'degree'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDCoverageContentTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_CoverageContentTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdCoverageContentTypeCode',
            required: true,
            elementName: {
              localPart: 'MD_CoverageContentTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'QuantityPropertyType',
        propertyInfos: [{
            name: 'quantity',
            required: true,
            elementName: 'Quantity',
            typeInfo: '.Quantity'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'LineStringSegmentType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CIContactType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Contact_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'phone',
            elementName: {
              localPart: 'phone',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CITelephonePropertyType'
          }, {
            name: 'address',
            elementName: {
              localPart: 'address',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIAddressPropertyType'
          }, {
            name: 'onlineResource',
            elementName: {
              localPart: 'onlineResource',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIOnlineResourcePropertyType'
          }, {
            name: 'hoursOfService',
            elementName: {
              localPart: 'hoursOfService',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'contactInstructions',
            elementName: {
              localPart: 'contactInstructions',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'DSOtherAggregatePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_OtherAggregate_PropertyType'
        },
        propertyInfos: [{
            name: 'dsOtherAggregate',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'DS_OtherAggregate',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSOtherAggregateType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQTemporalValidityPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TemporalValidity_PropertyType'
        },
        propertyInfos: [{
            name: 'dqTemporalValidity',
            required: true,
            elementName: {
              localPart: 'DQ_TemporalValidity',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQTemporalValidityType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'Quantity',
        typeName: null,
        baseTypeInfo: '.MeasureType',
        propertyInfos: [{
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ReferenceType',
        propertyInfos: [{
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CoordinateSystemAxisType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'axisAbbrev',
            required: true,
            typeInfo: '.CodeType'
          }, {
            name: 'axisDirection',
            required: true,
            typeInfo: '.CodeWithAuthorityType'
          }, {
            name: 'minimumValue',
            typeInfo: 'Double'
          }, {
            name: 'maximumValue',
            typeInfo: 'Double'
          }, {
            name: 'rangeMeaning',
            typeInfo: '.CodeWithAuthorityType'
          }, {
            name: 'uom',
            required: true,
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQDomainConsistencyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_DomainConsistency_PropertyType'
        },
        propertyInfos: [{
            name: 'dqDomainConsistency',
            required: true,
            elementName: {
              localPart: 'DQ_DomainConsistency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQDomainConsistencyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SpaceLayerPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'SpaceLayerPropertyType'
        },
        propertyInfos: [{
            name: 'spaceLayer',
            required: true,
            elementName: {
              localPart: 'SpaceLayer',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SpaceLayerType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CurvePropertyType',
        propertyInfos: [{
            name: 'abstractCurve',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCurve',
            typeInfo: '.AbstractCurveType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'NumberPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Number_PropertyType'
        },
        propertyInfos: [{
            name: 'real',
            required: true,
            elementName: {
              localPart: 'Real',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Double'
          }, {
            name: 'decimal',
            required: true,
            elementName: {
              localPart: 'Decimal',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'integer',
            required: true,
            elementName: {
              localPart: 'Integer',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Integer'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TopoSurfaceType',
        baseTypeInfo: '.AbstractTopologyType',
        propertyInfos: [{
            name: 'directedFace',
            required: true,
            collection: true,
            typeInfo: '.DirectedFacePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeodesicType',
        baseTypeInfo: '.GeodesicStringType'
      }, {
        localName: 'CompositeValueType',
        baseTypeInfo: '.AbstractGMLType',
        propertyInfos: [{
            name: 'valueComponent',
            minOccurs: 0,
            collection: true,
            typeInfo: '.ValuePropertyType'
          }, {
            name: 'valueComponents',
            typeInfo: '.ValueArrayPropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSStereoMateType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_StereoMate_Type'
        },
        baseTypeInfo: '.DSOtherAggregateType'
      }, {
        localName: 'AbstractGeometryType',
        baseTypeInfo: '.AbstractGMLType',
        propertyInfos: [{
            name: 'srsName',
            attributeName: {
              localPart: 'srsName'
            },
            type: 'attribute'
          }, {
            name: 'srsDimension',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'srsDimension'
            },
            type: 'attribute'
          }, {
            name: 'axisLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'axisLabels'
            },
            type: 'attribute'
          }, {
            name: 'uomLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'uomLabels'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeodeticDatumType',
        baseTypeInfo: '.AbstractDatumType',
        propertyInfos: [{
            name: 'primeMeridian',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.PrimeMeridianPropertyType',
            type: 'elementRef'
          }, {
            name: 'ellipsoid',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.EllipsoidPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'DQTemporalConsistencyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TemporalConsistency_PropertyType'
        },
        propertyInfos: [{
            name: 'dqTemporalConsistency',
            required: true,
            elementName: {
              localPart: 'DQ_TemporalConsistency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQTemporalConsistencyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MemberNamePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'MemberName_PropertyType'
        },
        propertyInfos: [{
            name: 'memberName',
            required: true,
            elementName: {
              localPart: 'MemberName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.MemberNameType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'IndoorFeaturesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'IndoorFeaturesType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'primalSpaceFeatures',
            elementName: {
              localPart: 'primalSpaceFeatures',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.PrimalSpaceFeaturesPropertyType'
          }, {
            name: 'multiLayeredGraph',
            elementName: {
              localPart: 'multiLayeredGraph',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.MultiLayeredGraphPropertyType'
          }]
      }, {
        localName: 'MDDimensionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Dimension_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'dimensionName',
            required: true,
            elementName: {
              localPart: 'dimensionName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDimensionNameTypeCodePropertyType'
          }, {
            name: 'dimensionSize',
            required: true,
            elementName: {
              localPart: 'dimensionSize',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'resolution',
            elementName: {
              localPart: 'resolution',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MeasurePropertyType'
          }]
      }, {
        localName: 'EllipsoidalCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'AffineCSPropertyType',
        propertyInfos: [{
            name: 'affineCS',
            required: true,
            elementName: 'AffineCS',
            typeInfo: '.AffineCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractSurfaceType',
        baseTypeInfo: '.AbstractGeometricPrimitiveType'
      }, {
        localName: 'CodeListValueType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'CodeListValue_Type'
        },
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'codeList',
            required: true,
            attributeName: {
              localPart: 'codeList'
            },
            type: 'attribute'
          }, {
            name: 'codeListValue',
            required: true,
            attributeName: {
              localPart: 'codeListValue'
            },
            type: 'attribute'
          }, {
            name: 'codeSpace',
            attributeName: {
              localPart: 'codeSpace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TopoPointType',
        baseTypeInfo: '.AbstractTopologyType',
        propertyInfos: [{
            name: 'directedNode',
            required: true,
            typeInfo: '.DirectedNodePropertyType'
          }]
      }, {
        localName: 'TransformationType',
        baseTypeInfo: '.AbstractGeneralTransformationType',
        propertyInfos: [{
            name: 'method',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.OperationMethodPropertyType',
            type: 'elementRef'
          }, {
            name: 'parameterValue',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AbstractGeneralParameterValuePropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'MDRangeDimensionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_RangeDimension_PropertyType'
        },
        propertyInfos: [{
            name: 'mdRangeDimension',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'MD_RangeDimension',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRangeDimensionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TransitionType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'TransitionType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'weight',
            elementName: {
              localPart: 'weight',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: 'Double'
          }, {
            name: 'connects',
            required: true,
            minOccurs: 2,
            maxOccurs: 2,
            collection: true,
            elementName: {
              localPart: 'connects',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.StatePropertyType'
          }, {
            name: 'duality',
            elementName: {
              localPart: 'duality',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceBoundaryPropertyType'
          }, {
            name: 'geometry',
            elementName: {
              localPart: 'geometry',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'FeatureCollectionType',
        baseTypeInfo: '.AbstractFeatureCollectionType'
      }, {
        localName: 'InterLayerConnectionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'InterLayerConnectionPropertyType'
        },
        propertyInfos: [{
            name: 'interLayerConnection',
            required: true,
            elementName: {
              localPart: 'InterLayerConnection',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.InterLayerConnectionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDSpatialRepresentationTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_SpatialRepresentationTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdSpatialRepresentationTypeCode',
            required: true,
            elementName: {
              localPart: 'MD_SpatialRepresentationTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RSIdentifierPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'RS_Identifier_PropertyType'
        },
        propertyInfos: [{
            name: 'rsIdentifier',
            required: true,
            elementName: {
              localPart: 'RS_Identifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RSIdentifierType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDGridSpatialRepresentationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_GridSpatialRepresentation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdGridSpatialRepresentation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'MD_GridSpatialRepresentation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDGridSpatialRepresentationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CITelephoneType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Telephone_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'voice',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'voice',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'facsimile',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'facsimile',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'FaceType',
        baseTypeInfo: '.AbstractTopoPrimitiveType',
        propertyInfos: [{
            name: 'isolated',
            minOccurs: 0,
            collection: true,
            typeInfo: '.NodePropertyType'
          }, {
            name: 'directedEdge',
            required: true,
            collection: true,
            typeInfo: '.DirectedEdgePropertyType'
          }, {
            name: 'directedTopoSolid',
            minOccurs: 0,
            maxOccurs: 2,
            collection: true,
            typeInfo: '.DirectedTopoSolidPropertyType'
          }, {
            name: 'surfaceProperty',
            typeInfo: '.SurfacePropertyType'
          }, {
            name: 'universal',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'universal'
            },
            type: 'attribute'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GMPointPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gss',
          localPart: 'GM_Point_PropertyType'
        },
        propertyInfos: [{
            name: 'point',
            required: true,
            elementName: 'Point',
            typeInfo: '.PointType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDUsageType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Usage_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'specificUsage',
            required: true,
            elementName: {
              localPart: 'specificUsage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'usageDateTime',
            elementName: {
              localPart: 'usageDateTime',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DateTimePropertyType'
          }, {
            name: 'userDeterminedLimitations',
            elementName: {
              localPart: 'userDeterminedLimitations',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'userContactInfo',
            required: true,
            collection: true,
            elementName: {
              localPart: 'userContactInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }]
      }, {
        localName: 'CoverageFunctionType',
        propertyInfos: [{
            name: 'mappingRule',
            required: true,
            elementName: 'MappingRule',
            typeInfo: '.StringOrRefType'
          }, {
            name: 'coverageMappingRule',
            required: true,
            elementName: 'CoverageMappingRule',
            typeInfo: '.MappingRuleType'
          }, {
            name: 'gridFunction',
            required: true,
            elementName: 'GridFunction',
            typeInfo: '.GridFunctionType'
          }]
      }, {
        localName: 'TimeClockType',
        baseTypeInfo: '.TimeReferenceSystemType',
        propertyInfos: [{
            name: 'referenceEvent',
            required: true,
            typeInfo: '.StringOrRefType'
          }, {
            name: 'referenceTime',
            required: true,
            typeInfo: 'Time'
          }, {
            name: 'utcReference',
            required: true,
            typeInfo: 'Time'
          }, {
            name: 'dateBasis',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TimeCalendarPropertyType'
          }]
      }, {
        localName: 'AbstractGriddedSurfaceType.Rows.Row',
        typeName: null,
        propertyInfos: [{
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'geometricPositionGroup',
            required: true,
            collection: true,
            elementTypeInfos: [{
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elements'
          }]
      }, {
        localName: 'EnvelopeWithTimePeriodType',
        baseTypeInfo: '.EnvelopeType',
        propertyInfos: [{
            name: 'beginPosition',
            required: true,
            typeInfo: '.TimePositionType'
          }, {
            name: 'endPosition',
            required: true,
            typeInfo: '.TimePositionType'
          }, {
            name: 'frame',
            attributeName: {
              localPart: 'frame'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractMDContentInformationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractMD_ContentInformation_Type'
        },
        baseTypeInfo: '.AbstractObjectType'
      }, {
        localName: 'GeodesicStringType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'geometricPositionGroup',
            required: true,
            minOccurs: 2,
            collection: true,
            elementTypeInfos: [{
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elements'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDSAggregateType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDS_Aggregate_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'composedOf',
            required: true,
            collection: true,
            elementName: {
              localPart: 'composedOf',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSDataSetPropertyType'
          }, {
            name: 'seriesMetadata',
            required: true,
            collection: true,
            elementName: {
              localPart: 'seriesMetadata',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMetadataPropertyType'
          }, {
            name: 'subset',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'subset',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSAggregatePropertyType'
          }, {
            name: 'superset',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'superset',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSAggregatePropertyType'
          }]
      }, {
        localName: 'DirectedFacePropertyType',
        propertyInfos: [{
            name: 'face',
            required: true,
            elementName: 'Face',
            typeInfo: '.FaceType'
          }, {
            name: 'orientation',
            values: ['-', '+'],
            attributeName: {
              localPart: 'orientation'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ImageCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'cartesianCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CartesianCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'affineCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AffineCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'usesObliqueCartesianCS',
            required: true,
            typeInfo: '.ObliqueCartesianCSPropertyType'
          }, {
            name: 'imageDatum',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.ImageDatumPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'InlinePropertyType',
        propertyInfos: [{
            name: 'any',
            required: true,
            allowDom: false,
            mixed: false,
            type: 'anyElement'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractCRSType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'domainOfValidity',
            minOccurs: 0,
            collection: true,
            typeInfo: '.DomainOfValidity'
          }, {
            name: 'scope',
            required: true,
            collection: true
          }]
      }, {
        localName: 'TemporalCRSPropertyType',
        propertyInfos: [{
            name: 'temporalCRS',
            required: true,
            elementName: 'TemporalCRS',
            typeInfo: '.TemporalCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQQuantitativeResultType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_QuantitativeResult_Type'
        },
        baseTypeInfo: '.AbstractDQResultType',
        propertyInfos: [{
            name: 'valueType',
            elementName: {
              localPart: 'valueType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RecordTypePropertyType'
          }, {
            name: 'valueUnit',
            required: true,
            elementName: {
              localPart: 'valueUnit',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.UnitOfMeasurePropertyType'
          }, {
            name: 'errorStatistic',
            elementName: {
              localPart: 'errorStatistic',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'value',
            required: true,
            collection: true,
            elementName: {
              localPart: 'value',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RecordPropertyType'
          }]
      }, {
        localName: 'ProjectedCRSPropertyType',
        propertyInfos: [{
            name: 'projectedCRS',
            required: true,
            elementName: 'ProjectedCRS',
            typeInfo: '.ProjectedCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ResourceType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'resourceType'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            required: true,
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'label',
            typeInfo: 'NCName',
            type: 'attribute'
          }]
      }, {
        localName: 'ValuePropertyType',
        propertyInfos: [{
            name: 'abstractValue',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractValue',
            typeInfo: 'AnyType',
            type: 'elementRef'
          }, {
            name: 'abstractGeometry',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'abstractTimeObject',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTimeObject',
            typeInfo: '.AbstractTimeObjectType',
            type: 'elementRef'
          }, {
            name: '_null',
            required: true,
            elementName: 'Null',
            typeInfo: {
              type: 'list'
            }
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MultiLayeredGraphPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'MultiLayeredGraphPropertyType'
        },
        propertyInfos: [{
            name: 'multiLayeredGraph',
            required: true,
            elementName: {
              localPart: 'MultiLayeredGraph',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.MultiLayeredGraphType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CellSpaceBoundaryMemberType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceBoundaryMemberType'
        },
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'cellSpaceBoundary',
            required: true,
            elementName: {
              localPart: 'CellSpaceBoundary',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceBoundaryType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'GridFunctionType',
        propertyInfos: [{
            name: 'sequenceRule',
            typeInfo: '.SequenceRuleType'
          }, {
            name: 'startPoint',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Integer'
            }
          }]
      }, {
        localName: 'AbstractGeneralDerivedCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'conversion',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.GeneralConversionPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'SequenceRuleType',
        propertyInfos: [{
            name: 'value',
            typeInfo: '.SequenceRuleEnumeration',
            type: 'value'
          }, {
            name: 'order',
            values: ['+x+y', '+y+x', '+x-y', '-x-y'],
            attributeName: {
              localPart: 'order'
            },
            type: 'attribute'
          }, {
            name: 'axisOrder',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'axisOrder'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LinearRingPropertyType',
        propertyInfos: [{
            name: 'linearRing',
            required: true,
            elementName: 'LinearRing',
            typeInfo: '.LinearRingType'
          }]
      }, {
        localName: 'MDKeywordTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_KeywordTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdKeywordTypeCode',
            required: true,
            elementName: {
              localPart: 'MD_KeywordTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CoordinatesType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'decimal',
            attributeName: {
              localPart: 'decimal'
            },
            type: 'attribute'
          }, {
            name: 'cs',
            attributeName: {
              localPart: 'cs'
            },
            type: 'attribute'
          }, {
            name: 'ts',
            attributeName: {
              localPart: 'ts'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ImageDatumType',
        baseTypeInfo: '.AbstractDatumType',
        propertyInfos: [{
            name: 'pixelInCell',
            required: true,
            typeInfo: '.CodeWithAuthorityType'
          }]
      }, {
        localName: 'MDApplicationSchemaInformationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ApplicationSchemaInformation_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: 'schemaLanguage',
            required: true,
            elementName: {
              localPart: 'schemaLanguage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'constraintLanguage',
            required: true,
            elementName: {
              localPart: 'constraintLanguage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'schemaAscii',
            elementName: {
              localPart: 'schemaAscii',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'graphicsFile',
            elementName: {
              localPart: 'graphicsFile',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BinaryPropertyType'
          }, {
            name: 'softwareDevelopmentFile',
            elementName: {
              localPart: 'softwareDevelopmentFile',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BinaryPropertyType'
          }, {
            name: 'softwareDevelopmentFileFormat',
            elementName: {
              localPart: 'softwareDevelopmentFileFormat',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MDGridSpatialRepresentationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_GridSpatialRepresentation_Type'
        },
        baseTypeInfo: '.AbstractMDSpatialRepresentationType',
        propertyInfos: [{
            name: 'numberOfDimensions',
            required: true,
            elementName: {
              localPart: 'numberOfDimensions',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'axisDimensionProperties',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'axisDimensionProperties',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDimensionPropertyType'
          }, {
            name: 'cellGeometry',
            required: true,
            elementName: {
              localPart: 'cellGeometry',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDCellGeometryCodePropertyType'
          }, {
            name: 'transformationParameterAvailability',
            required: true,
            elementName: {
              localPart: 'transformationParameterAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }]
      }, {
        localName: 'AbstractMDSpatialRepresentationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractMD_SpatialRepresentation_Type'
        },
        baseTypeInfo: '.AbstractObjectType'
      }, {
        localName: 'TimeNodePropertyType',
        propertyInfos: [{
            name: 'timeNode',
            required: true,
            elementName: 'TimeNode',
            typeInfo: '.TimeNodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OrientableSurfaceType',
        baseTypeInfo: '.AbstractSurfaceType',
        propertyInfos: [{
            name: 'baseSurface',
            required: true,
            typeInfo: '.SurfacePropertyType'
          }, {
            name: 'orientation',
            values: ['-', '+'],
            attributeName: {
              localPart: 'orientation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LineStringSegmentArrayPropertyType',
        propertyInfos: [{
            name: 'lineStringSegment',
            minOccurs: 0,
            collection: true,
            elementName: 'LineStringSegment',
            typeInfo: '.LineStringSegmentType'
          }]
      }, {
        localName: 'DynamicFeatureCollectionType',
        baseTypeInfo: '.DynamicFeatureType',
        propertyInfos: [{
            name: 'dynamicMembers',
            required: true,
            typeInfo: '.DynamicFeatureMemberType'
          }]
      }, {
        localName: 'MDMetadataExtensionInformationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MetadataExtensionInformation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMetadataExtensionInformation',
            required: true,
            elementName: {
              localPart: 'MD_MetadataExtensionInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMetadataExtensionInformationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDIdentifierType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Identifier_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'authority',
            elementName: {
              localPart: 'authority',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: 'code',
            required: true,
            elementName: {
              localPart: 'code',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'DSInitiativeType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Initiative_Type'
        },
        baseTypeInfo: '.AbstractDSAggregateType'
      }, {
        localName: 'EXVerticalExtentType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_VerticalExtent_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'minimumValue',
            required: true,
            elementName: {
              localPart: 'minimumValue',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'maximumValue',
            required: true,
            elementName: {
              localPart: 'maximumValue',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'verticalCRS',
            required: true,
            elementName: {
              localPart: 'verticalCRS',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.SCCRSPropertyType'
          }]
      }, {
        localName: 'LIProcessStepPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LI_ProcessStep_PropertyType'
        },
        propertyInfos: [{
            name: 'liProcessStep',
            required: true,
            elementName: {
              localPart: 'LI_ProcessStep',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LIProcessStepType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQCompletenessPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_Completeness_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQCompleteness',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_Completeness',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQCompletenessType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'UomTimePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomTime_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CompoundCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'componentReferenceSystem',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.SingleCRSPropertyType',
            type: 'elementRef'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'VectorType',
        baseTypeInfo: '.DirectPositionType'
      }, {
        localName: 'GeometryArrayPropertyType',
        propertyInfos: [{
            name: 'abstractGeometry',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSPlatformPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Platform_PropertyType'
        },
        propertyInfos: [{
            name: 'dsPlatform',
            required: true,
            elementName: {
              localPart: 'DS_Platform',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSPlatformType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'PTLocalePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'PT_Locale_PropertyType'
        },
        propertyInfos: [{
            name: 'ptLocale',
            required: true,
            elementName: {
              localPart: 'PT_Locale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.PTLocaleType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ConventionalUnitType',
        baseTypeInfo: '.UnitDefinitionType',
        propertyInfos: [{
            name: 'conversionToPreferredUnit',
            required: true,
            typeInfo: '.ConversionToPreferredUnitType'
          }, {
            name: 'roughConversionToPreferredUnit',
            required: true,
            typeInfo: '.ConversionToPreferredUnitType'
          }, {
            name: 'derivationUnitTerm',
            minOccurs: 0,
            collection: true,
            typeInfo: '.DerivationUnitTermType'
          }]
      }, {
        localName: 'FeatureArrayPropertyType',
        propertyInfos: [{
            name: 'abstractFeature',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractFeature',
            typeInfo: '.AbstractFeatureType',
            type: 'elementRef'
          }]
      }, {
        localName: 'MDDistributionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Distribution_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDistribution',
            required: true,
            elementName: {
              localPart: 'MD_Distribution',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDistributionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDRepresentativeFractionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_RepresentativeFraction_PropertyType'
        },
        propertyInfos: [{
            name: 'mdRepresentativeFraction',
            required: true,
            elementName: {
              localPart: 'MD_RepresentativeFraction',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRepresentativeFractionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'KnotPropertyType',
        propertyInfos: [{
            name: 'knot',
            required: true,
            elementName: 'Knot',
            typeInfo: '.KnotType'
          }]
      }, {
        localName: 'CISeriesType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Series_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'name',
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'issueIdentification',
            elementName: {
              localPart: 'issueIdentification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'page',
            elementName: {
              localPart: 'page',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'StringOrRefType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CodeType',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'codeSpace',
            attributeName: {
              localPart: 'codeSpace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeOrdinalEraType',
        baseTypeInfo: '.DefinitionType',
        propertyInfos: [{
            name: 'relatedTime',
            minOccurs: 0,
            collection: true,
            typeInfo: '.RelatedTimeType'
          }, {
            name: 'start',
            typeInfo: '.TimeNodePropertyType'
          }, {
            name: 'end',
            typeInfo: '.TimeNodePropertyType'
          }, {
            name: 'extent',
            typeInfo: '.TimePeriodPropertyType'
          }, {
            name: 'member',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TimeOrdinalEraPropertyType'
          }, {
            name: 'group',
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'ConversionToPreferredUnitType',
        baseTypeInfo: '.UnitOfMeasureType',
        propertyInfos: [{
            name: 'factor',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'formula',
            required: true,
            typeInfo: '.FormulaType'
          }]
      }, {
        localName: 'TimeIntervalLengthType',
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Decimal',
            type: 'value'
          }, {
            name: 'unit',
            required: true,
            attributeName: {
              localPart: 'unit'
            },
            type: 'attribute'
          }, {
            name: 'radix',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'radix'
            },
            type: 'attribute'
          }, {
            name: 'factor',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'factor'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MultiSolidType',
        baseTypeInfo: '.AbstractGeometricAggregateType',
        propertyInfos: [{
            name: 'solidMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.SolidPropertyType'
          }, {
            name: 'solidMembers',
            typeInfo: '.SolidArrayPropertyType'
          }]
      }, {
        localName: 'DynamicFeatureType',
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'validTime',
            typeInfo: '.TimePrimitivePropertyType'
          }, {
            name: 'history',
            mixed: false,
            allowDom: false,
            typeInfo: '.HistoryPropertyType',
            type: 'elementRef'
          }, {
            name: 'dataSource',
            typeInfo: '.StringOrRefType'
          }, {
            name: 'dataSourceReference',
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'TimeCoordinateSystemType',
        baseTypeInfo: '.TimeReferenceSystemType',
        propertyInfos: [{
            name: 'originPosition',
            required: true,
            typeInfo: '.TimePositionType'
          }, {
            name: 'origin',
            required: true,
            typeInfo: '.TimeInstantPropertyType'
          }, {
            name: 'interval',
            required: true,
            typeInfo: '.TimeIntervalLengthType'
          }]
      }, {
        localName: 'PrimeMeridianPropertyType',
        propertyInfos: [{
            name: 'primeMeridian',
            required: true,
            elementName: 'PrimeMeridian',
            typeInfo: '.PrimeMeridianType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSInitiativeTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_InitiativeTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'dsInitiativeTypeCode',
            required: true,
            elementName: {
              localPart: 'DS_InitiativeTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TemporalDatumBaseType',
        baseTypeInfo: '.AbstractDatumType'
      }, {
        localName: 'CircleType',
        baseTypeInfo: '.ArcType'
      }, {
        localName: 'EXExtentPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_Extent_PropertyType'
        },
        propertyInfos: [{
            name: 'exExtent',
            required: true,
            elementName: {
              localPart: 'EX_Extent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXExtentType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'PolygonPatchType',
        baseTypeInfo: '.AbstractSurfacePatchType',
        propertyInfos: [{
            name: 'exterior',
            typeInfo: '.AbstractRingPropertyType'
          }, {
            name: 'interior',
            minOccurs: 0,
            collection: true,
            typeInfo: '.AbstractRingPropertyType'
          }, {
            name: 'interpolation',
            typeInfo: '.SurfaceInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDDatatypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DatatypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDatatypeCode',
            required: true,
            elementName: {
              localPart: 'MD_DatatypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'UnlimitedIntegerPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UnlimitedInteger_PropertyType'
        },
        propertyInfos: [{
            name: 'unlimitedInteger',
            required: true,
            elementName: {
              localPart: 'UnlimitedInteger',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.UnlimitedIntegerType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OperationParameterPropertyType',
        propertyInfos: [{
            name: 'operationParameter',
            required: true,
            elementName: 'OperationParameter',
            typeInfo: '.OperationParameterType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TitleEltType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'titleEltType'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            required: true,
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'lang',
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MultiCurveType',
        baseTypeInfo: '.AbstractGeometricAggregateType',
        propertyInfos: [{
            name: 'curveMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'curveMembers',
            typeInfo: '.CurveArrayPropertyType'
          }]
      }, {
        localName: 'MDServiceIdentificationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ServiceIdentification_Type'
        },
        baseTypeInfo: '.AbstractMDIdentificationType'
      }, {
        localName: 'PassThroughOperationType',
        baseTypeInfo: '.AbstractCoordinateOperationType',
        propertyInfos: [{
            name: 'modifiedCoordinate',
            required: true,
            collection: true,
            typeInfo: 'PositiveInteger'
          }, {
            name: 'coordOperation',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CoordinateOperationPropertyType',
            type: 'elementRef'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractContinuousCoverageType',
        baseTypeInfo: '.AbstractCoverageType',
        propertyInfos: [{
            name: 'coverageFunction',
            typeInfo: '.CoverageFunctionType'
          }]
      }, {
        localName: 'GMObjectPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gss',
          localPart: 'GM_Object_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractGeometry',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDFeatureCatalogueDescriptionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_FeatureCatalogueDescription_PropertyType'
        },
        propertyInfos: [{
            name: 'mdFeatureCatalogueDescription',
            required: true,
            elementName: {
              localPart: 'MD_FeatureCatalogueDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDFeatureCatalogueDescriptionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDMetadataType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Metadata_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'fileIdentifier',
            elementName: {
              localPart: 'fileIdentifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'language',
            elementName: {
              localPart: 'language',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'characterSet',
            elementName: {
              localPart: 'characterSet',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDCharacterSetCodePropertyType'
          }, {
            name: 'parentIdentifier',
            elementName: {
              localPart: 'parentIdentifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'hierarchyLevel',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'hierarchyLevel',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDScopeCodePropertyType'
          }, {
            name: 'hierarchyLevelName',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'hierarchyLevelName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'contact',
            required: true,
            collection: true,
            elementName: {
              localPart: 'contact',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }, {
            name: 'dateStamp',
            required: true,
            elementName: {
              localPart: 'dateStamp',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DatePropertyType'
          }, {
            name: 'metadataStandardName',
            elementName: {
              localPart: 'metadataStandardName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'metadataStandardVersion',
            elementName: {
              localPart: 'metadataStandardVersion',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'dataSetURI',
            elementName: {
              localPart: 'dataSetURI',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'locale',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'locale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.PTLocalePropertyType'
          }, {
            name: 'spatialRepresentationInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'spatialRepresentationInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDSpatialRepresentationPropertyType'
          }, {
            name: 'referenceSystemInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'referenceSystemInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDReferenceSystemPropertyType'
          }, {
            name: 'metadataExtensionInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'metadataExtensionInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMetadataExtensionInformationPropertyType'
          }, {
            name: 'identificationInfo',
            required: true,
            collection: true,
            elementName: {
              localPart: 'identificationInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentificationPropertyType'
          }, {
            name: 'contentInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'contentInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDContentInformationPropertyType'
          }, {
            name: 'distributionInfo',
            elementName: {
              localPart: 'distributionInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDistributionPropertyType'
          }, {
            name: 'dataQualityInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'dataQualityInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQDataQualityPropertyType'
          }, {
            name: 'portrayalCatalogueInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'portrayalCatalogueInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDPortrayalCatalogueReferencePropertyType'
          }, {
            name: 'metadataConstraints',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'metadataConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDConstraintsPropertyType'
          }, {
            name: 'applicationSchemaInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'applicationSchemaInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDApplicationSchemaInformationPropertyType'
          }, {
            name: 'metadataMaintenance',
            elementName: {
              localPart: 'metadataMaintenance',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMaintenanceInformationPropertyType'
          }, {
            name: 'series',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'series',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSAggregatePropertyType'
          }, {
            name: 'describes',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'describes',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSDataSetPropertyType'
          }, {
            name: 'propertyType',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'propertyType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }, {
            name: 'featureType',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'featureType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }, {
            name: 'featureAttribute',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'featureAttribute',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }]
      }, {
        localName: 'CategoryPropertyType',
        propertyInfos: [{
            name: 'category',
            required: true,
            elementName: 'Category',
            typeInfo: '.Category'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TriangleType',
        baseTypeInfo: '.AbstractSurfacePatchType',
        propertyInfos: [{
            name: 'exterior',
            required: true,
            typeInfo: '.AbstractRingPropertyType'
          }, {
            name: 'interpolation',
            typeInfo: '.SurfaceInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CodeOrNilReasonListType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list'
            },
            type: 'value'
          }, {
            name: 'codeSpace',
            attributeName: {
              localPart: 'codeSpace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TransitionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'TransitionPropertyType'
        },
        propertyInfos: [{
            name: 'transition',
            required: true,
            elementName: {
              localPart: 'Transition',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.TransitionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDExtendedElementInformationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ExtendedElementInformation_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'shortName',
            elementName: {
              localPart: 'shortName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'domainCode',
            elementName: {
              localPart: 'domainCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'definition',
            required: true,
            elementName: {
              localPart: 'definition',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'obligation',
            elementName: {
              localPart: 'obligation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDObligationCodePropertyType'
          }, {
            name: 'condition',
            elementName: {
              localPart: 'condition',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'dataType',
            required: true,
            elementName: {
              localPart: 'dataType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDatatypeCodePropertyType'
          }, {
            name: 'maximumOccurrence',
            elementName: {
              localPart: 'maximumOccurrence',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'domainValue',
            elementName: {
              localPart: 'domainValue',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'parentEntity',
            required: true,
            collection: true,
            elementName: {
              localPart: 'parentEntity',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'rule',
            required: true,
            elementName: {
              localPart: 'rule',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'rationale',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'rationale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'source',
            required: true,
            collection: true,
            elementName: {
              localPart: 'source',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }]
      }, {
        localName: 'MDRepresentativeFractionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_RepresentativeFraction_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'denominator',
            required: true,
            elementName: {
              localPart: 'denominator',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }]
      }, {
        localName: 'ScopedNamePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'ScopedName_PropertyType'
        },
        propertyInfos: [{
            name: 'scopedName',
            required: true,
            elementName: {
              localPart: 'ScopedName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.CodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OperationPropertyType',
        propertyInfos: [{
            name: 'abstractOperation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractOperation',
            typeInfo: '.AbstractCoordinateOperationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'UomLengthPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomLength_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MetaDataPropertyType',
        propertyInfos: [{
            name: 'abstractMetaData',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractMetaData',
            typeInfo: '.AbstractMetaDataType',
            type: 'elementRef'
          }, {
            name: 'about',
            attributeName: {
              localPart: 'about'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDGeorectifiedType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Georectified_Type'
        },
        baseTypeInfo: '.MDGridSpatialRepresentationType',
        propertyInfos: [{
            name: 'checkPointAvailability',
            required: true,
            elementName: {
              localPart: 'checkPointAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'checkPointDescription',
            elementName: {
              localPart: 'checkPointDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'cornerPoints',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'cornerPoints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.GMPointPropertyType'
          }, {
            name: 'centerPoint',
            elementName: {
              localPart: 'centerPoint',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.GMPointPropertyType'
          }, {
            name: 'pointInPixel',
            required: true,
            elementName: {
              localPart: 'pointInPixel',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDPixelOrientationCodePropertyType'
          }, {
            name: 'transformationDimensionDescription',
            elementName: {
              localPart: 'transformationDimensionDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'transformationDimensionMapping',
            minOccurs: 0,
            maxOccurs: 2,
            collection: true,
            elementName: {
              localPart: 'transformationDimensionMapping',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MDDataIdentificationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DataIdentification_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDataIdentification',
            required: true,
            elementName: {
              localPart: 'MD_DataIdentification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDataIdentificationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'StateType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'StateType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'duality',
            elementName: {
              localPart: 'duality',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpacePropertyType'
          }, {
            name: 'connects',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'connects',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.TransitionPropertyType'
          }, {
            name: 'geometry',
            elementName: {
              localPart: 'geometry',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.PointPropertyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SphereType',
        baseTypeInfo: '.AbstractGriddedSurfaceType',
        propertyInfos: [{
            name: 'horizontalCurveType',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'horizontalCurveType'
            },
            type: 'attribute'
          }, {
            name: 'verticalCurveType',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'verticalCurveType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDCoverageDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_CoverageDescription_Type'
        },
        baseTypeInfo: '.AbstractMDContentInformationType',
        propertyInfos: [{
            name: 'attributeDescription',
            required: true,
            elementName: {
              localPart: 'attributeDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RecordTypePropertyType'
          }, {
            name: 'contentType',
            required: true,
            elementName: {
              localPart: 'contentType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDCoverageContentTypeCodePropertyType'
          }, {
            name: 'dimension',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'dimension',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRangeDimensionPropertyType'
          }]
      }, {
        localName: 'CompositeCurveType',
        baseTypeInfo: '.AbstractCurveType',
        propertyInfos: [{
            name: 'curveMember',
            required: true,
            collection: true,
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractGriddedSurfaceType',
        baseTypeInfo: '.AbstractParametricCurveSurfaceType',
        propertyInfos: [{
            name: 'arows',
            required: true,
            elementName: 'rows',
            typeInfo: '.AbstractGriddedSurfaceType.Rows'
          }, {
            name: 'rows',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'rows'
            },
            type: 'attribute'
          }, {
            name: 'columns',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'columns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CoordinateOperationAccuracy',
        typeName: null,
        propertyInfos: [{
            name: 'abstractDQPositionalAccuracy',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_PositionalAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQPositionalAccuracyType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MemberNameType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'MemberName_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'aName',
            required: true,
            elementName: {
              localPart: 'aName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'attributeType',
            required: true,
            elementName: {
              localPart: 'attributeType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.TypeNamePropertyType'
          }]
      }, {
        localName: 'AbstractGeometricAggregateType',
        baseTypeInfo: '.AbstractGeometryType',
        propertyInfos: [{
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSProductionSeriesPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_ProductionSeries_PropertyType'
        },
        propertyInfos: [{
            name: 'dsProductionSeries',
            required: true,
            elementName: {
              localPart: 'DS_ProductionSeries',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSProductionSeriesType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DefinitionType',
        baseTypeInfo: '.DefinitionBaseType',
        propertyInfos: [{
            name: 'remarks'
          }]
      }, {
        localName: 'DerivedCRSType',
        baseTypeInfo: '.AbstractGeneralDerivedCRSType',
        propertyInfos: [{
            name: 'baseCRS',
            required: true,
            typeInfo: '.SingleCRSPropertyType'
          }, {
            name: 'derivedCRSType',
            required: true,
            typeInfo: '.CodeWithAuthorityType'
          }, {
            name: 'coordinateSystem',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CoordinateSystemPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'MDDigitalTransferOptionsType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DigitalTransferOptions_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'unitsOfDistribution',
            elementName: {
              localPart: 'unitsOfDistribution',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'transferSize',
            elementName: {
              localPart: 'transferSize',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'onLine',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'onLine',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIOnlineResourcePropertyType'
          }, {
            name: 'offLine',
            elementName: {
              localPart: 'offLine',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMediumPropertyType'
          }]
      }, {
        localName: 'MDMediumFormatCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MediumFormatCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMediumFormatCode',
            required: true,
            elementName: {
              localPart: 'MD_MediumFormatCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeTopologyComplexPropertyType',
        propertyInfos: [{
            name: 'timeTopologyComplex',
            required: true,
            elementName: 'TimeTopologyComplex',
            typeInfo: '.TimeTopologyComplexType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQCompletenessOmissionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_CompletenessOmission_PropertyType'
        },
        propertyInfos: [{
            name: 'dqCompletenessOmission',
            required: true,
            elementName: {
              localPart: 'DQ_CompletenessOmission',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQCompletenessOmissionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'PassThroughOperationPropertyType',
        propertyInfos: [{
            name: 'passThroughOperation',
            required: true,
            elementName: 'PassThroughOperation',
            typeInfo: '.PassThroughOperationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TemporalCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'timeCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TimeCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'usesTemporalCS',
            required: true,
            typeInfo: '.TemporalCSPropertyType'
          }, {
            name: 'temporalDatum',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TemporalDatumPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'EXExtentType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_Extent_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'description',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'geographicElement',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'geographicElement',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXGeographicExtentPropertyType'
          }, {
            name: 'temporalElement',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'temporalElement',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXTemporalExtentPropertyType'
          }, {
            name: 'verticalElement',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'verticalElement',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXVerticalExtentPropertyType'
          }]
      }, {
        localName: 'MDGeometricObjectTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_GeometricObjectTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdGeometricObjectTypeCode',
            required: true,
            elementName: {
              localPart: 'MD_GeometricObjectTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LanguageCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LanguageCode_PropertyType'
        },
        propertyInfos: [{
            name: 'languageCode',
            required: true,
            elementName: {
              localPart: 'LanguageCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RingType',
        baseTypeInfo: '.AbstractRingType',
        propertyInfos: [{
            name: 'curveMember',
            required: true,
            collection: true,
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimePeriodPropertyType',
        propertyInfos: [{
            name: 'timePeriod',
            required: true,
            elementName: 'TimePeriod',
            typeInfo: '.TimePeriodType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SpaceLayersType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'SpaceLayersType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'spaceLayerMember',
            required: true,
            collection: true,
            elementName: {
              localPart: 'spaceLayerMember',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SpaceLayerMemberType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractRingPropertyType',
        propertyInfos: [{
            name: 'abstractRing',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractRing',
            typeInfo: '.AbstractRingType',
            type: 'elementRef'
          }]
      }, {
        localName: 'LIProcessStepType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LI_ProcessStep_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'description',
            required: true,
            elementName: {
              localPart: 'description',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'rationale',
            elementName: {
              localPart: 'rationale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'dateTime',
            elementName: {
              localPart: 'dateTime',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DateTimePropertyType'
          }, {
            name: 'processor',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'processor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }, {
            name: 'source',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'source',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LISourcePropertyType'
          }]
      }, {
        localName: 'TopoCurvePropertyType',
        propertyInfos: [{
            name: 'topoCurve',
            required: true,
            elementName: 'TopoCurve',
            typeInfo: '.TopoCurveType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'VolumeType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'MDMediumNameCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MediumNameCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMediumNameCode',
            required: true,
            elementName: {
              localPart: 'MD_MediumNameCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SurfaceType',
        baseTypeInfo: '.AbstractSurfaceType',
        propertyInfos: [{
            name: 'patches',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.SurfacePatchArrayPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'EXGeographicDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_GeographicDescription_Type'
        },
        baseTypeInfo: '.AbstractEXGeographicExtentType',
        propertyInfos: [{
            name: 'geographicIdentifier',
            required: true,
            elementName: {
              localPart: 'geographicIdentifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierPropertyType'
          }]
      }, {
        localName: 'VerticalDatumType',
        baseTypeInfo: '.AbstractDatumType'
      }, {
        localName: 'AbstractObjectType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'AbstractObject_Type'
        },
        propertyInfos: [{
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id'
            },
            type: 'attribute'
          }, {
            name: 'uuid',
            attributeName: {
              localPart: 'uuid'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDVectorSpatialRepresentationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_VectorSpatialRepresentation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdVectorSpatialRepresentation',
            required: true,
            elementName: {
              localPart: 'MD_VectorSpatialRepresentation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDVectorSpatialRepresentationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractMetaDataType',
        propertyInfos: [{
            name: 'content',
            collection: true,
            allowDom: false,
            type: 'elementRefs'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeTopologyComplexType',
        baseTypeInfo: '.AbstractTimeComplexType',
        propertyInfos: [{
            name: 'primitive',
            required: true,
            collection: true,
            typeInfo: '.TimeTopologyPrimitivePropertyType'
          }]
      }, {
        localName: 'CodeListType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Name'
            },
            type: 'value'
          }, {
            name: 'codeSpace',
            attributeName: {
              localPart: 'codeSpace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDConstraintsType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Constraints_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'useLimitation',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'useLimitation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MDScopeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ScopeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdScopeCode',
            required: true,
            elementName: {
              localPart: 'MD_ScopeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MultiSolidPropertyType',
        propertyInfos: [{
            name: 'multiSolid',
            required: true,
            elementName: 'MultiSolid',
            typeInfo: '.MultiSolidType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSDataSetType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_DataSet_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'has',
            required: true,
            collection: true,
            elementName: {
              localPart: 'has',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMetadataPropertyType'
          }, {
            name: 'partOf',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'partOf',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSAggregatePropertyType'
          }]
      }, {
        localName: 'MDMetadataPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Metadata_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMetadata',
            required: true,
            elementName: {
              localPart: 'MD_Metadata',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMetadataType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TMPeriodDurationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gts',
          localPart: 'TM_PeriodDuration_PropertyType'
        },
        propertyInfos: [{
            name: 'tmPeriodDuration',
            required: true,
            elementName: {
              localPart: 'TM_PeriodDuration',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gts'
            },
            typeInfo: 'Duration'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDDistributionUnitsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DistributionUnits_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDistributionUnits',
            required: true,
            elementName: {
              localPart: 'MD_DistributionUnits',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDSecurityConstraintsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_SecurityConstraints_PropertyType'
        },
        propertyInfos: [{
            name: 'mdSecurityConstraints',
            required: true,
            elementName: {
              localPart: 'MD_SecurityConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDSecurityConstraintsType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MeasureType',
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Double',
            type: 'value'
          }, {
            name: 'uom',
            required: true,
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQScopePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_Scope_PropertyType'
        },
        propertyInfos: [{
            name: 'dqScope',
            required: true,
            elementName: {
              localPart: 'DQ_Scope',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQScopeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'FormulaType',
        propertyInfos: [{
            name: 'a',
            typeInfo: 'Double'
          }, {
            name: 'b',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'c',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'd',
            typeInfo: 'Double'
          }]
      }, {
        localName: 'PTFreeTextType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'PT_FreeText_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'textGroup',
            required: true,
            collection: true,
            elementName: {
              localPart: 'textGroup',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LocalisedCharacterStringPropertyType'
          }]
      }, {
        localName: 'DictionaryType',
        baseTypeInfo: '.DefinitionType',
        propertyInfos: [{
            name: 'dictionaryEntryOrIndirectEntry',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'dictionaryEntry',
                typeInfo: '.DictionaryEntryType'
              }, {
                elementName: 'indirectEntry',
                typeInfo: '.IndirectEntryType'
              }],
            type: 'elementRefs'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQConceptualConsistencyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ConceptualConsistency_PropertyType'
        },
        propertyInfos: [{
            name: 'dqConceptualConsistency',
            required: true,
            elementName: {
              localPart: 'DQ_ConceptualConsistency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQConceptualConsistencyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDQPositionalAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_PositionalAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQElementType'
      }, {
        localName: 'NodeOrEdgePropertyType',
        propertyInfos: [{
            name: 'node',
            required: true,
            elementName: 'Node',
            typeInfo: '.NodeType'
          }, {
            name: 'edge',
            required: true,
            elementName: 'Edge',
            typeInfo: '.EdgeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PTLocaleContainerPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'PT_LocaleContainer_PropertyType'
        },
        propertyInfos: [{
            name: 'ptLocaleContainer',
            required: true,
            elementName: {
              localPart: 'PT_LocaleContainer',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.PTLocaleContainerType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ArcByCenterPointType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'pos',
            required: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'pointProperty',
            required: true,
            typeInfo: '.PointPropertyType'
          }, {
            name: 'pointRep',
            required: true,
            typeInfo: '.PointPropertyType'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'radius',
            required: true,
            typeInfo: '.LengthType'
          }, {
            name: 'startAngle',
            typeInfo: '.AngleType'
          }, {
            name: 'endAngle',
            typeInfo: '.AngleType'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }, {
            name: 'numArc',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'numArc'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeCalendarPropertyType',
        propertyInfos: [{
            name: 'timeCalendar',
            required: true,
            elementName: 'TimeCalendar',
            typeInfo: '.TimeCalendarType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DatePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Date_PropertyType'
        },
        propertyInfos: [{
            name: 'date',
            required: true,
            elementName: {
              localPart: 'Date',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            }
          }, {
            name: 'dateTime',
            required: true,
            elementName: {
              localPart: 'DateTime',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'DateTime'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDMetadataExtensionInformationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MetadataExtensionInformation_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'extensionOnLineResource',
            elementName: {
              localPart: 'extensionOnLineResource',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIOnlineResourcePropertyType'
          }, {
            name: 'extendedElementInformation',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'extendedElementInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDExtendedElementInformationPropertyType'
          }]
      }, {
        localName: 'AbstractCoordinateSystemType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'axis',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CoordinateSystemAxisPropertyType',
            type: 'elementRef'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LinearRingType',
        baseTypeInfo: '.AbstractRingType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            required: true,
            minOccurs: 4,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }]
      }, {
        localName: 'BooleanPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Boolean_PropertyType'
        },
        propertyInfos: [{
            name: '_boolean',
            required: true,
            elementName: {
              localPart: 'Boolean',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQNonQuantitativeAttributeAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_NonQuantitativeAttributeAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQThematicAccuracyType'
      }, {
        localName: 'RingPropertyType',
        propertyInfos: [{
            name: 'ring',
            required: true,
            elementName: 'Ring',
            typeInfo: '.RingType'
          }]
      }, {
        localName: 'AreaType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'GeodeticCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'ellipsoidalCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.EllipsoidalCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'cartesianCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CartesianCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'sphericalCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.SphericalCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'geodeticDatum',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.GeodeticDatumPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'TopoCurveType',
        baseTypeInfo: '.AbstractTopologyType',
        propertyInfos: [{
            name: 'directedEdge',
            required: true,
            collection: true,
            typeInfo: '.DirectedEdgePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TopoPrimitiveMemberType',
        propertyInfos: [{
            name: 'abstractTopoPrimitive',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTopoPrimitive',
            typeInfo: '.AbstractTopoPrimitiveType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQGriddedDataPositionalAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_GriddedDataPositionalAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'dqGriddedDataPositionalAccuracy',
            required: true,
            elementName: {
              localPart: 'DQ_GriddedDataPositionalAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQGriddedDataPositionalAccuracyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQTemporalValidityType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TemporalValidity_Type'
        },
        baseTypeInfo: '.AbstractDQTemporalAccuracyType'
      }, {
        localName: 'AbstractCurveType',
        baseTypeInfo: '.AbstractGeometricPrimitiveType'
      }, {
        localName: 'SurfaceArrayPropertyType',
        propertyInfos: [{
            name: 'abstractSurface',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSurface',
            typeInfo: '.AbstractSurfaceType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeCalendarEraType',
        baseTypeInfo: '.DefinitionType',
        propertyInfos: [{
            name: 'referenceEvent',
            required: true,
            typeInfo: '.StringOrRefType'
          }, {
            name: 'referenceDate',
            required: true
          }, {
            name: 'julianReference',
            required: true,
            typeInfo: 'Decimal'
          }, {
            name: 'epochOfUse',
            required: true,
            typeInfo: '.TimePeriodPropertyType'
          }]
      }, {
        localName: 'CICitationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Citation_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'title',
            required: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'alternateTitle',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'alternateTitle',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'date',
            required: true,
            collection: true,
            elementName: {
              localPart: 'date',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIDatePropertyType'
          }, {
            name: 'edition',
            elementName: {
              localPart: 'edition',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'editionDate',
            elementName: {
              localPart: 'editionDate',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DatePropertyType'
          }, {
            name: 'identifier',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'identifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierPropertyType'
          }, {
            name: 'citedResponsibleParty',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'citedResponsibleParty',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }, {
            name: 'presentationForm',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'presentationForm',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIPresentationFormCodePropertyType'
          }, {
            name: 'series',
            elementName: {
              localPart: 'series',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CISeriesPropertyType'
          }, {
            name: 'otherCitationDetails',
            elementName: {
              localPart: 'otherCitationDetails',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'collectiveTitle',
            elementName: {
              localPart: 'collectiveTitle',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'isbn',
            elementName: {
              localPart: 'ISBN',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'issn',
            elementName: {
              localPart: 'ISSN',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'DQCompletenessCommissionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_CompletenessCommission_Type'
        },
        baseTypeInfo: '.AbstractDQCompletenessType'
      }, {
        localName: 'DSPlatformType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Platform_Type'
        },
        baseTypeInfo: '.DSSeriesType'
      }, {
        localName: 'GeographicCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'usesEllipsoidalCS',
            required: true,
            typeInfo: '.EllipsoidalCSPropertyType'
          }, {
            name: 'usesGeodeticDatum',
            required: true,
            typeInfo: '.GeodeticDatumPropertyType'
          }]
      }, {
        localName: 'ArrayAssociationType',
        propertyInfos: [{
            name: 'abstractObject',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractObject',
            typeInfo: 'AnyType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'HistoryPropertyType',
        propertyInfos: [{
            name: 'abstractTimeSlice',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTimeSlice',
            typeInfo: '.AbstractTimeSliceType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DefinitionProxyType',
        baseTypeInfo: '.DefinitionType',
        propertyInfos: [{
            name: 'definitionRef',
            required: true,
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'CICitationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Citation_PropertyType'
        },
        propertyInfos: [{
            name: 'ciCitation',
            required: true,
            elementName: {
              localPart: 'CI_Citation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQThematicAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ThematicAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQThematicAccuracy',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_ThematicAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQThematicAccuracyType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ArcByBulgeType',
        baseTypeInfo: '.ArcStringByBulgeType'
      }, {
        localName: 'MDImageDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ImageDescription_Type'
        },
        baseTypeInfo: '.MDCoverageDescriptionType',
        propertyInfos: [{
            name: 'illuminationElevationAngle',
            elementName: {
              localPart: 'illuminationElevationAngle',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'illuminationAzimuthAngle',
            elementName: {
              localPart: 'illuminationAzimuthAngle',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'imagingCondition',
            elementName: {
              localPart: 'imagingCondition',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDImagingConditionCodePropertyType'
          }, {
            name: 'imageQualityCode',
            elementName: {
              localPart: 'imageQualityCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierPropertyType'
          }, {
            name: 'cloudCoverPercentage',
            elementName: {
              localPart: 'cloudCoverPercentage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'processingLevelCode',
            elementName: {
              localPart: 'processingLevelCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierPropertyType'
          }, {
            name: 'compressionGenerationQuantity',
            elementName: {
              localPart: 'compressionGenerationQuantity',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'triangulationIndicator',
            elementName: {
              localPart: 'triangulationIndicator',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'radiometricCalibrationDataAvailability',
            elementName: {
              localPart: 'radiometricCalibrationDataAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'cameraCalibrationInformationAvailability',
            elementName: {
              localPart: 'cameraCalibrationInformationAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'filmDistortionInformationAvailability',
            elementName: {
              localPart: 'filmDistortionInformationAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'lensDistortionInformationAvailability',
            elementName: {
              localPart: 'lensDistortionInformationAvailability',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }]
      }, {
        localName: 'PolarCSPropertyType',
        propertyInfos: [{
            name: 'polarCS',
            required: true,
            elementName: 'PolarCS',
            typeInfo: '.PolarCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDQResultType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_Result_Type'
        },
        baseTypeInfo: '.AbstractObjectType'
      }, {
        localName: 'AbstractFeatureCollectionType',
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'featureMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.FeaturePropertyType'
          }, {
            name: 'featureMembers',
            typeInfo: '.FeatureArrayPropertyType'
          }]
      }, {
        localName: 'GenericNamePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'GenericName_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractGenericName',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractGenericName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.CodeType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSSensorType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Sensor_Type'
        },
        baseTypeInfo: '.DSSeriesType'
      }, {
        localName: 'PolarCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'CellSpacePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpacePropertyType'
        },
        propertyInfos: [{
            name: 'cellSpace',
            required: true,
            elementName: {
              localPart: 'CellSpace',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TopoPointPropertyType',
        propertyInfos: [{
            name: 'topoPoint',
            required: true,
            elementName: 'TopoPoint',
            typeInfo: '.TopoPointType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDKeywordsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Keywords_PropertyType'
        },
        propertyInfos: [{
            name: 'mdKeywords',
            required: true,
            elementName: {
              localPart: 'MD_Keywords',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDKeywordsType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'RecordTypePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'RecordType_PropertyType'
        },
        propertyInfos: [{
            name: 'recordType',
            required: true,
            elementName: {
              localPart: 'RecordType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.RecordTypeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SCCRSPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gsr',
          localPart: 'SC_CRS_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractCRS',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCRS',
            typeInfo: '.AbstractCRSType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQLogicalConsistencyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_LogicalConsistency_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQLogicalConsistency',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_LogicalConsistency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQLogicalConsistencyType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDContentInformationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ContentInformation_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractMDContentInformation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractMD_ContentInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractMDContentInformationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDDigitalTransferOptionsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DigitalTransferOptions_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDigitalTransferOptions',
            required: true,
            elementName: {
              localPart: 'MD_DigitalTransferOptions',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDigitalTransferOptionsType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDCharacterSetCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_CharacterSetCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdCharacterSetCode',
            required: true,
            elementName: {
              localPart: 'MD_CharacterSetCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CompositeSolidType',
        baseTypeInfo: '.AbstractSolidType',
        propertyInfos: [{
            name: 'solidMember',
            required: true,
            collection: true,
            typeInfo: '.SolidPropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ConversionPropertyType',
        propertyInfos: [{
            name: 'conversion',
            required: true,
            elementName: 'Conversion',
            typeInfo: '.ConversionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MultiGeometryPropertyType',
        propertyInfos: [{
            name: 'abstractGeometricAggregate',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometricAggregate',
            typeInfo: '.AbstractGeometricAggregateType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DirectedEdgePropertyType',
        propertyInfos: [{
            name: 'edge',
            required: true,
            elementName: 'Edge',
            typeInfo: '.EdgeType'
          }, {
            name: 'orientation',
            values: ['-', '+'],
            attributeName: {
              localPart: 'orientation'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDDistributionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Distribution_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'distributionFormat',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'distributionFormat',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDFormatPropertyType'
          }, {
            name: 'distributor',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'distributor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDistributorPropertyType'
          }, {
            name: 'transferOptions',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'transferOptions',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDigitalTransferOptionsPropertyType'
          }]
      }, {
        localName: 'MDGeoreferenceablePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Georeferenceable_PropertyType'
        },
        propertyInfos: [{
            name: 'mdGeoreferenceable',
            required: true,
            elementName: {
              localPart: 'MD_Georeferenceable',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDGeoreferenceableType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EngineeringDatumPropertyType',
        propertyInfos: [{
            name: 'engineeringDatum',
            required: true,
            elementName: 'EngineeringDatum',
            typeInfo: '.EngineeringDatumType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDServiceIdentificationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ServiceIdentification_PropertyType'
        },
        propertyInfos: [{
            name: 'mdServiceIdentification',
            required: true,
            elementName: {
              localPart: 'MD_ServiceIdentification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDServiceIdentificationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MappingRuleType',
        propertyInfos: [{
            name: 'ruleDefinition',
            required: true
          }, {
            name: 'ruleReference',
            required: true,
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'AbstractGeneralTransformationType',
        baseTypeInfo: '.AbstractCoordinateOperationType'
      }, {
        localName: 'GridEnvelopeType',
        propertyInfos: [{
            name: 'low',
            required: true,
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Integer'
            }
          }, {
            name: 'high',
            required: true,
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Integer'
            }
          }]
      }, {
        localName: 'CRSPropertyType',
        propertyInfos: [{
            name: 'abstractCRS',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCRS',
            typeInfo: '.AbstractCRSType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSAssociationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Association_PropertyType'
        },
        propertyInfos: [{
            name: 'dsAssociation',
            required: true,
            elementName: {
              localPart: 'DS_Association',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSAssociationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CoordinateSystemPropertyType',
        propertyInfos: [{
            name: 'abstractCoordinateSystem',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCoordinateSystem',
            typeInfo: '.AbstractCoordinateSystemType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'GeometricPrimitivePropertyType',
        propertyInfos: [{
            name: 'abstractGeometricPrimitive',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometricPrimitive',
            typeInfo: '.AbstractGeometricPrimitiveType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DataBlockType',
        propertyInfos: [{
            name: 'rangeParameters',
            required: true,
            typeInfo: '.AssociationRoleType'
          }, {
            name: 'tupleList',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'doubleOrNilReasonTupleList',
            required: true,
            typeInfo: {
              type: 'list'
            }
          }]
      }, {
        localName: 'KnotType',
        propertyInfos: [{
            name: 'value',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'multiplicity',
            required: true,
            typeInfo: 'NonNegativeInteger'
          }, {
            name: 'weight',
            required: true,
            typeInfo: 'Double'
          }]
      }, {
        localName: 'CategoryExtentType',
        baseTypeInfo: '.CodeOrNilReasonListType'
      }, {
        localName: 'DQNonQuantitativeAttributeAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_NonQuantitativeAttributeAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'dqNonQuantitativeAttributeAccuracy',
            required: true,
            elementName: {
              localPart: 'DQ_NonQuantitativeAttributeAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQNonQuantitativeAttributeAccuracyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EXTemporalExtentType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_TemporalExtent_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'extent',
            required: true,
            elementName: {
              localPart: 'extent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.TMPrimitivePropertyType'
          }]
      }, {
        localName: 'Simple',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'simple'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SphericalCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'DQResultPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_Result_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQResult',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_Result',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQResultType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'LocalNamePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'LocalName_PropertyType'
        },
        propertyInfos: [{
            name: 'localName',
            required: true,
            elementName: {
              localPart: 'LocalName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.CodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'UomVelocityPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomVelocity_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TemporalDatumType',
        baseTypeInfo: '.TemporalDatumBaseType',
        propertyInfos: [{
            name: 'origin',
            required: true,
            typeInfo: 'DateTime'
          }]
      }, {
        localName: 'MultiCurvePropertyType',
        propertyInfos: [{
            name: 'multiCurve',
            required: true,
            elementName: 'MultiCurve',
            typeInfo: '.MultiCurveType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BSplineType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'degree',
            required: true,
            typeInfo: 'NonNegativeInteger'
          }, {
            name: 'knot',
            required: true,
            minOccurs: 2,
            collection: true,
            typeInfo: '.KnotPropertyType'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }, {
            name: 'isPolynomial',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'isPolynomial'
            },
            type: 'attribute'
          }, {
            name: 'knotType',
            typeInfo: '.KnotTypesType',
            attributeName: {
              localPart: 'knotType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ParameterValueType',
        baseTypeInfo: '.AbstractGeneralParameterValueType',
        propertyInfos: [{
            name: 'value',
            required: true,
            typeInfo: '.MeasureType'
          }, {
            name: 'dmsAngleValue',
            required: true,
            typeInfo: '.DMSAngleType'
          }, {
            name: 'stringValue',
            required: true
          }, {
            name: 'integerValue',
            required: true,
            typeInfo: 'PositiveInteger'
          }, {
            name: 'booleanValue',
            required: true,
            typeInfo: 'Boolean'
          }, {
            name: 'valueList',
            required: true,
            typeInfo: '.MeasureListType'
          }, {
            name: 'integerValueList',
            required: true,
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Integer'
            }
          }, {
            name: 'valueFile',
            required: true
          }, {
            name: 'operationParameter',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.OperationParameterPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'ConeType',
        baseTypeInfo: '.AbstractGriddedSurfaceType',
        propertyInfos: [{
            name: 'horizontalCurveType',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'horizontalCurveType'
            },
            type: 'attribute'
          }, {
            name: 'verticalCurveType',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'verticalCurveType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Boolean',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Boolean',
            type: 'value'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BooleanPropertyType',
        propertyInfos: [{
            name: '_boolean',
            required: true,
            elementName: 'Boolean',
            typeInfo: '.Boolean'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQQuantitativeAttributeAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_QuantitativeAttributeAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQThematicAccuracyType'
      }, {
        localName: 'GeometryPropertyType',
        propertyInfos: [{
            name: 'abstractGeometry',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ConcatenatedOperationPropertyType',
        propertyInfos: [{
            name: 'concatenatedOperation',
            required: true,
            elementName: 'ConcatenatedOperation',
            typeInfo: '.ConcatenatedOperationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DegreesType',
        propertyInfos: [{
            name: 'value',
            typeInfo: 'NonNegativeInteger',
            type: 'value'
          }, {
            name: 'direction',
            values: ['N', 'E', 'S', 'W', '+', '-'],
            attributeName: {
              localPart: 'direction'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractRingType'
      }, {
        localName: 'DQConformanceResultType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ConformanceResult_Type'
        },
        baseTypeInfo: '.AbstractDQResultType',
        propertyInfos: [{
            name: 'specification',
            required: true,
            elementName: {
              localPart: 'specification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: 'explanation',
            required: true,
            elementName: {
              localPart: 'explanation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'pass',
            required: true,
            elementName: {
              localPart: 'pass',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }]
      }, {
        localName: 'AbstractDQCompletenessType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_Completeness_Type'
        },
        baseTypeInfo: '.AbstractDQElementType'
      }, {
        localName: 'LengthType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'DQTopologicalConsistencyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TopologicalConsistency_PropertyType'
        },
        propertyInfos: [{
            name: 'dqTopologicalConsistency',
            required: true,
            elementName: {
              localPart: 'DQ_TopologicalConsistency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQTopologicalConsistencyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AffineCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'AbstractGeometricPrimitiveType',
        baseTypeInfo: '.AbstractGeometryType'
      }, {
        localName: 'UserDefinedCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'EngineeringCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'affineCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AffineCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'cartesianCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CartesianCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'cylindricalCS',
            required: true,
            typeInfo: '.CylindricalCSPropertyType'
          }, {
            name: 'linearCS',
            required: true,
            typeInfo: '.LinearCSPropertyType'
          }, {
            name: 'polarCS',
            required: true,
            typeInfo: '.PolarCSPropertyType'
          }, {
            name: 'sphericalCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.SphericalCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'userDefinedCS',
            required: true,
            typeInfo: '.UserDefinedCSPropertyType'
          }, {
            name: 'coordinateSystem',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CoordinateSystemPropertyType',
            type: 'elementRef'
          }, {
            name: 'engineeringDatum',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.EngineeringDatumPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'TopoVolumePropertyType',
        propertyInfos: [{
            name: 'topoVolume',
            required: true,
            elementName: 'TopoVolume',
            typeInfo: '.TopoVolumeType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQAbsoluteExternalPositionalAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_AbsoluteExternalPositionalAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQPositionalAccuracyType'
      }, {
        localName: 'GeometricComplexPropertyType',
        propertyInfos: [{
            name: 'geometricComplex',
            required: true,
            elementName: 'GeometricComplex',
            typeInfo: '.GeometricComplexType'
          }, {
            name: 'compositeCurve',
            required: true,
            elementName: 'CompositeCurve',
            typeInfo: '.CompositeCurveType'
          }, {
            name: 'compositeSurface',
            required: true,
            elementName: 'CompositeSurface',
            typeInfo: '.CompositeSurfaceType'
          }, {
            name: 'compositeSolid',
            required: true,
            elementName: 'CompositeSolid',
            typeInfo: '.CompositeSolidType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQFormatConsistencyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_FormatConsistency_PropertyType'
        },
        propertyInfos: [{
            name: 'dqFormatConsistency',
            required: true,
            elementName: {
              localPart: 'DQ_FormatConsistency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQFormatConsistencyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractFeatureType',
        baseTypeInfo: '.AbstractGMLType',
        propertyInfos: [{
            name: 'boundedBy',
            typeInfo: '.BoundingShapeType'
          }, {
            name: 'location',
            mixed: false,
            allowDom: false,
            typeInfo: '.LocationPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'ShellType',
        propertyInfos: [{
            name: 'surfaceMember',
            required: true,
            collection: true,
            typeInfo: '.SurfacePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDAggregateInformationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_AggregateInformation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdAggregateInformation',
            required: true,
            elementName: {
              localPart: 'MD_AggregateInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDAggregateInformationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractGeneralOperationParameterType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'minimumOccurs',
            typeInfo: 'NonNegativeInteger'
          }]
      }, {
        localName: 'TimeType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'ProcedurePropertyType',
        propertyInfos: [{
            name: 'abstractFeature',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractFeature',
            typeInfo: '.AbstractFeatureType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TemporalDatumPropertyType',
        propertyInfos: [{
            name: 'temporalDatum',
            required: true,
            elementName: 'TemporalDatum',
            typeInfo: '.TemporalDatumType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TimeOrdinalEraPropertyType',
        propertyInfos: [{
            name: 'timeOrdinalEra',
            required: true,
            elementName: 'TimeOrdinalEra',
            typeInfo: '.TimeOrdinalEraType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDGeometricObjectsType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_GeometricObjects_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'geometricObjectType',
            required: true,
            elementName: {
              localPart: 'geometricObjectType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDGeometricObjectTypeCodePropertyType'
          }, {
            name: 'geometricObjectCount',
            elementName: {
              localPart: 'geometricObjectCount',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }]
      }, {
        localName: 'UnitOfMeasureType',
        propertyInfos: [{
            name: 'uom',
            required: true,
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDFormatPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Format_PropertyType'
        },
        propertyInfos: [{
            name: 'mdFormat',
            required: true,
            elementName: {
              localPart: 'MD_Format',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDFormatType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TimeCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'BezierType',
        baseTypeInfo: '.BSplineType'
      }, {
        localName: 'MDReferenceSystemPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ReferenceSystem_PropertyType'
        },
        propertyInfos: [{
            name: 'mdReferenceSystem',
            required: true,
            elementName: {
              localPart: 'MD_ReferenceSystem',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDReferenceSystemType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CellSpaceType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'cellSpaceGeometry',
            elementName: {
              localPart: 'cellSpaceGeometry',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceGeometryType'
          }, {
            name: 'duality',
            elementName: {
              localPart: 'duality',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.StatePropertyType'
          }, {
            name: 'externalReference',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'externalReference',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.ExternalReferenceType'
          }, {
            name: 'partialboundedBy',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'partialboundedBy',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceBoundaryPropertyType'
          }]
      }, {
        localName: 'CylinderType',
        baseTypeInfo: '.AbstractGriddedSurfaceType',
        propertyInfos: [{
            name: 'horizontalCurveType',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'horizontalCurveType'
            },
            type: 'attribute'
          }, {
            name: 'verticalCurveType',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'verticalCurveType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DefinitionBaseType',
        baseTypeInfo: '.AbstractGMLType'
      }, {
        localName: 'EXGeographicBoundingBoxType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_GeographicBoundingBox_Type'
        },
        baseTypeInfo: '.AbstractEXGeographicExtentType',
        propertyInfos: [{
            name: 'westBoundLongitude',
            required: true,
            elementName: {
              localPart: 'westBoundLongitude',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DecimalPropertyType'
          }, {
            name: 'eastBoundLongitude',
            required: true,
            elementName: {
              localPart: 'eastBoundLongitude',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DecimalPropertyType'
          }, {
            name: 'southBoundLatitude',
            required: true,
            elementName: {
              localPart: 'southBoundLatitude',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DecimalPropertyType'
          }, {
            name: 'northBoundLatitude',
            required: true,
            elementName: {
              localPart: 'northBoundLatitude',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DecimalPropertyType'
          }]
      }, {
        localName: 'TopoPrimitiveArrayAssociationType',
        propertyInfos: [{
            name: 'abstractTopoPrimitive',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTopoPrimitive',
            typeInfo: '.AbstractTopoPrimitiveType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimePeriodType',
        baseTypeInfo: '.AbstractTimeGeometricPrimitiveType',
        propertyInfos: [{
            name: 'beginPosition',
            required: true,
            typeInfo: '.TimePositionType'
          }, {
            name: 'begin',
            required: true,
            typeInfo: '.TimeInstantPropertyType'
          }, {
            name: 'endPosition',
            required: true,
            typeInfo: '.TimePositionType'
          }, {
            name: 'end',
            required: true,
            typeInfo: '.TimeInstantPropertyType'
          }, {
            name: 'duration',
            required: true,
            typeInfo: 'Duration'
          }, {
            name: 'timeInterval',
            required: true,
            typeInfo: '.TimeIntervalLengthType'
          }]
      }, {
        localName: 'IndirectEntryType',
        propertyInfos: [{
            name: 'definitionProxy',
            required: true,
            elementName: 'DefinitionProxy',
            typeInfo: '.DefinitionProxyType'
          }]
      }, {
        localName: 'GeometricComplexType',
        baseTypeInfo: '.AbstractGeometryType',
        propertyInfos: [{
            name: 'element',
            required: true,
            collection: true,
            typeInfo: '.GeometricPrimitivePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ParameterValueGroupType',
        baseTypeInfo: '.AbstractGeneralParameterValueType',
        propertyInfos: [{
            name: 'parameterValue',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AbstractGeneralParameterValuePropertyType',
            type: 'elementRef'
          }, {
            name: 'group',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.OperationParameterGroupPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'Category',
        typeName: null,
        baseTypeInfo: '.CodeType',
        propertyInfos: [{
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TopoComplexType',
        baseTypeInfo: '.AbstractTopologyType',
        propertyInfos: [{
            name: 'maximalComplex',
            required: true,
            typeInfo: '.TopoComplexPropertyType'
          }, {
            name: 'superComplex',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TopoComplexPropertyType'
          }, {
            name: 'subComplex',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TopoComplexPropertyType'
          }, {
            name: 'topoPrimitiveMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TopoPrimitiveMemberType'
          }, {
            name: 'topoPrimitiveMembers',
            typeInfo: '.TopoPrimitiveArrayAssociationType'
          }, {
            name: 'isMaximal',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'isMaximal'
            },
            type: 'attribute'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQDomainConsistencyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_DomainConsistency_Type'
        },
        baseTypeInfo: '.AbstractDQLogicalConsistencyType'
      }, {
        localName: 'DQEvaluationMethodTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_EvaluationMethodTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'dqEvaluationMethodTypeCode',
            required: true,
            elementName: {
              localPart: 'DQ_EvaluationMethodTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DMSAngleType',
        propertyInfos: [{
            name: 'degrees',
            required: true,
            typeInfo: '.DegreesType'
          }, {
            name: 'decimalMinutes',
            required: true,
            typeInfo: 'Decimal'
          }, {
            name: 'minutes',
            required: true,
            typeInfo: 'NonNegativeInteger'
          }, {
            name: 'seconds',
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'InterLayerConnectionMemberType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'InterLayerConnectionMemberType'
        },
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'interLayerConnection',
            required: true,
            elementName: {
              localPart: 'InterLayerConnection',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.InterLayerConnectionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDObligationCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ObligationCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdObligationCode',
            required: true,
            elementName: {
              localPart: 'MD_ObligationCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDObligationCodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractGeneralParameterValueType'
      }, {
        localName: 'UomAreaPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UomArea_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MovingObjectStatusType',
        baseTypeInfo: '.AbstractTimeSliceType',
        propertyInfos: [{
            name: 'position',
            required: true,
            typeInfo: '.GeometryPropertyType'
          }, {
            name: 'pos',
            required: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'locationName',
            required: true,
            typeInfo: '.CodeType'
          }, {
            name: 'locationReference',
            required: true,
            typeInfo: '.ReferenceType'
          }, {
            name: 'location',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.LocationPropertyType',
            type: 'elementRef'
          }, {
            name: 'speed',
            typeInfo: '.MeasureType'
          }, {
            name: 'bearing',
            typeInfo: '.DirectionPropertyType'
          }, {
            name: 'acceleration',
            typeInfo: '.MeasureType'
          }, {
            name: 'elevation',
            typeInfo: '.MeasureType'
          }, {
            name: 'status',
            typeInfo: '.StringOrRefType'
          }, {
            name: 'statusReference',
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'EXBoundingPolygonPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_BoundingPolygon_PropertyType'
        },
        propertyInfos: [{
            name: 'exBoundingPolygon',
            required: true,
            elementName: {
              localPart: 'EX_BoundingPolygon',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXBoundingPolygonType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'RecordPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Record_PropertyType'
        },
        propertyInfos: [{
            name: 'record',
            required: true,
            elementName: {
              localPart: 'Record',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'AnyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQDataQualityPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_DataQuality_PropertyType'
        },
        propertyInfos: [{
            name: 'dqDataQuality',
            required: true,
            elementName: {
              localPart: 'DQ_DataQuality',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQDataQualityType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ProjectedCRSType',
        baseTypeInfo: '.AbstractGeneralDerivedCRSType',
        propertyInfos: [{
            name: 'baseGeodeticCRS',
            required: true,
            typeInfo: '.GeodeticCRSPropertyType'
          }, {
            name: 'baseGeographicCRS',
            required: true,
            typeInfo: '.GeographicCRSPropertyType'
          }, {
            name: 'cartesianCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CartesianCSPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'DQThematicClassificationCorrectnessPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ThematicClassificationCorrectness_PropertyType'
        },
        propertyInfos: [{
            name: 'dqThematicClassificationCorrectness',
            required: true,
            elementName: {
              localPart: 'DQ_ThematicClassificationCorrectness',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQThematicClassificationCorrectnessType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDSecurityConstraintsType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_SecurityConstraints_Type'
        },
        baseTypeInfo: '.MDConstraintsType',
        propertyInfos: [{
            name: 'classification',
            required: true,
            elementName: {
              localPart: 'classification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDClassificationCodePropertyType'
          }, {
            name: 'userNote',
            elementName: {
              localPart: 'userNote',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'classificationSystem',
            elementName: {
              localPart: 'classificationSystem',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'handlingDescription',
            elementName: {
              localPart: 'handlingDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MDMaintenanceFrequencyCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MaintenanceFrequencyCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMaintenanceFrequencyCode',
            required: true,
            elementName: {
              localPart: 'MD_MaintenanceFrequencyCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeneralConversionPropertyType',
        propertyInfos: [{
            name: 'abstractGeneralConversion',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeneralConversion',
            typeInfo: '.AbstractGeneralConversionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDExtendedElementInformationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ExtendedElementInformation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdExtendedElementInformation',
            required: true,
            elementName: {
              localPart: 'MD_ExtendedElementInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDExtendedElementInformationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TimeEdgeType',
        baseTypeInfo: '.AbstractTimeTopologyPrimitiveType',
        propertyInfos: [{
            name: 'start',
            required: true,
            typeInfo: '.TimeNodePropertyType'
          }, {
            name: 'end',
            required: true,
            typeInfo: '.TimeNodePropertyType'
          }, {
            name: 'extent',
            typeInfo: '.TimePeriodPropertyType'
          }]
      }, {
        localName: 'FormulaCitation',
        typeName: null,
        propertyInfos: [{
            name: 'ciCitation',
            required: true,
            elementName: {
              localPart: 'CI_Citation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CIPresentationFormCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_PresentationFormCode_PropertyType'
        },
        propertyInfos: [{
            name: 'ciPresentationFormCode',
            required: true,
            elementName: {
              localPart: 'CI_PresentationFormCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Count',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Integer',
            type: 'value'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ObliqueCartesianCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'LinearCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'TargetPropertyType',
        propertyInfos: [{
            name: 'abstractFeature',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractFeature',
            typeInfo: '.AbstractFeatureType',
            type: 'elementRef'
          }, {
            name: 'abstractGeometry',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MultiSurfacePropertyType',
        propertyInfos: [{
            name: 'multiSurface',
            required: true,
            elementName: 'MultiSurface',
            typeInfo: '.MultiSurfaceType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CellSpaceMemberType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceMemberType'
        },
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'cellSpace',
            required: true,
            elementName: {
              localPart: 'CellSpace',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'PointPropertyType',
        propertyInfos: [{
            name: 'point',
            required: true,
            elementName: 'Point',
            typeInfo: '.PointType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LineStringType',
        baseTypeInfo: '.AbstractCurveType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }]
      }, {
        localName: 'MDPortrayalCatalogueReferenceType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_PortrayalCatalogueReference_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'portrayalCatalogueCitation',
            required: true,
            collection: true,
            elementName: {
              localPart: 'portrayalCatalogueCitation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }]
      }, {
        localName: 'ShellPropertyType',
        propertyInfos: [{
            name: 'shell',
            required: true,
            elementName: 'Shell',
            typeInfo: '.ShellType'
          }]
      }, {
        localName: 'DQTemporalConsistencyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TemporalConsistency_Type'
        },
        baseTypeInfo: '.AbstractDQTemporalAccuracyType'
      }, {
        localName: 'MDIdentificationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Identification_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractMDIdentification',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractMD_Identification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractMDIdentificationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ArcType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'arcType'
        },
        propertyInfos: [{
            name: 'title',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            typeInfo: '.TitleEltType'
          }, {
            name: 'type',
            required: true,
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'from',
            typeInfo: 'NCName',
            type: 'attribute'
          }, {
            name: 'to',
            typeInfo: 'NCName',
            type: 'attribute'
          }]
      }, {
        localName: 'FeaturePropertyType',
        propertyInfos: [{
            name: 'abstractFeature',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractFeature',
            typeInfo: '.AbstractFeatureType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'NodePropertyType',
        propertyInfos: [{
            name: 'node',
            required: true,
            elementName: 'Node',
            typeInfo: '.NodeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDResolutionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Resolution_Type'
        },
        propertyInfos: [{
            name: 'equivalentScale',
            required: true,
            elementName: {
              localPart: 'equivalentScale',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRepresentativeFractionPropertyType'
          }, {
            name: 'distance',
            required: true,
            elementName: {
              localPart: 'distance',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DistancePropertyType'
          }]
      }, {
        localName: 'DQCompletenessCommissionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_CompletenessCommission_PropertyType'
        },
        propertyInfos: [{
            name: 'dqCompletenessCommission',
            required: true,
            elementName: {
              localPart: 'DQ_CompletenessCommission',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQCompletenessCommissionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'GeodeticDatumPropertyType',
        propertyInfos: [{
            name: 'geodeticDatum',
            required: true,
            elementName: 'GeodeticDatum',
            typeInfo: '.GeodeticDatumType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSStereoMatePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_StereoMate_PropertyType'
        },
        propertyInfos: [{
            name: 'dsStereoMate',
            required: true,
            elementName: {
              localPart: 'DS_StereoMate',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSStereoMateType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AffinePlacementType',
        propertyInfos: [{
            name: 'location',
            required: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'refDirection',
            required: true,
            collection: true,
            typeInfo: '.VectorType'
          }, {
            name: 'inDimension',
            required: true,
            typeInfo: 'PositiveInteger'
          }, {
            name: 'outDimension',
            required: true,
            typeInfo: 'PositiveInteger'
          }]
      }, {
        localName: 'MDGeometricObjectsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_GeometricObjects_PropertyType'
        },
        propertyInfos: [{
            name: 'mdGeometricObjects',
            required: true,
            elementName: {
              localPart: 'MD_GeometricObjects',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDGeometricObjectsType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DistancePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Distance_PropertyType'
        },
        propertyInfos: [{
            name: 'distance',
            required: true,
            elementName: {
              localPart: 'Distance',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.LengthType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ArcType',
        baseTypeInfo: '.ArcStringType'
      }, {
        localName: 'TinType.ControlPoint',
        typeName: null,
        propertyInfos: [{
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'geometricPositionGroup',
            required: true,
            minOccurs: 3,
            collection: true,
            elementTypeInfos: [{
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elements'
          }]
      }, {
        localName: 'CountryPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'Country_PropertyType'
        },
        propertyInfos: [{
            name: 'country',
            required: true,
            elementName: {
              localPart: 'Country',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TimeReferenceSystemType',
        baseTypeInfo: '.DefinitionType',
        propertyInfos: [{
            name: 'domainOfValidity',
            required: true
          }]
      }, {
        localName: 'TopoSolidPropertyType',
        propertyInfos: [{
            name: 'topoSolid',
            required: true,
            elementName: 'TopoSolid',
            typeInfo: '.TopoSolidType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQConformanceResultPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ConformanceResult_PropertyType'
        },
        propertyInfos: [{
            name: 'dqConformanceResult',
            required: true,
            elementName: {
              localPart: 'DQ_ConformanceResult',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQConformanceResultType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EXGeographicBoundingBoxPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_GeographicBoundingBox_PropertyType'
        },
        propertyInfos: [{
            name: 'exGeographicBoundingBox',
            required: true,
            elementName: {
              localPart: 'EX_GeographicBoundingBox',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXGeographicBoundingBoxType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'OperationMethodPropertyType',
        propertyInfos: [{
            name: 'operationMethod',
            required: true,
            elementName: 'OperationMethod',
            typeInfo: '.OperationMethodType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TimeTopologyPrimitivePropertyType',
        propertyInfos: [{
            name: 'abstractTimeTopologyPrimitive',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTimeTopologyPrimitive',
            typeInfo: '.AbstractTimeTopologyPrimitiveType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractTimeGeometricPrimitiveType',
        baseTypeInfo: '.AbstractTimePrimitiveType',
        propertyInfos: [{
            name: 'frame',
            attributeName: {
              localPart: 'frame'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CodeWithAuthorityType',
        baseTypeInfo: '.CodeType'
      }, {
        localName: 'PriorityLocationPropertyType',
        baseTypeInfo: '.LocationPropertyType',
        propertyInfos: [{
            name: 'priority',
            attributeName: {
              localPart: 'priority'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DirectPositionType',
        propertyInfos: [{
            name: 'value',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'Double'
            },
            type: 'value'
          }, {
            name: 'srsName',
            attributeName: {
              localPart: 'srsName'
            },
            type: 'attribute'
          }, {
            name: 'srsDimension',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'srsDimension'
            },
            type: 'attribute'
          }, {
            name: 'axisLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'axisLabels'
            },
            type: 'attribute'
          }, {
            name: 'uomLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'uomLabels'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LISourcePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LI_Source_PropertyType'
        },
        propertyInfos: [{
            name: 'liSource',
            required: true,
            elementName: {
              localPart: 'LI_Source',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LISourceType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'RectifiedGridType',
        baseTypeInfo: '.GridType'
      }, {
        localName: 'DQThematicClassificationCorrectnessType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ThematicClassificationCorrectness_Type'
        },
        baseTypeInfo: '.AbstractDQThematicAccuracyType'
      }, {
        localName: 'MDLegalConstraintsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_LegalConstraints_PropertyType'
        },
        propertyInfos: [{
            name: 'mdLegalConstraints',
            required: true,
            elementName: {
              localPart: 'MD_LegalConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDLegalConstraintsType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDProgressCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ProgressCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdProgressCode',
            required: true,
            elementName: {
              localPart: 'MD_ProgressCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'OperationMethodType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'formulaCitation',
            required: true,
            typeInfo: '.FormulaCitation'
          }, {
            name: 'formula',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.CodeType',
            type: 'elementRef'
          }, {
            name: 'sourceDimensions',
            typeInfo: 'PositiveInteger'
          }, {
            name: 'targetDimensions',
            typeInfo: 'PositiveInteger'
          }, {
            name: 'parameter',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.AbstractGeneralOperationParameterPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'MeasurePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Measure_PropertyType'
        },
        propertyInfos: [{
            name: 'measure',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'Measure',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.MeasureType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDAggregateInformationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_AggregateInformation_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'aggregateDataSetName',
            elementName: {
              localPart: 'aggregateDataSetName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: 'aggregateDataSetIdentifier',
            elementName: {
              localPart: 'aggregateDataSetIdentifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierPropertyType'
          }, {
            name: 'associationType',
            required: true,
            elementName: {
              localPart: 'associationType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSAssociationTypeCodePropertyType'
          }, {
            name: 'initiativeType',
            elementName: {
              localPart: 'initiativeType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSInitiativeTypeCodePropertyType'
          }]
      }, {
        localName: 'DQDataQualityType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_DataQuality_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'scope',
            required: true,
            elementName: {
              localPart: 'scope',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQScopePropertyType'
          }, {
            name: 'report',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'report',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQElementPropertyType'
          }, {
            name: 'lineage',
            elementName: {
              localPart: 'lineage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LILineagePropertyType'
          }]
      }, {
        localName: 'BinaryPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Binary_PropertyType'
        },
        propertyInfos: [{
            name: 'binary',
            required: true,
            elementName: {
              localPart: 'Binary',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.BinaryType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDQLogicalConsistencyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_LogicalConsistency_Type'
        },
        baseTypeInfo: '.AbstractDQElementType'
      }, {
        localName: 'Extended',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'extended'
        },
        propertyInfos: [{
            name: 'extendedModel',
            minOccurs: 0,
            collection: true,
            elementTypeInfos: [{
                elementName: {
                  localPart: 'title',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.TitleEltType'
              }, {
                elementName: {
                  localPart: 'resource',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.ResourceType'
              }, {
                elementName: {
                  localPart: 'locator',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.LocatorType'
              }, {
                elementName: {
                  localPart: 'arc',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.ArcType'
              }],
            type: 'elements'
          }, {
            name: 'type',
            required: true,
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }]
      }, {
        localName: 'ObliqueCartesianCSPropertyType',
        propertyInfos: [{
            name: 'obliqueCartesianCS',
            required: true,
            elementName: 'ObliqueCartesianCS',
            typeInfo: '.ObliqueCartesianCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQScopeType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_Scope_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'level',
            required: true,
            elementName: {
              localPart: 'level',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDScopeCodePropertyType'
          }, {
            name: 'extent',
            elementName: {
              localPart: 'extent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXExtentPropertyType'
          }, {
            name: 'levelDescription',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'levelDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDScopeDescriptionPropertyType'
          }]
      }, {
        localName: 'PrimalSpaceFeaturesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'PrimalSpaceFeaturesType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'cellSpaceMember',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'cellSpaceMember',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceMemberType'
          }, {
            name: 'cellSpaceBoundaryMember',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'cellSpaceBoundaryMember',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceBoundaryMemberType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BaseUnitType',
        baseTypeInfo: '.UnitDefinitionType',
        propertyInfos: [{
            name: 'unitsSystem',
            required: true,
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'TimeInstantPropertyType',
        propertyInfos: [{
            name: 'timeInstant',
            required: true,
            elementName: 'TimeInstant',
            typeInfo: '.TimeInstantType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDRangeDimensionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_RangeDimension_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'sequenceIdentifier',
            elementName: {
              localPart: 'sequenceIdentifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MemberNamePropertyType'
          }, {
            name: 'descriptor',
            elementName: {
              localPart: 'descriptor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MDApplicationSchemaInformationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ApplicationSchemaInformation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdApplicationSchemaInformation',
            required: true,
            elementName: {
              localPart: 'MD_ApplicationSchemaInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDApplicationSchemaInformationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQAbsoluteExternalPositionalAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_AbsoluteExternalPositionalAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'dqAbsoluteExternalPositionalAccuracy',
            required: true,
            elementName: {
              localPart: 'DQ_AbsoluteExternalPositionalAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQAbsoluteExternalPositionalAccuracyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSSensorPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Sensor_PropertyType'
        },
        propertyInfos: [{
            name: 'dsSensor',
            required: true,
            elementName: {
              localPart: 'DS_Sensor',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSSensorType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSAssociationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Association_Type'
        },
        baseTypeInfo: '.AbstractObjectType'
      }, {
        localName: 'AbstractGeneralConversionType',
        baseTypeInfo: '.AbstractCoordinateOperationType'
      }, {
        localName: 'AbstractTimeTopologyPrimitiveType',
        baseTypeInfo: '.AbstractTimePrimitiveType',
        propertyInfos: [{
            name: 'complex',
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'TopoComplexPropertyType',
        propertyInfos: [{
            name: 'topoComplex',
            required: true,
            elementName: 'TopoComplex',
            typeInfo: '.TopoComplexType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'StateMemberType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'StateMemberType'
        },
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'state',
            required: true,
            elementName: {
              localPart: 'State',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.StateType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDFeatureCatalogueDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_FeatureCatalogueDescription_Type'
        },
        baseTypeInfo: '.AbstractMDContentInformationType',
        propertyInfos: [{
            name: 'complianceCode',
            elementName: {
              localPart: 'complianceCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'language',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'language',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'includedWithDataset',
            required: true,
            elementName: {
              localPart: 'includedWithDataset',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }, {
            name: 'featureTypes',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'featureTypes',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.GenericNamePropertyType'
          }, {
            name: 'featureCatalogueCitation',
            required: true,
            collection: true,
            elementName: {
              localPart: 'featureCatalogueCitation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }]
      }, {
        localName: 'BinaryType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Binary_Type'
        },
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'src',
            attributeName: {
              localPart: 'src'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ClothoidType.RefLocation',
        typeName: null,
        propertyInfos: [{
            name: 'affinePlacement',
            required: true,
            elementName: 'AffinePlacement',
            typeInfo: '.AffinePlacementType'
          }]
      }, {
        localName: 'VerticalCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'DQTemporalAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TemporalAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDQTemporalAccuracy',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDQ_TemporalAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDQTemporalAccuracyType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EllipsoidType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'semiMajorAxis',
            required: true,
            typeInfo: '.MeasureType'
          }, {
            name: 'secondDefiningParameter',
            required: true,
            typeInfo: '.SecondDefiningParameter'
          }]
      }, {
        localName: 'DSAggregatePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Aggregate_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractDSAggregate',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractDS_Aggregate',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractDSAggregateType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractMemberType',
        propertyInfos: [{
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PolygonType',
        baseTypeInfo: '.AbstractSurfaceType',
        propertyInfos: [{
            name: 'exterior',
            typeInfo: '.AbstractRingPropertyType'
          }, {
            name: 'interior',
            minOccurs: 0,
            collection: true,
            typeInfo: '.AbstractRingPropertyType'
          }]
      }, {
        localName: 'GeodeticCRSPropertyType',
        propertyInfos: [{
            name: 'geodeticCRS',
            required: true,
            elementName: 'GeodeticCRS',
            typeInfo: '.GeodeticCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CoordinateOperationPropertyType',
        propertyInfos: [{
            name: 'abstractCoordinateOperation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCoordinateOperation',
            typeInfo: '.AbstractCoordinateOperationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CompoundCRSPropertyType',
        propertyInfos: [{
            name: 'compoundCRS',
            required: true,
            elementName: 'CompoundCRS',
            typeInfo: '.CompoundCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EXSpatialTemporalExtentPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_SpatialTemporalExtent_PropertyType'
        },
        propertyInfos: [{
            name: 'exSpatialTemporalExtent',
            required: true,
            elementName: {
              localPart: 'EX_SpatialTemporalExtent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXSpatialTemporalExtentType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDConstraintsPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Constraints_PropertyType'
        },
        propertyInfos: [{
            name: 'mdConstraints',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'MD_Constraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDConstraintsType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ResultType',
        propertyInfos: [{
            name: 'any',
            required: true,
            allowDom: false,
            mixed: false,
            type: 'anyElement'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDDistributorType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Distributor_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'distributorContact',
            required: true,
            elementName: {
              localPart: 'distributorContact',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }, {
            name: 'distributionOrderProcess',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'distributionOrderProcess',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDStandardOrderProcessPropertyType'
          }, {
            name: 'distributorFormat',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'distributorFormat',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDFormatPropertyType'
          }, {
            name: 'distributorTransferOptions',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'distributorTransferOptions',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDDigitalTransferOptionsPropertyType'
          }]
      }, {
        localName: 'AbstractDQElementType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_Element_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'nameOfMeasure',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'nameOfMeasure',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'measureIdentification',
            elementName: {
              localPart: 'measureIdentification',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierPropertyType'
          }, {
            name: 'measureDescription',
            elementName: {
              localPart: 'measureDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'evaluationMethodType',
            elementName: {
              localPart: 'evaluationMethodType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQEvaluationMethodTypeCodePropertyType'
          }, {
            name: 'evaluationMethodDescription',
            elementName: {
              localPart: 'evaluationMethodDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'evaluationProcedure',
            elementName: {
              localPart: 'evaluationProcedure',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: 'dateTime',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'dateTime',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DateTimePropertyType'
          }, {
            name: 'result',
            required: true,
            maxOccurs: 2,
            collection: true,
            elementName: {
              localPart: 'result',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQResultPropertyType'
          }]
      }, {
        localName: 'UnlimitedIntegerType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UnlimitedInteger_Type'
        },
        propertyInfos: [{
            name: 'value',
            typeInfo: 'NonNegativeInteger',
            type: 'value'
          }, {
            name: 'isInfinite',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'isInfinite'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractGMLType',
        propertyInfos: [{
            name: 'metaDataProperty',
            minOccurs: 0,
            collection: true,
            typeInfo: '.MetaDataPropertyType'
          }, {
            name: 'description',
            typeInfo: '.StringOrRefType'
          }, {
            name: 'descriptionReference',
            typeInfo: '.ReferenceType'
          }, {
            name: 'identifier',
            typeInfo: '.CodeWithAuthorityType'
          }, {
            name: 'name',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CodeType'
          }, {
            name: 'id',
            required: true,
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ArcStringType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'posOrPointPropertyOrPointRep',
            required: true,
            minOccurs: 3,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'pointRep',
                typeInfo: '.PointPropertyType'
              }, {
                elementName: 'pos',
                typeInfo: '.DirectPositionType'
              }, {
                elementName: 'pointProperty',
                typeInfo: '.PointPropertyType'
              }],
            type: 'elementRefs'
          }, {
            name: 'posList',
            required: true,
            typeInfo: '.DirectPositionListType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }, {
            name: 'numArc',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'numArc'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DateTimePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'DateTime_PropertyType'
        },
        propertyInfos: [{
            name: 'dateTime',
            required: true,
            elementName: {
              localPart: 'DateTime',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'DateTime'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'EllipsoidPropertyType',
        propertyInfos: [{
            name: 'ellipsoid',
            required: true,
            elementName: 'Ellipsoid',
            typeInfo: '.EllipsoidType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'OperationParameterGroupPropertyType',
        propertyInfos: [{
            name: 'operationParameterGroup',
            required: true,
            elementName: 'OperationParameterGroup',
            typeInfo: '.OperationParameterGroupType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TemporalCSPropertyType',
        propertyInfos: [{
            name: 'temporalCS',
            required: true,
            elementName: 'TemporalCS',
            typeInfo: '.TemporalCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'IdentifiedObjectType',
        baseTypeInfo: '.DefinitionType'
      }, {
        localName: 'TopoVolumeType',
        baseTypeInfo: '.AbstractTopologyType',
        propertyInfos: [{
            name: 'directedTopoSolid',
            required: true,
            collection: true,
            typeInfo: '.DirectedTopoSolidPropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BoundingShapeType',
        propertyInfos: [{
            name: 'envelope',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'Envelope',
            typeInfo: '.EnvelopeType',
            type: 'elementRef'
          }, {
            name: '_null',
            required: true,
            elementName: 'Null',
            typeInfo: {
              type: 'list'
            }
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PointType',
        baseTypeInfo: '.AbstractGeometricPrimitiveType',
        propertyInfos: [{
            name: 'pos',
            required: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }]
      }, {
        localName: 'UnitOfMeasurePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'UnitOfMeasure_PropertyType'
        },
        propertyInfos: [{
            name: 'unitDefinition',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'UnitDefinition',
            typeInfo: '.UnitDefinitionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDQThematicAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_ThematicAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQElementType'
      }, {
        localName: 'CIOnlineResourcePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_OnlineResource_PropertyType'
        },
        propertyInfos: [{
            name: 'ciOnlineResource',
            required: true,
            elementName: {
              localPart: 'CI_OnlineResource',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIOnlineResourceType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DecimalPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Decimal_PropertyType'
        },
        propertyInfos: [{
            name: 'decimal',
            required: true,
            elementName: {
              localPart: 'Decimal',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ImageDatumPropertyType',
        propertyInfos: [{
            name: 'imageDatum',
            required: true,
            elementName: 'ImageDatum',
            typeInfo: '.ImageDatumType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TopoSolidType',
        baseTypeInfo: '.AbstractTopoPrimitiveType',
        propertyInfos: [{
            name: 'isolated',
            minOccurs: 0,
            collection: true,
            typeInfo: '.NodeOrEdgePropertyType'
          }, {
            name: 'directedFace',
            required: true,
            collection: true,
            typeInfo: '.DirectedFacePropertyType'
          }, {
            name: 'solidProperty',
            typeInfo: '.SolidPropertyType'
          }, {
            name: 'universal',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'universal'
            },
            type: 'attribute'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CellSpaceBoundaryPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceBoundaryPropertyType'
        },
        propertyInfos: [{
            name: 'cellSpaceBoundary',
            required: true,
            elementName: {
              localPart: 'CellSpaceBoundary',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CellSpaceBoundaryType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DirectedObservationAtDistanceType',
        baseTypeInfo: '.DirectedObservationType',
        propertyInfos: [{
            name: 'distance',
            required: true,
            typeInfo: '.MeasureType'
          }]
      }, {
        localName: 'MDMediumPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Medium_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMedium',
            required: true,
            elementName: {
              localPart: 'MD_Medium',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMediumType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DynamicFeatureMemberType',
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'dynamicFeature',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'DynamicFeature',
            typeInfo: '.DynamicFeatureType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractMetadataPropertyType',
        propertyInfos: [{
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'EXTemporalExtentPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_TemporalExtent_PropertyType'
        },
        propertyInfos: [{
            name: 'exTemporalExtent',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'EX_TemporalExtent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXTemporalExtentType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractGeneralParameterValuePropertyType',
        propertyInfos: [{
            name: 'abstractGeneralParameterValue',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeneralParameterValue',
            typeInfo: '.AbstractGeneralParameterValueType',
            type: 'elementRef'
          }]
      }, {
        localName: 'CellSpaceGeometryType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceGeometryType'
        },
        propertyInfos: [{
            name: 'geometry3D',
            required: true,
            elementName: {
              localPart: 'Geometry3D',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SolidPropertyType'
          }, {
            name: 'geometry2D',
            required: true,
            elementName: {
              localPart: 'Geometry2D',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SurfacePropertyType'
          }]
      }, {
        localName: 'AbstractGeneralOperationParameterPropertyType',
        propertyInfos: [{
            name: 'abstractGeneralOperationParameter',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeneralOperationParameter',
            typeInfo: '.AbstractGeneralOperationParameterType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDMediumType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Medium_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'name',
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMediumNameCodePropertyType'
          }, {
            name: 'density',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'density',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RealPropertyType'
          }, {
            name: 'densityUnits',
            elementName: {
              localPart: 'densityUnits',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'volumes',
            elementName: {
              localPart: 'volumes',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'mediumFormat',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'mediumFormat',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMediumFormatCodePropertyType'
          }, {
            name: 'mediumNote',
            elementName: {
              localPart: 'mediumNote',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'DQConceptualConsistencyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_ConceptualConsistency_Type'
        },
        baseTypeInfo: '.AbstractDQLogicalConsistencyType'
      }, {
        localName: 'TopoSurfacePropertyType',
        propertyInfos: [{
            name: 'topoSurface',
            required: true,
            elementName: 'TopoSurface',
            typeInfo: '.TopoSurfaceType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeneralTransformationPropertyType',
        propertyInfos: [{
            name: 'abstractGeneralTransformation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeneralTransformation',
            typeInfo: '.AbstractGeneralTransformationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'FaceOrTopoSolidPropertyType',
        propertyInfos: [{
            name: 'face',
            required: true,
            elementName: 'Face',
            typeInfo: '.FaceType'
          }, {
            name: 'topoSolid',
            required: true,
            elementName: 'TopoSolid',
            typeInfo: '.TopoSolidType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractTimeSliceType',
        baseTypeInfo: '.AbstractGMLType',
        propertyInfos: [{
            name: 'validTime',
            required: true,
            typeInfo: '.TimePrimitivePropertyType'
          }, {
            name: 'dataSource',
            typeInfo: '.StringOrRefType'
          }]
      }, {
        localName: 'MDRestrictionCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_RestrictionCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdRestrictionCode',
            required: true,
            elementName: {
              localPart: 'MD_RestrictionCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CartesianCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'AbstractMDIdentificationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractMD_Identification_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'citation',
            required: true,
            elementName: {
              localPart: 'citation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: '_abstract',
            required: true,
            elementName: {
              localPart: 'abstract',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'purpose',
            elementName: {
              localPart: 'purpose',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'credit',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'credit',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'status',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'status',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDProgressCodePropertyType'
          }, {
            name: 'pointOfContact',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'pointOfContact',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }, {
            name: 'resourceMaintenance',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'resourceMaintenance',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMaintenanceInformationPropertyType'
          }, {
            name: 'graphicOverview',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'graphicOverview',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDBrowseGraphicPropertyType'
          }, {
            name: 'resourceFormat',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'resourceFormat',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDFormatPropertyType'
          }, {
            name: 'descriptiveKeywords',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'descriptiveKeywords',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDKeywordsPropertyType'
          }, {
            name: 'resourceSpecificUsage',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'resourceSpecificUsage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDUsagePropertyType'
          }, {
            name: 'resourceConstraints',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'resourceConstraints',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDConstraintsPropertyType'
          }, {
            name: 'aggregationInfo',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'aggregationInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDAggregateInformationPropertyType'
          }]
      }, {
        localName: 'SingleOperationPropertyType',
        propertyInfos: [{
            name: 'abstractSingleOperation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSingleOperation',
            typeInfo: '.AbstractCoordinateOperationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQAccuracyOfATimeMeasurementType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_AccuracyOfATimeMeasurement_Type'
        },
        baseTypeInfo: '.AbstractDQTemporalAccuracyType'
      }, {
        localName: 'CartesianCSPropertyType',
        propertyInfos: [{
            name: 'cartesianCS',
            required: true,
            elementName: 'CartesianCS',
            typeInfo: '.CartesianCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'FileType',
        propertyInfos: [{
            name: 'rangeParameters',
            required: true,
            typeInfo: '.AssociationRoleType'
          }, {
            name: 'fileName',
            required: true
          }, {
            name: 'fileReference',
            required: true
          }, {
            name: 'fileStructure',
            required: true,
            typeInfo: '.CodeType'
          }, {
            name: 'mimeType'
          }, {
            name: 'compression'
          }]
      }, {
        localName: 'GridLengthType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'MDKeywordsType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Keywords_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'keyword',
            required: true,
            collection: true,
            elementName: {
              localPart: 'keyword',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'type',
            elementName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDKeywordTypeCodePropertyType'
          }, {
            name: 'thesaurusName',
            elementName: {
              localPart: 'thesaurusName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }]
      }, {
        localName: 'GenericMetaDataType',
        baseTypeInfo: '.AbstractMetaDataType'
      }, {
        localName: 'VerticalDatumPropertyType',
        propertyInfos: [{
            name: 'verticalDatum',
            required: true,
            elementName: 'VerticalDatum',
            typeInfo: '.VerticalDatumType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AngleChoiceType',
        propertyInfos: [{
            name: 'angle',
            required: true,
            typeInfo: '.AngleType'
          }, {
            name: 'dmsAngle',
            required: true,
            typeInfo: '.DMSAngleType'
          }]
      }, {
        localName: 'IntegerPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Integer_PropertyType'
        },
        propertyInfos: [{
            name: 'integer',
            required: true,
            elementName: {
              localPart: 'Integer',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Integer'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DerivedCRSPropertyType',
        propertyInfos: [{
            name: 'derivedCRS',
            required: true,
            elementName: 'DerivedCRS',
            typeInfo: '.DerivedCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TMPrimitivePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gts',
          localPart: 'TM_Primitive_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractTimePrimitive',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTimePrimitive',
            typeInfo: '.AbstractTimePrimitiveType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDTopologyLevelCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_TopologyLevelCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdTopologyLevelCode',
            required: true,
            elementName: {
              localPart: 'MD_TopologyLevelCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CIResponsiblePartyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_ResponsibleParty_PropertyType'
        },
        propertyInfos: [{
            name: 'ciResponsibleParty',
            required: true,
            elementName: {
              localPart: 'CI_ResponsibleParty',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SingleCRSPropertyType',
        propertyInfos: [{
            name: 'abstractSingleCRS',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSingleCRS',
            typeInfo: '.AbstractCRSType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MultiLayeredGraphType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'MultiLayeredGraphType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'spaceLayers',
            required: true,
            collection: true,
            elementName: {
              localPart: 'spaceLayers',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SpaceLayersType'
          }, {
            name: 'interEdges',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'interEdges',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.InterEdgesType'
          }]
      }, {
        localName: 'MDIdentifierPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Identifier_PropertyType'
        },
        propertyInfos: [{
            name: 'mdIdentifier',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'MD_Identifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDIdentifierType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'LISourceType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LI_Source_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'description',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'scaleDenominator',
            elementName: {
              localPart: 'scaleDenominator',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDRepresentativeFractionPropertyType'
          }, {
            name: 'sourceReferenceSystem',
            elementName: {
              localPart: 'sourceReferenceSystem',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDReferenceSystemPropertyType'
          }, {
            name: 'sourceCitation',
            elementName: {
              localPart: 'sourceCitation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CICitationPropertyType'
          }, {
            name: 'sourceExtent',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'sourceExtent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXExtentPropertyType'
          }, {
            name: 'sourceStep',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'sourceStep',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LIProcessStepPropertyType'
          }]
      }, {
        localName: 'BoundedFeatureType',
        baseTypeInfo: '.AbstractFeatureType'
      }, {
        localName: 'GeocentricCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'usesCartesianCS',
            required: true,
            typeInfo: '.CartesianCSPropertyType'
          }, {
            name: 'usesSphericalCS',
            required: true,
            typeInfo: '.SphericalCSPropertyType'
          }, {
            name: 'usesGeodeticDatum',
            required: true,
            typeInfo: '.GeodeticDatumPropertyType'
          }]
      }, {
        localName: 'RSIdentifierType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'RS_Identifier_Type'
        },
        baseTypeInfo: '.MDIdentifierType',
        propertyInfos: [{
            name: 'codeSpace',
            elementName: {
              localPart: 'codeSpace',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'version',
            elementName: {
              localPart: 'version',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'DSAssociationTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_AssociationTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'dsAssociationTypeCode',
            required: true,
            elementName: {
              localPart: 'DS_AssociationTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ObjectReferencePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'ObjectReference_PropertyType'
        },
        propertyInfos: [{
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CIContactPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Contact_PropertyType'
        },
        propertyInfos: [{
            name: 'ciContact',
            required: true,
            elementName: {
              localPart: 'CI_Contact',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIContactType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'LengthPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Length_PropertyType'
        },
        propertyInfos: [{
            name: 'length',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'Length',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.LengthType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSSeriesType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Series_Type'
        },
        baseTypeInfo: '.AbstractDSAggregateType'
      }, {
        localName: 'TimeOrdinalReferenceSystemType',
        baseTypeInfo: '.TimeReferenceSystemType',
        propertyInfos: [{
            name: 'component',
            required: true,
            collection: true,
            typeInfo: '.TimeOrdinalEraPropertyType'
          }]
      }, {
        localName: 'AngleType',
        baseTypeInfo: '.MeasureType'
      }, {
        localName: 'CIResponsiblePartyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_ResponsibleParty_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'individualName',
            elementName: {
              localPart: 'individualName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'organisationName',
            elementName: {
              localPart: 'organisationName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'positionName',
            elementName: {
              localPart: 'positionName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'contactInfo',
            elementName: {
              localPart: 'contactInfo',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIContactPropertyType'
          }, {
            name: 'role',
            required: true,
            elementName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIRoleCodePropertyType'
          }]
      }, {
        localName: 'URLPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'URL_PropertyType'
        },
        propertyInfos: [{
            name: 'url',
            required: true,
            elementName: {
              localPart: 'URL',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            }
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'EllipsoidalCSPropertyType',
        propertyInfos: [{
            name: 'ellipsoidalCS',
            required: true,
            elementName: 'EllipsoidalCS',
            typeInfo: '.EllipsoidalCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'TemporalCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'AbstractTopoPrimitiveType',
        baseTypeInfo: '.AbstractTopologyType'
      }, {
        localName: 'StatePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'StatePropertyType'
        },
        propertyInfos: [{
            name: 'state',
            required: true,
            elementName: {
              localPart: 'State',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.StateType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSDataSetPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_DataSet_PropertyType'
        },
        propertyInfos: [{
            name: 'dsDataSet',
            required: true,
            elementName: {
              localPart: 'DS_DataSet',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSDataSetType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CurveSegmentArrayPropertyType',
        propertyInfos: [{
            name: 'abstractCurveSegment',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCurveSegment',
            typeInfo: '.AbstractCurveSegmentType',
            type: 'elementRef'
          }]
      }, {
        localName: 'MDGeorectifiedPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Georectified_PropertyType'
        },
        propertyInfos: [{
            name: 'mdGeorectified',
            required: true,
            elementName: {
              localPart: 'MD_Georectified',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDGeorectifiedType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SurfacePropertyType',
        propertyInfos: [{
            name: 'abstractSurface',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractSurface',
            typeInfo: '.AbstractSurfaceType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ClothoidType',
        baseTypeInfo: '.AbstractCurveSegmentType',
        propertyInfos: [{
            name: 'refLocation',
            required: true,
            typeInfo: '.ClothoidType.RefLocation'
          }, {
            name: 'scaleFactor',
            required: true,
            typeInfo: 'Decimal'
          }, {
            name: 'startParameter',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'endParameter',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'interpolation',
            typeInfo: '.CurveInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractSurfacePatchType'
      }, {
        localName: 'DatumPropertyType',
        propertyInfos: [{
            name: 'abstractDatum',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractDatum',
            typeInfo: '.AbstractDatumType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQCompletenessOmissionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_CompletenessOmission_Type'
        },
        baseTypeInfo: '.AbstractDQCompletenessType'
      }, {
        localName: 'EnvelopeType',
        propertyInfos: [{
            name: 'lowerCorner',
            required: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'upperCorner',
            required: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'pos',
            required: true,
            minOccurs: 2,
            maxOccurs: 2,
            collection: true,
            typeInfo: '.DirectPositionType'
          }, {
            name: 'coordinates',
            required: true,
            typeInfo: '.CoordinatesType'
          }, {
            name: 'srsName',
            attributeName: {
              localPart: 'srsName'
            },
            type: 'attribute'
          }, {
            name: 'srsDimension',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'srsDimension'
            },
            type: 'attribute'
          }, {
            name: 'axisLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'axisLabels'
            },
            type: 'attribute'
          }, {
            name: 'uomLabels',
            typeInfo: {
              type: 'list',
              baseTypeInfo: 'NCName'
            },
            attributeName: {
              localPart: 'uomLabels'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CompositeSurfaceType',
        baseTypeInfo: '.AbstractSurfaceType',
        propertyInfos: [{
            name: 'surfaceMember',
            required: true,
            collection: true,
            typeInfo: '.SurfacePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQRelativeInternalPositionalAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_RelativeInternalPositionalAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQPositionalAccuracyType'
      }, {
        localName: 'MultiGeometryType',
        baseTypeInfo: '.AbstractGeometricAggregateType',
        propertyInfos: [{
            name: 'geometryMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.GeometryPropertyType'
          }, {
            name: 'geometryMembers',
            typeInfo: '.GeometryArrayPropertyType'
          }]
      }, {
        localName: 'ObservationType',
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'validTime',
            required: true,
            typeInfo: '.TimePrimitivePropertyType'
          }, {
            name: 'using',
            typeInfo: '.ProcedurePropertyType'
          }, {
            name: 'target',
            mixed: false,
            allowDom: false,
            typeInfo: '.TargetPropertyType',
            type: 'elementRef'
          }, {
            name: 'resultOf',
            required: true,
            typeInfo: '.ResultType'
          }]
      }, {
        localName: 'CellSpaceBoundaryGeometryType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'CellSpaceBoundaryGeometryType'
        },
        propertyInfos: [{
            name: 'geometry3D',
            required: true,
            elementName: {
              localPart: 'geometry3D',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SurfacePropertyType'
          }, {
            name: 'geometry2D',
            required: true,
            elementName: {
              localPart: 'geometry2D',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CurvePropertyType'
          }]
      }, {
        localName: 'MDVectorSpatialRepresentationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_VectorSpatialRepresentation_Type'
        },
        baseTypeInfo: '.AbstractMDSpatialRepresentationType',
        propertyInfos: [{
            name: 'topologyLevel',
            elementName: {
              localPart: 'topologyLevel',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDTopologyLevelCodePropertyType'
          }, {
            name: 'geometricObjects',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'geometricObjects',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDGeometricObjectsPropertyType'
          }]
      }, {
        localName: 'NodesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'NodesType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'stateMember',
            required: true,
            collection: true,
            elementName: {
              localPart: 'stateMember',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.StateMemberType'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDScopeDescriptionType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ScopeDescription_Type'
        },
        propertyInfos: [{
            name: 'attributes',
            required: true,
            collection: true,
            elementName: {
              localPart: 'attributes',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }, {
            name: 'features',
            required: true,
            collection: true,
            elementName: {
              localPart: 'features',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }, {
            name: 'featureInstances',
            required: true,
            collection: true,
            elementName: {
              localPart: 'featureInstances',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }, {
            name: 'attributeInstances',
            required: true,
            collection: true,
            elementName: {
              localPart: 'attributeInstances',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.ObjectReferencePropertyType'
          }, {
            name: 'dataset',
            required: true,
            elementName: {
              localPart: 'dataset',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'other',
            required: true,
            elementName: {
              localPart: 'other',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MultiplicityRangeType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'MultiplicityRange_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'lower',
            required: true,
            elementName: {
              localPart: 'lower',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.IntegerPropertyType'
          }, {
            name: 'upper',
            required: true,
            elementName: {
              localPart: 'upper',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.UnlimitedIntegerPropertyType'
          }]
      }, {
        localName: 'InterEdgesType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'InterEdgesType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'interLayerConnectionMember',
            required: true,
            collection: true,
            elementName: {
              localPart: 'interLayerConnectionMember',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.InterLayerConnectionMemberType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MDStandardOrderProcessType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_StandardOrderProcess_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'fees',
            elementName: {
              localPart: 'fees',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'plannedAvailableDateTime',
            elementName: {
              localPart: 'plannedAvailableDateTime',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DateTimePropertyType'
          }, {
            name: 'orderingInstructions',
            elementName: {
              localPart: 'orderingInstructions',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'turnaround',
            elementName: {
              localPart: 'turnaround',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'LocationPropertyType',
        propertyInfos: [{
            name: 'abstractGeometry',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'locationKeyWord',
            required: true,
            elementName: 'LocationKeyWord',
            typeInfo: '.CodeType'
          }, {
            name: 'locationString',
            required: true,
            elementName: 'LocationString',
            typeInfo: '.StringOrRefType'
          }, {
            name: '_null',
            required: true,
            elementName: 'Null',
            typeInfo: {
              type: 'list'
            }
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CylindricalCSPropertyType',
        propertyInfos: [{
            name: 'cylindricalCS',
            required: true,
            elementName: 'CylindricalCS',
            typeInfo: '.CylindricalCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MultiSurfaceType',
        baseTypeInfo: '.AbstractGeometricAggregateType',
        propertyInfos: [{
            name: 'surfaceMember',
            minOccurs: 0,
            collection: true,
            typeInfo: '.SurfacePropertyType'
          }, {
            name: 'surfaceMembers',
            typeInfo: '.SurfaceArrayPropertyType'
          }]
      }, {
        localName: 'LinearCSPropertyType',
        propertyInfos: [{
            name: 'linearCS',
            required: true,
            elementName: 'LinearCS',
            typeInfo: '.LinearCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MultiplicityRangePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'MultiplicityRange_PropertyType'
        },
        propertyInfos: [{
            name: 'multiplicityRange',
            required: true,
            elementName: {
              localPart: 'MultiplicityRange',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.MultiplicityRangeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ExternalReferenceType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'ExternalReferenceType'
        },
        propertyInfos: [{
            name: 'informationSystem',
            elementName: {
              localPart: 'informationSystem',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            }
          }, {
            name: 'externalObject',
            required: true,
            elementName: {
              localPart: 'externalObject',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.ExternalObjectReferenceType'
          }]
      }, {
        localName: 'MDMaintenanceInformationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MaintenanceInformation_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'maintenanceAndUpdateFrequency',
            required: true,
            elementName: {
              localPart: 'maintenanceAndUpdateFrequency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMaintenanceFrequencyCodePropertyType'
          }, {
            name: 'dateOfNextUpdate',
            elementName: {
              localPart: 'dateOfNextUpdate',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DatePropertyType'
          }, {
            name: 'userDefinedMaintenanceFrequency',
            elementName: {
              localPart: 'userDefinedMaintenanceFrequency',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.TMPeriodDurationPropertyType'
          }, {
            name: 'updateScope',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'updateScope',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDScopeCodePropertyType'
          }, {
            name: 'updateScopeDescription',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'updateScopeDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDScopeDescriptionPropertyType'
          }, {
            name: 'maintenanceNote',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'maintenanceNote',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'contact',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'contact',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CIResponsiblePartyPropertyType'
          }]
      }, {
        localName: 'SolidType',
        baseTypeInfo: '.AbstractSolidType',
        propertyInfos: [{
            name: 'exterior',
            typeInfo: '.ShellPropertyType'
          }, {
            name: 'interior',
            minOccurs: 0,
            collection: true,
            typeInfo: '.ShellPropertyType'
          }]
      }, {
        localName: 'DirectedObservationType',
        baseTypeInfo: '.ObservationType',
        propertyInfos: [{
            name: 'direction',
            required: true,
            typeInfo: '.DirectionPropertyType'
          }]
      }, {
        localName: 'MDClassificationCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ClassificationCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdClassificationCode',
            required: true,
            elementName: {
              localPart: 'MD_ClassificationCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DQRelativeInternalPositionalAccuracyPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_RelativeInternalPositionalAccuracy_PropertyType'
        },
        propertyInfos: [{
            name: 'dqRelativeInternalPositionalAccuracy',
            required: true,
            elementName: {
              localPart: 'DQ_RelativeInternalPositionalAccuracy',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DQRelativeInternalPositionalAccuracyType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractDQTemporalAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractDQ_TemporalAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQElementType'
      }, {
        localName: 'CylindricalCSType',
        baseTypeInfo: '.AbstractCoordinateSystemType'
      }, {
        localName: 'MDSpatialRepresentationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_SpatialRepresentation_PropertyType'
        },
        propertyInfos: [{
            name: 'abstractMDSpatialRepresentation',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'AbstractMD_SpatialRepresentation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.AbstractMDSpatialRepresentationType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SecondDefiningParameter',
        typeName: null,
        propertyInfos: [{
            name: 'secondDefiningParameter',
            required: true,
            elementName: 'SecondDefiningParameter',
            typeInfo: '.SecondDefiningParameter'
          }]
      }, {
        localName: 'RelatedTimeType',
        baseTypeInfo: '.TimePrimitivePropertyType',
        propertyInfos: [{
            name: 'relativePosition',
            values: ['Before', 'After', 'Begins', 'Ends', 'During', 'Equals', 'Contains', 'Overlaps', 'Meets', 'OverlappedBy', 'MetBy', 'BegunBy', 'EndedBy'],
            attributeName: {
              localPart: 'relativePosition'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TransformationPropertyType',
        propertyInfos: [{
            name: 'transformation',
            required: true,
            elementName: 'Transformation',
            typeInfo: '.TransformationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CIOnLineFunctionCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_OnLineFunctionCode_PropertyType'
        },
        propertyInfos: [{
            name: 'ciOnLineFunctionCode',
            required: true,
            elementName: {
              localPart: 'CI_OnLineFunctionCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RealPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Real_PropertyType'
        },
        propertyInfos: [{
            name: 'real',
            required: true,
            elementName: {
              localPart: 'Real',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: 'Double'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'VerticalCRSType',
        baseTypeInfo: '.AbstractCRSType',
        propertyInfos: [{
            name: 'verticalCS',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.VerticalCSPropertyType',
            type: 'elementRef'
          }, {
            name: 'verticalDatum',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.VerticalDatumPropertyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'GridType',
        baseTypeInfo: '.AbstractGeometryType',
        propertyInfos: [{
            name: 'rest',
            required: true,
            minOccurs: 2,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: 'axisLabels',
                typeInfo: {
                  type: 'list',
                  baseTypeInfo: 'NCName'
                }
              }, {
                elementName: 'limits',
                typeInfo: '.GridLimitsType'
              }, {
                elementName: 'axisName'
              }],
            type: 'elementRefs'
          }, {
            name: 'dimension',
            required: true,
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'dimension'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PrimalSpaceFeaturesPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'PrimalSpaceFeaturesPropertyType'
        },
        propertyInfos: [{
            name: 'primalSpaceFeatures',
            required: true,
            elementName: {
              localPart: 'PrimalSpaceFeatures',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.PrimalSpaceFeaturesType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDCoverageDescriptionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_CoverageDescription_PropertyType'
        },
        propertyInfos: [{
            name: 'mdCoverageDescription',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'MD_CoverageDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDCoverageDescriptionType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDDimensionNameTypeCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DimensionNameTypeCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdDimensionNameTypeCode',
            required: true,
            elementName: {
              localPart: 'MD_DimensionNameTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CIAddressType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'CI_Address_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'deliveryPoint',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'deliveryPoint',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'city',
            elementName: {
              localPart: 'city',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'administrativeArea',
            elementName: {
              localPart: 'administrativeArea',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'postalCode',
            elementName: {
              localPart: 'postalCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'country',
            elementName: {
              localPart: 'country',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'electronicMailAddress',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'electronicMailAddress',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'TimeNodeType',
        baseTypeInfo: '.AbstractTimeTopologyPrimitiveType',
        propertyInfos: [{
            name: 'previousEdge',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TimeEdgePropertyType'
          }, {
            name: 'nextEdge',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TimeEdgePropertyType'
          }, {
            name: 'position',
            typeInfo: '.TimeInstantPropertyType'
          }]
      }, {
        localName: 'MDDataIdentificationType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_DataIdentification_Type'
        },
        baseTypeInfo: '.AbstractMDIdentificationType',
        propertyInfos: [{
            name: 'spatialRepresentationType',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'spatialRepresentationType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDSpatialRepresentationTypeCodePropertyType'
          }, {
            name: 'spatialResolution',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'spatialResolution',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDResolutionPropertyType'
          }, {
            name: 'language',
            required: true,
            collection: true,
            elementName: {
              localPart: 'language',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'characterSet',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'characterSet',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDCharacterSetCodePropertyType'
          }, {
            name: 'topicCategory',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'topicCategory',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDTopicCategoryCodePropertyType'
          }, {
            name: 'environmentDescription',
            elementName: {
              localPart: 'environmentDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'extent',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'extent',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXExtentPropertyType'
          }, {
            name: 'supplementalInformation',
            elementName: {
              localPart: 'supplementalInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'AbstractRSReferenceSystemType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractRS_ReferenceSystem_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RSIdentifierPropertyType'
          }, {
            name: 'domainOfValidity',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'domainOfValidity',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXExtentPropertyType'
          }]
      }, {
        localName: 'MDScopeDescriptionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ScopeDescription_PropertyType'
        },
        propertyInfos: [{
            name: 'mdScopeDescription',
            required: true,
            elementName: {
              localPart: 'MD_ScopeDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDScopeDescriptionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DirectedTopoSolidPropertyType',
        propertyInfos: [{
            name: 'topoSolid',
            required: true,
            elementName: 'TopoSolid',
            typeInfo: '.TopoSolidType'
          }, {
            name: 'orientation',
            values: ['-', '+'],
            attributeName: {
              localPart: 'orientation'
            },
            type: 'attribute'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DomainSetType',
        propertyInfos: [{
            name: 'abstractGeometry',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractGeometry',
            typeInfo: '.AbstractGeometryType',
            type: 'elementRef'
          }, {
            name: 'abstractTimeObject',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractTimeObject',
            typeInfo: '.AbstractTimeObjectType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ValueArrayType',
        baseTypeInfo: '.CompositeValueType',
        propertyInfos: [{
            name: 'codeSpace',
            attributeName: {
              localPart: 'codeSpace'
            },
            type: 'attribute'
          }, {
            name: 'uom',
            attributeName: {
              localPart: 'uom'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractCoverageType',
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'domainSet',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.DomainSetType',
            type: 'elementRef'
          }, {
            name: 'rangeSet',
            required: true,
            typeInfo: '.RangeSetType'
          }]
      }, {
        localName: 'AbstractCoordinateOperationType',
        baseTypeInfo: '.IdentifiedObjectType',
        propertyInfos: [{
            name: 'domainOfValidity',
            typeInfo: '.DomainOfValidity'
          }, {
            name: 'scope',
            required: true,
            collection: true
          }, {
            name: 'operationVersion'
          }, {
            name: 'coordinateOperationAccuracy',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CoordinateOperationAccuracy'
          }, {
            name: 'sourceCRS',
            typeInfo: '.CRSPropertyType'
          }, {
            name: 'targetCRS',
            typeInfo: '.CRSPropertyType'
          }]
      }, {
        localName: 'TimeEdgePropertyType',
        propertyInfos: [{
            name: 'timeEdge',
            required: true,
            elementName: 'TimeEdge',
            typeInfo: '.TimeEdgeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SphericalCSPropertyType',
        propertyInfos: [{
            name: 'sphericalCS',
            required: true,
            elementName: 'SphericalCS',
            typeInfo: '.SphericalCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DiscreteCoverageType',
        baseTypeInfo: '.AbstractCoverageType',
        propertyInfos: [{
            name: 'coverageFunction',
            typeInfo: '.CoverageFunctionType'
          }]
      }, {
        localName: 'DQTopologicalConsistencyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_TopologicalConsistency_Type'
        },
        baseTypeInfo: '.AbstractDQLogicalConsistencyType'
      }, {
        localName: 'MDReferenceSystemType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_ReferenceSystem_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'referenceSystemIdentifier',
            elementName: {
              localPart: 'referenceSystemIdentifier',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.RSIdentifierPropertyType'
          }]
      }, {
        localName: 'TransitionMemberType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'TransitionMemberType'
        },
        baseTypeInfo: '.AbstractFeatureMemberType',
        propertyInfos: [{
            name: 'transition',
            required: true,
            elementName: {
              localPart: 'Transition',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.TransitionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDCellGeometryCodePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_CellGeometryCode_PropertyType'
        },
        propertyInfos: [{
            name: 'mdCellGeometryCode',
            required: true,
            elementName: {
              localPart: 'MD_CellGeometryCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CodeListValueType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeocentricCRSPropertyType',
        propertyInfos: [{
            name: 'geocentricCRS',
            required: true,
            elementName: 'GeocentricCRS',
            typeInfo: '.GeocentricCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DQGriddedDataPositionalAccuracyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DQ_GriddedDataPositionalAccuracy_Type'
        },
        baseTypeInfo: '.AbstractDQPositionalAccuracyType'
      }, {
        localName: 'ImageCRSPropertyType',
        propertyInfos: [{
            name: 'imageCRS',
            required: true,
            elementName: 'ImageCRS',
            typeInfo: '.ImageCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'EngineeringDatumType',
        baseTypeInfo: '.AbstractDatumType'
      }, {
        localName: 'MDMaintenanceInformationPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_MaintenanceInformation_PropertyType'
        },
        propertyInfos: [{
            name: 'mdMaintenanceInformation',
            required: true,
            elementName: {
              localPart: 'MD_MaintenanceInformation',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDMaintenanceInformationType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'UserDefinedCSPropertyType',
        propertyInfos: [{
            name: 'userDefinedCS',
            required: true,
            elementName: 'UserDefinedCS',
            typeInfo: '.UserDefinedCSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CountPropertyType',
        propertyInfos: [{
            name: 'count',
            required: true,
            elementName: 'Count',
            typeInfo: '.Count'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDStandardOrderProcessPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_StandardOrderProcess_PropertyType'
        },
        propertyInfos: [{
            name: 'mdStandardOrderProcess',
            required: true,
            elementName: {
              localPart: 'MD_StandardOrderProcess',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDStandardOrderProcessType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'GeographicCRSPropertyType',
        propertyInfos: [{
            name: 'geographicCRS',
            required: true,
            elementName: 'GeographicCRS',
            typeInfo: '.GeographicCRSType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'SpaceLayerType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'SpaceLayerType'
        },
        baseTypeInfo: '.AbstractFeatureType',
        propertyInfos: [{
            name: 'usage',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'usage',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CodeType'
          }, {
            name: 'terminationDate',
            elementName: {
              localPart: 'terminationDate',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: 'DateTime'
          }, {
            name: 'function',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'function',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.CodeType'
          }, {
            name: 'creationDate',
            elementName: {
              localPart: 'creationDate',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: 'DateTime'
          }, {
            name: 'clazz',
            elementName: {
              localPart: 'class',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.SpaceLayerClassTypeType'
          }, {
            name: 'nodes',
            required: true,
            collection: true,
            elementName: {
              localPart: 'nodes',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.NodesType'
          }, {
            name: 'edges',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'edges',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            },
            typeInfo: '.EdgesType'
          }]
      }, {
        localName: 'MultiPointPropertyType',
        propertyInfos: [{
            name: 'multiPoint',
            required: true,
            elementName: 'MultiPoint',
            typeInfo: '.MultiPointType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason'
            },
            type: 'attribute'
          }, {
            name: 'remoteSchema',
            attributeName: {
              localPart: 'remoteSchema',
              namespaceURI: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LILineagePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'LI_Lineage_PropertyType'
        },
        propertyInfos: [{
            name: 'liLineage',
            required: true,
            elementName: {
              localPart: 'LI_Lineage',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.LILineageType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'DSInitiativePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Initiative_PropertyType'
        },
        propertyInfos: [{
            name: 'dsInitiative',
            required: true,
            elementName: {
              localPart: 'DS_Initiative',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSInitiativeType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'CurveArrayPropertyType',
        propertyInfos: [{
            name: 'abstractCurve',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: 'AbstractCurve',
            typeInfo: '.AbstractCurveType',
            type: 'elementRef'
          }, {
            name: 'owns',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'owns'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'EXGeographicDescriptionPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'EX_GeographicDescription_PropertyType'
        },
        propertyInfos: [{
            name: 'exGeographicDescription',
            required: true,
            elementName: {
              localPart: 'EX_GeographicDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.EXGeographicDescriptionType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'ExternalObjectReferenceType',
        typeName: {
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
          localPart: 'externalObjectReferenceType'
        },
        propertyInfos: [{
            name: 'name',
            elementName: {
              localPart: 'name',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            }
          }, {
            name: 'uri',
            required: true,
            elementName: {
              localPart: 'uri',
              namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
            }
          }]
      }, {
        localName: 'MDBandPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_Band_PropertyType'
        },
        propertyInfos: [{
            name: 'mdBand',
            required: true,
            elementName: {
              localPart: 'MD_Band',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.MDBandType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'MDBrowseGraphicType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'MD_BrowseGraphic_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'fileName',
            required: true,
            elementName: {
              localPart: 'fileName',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'fileDescription',
            elementName: {
              localPart: 'fileDescription',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }, {
            name: 'fileType',
            elementName: {
              localPart: 'fileType',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.CharacterStringPropertyType'
          }]
      }, {
        localName: 'MultiplicityType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Multiplicity_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'range',
            required: true,
            collection: true,
            elementName: {
              localPart: 'range',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.MultiplicityRangePropertyType'
          }]
      }, {
        localName: 'AnglePropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco',
          localPart: 'Angle_PropertyType'
        },
        propertyInfos: [{
            name: 'angle',
            required: true,
            elementName: {
              localPart: 'Angle',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            typeInfo: '.AngleType'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DSSeriesPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'DS_Series_PropertyType'
        },
        propertyInfos: [{
            name: 'dsSeries',
            required: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'DS_Series',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.DSSeriesType',
            type: 'elementRef'
          }, {
            name: 'nilReason',
            typeInfo: {
              type: 'list'
            },
            attributeName: {
              localPart: 'nilReason',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
            },
            type: 'attribute'
          }, {
            name: 'uuidref',
            attributeName: {
              localPart: 'uuidref'
            },
            type: 'attribute'
          }, {
            name: 'type',
            typeInfo: '.TypeType',
            type: 'attribute'
          }, {
            name: 'href',
            type: 'attribute'
          }, {
            name: 'role',
            type: 'attribute'
          }, {
            name: 'arcrole',
            type: 'attribute'
          }, {
            name: 'atitle',
            attributeName: 'title',
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: '.ShowType',
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: '.ActuateType',
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractEXGeographicExtentType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'AbstractEX_GeographicExtent_Type'
        },
        baseTypeInfo: '.AbstractObjectType',
        propertyInfos: [{
            name: 'extentTypeCode',
            elementName: {
              localPart: 'extentTypeCode',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.BooleanPropertyType'
          }]
      }, {
        localName: 'PTFreeTextPropertyType',
        typeName: {
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd',
          localPart: 'PT_FreeText_PropertyType'
        },
        baseTypeInfo: '.CharacterStringPropertyType',
        propertyInfos: [{
            name: 'ptFreeText',
            required: true,
            elementName: {
              localPart: 'PT_FreeText',
              namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
            },
            typeInfo: '.PTFreeTextType'
          }]
      }, {
        localName: 'RectangleType',
        baseTypeInfo: '.AbstractSurfacePatchType',
        propertyInfos: [{
            name: 'exterior',
            required: true,
            typeInfo: '.AbstractRingPropertyType'
          }, {
            name: 'interpolation',
            typeInfo: '.SurfaceInterpolationType',
            attributeName: {
              localPart: 'interpolation'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'AbstractTimeObjectType',
        baseTypeInfo: '.AbstractGMLType'
      }, {
        localName: 'DirectionDescriptionType',
        propertyInfos: [{
            name: 'compassPoint',
            required: true,
            typeInfo: '.CompassPointEnumeration'
          }, {
            name: 'keyword',
            required: true,
            typeInfo: '.CodeType'
          }, {
            name: 'description',
            required: true
          }, {
            name: 'reference',
            required: true,
            typeInfo: '.ReferenceType'
          }]
      }, {
        localName: 'EdgeType',
        baseTypeInfo: '.AbstractTopoPrimitiveType',
        propertyInfos: [{
            name: 'container',
            typeInfo: '.TopoSolidPropertyType'
          }, {
            name: 'directedNode',
            required: true,
            minOccurs: 2,
            maxOccurs: 2,
            collection: true,
            typeInfo: '.DirectedNodePropertyType'
          }, {
            name: 'directedFace',
            minOccurs: 0,
            collection: true,
            typeInfo: '.DirectedFacePropertyType'
          }, {
            name: 'curveProperty',
            typeInfo: '.CurvePropertyType'
          }, {
            name: 'aggregationType',
            typeInfo: '.AggregationType',
            attributeName: {
              localPart: 'aggregationType'
            },
            type: 'attribute'
          }]
      }, {
        type: 'enumInfo',
        localName: 'SequenceRuleEnumeration',
        values: ['Linear', 'Boustrophedonic', 'Cantor-diagonal', 'Spiral', 'Morton', 'Hilbert']
      }, {
        type: 'enumInfo',
        localName: 'TypeType',
        baseTypeInfo: 'Token',
        values: ['simple', 'extended', 'title', 'resource', 'locator', 'arc']
      }, {
        type: 'enumInfo',
        localName: 'TimeIndeterminateValueType',
        values: ['after', 'before', 'now', 'unknown']
      }, {
        type: 'enumInfo',
        localName: 'AggregationType',
        values: ['set', 'bag', 'sequence', 'array', 'record', 'table']
      }, {
        type: 'enumInfo',
        localName: 'MDPixelOrientationCodeType',
        values: ['center', 'lowerLeft', 'lowerRight', 'upperRight', 'upperLeft']
      }, {
        type: 'enumInfo',
        localName: 'MDObligationCodeType',
        values: ['mandatory', 'optional', 'conditional']
      }, {
        type: 'enumInfo',
        localName: 'KnotTypesType',
        values: ['uniform', 'quasiUniform', 'piecewiseBezier']
      }, {
        type: 'enumInfo',
        localName: 'TypeOfTopoExpressionCodeEnumerationType',
        values: ['CONTAINS', 'OVERLAPS', 'EQUALS', 'WITHIN', 'CROSSES', 'INTERSECTS']
      }, {
        type: 'enumInfo',
        localName: 'SpaceLayerClassTypeType',
        values: ['TOPOGRAPHIC', 'SENSOR', 'LOGICAL', 'TAGS', 'UNKNOWN']
      }, {
        type: 'enumInfo',
        localName: 'ActuateType',
        baseTypeInfo: 'Token',
        values: ['onLoad', 'onRequest', 'other', 'none']
      }, {
        type: 'enumInfo',
        localName: 'CompassPointEnumeration',
        values: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      }, {
        type: 'enumInfo',
        localName: 'SuccessionType',
        values: ['substitution', 'division', 'fusion', 'initiation']
      }, {
        type: 'enumInfo',
        localName: 'CurveInterpolationType',
        values: ['linear', 'geodesic', 'circularArc3Points', 'circularArc2PointWithBulge', 'circularArcCenterPointWithRadius', 'elliptical', 'clothoid', 'conic', 'polynomialSpline', 'cubicSpline', 'rationalSpline']
      }, {
        type: 'enumInfo',
        localName: 'ShowType',
        baseTypeInfo: 'Token',
        values: ['new', 'replace', 'embed', 'other', 'none']
      }, {
        type: 'enumInfo',
        localName: 'SurfaceInterpolationType',
        values: ['none', 'planar', 'spherical', 'elliptical', 'conic', 'tin', 'parametricCurve', 'polynomialSpline', 'rationalSpline', 'triangulatedSpline']
      }, {
        type: 'enumInfo',
        localName: 'MDTopicCategoryCodeType',
        values: ['farming', 'biota', 'boundaries', 'climatologyMeteorologyAtmosphere', 'economy', 'elevation', 'environment', 'geoscientificInformation', 'health', 'imageryBaseMapsEarthCover', 'intelligenceMilitary', 'inlandWaters', 'location', 'oceans', 'planningCadastre', 'society', 'structure', 'transportation', 'utilitiesCommunication']
      }],
    elementInfos: [{
        typeInfo: '.OrientableSurfaceType',
        elementName: 'OrientableSurface',
        substitutionHead: 'AbstractSurface'
      }, {
        typeInfo: '.CodeType',
        elementName: {
          localPart: 'AbstractGenericName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.MDBandType',
        elementName: {
          localPart: 'MD_Band',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_RangeDimension',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MDPortrayalCatalogueReferenceType',
        elementName: {
          localPart: 'MD_PortrayalCatalogueReference',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CIContactType',
        elementName: {
          localPart: 'CI_Contact',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: 'catalogSymbol'
      }, {
        typeInfo: '.GeocentricCRSType',
        elementName: 'GeocentricCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.DQConformanceResultType',
        elementName: {
          localPart: 'DQ_ConformanceResult',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Result',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TimeCSPropertyType',
        elementName: 'usesTimeCS',
        substitutionHead: 'timeCS'
      }, {
        typeInfo: '.AbstractCoordinateSystemType',
        elementName: 'AbstractCoordinateSystem',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.CurveArrayPropertyType',
        elementName: 'curveArrayProperty'
      }, {
        typeInfo: '.DictionaryEntryType',
        elementName: 'definitionMember',
        substitutionHead: 'dictionaryEntry'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'Country',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.UserDefinedCSType',
        elementName: 'UserDefinedCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.CoordinateSystemAxisPropertyType',
        elementName: 'coordinateSystemAxisRef'
      }, {
        typeInfo: '.LinearCSPropertyType',
        elementName: 'linearCS'
      }, {
        typeInfo: '.PolarCSPropertyType',
        elementName: 'polarCS'
      }, {
        typeInfo: '.TemporalCRSType',
        elementName: 'TemporalCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.AbstractGeneralParameterValuePropertyType',
        elementName: 'parameterValue'
      }, {
        typeInfo: '.MDAggregateInformationType',
        elementName: {
          localPart: 'MD_AggregateInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.OperationMethodType',
        elementName: 'OperationMethod',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.EnvelopeType',
        elementName: 'Envelope',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.ArcType',
        elementName: 'Arc',
        substitutionHead: 'ArcString'
      }, {
        typeInfo: '.ValuePropertyType',
        elementName: 'valueComponent'
      }, {
        elementName: {
          localPart: 'URL',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MDTopicCategoryCodeType',
        elementName: {
          localPart: 'MD_TopicCategoryCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeOrNilReasonListType',
        elementName: 'CategoryList',
        substitutionHead: 'AbstractScalarValueList'
      }, {
        typeInfo: '.AbstractDatumType',
        elementName: 'AbstractDatum',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.CoordinateSystemAxisPropertyType',
        elementName: 'usesAxis',
        substitutionHead: 'axis'
      }, {
        typeInfo: '.ConcatenatedOperationType',
        elementName: 'ConcatenatedOperation',
        substitutionHead: 'AbstractCoordinateOperation'
      }, {
        typeInfo: '.SurfaceArrayPropertyType',
        elementName: 'surfaceMembers'
      }, {
        typeInfo: '.TimeInstantType',
        elementName: 'TimeInstant',
        substitutionHead: 'AbstractTimeGeometricPrimitive'
      }, {
        typeInfo: '.RectifiedGridType',
        elementName: 'RectifiedGrid',
        substitutionHead: 'Grid'
      }, {
        elementName: 'valueFile'
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'abstractReference'
      }, {
        typeInfo: '.DirectedEdgePropertyType',
        elementName: 'directedEdge'
      }, {
        typeInfo: '.AbstractTimeTopologyPrimitiveType',
        elementName: 'AbstractTimeTopologyPrimitive',
        substitutionHead: 'AbstractTimePrimitive'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_CellGeometryCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TimePrimitivePropertyType',
        elementName: 'validTime'
      }, {
        typeInfo: '.TriangleType',
        elementName: 'Triangle',
        substitutionHead: 'AbstractSurfacePatch'
      }, {
        typeInfo: '.CylindricalCSPropertyType',
        elementName: 'cylindricalCS'
      }, {
        typeInfo: '.GeneralConversionPropertyType',
        elementName: 'generalConversionRef'
      }, {
        elementName: 'gmlProfileSchema'
      }, {
        typeInfo: '.PassThroughOperationPropertyType',
        elementName: 'passThroughOperationRef'
      }, {
        typeInfo: '.AbstractRSReferenceSystemType',
        elementName: {
          localPart: 'AbstractRS_ReferenceSystem',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DefinitionProxyType',
        elementName: 'DefinitionProxy',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_ScopeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.FileType',
        elementName: 'File',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'CI_DateTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_KeywordTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractDQPositionalAccuracyType',
        elementName: {
          localPart: 'AbstractDQ_PositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Element',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AbstractMetaDataType',
        elementName: 'AbstractMetaData',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: 'AnyType',
        elementName: {
          localPart: 'Record',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractFeatureType',
        elementName: 'AbstractFeature',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.AbstractDSAggregateType',
        elementName: {
          localPart: 'AbstractDS_Aggregate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TopoComplexType',
        elementName: 'TopoComplex',
        substitutionHead: 'AbstractTopology'
      }, {
        typeInfo: '.ConventionalUnitType',
        elementName: 'ConventionalUnit',
        substitutionHead: 'UnitDefinition'
      }, {
        typeInfo: '.MultiPointPropertyType',
        elementName: 'multiLocation'
      }, {
        typeInfo: '.SphericalCSType',
        elementName: 'SphericalCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.LineStringSegmentType',
        elementName: 'LineStringSegment',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.OperationParameterGroupPropertyType',
        elementName: 'group'
      }, {
        typeInfo: {
          type: 'list'
        },
        elementName: 'Null'
      }, {
        typeInfo: '.CoordinateSystemPropertyType',
        elementName: 'coordinateSystemRef'
      }, {
        typeInfo: '.TimeCoordinateSystemType',
        elementName: 'TimeCoordinateSystem',
        substitutionHead: 'TimeReferenceSystem'
      }, {
        typeInfo: '.MDBrowseGraphicType',
        elementName: {
          localPart: 'MD_BrowseGraphic',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_SpatialRepresentationTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.MultiSolidType',
        elementName: 'MultiSolid',
        substitutionHead: 'AbstractGeometricAggregate'
      }, {
        typeInfo: '.MultiSurfacePropertyType',
        elementName: 'multiExtentOf'
      }, {
        typeInfo: '.ConversionPropertyType',
        elementName: 'conversionRef'
      }, {
        typeInfo: '.CylindricalCSType',
        elementName: 'CylindricalCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: 'Integer',
        elementName: {
          localPart: 'Integer',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TemporalCSPropertyType',
        elementName: 'usesTemporalCS'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_ClassificationCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractSolidType',
        elementName: 'AbstractSolid',
        substitutionHead: 'AbstractGeometricPrimitive'
      }, {
        typeInfo: '.AbstractCoverageType',
        elementName: 'AbstractCoverage',
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.GenericMetaDataType',
        elementName: 'GenericMetaData',
        substitutionHead: 'AbstractMetaData'
      }, {
        typeInfo: '.SurfaceType',
        elementName: 'Surface',
        substitutionHead: 'AbstractSurface'
      }, {
        typeInfo: '.DMSAngleType',
        elementName: 'dmsAngle'
      }, {
        typeInfo: '.MDGridSpatialRepresentationType',
        elementName: {
          localPart: 'MD_GridSpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractMD_SpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AbstractGeneralOperationParameterPropertyType',
        elementName: 'usesParameter',
        substitutionHead: 'generalOperationParameter'
      }, {
        typeInfo: '.LocatorType',
        elementName: {
          localPart: 'locator',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        }
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'locationReference'
      }, {
        typeInfo: '.EXExtentType',
        elementName: {
          localPart: 'EX_Extent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.EXBoundingPolygonType',
        elementName: {
          localPart: 'EX_BoundingPolygon',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractEX_GeographicExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.StringOrRefType',
        elementName: 'description'
      }, {
        typeInfo: '.MeasureListType',
        elementName: 'valueList'
      }, {
        typeInfo: {
          type: 'list',
          baseTypeInfo: 'Integer'
        },
        elementName: 'integerValueList'
      }, {
        typeInfo: '.AbstractGeometryType',
        elementName: 'AbstractImplicitGeometry',
        substitutionHead: 'AbstractGeometry'
      }, {
        typeInfo: '.MDDimensionType',
        elementName: {
          localPart: 'MD_Dimension',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: {
          type: 'list'
        },
        elementName: 'BooleanList',
        substitutionHead: 'AbstractScalarValueList'
      }, {
        typeInfo: '.AbstractGMLType',
        elementName: 'AbstractGML',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.SurfacePatchArrayPropertyType',
        elementName: 'polygonPatches',
        substitutionHead: 'patches'
      }, {
        typeInfo: '.MultiSurfacePropertyType',
        elementName: 'multiSurfaceProperty'
      }, {
        typeInfo: '.DQTopologicalConsistencyType',
        elementName: {
          localPart: 'DQ_TopologicalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_LogicalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'Double',
        elementName: {
          localPart: 'Real',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TransitionType',
        elementName: {
          localPart: 'Transition',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.CompositeValueType',
        elementName: 'CompositeValue',
        substitutionHead: 'AbstractValue'
      }, {
        typeInfo: '.VerticalDatumPropertyType',
        elementName: 'verticalDatum'
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'dataSourceReference'
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'MultiSolidCoverage',
        substitutionHead: 'AbstractDiscreteCoverage'
      }, {
        typeInfo: '.TransformationPropertyType',
        elementName: 'transformationRef'
      }, {
        typeInfo: '.MDApplicationSchemaInformationType',
        elementName: {
          localPart: 'MD_ApplicationSchemaInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'Duration',
        elementName: {
          localPart: 'TM_PeriodDuration',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gts'
        }
      }, {
        typeInfo: '.DQCompletenessCommissionType',
        elementName: {
          localPart: 'DQ_CompletenessCommission',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Completeness',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.PolygonType',
        elementName: 'Polygon',
        substitutionHead: 'AbstractSurface'
      }, {
        typeInfo: '.ImageDatumPropertyType',
        elementName: 'usesImageDatum',
        substitutionHead: 'imageDatum'
      }, {
        typeInfo: '.AbstractGeneralDerivedCRSType',
        elementName: 'AbstractGeneralDerivedCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.AbstractMDContentInformationType',
        elementName: {
          localPart: 'AbstractMD_ContentInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DataBlockType',
        elementName: 'DataBlock',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.CompositeSurfaceType',
        elementName: 'CompositeSurface',
        substitutionHead: 'AbstractSurface'
      }, {
        typeInfo: '.ConeType',
        elementName: 'Cone',
        substitutionHead: 'AbstractGriddedSurface'
      }, {
        typeInfo: '.EllipsoidType',
        elementName: 'Ellipsoid',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.SingleOperationPropertyType',
        elementName: 'singleOperationRef'
      }, {
        typeInfo: '.AbstractParametricCurveSurfaceType',
        elementName: 'AbstractParametricCurveSurface',
        substitutionHead: 'AbstractSurfacePatch'
      }, {
        typeInfo: '.EXSpatialTemporalExtentType',
        elementName: {
          localPart: 'EX_SpatialTemporalExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'EX_TemporalExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SurfacePatchArrayPropertyType',
        elementName: 'patches'
      }, {
        typeInfo: '.PTLocaleType',
        elementName: {
          localPart: 'PT_Locale',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.ProcedurePropertyType',
        elementName: 'using'
      }, {
        typeInfo: '.SurfacePropertyType',
        elementName: 'surfaceProperty'
      }, {
        typeInfo: '.CodeType',
        elementName: 'anchorDefinition'
      }, {
        typeInfo: '.SurfaceType',
        elementName: 'PolyhedralSurface',
        substitutionHead: 'Surface'
      }, {
        typeInfo: '.GeocentricCRSPropertyType',
        elementName: 'geocentricCRSRef'
      }, {
        typeInfo: '.FeaturePropertyType',
        elementName: 'featureMember'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_DimensionNameTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.PriorityLocationPropertyType',
        elementName: 'priorityLocation',
        substitutionHead: 'location'
      }, {
        typeInfo: '.DSPlatformType',
        elementName: {
          localPart: 'DS_Platform',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'DS_Series',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CurvePropertyType',
        elementName: 'baseCurve'
      }, {
        typeInfo: '.InlinePropertyType',
        elementName: 'abstractInlineProperty'
      }, {
        typeInfo: '.TopoComplexPropertyType',
        elementName: 'topoComplexProperty'
      }, {
        typeInfo: '.GeodesicStringType',
        elementName: 'GeodesicString',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.StateType',
        elementName: {
          localPart: 'State',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.NodeType',
        elementName: 'Node',
        substitutionHead: 'AbstractTopoPrimitive'
      }, {
        typeInfo: '.MetaDataPropertyType',
        elementName: 'metaDataProperty'
      }, {
        typeInfo: '.MDStandardOrderProcessType',
        elementName: {
          localPart: 'MD_StandardOrderProcess',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.EllipsoidPropertyType',
        elementName: 'ellipsoid'
      }, {
        typeInfo: '.CRSPropertyType',
        elementName: 'sourceCRS'
      }, {
        typeInfo: '.AbstractCoordinateOperationType',
        elementName: 'AbstractSingleOperation',
        substitutionHead: 'AbstractCoordinateOperation'
      }, {
        typeInfo: '.DQNonQuantitativeAttributeAccuracyType',
        elementName: {
          localPart: 'DQ_NonQuantitativeAttributeAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_ThematicAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TimePositionType',
        elementName: 'timePosition'
      }, {
        typeInfo: '.CodeType',
        elementName: {
          localPart: 'LocalName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        },
        substitutionHead: {
          localPart: 'AbstractGenericName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.ImageDatumType',
        elementName: 'ImageDatum',
        substitutionHead: 'AbstractDatum'
      }, {
        typeInfo: '.PointPropertyType',
        elementName: 'pointRep'
      }, {
        typeInfo: '.MultiPointPropertyType',
        elementName: 'multiPosition'
      }, {
        typeInfo: '.MDKeywordsType',
        elementName: {
          localPart: 'MD_Keywords',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeWithAuthorityType',
        elementName: 'axisDirection'
      }, {
        typeInfo: '.TitleEltType',
        elementName: {
          localPart: 'title',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        }
      }, {
        typeInfo: '.MDFormatType',
        elementName: {
          localPart: 'MD_Format',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.InterLayerConnectionType',
        elementName: {
          localPart: 'InterLayerConnection',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.OperationParameterPropertyType',
        elementName: 'operationParameterRef'
      }, {
        typeInfo: '.EXGeographicDescriptionType',
        elementName: {
          localPart: 'EX_GeographicDescription',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractEX_GeographicExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.EXTemporalExtentType',
        elementName: {
          localPart: 'EX_TemporalExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DefinitionType',
        elementName: 'Definition',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.AbstractTimeObjectType',
        elementName: 'AbstractTimeObject',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.MeasureType',
        elementName: 'value'
      }, {
        typeInfo: '.IndoorFeaturesType',
        elementName: {
          localPart: 'IndoorFeatures',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.DQTemporalConsistencyType',
        elementName: {
          localPart: 'DQ_TemporalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_TemporalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.ArcByBulgeType',
        elementName: 'ArcByBulge',
        substitutionHead: 'ArcStringByBulge'
      }, {
        typeInfo: '.LIProcessStepType',
        elementName: {
          localPart: 'LI_ProcessStep',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.LISourceType',
        elementName: {
          localPart: 'LI_Source',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SingleCRSPropertyType',
        elementName: 'includesSingleCRS',
        substitutionHead: 'componentReferenceSystem'
      }, {
        typeInfo: '.AbstractCurveSegmentType',
        elementName: 'AbstractCurveSegment',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.AbstractGeometricPrimitiveType',
        elementName: 'AbstractGeometricPrimitive',
        substitutionHead: 'AbstractGeometry'
      }, {
        typeInfo: '.AbstractGeneralOperationParameterPropertyType',
        elementName: 'includesParameter',
        substitutionHead: 'parameter'
      }, {
        typeInfo: '.AssociationRoleType',
        elementName: 'abstractAssociationRole'
      }, {
        typeInfo: '.AbstractDQLogicalConsistencyType',
        elementName: {
          localPart: 'AbstractDQ_LogicalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Element',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.ArrayAssociationType',
        elementName: 'members'
      }, {
        typeInfo: 'PositiveInteger',
        elementName: 'integerValue'
      }, {
        typeInfo: '.LinearRingType',
        elementName: 'LinearRing',
        substitutionHead: 'AbstractRing'
      }, {
        typeInfo: '.MDServiceIdentificationType',
        elementName: {
          localPart: 'MD_ServiceIdentification',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractMD_Identification',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TimeReferenceSystemType',
        elementName: 'TimeReferenceSystem',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.PointPropertyType',
        elementName: 'pointProperty'
      }, {
        typeInfo: '.CoordinateOperationPropertyType',
        elementName: 'usesSingleOperation',
        substitutionHead: 'coordOperation'
      }, {
        typeInfo: '.UnitOfMeasureType',
        elementName: 'unitOfMeasure'
      }, {
        typeInfo: '.DQScopeType',
        elementName: {
          localPart: 'DQ_Scope',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: 'locationName'
      }, {
        typeInfo: '.DictionaryType',
        elementName: 'Dictionary',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.TopoComplexPropertyType',
        elementName: 'maximalComplex'
      }, {
        typeInfo: '.MDDistributorType',
        elementName: {
          localPart: 'MD_Distributor',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: {
          localPart: 'ScopedName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        },
        substitutionHead: {
          localPart: 'AbstractGenericName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.MDUsageType',
        elementName: {
          localPart: 'MD_Usage',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.EdgeType',
        elementName: 'Edge',
        substitutionHead: 'AbstractTopoPrimitive'
      }, {
        typeInfo: '.ValueArrayPropertyType',
        elementName: 'valueComponents'
      }, {
        typeInfo: '.GeographicCRSPropertyType',
        elementName: 'baseGeographicCRS'
      }, {
        typeInfo: '.CompoundCRSType',
        elementName: 'CompoundCRS',
        substitutionHead: 'AbstractCRS'
      }, {
        typeInfo: '.ConcatenatedOperationPropertyType',
        elementName: 'concatenatedOperationRef'
      }, {
        typeInfo: '.CellSpaceType',
        elementName: {
          localPart: 'CellSpace',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.RangeSetType',
        elementName: 'rangeSet'
      }, {
        typeInfo: '.SingleCRSPropertyType',
        elementName: 'componentReferenceSystem'
      }, {
        typeInfo: '.ImageCRSPropertyType',
        elementName: 'imageCRSRef'
      }, {
        typeInfo: '.UserDefinedCSPropertyType',
        elementName: 'userDefinedCSRef'
      }, {
        typeInfo: '.MDFeatureCatalogueDescriptionType',
        elementName: {
          localPart: 'MD_FeatureCatalogueDescription',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractMD_ContentInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DirectedTopoSolidPropertyType',
        elementName: 'directedTopoSolid'
      }, {
        typeInfo: '.AbstractTopologyType',
        elementName: 'AbstractTopology',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.AbstractEXGeographicExtentType',
        elementName: {
          localPart: 'AbstractEX_GeographicExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AssociationRoleType',
        elementName: 'rangeParameters'
      }, {
        typeInfo: '.GeodeticCRSType',
        elementName: 'GeodeticCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.MDVectorSpatialRepresentationType',
        elementName: {
          localPart: 'MD_VectorSpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractMD_SpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'NonNegativeInteger',
        elementName: 'minutes'
      }, {
        typeInfo: '.DynamicFeatureMemberType',
        elementName: 'dynamicMembers'
      }, {
        typeInfo: '.ValuePropertyType',
        elementName: 'valueProperty'
      }, {
        typeInfo: '.TimeCalendarType',
        elementName: 'TimeCalendar',
        substitutionHead: 'TimeReferenceSystem'
      }, {
        typeInfo: '.SingleCRSPropertyType',
        elementName: 'baseCRS'
      }, {
        typeInfo: '.ResultType',
        elementName: 'resultOf'
      }, {
        typeInfo: '.CodeWithAuthorityType',
        elementName: 'rangeMeaning'
      }, {
        typeInfo: '.TemporalCSType',
        elementName: 'TemporalCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: 'DateTime',
        elementName: 'origin'
      }, {
        typeInfo: '.CylinderType',
        elementName: 'Cylinder',
        substitutionHead: 'AbstractGriddedSurface'
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'multiSurfaceDomain',
        substitutionHead: 'domainSet'
      }, {
        typeInfo: '.HistoryPropertyType',
        elementName: 'history'
      }, {
        typeInfo: '.DerivedCRSType',
        elementName: 'DerivedCRS',
        substitutionHead: 'AbstractGeneralDerivedCRS'
      }, {
        typeInfo: '.CRSPropertyType',
        elementName: 'referenceSystemRef'
      }, {
        typeInfo: '.EllipsoidalCSPropertyType',
        elementName: 'usesEllipsoidalCS',
        substitutionHead: 'ellipsoidalCS'
      }, {
        typeInfo: '.PrimeMeridianType',
        elementName: 'PrimeMeridian',
        substitutionHead: 'Definition'
      }, {
        typeInfo: {
          type: 'list'
        },
        elementName: 'CountExtent',
        substitutionHead: 'AbstractValue'
      }, {
        typeInfo: {
          type: 'list'
        },
        elementName: 'doubleOrNilReasonTupleList'
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'MultiPointCoverage',
        substitutionHead: 'AbstractDiscreteCoverage'
      }, {
        typeInfo: 'PositiveInteger',
        elementName: 'modifiedCoordinate'
      }, {
        typeInfo: '.UnitDefinitionType',
        elementName: 'UnitDefinition',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'GridCoverage',
        substitutionHead: 'AbstractDiscreteCoverage'
      }, {
        typeInfo: '.CircleByCenterPointType',
        elementName: 'CircleByCenterPoint',
        substitutionHead: 'ArcByCenterPoint'
      }, {
        elementName: 'scope'
      }, {
        typeInfo: '.TimePeriodType',
        elementName: 'TimePeriod',
        substitutionHead: 'AbstractTimeGeometricPrimitive'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_GeometricObjectTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractDQElementType',
        elementName: {
          localPart: 'AbstractDQ_Element',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TemporalCRSPropertyType',
        elementName: 'temporalCRSRef'
      }, {
        typeInfo: '.PointPropertyType',
        elementName: 'centerOf'
      }, {
        typeInfo: '.RingType',
        elementName: 'Ring',
        substitutionHead: 'AbstractRing'
      }, {
        typeInfo: '.AbstractTimeGeometricPrimitiveType',
        elementName: 'AbstractTimeGeometricPrimitive',
        substitutionHead: 'AbstractTimePrimitive'
      }, {
        typeInfo: '.MDDigitalTransferOptionsType',
        elementName: {
          localPart: 'MD_DigitalTransferOptions',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DerivedUnitType',
        elementName: 'DerivedUnit',
        substitutionHead: 'UnitDefinition'
      }, {
        typeInfo: '.CICitationType',
        elementName: {
          localPart: 'CI_Citation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.BagType',
        elementName: 'Bag',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.CartesianCSPropertyType',
        elementName: 'usesCartesianCS',
        substitutionHead: 'cartesianCS'
      }, {
        typeInfo: '.GridType',
        elementName: 'Grid',
        substitutionHead: 'AbstractImplicitGeometry'
      }, {
        typeInfo: '.TimeCSType',
        elementName: 'TimeCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'quantityTypeReference'
      }, {
        typeInfo: '.UnlimitedIntegerType',
        elementName: {
          localPart: 'UnlimitedInteger',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: 'anchorPoint',
        substitutionHead: 'anchorDefinition'
      }, {
        typeInfo: '.AbstractGeneralOperationParameterPropertyType',
        elementName: 'parameter'
      }, {
        typeInfo: '.StringOrRefType',
        elementName: 'status'
      }, {
        typeInfo: '.MDMetadataType',
        elementName: {
          localPart: 'MD_Metadata',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SphericalCSPropertyType',
        elementName: 'sphericalCS'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'CI_RoleCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CylindricalCSPropertyType',
        elementName: 'cylindricalCSRef'
      }, {
        typeInfo: '.ResourceType',
        elementName: {
          localPart: 'resource',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        }
      }, {
        elementName: {
          localPart: 'Date',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.StringOrRefType',
        elementName: 'LocationString'
      }, {
        typeInfo: '.CurveSegmentArrayPropertyType',
        elementName: 'segments'
      }, {
        typeInfo: '.ObservationType',
        elementName: 'Observation',
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.Quantity',
        elementName: 'Quantity',
        substitutionHead: 'AbstractScalarValue'
      }, {
        typeInfo: '.OperationParameterPropertyType',
        elementName: 'operationParameterGroupRef'
      }, {
        typeInfo: '.LILineageType',
        elementName: {
          localPart: 'LI_Lineage',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AbstractFeatureCollectionType',
        elementName: 'AbstractFeatureCollection',
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.LocationPropertyType',
        elementName: 'location'
      }, {
        typeInfo: '.AbstractCurveType',
        elementName: 'AbstractCurve',
        substitutionHead: 'AbstractGeometricPrimitive'
      }, {
        typeInfo: '.AbstractCRSType',
        elementName: 'AbstractSingleCRS',
        substitutionHead: 'AbstractCRS'
      }, {
        typeInfo: '.GeodeticDatumPropertyType',
        elementName: 'usesGeodeticDatum',
        substitutionHead: 'geodeticDatum'
      }, {
        typeInfo: '.DSInitiativeType',
        elementName: {
          localPart: 'DS_Initiative',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDS_Aggregate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'MultiCurveCoverage',
        substitutionHead: 'AbstractDiscreteCoverage'
      }, {
        typeInfo: '.RectangleType',
        elementName: 'Rectangle',
        substitutionHead: 'AbstractSurfacePatch'
      }, {
        typeInfo: '.ImageDatumPropertyType',
        elementName: 'imageDatum'
      }, {
        typeInfo: '.TimeIntervalLengthType',
        elementName: 'timeInterval'
      }, {
        typeInfo: '.DQCompletenessOmissionType',
        elementName: {
          localPart: 'DQ_CompletenessOmission',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Completeness',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: 'formula'
      }, {
        typeInfo: '.MultiplicityType',
        elementName: {
          localPart: 'Multiplicity',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TopoSolidType',
        elementName: 'TopoSolid',
        substitutionHead: 'AbstractTopoPrimitive'
      }, {
        typeInfo: '.DQRelativeInternalPositionalAccuracyType',
        elementName: {
          localPart: 'DQ_RelativeInternalPositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_PositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DSSeriesType',
        elementName: {
          localPart: 'DS_Series',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDS_Aggregate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AbstractGeneralParameterValueType',
        elementName: 'AbstractGeneralParameterValue',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.MDDataIdentificationType',
        elementName: {
          localPart: 'MD_DataIdentification',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractMD_Identification',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DSSensorType',
        elementName: {
          localPart: 'DS_Sensor',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'DS_Series',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MDConstraintsType',
        elementName: {
          localPart: 'MD_Constraints',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SolidType',
        elementName: 'Solid',
        substitutionHead: 'AbstractSolid'
      }, {
        typeInfo: '.EllipsoidalCSType',
        elementName: 'EllipsoidalCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: 'AnyType',
        elementName: 'AbstractValue',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.MDPixelOrientationCodeType',
        elementName: {
          localPart: 'MD_PixelOrientationCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.ArcStringByBulgeType',
        elementName: 'ArcStringByBulge',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.EngineeringDatumPropertyType',
        elementName: 'engineeringDatum'
      }, {
        typeInfo: '.DirectionPropertyType',
        elementName: 'direction'
      }, {
        typeInfo: '.MDCoverageDescriptionType',
        elementName: {
          localPart: 'MD_CoverageDescription',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractMD_ContentInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SphericalCSPropertyType',
        elementName: 'sphericalCSRef'
      }, {
        typeInfo: '.CoordinateSystemPropertyType',
        elementName: 'usesCS',
        substitutionHead: 'coordinateSystem'
      }, {
        typeInfo: '.SurfacePropertyType',
        elementName: 'baseSurface'
      }, {
        typeInfo: '.DQTemporalValidityType',
        elementName: {
          localPart: 'DQ_TemporalValidity',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_TemporalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MultiPointPropertyType',
        elementName: 'multiCenterOf'
      }, {
        typeInfo: '.GeodeticDatumType',
        elementName: 'GeodeticDatum',
        substitutionHead: 'AbstractDatum'
      }, {
        typeInfo: '.GeneralTransformationPropertyType',
        elementName: 'generalTransformationRef'
      }, {
        typeInfo: '.ProjectedCRSPropertyType',
        elementName: 'projectedCRSRef'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_MaintenanceFrequencyCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        elementName: 'associationName'
      }, {
        typeInfo: '.StringOrRefType',
        elementName: 'quantityType'
      }, {
        typeInfo: '.PassThroughOperationType',
        elementName: 'PassThroughOperation',
        substitutionHead: 'AbstractSingleOperation'
      }, {
        typeInfo: '.Category',
        elementName: 'Category',
        substitutionHead: 'AbstractScalarValue'
      }, {
        typeInfo: '.CoverageFunctionType',
        elementName: 'coverageFunction',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.LinearCSPropertyType',
        elementName: 'linearCSRef'
      }, {
        typeInfo: '.MultiSurfacePropertyType',
        elementName: 'multiCoverage'
      }, {
        typeInfo: '.TopoCurveType',
        elementName: 'TopoCurve'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_DatatypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AffineCSPropertyType',
        elementName: 'affineCS'
      }, {
        typeInfo: '.VerticalCSType',
        elementName: 'VerticalCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.TargetPropertyType',
        elementName: 'subject',
        substitutionHead: 'target'
      }, {
        typeInfo: '.RSIdentifierType',
        elementName: {
          localPart: 'RS_Identifier',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_Identifier',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.OperationParameterGroupType',
        elementName: 'OperationParameterGroup',
        substitutionHead: 'AbstractGeneralOperationParameter'
      }, {
        elementName: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.PrimeMeridianPropertyType',
        elementName: 'primeMeridianRef'
      }, {
        typeInfo: '.IndirectEntryType',
        elementName: 'indirectEntry'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'CI_PresentationFormCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TopoSurfaceType',
        elementName: 'TopoSurface'
      }, {
        typeInfo: '.AffineCSPropertyType',
        elementName: 'usesAffineCS',
        substitutionHead: 'affineCS'
      }, {
        typeInfo: '.VerticalDatumType',
        elementName: 'VerticalDatum',
        substitutionHead: 'AbstractDatum'
      }, {
        typeInfo: '.CodeType',
        elementName: 'LocationKeyWord'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'DQ_EvaluationMethodTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractMDSpatialRepresentationType',
        elementName: {
          localPart: 'AbstractMD_SpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DQQuantitativeAttributeAccuracyType',
        elementName: {
          localPart: 'DQ_QuantitativeAttributeAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_ThematicAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SurfacePropertyType',
        elementName: 'surfaceMember'
      }, {
        typeInfo: '.AbstractGeneralTransformationType',
        elementName: 'AbstractGeneralTransformation',
        substitutionHead: 'AbstractOperation'
      }, {
        typeInfo: '.MDReferenceSystemType',
        elementName: {
          localPart: 'MD_ReferenceSystem',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_ImagingConditionCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.DSAssociationType',
        elementName: {
          localPart: 'DS_Association',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.VerticalCSPropertyType',
        elementName: 'verticalCS'
      }, {
        typeInfo: '.DQAbsoluteExternalPositionalAccuracyType',
        elementName: {
          localPart: 'DQ_AbsoluteExternalPositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_PositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_CharacterSetCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'definitionRef'
      }, {
        typeInfo: '.MeasureOrNilReasonListType',
        elementName: 'QuantityList',
        substitutionHead: 'AbstractScalarValueList'
      }, {
        typeInfo: '.EllipsoidPropertyType',
        elementName: 'usesEllipsoid',
        substitutionHead: 'ellipsoid'
      }, {
        typeInfo: '.TemporalDatumType',
        elementName: 'TemporalDatum',
        substitutionHead: 'AbstractDatum'
      }, {
        typeInfo: '.EngineeringCRSPropertyType',
        elementName: 'engineeringCRSRef'
      }, {
        typeInfo: '.MultiGeometryType',
        elementName: 'MultiGeometry',
        substitutionHead: 'AbstractGeometricAggregate'
      }, {
        elementName: 'operationVersion'
      }, {
        typeInfo: '.CRSPropertyType',
        elementName: 'targetCRS'
      }, {
        typeInfo: '.CompositeSolidType',
        elementName: 'CompositeSolid',
        substitutionHead: 'AbstractSolid'
      }, {
        typeInfo: '.MultiLayeredGraphType',
        elementName: {
          localPart: 'MultiLayeredGraph',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.DynamicFeatureType',
        elementName: 'DynamicFeature',
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.FeatureCollectionType',
        elementName: 'FeatureCollection',
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.EnvelopeWithTimePeriodType',
        elementName: 'EnvelopeWithTimePeriod',
        substitutionHead: 'Envelope'
      }, {
        typeInfo: '.ObliqueCartesianCSType',
        elementName: 'ObliqueCartesianCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.MemberNameType',
        elementName: {
          localPart: 'MemberName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractGeometryType',
        elementName: 'AbstractGeometry',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.AbstractSurfacePatchType',
        elementName: 'AbstractSurfacePatch'
      }, {
        typeInfo: '.LinearCSType',
        elementName: 'LinearCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.MDDistributionType',
        elementName: {
          localPart: 'MD_Distribution',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.SpaceLayerType',
        elementName: {
          localPart: 'SpaceLayer',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.ScaleType',
        elementName: {
          localPart: 'Scale',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        },
        substitutionHead: {
          localPart: 'Measure',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CellSpaceBoundaryType',
        elementName: {
          localPart: 'CellSpaceBoundary',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.TimeTopologyComplexType',
        elementName: 'TimeTopologyComplex',
        substitutionHead: 'AbstractTimeComplex'
      }, {
        typeInfo: '.AssociationRoleType',
        elementName: 'member'
      }, {
        typeInfo: '.AssociationRoleType',
        elementName: 'abstractStrictAssociationRole'
      }, {
        typeInfo: 'PositiveInteger',
        elementName: 'maximumOccurs'
      }, {
        typeInfo: '.MDScopeDescriptionType',
        elementName: {
          localPart: 'MD_ScopeDescription',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'Decimal',
        elementName: {
          localPart: 'Decimal',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TransformationType',
        elementName: 'Transformation',
        substitutionHead: 'AbstractGeneralTransformation'
      }, {
        typeInfo: '.DatumPropertyType',
        elementName: 'datumRef'
      }, {
        typeInfo: 'AnyType',
        elementName: 'AbstractObject'
      }, {
        typeInfo: '.CircleType',
        elementName: 'Circle',
        substitutionHead: 'Arc'
      }, {
        typeInfo: '.CIAddressType',
        elementName: {
          localPart: 'CI_Address',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.ValueArrayType',
        elementName: 'ValueArray',
        substitutionHead: 'CompositeValue'
      }, {
        typeInfo: {
          type: 'list',
          baseTypeInfo: 'NCName'
        },
        elementName: 'axisLabels',
        scope: '.GridType'
      }, {
        typeInfo: '.DQConceptualConsistencyType',
        elementName: {
          localPart: 'DQ_ConceptualConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_LogicalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.PTLocaleContainerType',
        elementName: {
          localPart: 'PT_LocaleContainer',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MultiPointPropertyType',
        elementName: 'multiPointProperty'
      }, {
        typeInfo: '.TopoComplexPropertyType',
        elementName: 'superComplex'
      }, {
        typeInfo: '.MultiCurvePropertyType',
        elementName: 'multiCurveProperty'
      }, {
        typeInfo: '.DomainOfValidity',
        elementName: 'domainOfValidity'
      }, {
        typeInfo: '.CubicSplineType',
        elementName: 'CubicSpline',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_MediumNameCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'statusReference'
      }, {
        typeInfo: '.EllipsoidalCSPropertyType',
        elementName: 'ellipsoidalCSRef'
      }, {
        typeInfo: '.OperationMethodPropertyType',
        elementName: 'usesMethod',
        substitutionHead: 'method'
      }, {
        typeInfo: '.SurfaceArrayPropertyType',
        elementName: 'surfaceArrayProperty'
      }, {
        typeInfo: '.ParameterValueType',
        elementName: 'ParameterValue',
        substitutionHead: 'AbstractGeneralParameterValue'
      }, {
        typeInfo: '.MDRepresentativeFractionType',
        elementName: {
          localPart: 'MD_RepresentativeFraction',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.GeneralConversionPropertyType',
        elementName: 'conversion'
      }, {
        typeInfo: '.TopoPointPropertyType',
        elementName: 'topoPointProperty'
      }, {
        typeInfo: '.AbstractObjectType',
        elementName: {
          localPart: 'AbstractObject',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_RestrictionCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'multiPointDomain',
        substitutionHead: 'domainSet'
      }, {
        typeInfo: '.OperationParameterPropertyType',
        elementName: 'operationParameter'
      }, {
        typeInfo: '.BezierType',
        elementName: 'Bezier',
        substitutionHead: 'BSpline'
      }, {
        typeInfo: '.PTFreeTextType',
        elementName: {
          localPart: 'PT_FreeText',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: 'axisAbbrev'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'DS_AssociationTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CurveArrayPropertyType',
        elementName: 'curveMembers'
      }, {
        typeInfo: '.TopoVolumeType',
        elementName: 'TopoVolume'
      }, {
        typeInfo: '.TemporalCSPropertyType',
        elementName: 'temporalCSRef'
      }, {
        typeInfo: '.LineStringType',
        elementName: 'LineString',
        substitutionHead: 'AbstractCurve'
      }, {
        typeInfo: '.CompoundCRSPropertyType',
        elementName: 'compoundCRSRef'
      }, {
        typeInfo: '.CartesianCSPropertyType',
        elementName: 'cartesianCSRef'
      }, {
        typeInfo: '.AbstractSurfaceType',
        elementName: 'AbstractSurface',
        substitutionHead: 'AbstractGeometricPrimitive'
      }, {
        typeInfo: '.MovingObjectStatusType',
        elementName: 'MovingObjectStatus',
        substitutionHead: 'AbstractTimeSlice'
      }, {
        typeInfo: '.ConversionToPreferredUnitType',
        elementName: 'roughConversionToPreferredUnit'
      }, {
        typeInfo: '.StringOrRefType',
        elementName: 'MappingRule'
      }, {
        typeInfo: '.TimeClockType',
        elementName: 'TimeClock',
        substitutionHead: 'TimeReferenceSystem'
      }, {
        typeInfo: '.RecordTypeType',
        elementName: {
          localPart: 'RecordType',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.SecondDefiningParameter',
        elementName: 'SecondDefiningParameter'
      }, {
        typeInfo: '.TimeCSPropertyType',
        elementName: 'timeCS'
      }, {
        typeInfo: '.StringOrRefType',
        elementName: 'dataSource'
      }, {
        typeInfo: '.TopoPrimitiveArrayAssociationType',
        elementName: 'topoPrimitiveMembers'
      }, {
        typeInfo: 'PositiveInteger',
        elementName: 'targetDimensions'
      }, {
        typeInfo: '.VerticalDatumPropertyType',
        elementName: 'verticalDatumRef'
      }, {
        typeInfo: 'Decimal',
        elementName: 'seconds'
      }, {
        typeInfo: '.PointPropertyType',
        elementName: 'position'
      }, {
        typeInfo: '.OrientableCurveType',
        elementName: 'OrientableCurve',
        substitutionHead: 'AbstractCurve'
      }, {
        typeInfo: '.CartesianCSPropertyType',
        elementName: 'cartesianCS'
      }, {
        typeInfo: '.MDExtendedElementInformationType',
        elementName: {
          localPart: 'MD_ExtendedElementInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'rectifiedGridDomain',
        substitutionHead: 'domainSet'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'LanguageCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.ConversionToPreferredUnitType',
        elementName: 'conversionToPreferredUnit'
      }, {
        typeInfo: '.EXVerticalExtentType',
        elementName: {
          localPart: 'EX_VerticalExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DQDataQualityType',
        elementName: {
          localPart: 'DQ_DataQuality',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.PointArrayPropertyType',
        elementName: 'pointMembers'
      }, {
        typeInfo: '.GeodeticCRSPropertyType',
        elementName: 'baseGeodeticCRS'
      }, {
        typeInfo: '.FeatureArrayPropertyType',
        elementName: 'featureMembers'
      }, {
        typeInfo: '.DynamicFeatureCollectionType',
        elementName: 'DynamicFeatureCollection',
        substitutionHead: 'DynamicFeature'
      }, {
        typeInfo: '.SolidArrayPropertyType',
        elementName: 'solidArrayProperty'
      }, {
        typeInfo: '.AbstractGeneralOperationParameterPropertyType',
        elementName: 'generalOperationParameter',
        substitutionHead: 'parameter'
      }, {
        typeInfo: '.MDMetadataExtensionInformationType',
        elementName: {
          localPart: 'MD_MetadataExtensionInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TargetPropertyType',
        elementName: 'target'
      }, {
        typeInfo: '.MDMaintenanceInformationType',
        elementName: {
          localPart: 'MD_MaintenanceInformation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        elementName: 'axisName',
        scope: '.GridType'
      }, {
        typeInfo: '.AffineCSType',
        elementName: 'AffineCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.AbstractGeneralOperationParameterType',
        elementName: 'AbstractGeneralOperationParameter',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.DSStereoMateType',
        elementName: {
          localPart: 'DS_StereoMate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'DS_OtherAggregate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MeasureType',
        elementName: 'measure'
      }, {
        typeInfo: '.AbstractDQCompletenessType',
        elementName: {
          localPart: 'AbstractDQ_Completeness',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Element',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DictionaryType',
        elementName: 'DefinitionCollection',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.DQFormatConsistencyType',
        elementName: {
          localPart: 'DQ_FormatConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_LogicalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'Double',
        elementName: 'minimumValue'
      }, {
        typeInfo: '.SurfacePropertyType',
        elementName: 'extentOf'
      }, {
        elementName: 'remarks'
      }, {
        typeInfo: '.CISeriesType',
        elementName: {
          localPart: 'CI_Series',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MeasureType',
        elementName: {
          localPart: 'Measure',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractDQResultType',
        elementName: {
          localPart: 'AbstractDQ_Result',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AbstractRingPropertyType',
        elementName: 'interior'
      }, {
        typeInfo: '.DirectPositionType',
        elementName: 'pos'
      }, {
        typeInfo: '.AbstractGeneralConversionType',
        elementName: 'AbstractGeneralConversion',
        substitutionHead: 'AbstractOperation'
      }, {
        typeInfo: '.CurvePropertyType',
        elementName: 'curveProperty'
      }, {
        typeInfo: '.ObliqueCartesianCSPropertyType',
        elementName: 'usesObliqueCartesianCS'
      }, {
        typeInfo: '.CategoryExtentType',
        elementName: 'CategoryExtent',
        substitutionHead: 'AbstractValue'
      }, {
        typeInfo: 'Double',
        elementName: 'maximumValue'
      }, {
        typeInfo: '.MDObligationCodeType',
        elementName: {
          localPart: 'MD_ObligationCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TemporalDatumPropertyType',
        elementName: 'temporalDatum'
      }, {
        typeInfo: '.GeodesicType',
        elementName: 'Geodesic',
        substitutionHead: 'GeodesicString'
      }, {
        typeInfo: '.SurfaceType',
        elementName: 'TriangulatedSurface',
        substitutionHead: 'Surface'
      }, {
        typeInfo: '.SphericalCSPropertyType',
        elementName: 'usesSphericalCS',
        substitutionHead: 'sphericalCS'
      }, {
        typeInfo: '.TimeOrdinalReferenceSystemType',
        elementName: 'TimeOrdinalReferenceSystem',
        substitutionHead: 'TimeReferenceSystem'
      }, {
        typeInfo: '.OperationMethodPropertyType',
        elementName: 'method'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_TopologyLevelCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_MediumFormatCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.BaseUnitType',
        elementName: 'BaseUnit',
        substitutionHead: 'UnitDefinition'
      }, {
        typeInfo: '.PointArrayPropertyType',
        elementName: 'pointArrayProperty'
      }, {
        typeInfo: '.SurfacePatchArrayPropertyType',
        elementName: 'trianglePatches',
        substitutionHead: 'patches'
      }, {
        typeInfo: '.CartesianCSType',
        elementName: 'CartesianCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.CITelephoneType',
        elementName: {
          localPart: 'CI_Telephone',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CoordinateSystemPropertyType',
        elementName: 'coordinateSystem'
      }, {
        typeInfo: '.AbstractGeneralParameterValuePropertyType',
        elementName: 'usesValue',
        substitutionHead: 'parameterValue'
      }, {
        typeInfo: '.AbstractGeneralOperationParameterPropertyType',
        elementName: 'abstractGeneralOperationParameterRef'
      }, {
        typeInfo: '.TopoCurvePropertyType',
        elementName: 'topoCurveProperty'
      }, {
        typeInfo: '.AngleType',
        elementName: 'angle'
      }, {
        typeInfo: '.UserDefinedCSPropertyType',
        elementName: 'userDefinedCS'
      }, {
        typeInfo: '.OffsetCurveType',
        elementName: 'OffsetCurve',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.CoordinateOperationPropertyType',
        elementName: 'usesOperation',
        substitutionHead: 'coordOperation'
      }, {
        typeInfo: '.AbstractRingPropertyType',
        elementName: 'exterior'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'CI_OnLineFunctionCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_DistributionUnits',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'gridDomain',
        substitutionHead: 'domainSet'
      }, {
        typeInfo: {
          type: 'list'
        },
        elementName: 'CountList',
        substitutionHead: 'AbstractScalarValueList'
      }, {
        typeInfo: '.GeometryPropertyType',
        elementName: 'geometryMember'
      }, {
        typeInfo: '.ImageDatumPropertyType',
        elementName: 'imageDatumRef'
      }, {
        typeInfo: '.CodeWithAuthorityType',
        elementName: 'identifier'
      }, {
        elementName: 'reversePropertyName'
      }, {
        elementName: 'targetElement'
      }, {
        typeInfo: '.AbstractGeneralParameterValuePropertyType',
        elementName: 'includesValue',
        substitutionHead: 'parameterValue'
      }, {
        typeInfo: '.CoordinateSystemAxisType',
        elementName: 'CoordinateSystemAxis',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.FaceType',
        elementName: 'Face',
        substitutionHead: 'AbstractTopoPrimitive'
      }, {
        typeInfo: '.DQQuantitativeResultType',
        elementName: {
          localPart: 'DQ_QuantitativeResult',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Result',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DSOtherAggregateType',
        elementName: {
          localPart: 'DS_OtherAggregate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDS_Aggregate',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TemporalDatumPropertyType',
        elementName: 'usesTemporalDatum',
        substitutionHead: 'temporalDatum'
      }, {
        typeInfo: 'PositiveInteger',
        elementName: 'sourceDimensions'
      }, {
        typeInfo: '.PolygonPatchType',
        elementName: 'PolygonPatch',
        substitutionHead: 'AbstractSurfacePatch'
      }, {
        typeInfo: '.GeneralConversionPropertyType',
        elementName: 'definedByConversion',
        substitutionHead: 'conversion'
      }, {
        typeInfo: '.PolarCSType',
        elementName: 'PolarCS',
        substitutionHead: 'AbstractCoordinateSystem'
      }, {
        typeInfo: '.CodeWithAuthorityType',
        elementName: 'derivedCRSType'
      }, {
        typeInfo: '.EllipsoidPropertyType',
        elementName: 'ellipsoidRef'
      }, {
        typeInfo: '.AbstractGriddedSurfaceType',
        elementName: 'AbstractGriddedSurface',
        substitutionHead: 'AbstractParametricCurveSurface'
      }, {
        typeInfo: '.GridLimitsType',
        elementName: 'limits',
        scope: '.GridType'
      }, {
        typeInfo: '.MDGeorectifiedType',
        elementName: {
          localPart: 'MD_Georectified',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_GridSpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TopoPointType',
        elementName: 'TopoPoint'
      }, {
        typeInfo: '.SolidPropertyType',
        elementName: 'solidProperty'
      }, {
        typeInfo: '.MeasureType',
        elementName: 'semiMajorAxis'
      }, {
        typeInfo: '.AbstractTopoPrimitiveType',
        elementName: 'AbstractTopoPrimitive',
        substitutionHead: 'AbstractTopology'
      }, {
        typeInfo: '.CIOnlineResourceType',
        elementName: {
          localPart: 'CI_OnlineResource',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'AnyType',
        elementName: 'AbstractScalarValue',
        substitutionHead: 'AbstractValue'
      }, {
        typeInfo: '.ClothoidType',
        elementName: 'Clothoid',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.OperationParameterPropertyType',
        elementName: 'valueOfParameter',
        substitutionHead: 'operationParameter'
      }, {
        typeInfo: '.DirectedFacePropertyType',
        elementName: 'directedFace'
      }, {
        typeInfo: '.DQAccuracyOfATimeMeasurementType',
        elementName: {
          localPart: 'DQ_AccuracyOfATimeMeasurement',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_TemporalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.GridFunctionType',
        elementName: 'GridFunction',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.GeometricComplexType',
        elementName: 'GeometricComplex',
        substitutionHead: 'AbstractGeometry'
      }, {
        typeInfo: '.SingleCRSPropertyType',
        elementName: 'singleCRSRef'
      }, {
        typeInfo: '.ArcStringType',
        elementName: 'ArcString',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.AbstractMDIdentificationType',
        elementName: {
          localPart: 'AbstractMD_Identification',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DSProductionSeriesType',
        elementName: {
          localPart: 'DS_ProductionSeries',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'DS_Series',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        elementName: 'stringValue'
      }, {
        typeInfo: '.HistoryPropertyType',
        elementName: 'track',
        substitutionHead: 'history'
      }, {
        typeInfo: '.EllipsoidalCSPropertyType',
        elementName: 'ellipsoidalCS'
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'multiSolidDomain',
        substitutionHead: 'domainSet'
      }, {
        typeInfo: '.AngleType',
        elementName: 'greenwichLongitude'
      }, {
        typeInfo: 'AnyType',
        elementName: 'AbstractScalarValueList',
        substitutionHead: 'AbstractValue'
      }, {
        typeInfo: '.CoordinatesType',
        elementName: 'tupleList'
      }, {
        typeInfo: '.AbstractCoordinateOperationType',
        elementName: 'AbstractCoordinateOperation',
        substitutionHead: 'Definition'
      }, {
        typeInfo: 'Duration',
        elementName: 'duration'
      }, {
        typeInfo: '.CurveType',
        elementName: 'Curve',
        substitutionHead: 'AbstractCurve'
      }, {
        typeInfo: '.DirectedNodePropertyType',
        elementName: 'directedNode'
      }, {
        typeInfo: '.TopoSurfacePropertyType',
        elementName: 'topoSurfaceProperty'
      }, {
        typeInfo: '.DerivationUnitTermType',
        elementName: 'derivationUnitTerm'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'DS_InitiativeTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.VectorType',
        elementName: 'vector'
      }, {
        typeInfo: '.ArcByCenterPointType',
        elementName: 'ArcByCenterPoint',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.MultiSolidPropertyType',
        elementName: 'multiSolidProperty'
      }, {
        typeInfo: '.MDResolutionType',
        elementName: {
          localPart: 'MD_Resolution',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeType',
        elementName: 'name'
      }, {
        typeInfo: '.AffinePlacementType',
        elementName: 'AffinePlacement',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.CodeType',
        elementName: 'methodFormula',
        substitutionHead: 'formula'
      }, {
        typeInfo: '.ArcType',
        elementName: {
          localPart: 'arc',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        }
      }, {
        typeInfo: '.OperationPropertyType',
        elementName: 'operationRef'
      }, {
        typeInfo: '.QuantityExtentType',
        elementName: 'QuantityExtent',
        substitutionHead: 'AbstractValue'
      }, {
        typeInfo: '.MappingRuleType',
        elementName: 'CoverageMappingRule',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.BSplineType',
        elementName: 'BSpline',
        substitutionHead: 'AbstractCurveSegment'
      }, {
        typeInfo: '.TypeNameType',
        elementName: {
          localPart: 'TypeName',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.CodeWithAuthorityType',
        elementName: 'pixelInCell'
      }, {
        typeInfo: '.ArrayType',
        elementName: 'Array',
        substitutionHead: 'AbstractGML'
      }, {
        typeInfo: '.ReferenceType',
        elementName: 'descriptionReference'
      }, {
        typeInfo: '.DerivedCRSPropertyType',
        elementName: 'derivedCRSRef'
      }, {
        typeInfo: '.VerticalCRSType',
        elementName: 'VerticalCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.OperationParameterType',
        elementName: 'OperationParameter',
        substitutionHead: 'AbstractGeneralOperationParameter'
      }, {
        typeInfo: '.GeographicCRSType',
        elementName: 'GeographicCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.MultiPointType',
        elementName: 'MultiPoint',
        substitutionHead: 'AbstractGeometricAggregate'
      }, {
        typeInfo: '.CRSPropertyType',
        elementName: 'crsRef'
      }, {
        typeInfo: '.MultiplicityRangeType',
        elementName: {
          localPart: 'MultiplicityRange',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.DirectedObservationAtDistanceType',
        elementName: 'DirectedObservationAtDistance',
        substitutionHead: 'DirectedObservation'
      }, {
        typeInfo: '.SphereType',
        elementName: 'Sphere',
        substitutionHead: 'AbstractGriddedSurface'
      }, {
        typeInfo: '.SolidArrayPropertyType',
        elementName: 'solidMembers'
      }, {
        typeInfo: '.ProjectedCRSType',
        elementName: 'ProjectedCRS',
        substitutionHead: 'AbstractGeneralDerivedCRS'
      }, {
        typeInfo: '.BinaryType',
        elementName: {
          localPart: 'Binary',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractGeometricAggregateType',
        elementName: 'AbstractGeometricAggregate',
        substitutionHead: 'AbstractGeometry'
      }, {
        typeInfo: 'Date',
        elementName: 'realizationEpoch'
      }, {
        typeInfo: '.ShellType',
        elementName: 'Shell',
        substitutionHead: 'AbstractObject'
      }, {
        elementName: 'defaultCodeSpace'
      }, {
        typeInfo: '.CoordinateOperationPropertyType',
        elementName: 'coordOperation'
      }, {
        typeInfo: '.MultiGeometryPropertyType',
        elementName: 'multiGeometryProperty'
      }, {
        typeInfo: '.AbstractRingType',
        elementName: 'AbstractRing',
        substitutionHead: 'AbstractObject'
      }, {
        typeInfo: '.Count',
        elementName: 'Count',
        substitutionHead: 'AbstractScalarValue'
      }, {
        typeInfo: '.PolarCSPropertyType',
        elementName: 'polarCSRef'
      }, {
        typeInfo: '.MultiSurfaceType',
        elementName: 'MultiSurface',
        substitutionHead: 'AbstractGeometricAggregate'
      }, {
        typeInfo: '.AbstractCRSType',
        elementName: 'AbstractCRS',
        substitutionHead: 'Definition'
      }, {
        typeInfo: '.CurvePropertyType',
        elementName: 'centerLineOf'
      }, {
        typeInfo: '.DQThematicClassificationCorrectnessType',
        elementName: {
          localPart: 'DQ_ThematicClassificationCorrectness',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_ThematicAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.TopoPrimitiveMemberType',
        elementName: 'topoPrimitiveMember'
      }, {
        typeInfo: '.CurvePropertyType',
        elementName: 'edgeOf'
      }, {
        typeInfo: '.PrimeMeridianPropertyType',
        elementName: 'primeMeridian'
      }, {
        typeInfo: '.CIDateType',
        elementName: {
          localPart: 'CI_Date',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DegreesType',
        elementName: 'degrees'
      }, {
        typeInfo: '.OperationMethodPropertyType',
        elementName: 'operationMethodRef'
      }, {
        typeInfo: '.DQGriddedDataPositionalAccuracyType',
        elementName: {
          localPart: 'DQ_GriddedDataPositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_PositionalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'Boolean',
        elementName: 'booleanValue'
      }, {
        typeInfo: '.DMSAngleType',
        elementName: 'dmsAngleValue'
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'domainSet'
      }, {
        typeInfo: '.TimeOrdinalEraType',
        elementName: 'TimeOrdinalEra'
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'RectifiedGridCoverage',
        substitutionHead: 'AbstractDiscreteCoverage'
      }, {
        typeInfo: '.PointPropertyType',
        elementName: 'pointMember'
      }, {
        typeInfo: '.CoordinateOperationPropertyType',
        elementName: 'coordinateOperationRef'
      }, {
        typeInfo: '.EngineeringDatumPropertyType',
        elementName: 'usesEngineeringDatum',
        substitutionHead: 'engineeringDatum'
      }, {
        typeInfo: '.ImageCRSType',
        elementName: 'ImageCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.EngineeringDatumPropertyType',
        elementName: 'engineeringDatumRef'
      }, {
        typeInfo: '.TimeNodeType',
        elementName: 'TimeNode',
        substitutionHead: 'AbstractTimeTopologyPrimitive'
      }, {
        typeInfo: '.FormulaCitation',
        elementName: 'formulaCitation'
      }, {
        typeInfo: '.VerticalCSPropertyType',
        elementName: 'verticalCSRef'
      }, {
        typeInfo: '.MDGeometricObjectsType',
        elementName: {
          localPart: 'MD_GeometricObjects',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.OperationParameterGroupPropertyType',
        elementName: 'valuesOfGroup',
        substitutionHead: 'group'
      }, {
        typeInfo: 'NonNegativeInteger',
        elementName: 'minimumOccurs'
      }, {
        typeInfo: '.TopoVolumePropertyType',
        elementName: 'topoVolumeProperty'
      }, {
        typeInfo: '.CIResponsiblePartyType',
        elementName: {
          localPart: 'CI_ResponsibleParty',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_ProgressCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TimeEdgeType',
        elementName: 'TimeEdge',
        substitutionHead: 'AbstractTimeTopologyPrimitive'
      }, {
        typeInfo: '.MDIdentifierType',
        elementName: {
          localPart: 'MD_Identifier',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AbstractCoordinateOperationType',
        elementName: 'AbstractOperation',
        substitutionHead: 'AbstractSingleOperation'
      }, {
        typeInfo: '.TopoComplexPropertyType',
        elementName: 'subComplex'
      }, {
        typeInfo: '.DirectPositionListType',
        elementName: 'posList'
      }, {
        typeInfo: '.MultiCurvePropertyType',
        elementName: 'multiCenterLineOf'
      }, {
        typeInfo: '.EngineeringDatumType',
        elementName: 'EngineeringDatum',
        substitutionHead: 'AbstractDatum'
      }, {
        typeInfo: '.DQDomainConsistencyType',
        elementName: {
          localPart: 'DQ_DomainConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_LogicalConsistency',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.ObliqueCartesianCSPropertyType',
        elementName: 'obliqueCartesianCSRef'
      }, {
        typeInfo: '.AbstractTimePrimitiveType',
        elementName: 'AbstractTimePrimitive',
        substitutionHead: 'AbstractTimeObject'
      }, {
        typeInfo: '.AbstractTimeComplexType',
        elementName: 'AbstractTimeComplex',
        substitutionHead: 'AbstractTimeObject'
      }, {
        typeInfo: '.GeographicCRSPropertyType',
        elementName: 'geographicCRSRef'
      }, {
        typeInfo: '.CoordinatesType',
        elementName: 'coordinates'
      }, {
        typeInfo: 'DateTime',
        elementName: {
          localPart: 'DateTime',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.MDLegalConstraintsType',
        elementName: {
          localPart: 'MD_LegalConstraints',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_Constraints',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.EngineeringCRSType',
        elementName: 'EngineeringCRS',
        substitutionHead: 'AbstractSingleCRS'
      }, {
        typeInfo: '.LengthType',
        elementName: {
          localPart: 'Distance',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        },
        substitutionHead: {
          localPart: 'Length',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.LocalisedCharacterStringType',
        elementName: {
          localPart: 'LocalisedCharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.PrimeMeridianPropertyType',
        elementName: 'usesPrimeMeridian',
        substitutionHead: 'primeMeridian'
      }, {
        typeInfo: '.PointType',
        elementName: 'Point',
        substitutionHead: 'AbstractGeometricPrimitive'
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'MultiSurfaceCoverage',
        substitutionHead: 'AbstractDiscreteCoverage'
      }, {
        typeInfo: '.MDMediumType',
        elementName: {
          localPart: 'MD_Medium',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MultiCurveType',
        elementName: 'MultiCurve',
        substitutionHead: 'AbstractGeometricAggregate'
      }, {
        typeInfo: '.FeaturePropertyType',
        elementName: 'featureProperty'
      }, {
        typeInfo: '.GeometryArrayPropertyType',
        elementName: 'geometryMembers'
      }, {
        typeInfo: 'Decimal',
        elementName: 'decimalMinutes'
      }, {
        typeInfo: '.DirectedObservationType',
        elementName: 'DirectedObservation',
        substitutionHead: 'Observation'
      }, {
        typeInfo: '.CoordinateOperationAccuracy',
        elementName: 'coordinateOperationAccuracy'
      }, {
        typeInfo: '.LengthType',
        elementName: {
          localPart: 'Length',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        },
        substitutionHead: {
          localPart: 'Measure',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.TemporalDatumPropertyType',
        elementName: 'temporalDatumRef'
      }, {
        typeInfo: '.TinType',
        elementName: 'Tin',
        substitutionHead: 'TriangulatedSurface'
      }, {
        typeInfo: '.GeodeticDatumPropertyType',
        elementName: 'geodeticDatumRef'
      }, {
        typeInfo: '.AbstractDQThematicAccuracyType',
        elementName: {
          localPart: 'AbstractDQ_ThematicAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Element',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MDGeoreferenceableType',
        elementName: {
          localPart: 'MD_Georeferenceable',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_GridSpatialRepresentation',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: 'Boolean',
        elementName: {
          localPart: 'Boolean',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.SecondDefiningParameter',
        elementName: 'secondDefiningParameter'
      }, {
        typeInfo: '.MultiCurvePropertyType',
        elementName: 'multiEdgeOf'
      }, {
        typeInfo: '.MDRangeDimensionType',
        elementName: {
          localPart: 'MD_RangeDimension',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.MDSecurityConstraintsType',
        elementName: {
          localPart: 'MD_SecurityConstraints',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_Constraints',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.AngleType',
        elementName: {
          localPart: 'Angle',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        },
        substitutionHead: {
          localPart: 'Measure',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.AbstractDQTemporalAccuracyType',
        elementName: {
          localPart: 'AbstractDQ_TemporalAccuracy',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractDQ_Element',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.Boolean',
        elementName: 'Boolean',
        substitutionHead: 'AbstractScalarValue'
      }, {
        typeInfo: '.AbstractContinuousCoverageType',
        elementName: 'AbstractContinuousCoverage',
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.TimeCalendarEraType',
        elementName: 'TimeCalendarEra'
      }, {
        typeInfo: '.GeodeticDatumPropertyType',
        elementName: 'geodeticDatum'
      }, {
        typeInfo: '.VerticalDatumPropertyType',
        elementName: 'usesVerticalDatum',
        substitutionHead: 'verticalDatum'
      }, {
        typeInfo: '.ConversionType',
        elementName: 'Conversion',
        substitutionHead: 'AbstractGeneralConversion'
      }, {
        typeInfo: '.DomainSetType',
        elementName: 'multiCurveDomain',
        substitutionHead: 'domainSet'
      }, {
        typeInfo: '.CompositeCurveType',
        elementName: 'CompositeCurve',
        substitutionHead: 'AbstractCurve'
      }, {
        typeInfo: '.CodeListValueType',
        elementName: {
          localPart: 'MD_CoverageContentTypeCode',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'CharacterString',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gco'
        }
      }, {
        typeInfo: '.BoundingShapeType',
        elementName: 'boundedBy'
      }, {
        typeInfo: '.DictionaryEntryType',
        elementName: 'dictionaryEntry'
      }, {
        typeInfo: '.PrimalSpaceFeaturesType',
        elementName: {
          localPart: 'PrimalSpaceFeatures',
          namespaceURI: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core'
        },
        substitutionHead: 'AbstractFeature'
      }, {
        typeInfo: '.CurvePropertyType',
        elementName: 'curveMember'
      }, {
        typeInfo: '.SolidPropertyType',
        elementName: 'solidMember'
      }, {
        typeInfo: '.EXGeographicBoundingBoxType',
        elementName: {
          localPart: 'EX_GeographicBoundingBox',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'AbstractEX_GeographicExtent',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.DSDataSetType',
        elementName: {
          localPart: 'DS_DataSet',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.ParameterValueGroupType',
        elementName: 'ParameterValueGroup',
        substitutionHead: 'AbstractGeneralParameterValue'
      }, {
        typeInfo: '.DiscreteCoverageType',
        elementName: 'AbstractDiscreteCoverage',
        substitutionHead: 'AbstractCoverage'
      }, {
        typeInfo: '.VerticalCSPropertyType',
        elementName: 'usesVerticalCS',
        substitutionHead: 'verticalCS'
      }, {
        typeInfo: '.MDImageDescriptionType',
        elementName: {
          localPart: 'MD_ImageDescription',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        },
        substitutionHead: {
          localPart: 'MD_CoverageDescription',
          namespaceURI: 'http:\/\/www.isotc211.org\/2005\/gmd'
        }
      }, {
        typeInfo: '.CoordinateSystemAxisPropertyType',
        elementName: 'axis'
      }, {
        typeInfo: '.VerticalCRSPropertyType',
        elementName: 'verticalCRSRef'
      }, {
        typeInfo: '.AbstractTimeSliceType',
        elementName: 'AbstractTimeSlice',
        substitutionHead: 'AbstractGML'
      }]
  };
  return {
    IndoorGML_Core_1_0_3: IndoorGML_Core_1_0_3
  };
};
if (typeof define === 'function' && define.amd) {
  define([], IndoorGML_Core_1_0_3_Module_Factory);
}
else {
  var IndoorGML_Core_1_0_3_Module = IndoorGML_Core_1_0_3_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.IndoorGML_Core_1_0_3 = IndoorGML_Core_1_0_3_Module.IndoorGML_Core_1_0_3;
  }
  else {
    var IndoorGML_Core_1_0_3 = IndoorGML_Core_1_0_3_Module.IndoorGML_Core_1_0_3;
  }
}

// module.exports = IndoorGML_Core_1_0_3_Module_Factory;
