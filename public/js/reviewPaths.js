const likeButton = document.querySelector(".fa-thumbs-up");
const dislikeButton = document.querySelector(".fa-thumbs-down");
const iconDislikesSpan = document.querySelector(".dislike-count");
const iconLikesSpan = document.querySelector(".like-count");
const options = document.querySelectorAll('input[name="options"]');
const submitReviewButton = document.querySelector(".submit-review");
const closeButton = document.querySelector(".close-btn");

let likesCount = 0;
let dislikesCount = 0;

// Retrieve the stored values from localStorage
if (localStorage.getItem('likesCount')) {
  likesCount = parseInt(localStorage.getItem('likesCount'));
  iconLikesSpan.innerHTML = likesCount;
}

if (localStorage.getItem('dislikesCount')) {
  dislikesCount = parseInt(localStorage.getItem('dislikesCount'));
  iconDislikesSpan.innerHTML = dislikesCount;
}

options.forEach(function(option) {
  option.addEventListener('change', function() {
    const additionalOptionsContainer = document.getElementById(`additionalOptions-${option.id}`);
    
    if (option.checked) {
      additionalOptionsContainer.innerHTML = '';
      
      // Create additional radio buttons
      const radio1 = createRadioButton(`additional-${option.id}`, `radio1-${option.id}`, 'الطريق غير موجود');
      const radio2 = createRadioButton(`additional-${option.id}`, `radio2-${option.id}`, 'الطريق سئ');
      // const radio3 = createRadioButton(`additional-${option.id}`, `radio3-${option.id}`, 'Additional 3');
      
      // Append additional radio buttons to the container
      additionalOptionsContainer.appendChild(radio1);
      additionalOptionsContainer.appendChild(radio2);
      // additionalOptionsContainer.appendChild(radio3);
    } else {
      additionalOptionsContainer.innerHTML = '';
    }
  });
  
  // Get the associated label elements
  const labels = document.querySelectorAll(`label[for="${option.id}"]`);
  
  // Add event listeners to the labels for toggling the checkbox
  labels.forEach(function(label) {
    label.addEventListener('click', function() {
      if (option.disabled) {
        return; // Ignore the click event if the checkbox is disabled
      }
      
      option.checked = !option.checked;
      
      const changeEvent = new Event('change');
      option.dispatchEvent(changeEvent);
    });
  });
});

function createRadioButton(name, id, label) {
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = name;
  radio.id = id;

  const radioLabel = document.createElement('label');
  radioLabel.htmlFor = id;
  radioLabel.textContent = label;

  const radioButtonDiv = document.createElement('div');
  radioButtonDiv.appendChild(radio);
  radioButtonDiv.appendChild(radioLabel);

  return radioButtonDiv;
}

likeButton.addEventListener("click", function() {
  if (likesCount === 0) {
    likesCount = 1; // Increase the likes count to 1
    dislikesCount = 0; // Decrease the dislikes count to 0
  } else {
    likesCount = 0; // Decrease the likes count to 0
  }
  
  iconLikesSpan.innerHTML = likesCount; // Update the likes display
  iconDislikesSpan.innerHTML = dislikesCount; // Update the dislikes display
  
  // Store the updated values in localStorage
  localStorage.setItem('likesCount', likesCount);
  localStorage.setItem('dislikesCount', dislikesCount);
});

dislikeButton.addEventListener("click", function() {
  if (dislikesCount === 0) {
    dislikesCount = 1; // Increase the dislikes count to 1
    likesCount = 0; // Decrease the likes count to 0
  } else {
    dislikesCount = 0; // Decrease the dislikes count to 0
  }
  
  iconDislikesSpan.innerHTML = dislikesCount; // Update the dislikes display
  iconLikesSpan.innerHTML = likesCount; // Update the likes display
  
  // Store the updated values in localStorage
  localStorage.setItem('likesCount', likesCount);
  localStorage.setItem('dislikesCount', dislikesCount);
});

submitReviewButton.addEventListener("click", function() {
  let checkboxSelected = false;
  let subOptionSelected = false;
  
  options.forEach(function(option) {
  if (option.checked) {
    checkboxSelected = true;
    const additionalOptionsContainer = document.getElementById(`additionalOptions-${option.id}`);
    const subOptions = additionalOptionsContainer.querySelectorAll('input[type="radio"]');
    
    subOptions.forEach(function(subOption) {
      if (subOption.checked) {
        subOptionSelected = true;
        return;
      }
    });
  }
  });
  
  if (!checkboxSelected || !subOptionSelected) {
  const labels = document.querySelectorAll('label');
  labels.forEach(function(label) {    label.style.color = "rgb(190, 3, 3)";
});
} else {
  const labels = document.querySelectorAll('label');
  labels.forEach(function(label) {
    label.style.color = "";
  });
  submitReviewButton.setAttribute("data-dismiss", "modal");
  //   submitReviewButton.click();
}

// Store the updated values in localStorage
localStorage.setItem('likesCount', likesCount);
localStorage.setItem('dislikesCount', dislikesCount);
});

closeButton.addEventListener("click", function() {
if (dislikesCount === 1) {
  dislikesCount = 0; // Set the dislikes counter to 0
  iconDislikesSpan.innerHTML = dislikesCount; // Update the dislikes display
}
// Store the updated values in localStorage
localStorage.setItem('dislikesCount', dislikesCount);
});

// Store the initial values in localStorage
localStorage.setItem('likesCount', likesCount);
localStorage.setItem('dislikesCount', dislikesCount);