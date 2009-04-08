/**
 * Extends DataSource with schema-based JSON parsing functionality.
 *
 * @module datasource
 * @submodule datasource-dataparser
 */

/**
 * Adds parsability to the YUI DataSource utility.
 * @class DataSourceJSONParser
 * @extends Plugin
 */    
var DataSourceJSONParser = function() {
    DataSourceJSONParser.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceJSONParser, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "parser"
     */
    NS: "parser",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "DataSourceJSONParser"
     */
    NAME: "DataSourceJSONParser",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceCache Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        parser: {
            readOnly: true,
            value: Y.DataParser.JSON,
            useRef: true
        },
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceJSONParser, Y.Plugin, {
    /**
    * @method initializer
    * @description Internal init() handler.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defDataFn", this._beforeDefDataFn);
    },

    /**
     * Parses raw data into a normalized response.
     *
     * @method _beforeDefDataFn
     * @param e {Event.Facade} Event Facade.
     * @param o {Object} Object with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object.</dd>
     * <dt>data (Object)</dt> <dd>The raw response.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e, o) {
        var response = (this.get("parser").parse(this.get("schema"), o.data));
        if(!response) {
            response = {
                meta: {},
                results: o.data
            };
        }
        this._owner.fire("response", null, Y.mix(o, response));
        return new Y.Do.Halt("DataSourceJSONParser plugin halted _defDataFn");
    }
});
    
Y.namespace('plugin');
Y.plugin.DataSourceJSONParser = DataSourceJSONParser;
