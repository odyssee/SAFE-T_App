/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var chaine_alerte ;
var audio1 ;
var audio2 ;
var audio3 ;
var audio4 ;
var audio5 ;
var flag_alerte_temperature_detecte = 0 ;
var flag_alerte_temperature_detecte_1 = 0 ;
var flag_alerte_temperature_systeme_detecte = 0 ;
var flag_alerte_temperature_systeme_detecte_1 = 0 ;
var flag_alerte_systeme_detecte = 0 ;
var flag_alerte_systeme_detecte_1 = 0 ;
var flag_alerte_longueur_detecte = 0 ;
var flag_alerte_longueur_detecte_1 = 0 ;
var flag_alerte_puissance_detecte = 0 ;
var flag_alerte_puissance_detecte_1 = 0 ;

var flag_alarme_temperature_detecte = 0 ;
var flag_alarme_temperature_detecte_1 = 0 ;
var flag_alarme_temperature_systeme_detecte = 0 ;
var flag_alarme_temperature_systeme_detecte_1 = 0 ;
var flag_alarme_systeme_detecte = 0 ;
var flag_alarme_systeme_detecte_1 = 0 ;
var flag_alarme_longueur_detecte = 0 ;
var flag_alarme_longueur_detecte_1 = 0 ;
var flag_alarme_puissance_detecte = 0 ;
var flag_alarme_puissance_detecte_1 = 0 ;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    //setInterval(F_Send_Request,1000) ;
    F_Fonction_Principale() ;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

function dimensionCarre()
{
	var carres = document.getElementsByClassName('carre');
		for (var i= 0; i < carres.length; ++i){
			var carre = carres[i];
			var hauteur= carre.offsetHeight;
			// alert(hauteur);
			
			carre.style.width = hauteur + "px";
		}
}

function tuilesDim(){
	var inverseR = 1.6524;
	var tuiles = document.getElementById('tuiles');
	var screenWidth = screen.width;
	//alert(screenWidth);
	var sectionWidth = document.getElementById('innerBloc').offsetWidth;
	//alert(sectionWidth);
	var H = tuiles.offsetHeight;
	var newH;
	var L1; var L2;

	if (inverseR*H < sectionWidth){
		L1 = inverseR*H;
		tuiles.style.width = L1 +"px";		
		//alert("ok1");
	}
	else {
		L2 = sectionWidth;
		newH = L2/inverseR;
		tuiles.style.width = L2 +"px";
		tuiles.style.height= newH +"px";
		//alert("ok2");
	}


	
}
function ratioCarre() {
	//var inverseRatio = 0.9;
	var inverseRatio=1.0936;
	//var inverseRatio = 2/3 * 1.6524; // 2/3 du ratio pour le grand rectangle
	var Hmax = document.getElementById('tuiles').offsetHeight;
	var Lmax = document.getElementById('tuiles').offsetWidth;
	//alert("Hmax " + Hmax);
	//alert("Lmax " + Lmax);
	var carres = document.getElementsByClassName('carre');
	var h = carres[0].offsetHeight;
	var l = carres[0].offsetWidth;
	
	//alert("h " + h);
	//alert("l " + l);
	
	if (3*l > Lmax) {
		l = Lmax/3;
		h = l/inverseRatio; 
	}
	else {
		h = Hmax/2;
		l = inverseRatio * h;
	}
	
	for (var i= 0; i < carres.length; ++i){
	var carre = carres[i];
	carre.style.width = l + "px";
	carre.style.height = h +"px";
	}
}

function notifWidth(){
	var tuilesWidth = document.getElementById('tuiles').offsetWidth;
	//alert("test1");
	var notifications = document.getElementById('notifications');
	notifications.style.width = tuilesWidth +"px";
	//alert("width ok");
}

function notifHeight(){
	var tuilesHeight = document.getElementById('tuiles').offsetHeight;
	//alert("test1");
	var rectangle= document.getElementById('notifRectangle');
	//alert (rectangle);
	//var rectangleHeight = rectangle.offsetHeight;
	rectangle.style.height = 0.8*tuilesHeight +"px";
	//alert("width ok");
}

