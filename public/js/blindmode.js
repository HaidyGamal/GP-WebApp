const blindButton = document.querySelector('.blind-btn');
const locInputField = document.querySelector('#myInput');
const destInputField = document.querySelector('#myInput1');
let clicked =1 ;
// window.order = 1;
localStorage.setItem('order', 3);
const radioButtonCost = document.querySelector('#inlineRadio1');
const radioButtonDistance = document.querySelector('#inlineRadio3');
const resultButton = document.querySelector('.result-btn');
const resultHeading = document.querySelector('.route-heading');

blindButton.addEventListener('click', toggle);

function toggle(){
    blindButton.classList.toggle("blind-activated");
}
// speech recognition

// blindButton.classList.contains('blind-activated')
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; //make it true to continuuosly take commands
    recognition.lang = "ar-SA";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    const synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance("");
//     // let openingPhrase = new SpeechSynthesisUtterance("");
    utter.lang = "ar-sa";
    // openingPhrase.lang = "ar-EG";

    // window.onload= recognition.start();
    // window.addEventListener("load" , function(){blindButton.click();});
    blindButton.addEventListener("click", () => {
      if(clicked == 1){
        recognition.start();
      utter.text = " تم تفعيل وضع المكفوفين";
          synth.speak(utter);
          setTimeout(()=>{utter.text = " ماهو موقعك الحالي ؟";  synth.speak(utter);} , "300");
          clicked = 0;
      }else if(clicked == 0){
        recognition.stop();
      utter.text = "تم الغاء وضع المكفوفين";
          synth.speak(utter);
          clicked = 1;
          recognition.stop();
      }
    });
    
   

    // openingPhrase.onend = () => {
    //     recognition.start();
    //   };
    utter.onend = () => {
      recognition.start();
    };

  //   recognition.onresult= (e)=>{
  //       const transcript = e.results[e.results.length - 1][0].transcript.trim();
  //       if(transcript.includes("زهراء المعادي")){
  //         recognition.abort();
  //         setTimeout(()=>{locInputField.focus()}, "4")
  //         // locInputField.focus();
  //         utter.text ="يوجد العديد من الاختيارات المتاحة";
  //         synth.speak(utter);
  //         recognition.continuous = false;
  //         console.log(transcript);
  //         setTimeout(()=>{ locInputField.value =" "},"1");
  //         setTimeout(()=>{destInputField.focus()}, "3")
  //         setTimeout(()=>{ locInputField.value = transcript.replace("لوكيشن", "")},"2");
  //         utter.text = " برجاء اختيار واحد من الاقتراحات التالية"; 
  //         synth.speak(utter);
          
  //         // setTimeout(()=>{utter.text = " برجاء اختيار واحد من الاقتراحات التالية";  synth.speak(utter);} , "10000");
  //         setTimeout(()=>{utter.text = " البساتين";  synth.speak(utter);} , "5000");
  //         setTimeout(()=>{utter.text = " البساتين الشرقية";  synth.speak(utter);} , "10000");
  //         setTimeout(()=>{utter.text = " البساتين العمومي";  synth.speak(utter);} , "15000");
  //         setTimeout(()=>{utter.text = " البساتين الغربية";  synth.speak(utter);} , "20000");
  //         setTimeout(()=>{utter.text = " البساتين دمنهور";  synth.speak(utter);} , "20000");
  //         console.log(transcript);
         
  //         recognition.continuous = true

          
          
  //       }else if (transcript.includes("السرايات الغربيه")) {
                  
  //                     recognition.abort();
                      
  //                     // locInputField.focus();
  //                     utter.text ="يوجد العديد من الاختيارات المتاحة";
              
  //                     synth.speak(utter);
  //                     // recognition.continuous = false;
  //                     console.log(transcript);
  //                   //  setTimeout(()=>{ locInputField.value =" "},"1");
  //                   //  setTimeout(()=>{destInputField.focus()}, "3")
  //                   //  setTimeout(()=>{ locInputField.value = transcript.replace("لوكيشن", "")},"2");
  //                   //  setTimeout(()=>{locInputField.focus()}, "4");
  //                   //  setTimeout(()=>{ locInputField.value = "زهراء المعادي، Maadi as Sarayat Al Gharbeyah, Maadi, Egypt";}, "5");
  //                   // setTimeout(()=>{ locInputField.selectedIndex = 1}, "5");
                   
  //                   //  setTimeout(()=>{destInputField.focus()}, "6")
                      
                      
  //                     recognition.continuous = true;
                  
  //           }
  // }

//     // recognition.onresult = (e) => {
//     //   const transcript = e.results[e.results.length - 1][0].transcript.trim();

