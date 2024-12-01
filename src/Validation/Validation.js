import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate'
import {
  required,
  min,
  max,
  length,
  email,
  numeric,
  alpha_spaces as alphaSpaces,
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    // تعريف القواعد
    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('length', length)
    defineRule('numeric', numeric)

    // إعدادات عامة
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `هذا الحقل مطلوب.`,
          min: `القيمة المدخلة قصيرة جداً.`,
          max: `القيمة المدخلة طويلة جداً.`,
          alpha_spaces: `يجب أن يحتوي الحقل فقط على أحرف ومسافات.`,
          email: `يجب إدخال بريد إلكتروني صالح.`,
          length: `يجب أن يكون الطول ${ctx.rule.params[0]}.`,
          numeric: `يجب أن يحتوي الحقل على أرقام فقط.`,
        }
        return messages[ctx.rule.name] || `الحقل ${ctx.field} غير صالح.`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}
