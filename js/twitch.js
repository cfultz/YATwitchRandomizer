$(document).ready(function() {
                $("#player").hide();
                var limit = 5;
                function getRandomInt(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                };

                $("#newGame").click(function(){
                        $("#intro").hide();
                        $("#introTitle").hide();
                        //$("#twitch-embed").detach();
                        //$('iframe[id="twitch-embed"]').remove();
                        $("#player").show();
                        //$("#twitch-embed").attach();
                        $("#twitch-embed").show();
                        var gameNum = getRandomInt(0,500);
                        var gameUrl = "https://api.twitch.tv/kraken/games/top?limit="+limit+"&offset="+ gameNum +"&client_id=ENTERYOURTWITCHCLIENTIDHERE";


                        $.getJSON(gameUrl, function(result){
                                for (var i = 0; i < limit; i++) {
                                        giantbombId = result.top[i].game.giantbomb_id;
                                        gameName = result.top[i].game.name;

                                        //now that we have the name, setup the links
                                        var ebayUrl = "https://www.ebay.com/sch/i.html?osacat=0&_from=R40&_trksid=p2045573.m570.l2632.R2.TR12.TRC2.A0.H0.TRS0&_nkw=" + gameName
                                        var amazonUrl = "http://www.amazon.com/s/ref=nb_sb_noss_2?tag=cfultz540-20&url=search-alias%3Dvideogames&field-keywords=" + gameName
                                        var twitchUrl = "http://www.twitch.tv/directory/game/" + gameName

                                        $("#ebayLink").attr("href", ebayUrl);
                                        $("#amazonLink").attr("href", amazonUrl);
                                        $("#twitchLink").attr("href", twitchUrl);

                                        twitchId = result.top[i].game._id;
                                        console.log(gameName + " gbid: " + giantbombId + " twitch id: " + twitchId);
                                        if (giantbombId != 0) break;
                                };
                                var streamUrl = "https://api.twitch.tv/kraken/streams?game="+ gameName +"&client_id=ENTERYOURTWITCHCLIENTIDHERE";
                                $.getJSON(streamUrl, function(response){
                                        streamNum = getRandomInt(0, Math.floor(response.streams.length, response._total)-1);
                                        channelUrl = response.streams[streamNum].channel.url;
                                        channelName = response.streams[streamNum].channel.name;
                                        console.log(channelName + " " + channelUrl);
                                        $("#title").text(gameName + " with "+ channelName);
                                        //var twitchVid = "http://player.twitch.tv/?channel=" + channelName;
                                        $("#videoiFrame").attr("src", "https://player.twitch.tv/?channel=" + channelName );
                                        $("#chat_embed").attr("src", "https://www.twitch.tv/embed/" + channelName +"/chat");
                                        var embed = new Twitch.Embed("twitch-embed", {
                                        width: 960,
                                        height: 540,
                                        channel: channelName,
                                        chat: "mobile",
                                        layout: "video-and-chat",
                                        autoplay: true
                                        });

                                        embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
                                        var player = embed.getPlayer();
                                        player.play();
                                        });


                                        //get the description using jsonp callback to enable cross domain
                                        var baseGbUrl = "http://www.giantbomb.com/game/3030-" + giantbombId + "/";
                                        $("#gbLink").attr("href", baseGbUrl);
                                        var gbUrl = "http://www.giantbomb.com/api/game/3030-" + giantbombId + "/?api_key=" + config.gbapikey + "&field_list=deck, image&format=jsonp&json_callback=gameJson";
                                        console.log(gbUrl);
                                        $.ajax({url: gbUrl,
                                                dataType: 'jsonp',
                                                jsonpCallback: 'gameJson',
                                                jsonp: false,
                                                crossDomain: true,
                                                error: function(gbresult){
                                                        alert("error");
                                                },
                                                success: function(gbresult){
                                                        $("#deck").text(gbresult.results.deck);
                                                }
                                        });

                                });

                        });

                        //so text doesn't change until after flip
                        window.setTimeout(function () {
                        $('#newGame').attr('data-label', 'Flip channel');
                        }, 500);
                });

