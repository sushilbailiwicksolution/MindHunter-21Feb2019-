$(function(){
        window.WHEELOFFORTUNE = {
            cache: {},
            init: function () {
                console.log('controller init...');
                var _this = this;
                this.cache.wheel = $('.wheel');
                this.cache.wheelMarker = $('.topPointer img');
                this.cache.wheelSpinBtn = $('.wheel-wrap');

                this.cache.wheelMapping = [25,2,1,0,1,2,5,0].reverse();

                this.cache.wheelSpinBtn.on('click', function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('disabled')) _this.spin();
                });

                this.resetSpin();
            },

            spin: function () {
                console.log('spinning wheel');
                var _this = this;

                this.resetSpin();

                this.cache.wheelSpinBtn.addClass('disabled');

                var deg = Math.floor((Math.random() * 1500) + 360), 
                    duration = 800; 

                _this.cache.wheelPos = deg - 19;

                this.cache.wheel.transition({
                    rotate: '0deg'
                }, 0)
                    .transition({
                    rotate: deg + 'deg'
                }, duration, 'easeOutCubic');

                _this.cache.wheelMarker.transition({
                    rotate: '-40deg'
                }, 0, 'snap');

                setTimeout(function () {

                    _this.cache.wheelMarker.transition({
                        rotate: '0deg'
                    }, 300, 'easeOutQuad');
                }, duration - 500);

                setTimeout(function () {

                    var spin = _this.cache.wheelPos,
                        degrees = spin % 360,
                        percent = (degrees / 360) * 100,
                        //
						segment = Math.ceil(((percent/100) * 8)), 
						
                        win = _this.cache.wheelMapping[segment -1]; //zero based array


                    console.log('spin = ' + spin);
                    console.log('degrees = ' + degrees);
                    console.log('percent = ' + percent);
                    console.log('segment = ' + segment);
                    console.log('win = ' + win);

                    setTimeout(function () {
						
                        if (win === 0){

                        } else {
                            $('.stepOne').hide();
                            $('.stepTwo').show();
                            $('.stepTwo .parize').text(win)
                        }

                    _this.cache.wheelSpinBtn.removeClass('disabled');
                    }, 1500);

                }, duration);
            },

            resetSpin: function () {
                this.cache.wheel.transition({
                    rotate: '0deg'
                }, 0);
                this.cache.wheelPos = 0;$('.wheel-wrap').show(); $('p').css('visibility','hidden')
            }
        }
        window.WHEELOFFORTUNE.init();
});
