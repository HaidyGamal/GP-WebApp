
// // Create a new SpeechRecognition instance
// const recognition = new webkitSpeechRecognition();
// // Start the speech recognition service
// recognition.lang = 'ar-SA';
// recognition.start();
// // Set the language of the recognizer

// recognition.interimResults = false;
// recognition.maxAlternatives = 1;
// recognition.continuous = true;
// // Add an event listener that listens for the "result" event
// recognition.onresult= (e)=>{
//     const transcript = e.results[e.results.length - 1][0].transcript.trim();
//     console.log(transcript);
// }

localStorage.setItem('order2', 3);
console.log(localStorage.getItem('order'));
if(localStorage.getItem('order') == 1){
    localStorage.setItem('order2', 1);
const synth = window.speechSynthesis;
let utter = new SpeechSynthesisUtterance("");

// utter.text = "مرحبا";
  utter.voiceURI = 'Google العربية';
  utter.lang = 'ar-SA';

  window.addEventListener("load", () => {
    setTimeout(()=>{utter.text ="يوجد ثمان طرق متاحة.. برجاء اختيار الطريق المرغوب من الطرق التالية:"; synth.speak(utter);}, "5000");
    setTimeout(()=>{utter.text ="الطريق رقم واحد: خمسة وعشرون جنيه"; synth.speak(utter);}, "15000");
    setTimeout(()=>{utter.text ="الطريق رقم اثنين: خمسة وعشرون جنيه"; synth.speak(utter);}, "20000");
    setTimeout(()=>{utter.text ="الطريق رقم ثلاثة: خمسة وعشرون جنيه"; synth.speak(utter);}, "25000");
    setTimeout(()=>{utter.text ="الطريق رقم اربعة: خمسة وعشرون جنيه"; synth.speak(utter);}, "30000");
    setTimeout(()=>{utter.text ="الطريق رقم خمسة: ثلاثون جنيه"; synth.speak(utter);}, "35000");
    setTimeout(()=>{utter.text ="الطريق رقم ستة: ثلاثون جنيه"; synth.speak(utter);}, "40000");
    setTimeout(()=>{utter.text ="الطريق رقم سبعة: ثلاثون جنيه"; synth.speak(utter);}, "45000");
    setTimeout(()=>{utter.text ="الطريق رقم ثمانية: ثلاثون جنيه"; synth.speak(utter);}, "50000");
    setTimeout(()=>{utter.text ="للاختيار قل: الطريق رقم:"; synth.speak(utter);}, "55000");


  });

   // annyang
if (annyang) {
    
    // Add Arabic language model
    annyang.setLanguage('ar');
  
    // Add voice commands
    annyang.addCommands({
      'الطريق رقم واحد': () => {
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[0].innerText);
        heading[0].click();
        utter.text = "لقد قمت باختيار الطريق رقم واحد";
        synth.speak(utter);
      },
      'الطريق رقم اثنين': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[1].innerText);
        heading[1].click();
        utter.text = "لقد قمت باختيار الطريق رقم اثنين";
        synth.speak(utter);
      },
      'الطريق رقم ثلاثه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[2].innerText);
        heading[2].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثلاثة";
        synth.speak(utter);
      },
      'الطريق رقم اربعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[3].innerText);
        heading[3].click();
        utter.text = "لقد قمت باختيار الطريق رقم اربعة";
        synth.speak(utter);
      },
      'الطريق رقم خمسه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[4].innerText);
        heading[4].click();
        utter.text = "لقد قمت باختيار الطريق رقم خمسة";
        synth.speak(utter);
      },
      'الطريق رقم سته': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[5].innerText);
        heading[5].click();
        utter.text = "لقد قمت باختيار الطريق رقم ستة";
        synth.speak(utter);
      },
      'الطريق رقم سبعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[6].innerText);
        heading[6].click();
        utter.text = "لقد قمت باختيار الطريق رقم سبعة";
        synth.speak(utter);
      },
      'الطريق رقم ثمانيه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[7].innerText);
        heading[7].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثمانية";
        synth.speak(utter);
      }
    });
   
    
    // Start listening for commands
    annyang.start();
  } else {
    console.log('annyang not supported');
  }

}else if(localStorage.getItem('order') == 0){
    const synth = window.speechSynthesis;
let utter = new SpeechSynthesisUtterance("");
// utter.text = "مرحبا";
  utter.voiceURI = 'Google العربية';
  utter.lang = 'ar-SA';

  window.addEventListener("load", () => {
    setTimeout(()=>{utter.text ="يوجد ثمان طرق متاحة.. برجاء اختيار الطريق المرغوب من الطرق التالية:"; synth.speak(utter);}, "5000");
    setTimeout(()=>{utter.text ="الطريق رقم واحد: اثنان ونصف كيلو متر"; synth.speak(utter);}, "15000");
    setTimeout(()=>{utter.text ="الطريق رقم اثنين: اثنان ونصف كيلومتر"; synth.speak(utter);}, "20000");
    setTimeout(()=>{utter.text ="الطريق رقم ثلاثة: اثنان ونصف كيلومتر"; synth.speak(utter);}, "25000");
    setTimeout(()=>{utter.text ="الطريق رقم اربعة: اثنان ونصف كيلومتر"; synth.speak(utter);}, "30000");
    setTimeout(()=>{utter.text ="الطريق رقم خمسة: ثلاثة كيلومتر"; synth.speak(utter);}, "35000");
    setTimeout(()=>{utter.text ="الطريق رقم ستة: ثلاثة كيلومتر"; synth.speak(utter);}, "40000");
    setTimeout(()=>{utter.text ="الطريق رقم سبعة: ثلاثة كيلومتر"; synth.speak(utter);}, "45000");
    setTimeout(()=>{utter.text ="الطريق رقم ثمانية: ثلاثة كيلومتر"; synth.speak(utter);}, "50000");
    setTimeout(()=>{utter.text ="للاختيار قل: الطريق رقم:"; synth.speak(utter);}, "55000");
  });

  // annyang
if (annyang) {
    
    // Add Arabic language model
    annyang.setLanguage('ar');
  
    // Add voice commands
    annyang.addCommands({
      'الطريق رقم واحد': () => {
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[0].innerText);
        heading[0].click();
        utter.text = "لقد قمت باختيار الطريق رقم واحد";
        synth.speak(utter);
      },
      'الطريق رقم اثنين': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[1].innerText);
        heading[1].click();
        utter.text = "لقد قمت باختيار الطريق رقم اثنين";
        synth.speak(utter);
      },
      'الطريق رقم ثلاثه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[2].innerText);
        heading[2].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثلاثة";
        synth.speak(utter);
      },
      'الطريق رقم اربعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[3].innerText);
        heading[3].click();
        utter.text = "لقد قمت باختيار الطريق رقم اربعة";
        synth.speak(utter);
      },
      'الطريق رقم خمسه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[4].innerText);
        heading[4].click();
        utter.text = "لقد قمت باختيار الطريق رقم خمسة";
        synth.speak(utter);
      },
      'الطريق رقم سته': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[5].innerText);
        heading[5].click();
        utter.text = "لقد قمت باختيار الطريق رقم ستة";
        synth.speak(utter);
      },
      'الطريق رقم سبعه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[6].innerText);
        heading[6].click();
        utter.text = "لقد قمت باختيار الطريق رقم سبعة";
        synth.speak(utter);
      },
      'الطريق رقم ثمانيه': ()=>{
        const heading = document.querySelectorAll('.route-heading');
        console.log(heading[7].innerText);
        heading[7].click();
        utter.text = "لقد قمت باختيار الطريق رقم ثمانية";
        synth.speak(utter);
      }
    });
   
    
    // Start listening for commands
    annyang.start();
  } else {
    console.log('annyang not supported');
  }
}

