function F_Send_Request()
{
	var xhr = new XMLHttpRequest() ;
	var reponse_text ;
	var reponse_text_Array=[] ;
	var carre_1 = document.getElementsByClassName("carre") ;
	
	
	//xhr.responseType = 'text' ;
	xhr.open('GET', 'http://192.168.4.1', true) ;
        
	
		xhr.onload = function () 
		{
			reponse_text = xhr.responseText ;
			reponse_text_Array = reponse_text.split("-");
			chaine_alerte = reponse_text_Array[10] ;
			
			document.getElementById('HEURES').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min";
			document.getElementById('TEMPERATURE').innerHTML = reponse_text_Array[5]+"°C" ;
			document.getElementById('PUISSANCE').innerHTML = reponse_text_Array[6] +'W';
			document.getElementById('VITESSE').innerHTML = reponse_text_Array[9]+"m/s" ;
			document.getElementById('LONGUEUR').innerHTML = reponse_text_Array[7]+'m' ;
			//document.getElementById('COUPLE').innerHTML = reponse_text_Array[8]+'%' ;
			document.getElementById('COUPLE').innerHTML = flag_alarme_temperature_systeme_detecte_1 + ' ' + flag_alarme_temperature_systeme_detecte  ;
			document.getElementById('HEURES_TOTALES').innerHTML = reponse_text_Array[3] ;
			
			flag_alarme_temperature_systeme_detecte_1 = 1 ;
			/*****************************************/
			/*               Puissance               */
			/*****************************************/
			if((chaine_alerte.charAt(1) != 0) && (chaine_alerte.charAt(1) != 5))
			{
			  flag_alerte_puissance_detecte = 1 ;
			  flag_alarme_puissance_detecte = 0 ;
			  document.getElementById('PUISSANCE').style.color = '#DB1423' ;
			  document.getElementById('PUISSANCE').style.backgroundColor = '#E3BDBF' ;
			  carre_1[2].style.backgroundColor = '#E3BDBF' ;
			}
			else if(chaine_alerte.charAt(1) == 5)
			{
			  flag_alarme_puissance_detecte = 1 ;
			  document.getElementById('PUISSANCE').style.color = '#DB1423' ;
			  document.getElementById('PUISSANCE').style.backgroundColor = '#E3BDBF' ;
			  carre_1[2].style.backgroundColor = '#E3BDBF' ;
			  document.getElementById('notifRectangle').style.color = '#DB1423' ;
		          document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
			}
			else
			{
		          flag_alarme_temperature_systeme_detecte_1 = 2 ;
		          flag_alerte_puissance_detecte = 0 ;
		          flag_alarme_puissance_detecte = 0 ;
		          document.getElementById('PUISSANCE').style.color = '#888888' ;
		          document.getElementById('PUISSANCE').style.backgroundColor = '#E5E5E6' ;
		 	  document.getElementById('notifRectangle').style.backgroundColor = '#f2f9fc' ;
		          carre_1[2].style.backgroundColor = '#E5E5E6' ;
			}
			
			if((flag_alerte_puissance_detecte == 1) && (flag_alerte_puissance_detecte_1 == 0))
			{
			  	if((chaine_alerte.charAt(1) != 0) && (chaine_alerte.charAt(1) != 5))
				{
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
			                document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Warning, power consumption too High" ;
				}
			}
			if((flag_alarme_puissance_detecte == 1) && (flag_alarme_puissance_detecte_1 == 0))
			{
			  	if(chaine_alerte.charAt(1) == 5)
				{
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
			                document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
					document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Error, power consumption too High system will shut down, land your drone" ;
				}
			}
			if((flag_alarme_puissance_detecte == 0) && (flag_alarme_puissance_detecte_1 == 1))
			{
			  	document.getElementById('notifRectangle').style.color = '#DB1423' ;
			        document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
				document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Warning, power consumption too High" ;
			}
		
		
			/*****************************************/
			/*               Temperature             */
			/*****************************************/
			if((chaine_alerte.charAt(3) != 0) && (chaine_alerte.charAt(3) != 5))
			{
			  flag_alerte_temperature_detecte = 1 ;
			  flag_alarme_temperature_detecte = 0 ;
			  document.getElementById('TEMPERATURE').style.color = '#DB1423' ;
			  document.getElementById('TEMPERATURE').style.backgroundColor = '#E3BDBF' ;
			  carre_1[1].style.backgroundColor = '#E3BDBF' ;
			}
			else if(chaine_alerte.charAt(3) == 5)
			{
			  flag_alarme_temperature_detecte = 1 ;
			  document.getElementById('TEMPERATURE').style.color = '#DB1423' ;
			  document.getElementById('TEMPERATURE').style.backgroundColor = '#E3BDBF' ;
			  carre_1[1].style.backgroundColor = '#E3BDBF' ;
			  document.getElementById('notifRectangle').style.color = '#DB1423' ;
		          document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
			}
			else
			{
		          flag_alarme_temperature_systeme_detecte_1 = 3 ;
		          flag_alerte_temperature_detecte = 0 ;
		          flag_alarme_temperature_detecte = 0 ;
		          document.getElementById('TEMPERATURE').style.color = '#888888' ;
		          document.getElementById('TEMPERATURE').style.backgroundColor = '#E5E5E6' ;
		          if(flag_alarme_puissance_detecte == 0 )
		          {
		          	document.getElementById('notifRectangle').style.backgroundColor = '#f2f9fc' ;
		          }
		          carre_1[1].style.backgroundColor = '#E5E5E6' ;
			}
			
			if((flag_alerte_temperature_detecte == 1) && (flag_alerte_temperature_detecte_1 == 0))
			{
			  	if((chaine_alerte.charAt(3) != 0) && (chaine_alerte.charAt(3) != 5))
				{
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
			                document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Warning, temperature of the spool too High, unwind micro-tether" ; ;
				}
			}
			if((flag_alarme_temperature_detecte == 1) && (flag_alarme_temperature_detecte_1 == 0))
			{
			  	if(chaine_alerte.charAt(3) == 5)
				{
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
			                document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
					document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Error, temperature of the spool is too High, system will shut down, land your drone" ;
				}
			}
			if((flag_alarme_temperature_detecte == 0) && (flag_alarme_temperature_detecte_1 == 1))
			{
			  	document.getElementById('notifRectangle').style.color = '#DB1423' ;
			        document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
				document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Warning, temperature of the spool too High, unwind micro-tether" ; 
			}
			
			/*****************************************/
			/*               Longueur             */
			/*****************************************/
			if((chaine_alerte.charAt(4) != 0) && (chaine_alerte.charAt(4) != 5))
			{
			  flag_alerte_longueur_detecte = 1 ;
			  flag_alarme_longueur_detecte = 0 ;
			  document.getElementById('TEMPERATURE').style.color = '#DB1423' ;
			  document.getElementById('TEMPERATURE').style.backgroundColor = '#E3BDBF' ;
			  carre_1[4].style.backgroundColor = '#E3BDBF' ;
			}
			else if(chaine_alerte.charAt(4) == 5)
			{
			  flag_alarme_longueur_detecte = 1 ;
			  document.getElementById('TEMPERATURE').style.color = '#DB1423' ;
			  document.getElementById('TEMPERATURE').style.backgroundColor = '#E3BDBF' ;
			  carre_1[4].style.backgroundColor = '#E3BDBF' ;
			  document.getElementById('notifRectangle').style.color = '#DB1423' ;
		          document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
			}
			else
			{
		          flag_alarme_temperature_systeme_detecte_1 = 4 ;
		          flag_alerte_longueur_detecte = 0 ;
		          flag_alarme_longueur_detecte = 0 ;
		          document.getElementById('TEMPERATURE').style.color = '#888888' ;
		          document.getElementById('TEMPERATURE').style.backgroundColor = '#E5E5E6' ;
		          if((flag_alarme_puissance_detecte == 0)
		          && (flag_alarme_temperature_detecte == 0))
		          {
		          	document.getElementById('notifRectangle').style.backgroundColor = '#f2f9fc' ;
		          }
		          carre_1[4].style.backgroundColor = '#E5E5E6' ;
			}
			
			if((flag_alerte_longueur_detecte == 1) && (flag_alerte_longueur_detecte_1 == 0))
			{
			  	if((chaine_alerte.charAt(4) != 0) && (chaine_alerte.charAt(4) != 5))
				{
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
			                document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Warning, temperature of the spool too High, unwind micro-tether" ; ;
				}
			}
			if((flag_alarme_longueur_detecte == 1) && (flag_alarme_longueur_detecte_1 == 0))
			{
			  	if(chaine_alerte.charAt(4) == 5)
				{
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
			                document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
					document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Error, temperature of the spool is too High, system will shut down, land your drone" ;
				}
			}
			if((flag_alarme_longueur_detecte == 0) && (flag_alarme_longueur_detecte_1 == 1))
			{
			  	document.getElementById('notifRectangle').style.color = '#DB1423' ;
			        document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
				document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Warning, temperature of the spool too High, unwind micro-tether" ; 
			}
			
		
			
		/*	if(chaine_alerte.charAt(0) != 0)
			{
			  flag_alarme_systeme_detecte = 1 ;
			  flag_alarme_temperature_systeme_detecte_1 = 5 ;
			}
			else
			{
			  flag_alarme_systeme_detecte = 0 ;
			  flag_alarme_temperature_systeme_detecte_1 = 6 ;
			}
			
			if(chaine_alerte.charAt(2) == 5)
			{
			  flag_alarme_temperature_systeme_detecte = 1 ;
			}
			else
			{
			  flag_alarme_temperature_systeme_detecte = 0 ;
			}*/
			
			
			if((flag_alarme_temperature_systeme_detecte == 1) && (flag_alarme_temperature_systeme_detecte_1 == 0))
			{
				if(chaine_alerte.charAt(2) == 5)
				{
					document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Error, temperature of the system is too High, system will shut down, land your drone" ;
					document.getElementById('notifRectangle').style.color = '#DB1423' ;
		          		document.getElementById('notifRectangle').style.backgroundColor = '#E3BDBF' ;
		          		
				}
			}
			
				
		/*	if((flag_alerte_systeme_detecte == 1) && (flag_alerte_systeme_detecte_1 == 0))
			{
				if(chaine_alerte.charAt(0) == 1)
				{
					document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Error, short-circuit detected, system will shut down, land your drone" ;
				}
				if(chaine_alerte.charAt(0) == 2)
				{
					document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : Error, cable cut or onboard module failure, system will shut down, land your drone" ;
				}
			}*/
			
			flag_alarme_temperature_systeme_detecte_1 = 7 ;
			
			if(((flag_alerte_temperature_detecte == 0) && (flag_alerte_temperature_detecte_1 == 1))
			|| ((flag_alerte_puissance_detecte == 0) && (flag_alerte_puissance_detecte_1 == 1))
			|| ((flag_alerte_longueur_detecte == 0) && (flag_alerte_longueur_detecte_1 == 1)))
			{
				document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : All parameters Normal" ;
				document.getElementById('notifRectangle').style.color = '#112330' ;
		        }
		        
			if(((flag_alarme_temperature_detecte == 0) && (flag_alarme_temperature_detecte_1 == 1))
			|| ((flag_alarme_puissance_detecte == 0) && (flag_alarme_puissance_detecte_1 == 1))
			|| ((flag_alarme_longueur_detecte == 0) && (flag_alarme_longueur_detecte_1 == 1))
			|| ((flag_alarme_temperature_systeme == 0) && (flag_alarme_temperature_systeme_1 == 1)))
			{
				document.getElementById('notifRectangle').style.backgroundColor = '#f2f9fc' ;
		        }
			
			if((flag_alarme_temperature_systeme_detecte == 0) && (flag_alarme_temperature_systeme_detecte_1 == 1))
			{
				document.getElementById('notifRectangle').innerHTML = reponse_text_Array[0]+'h'+ reponse_text_Array[1]+"min"+" : All parameters Normal" ;
				document.getElementById('notifRectangle').style.color = '#112330' ;	
			}
			
			flag_alarme_temperature_systeme_detecte_1 = 8 ;
			
			flag_alerte_puissance_detecte_1 = flag_alerte_puissance_detecte ;
			flag_alerte_longueur_detecte_1 = flag_alerte_longueur_detecte ;
			flag_alerte_temperature_detecte_1 = flag_alerte_temperature_detecte ;
			flag_alerte_temperature_systeme_detecte_1 = flag_alerte_temperature_systeme_detecte ;
			flag_alerte_systeme_detecte_1 = flag_alerte_systeme_detecte ;
			
			flag_alarme_puissance_detecte_1 = flag_alarme_puissance_detecte ;
			flag_alarme_longueur_detecte_1 = flag_alarme_longueur_detecte ;
			flag_alarme_temperature_detecte_1 = flag_alarme_temperature_detecte ;
			
			flag_alarme_systeme_detecte_1 = flag_alarme_systeme_detecte ;
		};
		xhr.send(null) ;
		
};

