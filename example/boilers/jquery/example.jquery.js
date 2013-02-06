/*!
 * ThreeSixty: A jQuery plugin for generating a draggable 360 preview from an image sequence.
 * Version: 0.0.1
 * Original author: @nick-jonas
 * Website: http://www.workofjonas.com
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {


var that = this,
        pluginName = 'threesixty',
        defaults = {

        },
        options = {},
        $container = {};

    /**
     * Constructor
     * @param {jQuery Object} element       main jQuery object
     * @param {Object} customOptions        options to override defaults
     */
    function ThreeSixty( element, customOptions ) {

        this.element = element;
        options = options = $.extend( {}, defaults, customOptions) ;
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    // PUBLIC API -----------------------------------------------------

    $.fn.destroy = function(){
        $(this).removeData();
        $container.html('');
    };



    // PRIVATE METHODS -------------------------------------------------

    /**
     * Initializiation, called once from constructor
     * @return null
     */
    ThreeSixty.prototype.init = function () {
        var $this = $(this.element);

        // setup main container
        $container = $this;

    };


    /**
     * A really lightweight plugin wrapper around the constructor,
        preventing against multiple instantiations
     * @param  {Object} options
     * @return {jQuery Object}
     */
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new ThreeSixty( this, options ));
            }
        });
    };

})( jQuery, window, document );