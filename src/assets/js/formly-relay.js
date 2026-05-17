/* Bondar Labs Formly relay mode.
   Full styled forms can trigger Formly's bot detection when posted directly.
   This keeps the visible forms intact and submits a clean minimal relay form:
   access_key + name + email + message (+ one optional file).
*/
(function(){
  'use strict';

  var FORMLY_ENDPOINT = 'https://formly.email/submit';
  var ACCESS_KEY = '83c85cbff4d04deaa045a9f6eb89f454';
  var MAX_BYTES = Math.floor(9.5 * 1024 * 1024);
  var MAX_LABEL = '10 MB';
  var allowedExtensions = ['stl','3mf','step','stp','obj','zip','rar','7z','pdf','png','jpg','jpeg'];
  var allowedMimePrefixes = ['image/'];
  var allowedMimeTypes = ['application/pdf','application/zip','application/x-zip-compressed','application/octet-stream','model/stl','model/obj'];

  function normaliseEndpoint(url){
    return String(url || '').replace(/\/+$/, '');
  }

  function isFormlyForm(form){
    return form instanceof HTMLFormElement && normaliseEndpoint(form.getAttribute('action')) === normaliseEndpoint(FORMLY_ENDPOINT);
  }

  function addHidden(form, name, value){
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value == null ? '' : String(value);
    form.appendChild(input);
    return input;
  }

  function normaliseText(value){
    return String(value == null ? '' : value).replace(/^\s+|\s+$/g, '').replace(/[ \t\r\f\v]+/g, ' ');
  }

  function titleCaseName(name){
    return String(name || '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, function(ch){ return ch.toUpperCase(); });
  }

  function getLabel(control){
    if(!control) return '';
    var id = control.id;
    if(id){
      try {
        var label = document.querySelector('label[for="' + CSS.escape(id) + '"]');
        if(label) return normaliseText(label.textContent).replace(/\*+$/, '').trim();
      } catch(err) {}
    }
    var parentLabel = control.closest && control.closest('label');
    if(parentLabel) return normaliseText(parentLabel.textContent).replace(/\*+$/, '').trim();
    var field = control.closest && control.closest('.field');
    if(field){
      var fieldLabel = field.querySelector('.label, label');
      if(fieldLabel) return normaliseText(fieldLabel.textContent).replace(/\*+$/, '').trim();
    }
    return titleCaseName(control.name || control.id || 'Field');
  }

  function selectedOptionText(select){
    if(!select) return '';
    if(select.multiple){
      var values = [];
      Array.prototype.forEach.call(select.options, function(opt){
        if(opt.selected && opt.value !== '') values.push(normaliseText(opt.textContent || opt.value));
      });
      return values.join(', ');
    }
    var opt = select.options[select.selectedIndex];
    if(!opt) return normaliseText(select.value || '');
    if(opt.disabled && opt.value === '') return '';
    return normaliseText(opt.textContent || opt.value || '');
  }

  function shouldSkipControl(control){
    if(!control || !control.name || control.disabled) return true;
    var type = (control.type || '').toLowerCase();
    var name = String(control.name || '');
    if(type === 'file' || type === 'submit' || type === 'button' || type === 'reset' || type === 'image') return true;
    if(name === 'access_key') return true;
    if(name === 'honeypot' || name === 'website' || name === '_honey') return true;
    if(/^_/.test(name)) return true;
    return false;
  }

  function controlValue(control){
    if(shouldSkipControl(control)) return null;
    var type = (control.type || '').toLowerCase();
    var tag = control.tagName ? control.tagName.toLowerCase() : '';
    if(type === 'radio' || type === 'checkbox'){
      if(!control.checked) return null;
      return normaliseText(control.value || 'Yes');
    }
    if(tag === 'select') return selectedOptionText(control);
    return normaliseText(control.value || '');
  }

  function visibleEnough(control){
    // Include ordinary visible controls and hidden business fields, but skip controls inside inactive templates.
    if(!control) return false;
    if(control.disabled) return false;
    if(control.closest && control.closest('[hidden], [aria-hidden="true"], template')) return false;
    return true;
  }

  function collectFields(form){
    var rows = [];
    var seenRadioGroups = Object.create(null);
    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function(control){
      if(!visibleEnough(control)) return;
      var value = controlValue(control);
      if(value == null || value === '') return;
      var type = (control.type || '').toLowerCase();
      var name = control.name || '';
      if(type === 'radio'){
        if(seenRadioGroups[name]) return;
        seenRadioGroups[name] = true;
      }
      rows.push({
        label: getLabel(control) || titleCaseName(name),
        name: name,
        value: value
      });
    });
    return rows;
  }

  function firstValue(form, names){
    var wanted = names.map(function(name){ return String(name).toLowerCase(); });
    var controls = form.querySelectorAll('input, select, textarea');
    for(var i = 0; i < controls.length; i++){
      var control = controls[i];
      if(!control.name || control.disabled) continue;
      var lowered = String(control.name).toLowerCase();
      if(wanted.indexOf(lowered) === -1) continue;
      var value = controlValue(control);
      if(value) return value;
    }
    return '';
  }

  function findFileInput(form){
    var inputs = form.querySelectorAll('input[type="file"]');
    for(var i = 0; i < inputs.length; i++){
      if(inputs[i].files && inputs[i].files.length) return inputs[i];
    }
    return null;
  }

  function getExtension(filename){
    var parts = String(filename || '').toLowerCase().split('.');
    return parts.length > 1 ? parts.pop() : '';
  }

  function isAllowedFile(file){
    if(!file) return true;
    var ext = getExtension(file.name);
    var mime = String(file.type || '').toLowerCase();
    if(allowedExtensions.indexOf(ext) !== -1) return true;
    if(allowedMimeTypes.indexOf(mime) !== -1) return true;
    return allowedMimePrefixes.some(function(prefix){ return mime.indexOf(prefix) === 0; });
  }

  function validateFileInput(fileInput){
    if(!fileInput || !fileInput.files || !fileInput.files.length) return true;
    if(fileInput.files.length > 1){
      fileInput.setCustomValidity('Please upload one file only.');
      try { fileInput.reportValidity(); } catch(err) {}
      return false;
    }
    var file = fileInput.files[0];
    if(file.size > MAX_BYTES){
      fileInput.setCustomValidity('Please upload one file up to ' + MAX_LABEL + '.');
      try { fileInput.reportValidity(); } catch(err2) {}
      return false;
    }
    if(!isAllowedFile(file)){
      fileInput.setCustomValidity('Please upload STL, 3MF, STEP, STP, OBJ, ZIP, RAR, 7Z, PDF, JPG or PNG.');
      try { fileInput.reportValidity(); } catch(err3) {}
      return false;
    }
    fileInput.setCustomValidity('');
    return true;
  }

  function pageTitle(){
    return (document.title || 'Bondar Labs website').replace(/\s*\|\s*Bondar Labs.*$/i, '').trim() || 'Bondar Labs website';
  }

  function formTitle(form){
    return form.getAttribute('data-formly-title') || form.getAttribute('aria-label') || form.id || 'Website form';
  }

  function buildMessage(form){
    var rows = collectFields(form);
    var fileInput = findFileInput(form);
    var parts = [];

    parts.push('New Bondar Labs website submission');
    parts.push('Form: ' + formTitle(form));
    parts.push('Page title: ' + pageTitle());
    parts.push('Page URL: ' + window.location.href);
    parts.push('Submitted at: ' + new Date().toISOString());

    if(rows.length){
      parts.push('Submitted details:');
      rows.forEach(function(row){
        parts.push('• ' + row.label + ': ' + row.value);
      });
    }

    if(fileInput && fileInput.files && fileInput.files.length){
      var file = fileInput.files[0];
      parts.push('Attachment selected: ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)');
    }

    // Formly's free email template collapses newlines in a single message field.
    // Bullets and separators keep the email readable even when whitespace is collapsed.
    return parts.join(' | ');
  }

  function submitRelay(form, fileInput){
    var relay = document.createElement('form');
    relay.action = FORMLY_ENDPOINT;
    relay.method = 'POST';
    relay.acceptCharset = 'UTF-8';
    relay.style.display = 'none';

    addHidden(relay, 'access_key', ACCESS_KEY);
    addHidden(relay, 'name', firstValue(form, ['name']) || 'Website visitor');
    addHidden(relay, 'email', firstValue(form, ['email']) || 'info@bondarlabs.co.uk');
    addHidden(relay, 'message', buildMessage(form));

    if(fileInput && fileInput.files && fileInput.files.length){
      relay.enctype = 'multipart/form-data';
      fileInput.setAttribute('data-original-name', fileInput.name || '');
      fileInput.name = 'file';
      relay.appendChild(fileInput);
    }

    document.body.appendChild(relay);
    relay.submit();
  }

  document.addEventListener('change', function(e){
    var target = e.target;
    if(target && target.matches && target.matches('input[type="file"]')){
      target.setCustomValidity('');
      validateFileInput(target);
    }
  }, true);

  document.addEventListener('submit', function(e){
    var form = e.target;
    if(!isFormlyForm(form)) return;
    if(form.hasAttribute('data-formly-native')) return;
    if(e.defaultPrevented) return;

    var fileInput = findFileInput(form);
    if(!validateFileInput(fileInput)){
      e.preventDefault();
      form.classList.add('was-validated');
      return;
    }

    e.preventDefault();
    submitRelay(form, fileInput);
  }, false);
})();
