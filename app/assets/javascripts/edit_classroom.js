/**
 * Auto-completion related javascript
 */

// =require ./lib/jquery.autocomplete.js

( function( $, w ) {
  $( w.document ).ready( function() {
    $( '.autocomplete_users' ).autocomplete({
      serviceUrl: '',
      delimiter: /(,|;)\s*/,
      minChars: 3,
      width: '100%',
      params: {
        format: 'json',
        suggest_users: true
      },
      onSelect: function( data ) {
        var $el = $( this );
        var $input = $el.parent().find( '.autocomplete_input' );
        var val = ($input.val() == '') ? '' : $input.val() + ',';
        $input.val( val + data.user_id );
      },
      formatResult: function( entry ) {
        return '<img src="' + entry.pic + '" alt="">' +
          '<span>' + entry.value + '</span>';
      }
    })
  });
}( jQuery, window ))
