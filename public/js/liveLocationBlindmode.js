const liveLocationBlind = document.querySelector(".live-location");
let delay = 5000;

if((localStorage.getItem('order3') == 1 ) && (window.location.href.includes('/resultDetails/liveLocation'))  ){
      const synth = window.speechSynthesis;
      let utter = new SpeechSynthesisUtterance("");
      function repeatFunction() {
        utter.text = `${liveLocationBlind.innerHTML}`;
        synth.speak(utter);
        delay += 10000; 
      
        setTimeout(repeatFunction, delay);
      }
        utter.voiceURI = 'Google العربية';
        utter.lang = 'ar-SA';
        window.addEventListener("load", () => {
          setTimeout(repeatFunction, delay);
        });
         // annyang
      // if (annyang) {
          
      //     // Add Arabic language model
      //     annyang.setLanguage('ar');
        
      //     // Add voice commands
      //     annyang.addCommands({
      //       'اعاده': () => {
      //         utter.text ="انزل زهراء المعادى واركب ميكروباص السيدة زينب ثم انزل السيدة زينب واركب ميكروباص الجيزة ثم اركب اتوبيس (خط رقم: 8/) من ميدان الجيزة ثم انزل شارع مراد"
      //         synth.speak(utter);
      //       },
            
      //     });
         
          
      //     // Start listening for commands
      //     annyang.start();
      //   } else {
      //     console.log('annyang not supported');
      //   }
      
      }
      console.log(localStorage.getItem('order3'));