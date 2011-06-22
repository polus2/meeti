
require(["/javascripts/spinnets/jquery.infieldlabel.js"], function() {

    require.ready(function() {

        $(function(){

            var on_focus = function(){
                var me = $(this);
                me.parents(".field").addClass("focused");
            }

            var on_blur = function(){
                var me = $(this);
                me.parents(".field").removeClass("focused");
            }

            $(".field input").blur(on_blur);
            $(".field input").focus(on_focus);

            $(".field input, .field textarea").inFieldLabels();

        })

    });
});

