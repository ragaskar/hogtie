Hogtie
======

Hogtie is a jQuery plugin that allows you to set up simple field constraints in forms. In other words, if you have a checkbox whose accessibility should be determined by the value of another field, you may find hogtie useful.

At the moment, hogtie is *extremely* simple. It probably doesn't handle multiple constraints properly. 

Here's a usage example:

Suppose we have a form for a blog post where we require that a post is "published" in order to be marked "featured". It looks like this:

	<form>
		<input type="checkbox" value="1" name="post[featured]" id="post_featured">
		<select name="post[state_event]" id="post_state_event">
			<option selected="selected" value="draft">draft</option>
			<option value="publish">published</option>
		</select>
	</form>

To disable the "featured" checkbox whenever the post is in a "draft" state, we could call hogtie like this: 

	$("#post_featured").hogtie({"#post_state_event": "draft"});
	
But wait, there's more! What if we want to clear the checkbox value whenever the checkbox is disabled? Hogtie takes as a second parameter a function which is called whenever the hogtied field is enabled or disabled. It will pass the .attr("disabled") value to this function. (IE, if the field is disabled, the function will be called with "true"). So we're able to do this: 

	var featuredCheckbox = $("#post_featured");
	featuredCheckbox.hogtie({"#post_state_event": "draft"}, function(disabled) {
	  if (disabled) {
	    featuredCheckbox.attr("checked", !disabled);
	  }
	});
	

HOLD ON COWBOY
==============

There's a lot of things hogtie *doesn't* do that it could do. Sorry, dude, this is what you get in 10 minutes. Fork away, though, lil' pardner.
	

*Don't README, READ TESTS for a full explanation.*

