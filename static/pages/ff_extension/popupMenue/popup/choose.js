
function listenForClicks() {
  document.addEventListener("click", (e) => {
       console.log("正在执行listenForClicks。");

      	function beastify(tabs) {
      	
	        
	        browser.tabs.sendMessage(tabs[0].id, {
	          command: "get",
	      
	        });
	      
	    }

	    function reset(tabs) {
	      
	        browser.tabs.sendMessage(tabs[0].id, {
	          command: "reset",
	        });
	      
	    }

      	if (e.target.classList.contains("beast")) {
      	browser.tabs.query({active: true, currentWindow: true})
	        .then(beastify)
	        .catch(reportError);
		}
		else if (e.target.classList.contains("reset")) {
		  browser.tabs.query({active: true, currentWindow: true})
		    .then(reset)
		    .catch(reportError);
		}

  });
}


function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error('Failed to execute beastify content script: ${error.message}');
}

browser.tabs.executeScript({file: "/content_scripts/gridOperate.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

