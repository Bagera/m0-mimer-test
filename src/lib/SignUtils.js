console.log(`
-----------------------------------
|            VARNING!             |
-----------------------------------
| Denna mjukvara tillhör Mimer AB |
|     All otillåten användning    |
|        beivras enligt lag       |
-----------------------------------
|        (c) MIMER AB 2143        |
-----------------------------------
`);

class SignUtils {
  static random() {
    let signState = [];
    for (var index = 0; index < 12; index++) {
      signState[index] = Math.round(Math.random());
    }
    return signState;
  }
  static problem() {
    return [
      [this.random(), this.random()],
      [this.random(), this.random()],
      [this.random(), this.random()]
    ];
  }
  static compare(sign1, sign2) {
    return sign1.join('') === sign2.join('');
  }
  static composite(sign1, sign2) {
    return sign1.map((value, i) => {
      return Math.abs(value - sign2[i]);
    });
  }
  static checkAnswer(sign1, sign2, answer) {
    const solution = this.composite(sign1, sign2);
    return this.compare(solution, answer);
  }
}

export default SignUtils;
