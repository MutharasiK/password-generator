// Elements
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const passwordEl = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const strengthText = document.getElementById('strength-text');

// Characters
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// Update length text when slider moves
lengthSlider.addEventListener('input', () => {
  lengthValue.innerText = lengthSlider.value;
});

// Generate password
generateBtn.addEventListener('click', () => {
  let chars = "";
  if (uppercase.checked) chars += upperChars;
  if (lowercase.checked) chars += lowerChars;
  if (numbers.checked) chars += numberChars;
  if (symbols.checked) chars += symbolChars;

  let password = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordEl.innerText = password;
  checkStrength(password);
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordEl.innerText).then(() => {
    copyBtn.innerText = "✅ Copied!";
    setTimeout(() => copyBtn.innerText = "📋 Copy", 1500);
  });
});

// Check strength
function checkStrength(password) {
  let strength = "Weak 😟";
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const typesCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

  if (password.length >= 12 && typesCount >= 3) strength = "Strong 🔥";
  else if (password.length >= 8 && typesCount >= 2) strength = "Medium 🙂";

  strengthText.innerText = strength;
}
