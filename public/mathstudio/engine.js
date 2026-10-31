(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MathStudio = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      var t = a % b;
      a = b;
      b = t;
    }
    return a || 1;
  }

  function gcdList(vals) {
    var g = 0;
    vals.forEach(function (v) {
      if (v) g = g ? gcd(g, v) : Math.abs(v);
    });
    return g || 1;
  }

  function trim(c) {
    var a = c.slice();
    while (a.length > 1 && a[a.length - 1] === 0) a.pop();
    if (!a.length) a.push(0);
    return a;
  }

  function degree(c) {
    return trim(c).length - 1;
  }

  function isZero(c) {
    return trim(c).length === 1 && trim(c)[0] === 0;
  }

  function sup(n) {
    var map = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
    return String(n).split("").map(function (d) { return map[d] || d; }).join("");
  }

  function formatPoly(coeffs) {
    var c = trim(coeffs);
    if (isZero(c)) return "0";
    var parts = [];
    for (var d = c.length - 1; d >= 0; d--) {
      var v = c[d];
      if (!v) continue;
      var av = Math.abs(v);
      var body;
      if (d === 0) body = String(av);
      else if (d === 1) body = av === 1 ? "x" : av + "x";
      else body = (av === 1 ? "x" : av + "x") + sup(d);
      if (!parts.length) parts.push(v < 0 ? "−" + body : body);
      else parts.push((v < 0 ? " − " : " + ") + body);
    }
    return parts.join("");
  }

  function formatFactor(coeffs) {
    var c = trim(coeffs);
    if (degree(c) === 0) return String(c[0]);
    if (degree(c) === 1 && c[1] === 1 && c[0] >= 0) return c[0] === 0 ? "x" : "(x + " + c[0] + ")";
    if (degree(c) === 1 && c[1] === 1 && c[0] < 0) return "(x − " + Math.abs(c[0]) + ")";
    if (degree(c) === 1 && c[0] === 0) return c[1] === 1 ? "x" : "(" + c[1] + "x)";
    var inner = formatPoly(c);
    if (degree(c) <= 1 && c[degree(c)] > 0 && !(degree(c) === 1 && c[1] === 1)) {
      return "(" + inner + ")";
    }
    return "(" + inner + ")";
  }

  function divisors(n) {
    n = Math.abs(n);
    if (n === 0) return [0];
    var out = [];
    for (var i = 1; i <= n; i++) {
      if (n % i === 0) {
        out.push(i);
        out.push(-i);
      }
    }
    return out;
  }

  function positiveDivisors(n) {
    n = Math.abs(n);
    var out = [];
    for (var i = 1; i <= n; i++) if (n % i === 0) out.push(i);
    return out;
  }

  function parsePoly(input) {
    if (input == null) throw new Error("Escribe un polinomio.");
    var s = String(input).trim();
    if (!s) throw new Error("Escribe un polinomio.");
    s = s.replace(/[−–—]/g, "-").replace(/[·×]/g, "*").replace(/\s+/g, "");
    s = s.replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4").replace(/⁵/g, "^5");
    s = s.replace(/\*\*/g, "^");
    if (!/^[0-9xX+\-^]+$/.test(s)) {
      throw new Error("Usa una sola variable x, coeficientes enteros y potencias hasta 5. Ejemplo: 2x^2+7x+3.");
    }
    s = s.replace(/X/g, "x");
    if (s[0] !== "+" && s[0] !== "-") s = "+" + s;
    var terms = s.match(/[+-][^+-]+/g);
    if (!terms) throw new Error("No pude leer ese polinomio.");
    var map = {};
    terms.forEach(function (term) {
      var sign = term[0] === "-" ? -1 : 1;
      var body = term.slice(1);
      if (!body) throw new Error("Hay un signo suelto.");
      var coef = sign;
      var deg = 0;
      if (body.indexOf("x") === -1) {
        if (!/^\d+$/.test(body)) throw new Error("Coeficiente no válido.");
        coef = sign * Number(body);
      } else {
        var bits = body.split("x");
        if (bits.length !== 2) throw new Error("Revisa cómo escribiste x.");
        if (bits[0] === "") coef = sign;
        else {
          if (!/^\d+$/.test(bits[0])) throw new Error("Coeficiente no válido.");
          coef = sign * Number(bits[0]);
        }
        if (bits[1] === "") deg = 1;
        else if (bits[1].charAt(0) === "^") {
          if (!/^\d+$/.test(bits[1].slice(1))) throw new Error("La potencia debe ser un entero.");
          deg = Number(bits[1].slice(1));
        } else throw new Error("Escribe la potencia como x^2 o x².");
      }
      if (deg > 5) throw new Error("En este tutor la potencia máxima es 5.");
      map[deg] = (map[deg] || 0) + coef;
    });
    var max = 0;
    Object.keys(map).forEach(function (k) { max = Math.max(max, Number(k)); });
    var coeffs = [];
    for (var i = 0; i <= max; i++) coeffs.push(map[i] || 0);
    if (isZero(coeffs)) throw new Error("Ese polinomio es cero.");
    return trim(coeffs);
  }

  function divLinear(coeffs, qLead, rootNum) {
    var work = coeffs.slice();
    var quot = new Array(Math.max(work.length - 1, 1)).fill(0);
    for (var d = work.length - 1; d >= 1; d--) {
      if (work[d] % qLead !== 0) return null;
      var coef = work[d] / qLead;
      if (!Number.isInteger(coef)) return null;
      quot[d - 1] = coef;
      work[d] -= coef * qLead;
      work[d - 1] += coef * rootNum;
    }
    if (work[0] !== 0) return null;
    for (var i = 1; i < work.length; i++) if (work[i] !== 0) return null;
    return trim(quot);
  }

  function pairSumProduct(sum, product) {
    if (!Number.isInteger(sum) || !Number.isInteger(product)) return null;
    if (product === 0) {
      if (sum === 0) return [0, 0];
      return [0, sum];
    }
    var divs = divisors(product);
    for (var i = 0; i < divs.length; i++) {
      var m = divs[i];
      if (product % m !== 0) continue;
      var n = product / m;
      if (m + n === sum) return m <= n ? [m, n] : [n, m];
    }
    return null;
  }

  function linearText(lead, cons) {
    var fake = trim([cons, lead]);
    if (degree(fake) === 0) return String(fake[0]);
    return formatPoly(fake);
  }

  function explainQuadratic(a, b, c) {
    var pasos = [];
    var disc = b * b - 4 * a * c;
    if (disc === 0 && a > 0) {
      var ra = Math.round(Math.sqrt(a));
      var rc = Math.round(Math.sqrt(Math.abs(c)));
      if (ra * ra === a && rc * rc === Math.abs(c)) {
        var signo = b >= 0 ? 1 : -1;
        if (2 * ra * signo * rc === b || (c === 0 && b === 0)) {
          var dentro = linearText(ra, signo * (c === 0 ? 0 : rc));
          pasos.push({
            titulo: "Trinomio cuadrado perfecto",
            texto: "El discriminante es 0 y los coeficientes son cuadrados. " + formatPoly([c, b, a]) + " = (" + dentro + ")²."
          });
          return { pasos: pasos, factores: [trim([signo * rc, ra]), trim([signo * rc, ra])], caso: "Trinomio cuadrado perfecto" };
        }
      }
    }

    if (Math.abs(a) === 1) {
      var aa = a < 0 ? [-c, -b, -a] : [c, b, a];
      var par = pairSumProduct(aa[1], aa[2] === 1 ? aa[0] : aa[0]);
      par = pairSumProduct(aa[1], aa[0]);
      if (!par) return null;
      pasos.push({
        titulo: "Trinomio x² + bx + c",
        texto: "Busca dos enteros que sumen " + aa[1] + " y multipliquen " + aa[0] + ". Esos números son " + par[0] + " y " + par[1] + "."
      });
      var f1 = trim([par[0], 1]);
      var f2 = trim([par[1], 1]);
      if (a < 0) {
        pasos.push({
          titulo: "Signo del coeficiente principal",
          texto: "El coeficiente de x² es negativo. Se factoriza −1 y el trinomio que queda es " + formatPoly(aa) + " = (" + formatPoly(f1) + ")(" + formatPoly(f2) + ")."
        });
        return { pasos: pasos, factores: [trim([-1]), f1, f2], caso: "Trinomio x² + bx + c" };
      }
      pasos.push({
        titulo: "Escritura en factores",
        texto: formatPoly([c, b, a]) + " = (" + formatPoly(f1) + ")(" + formatPoly(f2) + ")."
      });
      return { pasos: pasos, factores: [f1, f2], caso: "Trinomio x² + bx + c" };
    }

    var parA = pairSumProduct(b, a * c);
    if (!parA) return null;
    var m = parA[0];
    var n = parA[1];
    pasos.push({
      titulo: "Truco de multiplicar y dividir por a",
      texto: "a = " + a + ". Se multiplica y se divide por a: " + formatPoly([c, b, a]) + " = (1/" + a + ")[(" + a + "x)² + " + b + "(" + a + "x) + " + (a * c) + "]."
    });
    pasos.push({
      titulo: "Cambio de variable",
      texto: "Sea y = " + a + "x. Entonces y² + " + b + "y + " + (a * c) + ". Dos enteros que suman " + b + " y multiplican " + (a * c) + " son " + m + " y " + n + ". Queda (y + " + (m < 0 ? "(" + m + ")" : m) + ")(y + " + (n < 0 ? "(" + n + ")" : n) + ")."
    });
    var limpio = null;
    var divsA = positiveDivisors(Math.abs(a));
    for (var i = 0; i < divsA.length && !limpio; i++) {
      var a1 = a < 0 ? -divsA[i] : divsA[i];
      if (a % a1 !== 0) continue;
      var a2 = a / a1;
      if (a2 === 0) continue;
      if (m % a1 === 0 && n % a2 === 0) {
        limpio = { leadL: a2, consL: m / a1, leadR: a1, consR: n / a2 };
      }
    }
    if (!limpio) {
      for (var j = 0; j < divsA.length && !limpio; j++) {
        var a1b = a < 0 ? -divsA[j] : divsA[j];
        var a2b = a / a1b;
        if (n % a1b === 0 && m % a2b === 0) {
          limpio = { leadL: a2b, consL: n / a1b, leadR: a1b, consR: m / a2b };
        }
      }
    }
    if (!limpio) return null;
    var left = trim([limpio.consL, limpio.leadL]);
    var right = trim([limpio.consR, limpio.leadR]);
    if (left[left.length - 1] < 0 && right[right.length - 1] < 0) {
      left = left.map(function (v) { return -v; });
      right = right.map(function (v) { return -v; });
    }
    pasos.push({
      titulo: "Se reparte el divisor a",
      texto: "(1/" + a + ")(" + a + "x + " + (m < 0 ? "(" + m + ")" : m) + ")(" + a + "x + " + (n < 0 ? "(" + n + ")" : n) + ") = (" + formatPoly(left) + ")(" + formatPoly(right) + "). Comprueba el producto si quieres: debe devolver el trinomio original."
    });
    return { pasos: pasos, factores: [left, right], caso: "Trinomio ax² + bx + c" };
  }

  function isSquareInt(n) {
    if (n < 0) return null;
    var r = Math.round(Math.sqrt(n));
    return r * r === n ? r : null;
  }

  function isCubeInt(n) {
    var sign = n < 0 ? -1 : 1;
    var r = Math.round(Math.pow(Math.abs(n), 1 / 3));
    if (r * r * r === Math.abs(n)) return sign * r;
    return null;
  }

  function polyMul(a, b) {
    var out = new Array(a.length + b.length - 1).fill(0);
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) out[i + j] += a[i] * b[j];
    }
    return trim(out);
  }

  function polySub(a, b) {
    var n = Math.max(a.length, b.length);
    var out = new Array(n).fill(0);
    for (var i = 0; i < n; i++) out[i] = (a[i] || 0) - (b[i] || 0);
    return trim(out);
  }

  function samePoly(a, b) {
    var x = trim(a);
    var y = trim(b);
    if (x.length !== y.length) return false;
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }

  function binomialSquareOrCube(coeffs) {
    var c = trim(coeffs);
    var nz = [];
    c.forEach(function (v, i) { if (v) nz.push(i); });
    if (nz.length !== 2) return null;
    var d0 = nz[0];
    var d1 = nz[1];
    var low = c[d0];
    var high = c[d1];
    if (d0 !== 0 && (d1 - d0) % 2 === 0 && (d1 - d0) % 3 === 0) {
      /* se trata abajo con monomios; aquí solo términos alineados desde constante o potencia común ya extraída */
    }
    if (d0 !== 0) return null;
    var gap = d1;
    var sh = isSquareInt(Math.abs(high));
    var sl = isSquareInt(Math.abs(low));
    if (gap % 2 === 0 && sh && sl && high > 0 && low < 0) {
      var half = gap / 2;
      var A = new Array(half + 1).fill(0);
      A[half] = sh;
      var B = [sl];
      var f1 = [];
      var f2 = [];
      if (half === 0) {
        f1 = [sh - sl];
        f2 = [sh + sl];
      } else if (half === 1) {
        f1 = [-sl, sh];
        f2 = [sl, sh];
      } else {
        var pos = new Array(half + 1).fill(0);
        var neg = new Array(half + 1).fill(0);
        pos[half] = sh;
        pos[0] = sl;
        neg[half] = sh;
        neg[0] = -sl;
        return {
          caso: "Diferencia de cuadrados",
          pasos: [{
            titulo: "Diferencia de cuadrados",
            texto: formatPoly(c) + " tiene dos términos, ambos cuadrados y con signos opuestos. Se escribe como (" + formatPoly(pos) + ")(" + formatPoly(neg) + ")."
          }],
          factores: [trim(neg), trim(pos)]
        };
      }
      return {
        caso: "Diferencia de cuadrados",
        pasos: [{
          titulo: "Diferencia de cuadrados",
          texto: "Los dos términos son cuadrados y están restados: " + formatPoly(c) + " = (" + formatPoly(f1) + ")(" + formatPoly(f2) + ")."
        }],
        factores: [trim(f1), trim(f2)]
      };
    }
    var ch = isCubeInt(high);
    var cl = isCubeInt(Math.abs(low));
    if (gap % 3 === 0 && ch && cl && high > 0) {
      var third = gap / 3;
      if (third === 1 && low < 0) {
        var Acoef = ch;
        var Bcoef = cl;
        var lin = [-Bcoef, Acoef];
        var cuad = [Bcoef * Bcoef, Acoef * Bcoef, Acoef * Acoef];
        return {
          caso: "Diferencia de cubos",
          pasos: [{
            titulo: "Diferencia de cubos",
            texto: "a³ − b³ = (a − b)(a² + ab + b²). Aquí a = " + linearText(Acoef, 0) + " y b = " + Bcoef + ". " + formatPoly(c) + " = (" + formatPoly(lin) + ")(" + formatPoly(cuad) + ")."
          }],
          factores: [trim(lin), trim(cuad)]
        };
      }
      if (third === 1 && low > 0) {
        var Ac = ch;
        var Bc = cl;
        var linS = [Bc, Ac];
        var cuadS = [Bc * Bc, -Ac * Bc, Ac * Ac];
        return {
          caso: "Suma de cubos",
          pasos: [{
            titulo: "Suma de cubos",
            texto: "a³ + b³ = (a + b)(a² − ab + b²). Aquí a = " + linearText(Ac, 0) + " y b = " + Bc + ". " + formatPoly(c) + " = (" + formatPoly(linS) + ")(" + formatPoly(cuadS) + ")."
          }],
          factores: [trim(linS), trim(cuadS)]
        };
      }
    }
    return null;
  }

  function tryGroup(coeffs) {
    var c = trim(coeffs);
    if (c.length !== 4) return null;
    if (c.some(function (v) { return v === 0; })) return null;
    var d = c[0];
    var c1 = c[1];
    var b = c[2];
    var a = c[3];
    if (a * d === b * c1 && c1 !== 0) {
      var g = gcd(Math.abs(c1), Math.abs(d));
      var bx = c1 / g;
      var bc = d / g;
      if (bx !== 0 && a % bx === 0) {
        var k = a / bx;
        if (k * bc === b) {
          var comun = trim([bc, bx]);
          var otro = trim([g, 0, k]);
          if (comun[comun.length - 1] < 0) {
            comun = comun.map(function (v) { return -v; });
            otro = otro.map(function (v) { return -v; });
          }
          return {
            caso: "Factorización por agrupación",
            pasos: [{
              titulo: "Agrupación",
              texto: "Se agrupan los dos primeros términos y los dos últimos: " + formatPoly([0, 0, b, a]) + " y " + formatPoly([d, c1]) + ". El binomio común es (" + formatPoly(comun) + "). Queda (" + formatPoly(otro) + ")(" + formatPoly(comun) + ")."
            }],
            factores: [otro, comun]
          };
        }
      }
    }
    return null;
  }

  function factorRecursive(coeffs, pasos, casos) {
    var c = trim(coeffs);
    if (degree(c) <= 0) {
      if (c[0] !== 1 && c[0] !== -1) {
        /* la constante ya se muestra en el resultado si no es 1 */
      }
      return c[0] === 1 ? [] : [c];
    }
    if (c[c.length - 1] < 0) {
      var flipped = c.map(function (v) { return -v; });
      casos.push("Signo principal");
      pasos.push({
        titulo: "Se extrae el signo menos",
        texto: formatPoly(c) + " = −(" + formatPoly(flipped) + ")."
      });
      return [trim([-1])].concat(factorRecursive(flipped, pasos, casos));
    }

    var g = gcdList(c);
    var lead = c[c.length - 1];
    if (lead < 0) g = -g;
    if (Math.abs(g) !== 1) {
      var restG = c.map(function (v) { return v / g; });
      casos.push("Factor común");
      pasos.push({
        titulo: "Factor común numérico",
        texto: "El máximo común divisor de los coeficientes es " + Math.abs(g) + ". " + formatPoly(c) + " = " + g + "(" + formatPoly(restG) + ")."
      });
      return [trim([g])].concat(factorRecursive(restG, pasos, casos));
    }

    var k = 0;
    while (c[k] === 0) k++;
    if (k > 0) {
      var restX = c.slice(k);
      casos.push("Factor común");
      pasos.push({
        titulo: "Factor común x",
        texto: "x" + (k > 1 ? sup(k) : "") + " aparece en todos los términos. " + formatPoly(c) + " = x" + (k > 1 ? sup(k) : "") + "(" + formatPoly(restX) + ")."
      });
      var xpow = new Array(k + 1).fill(0);
      xpow[k] = 1;
      return [xpow].concat(factorRecursive(restX, pasos, casos));
    }

    if (degree(c) === 1) return [c];

    var special = binomialSquareOrCube(c);
    if (special) {
      casos.push(special.caso);
      special.pasos.forEach(function (p) { pasos.push(p); });
      var acc = [];
      special.factores.forEach(function (f) {
        acc = acc.concat(factorRecursive(f, pasos, casos));
      });
      return acc;
    }

    if (degree(c) === 2) {
      var quad = explainQuadratic(c[2], c[1], c[0]);
      if (!quad) {
        pasos.push({
          titulo: "No factoriza con enteros",
          texto: formatPoly(c) + " es de grado 2 y no hay enteros que lo escriban como producto de binomios con coeficientes enteros."
        });
        casos.push("No factoriza con enteros");
        return [c];
      }
      casos.push(quad.caso);
      quad.pasos.forEach(function (p) { pasos.push(p); });
      var built = trim([1]);
      quad.factores.forEach(function (f) { built = polyMul(built, f); });
      if (!samePoly(built, c) && !samePoly(built, c.map(function (v) { return v; }))) {
        /* si el truco falló la comprobación, no lo uses */
      }
      if (!samePoly(polyMulAll(quad.factores), c)) return [c];
      var outQ = [];
      quad.factores.forEach(function (f) {
        if (degree(f) > 1) outQ = outQ.concat(factorRecursive(f, pasos, casos));
        else outQ.push(f);
      });
      return outQ;
    }

    var grouped = tryGroup(c);
    if (grouped) {
      casos.push(grouped.caso);
      grouped.pasos.forEach(function (p) { pasos.push(p); });
      if (samePoly(polyMulAll(grouped.factores), c)) {
        var outG = [];
        grouped.factores.forEach(function (f) {
          outG = outG.concat(factorRecursive(f, pasos, casos));
        });
        return outG;
      }
    }

    var leadC = c[c.length - 1];
    var independientes = positiveDivisors(Math.abs(c[0] || leadC));
    var principales = positiveDivisors(Math.abs(leadC));
    var candidatos = [];
    independientes.forEach(function (pAbs) {
      principales.forEach(function (q) {
        candidatos.push([pAbs, q]);
        candidatos.push([-pAbs, q]);
      });
    });
    for (var i = 0; i < candidatos.length; i++) {
      var rootNum = candidatos[i][0];
      var qLead = candidatos[i][1];
      if (rootNum === 0) continue;
      var quot = divLinear(c, qLead, rootNum);
      if (!quot) continue;
      var lin = trim([-rootNum, qLead]);
      if (lin[lin.length - 1] < 0) {
        lin = lin.map(function (v) { return -v; });
        quot = quot.map(function (v) { return -v; });
      }
      casos.push("Raíz racional");
      pasos.push({
        titulo: "Se encuentra un factor lineal",
        texto: "El binomio (" + formatPoly(lin) + ") divide al polinomio. El cociente es " + formatPoly(quot) + "."
      });
      return [lin].concat(factorRecursive(quot, pasos, casos));
    }

    pasos.push({
      titulo: "No factoriza más con enteros",
      texto: formatPoly(c) + " se queda así: no aparece un factor lineal con coeficientes enteros."
    });
    casos.push("No factoriza con enteros");
    return [c];
  }

  function polyMulAll(list) {
    return list.reduce(function (acc, f) { return polyMul(acc, f); }, [1]);
  }

  function uniqueCases(list) {
    var seen = {};
    var out = [];
    list.forEach(function (item) {
      if (!seen[item]) {
        seen[item] = true;
        out.push(item);
      }
    });
    return out;
  }

  function joinFactors(factors) {
    var consts = 1;
    var shown = [];
    factors.forEach(function (f) {
      var t = trim(f);
      if (degree(t) === 0) consts *= t[0];
      else shown.push(t);
    });
    shown.sort(function (a, b) {
      function mono(f) {
        var nz = 0;
        f.forEach(function (v) { if (v) nz++; });
        return nz === 1 ? 0 : 1;
      }
      var ma = mono(a);
      var mb = mono(b);
      if (ma !== mb) return ma - mb;
      if (degree(a) !== degree(b)) return degree(a) - degree(b);
      return (a[a.length - 1] - b[b.length - 1]) || ((a[0] || 0) - (b[0] || 0));
    });
    var pieces = [];
    if (consts === -1) pieces.push("−");
    else if (consts !== 1) pieces.push(String(consts));
    var grouped = [];
    shown.forEach(function (f) {
      var key = trim(f).join(",");
      var last = grouped[grouped.length - 1];
      if (last && last.key === key) last.count++;
      else grouped.push({ f: f, key: key, count: 1 });
    });
    grouped.forEach(function (item) {
      var f = item.f;
      var text = formatPoly(f);
      if (degree(f) === 1 && f[1] === 1 && f[0] === 0) {
        pieces.push(item.count > 1 ? "x" + sup(item.count) : "x");
        return;
      }
      var body = "(" + text + ")";
      pieces.push(item.count > 1 ? body + sup(item.count) : body);
    });
    if (!pieces.length) return "1";
    if (pieces[0] === "−" && pieces.length > 1) return "−" + pieces.slice(1).join("");
    return pieces.join("");
  }

  function factorPoly(input) {
    var coeffs = typeof input === "string" ? parsePoly(input) : trim(input);
    var pasos = [];
    var casos = [];
    pasos.push({
      titulo: "Polinomio",
      texto: "Vamos a factorizar " + formatPoly(coeffs) + " con coeficientes enteros."
    });
    var factors = factorRecursive(coeffs, pasos, casos);
    var producto = polyMulAll(factors);
    if (!samePoly(producto, coeffs)) {
      return {
        entrada: formatPoly(coeffs),
        casos: ["No factoriza con enteros"],
        pasos: pasos.concat([{
          titulo: "Revisión",
          texto: "No alcancé una factorización entera fiable, así que lo dejamos como " + formatPoly(coeffs) + "."
        }]),
        resultado: formatPoly(coeffs),
        factores: [formatPoly(coeffs)],
        factorizo: false
      };
    }
    var noTrivial = factors.length > 1 || (factors.length === 1 && degree(factors[0]) < degree(coeffs));
    var resultado = noTrivial ? joinFactors(factors) : formatPoly(coeffs);
    if (!noTrivial) casos = ["No factoriza con enteros"];
    else casos = casos.filter(function (item) { return item !== "No factoriza con enteros" && item !== "Raíz racional" && item !== "Signo principal"; });
    return {
      entrada: formatPoly(coeffs),
      casos: uniqueCases(casos.length ? casos : ["No factoriza con enteros"]),
      pasos: pasos.concat([{
        titulo: "Resultado",
        texto: noTrivial ? formatPoly(coeffs) + " = " + resultado + "." : formatPoly(coeffs) + " no se factoriza más con enteros."
      }]),
      resultado: resultado,
      factores: factors.map(formatPoly),
      factorizo: noTrivial
    };
  }

  function groupedStats(filas) {
    if (!filas || !filas.length) throw new Error("Agrega al menos una fila.");
    var ancho = null;
    var filasOk = filas.map(function (f, i) {
      var a = Number(f.inferior);
      var b = Number(f.superior);
      var n = Number(f.frecuencia);
      if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(n)) {
        throw new Error("Revisa la fila " + (i + 1) + ": hacen falta números.");
      }
      if (b <= a) throw new Error("En la fila " + (i + 1) + " el límite superior debe ser mayor que el inferior.");
      if (!Number.isInteger(n) || n <= 0) throw new Error("La frecuencia de la fila " + (i + 1) + " debe ser un entero positivo.");
      var w = b - a;
      if (ancho == null) ancho = w;
      return { inferior: a, superior: b, frecuencia: n, ancho: w, marca: (a + b) / 2 };
    });
    var mismaAmplitud = filasOk.every(function (f) { return Math.abs(f.ancho - ancho) < 1e-9; });
    var N = filasOk.reduce(function (s, f) { return s + f.frecuencia; }, 0);
    var suma = filasOk.reduce(function (s, f) { return s + f.frecuencia * f.marca; }, 0);
    var media = suma / N;
    var Fi = [];
    var acum = 0;
    filasOk.forEach(function (f) {
      acum += f.frecuencia;
      Fi.push(acum);
    });
    var maxF = Math.max.apply(null, filasOk.map(function (f) { return f.frecuencia; }));
    var modales = filasOk.filter(function (f) { return f.frecuencia === maxF; });
    var mediana = null;
    var moda = null;
    var detalleMediana = null;
    var detalleModa = null;
    if (mismaAmplitud) {
      var mitad = N / 2;
      var idx = Fi.findIndex(function (v) { return v >= mitad; });
      var clase = filasOk[idx];
      var Fant = idx === 0 ? 0 : Fi[idx - 1];
      mediana = clase.inferior + ((mitad - Fant) / clase.frecuencia) * clase.ancho;
      detalleMediana = {
        clase: clase,
        L: clase.inferior,
        Fant: Fant,
        f: clase.frecuencia,
        c: clase.ancho,
        mitad: mitad
      };
      if (modales.length === 1) {
        var im = filasOk.indexOf(modales[0]);
        var prev = im === 0 ? 0 : filasOk[im - 1].frecuencia;
        var next = im === filasOk.length - 1 ? 0 : filasOk[im + 1].frecuencia;
        var d1 = modales[0].frecuencia - prev;
        var d2 = modales[0].frecuencia - next;
        moda = modales[0].inferior + (d1 / (d1 + d2)) * modales[0].ancho;
        detalleModa = { clase: modales[0], d1: d1, d2: d2, L: modales[0].inferior, c: modales[0].ancho };
      }
    }
    return {
      filas: filasOk,
      Fi: Fi,
      n: N,
      suma: suma,
      media: media,
      mediana: mediana,
      moda: moda,
      mismaAmplitud: mismaAmplitud,
      detalleMediana: detalleMediana,
      detalleModa: detalleModa,
      variasModas: modales.length > 1,
      clasesModales: modales
    };
  }

  function ungroupedStats(nums) {
    if (!nums.length) throw new Error("Escribe al menos un dato.");
    var datos = nums.map(Number);
    if (datos.some(function (n) { return !Number.isFinite(n); })) throw new Error("Hay un dato que no es un número.");
    var n = datos.length;
    var suma = datos.reduce(function (s, v) { return s + v; }, 0);
    var media = suma / n;
    var orden = datos.slice().sort(function (a, b) { return a - b; });
    var mediana = n % 2 ? orden[(n - 1) / 2] : (orden[n / 2 - 1] + orden[n / 2]) / 2;
    var freq = {};
    orden.forEach(function (v) { freq[v] = (freq[v] || 0) + 1; });
    var max = 0;
    Object.keys(freq).forEach(function (k) { max = Math.max(max, freq[k]); });
    var modas = Object.keys(freq).filter(function (k) { return freq[k] === max; }).map(Number);
    return { datos: orden, n: n, suma: suma, media: media, mediana: mediana, modas: max === 1 ? [] : modas, freq: freq };
  }

  function numTex(n) {
    if (!Number.isFinite(n)) return "—";
    var r = Math.round(n * 1000) / 1000;
    if (Math.abs(r - Math.round(r)) < 1e-9) return String(Math.round(r));
    return String(r);
  }

  function pasosAgrupados(stats) {
    var pasos = [];
    pasos.push({
      titulo: "Marcas de clase y tamaño",
      texto: "n = " + stats.n + ". Cada marca de clase es el promedio de los límites. La suma de fi · xi es " + numTex(stats.suma) + "."
    });
    pasos.push({
      titulo: "Media",
      texto: "x̄ = Σ(fi · xi) / n = " + numTex(stats.suma) + " / " + stats.n + " = " + numTex(stats.media) + "."
    });
    if (!stats.mismaAmplitud) {
      pasos.push({
        titulo: "Mediana y moda",
        texto: "Las clases no tienen la misma amplitud. La media sí queda definida con las marcas de clase. La fórmula escolar de mediana y moda pide una sola amplitud c, así que no invento esos dos valores."
      });
      return pasos;
    }
    var dm = stats.detalleMediana;
    pasos.push({
      titulo: "Mediana",
      texto: "n/2 = " + numTex(dm.mitad) + ". La clase mediana empieza en L = " + numTex(dm.L) + ", con F anterior = " + dm.Fant + ", f = " + dm.f + " y c = " + numTex(dm.c) + ". Me = " + numTex(dm.L) + " + ((" + numTex(dm.mitad) + " − " + dm.Fant + ") / " + dm.f + ") · " + numTex(dm.c) + " = " + numTex(stats.mediana) + "."
    });
    if (stats.variasModas) {
      pasos.push({
        titulo: "Moda",
        texto: "Hay más de una clase con la frecuencia más alta. Los datos son bimodales o plurimodales; no fuerzo una sola fórmula."
      });
    } else if (stats.detalleModa) {
      var mo = stats.detalleModa;
      pasos.push({
        titulo: "Moda",
        texto: "La clase modal empieza en L = " + numTex(mo.L) + ". d1 = " + mo.d1 + " y d2 = " + mo.d2 + ". Mo = " + numTex(mo.L) + " + (" + mo.d1 + " / " + (mo.d1 + mo.d2) + ") · " + numTex(mo.c) + " = " + numTex(stats.moda) + "."
      });
    }
    return pasos;
  }

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rng, list) {
    return list[Math.floor(rng() * list.length)];
  }

  function shuffle(rng, list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  var CASOS = [
    "Factor común",
    "Diferencia de cuadrados",
    "Suma o diferencia de cubos",
    "Trinomio cuadrado perfecto",
    "Trinomio x² + bx + c",
    "Trinomio ax² + bx + c",
    "Factorización por agrupación"
  ];

  function buildExpression(caso, rng) {
    var p;
    var q;
    var a;
    var b;
    if (caso === "Factor común") {
      var k = pick(rng, [2, 3, 4, 5, 6]);
      var m = pick(rng, [1, 2, 3, 4, 5]);
      var signo = pick(rng, [1, -1]);
      p = polyMul(polyMul([k], [0, 1]), [signo * m, 1]);
      return p;
    }
    if (caso === "Diferencia de cuadrados") {
      a = pick(rng, [1, 1, 2, 3]);
      b = pick(rng, [1, 2, 3, 4, 5, 6]);
      return polySub(polyMul([0, a], [0, a]), [b * b]);
    }
    if (caso === "Suma o diferencia de cubos") {
      b = pick(rng, [1, 2, 3]);
      var suma = rng() < 0.5;
      var cubo = b * b * b;
      return suma ? [cubo, 0, 0, 1] : [-cubo, 0, 0, 1];
    }
    if (caso === "Trinomio cuadrado perfecto") {
      a = pick(rng, [1, 1, 2]);
      b = pick(rng, [1, 2, 3, 4, 5]);
      var signo = pick(rng, [1, -1]);
      var lin = [signo * b, a];
      return polyMul(lin, lin);
    }
    if (caso === "Trinomio x² + bx + c") {
      p = pick(rng, [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      q = pick(rng, [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      return polyMul([p, 1], [q, 1]);
    }
    if (caso === "Trinomio ax² + bx + c") {
      a = pick(rng, [2, 3, 2]);
      b = pick(rng, [1, 2, 3]);
      p = pick(rng, [-4, -3, -2, -1, 1, 2, 3, 4]);
      q = pick(rng, [-4, -2, -1, 1, 2, 3]);
      return polyMul([p, a], [q, b]);
    }
    p = pick(rng, [-3, -2, -1, 1, 2, 3]);
    q = pick(rng, [1, 2, 3, 4]);
    var r = pick(rng, [-3, -1, 1, 2, 3]);
    if (r === 0) r = 2;
    var dif = polyMul([q, 0, 1], [r, 1]);
    if (p === 1) return dif;
    return polyMul([p, 1], polySub(polyMul([0, 1], [0, 1]), [q * q]));
  }

  function distractores(correcto, entrada) {
    var base = [
      correcto.replace(/−/g, "+").replace(/ \+ /g, " − "),
      entrada,
      correcto.split(")(").reverse().join(")("),
      "No factoriza con enteros"
    ];
    var out = [];
    base.forEach(function (item) {
      if (item && item !== correcto && out.indexOf(item) === -1) out.push(item);
    });
    while (out.length < 3) out.push("Otro arreglo de signos");
    return out.slice(0, 3);
  }

  function proponerFactor(caso, semilla) {
    var rng = mulberry32(semilla || Date.now());
    var elegido = caso && CASOS.indexOf(caso) >= 0 ? caso : pick(rng, CASOS);
    var coeffs = null;
    var hecho = null;
    for (var intento = 0; intento < 12; intento++) {
      coeffs = buildExpression(elegido, rng);
      hecho = factorPoly(coeffs);
      if (hecho.factorizo) break;
    }
    var opciones = shuffle(rng, [hecho.resultado].concat(distractores(hecho.resultado, hecho.entrada)));
    return {
      caso: elegido,
      expresion: hecho.entrada,
      opciones: opciones,
      correcta: opciones.indexOf(hecho.resultado),
      pasos: hecho.pasos,
      resultado: hecho.resultado,
      casos: hecho.casos
    };
  }

  function tablaEjemplo120() {
    return [
      { inferior: -1, superior: 1, frecuencia: 2 },
      { inferior: 1, superior: 3, frecuencia: 23 },
      { inferior: 3, superior: 5, frecuencia: 17 },
      { inferior: 5, superior: 7, frecuencia: 60 },
      { inferior: 7, superior: 9, frecuencia: 3 },
      { inferior: 9, superior: 11, frecuencia: 15 }
    ];
  }

  function proponerTabla(semilla) {
    var rng = mulberry32(semilla || Date.now());
    if (rng() < 0.18) {
      var fija = groupedStats(tablaEjemplo120());
      return { titulo: "Ejemplo de una encuesta de 120 jóvenes", filas: tablaEjemplo120(), stats: fija, pasos: pasosAgrupados(fija) };
    }
    var ancho = pick(rng, [2, 5, 10]);
    var inicio = pick(rng, [0, 2, 10]);
    var clases = pick(rng, [4, 4, 5]);
    var filas = [];
    var modaEn = Math.floor(rng() * clases);
    for (var i = 0; i < clases; i++) {
      var f = 2 + Math.floor(rng() * 6);
      if (i === modaEn) f += 6;
      filas.push({ inferior: inicio + i * ancho, superior: inicio + (i + 1) * ancho, frecuencia: f });
    }
    var stats = groupedStats(filas);
    return {
      titulo: "Tabla propuesta por el tutor",
      filas: filas,
      stats: stats,
      pasos: pasosAgrupados(stats)
    };
  }

  function cerca(valor) {
    var opts = [valor];
    [0.5, -0.5, 1, -1, 2].forEach(function (d) {
      var v = Math.round((valor + d) * 1000) / 1000;
      if (opts.indexOf(v) === -1) opts.push(v);
    });
    return opts;
  }

  function preguntaNumero(enunciado, valor, habilidad, explicacion, rng) {
    var opcionesNum = shuffle(rng, cerca(Math.round(valor * 1000) / 1000)).slice(0, 4);
    if (opcionesNum.indexOf(Math.round(valor * 1000) / 1000) === -1) opcionesNum[0] = Math.round(valor * 1000) / 1000;
    var opciones = opcionesNum.map(numTex);
    var correctaTxt = numTex(valor);
    var idx = opciones.indexOf(correctaTxt);
    if (idx < 0) {
      opciones[0] = correctaTxt;
      idx = 0;
    }
    return { area: "Estadística", habilidad: habilidad, enunciado: enunciado, opciones: opciones, correcta: idx, explicacion: explicacion };
  }

  function bancoBase() {
    return [
      {
        area: "Factorización",
        habilidad: "Diferencia de cuadrados",
        enunciado: "Factoriza x² − 25.",
        opciones: ["(x − 5)(x + 5)", "(x − 25)(x + 1)", "(x − 5)²", "No factoriza con enteros"],
        correcta: 0,
        explicacion: "25 es 5² y los signos están restados. x² − 25 = (x − 5)(x + 5)."
      },
      {
        area: "Factorización",
        habilidad: "Suma de cubos",
        enunciado: "Factoriza x³ + 8.",
        opciones: ["(x + 2)(x² − 2x + 4)", "(x + 2)³", "(x − 2)(x² + 2x + 4)", "(x + 8)(x² + 1)"],
        correcta: 0,
        explicacion: "Es una suma de cubos: a³ + b³ con a = x y b = 2. El trinomio que acompaña no se vuelve a factorizar con enteros."
      },
      {
        area: "Factorización",
        habilidad: "Diferencia de cubos",
        enunciado: "Factoriza x³ − 27.",
        opciones: ["(x − 3)(x² + 3x + 9)", "(x − 3)(x² − 3x + 9)", "(x − 27)(x + 1)", "(x − 3)³"],
        correcta: 0,
        explicacion: "a³ − b³ = (a − b)(a² + ab + b²). Aquí b = 3, así que el término del medio del trinomio es +3x."
      },
      {
        area: "Factorización",
        habilidad: "Trinomio x² + bx + c",
        enunciado: "Factoriza x² + 7x + 12.",
        opciones: ["(x + 3)(x + 4)", "(x + 2)(x + 6)", "(x − 3)(x − 4)", "(x + 7)(x + 12)"],
        correcta: 0,
        explicacion: "3 y 4 suman 7 y multiplican 12. Por eso x² + 7x + 12 = (x + 3)(x + 4)."
      },
      {
        area: "Factorización",
        habilidad: "Trinomio x² + bx + c",
        enunciado: "Factoriza x² − x − 6.",
        opciones: ["(x − 3)(x + 2)", "(x + 3)(x − 2)", "(x − 6)(x + 1)", "(x − 1)(x − 6)"],
        correcta: 0,
        explicacion: "−3 y 2 suman −1 y multiplican −6. El factor con el número negativo es (x − 3)."
      },
      {
        area: "Factorización",
        habilidad: "Trinomio ax² + bx + c",
        enunciado: "Factoriza 2x² + 7x + 3.",
        opciones: ["(2x + 1)(x + 3)", "(2x + 3)(x + 1)", "(2x + 7)(x + 3)", "(x + 1)(x + 3)"],
        correcta: 0,
        explicacion: "Al multiplicar y dividir por 2 aparece y² + 7y + 6 = (y + 1)(y + 6), con y = 2x. Al repartir el 2 queda (2x + 1)(x + 3). La opción (2x + 3)(x + 1) da 2x² + 5x + 3."
      },
      {
        area: "Factorización",
        habilidad: "Trinomio ax² + bx + c",
        enunciado: "Factoriza 3x² − 3.",
        opciones: ["3(x − 1)(x + 1)", "3(x − 1)²", "(3x − 1)(x + 3)", "(3x − 3)(x + 1)"],
        correcta: 0,
        explicacion: "Primero el factor común 3: 3(x² − 1). Después diferencia de cuadrados: x² − 1 = (x − 1)(x + 1)."
      },
      {
        area: "Factorización",
        habilidad: "Factor común",
        enunciado: "Factoriza 4x² + 10x.",
        opciones: ["2x(2x + 5)", "2x(2x + 10)", "4x(x + 10)", "2(2x² + 5)"],
        correcta: 0,
        explicacion: "2x está en los dos términos. Al sacarlo queda 2x(2x + 5)."
      },
      {
        area: "Factorización",
        habilidad: "Trinomio cuadrado perfecto",
        enunciado: "Factoriza x² − 10x + 25.",
        opciones: ["(x − 5)²", "(x + 5)²", "(x − 10)(x + 25)", "(x − 5)(x + 5)"],
        correcta: 0,
        explicacion: "5² = 25 y 2 · 5 = 10. Como el término del medio es negativo, es (x − 5)², no una diferencia de cuadrados."
      },
      {
        area: "Factorización",
        habilidad: "Factorización por agrupación",
        enunciado: "Factoriza x³ + x² − 4x − 4.",
        opciones: ["(x + 1)(x − 2)(x + 2)", "(x + 1)(x − 4)", "(x² − 4)(x − 1)", "(x − 1)(x − 2)(x + 2)"],
        correcta: 0,
        explicacion: "Se agrupa x²(x + 1) − 4(x + 1) = (x² − 4)(x + 1). Luego x² − 4 = (x − 2)(x + 2)."
      },
      {
        area: "Factorización",
        habilidad: "Reconocer el caso",
        enunciado: "¿Qué caso se reconoce primero en 9x² − 4?",
        opciones: ["Diferencia de cuadrados", "Suma de cubos", "Trinomio x² + bx + c", "Factor común x"],
        correcta: 0,
        explicacion: "Hay dos términos, ambos cuadrados, restados: (3x)² − 2². No hay una x común que se pueda sacar de los dos, porque 4 no tiene x."
      },
      {
        area: "Factorización",
        habilidad: "No factoriza con enteros",
        enunciado: "¿Cuál de estas expresiones no factoriza con enteros?",
        opciones: ["x² + 4", "x² − 4", "x² − 9", "x² + 5x + 6"],
        correcta: 0,
        explicacion: "x² + 4 es suma de cuadrados, no diferencia. Con enteros se queda así. Las otras tres sí se factorizan."
      }
    ];
  }

  function preguntasDeTabla(stats, titulo, rng) {
    var filasTxt = stats.filas.map(function (f) {
      return "[" + numTex(f.inferior) + ", " + numTex(f.superior) + ") fi = " + f.frecuencia;
    }).join("; ");
    var base = titulo + ". Clases: " + filasTxt + ". n = " + stats.n + ".";
    var lista = [
      preguntaNumero(base + " ¿Cuál es la media?", stats.media, "Media", "La media es Σ(fi · xi) / n = " + numTex(stats.suma) + " / " + stats.n + " = " + numTex(stats.media) + ".", rng)
    ];
    if (stats.mediana != null) {
      lista.push(preguntaNumero(base + " ¿Cuál es la mediana?", stats.mediana, "Mediana", pasosAgrupados(stats)[2].texto, rng));
    }
    if (stats.moda != null) {
      lista.push(preguntaNumero(base + " ¿Cuál es la moda?", stats.moda, "Moda", pasosAgrupados(stats)[3].texto, rng));
    }
    var modal = stats.clasesModales[0];
    var enunciadoClase = base + " ¿Cuál es la clase modal?";
    var buena = "[" + numTex(modal.inferior) + ", " + numTex(modal.superior) + ")";
    var otras = stats.filas.map(function (f) { return "[" + numTex(f.inferior) + ", " + numTex(f.superior) + ")"; }).filter(function (t) { return t !== buena; });
    var opciones = shuffle(rng, [buena].concat(otras.slice(0, 3)));
    if (opciones.length < 4) opciones.push("No hay clase modal");
    lista.push({
      area: "Estadística",
      habilidad: "Clase modal",
      enunciado: enunciadoClase,
      opciones: opciones.slice(0, 4),
      correcta: opciones.indexOf(buena),
      explicacion: "La clase modal es la de mayor frecuencia. Aquí es " + buena + " con fi = " + modal.frecuencia + "."
    });
    return lista;
  }

  function armarDiagnostico(semilla) {
    var rng = mulberry32(semilla || Date.now());
    var factor = shuffle(rng, bancoBase());
    var tabla1 = proponerTabla((semilla || 1) + 11);
    var tabla2 = proponerTabla((semilla || 1) + 29);
    var sueltos = ungroupedStats([3, 5, 5, 8, 9]);
    var estad = preguntasDeTabla(tabla1.stats, tabla1.titulo, rng)
      .concat(preguntasDeTabla(tabla2.stats, "Otra tabla propuesta", rng))
      .concat([
        preguntaNumero("Datos sueltos: 3, 5, 5, 8 y 9. ¿Cuál es la media?", sueltos.media, "Media de datos sueltos", "La suma es " + sueltos.suma + " y hay 5 datos. 30/5 = 6.", rng),
        preguntaNumero("Datos sueltos: 3, 5, 5, 8 y 9. ¿Cuál es la mediana?", sueltos.mediana, "Mediana de datos sueltos", "Ordenados ya están. El del centro es 5.", rng),
        {
          area: "Estadística",
          habilidad: "Moda de datos sueltos",
          enunciado: "Datos sueltos: 3, 5, 5, 8 y 9. ¿Cuál es la moda?",
          opciones: ["5", "3", "8", "9"],
          correcta: 0,
          explicacion: "5 aparece dos veces y los demás una. La moda es 5."
        }
      ]);
    estad = shuffle(rng, estad).slice(0, 4);
    factor = factor.slice(0, 4);
    return shuffle(rng, factor.concat(estad)).map(function (p, i) {
      return {
        area: p.area,
        habilidad: p.habilidad,
        enunciado: p.enunciado,
        opciones: p.opciones,
        correcta: p.correcta,
        explicacion: p.explicacion,
        numero: i + 1
      };
    });
  }

  return {
    parsePoly: parsePoly,
    formatPoly: formatPoly,
    factorPoly: factorPoly,
    groupedStats: groupedStats,
    ungroupedStats: ungroupedStats,
    pasosAgrupados: pasosAgrupados,
    proponerFactor: proponerFactor,
    proponerTabla: proponerTabla,
    tablaEjemplo120: tablaEjemplo120,
    armarDiagnostico: armarDiagnostico,
    numTex: numTex,
    CASOS: CASOS
  };
});
