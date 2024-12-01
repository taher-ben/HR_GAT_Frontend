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
  email,
  alpha_spaces as alphaSpaces,
  max_value as maxVal,
  min_value as minVal,
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `هذا الحقل مطلوب.`,
          min: `القيمة المدخلة قصيرة جداً.`,
          max: `القيمة المدخلة طويلة جداً.`,
          alpha_spaces: `يجب أن يحتوي الحقل فقط على أحرف ومسافات.`,
          email: `يجب إدخال بريد إلكتروني صالح.`,
          min_value: `القيمة المدخلة منخفضة جداً.`,
          max_value: `القيمة المدخلة مرتفعة جداً.`,
          excluded: `غير مسموح باستخدام هذه القيمة.`,
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `الحقل ${ctx.field} غير صالح`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}
