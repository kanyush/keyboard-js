const codeNumList = document.querySelectorAll(".code__num")
const codeInput = document.querySelector(".code__input")
const keyboardTag = document.querySelector(".keyboard")
const continueBtn = document.querySelector('.keyboard__submit')
const messageTag = document.querySelector('.message')
const keyboardBtnList = document.querySelectorAll('.keyboard__btn')

codeInput.onfocus = () => {
  keyboardTag.classList.add("keyboard--show")
  keyboardTag.style.visibility = 'visible';
}

const changeCode = () => {
  codeNumList.forEach((numTag, i) => {
    if(codeInput.value[i]) {
      numTag.textContent = codeInput.value[i]
      numTag.classList.add("filled")
    } else {
      numTag.textContent = ""
      numTag.classList.remove("filled")
    }
  })
  continueBtn.disabled = codeInput.value.length < 4
}

codeInput.oninput = changeCode

const hideKeyboard = () => {
  keyboardTag.style.visibility = 'hidden';
}

keyboardBtnList.forEach((keyboardBtn) => {
  keyboardBtn.onclick = () => {
    if(keyboardBtn.textContent === "#") {
      codeInput.value = codeInput.value.slice(0, -1)
    } else {
      codeInput.value += keyboardBtn.textContent
    }
    changeCode()
  }
})

continueBtn.onclick = () => {
  keyboardTag.classList.remove("keyboard--show")
  keyboardTag.addEventListener('transitionend', hideKeyboard)
  messageTag.classList.add('message--show')
  if(codeInput.value !== '7645') {
    messageTag.classList.add('message--error')
    messageTag.textContent = "Введен неверный код"
  } else {
    messageTag.textContent = "Введен верный код"
  }
  setTimeout(() => {
    messageTag.classList.remove('message--show')
    messageTag.classList.remove('message--error')
    keyboardTag.removeEventListener('transitionend', hideKeyboard)
    codeInput.value = ""
    changeCode()
    codeInput.focus();
  }, 3000)
}