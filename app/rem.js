(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = Math.min(docEl.clientWidth,900)
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

window.onload = function () {
  document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
  });
  document.addEventListener('dblclick', function (e) {
      e.preventDefault();
  });
  document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
          event.preventDefault();
      }
  });
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false);
};