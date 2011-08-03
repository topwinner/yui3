Widget Std Mod
==============

3.4.0
-----

  * Move attribute event listeners to _renderUIStdMod() method so that 
    setStdModContent() can be called on renderUI()

3.3.0
-----

  * Changed instanceof to Y.instanceOf, to prevent leaks in IE7

  * Moved to node.insert for content management, since it now handles 
    Strings, Nodes and NodeLists. This also fixes an issue where 
    resetting the content to the existing content (e.g. calling syncUI), 
    would blow away the content in IE. NOTE: Removed _addNodeHTML, and 
    renamed _addNodeRef to _addStdModContent (both private), since one
    method now handles both strings and node/nodelists. 

3.2.0
-----

  * Setting content to null (or undefined, or NaN), will remove section
    from the std mod.

3.1.1
-----

  * No changes.

3.1.0
-----

  * Changed widget stdmod renderUI/syncUI/bindUI to Y.before, so that they are 
    called before the Widget implementation, and setup the header/body/footer
    node references for the Widget impl to use.

  * Setting section content to "" will now create the respective section. 

  * Fixed fillHeight, to work with contentBox height, now that it fills boundingBox

  * Fixed setStdModContent("markupString", AFTER | BEFORE) so that it uses 
    node.append, node.prepend instead of innerHTML to maintain listeners.

  * fillHeight is now invoked when height is changed. Was not being invoked 
    because of a typo in the event name.

3.0.0
-----

  * Cleaned up the way headerContent, bodyContent, footerContent are configured,
    so that the actual stored value is always accurate, without the need for a 
    getter which talks to the DOM directly.

  * Recreate sections from TEMPLATE string for each instance, instead of
    cloning a class level cached Node instance, so that ownerDocument
    can be set to match the content box.

  * Replaced use of innerHTML for progressive enhancement use case with 
    document fragment when parsing and then setting headerContent, bodyContent,
    footerContent in HTML_PARSER impl, to maintain event listeners etc.

3.0.0 beta 1
------------

  * No Changes

3.0.0PR2 - Initial release
--------------------------