function F_Play_Sound()
{
    
    if((chaine_alerte.charAt(3) == 1) || (chaine_alerte.charAt(1)== 1) || (chaine_alerte.charAt(4)== 1))
    {
      audio1.play() ;  	
    }
    if((chaine_alerte.charAt(3) == 2) || (chaine_alerte.charAt(1)== 2) || (chaine_alerte.charAt(4)== 1))
    {
      audio2.play() ;  	
    }
    if((chaine_alerte.charAt(3) == 3) || (chaine_alerte.charAt(1)== 3) || (chaine_alerte.charAt(4)== 1))
    {
      audio3.play() ;  	
    }
    if((chaine_alerte.charAt(3) == 4) || (chaine_alerte.charAt(1)== 4) || (chaine_alerte.charAt(4)== 1))
    {
      audio4.play() ;  	
    }
    if((chaine_alerte.charAt(3) == 5) || (chaine_alerte.charAt(1)== 5))
    {
      audio5.play() ;  	
    }
    if((chaine_alerte.charAt(0) == 1) || (chaine_alerte.charAt(1)== 2))
    {
      audio5.play() ;  	
    }
    if(chaine_alerte.charAt(2) == 5)
    {
      audio5.play() ;  	
    }
}
  
function F_Fonction_Principale()
{
  var path = window.location.pathname;
  path = path.substr( path, path.length - 10 );
  audio1 = new Media(path + 'bip_300.mp3');
  audio2 = new Media(path + 'bip_450.mp3');
  audio3 = new Media(path + 'bip_650.mp3');
  audio4 = new Media(path + 'bip_850.mp3');
  audio5 = new Media(path + 'bip_1000.mp3');
  setInterval(F_Send_Request,1000) ;	
  setInterval(F_Play_Sound,1200) ;
 // setInterval(F_Affiche_Debug,900) ;
}


