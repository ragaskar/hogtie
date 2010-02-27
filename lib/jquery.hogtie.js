(function($) {
  $.fn.hogtie = function(watchFields, whenChanged) {
    whenChanged = whenChanged || function() {};
    var constrained_field = $(this);
    $.each(watchFields, function(key, val) {
      var watch_field = $(key);
      var lockFunction = function() {
        if (watch_field.val() == val) {
          constrained_field.attr("disabled", true)
        } else {
          constrained_field.attr("disabled", false)
        }
        whenChanged(constrained_field.attr("disabled"));
      };
      watch_field.change(lockFunction);
      lockFunction();
    });
  }
})(jQuery);