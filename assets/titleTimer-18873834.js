(function(){"use strict";let e;self.onmessage=t=>{t.data==="start"?(e&&clearTimeout(e),e=self.setTimeout(()=>{self.postMessage("tick")},2e3)):t.data==="clear"&&e&&clearTimeout(e)}})();
