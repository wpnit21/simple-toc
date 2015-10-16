/*
wpnit-simple-toc.js
*/
var wpnit_updateToc,
    wpnit_insertToc;

jQuery(document).ready(function($) {
    /*
    var form = $('\
        <div id="toc-form">\
        <h2>Specify how you want to generate the TOC.</h2>\
        <br />\
        <table id="TOC-table" class="form-table">\
		<tr>\
			<th><label for="TOC-master">What is the master header tag?</label></th>\
			<td><select name="type" id="TOC-master">\
				<option value="h1">h1</option>\
				<option value="h2" selected>h2</option>\
				<option value="h3">h3</option>\
				<option value="h4">h4</option>\
			    </select><br />\
			    <small>The initial header tag used to generate the toc</small>\
			</td>\
		</tr>\
		<tr>\
			<th><label for="TOC-sub">Generate sublevels</label></th>\
			<td><input type="checkbox" name="sub" id="TOC-sub" value="" checked /><br />\
			    <small>If the toc will generate sublevels from smaller header tags</small>\
			</td>\
		</tr>\
	    </table>\
	    <p class="submit">\
		    <input type="button" id="TOC-submit" class="button-primary" value="Insert" name="submit" />\
	    </p>\
	    </div>');
	
	var table = form.find('table');
	form.appendTo('body').hide();

	// handles the click event of the submit button
	form.find('#TOC-submit').click(function() {
        var content, headers, master, sub;

        content = wpnit_getEditorContent();
		master = table.find('#TOC-master').val();
		sub = table.find('#TOC-sub').prop('checked');
		
		if (!sub) {
            headers = master;		    
		} else {
            var s = 'h1,h2,h3,h4,h5,h6';
            headers = s.substring( s.indexOf(master) );
		}

        var toc = $('<div class="wpnit-simple-toc"></div>');
		tinyMCE.activeEditor.execCommand('mceInsertContent', 0, toc.prop('outerHTML'));

		// closes Thickbox
		tb_remove();
	});
	
    function getEditorContent() {
        if (typeof tinyMCE != "undefined" && tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden()) {
    	    return tinyMCE.activeEditor.getContent();
        } else {
            return $("#content").val();
        }
    }
	*/

    wpnit_updateToc = function() {
        var content = tinyMCE.activeEditor.getContent();
        var jcontent = $('<div>' + content + '</div>');
        var jtoc = $('<div></div>');

        jcontent.find('h2,h3,h4,h5,h6').each(function(i) {
            var current = $(this);
            current.attr('id', 'wpnit-simple-toc-' + i);
            var cls = current.prop('tagName').toLowerCase();
            current.addClass('wpnit-simple-toc-header-' + cls);

            if (i > 0) {
                jtoc.append('<br />');
            }
            jtoc.append('<a id="wpnit-simple-toc-link-' + i +
                            '" href="#wpnit-simple-toc-' + i +
                            '" class="wpnit-simple-toc-link-' + cls + '">' +
                            current.text() + '</a>');
        });
        
        jcontent.find('.wpnit-simple-toc').html(jtoc.html());
        
        tinyMCE.activeEditor.setContent(jcontent.html());
    };
    
    wpnit_insertToc = function() {
		tinyMCE.activeEditor.execCommand('mceInsertContent', 0, '<div class="wpnit-simple-toc"></div>');
		wpnit_updateToc();
    };
});