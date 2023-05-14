const blindButton = document.querySelector('.blind-btn');
const locInputField = document.querySelector('#myInput');
const destInputField = document.querySelector('#myInput1');

blindButton.addEventListener('click', toggle);

function toggle(){
    blindButton.classList.toggle("blind-activated");
}
// speech recognition

// blindButton.classList.contains('blind-activated')
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; //make it true to continuuosly take commands
    recognition.lang = "ar-EG";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    const synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance("");
    // let openingPhrase = new SpeechSynthesisUtterance("");
    utter.lang = "ar-sa";
    // openingPhrase.lang = "ar-EG";

    window.onload= recognition.start();
    // window.addEventListener("load" , function(){blindButton.click();});
    blindButton.addEventListener("click", () => {
      recognition.start();
    });
    
   

    // openingPhrase.onend = () => {
    //     recognition.start();
    //   };
    utter.onend = () => {
      recognition.start();
    };

    recognition.onresult = (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

         if (transcript.includes("المكفوفين")) {
          recognition.abort();
          blindButton.click();
          utter.text = "تم تفعيل وضع المكفوفين";
          synth.speak(utter);
        //   recognition.continuous = false;
          console.log(transcript);
          recognition.continuous = true;
          
        }else if (transcript.includes("لوكيشن")) {
            if(transcript.includes("المعادي")){
                recognition.abort();
                setTimeout(()=>{locInputField.focus()}, "4")
                // locInputField.focus();
                utter.text ="يوجد العديد من الاختيارات المتاحة .. اذا كنت تعرف وجهتك المحددة, برجاء ادخال عنوان اكثر تفصيلا .. اذا كنت ترغب في سماع الاختيارات .. قل .. اقرا";
        
                synth.speak(utter);
                recognition.continuous = false;
                console.log(transcript);
               setTimeout(()=>{ locInputField.value =" "},"1");
               setTimeout(()=>{destInputField.focus()}, "3")
               setTimeout(()=>{ locInputField.value = transcript.replace("لوكيشن", "")},"2");
                
                
                
                recognition.continuous = true;
            }
      }
    };

   