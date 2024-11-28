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
          required: `الحقل ${ctx.field} مطلوب.`,
          min: `الحقل ${ctx.field} قصير جداً.`,
          max: `الحقل ${ctx.field} طويل جداً.`,
          alpha_spaces: `الحقل ${ctx.field} يجب أن يحتوي فقط على أحرف ومسافات.`,
          email: `الحقل ${ctx.field} يجب أن يكون بريدًا إلكترونيًا صالحًا.`,
          min_value: `الحقل ${ctx.field} منخفض جداً.`,
          max_value: `الحقل ${ctx.field} مرتفع جداً.`,
          excluded: `غير مسموح باستخدام هذه القيمة في الحقل ${ctx.field}.`,
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