//     //      if (transcript.includes("المكفوفين")) {
//     //       recognition.abort();
//     //       blindButton.click();
//     //       utter.text = "تم تفعيل وضع المكفوفين";
//     //       synth.speak(utter);
//     //     //   recognition.continuous = false;
//     //       console.log(transcript);
//     //       recognition.continuous = true;
          
//     //     }else if (transcript.includes("لوكيشن")) {
//     //         if(transcript.includes("المعادي")){
//     //             recognition.abort();
//     //             setTimeout(()=>{locInputField.focus()}, "4")
//     //             // locInputField.focus();
//     //             utter.text ="يوجد العديد من الاختيارات المتاحة";
        
//     //             synth.speak(utter);
//     //             recognition.continuous = false;
//     //             console.log(transcript);
//     //            setTimeout(()=>{ locInputField.value =" "},"1");
//     //            setTimeout(()=>{destInputField.focus()}, "3")
//     //            setTimeout(()=>{ locInputField.value = transcript.replace("لوكيشن", "")},"2");
                
                
                
//     //             recognition.continuous = true;
//     //         }
//     //   }
//     // };








// annyang
if (annyang) {
  // Define the Blind Button
  const blindButton = document.querySelector('.blind-btn');

  
  
  // Add Arabic language model
  annyang.setLanguage('ar');

  // Add voice commands
  annyang.addCommands({
    'تفعيل وضع المكفوفين': () => {
      blindButton.classList.add('blind-activated');
      
      utter.text = " تم تفعيل وضع المكفوفين";
      setTimeout(()=>{utter.text = " ماهو موقعك الحالي ؟";  synth.speak(utter);} , "300");
      synth.speak(utter);
      console.log("on");
      
    },
    'الغاء وضع المكفوفين': () => {
      blindButton.classList.remove('blind-activated');
      utter.text = " تم الغاء وضع المكفوفين";
      synth.speak(utter);
      
    },
    'زهراء المعادي':()=>{
      setTimeout(()=>{locInputField.focus()}, "4")
          // locInputField.focus();
          utter.text ="يوجد العديد من الاختيارات المتاحة";
          synth.speak(utter);
          recognition.continuous = false;
        
          setTimeout(()=>{ locInputField.value ="زهراء المعادي"},"1");
          setTimeout(()=>{destInputField.focus()}, "3")
          // setTimeout(()=>{ locInputField.value = transcript.replace("لوكيشن", "")},"2");
          utter.text = " برجاء اختيار واحد من الاقتراحات التالية"; 
          synth.speak(utter);
          
          // setTimeout(()=>{utter.text = " برجاء اختيار واحد من الاقتراحات التالية";  synth.speak(utter);} , "10000");
          setTimeout(()=>{utter.text = " السرايات الغربية";  synth.speak(utter);} , "5000");
          setTimeout(()=>{utter.text = "باصييت فرانسييس";  synth.speak(utter);} , "10000");
          setTimeout(()=>{utter.text = "طريق السويس";  synth.speak(utter);} , "15000");
          setTimeout(()=>{utter.text = " البساتين الشرقية";  synth.speak(utter);} , "20000");
          setTimeout(()=>{utter.text = "معمار المرشدي";  synth.speak(utter);} , "20000");
    },
    'السرايات الغربيه':()=>{
      setTimeout(()=>{ locInputField.value ="زهراء المعادي، Maadi as Sarayat Al Gharbeyah, Maadi, Egypt"},"1");
      // locInputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      

    // Add keydown event listener to input field
    locInputField.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        console.log('ArrowDown key pressed!');
      }
    });

    // Simulate ArrowDown key press on input field
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event);
    }, "2");





    // Bind key event listener to input field
    locInputField.addEventListener('keydown', (event1) => {
      if (event1.key === 'Enter') {
        console.log('Enter key pressed!');
      }
    });

    // Simulate Enter key press
    const event1 = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event1);
    }, "3");




      utter.text ="انت الان في زهراء المعادي السرايات الغربية.. ماهي وجهتك ؟";
      synth.speak(utter);
      setTimeout(()=>{locInputField.focus()}, "2");
      
      
    },
    'باصييت فرانسييس':()=>{
      setTimeout(()=>{ locInputField.value ="زهراء المعادى، Baseet Fransees, Maadi as Sarayat Al Gharbeyah, Maadi, Egypt"},"1");
      // locInputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      

    // Add keydown event listener to input field
    locInputField.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        console.log('ArrowDown key pressed!');
      }
    });

    // Simulate ArrowDown key press on input field
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event);
    }, "2");





    // Bind key event listener to input field
    locInputField.addEventListener('keydown', (event1) => {
      if (event1.key === 'Enter') {
        console.log('Enter key pressed!');
      }
    });

    // Simulate Enter key press
    const event1 = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event1);
    }, "3");




      utter.text ="انت الان في زهراء المعادي باصييت فرانسيس.. ماهي وجهتك ؟";
      synth.speak(utter);
      setTimeout(()=>{locInputField.focus()}, "2");
      
      
    },
    'طريق السويس':()=>{
      setTimeout(()=>{ locInputField.value ="زهراء المعادي، Cairo - Sweis Road, Maadi as Sarayat Al Gharbeyah, Maadi, Egypt"},"1");
      // locInputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      

    // Add keydown event listener to input field
    locInputField.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        console.log('ArrowDown key pressed!');
      }
    });

    // Simulate ArrowDown key press on input field
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event);
    }, "2");





    // Bind key event listener to input field
    locInputField.addEventListener('keydown', (event1) => {
      if (event1.key === 'Enter') {
        console.log('Enter key pressed!');
      }
    });

    // Simulate Enter key press
    const event1 = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event1);
    }, "3");




      utter.text ="انت الان في زهراء المعادي طريق السويس .. ماهي وجهتك ؟";
      synth.speak(utter);
      setTimeout(()=>{locInputField.focus()}, "2");
      
      
    },
    'البساتين الشرقيه':()=>{
      setTimeout(()=>{ locInputField.value ="زهراء المعادى الشطر 13، El-Basatin Sharkeya, Maadi, Egypt"},"1");
      // locInputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      

    // Add keydown event listener to input field
    locInputField.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        console.log('ArrowDown key pressed!');
      }
    });

    // Simulate ArrowDown key press on input field
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event);
    }, "2");





    // Bind key event listener to input field
    locInputField.addEventListener('keydown', (event1) => {
      if (event1.key === 'Enter') {
        console.log('Enter key pressed!');
      }
    });

    // Simulate Enter key press
    const event1 = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event1);
    }, "3");




      utter.text ="انت الان في زهراء المعادي البساتين الشرقية.. ماهي وجهتك ؟";
      synth.speak(utter);
      setTimeout(()=>{locInputField.focus()}, "2");
      
      
    },
    'معمار المرشدي':()=>{
      setTimeout(()=>{ locInputField.value ="زهراء المعادي - معمار المرشدي - جراند سيتي - برج B4, El-Basatin Sharkeya, El Basatin, Egypt"},"1");
      // locInputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      

    // Add keydown event listener to input field
    locInputField.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        console.log('ArrowDown key pressed!');
      }
    });

    // Simulate ArrowDown key press on input field
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event);
    }, "2");





    // Bind key event listener to input field
    locInputField.addEventListener('keydown', (event1) => {
      if (event1.key === 'Enter') {
        console.log('Enter key pressed!');
      }
    });

    // Simulate Enter key press
    const event1 = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true
    });
    setTimeout(() => {
      locInputField.dispatchEvent(event1);
    }, "3");




      utter.text ="انت الان في زهراء المعادي معمار المرشدي.. ماهي وجهتك ؟";
      synth.speak(utter);
      setTimeout(()=>{locInputField.focus()}, "2");
      
      
    },

    'ميدان الجيزه':()=>{
      setTimeout(()=>{destInputField.focus()}, "4")
          // locInputField.focus();
          utter.text ="يوجد العديد من الاختيارات المتاحة";
          synth.speak(utter);
          recognition.continuous = false;
        
          setTimeout(()=>{ destInputField.value ="ميدان الجيزة"},"1");
          setTimeout(()=>{destInputField.focus()}, "3")
          // setTimeout(()=>{ locInputField.value = transcript.replace("لوكيشن", "")},"2");
          utter.text = " برجاء اختيار واحد من الاقتراحات التالية"; 
          synth.speak(utter);
          
          // setTimeout(()=>{utter.text = " برجاء اختيار واحد من الاقتراحات التالية";  synth.speak(utter);} , "10000");
          setTimeout(()=>{utter.text = " الميدان ";  synth.speak(utter);} , "5000");
          setTimeout(()=>{utter.text = "المحطة الثانية";  synth.speak(utter);} , "10000");
          setTimeout(()=>{utter.text = "الصفا والمروة";  synth.speak(utter);} , "15000");
          setTimeout(()=>{utter.text = "الحويطية";  synth.speak(utter);} , "20000");
    },
    'الميدان':()=>{
      setTimeout(()=>{ destInputField.value ="ميدان الجيزه، ميدان، Oula, Giza District, Egypt"},"1");
      utter.text ="وجهتك هي ميدان الجيزة";
      synth.speak(utter);




      // Add keydown event listener to input field
      destInputField.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          console.log('ArrowDown key pressed!');
        }
      });
  
      // Simulate ArrowDown key press on input field
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event);
      }, "2");
  
  
  
  
  
      // Bind key event listener to input field
      destInputField.addEventListener('keydown', (event1) => {
        if (event1.key === 'Enter') {
          console.log('Enter key pressed!');
        }
      });
  
      // Simulate Enter key press
      const event1 = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event1);
      }, "3");
  
  


      setTimeout(()=>{utter.text = " يمكنك ترتيب الطرق المقترحة بحسب المسافة او السعر او الوقت";  synth.speak(utter);} , "5000");
      setTimeout(()=>{utter.text = "ما هو تفضيلك لترتيب الطرق المقترحة؟";  synth.speak(utter);} , "12000");
    },
    'المحطة الثانيه':()=>{
      setTimeout(()=>{ destInputField.value ="ميدان الجيزه، Al Mahatah, Thaneyah, Giza District, Egypt"},"1");
      utter.text ="وجهتك هي ميدان الجيزة المحطة الثانية";
      synth.speak(utter);




      // Add keydown event listener to input field
      destInputField.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          console.log('ArrowDown key pressed!');
        }
      });
  
      // Simulate ArrowDown key press on input field
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event);
      }, "2");
  
  
  
  
  
      // Bind key event listener to input field
      destInputField.addEventListener('keydown', (event1) => {
        if (event1.key === 'Enter') {
          console.log('Enter key pressed!');
        }
      });
  
      // Simulate Enter key press
      const event1 = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event1);
      }, "3");
  
  


      setTimeout(()=>{utter.text = " يمكنك ترتيب الطرق المقترحة بحسب المسافة او السعر او الوقت";  synth.speak(utter);} , "5000");
      setTimeout(()=>{utter.text = "ما هو تفضيلك لترتيب الطرق المقترحة؟";  synth.speak(utter);} , "12000");
    },
    'الصفا والمروه':()=>{
      setTimeout(()=>{ destInputField.value ="ميدان الجيزة، الصفا و المروه، _، Al Haram, Egypt"},"1");
      utter.text ="وجهتك هي ميدان الجيزةالفا والمروة";
      synth.speak(utter);




      // Add keydown event listener to input field
      destInputField.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          console.log('ArrowDown key pressed!');
        }
      });
  
      // Simulate ArrowDown key press on input field
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event);
      }, "2");
  
  
  
  
  
      // Bind key event listener to input field
      destInputField.addEventListener('keydown', (event1) => {
        if (event1.key === 'Enter') {
          console.log('Enter key pressed!');
        }
      });
  
      // Simulate Enter key press
      const event1 = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event1);
      }, "3");
  
  


      setTimeout(()=>{utter.text = " يمكنك ترتيب الطرق المقترحة بحسب المسافة او السعر او الوقت";  synth.speak(utter);} , "5000");
      setTimeout(()=>{utter.text = "ما هو تفضيلك لترتيب الطرق المقترحة؟";  synth.speak(utter);} , "12000");
    },
    'الحويطيه':()=>{
      setTimeout(()=>{ destInputField.value ="ميدان، Al Huwaiteyah, Agouza, الجيزة، Egypt"},"1");
      utter.text ="وجهتك هي ميدان الجيزة الحويطية";
      synth.speak(utter);




      // Add keydown event listener to input field
      destInputField.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          console.log('ArrowDown key pressed!');
        }
      });
  
      // Simulate ArrowDown key press on input field
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event);
      }, "2");
  
  
  
  
  
      // Bind key event listener to input field
      destInputField.addEventListener('keydown', (event1) => {
        if (event1.key === 'Enter') {
          console.log('Enter key pressed!');
        }
      });
  
      // Simulate Enter key press
      const event1 = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      setTimeout(() => {
        destInputField.dispatchEvent(event1);
      }, "3");
  
  


      setTimeout(()=>{utter.text = " يمكنك ترتيب الطرق المقترحة بحسب المسافة او السعر او الوقت";  synth.speak(utter);} , "5000");
      setTimeout(()=>{utter.text = "ما هو تفضيلك لترتيب الطرق المقترحة؟";  synth.speak(utter);} , "12000");
    },
    'السعر':()=>{
      radioButtonCost.click();
      utter.text ="اذا كنت ترغب في عرض الطريق مرتبا بحسب السعر قل: نعم";
      synth.speak(utter);
      //  window.order =1;
      localStorage.setItem('order', 1);
    },
    'المسافه':()=>{
      radioButtonDistance.click();
      utter.text ="اذا كنت ترغب في عرض الطريق مرتبا بحسب المسافة قل: نعم";
      synth.speak(utter);
      //  window.order = 0;
      localStorage.setItem('order', 0);
    },
    'نعم':()=>{
      resultButton.click();
      if(localStorage.getItem('order') == 1){
        utter.text ="طريقك مرتب بحسب السعر";
        synth.speak(utter);
        
        

      }else if(localStorage.getItem('order') == 0){
        utter.text ="طريقك مرتب بحسب المسافة";
        synth.speak(utter);
      }
    }
  });

  // Start listening for commands
  annyang.start();
} else {
  console.log('annyang not supported');
}