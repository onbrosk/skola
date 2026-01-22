const buttons = document.querySelectorAll(".button");
const equationDisplay = document.querySelector(".equation");
const preresultDisplay = document.querySelector(".preresult");

const operators = ["+", "-", "*", "/", '%'];
for (const button of buttons) {
  button.addEventListener("click", () => {
    if (equationDisplay.textContent === "Error") { //ak je na displeji error tak pri stlaceni akehokolvek tlacidla vycisti displej
      equationDisplay.textContent = "";
    }
    
    if (button.textContent === "C") { //ked stlacene c tak vycisti displej
      equationDisplay.textContent = "";
      preresultDisplay.textContent = "";
      return;
    } else if (button.textContent === "=") { //ked stlacene = vypocitaj vysledok && ked chyba vypis 'error'
      preresultDisplay.textContent = "";
      try {
        const result = eval(equationDisplay.textContent);
        equationDisplay.textContent = result;
      } catch {
        equationDisplay.textContent = "Error";
      }
      return;
    }else if (button.classList.contains("operator")) { //zisti ci je stlaceny operator
      addOperator(equationDisplay.textContent, button);
      return;
    }else if (button.textContent === "←") { //odstrani posledny znak
      equationDisplay.textContent = equationDisplay.textContent.slice(0, -1);
      precalculate(equationDisplay.textContent);
      return;
    }else if (button.textContent === ".") { //limit na jednu desatinnu ciarku v cisle
      limitDots(equationDisplay.textContent);
      return
    }

    if (equationDisplay.textContent === "0") { //ak je na displeji 0 tak ho nahradi stlacenym cislom
      equationDisplay.textContent = "";
    }
    equationDisplay.textContent += button.textContent;
    limitMaxLength(equationDisplay.textContent, 17); //limit na 10 znakov
    precalculate(equationDisplay.textContent);
  });
}

const addOperator = (equation, button) => {
  if (!button.classList.contains("operator")) return; //ak nie je operator tak nic nerob
  if (equation === "" && button !== "-") { //prvy znak moze byt len minus
    return;
  }
  const lastChar = equation[equation.length - 1]; 
  //ak je posledny znak operator a stlaceny je operator tak odstran posledny operator, neskor v kode sa vymeni za stlaceny
  if (operators.includes(lastChar) && operators.includes(button.textContent)) { 
    equationDisplay.textContent = equationDisplay.textContent.slice(0, -1);
  }
  equationDisplay.textContent += button.textContent; //pridaj operator na displej
};

const precalculate = (equation) => {
  try {  //skus vypopcitat, ukaze ako predcasny vysledok
        const result = eval(equation);
        preresultDisplay.textContent = result;
      } catch {
        preresultDisplay.textContent = "";
      }
    };

limitMaxLength = (text, maxLength) => {
  if (text.length > maxLength) {
    equationDisplay.textContent = text.slice(0, maxLength);
  }
}

limitDots = (equation) => {
  const index = getLastOperatorIndex(equation);
  number = equation.slice(index + 1, equation.length); // zisti posledne cislo v priklade
  if (number.includes(".")) return; // zisti ci uz cislo obsahuje desatinnu ciarku ak ano tak vrati
  if (number === "") { // ak je cislo prazdne pridaj 0 pred desatinnu ciarku
    equationDisplay.textContent += "0";
  }
  equationDisplay.textContent += ".";
}

const getLastOperatorIndex = (equation) => { // zisti index posledneho operatora v priklde
  for (let i = equation.length - 1; i >= 0; i--) {
    if (operators.includes(equation[i])) {
      return i;
    }
  }
  return -1; // nenajdeny operator
}