const liveLocationBlind = document.querySelector(".live-location");
if((localStorage.getItem('order3') == 1 ) && (window.location.href.includes('/resultDetails/liveLocation'))  ){
      const synth = window.speechSynthesis;
      let utter = new SpeechSynthesisUtterance("");
        utter.voiceURI = 'Google العربية';
        utter.lang = 'ar-SA';
        window.addEventListener("load", () => {
          setTimeout(()=>{utter.text =`${liveLocationBlind.innerHTML}`; synth.speak(utter);}, "5000");
        });
         // annyang
      if (annyang) {
          
          // Add Arabic language model
          annyang.setLanguage('ar');
        
          // Add voice commands
          annyang.addCommands({
            'اعاده': () => {
              utter.text ="انزل زهراء المعادى واركب ميكروباص السيدة زينب ثم انزل السيدة زينب واركب ميكروباص الجيزة ثم اركب اتوبيس (خط رقم: 8/) من ميدان الجيزة ثم انزل شارع مراد"
              synth.speak(utter);
            },
            
          });
         
          
          // Start listening for commands
          annyang.start();
        } else {
          console.log('annyang not supported');
        }
      
      }
      console.log(localStorage.getItem('order3'));