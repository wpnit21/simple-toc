<?php
/*
Plugin Name: WPNit Simple TOC
Plugin URI: https://github.com/wpnit21/simple-toc
Description: Automatically creates a table of contents in your posts or pages based on its headings
Version: 0.1.0
Author: Alberto
Author URI:
License: GPLv2 or later
Text Domain: wpnit-simple-toc
*/

class WPNit_Simple_Toc {
    function __construct() {
    	add_action( 'admin_enqueue_scripts', array($this, 'action_admin_enqueue_scripts') );
    	add_action( 'admin_init', array($this, 'action_admin_init') );
    	add_action( 'wp_enqueue_scripts', array($this, 'action_wp_enqueue_scripts') );
    }

    function action_admin_enqueue_scripts($hook) {
        if ('post.php' == $hook || 'post-new.php' == $hook) {
            wp_enqueue_script('wpnit_simple_toc_script', plugin_dir_url( __FILE__ ) . 'wpnit-simple-toc.js');
        }
    }

	function action_admin_init() {
		// Only hook up these filters if we're in the admin panel, and the
		// current user has permission to edit posts and pages
		if ( is_admin() && current_user_can('edit_posts') && current_user_can('edit_pages') ) {
			add_filter( 'mce_buttons', array( $this, 'filter_mce_button' ) );
			add_filter( 'tiny_mce_before_init', array( $this, 'filter_mce_plugin' ) );
		}
	}

    function action_wp_enqueue_scripts() {
        wp_enqueue_style('wpnit_simple_toc_style', plugin_dir_url( __FILE__ ) . 'wpnit-simple-toc.css');
    }
		
	function filter_mce_button( $buttons ) {
		// Add a separation before our button, here our button's id is "TOC_button"
		array_push( $buttons, '|', 'TOC', 'TOC2' );
		return $buttons;
	}
		
	function filter_mce_plugin( $initArray ) {
		// This plugin file will work the magic of our button
		$initArray['setup'] = <<<JS
[function(ed) {
    ed.addButton('TOC', {
        title : 'Add Simple TOC',
        image : '../wp-content/plugins/wpnit-simple-toc/toc_icon.png',
        onclick : function() {
            //var width = jQuery(window).width(),
            //   H = jQuery(window).height(),
            //   W = (720 < width) ? 720 : width;
	        //W = W - 80;
	        //H = H - 84;
	        //tb_show('Insert Simple TOC', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=toc-form');
	        wpnit_insertToc();
        }
    });
    ed.addButton('TOC2', {
        title : 'Update Simple TOC',
        image : '../wp-content/plugins/wpnit-simple-toc/toc_update.png',
        onclick : function() {
            wpnit_updateToc();
        }
    });
}][0]
JS;
        return $initArray;
	}

} // end class

$wpnit_simple_toc = new WPNit_Simple_Toc();