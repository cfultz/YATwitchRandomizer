        $(function(){
                $(window).load(function(){ // On load
                        $('.button_sliding_bg').css({'height':(($(window).height()*.21))+'px'});
                        $('.button_sliding_bg').css({'width':(($(window).height()*.21))+'px'});
                        $('#player').css({'height':(($(window).height()*.65))+'px'});
                        $('#player').css({'width':(($(window).width()*.65))+'px'});

                });
                $(window).resize(function(){ // On resize
                        $('.button_sliding_bg').css({'height':(($(window).height()*.21))+'px'});
                        $('.button_sliding_bg').css({'width':(($(window).height()*.21))+'px'});
                        $('#player').css({'height':(($(window).height()*.65))+'px'});
                        $('#player').css({'width':(($(window).width()*.65))+'px'});
                });
        });

