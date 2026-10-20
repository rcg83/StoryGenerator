const fs = require('fs');
const path = require('path');

function toFirstPerson(s) {
  if (!s) return s;
  let trimmed = s.trim();
  // Te ...
  if (/^Te\s+/i.test(trimmed)) {
    let rest = trimmed.replace(/^Te\s+/i, '');
    rest = rest
      .replace(/^escondes\b/i, 'escondo')
      .replace(/^quedas\b/i, 'quedo')
      .replace(/^ocultas\b/i, 'oculto')
      .replace(/^apartas\b/i, 'aparto')
      .replace(/^asomas\b/i, 'asomo')
      .replace(/^abres\b/i, 'abro')
      .replace(/^cruzas\b/i, 'cruzo')
      .replace(/^registras\b/i, 'registro')
      .replace(/^bajas\b/i, 'bajo')
      .replace(/^saltas\b/i, 'salto')
      .replace(/^subes\b/i, 'subo')
      .replace(/^sales\b/i, 'salgo')
      .replace(/^metes\b/i, 'meto')
      .replace(/^quedas\b/i, 'quedo');
    // normalize me prefix if verb already first-person
    if (/^(escondo|quedo|oculto|aparto|asomo|abro|cruzo|registro|bajo|salto|subo|salgo|meto)\b/i.test(rest)) {
      return 'Me ' + rest.charAt(0).toLowerCase() + rest.slice(1);
    }
    // if already starts with me
    if (/^me\b/i.test(rest)) return rest.charAt(0).toUpperCase() + rest.slice(1);
    return 'Me ' + rest.charAt(0).toLowerCase() + rest.slice(1);
  }
  // verb 2nd person
  if (/^(Saltas|Bajas|Cruzas|Abres|Registras|Subes|Sales)\b/.test(trimmed)) {
    return trimmed
      .replace(/^Saltas\b/, 'Salto')
      .replace(/^Bajas\b/, 'Bajo')
      .replace(/^Cruzas\b/, 'Cruzo')
      .replace(/^Abres\b/, 'Abro')
      .replace(/^Registras\b/, 'Registro')
      .replace(/^Subes\b/, 'Subo')
      .replace(/^Sales\b/, 'Salgo');
  }
  return trimmed;
}

function walk(dir) {
  const entries = fs.readdirSync(dir);
  for (const e of entries) {
    const p = path.join(dir, e);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    if (e.endsWith('.json')) {
      try {
        let s = fs.readFileSync(p, 'utf8');
        if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
        const obj = JSON.parse(s);
        let changed = false;
        if (Array.isArray(obj.spreads)) {
          for (const sp of obj.spreads) {
            for (const page of ['leftPage', 'rightPage']) {
              if (sp[page] && Array.isArray(sp[page].pageOptions)) {
                for (const opt of sp[page].pageOptions) {
                  if (opt.optionText) {
                    const old = opt.optionText;
                    const neu = toFirstPerson(old);
                    if (neu !== old) { opt.optionText = neu; changed = true; }
                  }
                }
              }
            }
          }
        }
        if (Array.isArray(obj.gameovers)) {
          for (const go of obj.gameovers) {
            if (go.optionText) {
              const old = go.optionText;
              const neu = toFirstPerson(old);
              if (neu !== old) { go.optionText = neu; changed = true; }
            }
          }
        }
        if (changed) {
          fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
          console.log('updated', p);
        }
      } catch (err) {
        console.error('skip', p, err.message);
      }
    }
  }
}

walk('D:/StoryGenerator/stories');
console.log('done');